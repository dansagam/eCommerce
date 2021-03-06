import Cart from '../models/cartModel.js'
import Order from '../models/orderModel.js'

/*
    @route  api/orders
    @desc GET all cart available
    @access private Admin

*/

export const getOrders = async (req, res, next) => {
   try {
      const orders = await Order.find({})
         .populate({ path: 'user', select: 'name email' })
         .populate({
            path: 'cart',
            populate: {
               path: 'cartItems',
               populate: {
                  path: 'product'
               }
            },
            populate: {
               path: 'shippingAddress'
            }
         }).populate({
            path: 'orderItems',
            populate: {
               path: 'product'
            }
         }).populate({
            path: 'shippingAddress'
         })
      // .populate({ path: 'user', select: 'name email' })
      // .populate({
      //    path: 'cart',
      //    populate: {
      //       path: 'cartItems'
      //    },
      //    populate: {
      //       path: 'shippingAddress'
      //    }
      // })
      // .populate('user', 'name email')
      if (orders) {
         res.status(201).json({
            success: true,
            count: orders.length,
            data: orders
         })
      } else {
         res.status(404)
         throw new Error('No Order Found')
      }
   } catch (err) {
      res.status(404)
      next(err)

   }
}

/*
    @route  api/orders/myorders
    @desc get All orders of the users
    @access private
*/
export const getMyOrders = async (req, res, next) => {
   try {
      const orders = await Order.find({ user: req.user._id })
         .populate({ path: 'user', select: 'name email' })
         .populate({
            path: 'cart',
            populate: {
               path: 'cartItems',
               populate: {
                  path: 'product'
               }
            },
            populate: {
               path: 'shippingAddress'
            }
         }).populate({
            path: 'orderItems',
            populate: {
               path: 'product'
            }
         }).populate({
            path: 'shippingAddress'
         })
      if (orders) {
         res.status(201).json({
            success: true,
            count: orders.length,
            data: orders
         })
      } else {
         res.status(404)
         throw new Error('Order not found for users')

      }
   } catch (err) {
      res.status(404)
      next(err)

   }
}

/*
    @route  api/orders/:id
    @desc GET order by params Id
    @access private
*/


export const getOrderById = async (req, res, next) => {
   try {
      const order = await Order.findById(req.params.id)
         .populate({ path: 'user', select: 'name email' })
         .populate({
            path: 'cart',
            populate: {
               path: 'cartItems',
               populate: {
                  path: 'product'
               }
            },
            populate: {
               path: 'shippingAddress'
            }
         }).populate({
            path: 'orderItems',
            populate: {
               path: 'product'
            }
         }).populate({
            path: 'shippingAddress'
         })
      // .populate('cart').populate('user', 'name email')
      if (order) {
         res.status(201).json({
            success: true,
            data: order
         })
      } else {
         res.status(404)
         throw new Error('Order not found for users')
      }
   } catch (err) {
      res.status(404)
      next(err)
   }
}


