import api from "../../api/axios";

export const RegionsService = {
    async getRegionsList(){
        return api.get('/api/info/regions/')
    }
}