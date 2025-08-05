import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "../../types";

type User = UserType | null;

const initialState = null as User;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserType>) {
      return action.payload;
    },
    clearUser() {
      return initialState;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
