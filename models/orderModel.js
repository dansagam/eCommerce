import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'

    },
    cart: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Cart'
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false
    },
    deliveredAt: {
      type: Date
    }
  },
  {
    timestamps: true,
  }
);
const Order = mongoose.model('Order', orderSchema)
export default Order;
