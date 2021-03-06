import { createSlice,/**nanoid*/ } from "@reduxjs/toolkit"
import {
   createNewProduct,
   createReview,
   deleteProduct,
   getProductById,
   getProductLists,
   getTopRatedProduct,
   updateProduct
} from "./asyncReducers/productAsyncReducers"


const ProductReducers = createSlice({
   name: 'product',
   initialState: {
      products: [],
      topProducts: [],
      product: {
         reviews: []
      },
      reviews: [],
      loading: false,
      status: false,
      // error: null,
      page: null,
      pages: null,
      updateSuccess: false,
      createSuccess: false,
      deleteSuccess: false,
      reviewCreateSuccess: false,
      error: {
         msg: '',
         status: null,
         id: null
      },
   },
   reducers: {
      clearProductError: (state, action) => {
         return {
            ...state,
            error: {
               msg: '',
               status: null,
               id: null
            },
            updateSuccess: false,
            createSuccess: false,
            deleteSuccess: false,
            reviewCreateSuccess: false,
         }
      },
      clearProductSuccess: (state, action) => {
         return {
            ...state,
            updateSuccess: false,
            createSuccess: false,
            deleteSuccess: false,
            reviewCreateSuccess: false,
         }
      },
      getProduct: {
         reducer: (state, action) => {
            console.log(action.payload)
            const { page, keyword } = action.payload
            // const regex = new RegExp(escapeRegex(keyword), 'gi')
            let refee = keyword ? {
               name: {
                  $regex: escapeRegex(keyword),
                  $options: 'i',
               },
            } : {}
            const productFound = state.products.slice((page - 1) * 10, page * 10)
            console.log(refee)
            // const productFound = state.products.find(product => product.name === refee)
            const pages = Math.ceil(state.products.length / 10)
            return {
               ...state,
               loading: false,
               productSearch: productFound,
               pages: pages,
               page: page
            }
         },
         prepare: (keyword = '', pageNumber = '') => {
            const page = pageNumber
            return {
               payload: {
                  page: page,
                  keyword: keyword
               }
            }

         }
      },
      itemReviewCreation: {
         reducer: (state, action) => {
            state.loading = false
            const { _id, data } = action.payload
            let selectedItem = state.products.find(product => product._id === _id)
            if (selectedItem) {
               selectedItem.reviews.push(data)
            }
            // return {
            //    ...state,
            //    product: {
            //       reviews: [data, ...state.product.reviews]
            //    }
            // }
         },
         prepare: (_id, { comment, rating }) => {
            return {
               payload: {
                  _id: _id,
                  data: {
                     comment: comment,
                     rating: rating
                  }
               }
            }

         }
      },
      getProductDetailsById: (state, action) => {
         console.log(action.payload)
         return {
            ...state,
            product: state.products.find(product => product._id === action.payload)
         }
      }
   },
   extraReducers: {
      [getProductLists.pending]: (state, action) => {
         state.loading = true
      },
      [getProductLists.fulfilled]: (state, action) => {
         // console.log(action.payload)
         return {
            ...state,
            loading: false,
            products: action.payload.products,
            pages: action.payload.pages,
            page: action.payload.page
         }
      },
      [getProductLists.rejected]: (state, action) => {
         // console.log(action.payload)
         return {
            ...state,
            loading: false,
            status: false,
            error: {
               msg: action.payload.data.message,
               status: action.payload.status,
               id: action.payload.statusText
            }
            // error: action.payload.data.message
         }
      },
      [getProductById.pending]: (state, action) => {
         return {
            ...state,
            loading: true
         }
      },
      [getProductById.fulfilled]: (state, action) => {
         // console.log(action.payload)
         return {
            ...state,
            loading: false,
            product: action.payload
         }
      },
      [getProductById.rejected]: (state, action) => {
         console.log(action.payload)
         return {
            ...state,
            loading: false,
            status: false,
            error: {
               msg: action.payload.data.message,
               status: action.payload.status,
               id: action.payload.statusText
            }
            // error: action.payload.data.message
         }
      },
      [getTopRatedProduct.pending]: (state, action) => {
         return {
            ...state,
            loading: false
         }
      },
      [getTopRatedProduct.fulfilled]: (state, action) => {
         return {
            ...state,
            loading: false,
            topProducts: action.payload
         }
      },
      [getTopRatedProduct.rejected]: (state, action) => {
         return {
            ...state,
            loading: false,
            status: false,
            error: {
               msg: action.payload.data.message,
               status: action.payload.status,
               id: action.payload.statusText
            }
            // error: action.payload.data.message
         }
      },
      [createNewProduct.pending]: (state, action) => {
         return {
            ...state,
            loading: true,
            createSuccess: false
         }
      },
      [createNewProduct.fulfilled]: (state, action) => {
         return {
            ...state,
            loading: false,
            products: [action.payload, ...state.products],
            product: action.payload,
            createSuccess: true
         }
      },
      [createNewProduct.rejected]: (state, action) => {
         return {
            ...state,
            loading: false,
            status: false,
            createSuccess: false,
            error: {
               msg: action.payload.data.message,
               status: action.payload.status,
               id: action.payload.statusText
            }
            // error: action.payload.data.message
         }
      },
      [deleteProduct.pending]: (state, action) => {
         return {
            ...state,
            loading: true,
            deleteSuccess: false
         }
      },
      [deleteProduct.fulfilled]: (state, action) => {
         return {
            ...state,
            loading: false,
            products: state.products.filter(product => product._id !== action.payload),
            deleteSuccess: true
         }
      },
      [deleteProduct.rejected]: (state, action) => {
         return {
            ...state,
            loading: false,
            status: false,
            deleteSuccess: false,
            error: {
               msg: action.payload.data.message,
               status: action.payload.status,
               id: action.payload.statusText
            }
            // error: action.payload.data.message
         }
      },
      [updateProduct.pending]: (state, action) => {
         return {
            ...state,
            loading: true,
            updateSuccess: false
         }
      },
      [updateProduct.fulfilled]: (state, action) => {
         const { _id, name, description, category, price, image, countInStock } = action.payload
         const existingProduct = state.products.find(product => product._id === _id)
         if (existingProduct) {
            existingProduct.name = name
            existingProduct.description = description
            existingProduct.price = price
            existingProduct.image = image
            existingProduct.category = category
            existingProduct.countInStock = countInStock
         }
         return {
            ...state,
            loading: false,
            updateSuccess: true,
            product: action.payload
         }
      },
      [updateProduct.rejected]: (state, action) => {
         return {
            ...state,
            loading: false,
            status: false,
            updateSuccess: false,
            error: {
               msg: action.payload.data.message,
               status: action.payload.status,
               id: action.payload.statusText
            }
            // error: action.payload.data.message
         }
      },
      [createReview.pending]: (state, action) => {
         return {
            ...state,
            loading: true,
            reviewCreateSuccess: false,
         }
      },
      [createReview.fulfilled]: (state, action) => {
         return {
            ...state,
            loading: false,
            reviewCreateSuccess: true,
            product: action.payload,
            reviews: action.payload.reviews
         }
      },
      [createReview.rejected]: (state, action) => {
         return {
            ...state,
            loading: false,
            reviewCreateSuccess: false,
            error: {
               msg: action.payload.data.message,
               status: action.payload.status,
               id: action.payload.statusText
            }

         }
      }
   }
})



function escapeRegex(text) {
   return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

export const {
   itemReviewCreation,
   getProduct,
   getProductDetailsById,
   clearProductError,
   clearProductSuccess
} = ProductReducers.actions

export default ProductReducers.reducer