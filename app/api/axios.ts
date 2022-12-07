import axios from "axios";

const api = axios.create({
  // baseURL: "http://192.168.1.115:8000",
  baseURL: "https://evoya.technocorp.uz/",
  withCredentials: true,
});

export default api;
