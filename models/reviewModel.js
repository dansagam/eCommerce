import mongoose from 'mongoose'


const reviewSchema = new mongoose.Schema({
   name: {
      type: String,
      require: true
   },
   rating: {
      type: Number,
      required: true
   },
   comment: {
      type: String,
      required: false
   },
   user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
   },
   product: {
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