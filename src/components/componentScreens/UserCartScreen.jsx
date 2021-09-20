import React from 'react'
import { Button, Card, Col, Form, Image, ListGroup, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Message from '../componentParts/Message'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrash} from '@fortawesome/free-solid-svg-icons';

const UserCartScreen = ({match, location, history}) => {
   const productItemId = match.params.id
   const qty = location.search ? Number(location.search.split('=')[1]) : 1

   const dispatch = useDispatch()
   const cart = useSelector(state => state.Cart)
   const { cartItems} = cart
   const checkoutHandler = () =>{
      // history.push('/login?redirect=shipping')
      history.push('/shipping')
   }

   return (
      <div>
      <h2>testing microphone </h2>
      <Row >
         <Col md={8}>
            <h1>Shipping Cart</h1>
            {cartItems.length === 0 ?(<Message>Your Cart is Empty <Link to='/'>Go Back</Link></Message>) 
               :  <ListGroup variant='flush'>
                     {cartItems.map((item) => (
                        <ListGroup.Item key={item.productId}>
                           {console.log(item)}
                           <Row>
                              <Col md={2}>
                                 <Image src={item.productImage} alt={item.productName} fluid />
                              </Col>
                              <Col md={3}>
                                 <Link to={`/product/${item.productId}`}>sss{item.productName}</Link>
                              </Col>
                              <Col md={2}>₦{item.productPrice}</Col>
                              <Col md={2}>
                                 <Form.Select
                                    value={item.qty}
                                 >
                                    {[...Array(item.productStockCount).keys()].map((x) =>(
                                       <option key={x+1} value={x + 1}>
                                          {x + 1}
                                       </option>
                                    ))}
                                 </Form.Select>
                              </Col>
                              <Col md={2}>
                                 <Button>
                                    <FontAwesomeIcon icon={faTrash} />
                                 </Button>
                              </Col>
                           </Row>
                        </ListGroup.Item>
                     ))}
                     <h1>testing</h1>
                  </ListGroup>
            }
         </Col>
         <Col md={4}>
            <Card>
               <ListGroup variant='flush'>
                  <ListGroup.Item>
                     <h2>Subtotal: ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items</h2>
                     ₦ {cartItems.reduce((acc, item) => acc + item.qty * item.productPrice, 0).toFixed(2)}
                  </ListGroup.Item>
                  <ListGroup.Item>
                     <Button
                        className='btn-block'
                        disabled={cartItems.length === 0}
                        onClick={checkoutHandler}
                     >
                        Proceed to Checkout
                     </Button>
                  </ListGroup.Item>
               </ListGroup>
            </Card>
         </Col>
      </Row>
         
      </div>
   )
}

export default UserCartScreen
