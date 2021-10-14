import mongoose from 'mongoose';

const storeSchema = new mongoose.Schema(
  {
    content: {},
  },
  {
    timestamps: true,
  }
);


const Store = mongoose.model('Store', storeSchema);
export default Store
