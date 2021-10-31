import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const addNewCart = createAsyncThunk('cart/addNewCart',
   async (newData, { rejectWithValue, getState }) => {
      try {
         const { product_id, qty, price } = newData
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
         const postData = {
            product_id: product_id,
            qty: qty,
            price: price
         }
         const { data } = await axios.post('/api/carts', postData, config)
         // console.log(data.data)
         localStorage.setItem('cartItems', JSON.stringify(data.data.cartItems))
         return data.data

      } catch (err) {
         console.log(err.response)
         throw new rejectWithValue(err.response)
      }
   }
)

export const getCartByUserId = createAsyncThunk('cart/getCartByUserId',
   async ({ _id }, { rejectWithValue, getState }) => {
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
         const { data } = await axios.get(`/api/carts`, config)

         localStorage.setItem('cartItems', JSON.stringify(data.data.cartItems))
         localStorage.setItem('shippingAddress', JSON.stringify(data.data.shippingAddress))
         return data.data
      } catch (err) {
         throw new rejectWithValue(err.response)
      }
   }
)



export const getCartById = createAsyncThunk('cart/getCartById',
   async ({ _id }, { rejectWithValue, getState }) => {
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
         const { data } = await axios.get(`/api/carts/${_id}`, config)

         localStorage.setItem('cartItems', JSON.stringify(data.data.cartItems))
         localStorage.setItem('shippingAddress', JSON.stringify(data.data.shippingAddress))
         return data.data
      } catch (err) {
         throw new rejectWithValue(err.response)
      }
   }
)

export const updateCartToPaid = createAsyncThunk('cart/updateCartToPaid',
   async ({ _id }, { rejectWithValue, getState }) => {
      try {
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
         const { data } = await axios.put(`/api/carts/${_id}/pay`, config)
         return data

      } catch (err) {
         throw new rejectWithValue(err.response)
      }
   }
)
export const updateCartShippingAddress = createAsyncThunk('cart/updateCartShippingAddress',
   async (newData, { rejectWithValue, getState }) => {
      try {
         const { name: {
            firstName, lastName },
            address: {
               state, city, country, address, postalCode
            }, phoneNumber,
            _id
         } = newData
         const postedData = {
            name: {
               firstName: firstName,
               lastName: lastName
            },
            address: {
               state: state,
               city: city,
               country: country,
               address: address,
               postalCode: postalCode

            },
            phoneNumber: phoneNumber,
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
         const { data } = await axios.put(`/api/carts/${_id}/shipping`, postedData, config)
         localStorage.setItem('shippingAddress', JSON.stringify(data.data.shippingAddress))
         return data.data

      } catch (err) {
         throw new rejectWithValue(err.response)
      }
   }

)
export const updateCartDeliveryMode = createAsyncThunk('cart/updateCartDeliveryMode',
   async ({ _id, deliveryMode }, { rejectWithValue, getState }) => {
      try {
         const newData = {
            deliveryMode: deliveryMode
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
         const { data } = await axios.put(`/api/carts/${_id}/deliveryMode`, newData, config)
         return data.data
      } catch (err) {
         throw new rejectWithValue(err.response)
      }
   }
)
export const deleteCartItem = createAsyncThunk('cart/deleteCartItem',
   async ({ _id, itemId }, { rejectWithValue, getState }) => {
      try {
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
         const { data } = await axios.delete(`/api/carts/${_id}/item/${itemId}`, config)

         localStorage.setItem('cartItems', JSON.stringify(data.data.cartItems))
         return data.data

      } catch (err) {
         throw new rejectWithValue(err.response)
      }
   }
)
export const updatePaymentMode = createAsyncThunk('cart/updatePaymentMode',
   async ({ _id, paymentMode }, { getState, rejectWithValue }) => {
      try {
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
         const { data } = await axios.put(`/api/carts/${_id}/paymentMode`, { paymentMode: paymentMode }, config)
         return data.data
      } catch (err) {
         throw new rejectWithValue(err.response)
      }
   }
)

export const updateCartItem = createAsyncThunk('cart/updateCartItem',
   async ({ _id, itemId, qty }, { getState, rejectWithValue }) => {
      try {
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
         const { data } = await axios.put(`/api/carts/${_id}/item/${itemId}`, { qty: qty }, config)

         localStorage.setItem('cartItems', JSON.stringify(data.data.cartItems))
         return data.data
      } catch (err) {
         throw new rejectWithValue(err.response)
      }
   }
)