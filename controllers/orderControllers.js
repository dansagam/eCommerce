import Cart from '../models/cartModel.js'
import Order from '../models/orderModel.js'

/*
    @route  api/orders
    @desc GET all cart available
    @access pr

*/

export const getOrders = async (req, res, next) => {
   try {
      const orders = await Order.find({}).populate('user', 'name email')
      if(orders) {
         res.status(201).json({
            success: true, 
            count: orders.length,
            data: orders
         })
      }else{
         res.status(404)
         throw new Error('No Order Found')
      }
   } catch (err) {
      res.status(404)
      next(err)
      
   }
}


export const getMyOrders = async(req, res, next) => {
   try {
      const orders = await Order.find({user: req.user._id})
      if(orders){
         res.status(201).json({
            success: true,
            count: orders.length,
            data: orders
         })
      }else{
         res.status(404)
         throw new Error('Order not found for users')

      }
   } catch (err) {
      res.status(404)
      next(err)
      
   }
}

export const getOrderById = async (req, res, next) =>{
   try {
      const order = await Order.findById(req.params.id).populate('cart').populate('user', 'name email')
      if(order){
         res.status(201).json({
            success: true,
            data: order
         })
      }else{
         res.status(404)
         throw new Error('Order not found for users')
      }
   } catch (err) {
      res.status(404)
      next(err)
   }
}


export const updateOrderToDelivered = async(req, res, next) => {
   try {
      const order = await Order.findById(req.params.id).populate('cart')
      if (order) {
         order.isDelivered = true
         order.deliveredAt = Date.now()

         const updatedOrder = await order.save()
         res.status(201).json({
            success: true,
            date: updatedOrder
         })
      }else{
         res.status(404)
         throw new Error('Order not found')
      }
   } catch (err) {
      res.status(404)
      next(err)
      
   }
}

