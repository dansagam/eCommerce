import   {configureStore}     from '@reduxjs/toolkit'
import   CartReducers         from './reduxReducers/cartReducers'
import   OrderReducers        from './reduxReducers/orderReducer'
import   ProductReducers      from './reduxReducers/productReducers'
import   UserReducers         from './reduxReducers/userReducers'

export default configureStore({
   reducer: {
      Cart: CartReducers,
      User: UserReducers,
      Order: OrderReducers,
      Product: ProductReducers
   }
})