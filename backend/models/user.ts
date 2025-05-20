import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  email: {type: String, required: true},
  name: String,
  sub: String,
  picture: String,
  given_name: String,
  password: String,
  orders: [{type: mongoose.Schema.Types.ObjectId, ref: "Order"}],
}, {
  timestamps: true
})

export const User = mongoose.model('User', userSchema)
