import 'bootstrap/dist/css/bootstrap.min.css'
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import './App.css';
import AppDashboard from './components/componentScreens/AppDashboard';
import ProductListScreen from './components/componentScreens/ProductListScreen';
import UserEditScreen from './components/componentScreens/UserEditScreen';
import UserListScreen from './components/componentScreens/UserListScreen';
import ProductEditScreen from './components/componentScreens/ProductEditScreen'
import OrderListScreen from './components/componentScreens/OrderListScreen';
import OrderScreen from './components/componentScreens/OrderScreen';
import ShipmentScreen from './components/componentScreens/ShipmentScreen';
import UserPaymentScreen from './components/componentScreens/UserPaymentScreen';
import PlaceOrderScreen from './components/componentScreens/PlaceOrderScreen';
import LoginScreen from './components/componentScreens/LoginScreen';
import RegistrationScreen from './components/componentScreens/RegistrationScreen';
import UserProfileScreen from './components/componentScreens/UserProfileScreen';
import ProductScreen from './components/componentScreens/ProductScreen';
import UserCartScreen from './components/componentScreens/UserCartScreen';
import AppHeader from './components/componentParts/AppHeader';
import AppFooter from './components/componentParts/AppFooter';
import ProductCreateScreen from './components/componentScreens/ProductCreateScreen';

function App() {
   return (
      <Router>
         <div className="App">
            <AppHeader />
            <main className='py-3'>
               <Container>
                  <Route path='/order/:id' component={OrderScreen} />
                  <Route path='/userplaceorder' component={PlaceOrderScreen} />
                  <Route path='/payment' component={UserPaymentScreen} />
                  <Route path='/shipping' component={ShipmentScreen} />
                  <Route path='/login' component={LoginScreen} />
                  <Route path='/register' component={RegistrationScreen} />
                  <Route path='/profile' component={UserProfileScreen} />
                  <Route path='/product/:id' component={ProductScreen} />
                  <Route path='/cart/:id?' component={UserCartScreen} />
                  <Route path='/admin/productlist' component={ProductListScreen} />
                  <Route path='/admin/productlist/:pageNumber' component={ProductListScreen} />
                  <Route path='/admin/productlist/search/:keyword' component={ProductListScreen} />
                  <Route path='/admin/product/create' component={ProductCreateScreen} />
                  <Route path='/admin/product/:id/edit' component={ProductEditScreen} />
                  <Route path='/admin/orderlist' component={OrderListScreen} />
                  <Route path='/admin/userlist' component={UserListScreen} />
                  <Route path='/admin/userlist/:pageNumber' component={UserListScreen} />
                  <Route path='/admin/userlist//search/:keyword' component={UserListScreen} />
                  <Route path='/admin/user/:id/edit' component={UserEditScreen} />
                  <Route path='/search/:keyword' component={AppDashboard} exact />
                  <Route path='/page/:pageNumber' component={AppDashboard} exact />
                  <Route path='/search/:keyword/page/:pageNumber' component={AppDashboard} exact />
                  <Route path='/' exact  >
                     <Redirect to='/dashboard' />
                  </Route>
                  <Route path='/dashboard' component={AppDashboard} exact />
               </Container>

            </main>
            <AppFooter />
         </div>

      </Router>
   );
}

export default App;
