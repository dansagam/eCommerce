import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getProductLists } from '../../reduxReducers/asyncReducers/productAsyncReducers'
// import { getProduct } from '../../reduxReducers/productReducers'
import AppCarousels from '../componentParts/AppCarousels'
import AppLoader from '../componentParts/AppLoader'
import Message from '../componentParts/Message'
import MetaData from '../componentParts/MetaData'
import PaginationContainer from '../componentParts/PaginationContainer'
import Product from '../componentParts/Product'

const AppDashboard = ({match}) => {
   const dispatch = useDispatch()
   const keyword = match.params.keyword
   const pageNumber = match.params.pageNumber || 1
   const productList = useSelector(state => state.Product)
   const { /** products*/ products, page, pages, error, loading} = productList
   useEffect(() => {
      dispatch(getProductLists({keyword, pageNumber}))
   },[dispatch, keyword, pageNumber])
   return (
      <>
         <MetaData />
         {!keyword ? (
            <AppCarousels />
         ) :(
            <Link to='/' className='btn btn-light'>
               Go Back
            </Link>
         )}
         <h1>Latest Products</h1>
         {loading ? (
            <AppLoader />
         ): error ? (
            <Message variant='danger'>{error}</Message>
         ) : (
            <>
               <Row>
                  {products.map((product) => (
                     <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={product} />
                     </Col>
                  ))}
               </Row>
               <PaginationContainer 
                  pages={pages}
                  page= {page}
                  keyword={keyword ? keyword : ''}
               />
            </>
         )}
      </>
   )
}

export default AppDashboard
