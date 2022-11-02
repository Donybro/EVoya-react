import {createAsyncThunk} from "@reduxjs/toolkit";
import {RegionsService} from "../../services/regions/regions.service";

export const fetchRegionsList = createAsyncThunk(
    'regions/fetchRegionsList',
    async ( thunkAPI) => {
        const response = await RegionsService.getRegionsList()
        return response.data
    }
) 