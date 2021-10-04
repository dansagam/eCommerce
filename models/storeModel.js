import mongoose from 'mongoose';

const storeSchema = mongoose.Schema(
  {
    content: {},
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Store', storeSchema);
