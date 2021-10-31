import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Button, Col, Form, Image, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getCartByUserId, updateCartDeliveryMode } from '../../reduxReducers/asyncReducers/cartAsyncReducers'
import FormHousing from '../componentParts/FormHousing'
import Message from '../componentParts/Message'
import StepsCheckout from '../componentParts/StepsCheckout'
import { deliveryMethodsConst } from '../../constants/paymentMode'

const CartDeliveryFormScreen = ({ history }) => {
   const dispatch = useDispatch()
   const [msg, setMsg] = useState('')
   const [delivery, setDelivery] = useState("Door Delivery")
   const { error, cart, cartItems, updateDeliverySuccess } = useSelector(state => state.Cart)
   const {
      userLogin: {
         userInfo
      }
   } = useSelector(state => state.User)
   const deliveryFee = 2000;
   const subTotal = cartItems.reduce((acc, item) => acc += (item.qty * item.product.price), 0)
   const grandTotal = subTotal + deliveryFee
   const onSubmitHandler = (e) => {
      e.preventDefault()
      dispatch(updateCartDeliveryMode({ _id: cart._id, deliveryMode: delivery }))
      // history.push('/payment')
   }
   useEffect(() => {
      setMsg(error.cart_error_msg)
      if (!userInfo || !userInfo.name) {
         history.push('/login')
      } else {
         if (!cart || cart.user !== userInfo._id) {
            dispatch(getCartByUserId({ _id: userInfo._id }))
         }
      } if (updateDeliverySuccess) {
         history.push('/payment')

      }
   }, [error, userInfo, cart, history, dispatch, updateDeliverySuccess])
   return (
      <>
         {updateDeliverySuccess && <Message variant='success'>{`${msg}`}</Message>}
         {msg ? <Message variant='danger'>{`${msg}`}</Message> : ''}
         <Row className='d-flex'>
            <Col md={9}>Checkout</Col>
            <Col md={3}>Order Summary</Col>
         </Row>
         <Row className='mx-0 my-0'>
            <Col md={9} style={{ margin: 'auto 0', fontSize: '0.9rem' }}>
               <Row>
                  <Col>testing</Col>
               </Row>
               <Row>
                  <FormHousing>
                     <StepsCheckout step1 step2 step3 />
                     <h2>Delivery Method</h2>
                     <Form onSubmit={onSubmitHandler}>
                        <h3 style={{ textAlign: 'left', fontSize: '1.2rem', }}>How do you want your order delivered?</h3>
                        {deliveryMethodsConst.map(deliveryMode => (
                           <Form.Check
                              type='radio'
                              label={deliveryMode}
                              checked={deliveryMode === delivery}
                              value={deliveryMode}
                              onChange={(e) => setDelivery(e.target.value)}
                           />
                        ))}
                        <Button
                           type='submit'
                           variant='outline-primary'
                           className='btn-sm'
                        >
                           PROCEED TO NEXT STEP
                        </Button>
                     </Form>
                  </FormHousing>

               </Row>
            </Col>
            <Col md={3} style={{ fontSize: '0.8rem' }}>
               <h4   >You Order:{userInfo.name}</h4   >
               <hr />
               <Table className='table-sm'>
                  <tbody>
                     {cartItems.map(citem => (
                        <tr style={{ margin: '0' }} key={citem._id}>
                           <td>
                              <Row>
                                 <Col sm={4}>
                                    <Image style={{ height: 'auto', width: '100%' }} src={citem.product.image} alt={citem.product.name} />
                                 </Col>
                                 <Col sm={8} style={{ textAlign: 'left' }}>
                                    <Row><span>{citem.product.name}</span></Row>
                                    <Row><p>₦ {citem.product.price}</p> </Row>
                                    <Row style={{ color: 'yelow' }} > <p>QTY: {citem.qty}</p> </Row>

                                 </Col>
                              </Row>
                           </td>
                        </tr>
                     ))}
                  </tbody>
                  <tfoot style={{ textAlign: 'left' }}   >
                     <tr >
                        <td>
                           <Row>
                              <Col sm={8}>SUBTOTAL:</Col>
                              <Col sm={4}><span>₦ {subTotal}</span></Col>
                           </Row>
                        </td>
                     </tr>
                     <tr>
                        <td>
                           <Row>
                              <Col sm={8}>DELIVERY FEE:</Col>
                              <Col sm={4}><span>₦ {deliveryFee}</span></Col>
                           </Row>
                        </td>
                     </tr>
                     <tr>
                        <td>
                           <Row>
                              <Col sm={8}>TOTAL:</Col>
                              <Col sm={4}><span>₦  {grandTotal}</span></Col>
                           </Row>
                        </td>
                     </tr>
                  </tfoot>
               </Table>
               <div style={{ color: 'darkblue' }}>
                  <Link to={''}>
                     <strong>MODIFY CART</strong>

                  </Link>
               </div>
            </Col>
         </Row>

      </>
   )
}

export default CartDeliveryFormScreen
