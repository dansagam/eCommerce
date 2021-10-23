import React, { useEffect, useState } from 'react'
import { Form, FloatingLabel, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import AppLoader from '../componentParts/AppLoader'
import Message from '../componentParts/Message'
import {
   getUserProfile,
   updateUserProfile
} from '../../reduxReducers/asyncReducers/userAsyncReducers'

const UserProfileScreen = ({ location, history }) => {
   const { userInfo } = useSelector(state => state.User.userLogin)
   const { error, isLoading, user } = useSelector(state => state.User)
   const dispatch = useDispatch()
   const [name, setName] = useState('')
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [confirmPassword, setConfirmPassword] = useState('')
   const [msg, setMsg] = useState('')
   const [message, setMessage] = useState('')

   useEffect(() => {
      setMsg(error.msg)
      if (!userInfo) {
         history.push('/login')
      } else {
         if (!user || !user.name) {
            dispatch(getUserProfile({ _id: userInfo._id }))
         } else {
            setName(user.name)
            setEmail(user.email)
         }
      }
   }, [error, history, userInfo, dispatch, user])
   const userUpdatedData = {
      _id: user._id,
      name: name,
      email: email,
      password: password
   }

   const onSubmitHandler = (e) => {
      e.preventDefault()
      if (confirmPassword !== password) {
         setMessage('password Entered does not match')
      } else {
         dispatch(updateUserProfile(userUpdatedData))
         setPassword('')
         setConfirmPassword('')
      }
   }
   return (
      <Row>
         <Col md={3}>
            <h1>User Profile</h1>
            {message ? <Message variant='danger'>{`${message}`}</Message> : ''}
            {msg ? <Message variant='danger'>{`${msg}`}</Message> : ''}
            {isLoading ? <AppLoader />
               : (<Form onSubmit={onSubmitHandler}>
                  <FloatingLabel label='Full Name'>
                     <Form.Control
                        type='text'
                        name='name'
                        placeholder='Enter your Full Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                     />
                  </FloatingLabel>
                  <FloatingLabel label='Email Address'>
                     <Form.Control
                        type='email'
                        name='email'
                        placeholder='Enter your email address'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                     />
                  </FloatingLabel>
                  <FloatingLabel label='Password'>
                     <Form.Control
                        type='password'
                        name='password'
                        placeholder='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                     />
                  </FloatingLabel>
                  <FloatingLabel label='Confirm Password'>
                     <Form.Control
                        type='password'
                        name='confirmpassword'
                        placeholder='Confirm password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                     />
                  </FloatingLabel>
                  <Button type='submit'>Update Profile</Button>
               </Form>)
            }

         </Col>
      </Row>
   )
}

export default UserProfileScreen
