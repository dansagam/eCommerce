import React, { useState } from 'react'
import { useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { paymentMethods } from '../../constants/paymentMode'
import { getCartByUserId, updatePaymentMode } from '../../reduxReducers/asyncReducers/cartAsyncReducers'
// import { savePaymentMode } from '../../reduxReducers/cartReducers'
import FormHousing from '../componentParts/FormHousing'
import StepsCheckout from '../componentParts/StepsCheckout'

const UserPaymentScreen = ({ history }) => {
   const [paymentMode, setPaymentMode] = useState('FlutterWave')
   const {
      userLogin: {
         userInfo
      }
   } = useSelector(state => state.User)
   const dispatch = useDispatch()
   const { cart, shippingAddress } = useSelector(state => state.Cart)

   if (!shippingAddress.address.address) {
      history.push('/shipping')
   }
   useEffect(() => {
      if (!userInfo) {
         history.push('/login')
      } else {
         if (!cart || cart.user !== userInfo._id) {
            dispatch(getCartByUserId({ _id: userInfo._id }))
         }
      }
   }, [history, userInfo, cart, dispatch])


   const submitHandle = (e) => {
      e.preventDefault()
      dispatch(updatePaymentMode({ _id: cart._id, paymentMode: paymentMode }))
      history.push('/userplaceorder')
   }
   return (
      <FormHousing >
         <StepsCheckout step1 step2 step3 />
         <Form onSubmit={submitHandle} >
            <Form.Label as='legend'>Select Method</Form.Label>
            <Form.Group className='d-flex m-3'>
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
