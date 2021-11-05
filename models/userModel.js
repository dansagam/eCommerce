import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'

const userSchema = new mongoose.Schema(
   {
      name: {
         type: String,
         required: true,
      },
      password: {
         type: String,
         require: true
      },
      email: {
         type: String,
         required: true
      },
      isAdmin: {
         type: Boolean,
         required: true,
         default: false
      },
      status: {
         type: String,
         enum: ['active', 'inactive'],
         required: true,
         default: 'active'
      },
      resetPasswordToken: {
         type: String,
         required: false
      },
      resetPasswordExpires: {
         type: Date,
         required: false
      }
   },
   {
      timestamps: true,
   }
);


userSchema.methods.verifyPassword = async function (enteredPassword) {
   return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function (next) {
   try {
      if (!this.isModified('password')) return next()

      const rounds = await bcrypt.genSalt(10)

      this.password = await bcrypt.hash(this.password, rounds);
   } catch (err) {
      return next(err)
   }
})
userSchema.methods.generatePasswordReset = async function () {
   this.resetPasswordToken = crypto.randomBytes(20).toString('hex');
   this.resetPasswordExpires = Date.now() + 360000;
}



const User = mongoose.model('User', userSchema);


export default User