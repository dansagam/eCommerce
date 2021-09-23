import React from 'react'
import { Image, Carousel } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import AppLoader from './AppLoader'
import Message from './Message'

const AppCarousels = () => {
   const productList = useSelector(state => state.Product)
   const {loading, error, products} = productList

   
   return loading  ? (
      <AppLoader />
   ) : error ? (
      <Message variant='danger' >{error}</Message>
   ) : (
      <>
         <Carousel pause='hover' className='bg-dark carousel' fade>
            {products.map((product) => (
            <Carousel.Item key={product._id} className='carousel-item'>
               <Link to={`/product/${product._id}`}>
                  <Image
                     className="d-block"
                     src={`${product.image}`}
                     alt="First slide"
                     fluid
                  />
                  <Carousel.Caption className='carousel-caption'>
                     <h3>{product.name} {product.price}</h3>
                  </Carousel.Caption>
               </Link>
            </Carousel.Item>

            ))}
         </Carousel>
         
      </>
   )
}

export default AppCarousels
