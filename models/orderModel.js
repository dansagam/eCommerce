import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: 'Product'
    },
    qty: {
      type: Number,
      require: true,
      default: 1,
    },
    price: {
      type: Number,
      require: true,
      default: 0
    },
    image: {
      type: String,
      require: false
    }, 
  },
  {
    timestamps: true,
  }
);
const Order = mongoose.model('Order', orderSchema)
export default Order;
