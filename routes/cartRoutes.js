import express from "express";
import { 
   getCarts,
   addCartItems, 
   getCartById,
   deleteCartItem,
   updateCartItem,
   updateCartToDelivered,
   updateCartToPaid
} from "../controllers/cartControllers.js";

const router = express.Router()



router.route('/')
   .get(getCarts)
   .post(addCartItems)
router.route('/:id')
   .get(getCartById)
router.route('/:id/pay')
   .put(updateCartToPaid)
router.route('/:id/deliver')
   .put(updateCartToDelivered)

router.route('/:id/item/:itemId')
   .delete(deleteCartItem)
   .put(updateCartItem)

export default router