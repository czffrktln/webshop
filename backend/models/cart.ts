import mongoose, { Schema } from "mongoose";

const cartSchema = new Schema({
  puzzles: [{puzzle_id: String , quantity: Number}],
  // puzzles: [{puzzle: {type: mongoose.Schema.Types.ObjectId, ref: "Puzzle"} , quantity: Number}],
  session_id: String,
  user_id: {type: mongoose.Schema.Types.ObjectId, ref: "User"}
})

export const Cart = mongoose.model('Cart', cartSchema)