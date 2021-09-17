import React from 'react'
import { Nav, NavDropdown, Navbar, Container, Image } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import logo from '../../images/eShoping.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUser, faCartPlus} from '@fortawesome/free-solid-svg-icons'
import { Route } from 'react-router'
import SearchContainer from './SearchContainer'

const AppHeader = () => {
   return (
      <header>
         <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
            <Container>
               <Navbar.Brand href="/dashboard">
                  <Image src={logo} height='30' alt='eShoping' /> eShop
               </Navbar.Brand>
               <Navbar.Toggle aria-controls="navbarScroll" />
               <Navbar.Collapse className="justify-content-end" id="navbarScroll">
                  <Route render={({history}) => <SearchContainer history={history} />} />
                  <Nav
                     className="ml-auto my-2 my-lg-0"
                     style={{ maxHeight: '100px' }}
                     navbarScroll
                  >
                     <LinkContainer to='/cart'>
                        <Nav.Link><FontAwesomeIcon icon={faCartPlus} />Cart</Nav.Link>
                     </LinkContainer>
                     <LinkContainer to='/login' >
                        <Nav.Link ><FontAwesomeIcon icon={faUser} /> Sign in</Nav.Link>
                     </LinkContainer>
                     <LinkContainer to='/register' >
                        <Nav.Link>Register</Nav.Link>
                     </LinkContainer>
                     <NavDropdown title="Username  " id="navbarScrollingDropdown">
                        <LinkContainer to='/profile'>
                           <NavDropdown.Item href="#action3">Profile</NavDropdown.Item>
                        </LinkContainer>
                        <NavDropdown.Item href="#action4">Logout</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action5">Something else here</NavDropdown.Item>
                     </NavDropdown>
                     <Nav.Link href="#" disabled>
                        Link
                     </Nav.Link>
                  </Nav>
               </Navbar.Collapse>
            </Container>
         </Navbar>
         
      </header>
   )
}

export default AppHeader