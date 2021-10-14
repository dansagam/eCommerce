import express from 'express'
import {
   getMyOrders,
   getOrderById,
   getOrders,
   updateOrderToDelivered
} from '../controllers/orderControllers.js'
import { adminAuth, userAuth } from '../middlewares/authMiddlewares.js'

const router = express.Router()


router.route('/')
   .get(userAuth, adminAuth, getOrders)

router.route('/myorders')
   .get(userAuth, getMyOrders)


router.route('/:id')
   .get(userAuth, getOrderById)

router.route('/:id/deliver')
   .put(userAuth, updateOrderToDelivered)

export default router