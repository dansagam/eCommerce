import express from "express"
import { deleteImage, getImage, postSingleImage } from "../controllers/imageControllers.js"
import { imageStorageUpload } from "../middlewares/imageMiddlewares.js"

const router = express.Router()


router.route('/')
   .post(imageStorageUpload.single('image'), postSingleImage)

router.route('/:imageName')
   .get(getImage)
   .delete(deleteImage)


export default router