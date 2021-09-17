import React from 'react'
import { Col, Row } from 'react-bootstrap'
import AppCarousels from '../componentParts/AppCarousels'
import AppLoader from '../componentParts/AppLoader'
import Message from '../componentParts/Message'
import MetaData from '../componentParts/MetaData'
import PaginationContainer from '../componentParts/PaginationContainer'
import Product from '../componentParts/Product'

const AppDashboard = ({match}) => {
   const keyword = match.params.keyword
   // const pageNumber = match.params.pageNumber
   return (
      <>
         <MetaData />
         <AppCarousels />
         <h1>Latest Products</h1>
         <AppLoader />
         <Message variant='danger'>ferjskfj</Message>
         <>
            <Row>
               <Col sm={12} md={6} lg={4} xl={3}>
                  <Product product='product' />
               </Col>
            </Row>
            <PaginationContainer 
               pages={'ewee'}
               page= {'plojj'}
               keyword={keyword ? keyword : ''}
            />
         </>
      </>
   )
}

export default AppDashboard
