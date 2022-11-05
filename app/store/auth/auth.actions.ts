import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthService } from "../../services/auth/auth.service";
import { IAuth } from "../../components/Auth/auth.interface";
import { me } from "../user/user.actions";

export const auth = createAsyncThunk(
  "auth/auth",
  async (data: IAuth, thunkAPI) => {
    try {
      const {
        data: { Success },
      } = await AuthService.auth(data);
      if (Success) {
        await thunkAPI.dispatch(me());
      }
    } catch (e) {
      return thunkAPI.rejectWithValue("Auth Something get wrong");
    }
  }
);
export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    const { data } = await AuthService.logout();
  } catch (e) {
    return thunkAPI.rejectWithValue("Auth Something get wrong");
  }
});
