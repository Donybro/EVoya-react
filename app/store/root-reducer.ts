import {combineReducers} from "redux";
import {regionsSlice} from "./regions/regions.slice";

export const rootReducer = combineReducers({
    regions : regionsSlice.reducer
})