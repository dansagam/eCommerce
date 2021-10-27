import express from "express";
import {
   addCartItems,
   getCartById,
   deleteCartItem,
   updateCartItem,
   updateCartToPaid,
   updateCartShippingAddress,
   updateCartDeliveryMode,
   getCartByUserId
} from "../controllers/cartControllers.js";
import { userAuth } from "../middlewares/authMiddlewares.js";

const router = express.Router()



router.route('/')
   .get(userAuth, getCartByUserId)
   .post(userAuth, addCartItems)

router.route('/:id')
   .get(userAuth, getCartById)

router.route('/:id/pay')
   .put(userAuth, updateCartToPaid)

router.route('/:id/shipping')
   .put(userAuth, updateCartShippingAddress)

router.route('/:id/deliveryMode')
   .put(userAuth, updateCartDeliveryMode)


router.route('/:id/item/:itemId')
   .delete(userAuth, deleteCartItem)
   .put(userAuth, updateCartItem)

export default router