import { configureStore } from "@reduxjs/toolkit";
import pageReducer from "./features/pageSlice";
import snackbarReducer from './features/snackbarSlice';
import searchValueReducer from './features/searchValueSlice';

const store = configureStore({
  reducer: {
    page: pageReducer,
    snackbar: snackbarReducer,
    searchValue: searchValueReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
