import api from "../api/axios";

export const getUsers = async (page: number = 0, search: string = "") => {
  return await api.get(`/admin/users?page=${page}&search=${search}`);
}

export const enableUser = async (id: number) => {
  return await api.put(`/admin/users/${id}/enable`);
}

export const disableUser = async (id: number) => {
  return await api.put(`/admin/users/${id}/disable`);
}
