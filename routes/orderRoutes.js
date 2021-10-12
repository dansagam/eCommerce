import express from 'express'
import { updateOrderToDelivered } from '../controllers/orderControllers.js'

const router = express.Router()


router.route('/')
   .get()
router.route('/:id/deliver')
   .put(updateOrderToDelivered)

export default router