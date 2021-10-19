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
      error: {
         msg: null,
         status: null,
         id: null
      }
   },
   reducers: {
      logoutSuccess: (state, action) => {
         localStorage.removeItem('userInfo')
         return {
            ...state,
            users: null,
            userLogin: {
               userInfo: userInfoFromStorage
            },
            isAuthenticated: false,
            isLoading: false,
            error: null
         }
      },
      clearErrors: (state, action) => {
         return {
            ...state,
            error: {}
         }
      }
   },
   extraReducers: {
      [getUsers.pending]: (state, action) => {
         return {
            ...state,
            isLoading: true
         }
      },
      [getUsers.fulfilled]: (state, action) => {
         return {
            ...state,
            isLoading: false,
            users: action.payload
         }
      },
      [getUsers.rejected]: (state, action) => {
         return {
            ...state,
            isLoading: false,
            error: action.payload.data.message
         }
      },
      [loginUser.pending]: (state, action) => {
         return {
            ...state,
            isLoading: true
         }

      },
      [loginUser.fulfilled]: (state, action) => {
         return {
            ...state,
            ...action.payload,
            isAuthenticated: true,
            userLogin: {
               userInfo: action.payload
            }
         }

      },
      [loginUser.rejected]: (state, action) => {
         return {
            ...state,
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
            isLoading: true
         }
      },
      [registerUser.fulfilled]: (state, action) => {
         return {
            ...state,
            ...action.payload,
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
            isLoading: true
         }
      },
      [deleteUser.fulfilled]: (state, action) => {
         return {
            ...state,
            isLoading: false,
            users: state.users.filter(user => user._id !== action.payload)
         }
      },
      [deleteUser.rejected]: (state, action) => {
         return {
            ...state,
            isLoading: false,
            error: action.payload.data.message
         }
      },
      [updateUser.pending]: (state, action) => {
         return {
            ...state,
            isLoading: true
         }
      },
      [updateUser.fulfilled]: (state, action) => {
         const { _id, email, name, isAdmin, status } = action.payload
         const existingUser = state.users.find(user => user._id === _id)
         if (existingUser) {
            existingUser.isAdmin = isAdmin
            existingUser.email = email
            existingUser.name = name
            existingUser.status = status
         }
      },
      [updateUser.rejected]: (state, action) => {
         return {
            ...state,
            isLoading: false,
            error: action.payload.data.message
         }
      },
      [updateUserProfile.pending]: (state, action) => {
         return {
            ...state,
            isLoading: false,
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
      },
      [getUserById.pending]: (state, action) => {
         return {
            ...state,
            isLoading: true
         }

      },
      [getUserById.fulfilled]: (state, action) => {
         return {
            ...state,
            isLoading: false,
            user: action.payload
         }
      },
      [getUserById.rejected]: (state, action) => {
         return {
            ...state,
            isLoading: false,
            error: action.payload.data.message
         }
      },
      [getUserProfile.pending]: (state, action) => {
         return {
            ...state,
            isLoading: true
         }
      },
      [getUserProfile.fulfilled]: (state, action) => {
         return {
            ...state,
            isLoading: false,
            user: action.payload
         }
      },
      [getUserProfile.rejected]: (state, action) => {
         return {
            ...state,
            isLoading: false,
            error: action.payload.data.message
         }

      }

   }
})
export const { logoutSuccess, clearErrors } = UserReducers.actions


export default UserReducers.reducer