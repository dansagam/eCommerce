
import mongoose from 'mongoose';

const ImageSchema = new mongoose.Schema(
  {
    content: {},
  },
  {
    timestamps: true,
  }
);

const Image = mongoose.model('ImageModel', ImageSchema);

export default Image
