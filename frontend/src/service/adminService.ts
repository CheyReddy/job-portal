import api from "../api/axios";

export const getPendingRecruiters = async () => {
  return await api.get("/admin/recruiters/pending");
}

export const approveRecruiter = async (id: number) => {
  return await api.put(`/admin/recruiters/${id}/approve`)
}

export const rejectRecruiter = async (id: number) => {
  return await api.delete(`/admin/recruiters/${id}/reject`);
}
