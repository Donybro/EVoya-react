import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { me } from "./user.actions";

export interface IUserState {
  isLoading?: Boolean;
  error?: String;
  user: IUser;
}
export interface IUser {
  full_name_position: String;
  position: String;
  region: String;
  username: String;
}
const initialState: IUserState = {
  isLoading: false,
  error: "",
  user: {
    full_name_position: "",
    position: "",
    region: "",
    username: "",
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    [me.pending.type]: (state: IUserState) => {
      state.isLoading = true;
    },
    [me.fulfilled.type]: (state: IUserState, action: PayloadAction<IUser>) => {
      state.isLoading = false;
      state.user = action.payload;
    },
    [me.rejected.type]: (state: IUserState, action: PayloadAction<String>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});
export const {} = userSlice.actions;

export default userSlice.reducer;
