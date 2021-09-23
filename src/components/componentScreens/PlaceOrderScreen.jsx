import React from 'react'
import { Col, ListGroup, Row, Image, Card, Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Message from '../componentParts/Message'
import StepsCheckout from '../componentParts/StepsCheckout'

const PlaceOrderScreen = ({history}) => {
   let cart = useSelector(state => state.Cart)
   // if(!cart.shippingAddress){
   //    history.push('/shipping')
   // }else if(!cart.paymentMethod) {
   //    history.push('/payment')
   // }
   console.log(cart)
   //   Calculate prices
   const addDecimals = (num) => {
     return (Math.round(num * 100) / 100).toFixed(2)
   }

   cart.itemsPrice = addDecimals(
     cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
   )
   cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100)
   cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)))
   cart.totalPrice = (
     Number(cart.itemsPrice) +
     Number(cart.shippingPrice) +
     Number(cart.taxPrice)
   ).toFixed(2)

   const placeOrderhandler = (e) =>{
      e.preventDefault()
   }
   return (
      <>
         <StepsCheckout step1 step2 step3 step4 />
         <Row>
            <Col md={8}>
               <ListGroup variant='flush'>
                  <ListGroup.Item>
                     <h2>Shipping</h2>
                     <p>
                        <strong>Address:</strong>
                     </p>
                  </ListGroup.Item>
                  <ListGroup.Item>
                     <h2>Payment Method</h2>
                     <strong>Method:</strong>
                  </ListGroup.Item>
                  <ListGroup.Item>
                     <h2>Order Items</h2>
                     <ListGroup>
                        <ListGroup.Item>
                           <Row>
                              <Col md={1}>
                                 <Image src={'sdj'} alt='sdksjd' fluid rounded />
                              </Col>
                              <Col>
                                 <Link to=''>Item name</Link>
                              </Col>
                              <Col md={4}>
                                 item.qty  x item.price = item.qty  x item.price
                              </Col>
                           </Row>
                        </ListGroup.Item>
                     </ListGroup>
                  </ListGroup.Item>
               </ListGroup>
            </Col>
            <Col md={4}>
               <Card>
                  <ListGroup>
                     <ListGroup.Item>
                        <h2>Order Summary</h2>
                     </ListGroup.Item>
                     <ListGroup.Item>
                        <Row>
                           <Col>Items</Col>
                           <Col>Item Price</Col>
                        </Row>
                     </ListGroup.Item>
                     <ListGroup.Item>
                        <Row>
                           <Col>Shipping</Col>
                           <Col>shipping Price</Col>
                        </Row>
                     </ListGroup.Item>
                     <ListGroup.Item>
                        <Row>
                           <Col>Tax</Col>
                           <Col>Tax Price</Col>
                        </Row>
                     </ListGroup.Item>
                     <ListGroup.Item>
                        <Row>
                           <Col>Total:</Col>
                           <Col>Total Price</Col>
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
