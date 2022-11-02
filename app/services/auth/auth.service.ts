import api from "../../api/axios";
import { IAuth } from "../../components/Auth/auth.interface";

export const AuthService = {
  async auth(data: IAuth) {
    await api.post("/auth/login/", data);
  },
};
