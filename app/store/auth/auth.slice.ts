import { createSlice } from "@reduxjs/toolkit";

export interface IUser {}
const initialState: IUser = {};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: {},
});
export const {} = authSlice.actions;

export default authSlice.reducer;
