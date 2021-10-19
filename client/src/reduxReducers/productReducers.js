import { createSlice,/**nanoid*/ } from "@reduxjs/toolkit"
import {
   createNewProduct,
   deleteProduct,
   getProductById,
   getProductLists,
   getTopRatedProduct,
   updateProduct
} from "./asyncReducers/productAsyncReducers"


export const ProductReducers = createSlice({
   name: 'product',
   initialState: {
      products: [],
      topProducts: [],
      product: {
         reviews: []
      },
      loading: false,
      status: false,
      error: null,
      page: null,
      pages: null
      // productSearch: [
      //    {
      //       _id: null,
      //       name: '',
      //       image: '',
      //       price: null,
      //       description: '',
      //       numReviews: null,
      //       rating: null,
      //       reviews: [
      //       ],
      //       stockInCount: null

      //    },

      // ],
      // error: {
      //    msg: undefined,
      //    status: null,
      //    id: null
      // },
   },
   reducers: {
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
            // error: {
            //    msg: action.payload.data.message,
            //    status: action.payload.status,
            //    id: action.payload.statusText
            // }
            error: action.payload.data.message
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
         return {
            ...state,
            loading: false,
            status: false,
            // error: {
            //    msg: action.payload.data.message,
            //    status: action.payload.status,
            //    id: action.payload.statusText
            // }
            error: action.payload.data.message
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
            // error: {
            //    msg: action.payload.data.message,
            //    status: action.payload.status,
            //    id: action.payload.statusText
            // }
            error: action.payload.data.message
         }
      },
      [createNewProduct.pending]: (state, action) => {
         return {
            ...state,
            loading: true
         }
      },
      [createNewProduct.fulfilled]: (state, action) => {
         return {
            ...state,
            loading: false,
            products: [action.payload, ...state.products]
         }
      },
      [createNewProduct.rejected]: (state, action) => {
         return {
            ...state,
            loading: false,
            status: false,
            // error: {
            //    msg: action.payload.data.message,
            //    status: action.payload.status,
            //    id: action.payload.statusText
            // }
            error: action.payload.data.message
         }
      },
      [deleteProduct.pending]: (state, action) => {
         return {
            ...state,
            loading: true
         }
      },
      [deleteProduct.fulfilled]: (state, action) => {
         return {
            ...state,
            loading: false,
            products: state.products.filter(product => product._id !== action.payload)
         }
      },
      [deleteProduct.rejected]: (state, action) => {
         return {
            ...state,
            loading: false,
            status: false,
            // error: {
            //    msg: action.payload.data.message,
            //    status: action.payload.status,
            //    id: action.payload.statusText
            // }
            error: action.payload.data.message
         }
      },
      [updateProduct.pending]: (state, action) => {
         return {
            ...state,
            loading: true
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
      },
      [updateProduct.rejected]: (state, action) => {
         return {
            ...state,
            loading: false,
            status: false,
            // error: {
            //    msg: action.payload.data.message,
            //    status: action.payload.status,
            //    id: action.payload.statusText
            // }
            error: action.payload.data.message
         }
      }
   }
})



function escapeRegex(text) {
   return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

export const { itemReviewCreation, getProduct, getProductDetailsById } = ProductReducers.actions

export default ProductReducers.reducer