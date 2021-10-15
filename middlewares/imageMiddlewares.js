import path from "path";
import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";
import { config } from "dotenv";
config({ path: './config/config.env' })

const storage = new GridFsStorage({
   url: process.env.MONGO_URI,
   options: {
      useNewUrlParser: true,
      useUnifiedTopology: true
   },
   file: (req, file) => {
      const filetype = /jpg|jpeg|png/
      const extname = filetype.test(path.extname(file.originalname).toLowerCase())
      const mimetype = filetype.test(file.mimetype)
      if (extname && mimetype) {
         return {
            bucketName: 'productimages',
            filename: `${file.fieldname}-${file.originalname}-${Date.now()}${path.extname(file.originalname)}`
         }
      } else {
         const filename = `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
         return filename
      }

   }
})
const storageProfile = new GridFsStorage({
   url: process.env.MONGO_URI,
   options: {
      useNewUrlParser: true,
      useUnifiedTopology: true
   },
   file: (req, file) => {
      const filetype = /jpg|jpeg|png/
      const extname = filetype.test(path.extname(file.originalname).toLowerCase())
      const mimetype = filetype.test(file.mimetype)
      if (extname && mimetype) {
         return {
            bucketName: 'profilephotos',
            filename: `${file.fieldname}-${file.originalname}-${Date.now()}${path.extname(file.originalname)}`
         }
      } else {
         const filename = `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
         return filename
      }

   }
})


export const imageStorageUpload = multer({
   storage: storage,

})
export const profileImageStorageUpload = multer({
   storage: storageProfile,

})