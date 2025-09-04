import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItemType, PuzzleType } from "../../types";
import { checkCookie } from "../../utils/cookies";

const initialState: CartItemType[] = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart(state, action: PayloadAction<CartItemType[]>) {
      return (state = action.payload);
    },

    clearCart() {
      return initialState;
    },

    addToCart(state, action: PayloadAction<PuzzleType>) {
      checkCookie();
      const puzzleIndex = state.findIndex(
        (item) => item.puzzle._id === action.payload._id
      );
      if (puzzleIndex === -1) {
        return [...state, { puzzle: action.payload, quantity: 1 }];
      } else {
        const newCart = [...state];
        newCart[puzzleIndex] = {
          ...newCart[puzzleIndex],
          quantity: newCart[puzzleIndex].quantity + 1,
        };
        return (state = newCart);
      }
    },

    removeItem(state, action: PayloadAction<string>) {
      const newCart = state.filter(
        (puzzle) => puzzle.puzzle._id !== action.payload
      );
      return (state = newCart);
    },

    increaseAmount(state, action: PayloadAction<CartItemType>) {
      const puzzleIndex = state.findIndex(
        (item) => item.puzzle._id === action.payload.puzzle._id
      );

      if (puzzleIndex === -1) {
        return;
      } else {
        const newCart = [...state];
        newCart[puzzleIndex] = {
          ...newCart[puzzleIndex],
          quantity: newCart[puzzleIndex].quantity + 1,
        };
        return (state = newCart);
      }
    },

    decreaseAmount(state, action: PayloadAction<CartItemType>) {
      const puzzleIndex = state.findIndex(
        (item) => item.puzzle._id === action.payload.puzzle._id
      );

      if (puzzleIndex === -1) {
        return;
      } else if (action.payload.quantity === 1) {
        return state.filter((_, index) => index !== puzzleIndex);
      } else {
        const newCart = [...state];
        newCart[puzzleIndex] = {
          ...newCart[puzzleIndex],
          quantity: newCart[puzzleIndex].quantity - 1,
        };
        return (state = newCart);
      }
    },
  },
});

export const {
  setCart,
  clearCart,
  addToCart,
  removeItem,
  increaseAmount,
  decreaseAmount,
} = cartSlice.actions;
export default cartSlice.reducer;
