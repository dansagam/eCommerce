import { createSlice } from "@reduxjs/toolkit"


export const CartReducers = createSlice({
   name: 'cart',
   initialState: {
      cartItems: [
         {
            productId: null,
            productName: 'ehksjhdj',
            productImage: '/images/playstation.jpg',
            productPrice: 4000,
            productStockCount: 5,
            qty: 0
         }
      ],
      shippingAddress: {},
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