import { createSlice } from "@reduxjs/toolkit";
import { me } from "./auth.actions";

export interface IUser {
  isLoading?: Boolean;
  authorized: Boolean;
  full_name_position: String;
  position: String;
  region: String;
  username: String;
}
const initialState: IUser = {
  isLoading: false,
  authorized: false,
  full_name_position: "",
  position: "",
  region: "",
  username: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [me.pending]: (state) => {
      state.isLoading = true;
    },
    [me.fulfilled]: (state, action) => {
      console.log(state);
      console.log(action.payload);
      state = action.payload;
    },
    [me.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});
export const {} = authSlice.actions;

export default authSlice.reducer;
