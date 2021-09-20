import React, { useState } from 'react'
import { Button, FloatingLabel, Form } from 'react-bootstrap'
import FormHousing from '../componentParts/FormHousing'
import StepsCheckout from '../componentParts/StepsCheckout'

const ShipmentScreen = ({history}) => {
   const [address, setAddress] = useState('')
   const [city, setCity] = useState('')
   const [postalCode, setPostalCode] = useState('')
   const [country, setCountry] = useState('')


   const submitHandler = (e) => {
      e.preventDefault()
      history.push('/payment')
   }
   return (
      <FormHousing >
         <StepsCheckout step1 step2 />
         <h1> Shipping</h1>
         <Form onSubmit={submitHandler}>
            <FloatingLabel label='Address'>
               <Form.Control
                  type='text'
                  placeholder='enter your address'
                  value={address}
                  required
                  onChange={(e) => setAddress(e.target.value)}
               />
            </FloatingLabel>
            <FloatingLabel label='City'>
               <Form.Control
                  type='text'
                  placeholder='enter your City'
                  value={city}
                  required
                  onChange={(e) => setCity(e.target.value)}
               />
            </FloatingLabel>
            <FloatingLabel label='Postal Code'>
               <Form.Control
                  type='text'
                  placeholder='enter your Postal Code'
                  value={postalCode}
                  required
                  onChange={(e) => setPostalCode(e.target.value)}
               />
            </FloatingLabel>
            <FloatingLabel label='Country'>
               <Form.Control
                  type='text'
                  placeholder='enter your Country'
                  value={country}
                  required
                  onChange={(e) => setCountry(e.target.value)}
               />
            </FloatingLabel>
            <Button type='submit' variant='primary' className='mt-2'>Continue Shipment</Button>
         </Form>
      </FormHousing>
   )
}

export default ShipmentScreen
