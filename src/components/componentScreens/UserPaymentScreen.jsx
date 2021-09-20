import React, { useState } from 'react'
import {   Button, Form } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { paymentMethods } from '../../constants/paymentMode'
import FormHousing from '../componentParts/FormHousing'
import StepsCheckout from '../componentParts/StepsCheckout'

const UserPaymentScreen = ({history}) => {
   const [paymentMode, setPaymentMode] = useState('FlutterWave')
   const cart = useSelector(state => state.Cart)
   // eslint-disable-next-line no-unused-vars
   const {shippingAddress} = cart

   // if (!shippingAddress.address) {
   //   history.push('/shipping')
   // }


   const submitHandle =(e) =>{
      e.preventDefault()
      history.push('/userplaceorder')
   }
   return (
      <FormHousing >
         <StepsCheckout step1 step2 step3 />
         <Form onSubmit={submitHandle} >
            <Form.Label as='legend'>Select Method</Form.Label>
            <Form.Group  className='d-flex m-3'>
               {paymentMethods.map((paymentMethod) => (
                  <Form.Check 
                     inline
                     label={paymentMethod}
                     type='radio'
                     checked={paymentMethod === paymentMode}
                     value={paymentMethod}
                     onChange={(e) => setPaymentMode(e.target.value)}
                  />
               ))}
            </Form.Group>
            <Button type='submit' variant='outline-primary' className='mt-2'>Continue to placeOrder</Button>
         </Form>
      </FormHousing>
   )
}

export default UserPaymentScreen
