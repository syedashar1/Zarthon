import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    status : {type : String , default : 'in Queue'},
    gig : { type: String, required: true },
    gigOwner : { type: String, required: true },
    placedBy : { type: String, required: true },
    details : { type: String, required: true },

    title: { type: String, required: true },
    qty: { type: Number, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    servicePrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },

  },
  {
    timestamps: true,
  }
);
const Order = mongoose.model('Order', orderSchema);
export default Order;