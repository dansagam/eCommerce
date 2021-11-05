import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const getProductLists = createAsyncThunk('product/getProductLists',
   async ({ keyword = '', pageNumber = '' }, { rejectWithValue }) => {
      try {
         // axios.defaults.proxy = {
         //    protocol: 'http',
         //    host: 'localhost',
         //    port: 5000
         // }
         const { data } = await axios.get(`/api/products?keyword=${keyword}&pageNumber=${pageNumber}`)
         // console.log(data)
         return data.data
      } catch (err) {
         console.log(err.response)
         throw rejectWithValue(err.response)
      }
   }
)
export const getProductById = createAsyncThunk('product/getProductById',
   async ({ _id }, { rejectWithValue, getState }) => {
      try {
         const response = await axios.get(`/api/products/${_id}`)
         return response.data.data
      } catch (err) {
         console.log(err.response)
         throw new rejectWithValue(err.response)
      }
   }
)

export const getTopRatedProduct = createAsyncThunk('product/getTopRatedProduct',
   async (arg, { rejectWithValue }) => {
      try {
         const { data } = await axios.get(`/api/products/top`)
         return data.data
      } catch (err) {
         throw new rejectWithValue(err.response)
      }
   }
)

export const createNewProduct = createAsyncThunk('product/createNewProduct',
   async ({ name, brand, category, description, price, image }, { rejectWithValue, getState }) => {
      try {
         const formData = new FormData()
         formData.append('name', name)
         formData.append('brand', brand)
         formData.append('image', image)
         formData.append('description', description)
         formData.append('price', price)
         formData.append('category', category)
         const {
            userLogin: {
               userInfo
            }
         } = getState().User
         const config = {
            headers: {
               'Content-Type': 'multipart/form-data',
               Authorization: `Bearer ${userInfo.token}`
            }
         }
         const { data } = await axios.post(`/api/products/`, formData, config)
         return data.data
      } catch (err) {
         throw new rejectWithValue(err.response)
      }
   }
)

export const deleteProduct = createAsyncThunk('product/deleteProduct',
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
         const { data } = await axios.delete(`/api/products/${_id}`, config)
         return data.data
      } catch (err) {
         throw new rejectWithValue(err.response)
      }
   }
)

export const updateProduct = createAsyncThunk('product/updateProduct',
   async (editedProduct, { rejectWithValue, getState }) => {
      try {
         const { _id, name, image, category, description, price, countInStock } = editedProduct
         const updatedProduct = {
            name: name,
            description: description,
            category: category,
            price: price,
            image: image,
            countInStock: countInStock

         }
         const {
            userLogin: {
               userInfo
            }
         } = getState().User
         const config = {
            headers: {
               'Content-Type': 'multipart/form-data',
               Authorization: `Bearer ${userInfo.token}`
            }
         }
         const { data } = await axios.put(`/api/products/${_id}`, updatedProduct, config)
         return data.data
      } catch (err) {
         throw new rejectWithValue(err.response)
      }
   }
)

export const createReview = createAsyncThunk('product/createReview',
   async (arg1, { getState, rejectWithValue }) => {
      try {
         const { _id, comment, rating } = arg1

         const newData = {
            comment: comment,
            rating: rating
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

         const { data } = await axios.post(`/api/product/${_id}/reviews`, newData, config)
         return data.data


      } catch (err) {
         throw new rejectWithValue(err.response)

      }
   }
)