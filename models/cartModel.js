import mongoose from 'mongoose';

const cartSchema = mongoose.Schema(
   {
      user: {
         type: mongoose.Schema.Types.ObjectId,
         require: true,
         ref: 'User'
      },
      orderItem: [
         {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order'
         }
      ],
      paymentMethod: {
         type: String,
         enum: ['cash', 'online', 'bank'],
         require: true,
         default: 'online',

      },
      shippingAddress: {
         address: {type: String},
         city: {type: String, require: true},
         postalCode: {type: String, require: false},
         country: { type: String, require: true}
      },
      paymentResult: {
         id: {type: String},
         status:{type: String},
         update_time: {type: String},
         email_address:{type: String}
      },
      taxPrice: {
         type: Number,
         require: true,
         default: 0.0
      },
      shippingPrice: {
         type: Number,
         require: true,
         default: 0.0
      },
      totalPrice: {
         type: Number,
         require: true,
         default: 0.0
      },
      isPaid: {
         type: Boolean,
         require: true,
         default: false
      },
      paidAt: {
         type: Date
      },
      isDelivered: {
         type: Boolean,
         require: true,
         default: false
      },
      deliveredAt: {
         type: Date
      }
   },
   {
      timestamps: true,
   }
);


const Cart = mongoose.model('Cart', cartSchema);
export default Cart
