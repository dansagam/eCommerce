import { createSlice } from "@reduxjs/toolkit"
import { createNewOrder } from './asyncReducers/orderAsyncReducers'


export const OrderReducers = createSlice({
   name: 'order',
   initialState: {
      orders: [],
      order: {},
      cart: {},
      shippingAddress: {
         address: {
            address: ''
         }
      },
      orderItems: [],
      paymentMode: '',
      loading: {
         createLoading: false,
         deliveryLoading: false,
         paymentLoadin: false,
         getOrderLoading: false
      },
      success: {
         createSuccess: false,
         deliverySuccess: false,
         paymentSuccess: false,
         getOrderSuccess: false
      },
      error_order: {
         order_msg: '',
         order_status: null,
         order_error_id: null
      }

   },
   reducers: {
      clearOrderError: (state, action) => {
         return {
            ...state,
            loading: {
               createLoading: false,
               deliveryLoading: false,
               paymentLoadin: false,
               getOrderLoading: false
            },
            error_order: {
               order_msg: '',
               order_status: null,
               order_error_id: null
            }
         }
      }

   },
   extraReducers: {
      [createNewOrder.pending]: (state, action) => {
         return {
            ...state,
            loading: {
               createLoading: true
            },
            success: {
               createSuccess: false
            }
         }

      },
      [createNewOrder.fulfiled]: (state, action) => {
         return {
            ...state,
            loading: {
               createLoading: false
            },
            success: {
               createSuccess: true
            },
            order: action.payload,
            orderItems: action.payload.orderItems,
            shippingAddress: action.payload.shippingAddress,
            paymentMode: action.payload.paymentMethod

         }

      },
      [createNewOrder.rejected]: (state, action) => {
         return {
            ...state,
            loading: {
               createLoading: false
            },
            success: {
               createSuccess: false
            },
            error_order: {
               order_msg: action.payload.data.message,
               order_status: action.payload.status,
               order_error_id: action.payload.statusText
            }

         }

      }

   }
})

export const { clearOrderError } = OrderReducers.actions


export default OrderReducers.reducer