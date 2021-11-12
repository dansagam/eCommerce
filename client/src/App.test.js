// eslint-disable-next-line no-unused-vars
import { render as rtlRender, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from './store'
import { MemoryRouter as Router, BrowserRouter as RouterB, Route  /** useHistory, useParams, */ } from 'react-router-dom';
import { createMemoryHistory } from "history";
// import {createMemoryHistory} from 'history'
// import App from './App';
// import ProductScreen from './components/componentScreens/ProductScreen';
import AppDashboard from './components/componentScreens/AppDashboard';
import CartReducers from './reduxReducers/cartReducers';
import { configureStore } from '@reduxjs/toolkit';
import UserReducers from './reduxReducers/userReducers';
import ProductReducers from './reduxReducers/productReducers';
import OrderReducer from './reduxReducers/orderReducer';

// test('renders learn react link', () => {
//    render(<App />);
//    const linkElement = screen.getByText(/learn react/i);
//    expect(linkElement).toBeInTheDocument();
// });
export const RenderWithHistory = (component) => {
   const history = createMemoryHistory()
   // const { keyword, pageNumber } = useParams()
   return {
      ...rtlRender(
         <Provider store={store}>
            <Router match={
               {
                  params: {
                     // keyword: keyword,
                     // pageNumber: pageNumber,
                     id: '618206a4a5af468f9c0f859d'
                  }
               }
            }
               history={history}
            >
               {component}
            </Router>
         </Provider>
      )
   }
}
function render(
   ui,
   { preloadedState, store = configureStore({
      reducer: {
         Cart: CartReducers,
         User: UserReducers,
         Order: OrderReducer,
         Product: ProductReducers
      }, preloadedState
   }),
      ...renderOption } = {}
) {
   function Wrapper({ children }) {
      return (
         <Router>
            <Provider store={store}>
               <Route path='/' render={() => children} />
            </Provider>
         </Router>
      )
   }
   return {
      ...rtlRender(ui, { wrapper: Wrapper, ...renderOption })
   }
}
function renderB(
   ui,
   { preloadedState, store = configureStore({
      reducer: {
         Cart: CartReducers,
         User: UserReducers,
         Order: OrderReducer,
         Product: ProductReducers
      }, preloadedState
   }),
      ...renderOption } = {}
) {
   function Wrapper({ children }) {
      return (
         <RouterB>
            <Provider store={store}>
               <Route path='/' render={() => children} />
            </Provider>
         </RouterB>
      )
   }
   return {
      ...rtlRender(ui, { wrapper: Wrapper, ...renderOption })
   }
}
export * from '@testing-library/react'
export * from '@testing-library/user-event'
export { render, renderB }
// it('trying the react testing', () => {
//    RenderWithHistory(<ProductScreen match={
//       {
//          params: {
//             // keyword: keyword,
//             // pageNumber: pageNumber,
//             id: '618206a4a5af468f9c0f859d'
//          }
//       }
//    } />)
//    const LinkElement = screen.getAllByText(/go back/i)[0]
//    // eslint-disable-next-line no-unused-expressions
//    expect(LinkElement).toBeEnabled()

// })
// it('appdashboard test', () => {
//    RenderWithHistory(<AppDashboard match={
//       {
//          params: {
//             keyword: '',
//             pageNumber: '',
//             id: '618206a4a5af468f9c0f859d'
//          }
//       }
//    } />)
//    // )
//    // const h1Element = screen.getByRole('h1', { name: /Latest Products/i })
//    const h1Element = screen.getByRole('heading', { name: /latest products/i })

//    // eslint-disable-next-line jest/valid-expect
//    expect(h1Element)
//    // eslint-disable-next-line jest/valid-expect
//    expect(screen.debug())
// })

test('should test the redux', () => {
   expect(CartReducers(undefined, {})).toEqual({
      carts: [],
      cart: {},
      cartItems: [],
      shippingAddress: {},
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
   })

})


test('should test the store', async () => {
   render(<AppDashboard match={
      {
         params: {
            keyword: '',
            pageNumber: '',
            id: '618206a4a5af468f9c0f859d'
         }
      }
   } />)
   const h1Element = screen.getByRole('heading', { name: /latest products/i })
   expect(h1Element).toBeInTheDocument()
})



