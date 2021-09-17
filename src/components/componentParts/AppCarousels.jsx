import React from 'react'
import { Image, Carousel } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const AppCarousels = () => {
   return (
      <>
         <Carousel pause='hover' className='bg-dark carousel' fade>
            <Carousel.Item className='carousel-item'>
               <Link to={`/product/${'sdksjdfje'}`}>
                  <Image
                     className="d-block"
                     // src="holder.js/800x400?text=First slide&bg=373940"
                     src="/images/airpods.jpg"
                     alt="First slide"
                     fluid
                  />
                  <Carousel.Caption className='carousel-caption'>
                     <h3>First slide label</h3>
                  </Carousel.Caption>
               </Link>
            </Carousel.Item>
            {/* <Carousel.Item>
               <Image
                  className="d-block w-100"
                  // src="holder.js/800x400?text=Second slide&bg=282c34"
                  src="/images/airpods.jpg"
                  alt="Second slide"
                  fluid
               />
               <Carousel.Caption>
                  <h3>Second slide label</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
               </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
               <Image
                  className="d-block w-100"
                  // src="holder.js/800x400?text=Third slide&bg=20232a"
                  src="/images/airpods.jpg"
                  alt="Third slide"
                  fluid
               />
            
               <Carousel.Caption>
                  <h3>Third slide label</h3>
                  <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
               </Carousel.Caption>
            </Carousel.Item> */}
         </Carousel>
         
      </>
   )
}

export default AppCarousels
