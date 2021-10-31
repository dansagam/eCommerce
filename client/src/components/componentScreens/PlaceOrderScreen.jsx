import React, { useEffect, useState } from 'react'
import { Col, ListGroup, Row, Image, Card, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { getCartByUserId } from '../../reduxReducers/asyncReducers/cartAsyncReducers'
import { createNewOrder } from '../../reduxReducers/asyncReducers/orderAsyncReducers'
import Message from '../componentParts/Message'
import StepsCheckout from '../componentParts/StepsCheckout'

const PlaceOrderScreen = ({ history }) => {
   const dispatch = useDispatch()
   let { cart,
      cartItems,
      itemsPrice,
      shippingPrice,
      error,
      taxPrice,
      totalPrice,
      shippingAddress,
      paymentMode,
   } = useSelector(state => state.Cart)
   const { success, order } = useSelector(state => state.Order)
   const {
      userLogin: {
         userInfo
      }
   } = useSelector(state => state.User)

   const [msg, setMsg] = useState('')
   useEffect(() => {
      setMsg(error.cart_error_msg)
      if (success.createSuccess) {
         history.push(`/order/${order._id}`)
      }
      if (!userInfo) {
         history.push('/login')
      } else {
         if (!cart || cart.user !== userInfo._id) {
            dispatch(getCartByUserId({ _id: userInfo._id }))
         } else if (!shippingAddress.address.address) {
            history.push('/shipping')
         } else if (!paymentMode) {
            history.push('/payment')
         }
      }
   }, [error, dispatch, userInfo, order, cart, history, success, paymentMode, shippingAddress])

   // if (!shippingAddress.address.address) {
   //    history.push('/shipping')
   // } else if (!paymentMode) {
   //    history.push('/payment')
   // }
   // console.log(cart)
   const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2)
   }

   itemsPrice = addDecimals(
      cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
   )
   shippingPrice = addDecimals(itemsPrice < 100 ? 0 : 100)
   taxPrice = addDecimals(Number((0.15 * itemsPrice).toFixed(2)))
   totalPrice = (
      Number(itemsPrice) +
      Number(shippingPrice) +
      Number(taxPrice)
   ).toFixed(2)
   const orderObj = {
      cartId: cart._id,
      shippingAddress: shippingAddress,
      orderItems: cartItems,
      taxPrice: taxPrice,
      shippingPrice: shippingPrice,
      totalPrice: totalPrice,
      paymentMode: paymentMode
   }

   const placeOrderhandler = (e) => {
      e.preventDefault()
      dispatch(createNewOrder(orderObj))
   }
   return (
      <>
         <StepsCheckout step1 step2 step3 step4 />
         {msg && <Message variant='danger'>{`${msg}`}</Message>}
         <Row>
            <Col md={8}>
               <ListGroup variant='flush'>
                  <ListGroup.Item>
                     <h2 style={{ textAlign: 'left', fontSize: '0.9rem' }}>Shipping</h2>
                     <p>
                        <strong>Address: </strong>
                        {shippingAddress.address.address},
                        {shippingAddress.address.city},
                        {shippingAddress.address.state},
                        {shippingAddress.address.country}
                     </p>
                  </ListGroup.Item>
                  <ListGroup.Item>
                     <h2 style={{ textAlign: 'left', fontSize: '0.9rem' }}>Payment Method</h2>
                     <strong>Method:  </strong>
                     {paymentMode}
                  </ListGroup.Item>
                  <ListGroup.Item>
                     <h2 style={{ textAlign: 'left', fontSize: '0.9rem' }}>Order Items</h2>
                     {cartItems.length === 0 ? <Message variant={'danger'}>Your Cart is Empty</Message> :
                        (<ListGroup variant='flush'>
                           {cartItems.map((item, index) => (
                              <ListGroup.Item key={index}>
                                 <Row>
                                    <Col md={1}>
                                       <Image src={item.product.image} alt='sdksjd' fluid rounded />
                                    </Col>
                                    <Col>
                                       <Link to=''>{item.product.name}</Link>
                                    </Col>
                                    <Col md={4}>
                                       {item.qty} QTY x ₦ {item.product.price}= {item.qty * item.product.price}
                                    </Col>
                                 </Row>
                              </ListGroup.Item>
                           ))}
                        </ListGroup>)
                     }
                  </ListGroup.Item>
               </ListGroup>
            </Col>
            <Col md={4}>
               <Card>
                  <ListGroup style={{ textAlign: 'left' }}>
                     <ListGroup.Item>
                        <h2 style={{ fontSize: '1rem' }}>Order Summary</h2>
                     </ListGroup.Item>
                     <ListGroup.Item>
                        <Row>
                           <Col>Items</Col>
                           <Col>₦ {itemsPrice}</Col>
                        </Row>
                     </ListGroup.Item>
                     <ListGroup.Item>
                        <Row>
                           <Col>Shipping fee: </Col>
                           <Col>₦ {shippingPrice}</Col>
                        </Row>
                     </ListGroup.Item>
                     <ListGroup.Item>
                        <Row>
                           <Col>VAT: </Col>
                           <Col>₦ {taxPrice}</Col>
                        </Row>
                     </ListGroup.Item>
                     <ListGroup.Item>
                        <Row>
                           <Col>Total:</Col>
                           <Col>₦ {totalPrice}</Col>
                        </Row>
                     </ListGroup.Item>
                     <ListGroup.Item>
                        <Message variant='danger' >Error to be placed here</Message>
                     </ListGroup.Item>
                     <ListGroup.Item>
                        <Button className='btn-block' onClick={placeOrderhandler}>Place Order</Button>
                     </ListGroup.Item>
                  </ListGroup>
               </Card>
            </Col>
         </Row>
      </>
   )
}

export default PlaceOrderScreen
