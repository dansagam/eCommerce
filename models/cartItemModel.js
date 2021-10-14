import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema(
   {
      product: {
         type: mongoose.Schema.Types.ObjectId,
         required: true,
         ref: 'Product'
      },
      qty: {
         type: Number,
         required: true,
         default: 1,
      },
      price: {
         type: Number,
         required: true,
         default: 0
      },
      image: {
         type: String,
         required: false
      }, 
      status: {
         type: String,
         enum: ["active", "inactive"],
         required: true,
         default: "active"
      },
   },
   {
      timestamps: true,
   }
);
const CartItem = mongoose.model('CartItem', cartItemSchema)
export default CartItem;
