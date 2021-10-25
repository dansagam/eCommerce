import mongoose from "mongoose";
import fs from 'fs'
// import connectDB from "../config/dB.js";
import Grid from 'gridfs-stream'
import { config } from 'dotenv'


config({ path: './config/config.env' })


const conn = mongoose.connection
Grid.mongo = mongoose.mongo
let gfs
// connectDB()
conn.once('open', function () {
   // gfs = new mongoose.mongo.GridFSBucket(conn.db, { bucketName: 'productimages' })
   gfs = new Grid(conn.db)
   gfs.collection('productimages')

})

export const postSingleImage = async (req, res, next) => {
   try {
      if (req.file === undefined) return res.send("you must select a file");
      const imgUrl = req.file.filename
      res.send(`/${imgUrl}`);
   } catch (err) {
      next(err)
   }
}

export const getImage = async (req, res, next) => {
   try {
      const image = await gfs.files.findOne({
         filename: req.params.imageName
      })
      // console.log(image)
      // let readStream = gfs.createReadStream(`${image.filename}`)
      let readStream = gfs.createReadStream(image.filename)
      // let readStream = gfs.createReadStream()
      // const readStream = gfs.openDownloadStreamByName(req.params.imageName)
      // const readStream = fs.openDownloadStreamByName(req.params.imageName)
      readStream.pipe(res)
      // res.send({ image: image });
   } catch (err) {
      res.status(401)
      next(err)
   }
}

export const deleteImage = async (req, res, next) => {
   try {
      const deletedImage = await gfs.files.deleteOne({ filename: req.params.imageName })
      if (deletedImage) {
         res.status(201).json({
            success: true,
         })
      } else {
         res.status(404)
         throw new Error('File could not be deleted')
      }
   } catch (err) {
      res.status(404)
      next(err)
   }
}


export const getImageById = async (req, res, next) => {
   try {

   } catch (err) {

   }
}