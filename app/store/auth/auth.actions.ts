import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthService } from "../../services/auth/auth.service";
import { IAuth } from "../../components/Auth/auth.interface";

export const auth = createAsyncThunk(
  "auth/auth",
  async (data: IAuth, thunkAPI) => {
    const {
      data: { Success },
    } = await AuthService.auth(data);
    if (Success) {
      await thunkAPI.dispatch(me());
    }
  }
);
export const me = createAsyncThunk("auth/me", async (thunkAPI) => {
  const resp = await AuthService.me();
  return resp?.data;
});
