import { createSlice } from "@reduxjs/toolkit"
import {
   createNewOrder,
   getMyOrders,
   getOrderById,
   getOrders,
   updateOrderToDelivered
} from './asyncReducers/orderAsyncReducers'


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
         paymentLoading: false,
         getOrderLoading: true
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
               paymentLoading: false,
               getOrderLoading: true
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
      [createNewOrder.fulfilled]: (state, action) => {
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

      },
      [getMyOrders.pending]: (state, action) => {
         return {
            ...state,
            loading: {
               getOrderLoading: true
            }
         }

      },
      [getMyOrders.fulfilled]: (state, action) => {
         return {
            ...state,
            loading: {
               getOrderLoading: false
            },
            success: {
               getOrderSuccess: true
            },
            orders: action.payload,
         }

      },
      [getMyOrders.rejected]: (state, action) => {
         return {
            ...state,
            loading: {
               getOrderLoading: false
            },
            success: {
               getOrderSuccess: false
            },
            error_order: {
               order_msg: action.payload.data.message,
               order_status: action.payload.status,
               order_error_id: action.payload.statusText
            }
         }

      },
      [getOrderById.pending]: (state, action) => {
         return {
            ...state,
            loading: {
               getOrderLoading: true
            }
         }

      },
      [getOrderById.fulfilled]: (state, action) => {
         return {
            ...state,
            loading: {
               getOrderLoading: false
            },
            success: {
               getOrderSuccess: true
            },
            order: action.payload,
            orderItems: action.payload.orderItems,
            shippingAddress: action.payload.shippingAddress,
            paymentMode: action.payload.paymentMethod
         }

      },
      [getOrderById.rejected]: (state, action) => {
         return {
            ...state,
            loading: {
               getOrderLoading: false
            },
            success: {
               getOrderSuccess: false
            },
            error_order: {
               order_msg: action.payload.data.message,
               order_status: action.payload.status,
               order_error_id: action.payload.statusText
            }
         }

      },
      [getOrders.pending]: (state, action) => {
         return {
            ...state,
            loading: {
               getOrderLoading: true
            }
         }

      },
      [getOrders.fulfilled]: (state, action) => {
         return {
            ...state,
            loading: {
               getOrderLoading: false
            },
            success: {
               getOrderSuccess: true
            },
            orders: action.payload,
         }

      },
      [getOrders.rejected]: (state, action) => {
         return {
            ...state,
            loading: {
               getOrderLoading: false
            },
            success: {
               getOrderSuccess: false
            },
            error_order: {
               order_msg: action.payload.data.message,
               order_status: action.payload.status,
               order_error_id: action.payload.statusText
            }
         }

      },
      [updateOrderToDelivered.pending]: (state, action) => {

      },
      [updateOrderToDelivered.fulfilled]: (state, action) => {

      },
      [updateOrderToDelivered.rejected]: (state, action) => {

      },

   }
})

export const { clearOrderError } = OrderReducers.actions


export default OrderReducers.reducer