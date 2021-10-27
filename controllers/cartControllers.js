import mongoose from 'mongoose'
import CartItem from '../models/cartItemModel.js'
import Cart from '../models/cartModel.js'
import Order from '../models/orderModel.js'
import Product from '../models/productModel.js'
import ShippingAddress from '../models/shippingAddressModel.js'




export const getCartByUserId = async (req, res, next) => {
   try {
      const cart = await Cart.findOne({ user: req.user._id })
         .populate({ path: 'cartItems', populate: { path: 'product' } })
      if (cart) {
         res.status(201).json({
            success: true,
            data: cart
         })
      } else {
         res.status(404)
         throw new Error('Cart not found for users')
      }
   } catch (err) {
      res.status(404)
      next(err)

   }
}

/*
    @route  api/cart/:id
    @desc GET cart by ID
    @access private
*/
export const getCartById = async (req, res, next) => {
   try {
      const cart = await Cart.findById(req.params.id)
         .populate({ path: 'cartItems', populate: { path: 'product' } })
      if (cart) {
         res.status(201).json({
            success: true,
            count: cart.length,
            data: cart
         })
      } else {
         res.status(404)
         throw new Error('Cart not found for users')
      }
   } catch (err) {
      res.status(404)
      next(err)

   }
}


/*
    @route  api/cart
    @desc POST add item to cart and create cart
    @access private
*/

export const addCartItems = async (req, res, next) => {
   try {
      const {
         product_id, qty, price
      } = req.body
      const existingCart = await Cart.findOne({ user: req.user._id })
         .populate({ path: 'cartItems' })
      if (existingCart && existingCart.length !== 0) {
         const foundProduct = await Product.findById(product_id)
         const foundExistingProductItem = existingCart.cartItems.find(cartIT =>
            cartIT.product.equals(foundProduct._id))
         // console.log(foundExistingProductItem)
         if (foundExistingProductItem) {
            const cartItem = await CartItem.findByIdAndUpdate(foundExistingProductItem._id,
               { qty: qty }, { new: true })
            if (cartItem) {
               const updatedCart = await Cart.findById(existingCart._id)
                  .populate({ path: 'cartItems', populate: { path: 'product' } })
               res.status(201).json({
                  success: true,
                  data: updatedCart
               })
            }
         } else {
            const cartItem = await CartItem.create({
               product: product_id,
               qty: qty,
               price: price
            })
            if (cartItem) {
               existingCart.cartItems.push(cartItem)
               existingCart.totalPrice = existingCart.cartItems.reduce((acc, item) =>
                  (item.price * item.qty) + acc, 0)
               const updatedCart = await Cart.findByIdAndUpdate(existingCart._id, existingCart,
                  { new: true }).populate({ path: 'cartItems', populate: { path: 'product' } })
               res.status(201).json({
                  success: true,
                  data: updatedCart
               })
            } else {
               res.status(401)
               throw new Error('Item not added successfully')
            }
         }
      } else {
         const cartItem = await CartItem.create({
            product: product_id,
            qty: qty,
            price: price
         })
         if (cartItem) {
            const newCart = {
               user: req.user._id,
               cartItems: [cartItem._id],
               totalPrice: cartItem.price
            }
            const cart = await Cart.create(newCart)

            res.status(201).json({
               success: true,
               data: cart
            })
         } else {
            res.status(401)
            throw new Error('Item not added successfully')
         }

      }
   } catch (err) {
      res.status(401)
      next(err)
   }
}

/*
    @route  api/cart/:id/item/:itemId
    @desc DELETE by ID and removing from the array
    @access private
*/

export const deleteCartItem = async (req, res, next) => {
   try {
      const foundCart = await Cart.findById(req.params.id)
      if (foundCart) {
         const foundCartItem = await CartItem.findById(req.params.itemId)
         if (foundCartItem) {
            // goddy = foundCart.cartItems.filter(item => item !== foundCartItem._id)
            foundCart.cartItems.splice(foundCart.cartItems.indexOf(foundCartItem._id), 1)
            // console.log(foundCart, foundCartItem._id)
            const updatedCart = await Cart.findByIdAndUpdate(foundCart._id, foundCart,
               { new: true }
            ).populate({ path: 'cartItems', populate: { path: 'product' } })
            const deletedItem = await CartItem.findByIdAndRemove(req.params.itemId)
            res.status(201).json({
               success: true,
               data: updatedCart,
               deletedData: deletedItem
            })
         } else {
            res.status(404)
            throw new Error('Cart Item not found')
         }
      } else {
         res.status(401)
         throw new Error('Cart Information not Found')
      }
   } catch (err) {
      res.status(404)
      next(err)

   }
}

