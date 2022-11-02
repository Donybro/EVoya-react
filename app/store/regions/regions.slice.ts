import { createSlice } from "@reduxjs/toolkit";
import { fetchRegionsList } from "./regions.actions";

export interface IRegion {
  id: string;
  created_at: Date;
  updated_at: Date;
  name: string;
  soato: string;
  mvd_profilactic_region_id: number;
}

export interface RegionState {
  regionsList: IRegion[];
  isLoading: Boolean;
}

const initialState: RegionState = {
  regionsList: [],
  isLoading: false,
};

export const regionsSlice = createSlice({
  name: "regions",
  initialState,
  reducers: {
    // setRegionsList: (state, action: PayloadAction<IRegion[]>) => {
    //     state.regionsList = action.payload
    // },
  },
  extraReducers: {
    [fetchRegionsList.fulfilled]: (state, action) => {
      state.regionsList = action.payload;
    },
  },
});

export const {} = regionsSlice.actions;

export default regionsSlice.reducer;
