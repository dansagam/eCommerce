import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
   {
      user: {
         type: mongoose.Schema.Types.ObjectId,
         required: true,
         ref: 'User'

      },
      cart: {
         type: mongoose.Schema.Types.ObjectId,
         required: true,
         ref: 'Cart'
      },
      orderItems: [
         {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'CartItem'
         }
      ],
      paymentMethod: {
         type: String,
         enum: ['Paypal', 'FlutterWave', 'Stripe', 'On Delivery'],
         required: true,
         default: 'On Delivery',

      },
      shippingAddress: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'ShippingAddress'
      },
      isDelivered: {
         type: Boolean,
         required: true,
         default: false
      },
      deliveredAt: {
         type: Date
      },
      paymentResult: {
         id: { type: String },
         status: { type: String },
         update_time: { type: String },
         email_address: { type: String }
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
const Order = mongoose.model('Order', orderSchema)
export default Order;
