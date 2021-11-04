import mongoose from 'mongoose'
import Product from "../models/productModel.js";
import Reviews from "../models/reviewModel.js";



export const getProducts = async (req, res, next) => {
   try {
      const pageSize = 10
      const page = req.query.pageNumber || 1
      const keyword = req.query.keyword ? {
         name: {
            $regex: req.query.keyword,
            $options: 'i',
         },
      } : {}
      const countDoc = await Product.countDocuments({ ...keyword })
      const products = await Product.find({ ...keyword }).limit(pageSize).skip(pageSize * (page - 1))
      return res.status(201).json({
         success: true,
         count: products.length,
         data: {
            products: products,
            page: page,
            pages: Math.ceil(countDoc / pageSize)
         }
      })

   } catch (err) {
      res.status(401)
      next(err)

   }

}


/*
    @route  api/products/:id
    @desc GET the controller query the db for a specific product via the ID params
    @access private
*/

export const getProductById = async (req, res, next) => {
   try {
      const product = await Product.findById(req.params.id).populate('reviews')
      if (product) {
         return res.status(201).json({
            success: true,
            data: product
         })
      } else {
         res.status(400)
         throw Error('Product not Found')
      }
   } catch (err) {
      res.status(400)
      next(err)
   }
}

export const createProduct = async (req, res, next) => {
   try {
      const {
         category,
         brand,
         name,
         image,
         description,
         price

      } = req.body

      const product = await Product.create({
         name: name,
         price: price,
         user: req.user._id,
         image: req.file.filename,
         // image: image,
         brand: brand,
         category: category,
         countInStock: 0,
         numReviews: 0,
         description: description,
      })

      if (product) {
         return res.status(201).json({
            success: true,
            data: product
         })
      } else {
         res.status(404)
         throw Error('Documents not saved')
      }
   } catch (err) {
      res.status(404).json({
         success: false,
         error: err.message
      })
      // next(err)


   }
}


/*
    @route  api/product/:id
    @desc DELETE by params id
    @access private
*/

export const deleteProduct = async (req, res, next) => {
   try {
      const product = await Product.findByIdAndRemove(req.params.id)
      if (product) {
         return res.status(201).json({
            success: true,
            message: 'Product Deleted successfull'
         })
      } else {
         res.status(400)
         throw Error('Product not Found')

      }
   } catch (err) {
      res.status(400)
      next(err)

   }
}


/*
    @route  api/products/:id
    @desc POST update by ID
    @access private
*/
export const updateProduct = async (req, res, next) => {
   try {
      const { name, description, category, image, countInStock, price } = req.body
      const reqData = {
         name: name,
         description: description,
         category: category,
         price: price,
         image: image,
         countInStock: countInStock
      }

      const updatedProductData = await Product.findByIdAndUpdate(req.params.id, reqData, { new: true })
      if (updatedProductData) {
         return res.status(201).json({
            success: true,
            data: updatedProductData
         })
      } else {
         res.status(401)
         throw Error('update not done correctly')
      }
   } catch (err) {
      res.status(401)
      next(err)
   }
}


/*
    @route  api/products/:id/reviews
    @desc POST 
    @access private
*/

export const createProductReview = async (req, res, next) => {
   try {
      const { rating, comment, name } = req.body
      const review = {
         name: req.user.name,
         comment: comment,
         rating: Number(rating),
         product_id: req.params.id
      }
      const product = await Product.findById(req.params.id)
      if (product) {
         const reviewData = await Reviews.create(review)
         // const reviewsData = await Reviews.findById(req.params.id)
         if (reviewData) {
            // const reviewsData = await Reviews.aggregate([
            //    {
            //       $match: {product_id: mongoose.Types.ObjectId(req.params.id)}
            //    },
            //    {
            //       $group: {
            //          _id: "$product_id",
            //          "reviewArr": { $push: "$rating"}
            //       }
            //    }, 
            //    {
            //       $project: {
            //          _id: "$_id",
            //          "reviewResult": {
            //             $reduce: {
            //                input: "$reviewArr",
            //                initialValue: 0,
            //                in: {$sum: ["$$value", "$$this"]}
            //             }
            //          }
            //       }
            //    }
            // ])
            const reviewsData = await Reviews.aggregate()
               .match({ product_id: product._id.toString() })
               .group({ _id: "$product_id", "reviewArr": { $push: "$rating" } })
               .project({
                  // "countedData": {$count: "$product_id"},
                  "reviewResult": {
                     $reduce: {
                        input: "$reviewArr",
                        initialValue: 0,
                        in: { $sum: ["$$value", "$$this"] }
                     }
                  }
               })
            product.numReviews = await Reviews.countDocuments({ product_id: req.params.id })
            product.rating = (Number(reviewsData[0].reviewResult) / Number(product.numReviews)).toFixed(1)
            const newReviewedProduct = await Product.findByIdAndUpdate(product._id, product, { new: true })
            if (newReviewedProduct) {
               res.status(201).json({
                  message: 'Review added',
                  data: product,
                  reviewData: reviewData
               })

            } else {
               res.status(401)
               throw new Error('Product Review not added')
            }
         }
         // product.rating = (
         //    reviewsData.reduce((acc, rData) => rData.rating + acc, 0) / 
         //    product.numReviews 
         // )
      } else {
         res.status(404)
         throw new Error('Product not found')
      }
   } catch (err) {
      console.log(err)
      res.status(401).json({
         msg: err.message
      })
   }
}


/*
    @route  api/products/top
    @desc get the top rated product list 
    @access public
*/

export const getTopProduts = async (req, res, next) => {
   try {
      const topProducts = await Product.find({}).sort({ rating: -1 }).limit(5)
      res.status(201).json({
         success: true,
         count: topProducts.length,
         data: topProducts
      })
   } catch (err) {
      res.status(401)
      next(err)
   }

}
