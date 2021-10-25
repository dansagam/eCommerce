import React, { useState, useEffect } from 'react'
import { Form, FloatingLabel, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getProductById, updateProduct } from '../../reduxReducers/asyncReducers/productAsyncReducers'
import AppLoader from '../componentParts/AppLoader'
import FormHousing from '../componentParts/FormHousing'
import Message from '../componentParts/Message'

const ProductEditScreen = ({ match, history }) => {
   const productId = match.params.id
   const dispatch = useDispatch()
   const { product, updateSuccess, error, loading } = useSelector(state => state.Product)
   const [price, setPrice] = useState(0)
   const [name, setName] = useState('')
   const [image, setImage] = useState('')
   const [brand, setBrand] = useState('')
   const [category, setCategory] = useState('')
   const [description, setDescription] = useState('')
   const [countInStock, setCountInStock] = useState(0)
   const [msg, setMsg] = useState('')
   useEffect(() => {
      setMsg(error.msg)
      if (updateSuccess) {
         history.push('/admin/productlist')
      } else {
         if (!product.name || product._id !== productId) {
            dispatch(getProductById({ _id: productId }))
         } else {
            setBrand(product.brand)
            setName(product.name)
            setCategory(product.category)
            setCountInStock(product.countInStock)
            setDescription(product.description)
            setPrice(product.price)
            setImage(product.image)
         }
      }
   }, [error, dispatch, productId, product, history, updateSuccess])

   const newData = {
      _id: productId,
      name: name,
      brand: brand,
      price: price,
      description: description,
      category: category,
      image: image,
      countInStock: countInStock
   }

   const onSubmitHandler = (e) => {
      e.preventDefault()
      dispatch(updateProduct(newData))
      // console.log(image)
   }
   return (
      <>
         <Link to={`/admin/productlist`} className='btn btn-light my-3'>
            Go Back
         </Link>
         <FormHousing>
            {msg ? <Message variant='danger'>{`${msg}`}</Message> : ''}
            {loading ? <AppLoader /> :
               (<Form onSubmit={onSubmitHandler}>
                  <FloatingLabel label='Name of Product' className='mb-2'>
                     <Form.Control
                        type='text'
                        name='name'
                        placeholder='Enter the product name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                     />
                  </FloatingLabel>
                  <FloatingLabel label='Product Description' className='mb-2'>
                     <Form.Control
                        type='textarea'
                        name='description'
                        placeholder='Product Description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                     />
                  </FloatingLabel >
                  <FloatingLabel label='Price' className='mb-2'>
                     <Form.Control
                        type='number'
                        name='price'
                        placeholder='Product Price'
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                     />
                  </FloatingLabel>
                  <FloatingLabel label='Category' className='mb-2'>
                     <Form.Control
                        type='text'
                        name='category'
                        placeholder='Product Category'
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                     />
                  </FloatingLabel>
                  <FloatingLabel label='Brand' className='mb-2'>
                     <Form.Control
                        type='text'
                        name='brand'
                        placeholder='Product Brand'
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                     />
                  </FloatingLabel>
                  <FloatingLabel label='Brand' className='mb-2'>
                     <Form.Control
                        type='text'
                        name='countInStock'
                        placeholder='Product stock Qty'
                        value={countInStock}
                        onChange={(e) => setCountInStock(e.target.value)}
                     />
                  </FloatingLabel>
                  <Form.Group className='mt-3 mb-3'>
                     <Form.Label>select your product image</Form.Label>
                     <Form.Control
                        type='file'
                        name='image'
                        placeholder='choose your image'
                        // value={image}
                        onChange={(e) => setImage(e.target.value)}
                     />
                  </Form.Group>
                  <Button type='submit' variant='outline-primary'>
                     Update.
                  </Button>

               </Form>)
            }
         </FormHousing>
      </>
   )
}

export default ProductEditScreen
