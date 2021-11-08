import { createSlice } from "@reduxjs/toolkit"
import {
   addNewCart,
   deleteCartItem,
   getCartById,
   getCartByUserId,
   updateCartDeliveryMode,
   updateCartItem,
   updateCartShippingAddress,
   updateCartToPaid,
   updatePaymentMode
} from "./asyncReducers/cartAsyncReducers"

const cartItemsFromStorage = localStorage.getItem('cartItems')
   ? JSON.parse(localStorage.getItem('cartItems')) : []

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
   ? JSON.parse(localStorage.getItem('shippingAddress'))
   : {}

const CartReducers = createSlice({
   name: 'cart',
   initialState: {
      carts: [],
      cart: {},
      cartItems: cartItemsFromStorage,
      shippingAddress: shippingAddressFromStorage,
      itemsPrice: 0,
      shippingPrice: 0,
      taxPrice: 0,
      isPaid: false,
      deliveryMode: '',
      paymentMode: '',
      paidAt: null,
      generalLoading: {
         loadingCart: false,
         loadingShipping: false
      },
      successGeneral: {
         addCartSuccess: false,
         updateSuccess: false,
         updateDeliverySuccess: false,
         updateCartItemSuccess: false,
         paidSuccess: false,
         addShippingSuccess: false,
         getCartSuccess: false,
      },
      addCartSuccess: false,
      updateSuccess: false,
      updateDeliverySuccess: false,
      updateCartItemSuccess: false,
      paidSuccess: false,
      addShippingSuccess: false,
      getCartSuccess: false,
      error: {
         cart_error_msg: '',
         cart_error_status: null,
         cart_error_id: null
      },
      cart_status: false,
      loadingCart: false,
      loadingShipping: false
   },
   reducers: {
      clearError: (state, action) => {
         return {
            error: {
               cart_error_msg: '',
               cart_error_status: null,
               cart_error_id: null
            }
         }
      },
      savePaymentMode: (state, action) => {
         return {
            ...state,
            paymentMode: action.payload
         }

      }
   },
   extraReducers: {
      [addNewCart.pending]: (state, action) => {
         return {
            ...state,
            addCartSuccess: false,
            loadingCart: true
         }
      },
      [addNewCart.fulfilled]: (state, action) => {
         return {
            ...state,
            addCartSuccess: true,
            loadingCart: false,
            cart: action.payload,
            cartItems: action.payload.cartItems
         }
      },
      [addNewCart.rejected]: (state, action) => {
         console.log(action.payload)
         return {
            ...state,
            addCartSuccess: false,
            loadingCart: false,
            error: {
               cart_error_msg: action.payload.data.message,
               cart_error_status: action.payload.status,
               cart_error_id: action.payload.statusText
            },
         }
      },
      [getCartById.pending]: (state, action) => {
         return {
            ...state,
            getCartSuccess: false,
            loadingCart: true,
         }
      },
      [getCartById.fulfilled]: (state, action) => {
         return {
            ...state,
            getCartSuccess: true,
            loadingCart: false,
            cart: action.payload,
            cartItems: action.payload.cartItems,
            shippingAddress: action.payload.shippingAddress || {},
            paymentMode: action.payload.paymentMethod
         }
      },
      [getCartById.rejected]: (state, action) => {
         return {
            ...state,
            getCartSuccess: false,
            loadingCart: false,
            error: {
               cart_error_msg: action.payload.data.message,
               cart_error_status: action.payload.status,
               cart_error_id: action.payload.statusText
            },
         }
      },
      [getCartByUserId.pending]: (state, action) => {
         return {
            ...state,
            getCartSuccess: false,
            loadingCart: true,
         }
      },
      [getCartByUserId.fulfilled]: (state, action) => {
         return {
            ...state,
            getCartSuccess: true,
            loadingCart: false,
            cart: action.payload,
            cartItems: action.payload.cartItems,
            shippingAddress: action.payload.shippingAddress || {},
            paymentMode: action.payload.paymentMethod
         }
      },
      [getCartByUserId.rejected]: (state, action) => {
         return {
            ...state,
            getCartSuccess: false,
            loadingCart: false,
            error: {
               cart_error_msg: action.payload.data.message,
               cart_error_status: action.payload.status,
               cart_error_id: action.payload.statusText
            },
         }
      },
      [updateCartToPaid.pending]: (state, action) => {
         return {
            ...state,
            loadingCart: true,
            updateSuccess: false

         }
      },
      [updateCartToPaid.fulfilled]: (state, action) => {
         return {
            ...state,
            loadingCart: false,
            isPaid: true,
            updateSuccess: true
         }
      },
      [updateCartToPaid.rejected]: (state, action) => {
         return {
            ...state,
            updateSuccess: false,
            loadingCart: false,
            error: {
               cart_error_msg: action.payload.data.message,
               cart_error_status: action.payload.status,
               cart_error_id: action.payload.statusText
            },

         }
      },
      [updatePaymentMode.pending]: (state, action) => {
         return {
            ...state,
            loadingCart: true,
            updateSuccess: false
         }
      },
      [updatePaymentMode.fulfilled]: (state, action) => {
         return {
            ...state,
            updateSuccess: true,
            loadingCart: false,
            cart: action.payload,
            paymentMode: action.payload.paymentMethod
         }
      },
      [updatePaymentMode.rejected]: (state, action) => {
         return {
            ...state,
            updateSuccess: false,
            loadingCart: false,
            error: {
               cart_error_msg: action.payload.data.message,
               cart_error_status: action.payload.status,
               cart_error_id: action.payload.statusText
            },
         }
      },
      [updateCartShippingAddress.pending]: (state, action) => {
         return {
            ...state,
            addShippingSuccess: false,
            loadingShipping: true
         }
      },
      [updateCartShippingAddress.fulfilled]: (state, action) => {
         return {
            ...state,
            addShippingSuccess: true,
            loadingShipping: false,
            shippingAddress: action.payload.shippingAddress,
            cart: action.payload
         }
      },
      [updateCartShippingAddress.rejected]: (state, action) => {
         return {
            ...state,
            addShippingSuccess: false,
            loadingShipping: false,
            error: {
               cart_error_msg: action.payload.data.message,
               cart_error_status: action.payload.status,
               cart_error_id: action.payload.statusText
            },

         }
      },
      [updateCartDeliveryMode.pending]: (state, action) => {
         return {
            ...state,
            updateDeliverySuccess: false,
            loadingCart: true
         }
      },
      [updateCartDeliveryMode.fulfilled]: (state, action) => {
         return {
            ...state,
            loadingCart: false,
            updateDeliverySuccess: true,
            deliveryMode: action.payload.deliveryMode,
            cart: action.payload


         }
      },
      [updateCartDeliveryMode.rejected]: (state, action) => {
         return {
            ...state,
            loadingCart: false,
            updateDeliverySuccess: false,
            error: {
               cart_error_msg: action.payload.data.message,
               cart_error_status: action.payload.status,
               cart_error_id: action.payload.statusText
            },

         }
      },
      [deleteCartItem.pending]: (state, action) => {
         return {
            ...state,
            loadingCart: true,
            updateCartItemSuccess: false,
         }
      },
      [deleteCartItem.fulfilled]: (state, action) => {
         return {
            ...state,
            loadingCart: false,
            updateCartItemSuccess: true,
            cart: action.payload,
            cartItems: action.payload.cartItems

         }
      },
      [deleteCartItem.rejected]: (state, action) => {
         return {
            ...state,
            loadingCart: false,
            updateCartItemSuccess: false,
            error: {
               cart_error_msg: action.payload.data.message,
               cart_error_status: action.payload.status,
               cart_error_id: action.payload.statusText
            },
         }
      },
      [updateCartItem.pending]: (state, action) => {
         return {
            ...state,
            loadingCart: true,
            updateSuccess: false
         }
      },
      [updateCartItem.fulfilled]: (state, action) => {
         return {
            ...state,
            loadingCart: false,
            updateSuccess: true,
            cart: action.payload,
            cartItems: action.payload.cartItems

         }
      },
      [updateCartItem.rejected]: (state, action) => {
         return {
            ...state,
            loadingCart: false,
            updateSuccess: false,
            error: {
               cart_error_msg: action.payload.data.message,
               cart_error_status: action.payload.status,
               cart_error_id: action.payload.statusText
            },

         }
      },

   }
})

export const { clearError, savePaymentMode } = CartReducers.actions

export default CartReducers.reducer