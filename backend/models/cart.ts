import mongoose, { Schema } from "mongoose";

const cartSchema = new Schema({
  puzzles: [{puzzle: {type: mongoose.Schema.Types.ObjectId, ref: "Puzzle"} , quantity: Number}],
  valamiId: String,
  userId: {type: mongoose.Schema.Types.ObjectId, ref: "User"}
})

export const Cart = mongoose.model('Cart', cartSchema)