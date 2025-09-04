import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getNumberOfItems, getTotalAmount } from "../../utils/cart";
import { CartItemType } from "../../types";

const initialState = {
  total: 0,
  numberOfItems: 0,
};

const cartTotalsSlice = createSlice({
  name: "cartTotals",
  initialState,
  reducers: {
    setCartTotals(state, action: PayloadAction<CartItemType[]>) {
      return {
        ...state,
        total: getTotalAmount(action.payload),
        numberOfItems: getNumberOfItems(action.payload),
      };
    },
  },
});

export const { setCartTotals } = cartTotalsSlice.actions;
export default cartTotalsSlice.reducer;
