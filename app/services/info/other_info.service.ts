import api from "../../api/axios";

export const Other_infoService = {
  async getDocumentTypes() {
    return api.get("/api/juvenile/juveniles/passport_types/");
  },
  async getSchoolTypes() {
    return api.get("/api/juvenile/juveniles/school_types/");
  },
  async getMaritalStatuses() {
    return api.get("/api/juvenile/juveniles/marital_statuses/");
  },
  async getParentTypes() {
    return api.get("/api/juvenile/juveniles/parent_types/");
  },
  async getCountriesList() {
    return api.get('api/info/countries/');
  },
};
