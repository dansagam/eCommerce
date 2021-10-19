import React, { useState, useEffect } from 'react'
import { Form, Row, Col, Button, FloatingLabel } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { registerUser } from '../../reduxReducers/asyncReducers/userAsyncReducers'
import AppLoader from '../componentParts/AppLoader'
import FormHousing from '../componentParts/FormHousing'
import Message from '../componentParts/Message'

const RegistrationScreen = ({ location, history }) => {
   const dispatch = useDispatch()
   const [email, setEmail] = useState('')
   const [name, setName] = useState('')
   const [password, setPassword] = useState('')
   const [msg, setMsg] = useState('')
   const {
      error, loading, userLogin: {
         userInfo
      }
   } = useSelector(state => state.User)

   const redirect = location.search ? location.search.split('=')[1] : '/'

   useEffect(() => {
      setMsg(error.msg)
      if (userInfo) {
         history.push(redirect)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [error, history, userInfo])

   const userData = {
      name: name,
      password: password,
      email: email
   }
   const onSubmitHandler = (e) => {
      e.preventDefault()
      dispatch(registerUser(userData))
   }
   return (
      <FormHousing>
         <Form onSubmit={onSubmitHandler}>
            <h1>User Registration</h1>
            {msg ? <Message variant='danger'>{`${msg}`}</Message> : ''}
            {loading && <AppLoader />}
            <FloatingLabel className='mb-3' label='Full Name'>
               <Form.Control
                  type='text'
                  name='name'
                  placeholder='Enter your Full Name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
               />
            </FloatingLabel>
            <FloatingLabel className='mb-3' label='Email Address'>
               <Form.Control
                  type='text'
                  name='name'
                  placeholder='Enter your email address'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
               />
            </FloatingLabel>
            <FloatingLabel className='mb-3' label='Email Address'>
               <Form.Control
                  type='text'
                  name='name'
                  placeholder='Enter your password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
               />
            </FloatingLabel>


            <Button
               type='submit'
               variant='outline-dark'
               style={{ marginTop: '1.2rem' }}
            >
               Register
            </Button>
         </Form>
         <Row>
            <Col>
               Already Registered?{' '}
               <Link to={redirect ? `/login?redirect=${redirect}` : '/login'} >
                  login page
               </Link>
            </Col>
         </Row>
      </FormHousing>
   )
}

export default RegistrationScreen
