import api from "../../api/axios";

export const RegionsService = {
  async getRegionsList() {
    return api.get("/api/info/regions/");
  },
  async getDistrictsListByRegionId(regionId: string) {
    return api.get("/api/info/districts/ByRegionId/", {
      params: {
        region: regionId,
      },
    });
  },
};
