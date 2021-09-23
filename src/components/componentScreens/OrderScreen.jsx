import React from 'react'
import { Col, ListGroup, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import AppLoader from '../componentParts/AppLoader'
import Message from '../componentParts/Message'

const OrderScreen = () => {

   // eslint-disable-next-line no-unused-vars
   const {error, orderItems, loading} = useSelector(state => state.Order)
   return loading ? (
      <AppLoader />
   )
      : error ?
      (<Message variant='danger'>{error}</Message>)
      : (
         <>
            <h1>Order ID</h1>
            <Row>
               <Col md={8}>
                  <ListGroup variant='flush'>
                     <ListGroup.Item>
                        <h2>Shippin</h2>
                        <p>
                           <strong>Name: </strong> Order person name
                        </p>
                        <p>
                           <strong>Email: </strong>
                           <a href={`mailto:${'email'}`} >email address</a>
                        </p>
                        <p>
                           <strong>Address</strong>
                        </p>
                     </ListGroup.Item>
                  </ListGroup>
               </Col>
            </Row>
         </>
   )
}

export default OrderScreen
