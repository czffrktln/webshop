import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema({
  cart: {type: mongoose.Schema.Types.ObjectId, ref: "Cart"},
  user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
  contacts: [{zip_code: String, city: String, street_address: String, phone: String }],
})

export const Order = mongoose.model('Order', orderSchema)