import api from "../api/axios";

export interface GetMyJobsParams {
  page?: number;
  size?: number;
  search?: string;
}

import type { RecruiterFormValues } from "../typevalues/FormValues";

export const saveRecruiterProfile = async (data: RecruiterFormValues) => {
  return await api.post("/recruiter/profile", data);
};

export const getRecruiterProfile = () => {
  return api.get("/recruiter/profile");
}

export const getMyJobs = async ({ page = 0, size = 10, search = '' }: GetMyJobsParams) => {
  const res = await api.get("/recruiter/jobs", {
    params: { search, page, size },
  });
  return res.data;
}

export const enableJob = async (jobId: number) => {
  return await api.patch(`/recruiter/jobs/${jobId}/enable`);
}

export const disableJob = async (jobId: number) => {
  return await api.patch(`/recruiter/jobs/${jobId}/disable`);
}

export const getApplicants = async ({page=0}) => {
  const res = await api.get(`/recruiter/jobs/${jobId}/applicants`, {
    params: { page },
  });
  return res.data;
};

export const updateApplicationStatus = (
  applicationId: number,
  status: string
) => {
  return api.put(`/recruiter/applicants/${applicationId}/status?status=${status}`);
};
