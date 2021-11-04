import Product from "../models/productModel.js";
import Reviews from "../models/reviewModel.js";
import mongoose from "mongoose"


const getReviews = async (req, res, next) => {
   try {
      // const reviews = await Reviews.find({})
      const reviews = (await Product.findById(req.params.id).populate('reviews')).reviews
      // const reviews =  (await Reviews
      //                .find({}).populate('product_id'))
      //                .filter((review) => (review.product_id._id).toString() === req.params.id)
      // const reviews = dreviews.filter((review) => (review.product_id._id).toString() === req.params.id)
      // console.log(req.params.id)
      if (reviews.length === 0) {
         throw new Error(`No review found yet`)
      } else {
         if (reviews) {
            return res.status(201).json({
               success: true,
               count: reviews.length,
               data: reviews
            })
         } else {
            res.status(404)
            throw new Error('request not completed')
         }
      }
   } catch (err) {
      res.status(404)
      next(err)
   }
}

export const createProductReview = async (req, res, next) => {
   try {
      const { rating, comment, } = req.body
      const product = await Product.findById(req.params.id).populate('reviews')
      const review = {
         comment: comment,
         rating: Number(rating),
         user: req.user._id,
         product: product._id
      }
      if (product) {
         const reviewData = await Reviews.create(review)
         // const reviewData = new Reviews(review)
         // await reviewData.save()
         if (reviewData) {
            product.reviews.push(reviewData)
            const reviewsData = await Reviews.aggregate()
               .match({ product: product._id })
               .group({ _id: "$product", "reviewArr": { $push: "$rating" } })
               .project({
                  // "countedData": {$count: "$product_id"},
                  "reviewResult": {
                     $reduce: {
                        input: "$reviewArr",
                        initialValue: 0,
                        in: { $sum: ["$$value", "$$this"] }
                     }
                  }
               })
            // console.log(reviewsData)
            product.numReviews = await Reviews.countDocuments({ product_id: product._id })
            product.rating = (Number(reviewsData[0].reviewResult) / Number(product.numReviews)).toFixed(1)
            const newReviewedProduct = await Product.findByIdAndUpdate(product._id, product, { new: true })
            // product.numReviews = product.reviews.length
            // product.rating =
            //    product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

            // await product.save()
            res.status(201).json({
               message: 'Review added',
               // data: product,
               data: newReviewedProduct
               // reviewData: reviewData
            })
            // const reviewsData = await Reviews.aggregate()
            //    .match({product_id: mongoose.Types.ObjectId((req.params.id).toString())})
            //    .group({_id: "$product_id", "reviewArr": { $push: "$rating"}})
            //    .project({
            //       "reviewResult": {
            //          $reduce: {
            //             input: "$reviewArr",
            //             initialValue: 0,
            //             in: {$sum: ["$$value", "$$this"]}
            //          }
            //       },
            //       "reviewCount": {
            //          $avg: "$reviewArr"
            //       },
            //       "revCount": {
            //          $count: {}
            //       }
            //    })
            //    console.log(reviewsData )
            // product.numReviews = await Reviews.countDocuments({product_id: req.params.id})
            // product.rating = (Number(reviewsData[0].reviewResult)/ Number(product.numReviews)).toFixed(1)
         }
      } else {
         await reviewData.remove(review)
         res.status(404)
         throw new Error('Product not found')
      }
   } catch (err) {
      console.log(err)
      next(err)
   }
}


const getReviewsById = async (req, res, next) => {
   try {
      const review = await Reviews.findById(req.params.review_id)
      if (review) {
         return res.status(201).json({
            success: true,
            count: review.length,
            data: review
         })
      } else {
         res.status(404)
         throw new Error('Review not found')
      }
   } catch (err) {
      res.status(404)
      next(err)

   }
}

const deleteReview = async (req, res, next) => {
   try {
      const deletedReview = await Reviews.findByIdAndRemove(req.params.review_id)
      res.status(201).json({
         success: true,
         message: 'review successfully deleted'
      })
   } catch (err) {
      res.status(404)
      next(err)

   }
}


const updateReviews = async (req, res, next) => {
   try {
      const { rating, comment } = req.body
      const updatedData = {
         name: req.user.name,
         rating: rating,
         comment: comment
      }
      const updatedReview = await Reviews.findByIdAndUpdate(req.params.review_id, updatedData, { new: true })
      if (updatedReview) {
         res.status(201).json({
            success: true,
            data: updatedReview
         })
      } else {
         res.status(404)
         throw new Error('Updated review not successful')
      }
   } catch (err) {
      res.status(404)
      next(err)
   }
}





export { getReviewsById, deleteReview, updateReviews, getReviews }