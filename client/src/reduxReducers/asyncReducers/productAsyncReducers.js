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
         const response = await axios.get(`/api/products?keyword=${keyword}&pageNumber=${pageNumber}`)
         console.log(response)
         return response.data.data
      } catch (err) {
         console.log(err.response)
         throw rejectWithValue(err.response)
      }
   }
)
export const getProductById = createAsyncThunk('product/getProductById',
   async (productId, { rejectWithValue, getState }) => {
      try {
         const response = await axios.get(`/api/products/${productId}`)
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
         const response = await axios.get(`/api/products/top`)
         return response.data.data
      } catch (err) {
         throw new rejectWithValue(err.response)
      }
   }
)

export const createNewProduct = createAsyncThunk('product/createNewProduct',
   async (newProduct, { rejectWithValue, getState }) => {
      try {
         const formData = new FormData()
         formData.append()
         const config = {
            headers: {
               'Content-Type': 'multipart/form-data',
               Authorization: `Bearer `
            }
         }
         const response = await axios.post(`/api/products`, formData, config)
         return response.data.data
      } catch (err) {
         throw new rejectWithValue(err.response)
      }
   }
)

export const deleteProduct = createAsyncThunk('product/deleteProduct',
   async (productId, { rejectWithValue, getState }) => {
      try {

      } catch (err) {
         throw new rejectWithValue(err.response)
      }
   }
)

export const updateProduct = createAsyncThunk('product/updateProduct',
   async (editedProduct, { rejectWithValue, getState }) => {
      try {

      } catch (err) {
         throw new rejectWithValue(err.response)
      }
   }
)