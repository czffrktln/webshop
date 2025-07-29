import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = "";

const searchValueSlice = createSlice({
  name: "searchValue",
  initialState,
  reducers: {
    setSearchValue(state, action: PayloadAction<string>) {
      return (state = action.payload);
    },
  },
});

export const { setSearchValue } = searchValueSlice.actions;
export default searchValueSlice.reducer;
