import axios from 'axios'
import { createAsyncThunk } from "@reduxjs/toolkit"




export const createNewOrder = createAsyncThunk('order/createNewOrder',
   async (newOrder, { rejectWithValue, getState }) => {
      try {
         const { cartId,
            shippingAddress,
            orderItems,
            totalPrice,
            taxPrice,
            shippingPrice,
            paymentMode
         } = newOrder
         const newData = {
            cartId: cartId,
            shippingAddress: shippingAddress,
            orderItems: orderItems,
            taxPrice: taxPrice,
            shippingPrice: shippingPrice,
            totalPrice: totalPrice,
            paymentMethod: paymentMode
         }
         const {
            userLogin: {
               userInfo
            }
         } = getState().User
         const config = {
            headers: {
               'Content-Type': 'application/json',
               Authorization: `Bearer ${userInfo.token}`

            }
         }
         const { data } = await axios.post('/api/orders', newData, config)
         localStorage.removeItem('cartItems')

         return data.data
      } catch (err) {
         throw new rejectWithValue(err.response)
      }
   }
)


export const getOrders = createAsyncThunk('order/getOrders',
   async (arg, { getState, rejectWithValue }) => {
      try {
         const {
            userLogin: {
               userInfo
            }
         } = getState().User
         const config = {
            headers: {
               Authorization: `Bearer ${userInfo.token}`
            }
         }

         const { data } = await axios.get('/api/orders', config)
         return data.data
      } catch (err) {
         throw new rejectWithValue(err.response)
      }
   }
)

export const getMyOrders = createAsyncThunk('order/getMyOrders',
   async (arg, { getState, rejectWithValue }) => {
      try {
         const {
            userLogin: {
               userInfo
            }
         } = getState().User
         const config = {
            headers: {
               Authorization: `Bearer ${userInfo.token}`
            }
         }

         const { data } = await axios.get('/api/orders/myorders', config)
         return data.data

      } catch (err) {
         throw new rejectWithValue(err.response)

      }
   }
)

export const getOrderById = createAsyncThunk('order/getOrderById',
   async (reqData, { getState, rejectWithValue }) => {
      try {
         const { _id } = reqData
         const {
            userLogin: {
               userInfo
            }
         } = getState().User
         const config = {
            headers: {
               Authorization: `Bearer ${userInfo.token}`
            }
         }
         const { data } = await axios.get(`/api/orders/${_id}`, config)
         return data.data
      } catch (err) {
         throw new rejectWithValue(err.response)
      }
   }
)

export const updateOrderToDelivered = createAsyncThunk('order/updateOrderToDelivered',
   async (reqData, { getState, rejectWithValue }) => {
      try {
         const { _id } = reqData
         const {
            userLogin: {
               userInfo
            }
         } = getState().User
         const config = {
            headers: {
               Authorization: `Bearer ${userInfo.token}`
            }
         }
         const { data } = await axios.get(`/api/orders/${_id}/deliver`, config)
         return data.data

      } catch (err) {
         throw new rejectWithValue(err.response)
      }
   })