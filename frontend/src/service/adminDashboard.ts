import api from "../api/axios";

export const getAdminStats = async() => {
  return await api.get("/admin/dashboard/stats");
}
