import mongoose from 'mongoose'


const reviewSchema = mongoose.Schema({
      name: {
         type: String,
         require: true
      },
      rating: {
         type: Number,
         require: true
      },
      comment: {
         type: String,
         require: false
      },
      // user: {
      //    type: mongoose.Schema.Types.ObjectId,
      //    require: true,
      //    ref: 'User'
      // },
      product_id: {
         type: mongoose.Schema.Types.ObjectId,
         require: true,
         ref: 'Product'
      },
   },
   {
      timestamps: true
   },
)



const Reviews = mongoose.model('Reviews', reviewSchema)

export default Reviews