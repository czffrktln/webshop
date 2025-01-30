import mongoose, { Schema } from "mongoose";

const puzzleSchema = new Schema(
  {
    brand: String,
    title: String,
    pieces: String,
    serial_number: String,
    price: String,
    size: String,
    available: Boolean,
    image_link: String,
    category: [],
    rating: String,
    review: String
  }
)

export const Puzzle = mongoose.model('Puzzle', puzzleSchema)