import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SnackbarState } from "../../components/SnackBarComponent";

const initialState: SnackbarState = {
    open: false,
    vertical: "top",
    horizontal: "center",
    message: "",
};

const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    setSnackbar(state, action: PayloadAction<Partial<SnackbarState>>) {
      return {...state, ...action.payload};
    },
  },
});

export const { setSnackbar } = snackbarSlice.actions;
export default snackbarSlice.reducer;
