import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Form, Image, ListGroup, Row, FloatingLabel } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getProductById } from '../../reduxReducers/asyncReducers/productAsyncReducers'
import { /**getProductDetailsById*/ itemReviewCreation } from '../../reduxReducers/productReducers'
import AppLoader from '../componentParts/AppLoader'
import Message from '../componentParts/Message'
import MetaData from '../componentParts/MetaData'
import Ratings from '../componentParts/Ratings'

const ProductScreen = ({ history, match }) => {
   const dispatch = useDispatch()
   const [qty, setQty] = useState(0)
   const [rating, setRating] = useState(0)
   const [comment, setComment] = useState('')
   const [msg, setMsg] = useState('')


   const { loading, error, product, reviewCreateSuccess } = useSelector(state => state.Product)

   useEffect(() => {
      setMsg(error.msg)
      if (reviewCreateSuccess) {
         setRating(0)
         setComment('')
      }
      if (!product._id || product._id !== match.params.id) {

         dispatch(getProductById({ _id: match.params.id }))
      }
   }, [dispatch, match, product, reviewCreateSuccess, error])

   const submitHandler = (e) => {
      e.preventDefault()
      dispatch(itemReviewCreation(match.params.id, { comment: comment, rating: rating }))
      // dispatch(getProductDetailsById(match.params.id))
   }
   const addToCartHandler = () => {
      history.push(`/cart/${match.params.id}?qty=${qty}`)
   }
   return (
      <>
         <Link to='/' className='btn btn-light my-3'>Go Back</Link>
         {msg ? <Message variant='danger'>{`${msg}`}</Message> : ''}
         {loading ? <AppLoader />
            : (
               <>
                  <MetaData title={product.name} />
                  <Row>
                     <Col md={6}>
                        <Image src={product.image} fluid />
                     </Col>
                     <Col md={3}>
                        <ListGroup variant='flush'>
                           <ListGroup.Item>
                              <h3>{product.name}</h3>
                           </ListGroup.Item>
                           <ListGroup.Item>
                              <Ratings
                                 text={`${product.numReviews} reviews`}
                                 value={product.rating}
                              />
                           </ListGroup.Item>
                           <ListGroup.Item>Price: {product.price}</ListGroup.Item>
                           <ListGroup.Item>
                              Description: {product.description}
                           </ListGroup.Item>
                        </ListGroup>
                     </Col>
                     <Col md={3}>
                        <Card>
                           <ListGroup variant='flush' >
                              <ListGroup.Item>
                                 <Row>
                                    <Col>Price:</Col>
                                    <Col>
                                       <strong>${product.price}</strong>
                                    </Col>
                                 </Row>
                              </ListGroup.Item>
                              <ListGroup.Item>
                                 <Row>
                                    <Col>Status:</Col>
                                    <Col>
                                       {product.stockInCount > 0 ? 'InStock' : 'Out of stock'}
                                    </Col>
                                 </Row>
                              </ListGroup.Item>
                              {product.stockInCount > 0 && (
                                 <ListGroup.Item>
                                    <Row>
                                       <Col>Qty:</Col>
                                       <Col>
                                          <Form.Control
                                             as='select'
                                             value={qty}
                                             onChange={(e) => setQty(e.target.value)}
                                          >
                                             {[...Array(product.countInStock).keys()].map(
                                                (x) => (
                                                   <option key={x + 1} value={x + 1}>
                                                      {x + 1}
                                                   </option>
                                                )
                                             )}
                                          </Form.Control>
                                       </Col>
                                    </Row>
                                 </ListGroup.Item>
                              )}
                              <ListGroup.Item>
                                 <Button
                                    onClick={addToCartHandler}
                                    className='btn-block'
                                    type='button'
                                    disabled={product.countInStock === 0}
                                 >
                                    Add to Cart
                                 </Button>
                              </ListGroup.Item>
                           </ListGroup>
                        </Card>
                     </Col>
                  </Row>
                  <Row>
                     <Col md={6}>
                        <h2>Reviews</h2>
                        {product.reviews.length === 0 && <Message variant='danger'>No Reviews done so far</Message>}
                        <ListGroup>
                           {product.reviews.map(review => (
                              <ListGroup.Item key={review._id}>
                                 <strong>{review.name}</strong>
                                 <Ratings value={review.rating} />
                                 <strong>{review.comment}</strong>
                              </ListGroup.Item>
                           ))}
                           <ListGroup.Item>
                              {msg && (<Message variant='danger'>{`${msg}`}</Message>)}
                              <Form onSubmit={submitHandler}>
                                 <FloatingLabel
                                    controlId="floatingInputRatings"
                                    label='Ratings'
                                 >
                                    <Form.Select
                                       value={rating}
                                       onChange={(e) => setRating(e.target.value)}
                                    >
                                       <option value=''>Select...</option>
                                       <option value='1'>1 - Poor</option>
                                       <option value='2'>2 - Fair</option>
                                       <option value='3'>3 - Good</option>
                                       <option value='4'>4 - Very Good</option>
                                       <option value='5'>5 - Excellent</option>
                                    </Form.Select>
                                 </FloatingLabel>

                                 <FloatingLabel
                                    controlId='floatingInputComment'
                                    label='Comment'
                                 >
                                    <Form.Control
                                       type='textarea'
                                       value={comment}
                                       onChange={(e) => setComment(e.target.value)}

                                    />
                                 </FloatingLabel>
                                 <Button type='submit' variant='primary'>Submit</Button>
                              </Form>



                              <Message>
                                 Please <Link to='/login'>sign in</Link> to write a review{' '}
                              </Message>
                           </ListGroup.Item>
                        </ListGroup>
                     </Col>
                  </Row>
               </>
            )

         }
      </>
   )
}

export default ProductScreen
