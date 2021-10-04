import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
  {
    content: {},
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('User', userSchema);
