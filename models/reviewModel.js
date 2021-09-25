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
      require: true
   },
   user: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: 'User'
   }
})



const reviews = mongoose.model('Reviews', reviewSchema)

export default reviews