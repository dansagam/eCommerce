import React, { useEffect } from 'react'
import { Image, Carousel } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getTopRatedProduct } from '../../reduxReducers/asyncReducers/productAsyncReducers'
import AppLoader from './AppLoader'
import Message from './Message'

const AppCarousels = () => {
   const dispatch = useDispatch()
   const productList = useSelector(state => state.Product)
   const { loading, error, topProducts } = productList

   useEffect(() => {
      dispatch(getTopRatedProduct())
   }, [dispatch])
   return loading ? (
      <AppLoader />
   ) : error ? (
      <Message variant='danger' >{error}</Message>
   ) : (
      <>
         <Carousel pause='hover' className='bg-dark carousel' fade>
            {topProducts.map((product) => (
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
