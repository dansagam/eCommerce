import { createSlice } from "@reduxjs/toolkit"

const cartItemsFromStorage = localStorage.getItem('cartItems')
   ? JSON.parse(localStorage.getItem('cartItems')) : []

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
   ? JSON.parse(localStorage.getItem('shippingAddress'))
   : {}

export const CartReducers = createSlice({
   name: 'cart',
   initialState: {
      cartItems: cartItemsFromStorage,
      shippingAddress: shippingAddressFromStorage,
      itemsPrice: 0,
      shippingPrice: 0,
      taxPrice: 0,
      error: null,
      status: false,
      loading: false

   },
   reducers: {

   },
   extraReducers: {

   }
})

export default CartReducers.reducer