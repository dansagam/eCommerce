import express from 'express'
import {
   createProduct,
   createProductReview,
   deleteProduct,
   getProductById,
   getProducts,
   getTopProduts,
   updateProduct
} from '../controllers/productControllers.js'
import { adminAuth, userAuth } from '../middlewares/authMiddlewares.js'
import { imageStorageUpload } from '../middlewares/imageMiddlewares.js'
const router = express.Router()



router.route('/')
   .get(getProducts)
   .post(userAuth, adminAuth, imageStorageUpload.single('image'), createProduct)

router.route('/top')
   .get(getTopProduts)



router.route('/:id')
   .get(getProductById)
   .delete(userAuth, adminAuth, deleteProduct)
   .put(userAuth, adminAuth, updateProduct)

// router.route('/:id/reviews')
//    .post(createProductReview)




export default router