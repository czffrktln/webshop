import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema(
  {
    // cart: { type: mongoose.Schema.Types.ObjectId, ref: "Cart" },
    cart: {
      puzzles: [
        {
          puzzle: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Puzzle",
            required: true,
          },
          quantity: { type: Number, required: true },
        },
      ],
      session_id: String,
      user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },

    contacts: {
      zip_code: String,
      city: String,
      street_address: String,
      phone: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Order = mongoose.model("Order", orderSchema);
