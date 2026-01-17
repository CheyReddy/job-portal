import api from "../api/axios";
import { type LoginFormValues } from "../typevalues/FormValues";

export const login = async (data: LoginFormValues) => {
  const response = await api.post("/auth/login", data);
  return response.data;
}