export const updateCartShippingAddress = async (req, res, next) => {
   try {
      const { name: {
         firstName, lastName },
         address: {
            state, city, country, address, postalCode
         }, phoneNumber
      } = req.body
      const cart = await Cart.findById(req.params.id)
      if (cart) {
         const newShippingAddress = {
            name: {
               firstName: firstName,
               lastName: lastName
            },
            phoneNumber: phoneNumber,
            address: {
               state: state,
               city: city,
               country: country,
               address: address,
               postalCode: postalCode
            }
         }
         const shippingAddress = await ShippingAddress.create(newShippingAddress)
         if (shippingAddress) {
            cart.shippingAddress = shippingAddress._id
            const updateCartShipping = await
               Cart.findByIdAndUpdate(cart._id, cart, { new: true }
               ).populate({ path: 'cartItems', populate: { path: 'product' } }).populate('shippingAddress')
            res.status(201).json({
               success: true,
               data: updateCartShipping
            })
         } else {
            res.status(401)
            throw new Error('shipping address not added')
         }
      } else {
         res.status(404)
         throw new Error('Cart cannot be found')
      }
   } catch (err) {
      res.status(404)
      next(err)
   }
}

export const updateCartDeliveryMode = async (req, res, next) => {
   try {
      const { deliveryMode } = req.body
      const foundCart = await Cart.findByIdAndUpdate(req.params.id,
         { deliveryMode: deliveryMode }, { new: true }
      ).populate({ path: 'cartItems', populate: { path: 'product' } })
      if (foundCart) {
         res.status(201).json({
            success: true,
            data: foundCart
         })
      } else {
         res.status(404)
         throw new Error('Cart could not be found')
      }
   } catch (err) {
      res.status(404)
      next(err)

   }
}



export const updateCartItem = async (req, res, next) => {
   try {
      const { qty, } = req.body
      const updatedCartItem = await CartItem.findByIdAndUpdate(req.params.itemId,
         { qty: qty }, { new: true }
      ).populate({ path: 'cartItems', populate: { path: 'product' } })
      if (updatedCartItem) {
         res.status(201).json({
            success: true,
            data: updatedCartItem
         })
      } else {
         res.status(401)
         throw new Error('Item could not be updated')
      }
   } catch (err) {
      res.status(401)
      next(err)
   }
}

export const updateCartToPaid = async (req, res, next) => {
   try {
      const cart = await Cart.findById(req.params.id)
      if (cart) {
         cart.isPaid = true
         cart.paidAt = Date.now()
         // cart.paymentResult = {
         //    id: req.body.id,
         //    status: req.body.status,
         //    update_time: req.body.update_time,
         //    email_address: req.body.payer.email_address
         // }
         const updatedCart = await Cart.findByIdAndUpdate(req.params.id,
            cart, { new: true }
         )
         if (updatedCart) {
            const recentCart = await Cart.findByIdAndUpdate(req.params.id,
               { status: "inactive" }, { new: true }
            ).populate({ path: 'cartItems', populate: { path: 'product' } })
            if (recentCart) {
               const newCreatedOrder = await Order.create({
                  user: req.user._id,
                  cart: recentCart._id,
               })
               res.status(201).json({
                  success: true,
                  data: recentCart,
                  orderData: newCreatedOrder
               })
            } else {
               res.status(401)
               throw new Error('Cart status not changed')
            }
         } else {
            res.status(401)
            throw new Error('Cart Payment not updated')
         }
      } else {
         res.status(404)
         throw new Error('Order not found')
      }
   } catch (err) {
      res.status(401)
      next(err)

   }
}



