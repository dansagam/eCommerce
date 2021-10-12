import mongoose from 'mongoose';

const cartSchema = mongoose.Schema(
   {
      user: {
         type: mongoose.Schema.Types.ObjectId,
         required: true,
         ref: 'User'
      },
      cartItems: [
         {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'CartItem'
         }
      ],
      paymentMethod: {
         type: String,
         enum: ['cash', 'online', 'bank'],
         required: true,
         default: 'online',

      },
      status: {
         type: String,
         enum: ["active", "inactive"],
         required: true,
         default: "active"
      },
      shippingAddress: {
         address: {type: String},
         city: {type: String, required: true},
         postalCode: {type: String, required: false},
         country: { type: String, required: true}
      },
      paymentResult: {
         id: {type: String},
         status:{type: String},
         update_time: {type: String},
         email_address:{type: String}
      },
      taxPrice: {
         type: Number,
         required: true,
         default: 0.0
      },
      shippingPrice: {
         type: Number,
         required: true,
         default: 0.0
      },
      totalPrice: {
         type: Number,
         required: true,
         default: 0.0
      },
      isPaid: {
         type: Boolean,
         required: true,
         default: false
      },
      paidAt: {
         type: Date
      },
   },
   {
      timestamps: true,
   }
);


const Cart = mongoose.model('Cart', cartSchema);
export default Cart
