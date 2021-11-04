import { createSlice } from "@reduxjs/toolkit"
import {
   deleteUser,
   getUserById,
   getUserProfile,
   getUsers,
   loginUser,
   registerUser,
   updateUser,
   updateUserProfile
} from "./asyncReducers/userAsyncReducers"

const userInfoFromStorage = localStorage.getItem('userInfo')
   ? JSON.parse(localStorage.getItem('userInfo')) : null


export const UserReducers = createSlice({
   name: 'user',
   initialState: {
      users: [],
      user: {},
      userLogin: {
         userInfo: userInfoFromStorage
      },
      isAuthenticated: null,
      isLoading: false,
      success: false,
      error: {
         msg: '',
         status: undefined,
         id: null
      }
   },
   reducers: {
      logoutSuccess: (state, action) => {
         localStorage.removeItem('userInfo')
         localStorage.removeItem('cartItems')
         localStorage.removeItem('shippingAddress')
         return {
            ...state,
            users: null,
            userLogin: {
               userInfo: {}
            },
            success: false,
            isAuthenticated: false,
            isLoading: false,
            error: {
               msg: '',
               status: undefined,
               id: null
            }
         }
      },
      clearErrors: (state, action) => {
         return {
            ...state,
            error: {
               msg: '',
               status: undefined,
               id: null
            },
            success: false
         }
      }
   },
   extraReducers: {
      [getUsers.pending]: (state, action) => {
         return {
            ...state,
            isLoading: true,
            success: false
         }
      },
      [getUsers.fulfilled]: (state, action) => {
         return {
            ...state,
            isLoading: false,
            users: action.payload,
            // success: true
         }
      },
      [getUsers.rejected]: (state, action) => {
         return {
            ...state,
            isLoading: false,
            success: false,
            error: action.payload.data.message
         }
      },
      [loginUser.pending]: (state, action) => {
         return {
            ...state,
            isLoading: true,
            success: false
         }

      },
      [loginUser.fulfilled]: (state, action) => {
         return {
            ...state,
            ...action.payload,
            isAuthenticated: true,
            // success: true,
            userLogin: {
               userInfo: action.payload
            }
         }

      },
      [loginUser.rejected]: (state, action) => {
         return {
            ...state,
            success: false,
            isLoading: false,
            isAuthenticated: false,
            userLogin: {
               userInfo: null
            },
            error: {
               msg: action.payload.data.message,
               status: action.payload.status,
               id: action.payload.statusText
            }
            // error: action.payload.data.message
         }
      },
      [registerUser.pending]: (state, action) => {
         return {
            ...state,
            isLoading: true,
            success: false
         }
      },
      [registerUser.fulfilled]: (state, action) => {
         return {
            ...state,
            ...action.payload,
            // success: true,
            users: [action.payload, ...state.users],
            isAuthenticated: true,
            userLogin: {
               userInfo: action.payload
            }
         }
      },
      [registerUser.rejected]: (state, action) => {
         return {
            ...state,
            isLoading: false,
            success: false,
            isAuthenticated: false,
            userLogin: {
               userInfo: null
            },
            error: action.payload.data.message
         }
      },
      [deleteUser.pending]: (state, action) => {
         return {
            ...state,
            isLoading: true,
            success: false
         }
      },
      [deleteUser.fulfilled]: (state, action) => {
         return {
            ...state,
            isLoading: false,
            // success: true,
            users: state.users.filter(user => user._id !== action.payload)
         }
      },
      [deleteUser.rejected]: (state, action) => {
         return {
            ...state,
            isLoading: false,
            error: action.payload.data.message,
            success: false
         }
      },
      [updateUser.pending]: (state, action) => {
         return {
            ...state,
            isLoading: true,
            success: false
         }
      },
      [updateUser.fulfilled]: (state, action) => {
         // const { _id, email, name, isAdmin, status } = action.payload
         // const existingUser = state.users.find(user => user._id === _id)
         // if (existingUser) {
         //    existingUser.isAdmin = isAdmin
         //    existingUser.email = email
         //    existingUser.name = name
         //    existingUser.status = status
         // }
         return {
            ...state,
            success: true,
            user: action.payload
         }
      },
      [updateUser.rejected]: (state, action) => {
         return {
            ...state,
            isLoading: false,
            success: false,
            error: action.payload.data.message
         }
      },
      [updateUserProfile.pending]: (state, action) => {
         return {
            ...state,
            isLoading: false,
            success: false
         }
      },
      [updateUserProfile.fulfilled]: (state, action) => {
         const { _id, email, name, isAdmin, status } = action.payload
         const existingUser = state.users.find(user => user._id === _id)
         if (existingUser) {
            existingUser.isAdmin = isAdmin
            existingUser.email = email
            existingUser.name = name
            existingUser.status = status
         }
         return {
            ...state,
            success: true,
            user: action.payload
         }
      },
      [getUserById.pending]: (state, action) => {
         return {
            ...state,
            isLoading: true,
            success: false
         }

      },
      [getUserById.fulfilled]: (state, action) => {
         return {
            ...state,
            isLoading: false,
            user: action.payload,
            // success: true
         }
      },
      [getUserById.rejected]: (state, action) => {
         return {
            ...state,
            isLoading: false,
            error: action.payload.data.message,
            success: false
         }
      },
      [getUserProfile.pending]: (state, action) => {
         return {
            ...state,
            isLoading: true,
            success: false
         }
      },
      [getUserProfile.fulfilled]: (state, action) => {
         return {
            ...state,
            isLoading: false,
            user: action.payload,
            // success: true
         }
      },
      [getUserProfile.rejected]: (state, action) => {
         return {
            ...state,
            isLoading: false,
            success: false,
            error: action.payload.data.message
         }

      }

   }
})
export const { logoutSuccess, clearErrors } = UserReducers.actions


export default UserReducers.reducer