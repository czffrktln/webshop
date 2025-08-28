import { configureStore } from "@reduxjs/toolkit";
import pageReducer from "./features/pageSlice";
import snackbarReducer from "./features/snackbarSlice";
import searchValueReducer from "./features/searchValueSlice";
import userReducer from "./features/userSlice";
import cartReducer from "./features/cartSlice"
import cartTotalsReducer from './features/cartTotalsSlice'

const store = configureStore({
  reducer: {
    page: pageReducer,
    snackbar: snackbarReducer,
    searchValue: searchValueReducer,
    user: userReducer,
    cart: cartReducer,
    cartTotals: cartTotalsReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
