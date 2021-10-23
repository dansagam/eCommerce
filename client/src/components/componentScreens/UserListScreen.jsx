import { faCheck, faEdit, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { deleteUser, getUsers } from '../../reduxReducers/asyncReducers/userAsyncReducers'
import AppLoader from '../componentParts/AppLoader'
import Message from '../componentParts/Message'

const UserListScreen = ({ history }) => {
   const [msg, setMsg] = useState('')
   const {
      error, isLoading, users, userLogin: {
         userInfo
      }
   } = useSelector(state => state.User)

   const dispatch = useDispatch()

   useEffect(() => {
      setMsg(error.msg)
      if (userInfo && userInfo.isAdmin) {
         dispatch(getUsers())
      } else {
         history.push('/login')
      }

   }, [error, userInfo, dispatch, history])

   const deleteUserHandler = (id) => {
      if (window.confirm('Are You Sure')) {
         dispatch(deleteUser(id))
      }
   }
   return (
      <>
         <h1>User List</h1>
         {msg ? <Message variant='danger'>{`${msg}`}</Message> : ''}
         {isLoading ? (<AppLoader />)
            : (
               <Table>
                  <thead>
                     <tr>
                        <td>NAME</td>
                        <td>EMAIL</td>
                        <td>ADMIN</td>
                        <td></td>
                     </tr>
                  </thead>
                  <tbody>
                     {users.map(user => (
                        <tr key={user._id}>
                           <td>{user.name}</td>
                           <td>
                              <a href={`mailto:${user.email}`}>{user.email}</a>
                           </td>
                           <td>
                              {user.isAdmin
                                 ? (<FontAwesomeIcon icon={faCheck} />)
                                 : (<FontAwesomeIcon icon={faTimes} />)
                              }
                           </td>
                           <td>
                              <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                 <Button variant='light' className='btn-sm'>
                                    <FontAwesomeIcon icon={faEdit} />
                                 </Button>
                              </LinkContainer>
                              <Button
                                 variant='light'
                                 className='btn-sm'
                                 onClick={() => deleteUserHandler(user._id)}
                              >
                                 <FontAwesomeIcon icon={faTrash} />
                              </Button>
                           </td>
                        </tr>))
                     }
                  </tbody>
               </Table>

            )}

      </>
   )
}

export default UserListScreen
