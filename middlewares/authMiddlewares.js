import jwt from "jsonwebtoken"
import Reviews from "../models/reviewModel.js"
import User from "../models/userModel.js"



const userAuth = async(req, res, next) => {
   try {
      let token 
      if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
         token = req.headers.authorization.split(' ')[1]
         if(token){
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            req.user = await User.findById(decoded.id).select('-password')

            next()
         }else{
            res.status(401)
            throw new Error('Not authorised, Authorisation failed')
         }
      }else{
         res.status(404)
         throw new Error('Authourisation toke not provided')
      }
   } catch (err) {
      res.status(404)
      next(err)
   }
}



const adminAuth = (req, res, next) => {
   try {
      if(req.user && req.user.isAdmin){
         next()
      }else{
         res.status(401)
         throw new Error('Not authorised as an admin')
      }
   } catch (err) {
      res.status(401)
      next(err)
   }
}


const reviewOwnershipAuth = (req, res, next) => {
   try {
      const foundReviews =  Reviews.findById(req.params.id)
      if (foundReviews){
         if(foundReviews.user.equals(req.user._id)){
            next()
         }else{
            res.status(401)
            throw new Error('Ownership not verified')
         }
      }
   } catch (err) {
      
   }
}




export {adminAuth, userAuth, reviewOwnershipAuth} 