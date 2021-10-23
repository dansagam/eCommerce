import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";




/*
    @route  GET api//users
    @desc   
    @access public
*/
export const getUsers = async (req, res, next) => {
   try {
      const users = await User.find({})
      res.status(201).json({
         success: true,
         count: users.length,
         data: users
      })
   } catch (err) {
      res.status(401)
      next(err)

   }
}


/*
    @route  DELETE api/users/:id
    @desc 
    @access private
*/
export const deleteUser = async (req, res, next) => {
   try {
      const user = await User.findByIdAndRemove(req.params.id)

      return res.status(201).json({
         success: true,
         message: 'user successfully remove',
         data: user
      })
   } catch (err) {
      res.status(404)
      next(err)
   }
}



/*
    @route  GET api/users/:id
    @desc 
    @access private
*/
export const getUserById = async (req, res, next) => {
   try {
      const user = await User.findById(req.params.id).select('-password')
      if (user) {
         res.status(201).json({
            success: true,
            data: user
         })
      } else {
         res.status(404)
         throw new Error('User Not found')
      }
   } catch (err) {
      res.status(404)
      next(err)

   }
}


/*
    @route PUT api/users/:id
    @desc 
    @access private/admin
*/
export const updateUser = async (req, res, next) => {
   try {
      const { name, email, isAdmin, status } = req.body
      const updateUser = {
         name: name,
         email: email,
         status: status,
         isAdmin: isAdmin,
      }
      const user = await User.findByIdAndUpdate(req.params.id, updateUser, { new: true }).select('-password')

      if (user) {
         res.status(201).json({
            success: true,
            data: user
         })

      } else {
         res.status(404)
         throw new Error('User not Found')
      }
   } catch (err) {
      res.status(404)
      next(err)
   }
}


/*
    @route POST api/users/login
    @desc 
    @access public
*/
export const loginAuthUser = async (req, res, next) => {
   try {
      const { email, password } = req.body
      const user = await User.findOne({ email: email })
      if (user && (await user.verifyPassword(password))) {
         return res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
         })
      } else {
         res.status(401)
         throw new Error('Invalid email or password')
      }
   } catch (err) {
      res.status(401)
      next(err)
   }
}

/*
    @route POST api/users
    @desc 
    @access public
*/
export const registerUser = async (req, res, next) => {
   try {
      const { name, email, password } = req.body

      const userExisted = await User.findOne({ email: email })
      if (userExisted) {
         res.status(401)
         throw new Error('user already registered')
      }
      const user = await User.create({
         name: name,
         email: email,
         password: password
      })
      if (user) {
         res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
         })
      } else {
         res.status(404)
         throw new Error('Invalid User Data')
      }
   } catch (err) {
      res.status(404)
      next(err)
   }
}

/*
    @route GET api/users/:id/profile
    @desc 
    @access public
*/
export const getUserProfile = async (req, res, next) => {
   try {
      const user = await User.findById(req.params.id)
      if (user) {
         res.status(201).json({
            success: true,
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
         })
      } else {
         res.status(401)
         throw new Error('User not found')
      }
   } catch (err) {
      res.status(401)
      next(err)
   }
}


/*
    @route PUT api/user/:id/profile
    @desc 
    @access public
*/
export const updateUserProfile = async (req, res, next) => {
   try {
      const { name, email, password } = req.body
      const user = await User.findById(req.params.id)

      if (user) {
         user.name = name || user.name
         user.email = email || user.email
         if (password) {
            user.password = password
         }
         const updatedUser = await user.save()
         return res.status(201).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            isAdmin: updatedUser.isAdmin,
            email: updatedUser.email,
            token: generateToken(updatedUser._id)
         })
      } else {
         res.status(401)
         throw new Error('User not Found')
      }
   } catch (err) {
      res.status(404)
      next(err)

   }
}