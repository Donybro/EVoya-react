import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthService } from "../../services/auth/auth.service";
import { setUserAuthorization } from "../auth/auth.slice";

export const me = createAsyncThunk("user/me", async (_, thunkAPI) => {
  try {
    const resp = await AuthService.me();
    if (resp?.data) {
      thunkAPI.dispatch(setUserAuthorization(true));
      return resp?.data;
    } else {
      throw new Error();
    }
  } catch (e) {
    return thunkAPI.rejectWithValue("Error when taking User");
  }
});
