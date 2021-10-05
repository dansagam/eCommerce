import mongoose from 'mongoose'
import reviewSchema from './reviewModel.js'

const productSchema = new mongoose.Schema(
   {
      user: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'User', 
      }, 
      name: {
         type: String,
         require: true
      },
      image: {
         type: String,
         require: true
      },
      brand: {
      type: String,
      required: true,
      },
      category: {
      type: String,
      required: true,
      },
      description: {
      type: String,
      required: true,
      },
      // reviews: [reviewSchema],
      // reviews: {
      //    type: mongoose.Schema.Types.ObjectId,
      //    ref: 'Reviews'
      // },
      rating: {
        type: Number,
        required: true,
        default: 0,
      },
      numReviews: {
        type: Number,
        required: true,
        default: 0,
      },
      price: {
        type: Number,
        required: true,
        default: 0,
      },
      countInStock: {
        type: Number,
        required: true,
        default: 0,
      },
   },
   {
      timestamps: true
   }
)

const Product = mongoose.model('Product', productSchema)

export default Product