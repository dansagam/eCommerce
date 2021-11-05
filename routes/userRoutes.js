import express from "express"
import {
   deleteUser,
   getUserById,
   getUserProfile,
   getUserReset,
   getUsers,
   loginAuthUser,
   registerUser,
   resetPassword,
   updateUser,
   updateUserProfile,
   userRecovery
} from "../controllers/userControllers.js";
import { adminAuth, userAuth } from "../middlewares/authMiddlewares.js";
const router = express.Router();


router.route('/')
   .get(userAuth, adminAuth, getUsers)
   .post(registerUser)

router.route('/login')
   .post(loginAuthUser)

router.route('/:id')
   .delete(userAuth, adminAuth, deleteUser)
   .put(userAuth, adminAuth, updateUser)
   .get(userAuth, adminAuth, getUserById)


router.route('/:id/profile')
   .get(userAuth, getUserProfile)
   .put(userAuth, updateUserProfile)

router.route('/recover')
   .post(userRecovery)

router.route('/reset/:token')
   .get(getUserReset)
   .post(resetPassword)


export default router