import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema(
   {
      name: {
         type: String,
         require: true,
      },
      password :{
         type: String,
         require: true
      },
      email: {
         type: String,
         require: true
      },
      isAdmin: {
         type: Boolean,
         require: true,
         default: false
      },
      status: {
         type: String,
         enum: ['active', 'inactive'],
         require: true,
         default: 'active'
      }
   },
   {
      timestamps: true,
   }
);


userSchema.methods.verifyPassword = async function(enteredPassword){
   return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function(next){
   try {
      if(!this.isModified('password')) return next()
   
      const rounds = await bcrypt.genSalt(10)
   
      this.password = await bcrypt.hash(this.password, rounds);
   } catch (err) {
      return next(err)
   }
})



const User = mongoose.model('User', userSchema);


 export default User