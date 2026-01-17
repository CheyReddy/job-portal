import api from "../api/axios";
import type { PostJobFormValues } from "../typevalues/FormValues";

export const postJob = async(data:PostJobFormValues) => {
  const response = await api.post("/job", data);
  return response.data;
}
