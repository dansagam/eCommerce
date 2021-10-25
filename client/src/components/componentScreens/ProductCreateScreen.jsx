import React, { useState, useEffect } from 'react'
import { Form, Button, FloatingLabel } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { createNewProduct } from '../../reduxReducers/asyncReducers/productAsyncReducers'
import AppLoader from '../componentParts/AppLoader'
import FormHousing from '../componentParts/FormHousing'
import Message from '../componentParts/Message'

const ProductCreateScreen = ({ history }) => {
   const [name, setName] = useState('')
   const [description, setDescription] = useState('')
   const [brand, setBrand] = useState('')
   const [category, setCategory] = useState('')
   const [price, setPrice] = useState(0)
   const [image, setImage] = useState('')
   const [countInStock, setCountInStock] = useState(0)
   const [msg, setMsg] = useState('')
   const dispatch = useDispatch()
   const { userLogin: {
      userInfo
   } } = useSelector(state => state.User)
   const { error, loading, product, createSuccess } = useSelector(state => state.Product)
   useEffect(() => {
      setMsg(error.msg)
      if (!userInfo || !userInfo.isAdmin) {
         history.push('/login')
      }
      else {
         if (createSuccess) {
            history.push(`/admin/product/${product._id}/edit`)
         } else {

         }
      }
   }, [error, userInfo, history, product, createSuccess])

   const newData = {
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
      dispatch(createNewProduct(newData))
   }
   return (
      <>
         <LinkContainer to={`/admin/productlist`} className='my-3'>
            <Button type='submit'>Go Back</Button>
         </LinkContainer>
         <FormHousing>
            {createSuccess && <Message variant='success'>{`Product successfully created`}</Message>}
            {msg ? <Message variant='danger'>{`${msg}`}</Message> : ''}
            {loading ? <AppLoader /> :
               (
                  <Form onSubmit={onSubmitHandler}>
                     <FloatingLabel label='Product Name'>
                        <Form.Control
                           type='text'
                           name='name'
                           value={name}
                           required
                           placeholder='Enter product name'
                           onChange={(e) => setName(e.target.value)}
                        />
                     </FloatingLabel>
                     <FloatingLabel label='Product Description' className='mb-2'>
                        <Form.Control
                           type='textarea'
                           name='description'
                           required
                           placeholder='Product Description'
                           value={description}
                           onChange={(e) => setDescription(e.target.value)}
                        />
                     </FloatingLabel >
                     <FloatingLabel label='Price' className='mb-2'>
                        <Form.Control
                           type='number'
                           name='price'
                           required
                           placeholder='Product Price'
                           value={price}
                           onChange={(e) => setPrice(e.target.value)}
                        />
                     </FloatingLabel>
                     <FloatingLabel label='Product Category' className='mb-2'>
                        <Form.Control
                           type='text'
                           name='category'
                           required
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
                           required
                           value={brand}
                           onChange={(e) => setBrand(e.target.value)}
                        />
                     </FloatingLabel>
                     <FloatingLabel label='Stock Qty' className='mb-2'>
                        <Form.Control
                           type='number'
                           name='countInStock'
                           required
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
                           onChange={(e) => setImage(e.target.files[0])}
                        />
                     </Form.Group>
                     <Button type='submit' variant='outline-primary' className='my-3'>
                        Create Product
                     </Button>
                  </Form>
               )
            }
         </FormHousing>

      </>
   )
}

export default ProductCreateScreen
