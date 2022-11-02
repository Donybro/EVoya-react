import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthService } from "../../services/auth/auth.service";
import { IAuth } from "../../components/Auth/auth.interface";

export const auth = createAsyncThunk(
  "auth/auth",
  async (thunkAPI, data: IAuth) => {
    const response = await AuthService.auth(data);
    return response.data;
  }
);