/*
    @route  api/order
    @desc POST new order
    @access private
*/
export const createNewOrder = async (req, res, next) => {
   try {
      const {
         cartId,
         shippingAddress,
         orderItems,
         taxPrice,
         shippingPrice,
         totalPrice,
         paymentMethod

      } = req.body
      const newData = {
         user: req.user._id,
         cart: cartId,
         shippingAddress: shippingAddress,
         orderItems: orderItems,
         taxPrice: taxPrice,
         shippingPrice: shippingPrice,
         totalPrice: totalPrice,
         paymentMethod: paymentMethod
      }
      const existingOrder = await Order.findOne({ cart: cartId }).populate('orderItems')
      if (existingOrder && existingOrder.length !== 0) {
         const foundCart = await Cart.findById(cartId)
         // const foundOrderItem = existingOrder.orderItems.find(orderItem => orderItem._id !==foundCart.)
         const updatedOrder = await Order.findByIdAndUpdate(existingOrder._id, newData)
            .populate({ path: 'user', select: 'name email' })
            .populate({
               path: 'cart',
               populate: {
                  path: 'cartItems',
                  populate: {
                     path: 'product'
                  }
               },
               populate: {
                  path: 'shippingAddress'
               }
            }).populate({
               path: 'orderItems',
               populate: {
                  path: 'product'
               }
            }).populate({
               path: 'shippingAddress'
            })
         if (updatedOrder) {
            const deactivatedCart = await Cart.findByIdAndUpdate(cartId,
               { status: 'inactive' }, { new: true }
            )
            res.status(201).json({
               success: true,
               data: updatedOrder
            })

         } else {
            res.status(401)
            throw new Error('Order cannot be updated')
         }

      } else {
         const newOrderCreated = await Order.create(newData)
         if (newOrderCreated) {
            const retrievedData = await Order.findById(newOrderCreated._id)
               .populate({ path: 'user', select: 'name email' })
               .populate({
                  path: 'cart',
                  populate: {
                     path: 'cartItems',
                     populate: {
                        path: 'product'
                     }
                  },
                  populate: {
                     path: 'shippingAddress'
                  }
               }).populate({
                  path: 'orderItems',
                  populate: {
                     path: 'product'
                  }
               }).populate({
                  path: 'shippingAddress'
               })
            if (retrievedData) {
               const deactivatedCart = await Cart.findByIdAndUpdate(cartId,
                  { status: 'inactive' }, { new: true }
               )
               res.status(201).json({
                  success: true,
                  data: retrievedData
               })

            } else {
               res.status(401)
               throw new Error('creation Not successful')
            }
         } else {
            res.status(401)
            throw new Error('creation Not successful')
         }

      }
   } catch (err) {
      res.status(404)
      next(err)
   }
}


/*
    @route  api/orders/:id/deliver
    @desc PUT deliver
    @access private
*/

export const updateOrderToDelivered = async (req, res, next) => {
   try {
      const order = await Order.findByIdAndUpdate(req.params.id,
         { isDelivered: true, deliveredAt: Date.now() }, { new: true })
         .populate({ path: 'user', select: 'name email' })
         .populate({
            path: 'cart',
            populate: {
               path: 'cartItems',
               populate: {
                  path: 'product'
               }
            },
            populate: {
               path: 'shippingAddress'
            }
         }).populate({
            path: 'orderItems',
            populate: {
               path: 'product'
            }
         }).populate({
            path: 'shippingAddress'
         })
      if (order) {
         res.status(201).json({
            success: true,
            date: order
         })
      } else {
         res.status(404)
         throw new Error('Order not found')
      }
   } catch (err) {
      res.status(404)
      next(err)

   }
}


/*
    @route  api/orders/:id/pay
    @desc PUT update payment 
    @access private
*/

export const orderPaymentUpdate = async (req, res, next) => {
   try {
      const foundOrder = await Order.findById(req.params.id)
      if (foundOrder) {
         foundOrder.isPaid = true
         foundOrder.paidAt = Date.now()
         foundOrder.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.email_address
         }
         const updatedOrder = await Order.findByIdAndUpdate(req.params.id,
            foundOrder, { new: true }
         ).populate({ path: 'user', select: 'name email' })
            .populate({
               path: 'cart',
               populate: {
                  path: 'cartItems',
                  populate: {
                     path: 'product'
                  }
               },
               populate: {
                  path: 'shippingAddress'
               }
            }).populate({
               path: 'orderItems',
               populate: {
                  path: 'product'
               }
            }).populate({
               path: 'shippingAddress'
            })
         if (updatedOrder) {
            res.status(201).json({
               success: true,
               data: updatedOrder
            })
         } else {
            res.status(401)
            throw new Error('Order payment not updated')
         }
      }
   } catch (err) {
      res.status(404)
      next(err)
   }
}




