import api from "../api/axios";

export const getJobs = async (page: number = 0, search: string = "") => {
  return await api.get(`/admin/jobs?page=${page}&search=${search}`);
}

export const enableJob = async (id: number) => {
  return await api.put(`/admin/jobs/${id}/enable`);
}

export const disableJob = async (id: number) => {
  return await api.put(`/admin/jobs/${id}/disable`)
}
