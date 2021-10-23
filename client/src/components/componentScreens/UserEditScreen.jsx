import React, { useEffect, useState } from 'react'
import { Button, Form, FloatingLabel } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getUserById, updateUser } from '../../reduxReducers/asyncReducers/userAsyncReducers'
import AppLoader from '../componentParts/AppLoader'
import FormHousing from '../componentParts/FormHousing'
import Message from '../componentParts/Message'

const UserEditScreen = ({ match, history }) => {
   const userId = match.params.id
   const dispatch = useDispatch()
   const [msg, setMsg] = useState('')
   const [name, setName] = useState('')
   const [email, setEmail] = useState('')
   const [isAdmin, setIsAdmin] = useState('')
   const [statusBar, setStatusBar] = useState('')
   const { isLoading, error, user, success } = useSelector(state => state.User)
   useEffect(() => {
      setMsg(error.msg)
      if (success) {
         history.push('/admin/userlist')
      } else {
         if (!user.name || user._id !== userId) {
            dispatch(getUserById({ _id: userId }))
         } else {
            setName(user.name)
            setEmail(user.email)
            setIsAdmin(user.isAdmin)
            setStatusBar(user.status)
         }
      }


   }, [error, user, success, history, dispatch, userId])
   const newData = {
      _id: userId,
      name: name,
      email: email,
      status: statusBar,
      isAdmin: isAdmin
   }

   const onSubmitHandler = (e) => {
      e.preventDefault()
      dispatch(updateUser(newData))
   }
   return (
      <FormHousing>
         {msg ? <Message variant='danger'>{msg}</Message> : ''}
         {isLoading ? <AppLoader /> : (
            <Form onSubmit={onSubmitHandler}>
               <FloatingLabel label='Full Name'>
                  <Form.Control
                     type='text'
                     name='name'
                     placeholder='Enter your Full name'
                     value={name}
                     onChange={(e) => setName(e.target.value)}
                  />
               </FloatingLabel>
               <FloatingLabel label='Email Address'>
                  <Form.Control
                     type='text'
                     name='name'
                     placeholder='Enter your Full name'
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                  />
               </FloatingLabel>
               <Form.Group className='mb-3'>
                  <Form.Check
                     type='checkbox'
                     name='isAdmin'
                     checked={isAdmin}
                     label='isAdmin check'
                     value={isAdmin}
                     onChange={(e) => setIsAdmin(e.target.checked)}
                  />
               </Form.Group>
               <Form.Group className='mb-3'>
                  <Form.Check
                     type='radio'
                     inline
                     as='input'
                     name='status'
                     checked={statusBar === 'active'}
                     label='active'
                     value='active'
                     onChange={(e) => setStatusBar(e.target.value)}
                  />
                  <Form.Check
                     type='radio'
                     as='input'
                     inline
                     name='status'
                     checked={statusBar === 'inactive'}
                     label='inactive'
                     value='inactive'
                     onChange={(e) => setStatusBar(e.target.value)}
                  />
               </Form.Group>
               <Button type='submit'>
                  Update User Detail
               </Button>
            </Form>
         )}
      </FormHousing>
   )
}

export default UserEditScreen
