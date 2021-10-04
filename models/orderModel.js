import mongoose from 'mongoose';

const orderSchema = mongoose.Schema(
  {
    content: {},
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Order', orderSchema);
