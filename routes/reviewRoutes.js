import express from 'express'
import { 
   getReviewsById, 
   updateReviews,
   deleteReview, 
   getReviews,
   createProductReview
} from '../controllers/reviewControllers.js'
import { reviewOwnershipAuth, userAuth } from '../middlewares/authMiddlewares.js'
const router = express.Router()


router.route('/:id/reviews')
   .get(getReviews)
   .post(userAuth, createProductReview)

router.route('/:id/reviews/:review_id')
   .get( userAuth, reviewOwnershipAuth, getReviewsById)
   .put( userAuth, reviewOwnershipAuth, updateReviews)
   .delete( userAuth, reviewOwnershipAuth,deleteReview)




export default router