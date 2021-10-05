import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    content: {},
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Order', orderSchema);
