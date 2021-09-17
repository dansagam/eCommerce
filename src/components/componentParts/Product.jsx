import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Ratings from './Ratings'

const Product = () => {
   return (
      <div>
         <Card className='my-3 p-3 rounded'>
            <Link to={`/product/${'434329329'}`} >
               <Card.Img src="/images/airpods.jpg" variant='top' />
            </Link>
            <Card.Body>
               <Link to={`/product/${'79339'}`} >
                  <Card.Title as='div'>
                     <strong>Iphone</strong>
                  </Card.Title>
               </Link>
               <Card.Text as='div'>
                  <Ratings 
                     value={'rating'}
                     text={`derer`}
                  />
               </Card.Text>
               <Card.Text as='h3'> 100000</Card.Text>
            </Card.Body>
            
         </Card>
      </div>
   )
}

export default Product
