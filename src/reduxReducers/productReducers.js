import { createSlice, nanoid } from "@reduxjs/toolkit"



export const ProductReducers = createSlice({
   name: 'product',
   initialState: {
      products: [
         {
            _id: nanoid(),
            name: 'Alexa',
            image: '/images/alexa.jpg',
            price: 40000,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, aliquam!',
            numReviews: 20,
            rating: 4,
            reviews: [
               { rating: 5, comment: 'helping us',},
               { rating: 2, comment: 'helping us',},
               { rating: 3, comment: 'helping us',},
               { rating: 4, comment: 'helping us',},
            ],
            stockInCount: 0
         },
         {
            _id: nanoid(),
            name: 'Airpod',
            image: '/images/airpods.jpg',
            price: 40000,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, aliquam!',
            numReviews: 1000,
            rating: 3.7,
            reviews: [
               { rating: 5, comment: 'helping us',},
               { rating: 5, comment: 'helping us',},
               { rating: 5, comment: 'helping us',},
               { rating: 4, comment: 'helping us',},
            ],
            stockInCount: 12
         },
         {
            _id: nanoid(),
            name: 'Camera',
            image: '/images/camera.jpg',
            price: 20000,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, aliquam!',
            numReviews: 10,
            rating: 3.7,
            reviews: [
               { rating: 5, comment: 'helping us',},
               { rating: 5, comment: 'helping us',},
               { rating: 3, comment: 'helping us',},
               { rating: 4, comment: 'helping us',},
            ],
            stockInCount: 12
         },
         {
            _id: nanoid(),
            name: 'Mouse',
            image: '/images/mouse.jpg',
            price: 40000,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, aliquam!',
            numReviews: 5,
            rating: 0.5,
            reviews: [
               { rating: 0, comment: 'helping us',},
               { rating: 2, comment: 'helping us',},
               { rating: 3, comment: 'helping us',},
               { rating: 4, comment: 'helping us',},
            ],
            stockInCount: 12
         },
         {
            _id: nanoid(),
            name: 'iPhone',
            image: '/images/phone.jpg',
            price: 8000,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, aliquam!',
            numReviews: 7,
            rating: 4.7,
            reviews: [
               { rating: 3, comment: 'helping us',},
               { rating: 2, comment: 'helping us',},
               { rating: 3, comment: 'helping us',},
               { rating: 4, comment: 'helping us',},
               { rating: 4, comment: 'helping us',},
               { rating: 4, comment: 'helping us',},
            ],
            stockInCount: 12
         },
         {
            _id: nanoid(),
            name: 'iPhone',
            image: '/images/playstation.jpg',
            price: 5000,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, aliquam!',
            numReviews: 3,
            rating: 2.6,
            reviews: [
               { rating: 2, comment: 'helping us',},
               { rating: 2, comment: 'helping us',},
               { rating: 3, comment: 'helping us',},
            ],
            stockInCount: 12
         },
         {
            _id: nanoid(),
            name: 'iPhone',
            image: '/images/playstation.jpg',
            price: 5000,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, aliquam!',
            numReviews: 3,
            rating: 2.6,
            reviews: [
               { rating: 2, comment: 'helping us',},
               { rating: 2, comment: 'helping us',},
               { rating: 3, comment: 'helping us',},
            ],
            stockInCount: 12
         },
         {
            _id: nanoid(),
            name: 'iPhone',
            image: '/images/playstation.jpg',
            price: 5000,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, aliquam!',
            numReviews: 3,
            rating: 2.6,
            reviews: [
               { rating: 2, comment: 'helping us',},
               { rating: 2, comment: 'helping us',},
               { rating: 3, comment: 'helping us',},
            ],
            stockInCount: 12
         },
         {
            _id: nanoid(),
            name: 'iPhone',
            image: '/images/playstation.jpg',
            price: 5000,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, aliquam!',
            numReviews: 3,
            rating: 2.6,
            reviews: [
               { rating: 2, comment: 'helping us',},
               { rating: 2, comment: 'helping us',},
               { rating: 3, comment: 'helping us',},
            ],
            stockInCount: 12
         },
         {
            _id: nanoid(),
            name: 'iPhone',
            image: '/images/playstation.jpg',
            price: 5000,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, aliquam!',
            numReviews: 3,
            rating: 2.6,
            reviews: [
               { rating: 2, comment: 'helping us',},
               { rating: 2, comment: 'helping us',},
               { rating: 3, comment: 'helping us',},
            ],
            stockInCount: 12
         },
         {
            _id: nanoid(),
            name: 'iPhone',
            image: '/images/playstation.jpg',
            price: 5000,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, aliquam!',
            numReviews: 3,
            rating: 2.6,
            reviews: [
               { rating: 2, comment: 'helping us',},
               { rating: 2, comment: 'helping us',},
               { rating: 3, comment: 'helping us',},
            ],
            stockInCount: 12
         },
      ],
      productSearch: [
         {
            _id: null,
            name: '',
            image: '',
            price: null,
            description: '',
            numReviews: null,
            rating: null,
            reviews: [
            ],
            stockInCount: null

         },

      ],
      product: {
         _id: null,
         name: '',
         image: '',
         price: null,
         description: '',
         numReviews: null,
         rating: null,
         reviews: [
         ],
         stockInCount: null

      },
      loading: false,
      status: false,
      error: null,
      page: 2,
      pages: 1
   },
   reducers: {
      getProduct: {
         reducer: (state, action) => {
            console.log(action.payload)
            const { page, keyword} = action.payload
            // const regex = new RegExp(escapeRegex(keyword), 'gi')
            let refee = keyword ? {
               name: {
                 $regex: escapeRegex(keyword),
                 $options: 'i',
               },
             } : {}
            const productFound = state.products.slice((page-1)*10, page*10)
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
         prepare : (keyword = '', pageNumber = '') => {
            const page = pageNumber
            return {
               payload: { 
                  page: page,
                  keyword: keyword
               }
            }

         }
      },
      itemReviewCreation :  {
         reducer: (state , action) => {
            state.loading = false
            const {_id, data} = action.payload
            let selectedItem = state.products.find(product => product._id === _id)
            if(selectedItem){
               selectedItem.reviews.push(data)
            }
            // return {
            //    ...state,
            //    product: {
            //       reviews: [data, ...state.product.reviews]
            //    }
            // }
         },
         prepare : (_id, {comment, rating}) => {
            return {
               payload: {
                  _id : _id,
                  data: {
                     comment: comment,
                     rating: rating
                  }
               }
            }

         }
      },
      getProductDetailsById : (state, action) => {
         console.log(action.payload)
         return {
            ...state,
            product: state.products.find(product => product._id === action.payload)
         }
      }
   },
   extraReducers:{

   }
})
function escapeRegex(text) {
   return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

export const { itemReviewCreation, getProduct,getProductDetailsById } = ProductReducers.actions

export default ProductReducers.reducer