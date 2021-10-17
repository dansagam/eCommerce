import mongoose from 'mongoose'
import { config } from 'dotenv'
import connectDB from './config/dB.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'
import CartItem from './models/cartItemModel.js'
import Cart from './models/cartModel.js'
import Reviews from './models/reviewModel.js'
import ShippingAddress from './models/shippingAddressModel.js'
import User from './models/userModel.js'
import users from './data/users.js'
import products from './data/products.js'


config({ path: './config/config.env' })

connectDB()

const importData = async () => {
   try {
      await Order.deleteMany()
      await Product.deleteMany()
      await Cart.deleteMany(),
         await CartItem.deleteMany()
      await Reviews.deleteMany()
      await User.deleteMany()
      await ShippingAddress.deleteMany()

      const addedUsers = await User.insertMany(users)
      const adminUserId = addedUsers[0]._id
      const testProduct = products.map(product => {
         return { ...product, user: adminUserId }
      })

      await Product.insertMany(testProduct)
      console.log('data imported')
      process.exit()
   } catch (err) {
      console.error(`${err} exists`)
      process.exit(1)
   }
}

const destroyData = async () => {
   try {
      await Order.deleteMany()
      await Product.deleteMany()
      await Cart.deleteMany(),
         await CartItem.deleteMany()
      await Reviews.deleteMany()
      await User.deleteMany()
      await ShippingAddress.deleteMany()
      console.log('Data destroyed')
      process.exit()

   } catch (err) {
      console.log(err)
      process.exit(1)
   }
}


if (process.argv[2] === '-d') {
   destroyData()
} else {
   importData()
}