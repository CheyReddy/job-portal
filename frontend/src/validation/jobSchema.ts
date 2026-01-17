import * as yup from 'yup'

export const jobSchema = yup.object({
  title: yup.string().required("Job title is required"),
  description: yup.string().required("Job description is required"),
  location: yup.string().required("Location is required"),
  jobType: yup.string().required("Select job type"),
  experience: yup.number().min(0).required("Experience is required"),
  salary: yup.number().min(0).required("Salary is required"),
})
