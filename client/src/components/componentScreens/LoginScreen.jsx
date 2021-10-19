import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FloatingLabel, Form, Button, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import AppLoader from '../componentParts/AppLoader'
import FormHousing from '../componentParts/FormHousing'
import Message from '../componentParts/Message'
import { useState } from 'react'
import { loginUser } from '../../reduxReducers/asyncReducers/userAsyncReducers'

const LoginScreen = ({ location, history }) => {

   const dispatch = useDispatch()
   const {
      error, loading, userLogin: {
         userInfo
      }
   } = useSelector(state => state.User)
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [msg, setMsg] = useState('')
   const redirect = location.search ? location.search.split('=')[1] : '/'
   useEffect(() => {
      setMsg(error.msg)
      if (userInfo) {
         history.push(redirect)
      }
   }, [history, error, userInfo, redirect])
   const loginData = {
      email: email,
      password: password
   }
   const onSubmitHandler = (e) => {
      e.preventDefault()
      dispatch(loginUser(loginData))
   }
   return (
      <FormHousing>
         <h1>Sign In</h1>
         {msg ? <Message variant='danger'>{`${msg}`}</Message> : ''}
         {loading && <AppLoader />}

         <Form onSubmit={onSubmitHandler}>
            <FloatingLabel className='mb-3' label='Email Address'>
               <Form.Control
                  type='email'
                  name='email'
                  placeholder='enter your mail here'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
               />
            </FloatingLabel>
            <FloatingLabel className='mb-3' label='Password'>
               <Form.Control
                  type='password'
                  name='password'
                  placeholder='enter your password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
               />
            </FloatingLabel>
            <Button
               variant='outline-dark'
               type='submit'
               style={{ marginTop: '1.2rem' }}
            >
               Login
            </Button>

         </Form>
         <Row>
            <Col>
               New Customer?{' '}
               <Link to={redirect ? `/register?redirect=${redirect}` : '/register'} >
                  Register
               </Link>
            </Col>
         </Row>

      </FormHousing>

   )
}

export default LoginScreen
