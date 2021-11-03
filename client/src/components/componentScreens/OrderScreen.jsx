import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { Card, Col, Image, ListGroup, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getOrderById } from '../../reduxReducers/asyncReducers/orderAsyncReducers'
import { clearOrderError } from '../../reduxReducers/orderReducer'
import AppLoader from '../componentParts/AppLoader'
import Message from '../componentParts/Message'

const OrderScreen = ({ history, match }) => {
   const orderId = match.params.id
   let itemsPrice
   const dispatch = useDispatch()
   const [msg, setMsg] = useState('')
   const [sdkReady, setSdkReady] = useState(false)
   const { error_order, orderItems, success, order, loading } = useSelector(state => state.Order)
   const {
      userLogin: {
         userInfo
      },
   } = useSelector(state => state.User)
   if (!loading.getOrderLoading) {

      const addDecimals = (num) => {
         return (Math.round(num * 100) / 100).toFixed(2)
      }
      itemsPrice = addDecimals(
         orderItems.reduce((acc, item) => acc += (item.product.price * item.qty), 0)
      )

   }

   useEffect(() => {
      setMsg(error_order.order_msg)
      if (!userInfo) {
         history.push('/login')
      } else {
         if (!order || order._id !== orderId) {
            dispatch(getOrderById({ _id: orderId }))
         }
      }
      // return () => {
      //    dispatch(clearOrderError())
      // }
   }, [error_order, history, userInfo, order, orderId, dispatch])
   return (
      <>
         {msg ? <Message variant='danger'>{`${msg}`}</Message> : ''}
         {loading.getOrderLoading ? (<AppLoader />)
            : (order.user && <>
               <h1>Order {order._id}</h1>
               <Row>
                  <Col md={8}>
                     <ListGroup variant='flush'>
                        <ListGroup.Item>
                           <h2>Shipping details</h2>
                           <p>
                              <strong>Name: </strong>
                              {order.user.name}
                           </p>
                           <p>
                              <strong>Email: </strong>
                              <a href={`mailto:${order.user.email}`} >{order.user.email}</a>
                           </p>
                           <p>
                              <strong>Address</strong>
                              {order.shippingAddress.address.address}, {order.shippingAddress.address.city}
                              {order.shippingAddress.address.state}, {order.shippingAddress.address.country}
                           </p>
                           {order.isDelivered ? (
                              <Message variant={'success'}>
                                 Delivered on {order.createdAt}
                              </Message>
                           ) : (
                              <Message variant={'danger'}>
                                 Yet to be Delivered
                              </Message>
                           )}
                        </ListGroup.Item>
                        <ListGroup.Item>
                           <h2>Payment Method</h2>
                           <p>
                              <strong>Method: </strong>
                              {order.paymentMethod}
                           </p>
                           {order.isPaid ? (
                              <Message variant={'success'}>
                                 Paid on {order.paidAt}
                              </Message>
                           ) : (
                              <Message variant={'danger'}> Yet To Be Paid</Message>
                           )}
                        </ListGroup.Item>
                        <ListGroup.Item>
                           <h2>Order Item</h2>
                           {orderItems.length === 0 ? (
                              <Message variant={'danger'}>Your Order is empty</Message>
                           ) : (
                              <ListGroup variant='flush'>
                                 {order.orderItems.map((item, index) => (
                                    <ListGroup.Item key={index}>
                                       <Row>
                                          <Col md={1}>
                                             <Image
                                                src={item.product.image}
                                                alt={item.product.name}
                                                fluid
                                                rounded
                                             />
                                          </Col>
                                          <Col>
                                             <Link to={`/product/${item.product._id}`}>
                                                {item.product.name}
                                             </Link>
                                          </Col>
                                          <Col md={4}>
                                             {item.qty} x {item.product.price} = {item.qty * item.product.price}
                                          </Col>
                                       </Row>
                                    </ListGroup.Item>
                                 ))}
                              </ListGroup>
                           )}
                        </ListGroup.Item>
                     </ListGroup>
                  </Col>
                  <Col md={4}>
                     <Card>
                        <ListGroup variant='flush'>
                           <ListGroup.Item>
                              <h2>Order Summary</h2>
                           </ListGroup.Item>
                           <ListGroup.Item>
                              <Row>
                                 <Col>Items</Col>
                                 <Col>{itemsPrice}</Col>
                              </Row>
                           </ListGroup.Item>
                           <ListGroup.Item>
                              <Row>
                                 <Col>Shipping</Col>
                                 <Col>{order.shippingPrice}</Col>
                              </Row>
                           </ListGroup.Item>
                           <ListGroup.Item>
                              <Row>
                                 <Col>VAT</Col>
                                 <Col>{order.taxPrice}</Col>
                              </Row>
                           </ListGroup.Item>
                           <ListGroup.Item>
                              <Row>
                                 <Col>Total</Col>
                                 <Col>{order.totalPrice}</Col>
                              </Row>
                           </ListGroup.Item>
                           {!order.isPaid && (
                              <ListGroup.Item>
                                 {loading.paymentLoading && <AppLoader />}
                                 {sdkReady ? (
                                    <AppLoader />
                                 ) : (
                                    <>
                                       payButton
                                    </>
                                 )}
                              </ListGroup.Item>
                           )}
                           {loading.deliveryLoading && <AppLoader />}
                           {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                              <ListGroup.Item>
                                 <Button
                                    type='button'
                                    className='btn btn-block'
                                    onClick={''}
                                 >
                                    Mark as delivered
                                 </Button>
                              </ListGroup.Item>
                           )}
                        </ListGroup>
                     </Card>
                  </Col>
               </Row>
            </>)}
      </>
   )
}

export default OrderScreen
