import express from 'express'
import { createProduct, 
   createProductReview, 
   deleteProduct, 
   getProductById, 
   getProducts, 
   getTopProduts, 
   updateProduct } from '../controllers/productControllers.js'
const router = express.Router()



router.route('/')
   .get(getProducts)
   .post(createProduct)

router.route('/top')
   .get(getTopProduts)



router.route('/:id')
   .get(getProductById)
   .delete(deleteProduct)
   .purge(updateProduct)

router.route('/:id/reviews')
   .post(createProductReview)




export default router