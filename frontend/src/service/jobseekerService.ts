import api from "../api/axios";
import type { JobSeekerProfileFormValues } from "../typevalues/FormValues";


export const saveProfile = async (data: JobSeekerProfileFormValues) => {
  return await api.post("/jobseeker/profile", data);
};

export const getProfile = () => {
  return api.get("/jobseeker/profile");
}

export const getJobsForJobSeeker = async (
  page = 0,
  search = ""
) => {
  return api.get("/jobseeker/jobs", {
    params: { page, search },
  });
};

export const applyJob = async (jobId: number) => {
  return api.post(`/jobseeker/jobs/${jobId}/apply`);
};

export const getJobDetails = async (jobId: number) => {
  return api.get(`/jobseeker/jobs/${jobId}`);
};

export const getMyApplications = (page = 0) => {
  return api.get(`/jobseeker/applications?page=${page}`);
};
