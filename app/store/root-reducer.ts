import { combineReducers } from "redux";
import { regionsSlice } from "./regions/regions.slice";
import { authSlice } from "./auth/auth.slice";
import { userSlice } from "./user/user.slice";

export const rootReducer = combineReducers({
  regions: regionsSlice.reducer,
  auth: authSlice.reducer,
  user: userSlice.reducer,
});
