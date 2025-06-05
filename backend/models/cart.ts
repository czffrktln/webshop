import mongoose, { Schema } from "mongoose";

const cartSchema = new Schema({
  // puzzles: [{ puzzle_id: String, quantity: Number }],
  puzzles: [
    {
      puzzle: { type: mongoose.Schema.Types.ObjectId, ref: "Puzzle", required: true },
      quantity: {type: Number, required: true},
    },
  ],
  session_id: String,
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  cart_total: Number
}, { timestamps: true });

export const Cart = mongoose.model("Cart", cartSchema);