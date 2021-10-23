import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

export const getUsers = createAsyncThunk('user/getUsers',
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

         const { data } = await axios.get('/api/users', config)
         return data.data
      } catch (err) {
         throw new rejectWithValue(err.response)
      }
   }
)

export const registerUser = createAsyncThunk('user/registerUser',
   async ({ name, password, email }, { rejectWithValue }) => {
      try {
         const userData = {
            name: name,
            password: password,
            email: email
         }
         const config = {
            headers: {
               'Content-Type': 'application/json'
            }
         }
         const { data } = await axios.post('/api/users', userData, config)
         localStorage.setItem('userInfo', JSON.stringify(data))
         return data

      } catch (err) {
         throw new rejectWithValue(err.response)
      }
   }
)

export const loginUser = createAsyncThunk('user/loginUser',
   async ({ email, password }, { rejectWithValue }) => {
      try {
         const loginData = {
            email: email,
            password: password
         }
         const config = {
            headers: {
               'Content-Type': 'application/json'
            }
         }

         const { data } = await axios.post('/api/users/login', loginData, config)
         localStorage.setItem('userInfo', JSON.stringify(data))
         return data

      } catch (err) {
         throw new rejectWithValue(err.response)
      }
   }
)

export const deleteUser = createAsyncThunk('user/deleteUser',
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

         const { data } = await axios.delete(`/api/users/${_id}`, config)
         return data.data
      } catch (err) {
         throw new rejectWithValue(err.response)
      }
   }
)

export const updateUser = createAsyncThunk('user/updateUser',
   async ({ _id, name, email, status, isAdmin }, { rejectWithValue, getState }) => {
      try {
         const userData = {
            name: name,
            email: email,
            status: status,
            isAdmin: isAdmin,
         }
         const {
            userLogin: {
               userInfo
            }
         } = getState().User
         const config = {
            headers: {
               Authorization: `Bearer ${userInfo.token}`,
               'Content-Type': 'application/json'
            }
         }
         const { data } = await axios.put(`/api/users/${_id}`, userData, config)
         return data.data

      } catch (err) {
         throw new rejectWithValue(err.response)
      }
   }
)

export const getUserById = createAsyncThunk('user/getUserById',
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

         const { data } = await axios.get(`/api/users/${_id}`, config)
         return data.data
      } catch (err) {
         throw new rejectWithValue(err.response)
      }
   }
)


export const getUserProfile = createAsyncThunk('user/getUserProfile',
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
         const { data } = await axios.get(`/api/users/${_id}/profile`, config)
         return data
      } catch (err) {
         throw new rejectWithValue(err.response)
      }
   }
)

export const updateUserProfile = createAsyncThunk('user/updateUserProfile',
   async ({ _id, name, email, password }, { rejectWithValue, getState }) => {
      try {
         const userData = {
            name: name,
            email: email,
            password: password
         }
         const {
            userLogin: {
               userInfo
            }
         } = getState().User
         const config = {
            headers: {
               Authorization: `Bearer ${userInfo.token}`,
               'Content-Type': 'application/json'
            }
         }
         const { data } = await axios.put(`/api/users/${_id}/profile`, userData, config)
         localStorage.setItem('userInfo', JSON.stringify(data))
         return data

      } catch (err) {
         throw new rejectWithValue(err.response)
      }
   }
)


