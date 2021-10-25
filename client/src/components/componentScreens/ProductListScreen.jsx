import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Button, Table, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { getProductLists } from '../../reduxReducers/asyncReducers/productAsyncReducers'
import AppLoader from '../componentParts/AppLoader'
import Message from '../componentParts/Message'

const ProductListScreen = ({ history, match }) => {
   const pageNumber = match.params.pageNumber || 1
   const dispatch = useDispatch()
   const { products, loading, error } = useSelector(state => state.Product)
   const {
      userLogin: {
         userInfo
      }
   } = useSelector(state => state.User)
   const [msg, setMsg] = useState('')
   useEffect(() => {
      setMsg(error.msg)
      if (!userInfo || !userInfo.isAdmin) {
         history.push('/login')
      } else {
         dispatch(getProductLists({ keyword: '', pageNumber: pageNumber }))
      }
   }, [error, userInfo, history, dispatch, pageNumber])
   const onClickPlus = () => {
      history.push('/admin/product/create')
   }
   return (
      <>
         <Row className='align-items-center'>
            <Col>
               <h1>Products</h1>
            </Col>
            <Col>
               <Button onClick={onClickPlus}>
                  <FontAwesomeIcon icon={faPlus} />
               </Button>
            </Col>
         </Row>
         {msg ? <Message variant='danger'>{`${msg}`}</Message> : ''}
         {loading ? <AppLoader /> :
            (<Table striped bordered hover responsive className='table-sm'>
               <thead>
                  <tr>
                     <th>NAME</th>
                     <th>PRICE</th>
                     <th>CATEGORY</th>
                     <th>BRAND</th>
                     <th></th>
                  </tr>
               </thead>
               <tbody>
                  {products.map(product => (
                     <tr key={product._id}>
                        <td>{product.name}</td>
                        <td>₦{product.price}</td>
                        <td>{product.category}</td>
                        <td>{product.brand}</td>
                        <td>
                           <LinkContainer to={`/admin/product/${product._id}/edit`} >
                              <Button variant='light' className='btn-sm'>
                                 <FontAwesomeIcon icon={faEdit} />
                              </Button>
                           </LinkContainer>
                           <Button variant='light' className='btn-sm'>
                              <FontAwesomeIcon icon={faTrash} />
                           </Button>
                        </td>
                     </tr>))
                  }
               </tbody>
            </Table>)
         }
      </>
   )
}

export default ProductListScreen
