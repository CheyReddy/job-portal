import * as yup from 'yup'

export const jobseekerProfileSchema = yup.object({
  fullName: yup.string().required("Full Name is required"),
  phone: yup.string().required("Phone is required"),
  location: yup.string().required("Location is required"),
  skills: yup.string().required("Skills is required"),
  experience: yup.number().required("Experience is required"),
  education: yup.string().required("Education is required"),
  resumeUrl: yup.string().required("Resume is required"),
})
