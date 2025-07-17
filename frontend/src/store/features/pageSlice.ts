import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = 1;

const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      return (state = action.payload);
    },
  },
});

export const { setPage } = pageSlice.actions;
export default pageSlice.reducer;
