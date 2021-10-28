import React, { useState } from 'react'
import { Button, Col, FloatingLabel, Form, InputGroup, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getCartByUserId, updateCartShippingAddress } from '../../reduxReducers/asyncReducers/cartAsyncReducers'
import FormHousing from '../componentParts/FormHousing'
import StepsCheckout from '../componentParts/StepsCheckout'
import stateCountry from '../../utils/country-state.json'
import dialCode from '../../utils/dial-code.json'
import { useEffect } from 'react'
import Message from '../componentParts/Message'

const ShipmentScreen = ({ history }) => {
   const [firstName, setFirstName] = useState('')
   const [lastName, setLastName] = useState('')
   const [address, setAddress] = useState('')
   const [validated, setValidated] = useState(false);
   const [city, setCity] = useState('')
   const [stateC, setStateC] = useState('')
   const [postalCode, setPostalCode] = useState('')
   const [country, setCountry] = useState("Nigeria")
   const [phoneNumber, setPhoneNumber] = useState('')
   const [dialCodeNumber, setDialCodeNumber] = useState('')
   const [msg, setMsg] = useState('')

   const dispatch = useDispatch()
   const { cart, error } = useSelector(state => state.Cart)
   const {
      userLogin: {
         userInfo
      }
   } = useSelector(state => state.User)

   const postedData = {
      _id: cart._id,
      name: {
         firstName: firstName,
         lastName: lastName
      },
      address: {
         state: stateC,
         city: city,
         country: country,
         address: address,
         postalCode: postalCode

      },
      phoneNumber: phoneNumber
   }
   const submitHandler = (e) => {
      e.preventDefault()
      console.log(country, dialCodeNumber)
      dispatch(updateCartShippingAddress(postedData))
      history.push('/deliverymode')
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
   }, [error, cart, userInfo, history, dispatch])
   // const stateCountryParse = JSON.parse(stateCountry)
   return (
      <FormHousing >
         <StepsCheckout step1 step2 />
         <h1> Shipping</h1>
         {msg ? <Message variant='danger'>{`${msg}`}</Message> : ''}
         <Form onSubmit={submitHandler}>
            <Row>
               <Col>
                  <FloatingLabel label='First Name'>
                     <Form.Control
                        type='text'
                        name='firstName'
                        placeholder='First Name'
                        value={firstName}
                        required
                        onChange={(e) => setFirstName(e.target.value)}
                     />
                  </FloatingLabel>
               </Col>
               <Col>
                  <FloatingLabel label='Last Name'>
                     <Form.Control
                        type='text'
                        name='lastName'
                        placeholder='Last Name'
                        value={lastName}
                        required
                        onChange={(e) => setLastName(e.target.value)}
                     />
                  </FloatingLabel>
               </Col>
            </Row>
            <Row className='my-3'>
               <Col>
                  <FloatingLabel label='Country'>
                     <Form.Control
                        as='select'
                        name='country'
                        onChange={(e) => setCountry(e.target.value)}
                     >
                        <option>Select you Country</option>
                        {stateCountry.data.map((countries, index) =>
                        (<option key={index}
                           value={countries.name}
                           selected={countries.name === "Nigeria"}
                        >
                           {countries.name}
                        </option>)
                        )}
                     </Form.Control>
                  </FloatingLabel>
               </Col>
               <Col>
                  <FloatingLabel label='State'>
                     <Form.Control
                        name='state'
                        as='select'
                        onChange={(e) => setStateC(e.target.value)}
                     >
                        <option>Select your Resident State</option>
                        {stateCountry.data.map((countries, indexC) => (
                           countries.states.map((stateSelect, index) => {
                              if (countries.name === country) {
                                 return <option key={index}
                                    value={stateSelect.names}
                                 >{stateSelect.name}</option>
                              }
                              return ''
                           })
                        ))}
                     </Form.Control>
                  </FloatingLabel>
               </Col>
               <Col>
                  <FloatingLabel label='City'>
                     <Form.Control
                        type='text'
                        name='city'
                        placeholder='enter your City'
                        value={city}
                        required
                        onChange={(e) => setCity(e.target.value)}
                     />
                  </FloatingLabel>
               </Col>
            </Row>
            <Row>
               <Col md={9} className='mx-0'>
                  <Form.Label htmlFor='shippingPhoneNumber'>Phone Number</Form.Label>
                  <InputGroup className="mb-2"
                     hasValidation
                     style={{ gridTemplateColumns: '10% 90%' }}
                  >
                     <Row>
                        <Col md={3} className='mx-0'>
                           <Form.Control
                              as='select'
                              name='dialCodeNumber'
                              onChange={(e) => setDialCodeNumber(e.target.value)}
                           // style={{ width: '10%' }}
                           >
                              {dialCode.data.map((dCode, index) => (
                                 <option key={index}
                                    value={dCode.dial_code}
                                    selected={dCode.name === country}
                                 >
                                    {dCode.dial_code}
                                 </option>))
                              }
                           </Form.Control>
                        </Col>
                        <Col md={9} className='mx-0'>
                           <Form.Control
                              id='shippingPhoneNumber'
                              type='number'
                              name='phoneNumber'
                              placeholder='your Phone Number'
                              value={phoneNumber}
                              onChange={(e) => {
                                 setPhoneNumber(e.target.value)
                                 if (escapeRegExPhone(e.target.value)) {
                                    setValidated(true)
                                 }
                                 console.log(validated, phoneNumber, escapeRegExPhone(e.target.value))
                              }}
                              isInvalid={validated === false}
                           />
                           <Form.Control.Feedback type='invalid'>
                              {`invalid number and 10 digits required`}
                           </Form.Control.Feedback>

                        </Col>
                     </Row>
                  </InputGroup>
               </Col>
               <Col md={3} className='mx-0'>
                  <FloatingLabel label='Postal Code'>
                     <Form.Control
                        type='text'
                        name='postalCode'
                        placeholder='enter your Postal Code'
                        value={postalCode}
                        required
                        onChange={(e) => setPostalCode(e.target.value)}
                     />
                  </FloatingLabel>
               </Col>
            </Row>
            <FloatingLabel label='Address'>
               <Form.Control
                  as='textarea'
                  name='address'
                  placeholder='enter your address'
                  value={address}
                  required
                  onChange={(e) => setAddress(e.target.value)}
                  style={{ height: '60px' }}
               />
            </FloatingLabel>
            <Button type='submit' variant='primary' className='mt-2'>Continue Shipment</Button>
         </Form>
      </FormHousing >
   )
}

function escapeRegExPhone(text) {
   const RegEs = /[789][0-9]{9}/
   return RegEs.test(text)
};

export default ShipmentScreen
