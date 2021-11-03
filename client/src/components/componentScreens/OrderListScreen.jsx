import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState, useEffect } from 'react'
import { Button, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { getOrders } from '../../reduxReducers/asyncReducers/orderAsyncReducers'
import { clearOrderError } from '../../reduxReducers/orderReducer'
import AppLoader from '../componentParts/AppLoader'
import Message from '../componentParts/Message'


const OrderListScreen = ({ history }) => {
   const dispatch = useDispatch()
   const [msg, setMsg] = useState('')


   const { loading, orders, error_order } = useSelector(state => state.Order)
   const { userInfo } = useSelector(state => state.User.userLogin)


   useEffect(() => {
      setMsg(error_order.order_msg)
      if (userInfo && userInfo.isAdmin) {
         dispatch(getOrders())
      } else {
         history.push('/login')
      }
      return () => {
         dispatch(clearOrderError())
      }

   }, [error_order, userInfo, history, dispatch,])
   return (
      <>
         {msg && <Message variant={'danger'}>{`${msg}`}</Message>}
         <h1>Order List</h1>
         {loading.getOrderLoading ? <AppLoader /> :
            (
               <Table striped bordered hover responsive className='table-sm'>
                  <thead>
                     <tr>
                        <th>USER</th>
                        <th>DATE</th>
                        <th>TOTAL</th>
                        <th>PAID</th>
                        <th>DELIVERED</th>
                        <th></th>
                     </tr>
                  </thead>
                  <tbody>
                     {orders.map(order => (
                        <tr key={order._id}>
                           <td>{order.user && order.user.name}</td>
                           <td>{order.createdAt.substring(0, 10)}</td>
                           <td>{order.totalPrice}</td>
                           <td>
                              {order.isPaid ? (order.paidAt.substring(0, 10)) :
                                 (
                                    <FontAwesomeIcon icon={faTimes} style={{ color: 'red' }} />
                                 )}
                           </td>
                           <td>
                              {order.isDelivered ? (
                                 order.deliveredAt.substring(0, 10)
                              ) : (
                                 <FontAwesomeIcon icon={faTimes} style={{ color: 'red' }} />
                              )}
                           </td>
                           <td>
                              <LinkContainer to={`/order/${order._id}`}>
                                 <Button
                                    variant='light'
                                    className='btn-sm'
                                 >
                                    Detail
                                 </Button>
                              </LinkContainer>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </Table>
            )}

      </>
   )
}

export default OrderListScreen
