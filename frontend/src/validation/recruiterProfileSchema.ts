import * as yup from "yup";

export const recruiterProfileSchema = yup.object({
  companyName: yup.string().required("Company name is required"),
  companyWebsite: yup.string()
    // .url("Invalid URL")
    .required("Website is required"),
  companyLocation: yup.string().required("Location is required"),
  industryType: yup.string().required("Industry type is required")
});
