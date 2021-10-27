/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { Button, Card, Col, Form, Image, ListGroup, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Message from '../componentParts/Message'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { addNewCart, deleteCartItem, getCartByUserId } from '../../reduxReducers/asyncReducers/cartAsyncReducers'
import { useState } from 'react'
import { Table } from 'react-bootstrap'
import { faHeart } from '@fortawesome/free-regular-svg-icons'

const UserCartScreen = ({ match, location, history }) => {
   // const productItemId = match.params.id
   const qty = location.search ? Number(location.search.split('=')[1]) : 1

   const dispatch = useDispatch()
   const cartState = useSelector(state => state.Cart)
   const {
      userLogin: {
         userInfo
      }
   } = useSelector(state => state.User)
   const { cartItems, error, cart } = cartState
   const checkoutHandler = () => {
      history.push('/login?redirect=shipping')
      // history.push('/shipping')
   }
   // console.log(qty)
   const [msg, setMsg] = useState('')
   const continueShopping = () => {
      history.push('/')
   }
   const removeFromCartHandler = (id) => {
      dispatch(deleteCartItem(id))
   }
   useEffect(() => {
      setMsg(error.cart_error_msg)
      if (!userInfo) {
         history.push('/login')
      } else {
         if (!cart || cart.user !== userInfo._id) {
            dispatch(getCartByUserId({ _id: userInfo._id }))
         }
      }
   }, [history, cart, error, userInfo, match, dispatch])

   return (
      <div>
         <Row >
            <Col md={11}>
               {msg ? <Message variant='danger'>{`${msg}`}</Message> : ''}
               <div style={{ float: 'left' }}>
                  <h3 style={{ textAlign: 'left', fontSize: '1.2rem', }}>
                     Cart ({cartItems.reduce((acc, item) => (acc += item.qty), 0)}) items
                  </h3>
                  <h5 style={{ textAlign: 'left', fontSize: '0.9rem', }}>your order is free within Lagos</h5>
               </div>
               {cartItems.length === 0 ? (<Message>Your Cart is Empty <Link to='/'>Go Back</Link></Message>)
                  :
                  (<Table className='table-sm' style={{ textAlign: 'left' }}>
                     <thead>
                        <tr>
                           <th>ITEM</th>
                           <th>QUANTITY</th>
                           <th>UNIT PRICE</th>
                           <th>SUBTOTAL</th>
                        </tr>
                     </thead>
                     <tbody>
                        {cartItems.map((item) => (
                           <tr key={item._id}>
                              <td>
                                 <Row>
                                    <Col md={3}>
                                       <Image src={item.product.image} alt={item.productName} fluid />
                                    </Col>
                                    <Col md={9}>
                                       <Link to={`/product/${item.product._id}`}>{item.product.name}</Link>
                                    </Col>
                                 </Row>
                                 <Row>
                                    <Col md={3}></Col>
                                    <Col md={4}>
                                       <FontAwesomeIcon icon={faHeart} />
                                       <span>  </span>  ADD TO FAVOURITE
                                    </Col>
                                    <Col md={5}>
                                       <Button
                                          type='button'
                                          variant='light-outline'
                                          onClick={() => removeFromCartHandler({ _id: cart._id, itemId: item._id })}
                                       >
                                          <FontAwesomeIcon icon={faTrash} />
                                          <span>  </span> REMOVE
                                       </Button>
                                    </Col>
                                 </Row>
                              </td>
                              <td>
                                 <Row>
                                    <Col >
                                       <Form.Select
                                          value={item.qty}
                                          onChange={(e) =>
                                             dispatch(addNewCart({
                                                product_id: item.product._id,
                                                qty: Number(e.target.value),
                                                price: item.product.price
                                             }))
                                          }
                                       >
                                          {[...Array(item.product.countInStock).keys()].map((x) => (
                                             <option key={x + 1} value={x + 1}>
                                                {x + 1}
                                             </option>
                                          ))}
                                       </Form.Select>
                                    </Col>
                                 </Row>
                                 <Row></Row>
                              </td>
                              <td>
                                 ₦{item.product.price}
                              </td>
                              <td>
                                 {(item.product.price * item.qty).toFixed(2)}
                              </td>
                           </tr>
                        ))}
                     </tbody>
                     <tfoot>
                        <tr>
                           <td colSpan={2}></td>
                           <td colSpan={2}>
                              Total: <strong>
                                 ₦ {cartItems.reduce((acc, item) =>
                                    acc += (item.qty * item.product.price), 0).toFixed(2)
                                 }
                              </strong>
                           </td>
                        </tr>
                        <tr>
                           <td colSpan={1} style={{ textAlign: 'right' }}>
                              <Button
                                 className='btn-block'
                                 onClick={continueShopping}
                              >
                                 CONTINUE SHOPPPING
                              </Button>
                           </td>
                           <td colSpan={3}>
                              <Button
                                 className='btn-block'
                                 disabled={cartItems.length === 0}
                                 onClick={checkoutHandler}
                              >
                                 Proceed to Checkout
                              </Button>
                           </td>
                        </tr>
                     </tfoot>
                  </Table>
                  )
               }
            </Col>
         </Row>

      </div>
   )
}

export default UserCartScreen



const gie = {/** (<ListGroup variant='flush'>
                     {cartItems.map((item) => (
                        <ListGroup.Item key={item._id}>
                           <Row>
                              <Col md={2}>
                                 <Image src={item.product.image} alt={item.productName} fluid />
                              </Col>
                              <Col md={3}>
                                 <Link to={`/product/${item.product._id}`}>{item.product.name}</Link>
                              </Col>
                              <Col md={2}>₦{item.product.price}</Col>
                              <Col md={2}>
                                 <Form.Select
                                    value={item.qty}
                                    onChange={(e) =>
                                       dispatch(addNewCart({
                                          product_id: item.product._id,
                                          qty: Number(e.target.value),
                                          price: item.product.price
                                       }))
                                    }
                                 >
                                    {[...Array(item.product.countInStock).keys()].map((x) => (
                                       <option key={x + 1} value={x + 1}>
                                          {x + 1}
                                       </option>
                                    ))}
                                 </Form.Select>
                              </Col>
                              <Col md={2}>
                                 <Button
                                    type='button'
                                    variant='light'
                                    onClick={() => removeFromCartHandler({ _id: cart._id, itemId: item._id })}
                                 >
                                    <FontAwesomeIcon icon={faTrash} />
                                 </Button>
                              </Col>
                           </Row>
                        </ListGroup.Item>
                     ))}
                     </ListGroup>
                  : (<Col md={4}>
               <Card>
                  <ListGroup variant='flush'>
                     <ListGroup.Item>
                        <h2>Cart: ({cartItems.reduce((acc, item) => (acc += item.qty), 0)}) items</h2>
                        ₦ {cartItems.reduce((acc, item) => acc += (item.qty * item.product.price), 0).toFixed(2)}
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
            </Col> */}
