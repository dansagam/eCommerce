import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Nav, NavDropdown, Navbar, Container, Image } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import logo from '../../images/eShoping.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faCartPlus } from '@fortawesome/free-solid-svg-icons'
import { Route, useHistory } from 'react-router'
import SearchContainer from './SearchContainer'
import { logoutSuccess } from '../../reduxReducers/userReducers'
import { getCartByUserId } from '../../reduxReducers/asyncReducers/cartAsyncReducers'

const AppHeader = () => {
   const histon = useHistory()
   const dispatch = useDispatch()
   let totalItem
   const { isAuthenticated } = useSelector(state => state.User)
   const { userInfo } = useSelector(state => state.User.userLogin)
   const { cartItems } = useSelector(state => state.Cart)
   if (userInfo) {
      totalItem = cartItems.length
   }

   const logoutHandler = () => {
      dispatch(logoutSuccess())
      histon.push('/')
   }

   const profileLink = (
      <NavDropdown title={userInfo ? userInfo.name : ''} id="navbarScrollingDropdown">
         <LinkContainer to='/profile'>
            <NavDropdown.Item href="#action3">Profile</NavDropdown.Item>
         </LinkContainer>
         <NavDropdown.Item href="#action4" onClick={logoutHandler}>Logout</NavDropdown.Item>
         <NavDropdown.Divider />
         {/* <NavDropdown.Item href="#action5">Something else here</NavDropdown.Item> */}
      </NavDropdown>
   )
   const loginLink = (
      <LinkContainer to='/login' >
         <Nav.Link ><FontAwesomeIcon icon={faUser} /> Sign in</Nav.Link>
      </LinkContainer>
   )
   const adminLink = (
      <NavDropdown title='Admin' id='adminmenu'>
         <LinkContainer to='/admin/userlist'>
            <NavDropdown.Item>Users</NavDropdown.Item>
         </LinkContainer>
         <LinkContainer to='/admin/productlist'>
            <NavDropdown.Item>Product</NavDropdown.Item>
         </LinkContainer>
         <LinkContainer to='/admin/orderlist'>
            <NavDropdown.Item>Order</NavDropdown.Item>
         </LinkContainer>
      </NavDropdown>
   )

   useEffect(() => {
      if (userInfo) {
         dispatch(getCartByUserId({ _id: userInfo._id }))
      }
   }, [dispatch, userInfo])

   return (
      <header>
         <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
            <Container>
               <Navbar.Brand href="/dashboard">
                  <Image src={logo} height='30' alt='eShoping' /> eShop
               </Navbar.Brand>
               <Navbar.Toggle aria-controls="navbarScroll" />
               <Navbar.Collapse className="justify-content-end" id="navbarScroll">
                  <Route render={({ history }) => <SearchContainer history={history} />} />
                  <Nav
                     className="ml-auto my-2 my-lg-0"
                     style={{ maxHeight: '100px' }}
                     navbarScroll
                  >
                     <LinkContainer to='/cart'>
                        <Nav.Link className='position-relative'>
                           <span
                              className='position-absolute end-0 translate-middle badge rounded-pill bg-success'
                           >
                              {userInfo ? totalItem : 0}
                           </span>
                           <FontAwesomeIcon icon={faCartPlus} />
                           Cart
                        </Nav.Link>
                     </LinkContainer>
                     {isAuthenticated ? profileLink
                        : userInfo ? profileLink
                           : loginLink
                     }
                     {userInfo && userInfo.isAdmin && adminLink}

                     {/* <LinkContainer to='/register' >
                        <Nav.Link>Register</Nav.Link>
                     </LinkContainer>
                     <Nav.Link href="#" disabled>
                        Link
                     </Nav.Link> */}
                  </Nav>
               </Navbar.Collapse>
            </Container>
         </Navbar>

      </header>
   )
}

export default AppHeader