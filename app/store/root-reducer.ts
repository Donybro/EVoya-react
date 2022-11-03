import { combineReducers } from "redux";
import { regionsSlice } from "./regions/regions.slice";
import { authSlice } from "./auth/auth.slice";

export const rootReducer = combineReducers({
  regions: regionsSlice.reducer,
  auth: authSlice.reducer,
});
