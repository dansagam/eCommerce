import mongoose from 'mongoose';

const shippingAddressSchema = new mongoose.Schema(
   {
      name: {
         firstName:{
            type: String,
            required: true,
         },
         lastName: {
            type: String,
            required: true
         }
      },
      phoneNumber: {
         type: Number,
         required: true
      },
      address: {
         state: {
            type: String,
            required: true
         },
         country: {
            type: String,
            required: true
         },
         city: {
            type: String,
            required: true
         },
         address: {
            type: String,
            required: true
         },
         postalCode: {
            type: String,
            required: false
         }
      }
   },
  {
    timestamps: true,
  }
);

const ShippingAddress = mongoose.model('ShippingAddress', shippingAddressSchema);
export default ShippingAddress
