import { useForm, type FieldErrors } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { saveProfile, getProfile } from "../service/jobseekerService";
import DashboardLayout from "../dashboard/DashboardLayout";
import type { JobSeekerProfileFormValues } from "../typevalues/FormValues";
import { useNavigate } from "react-router-dom";
import { jobseekerProfileSchema } from "../validation/JobSeekerProfileSchema";

const initialValues: JobSeekerProfileFormValues = {
  fullName: '',
  education: '',
  location: '',
  experience: 0,
  phone: '',
  resumeUrl: '',
  skills: ''
}

const JobSeekerProfile = () => {

  const navigate = useNavigate();

  const {
    register,
    handleSubmit, reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(jobseekerProfileSchema),
    defaultValues: initialValues
  });

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    location: "",
    skills: "",
    education: "",
    experience: 0,
    resumeUrl: "",
  });

  useEffect(() => {
    getProfile()
      .then(res => reset(res.data))
      .catch(() => { });
  }, [reset]);

  const onSubmit = async (data: JobSeekerProfileFormValues) => {
    try {
      await saveProfile(data);
      navigate("/jobseeker/profile");
      localStorage.setItem("profileCompleted", "true");
      toast.success("Profile completed successfully");
      navigate("/jobseeker");
    }
    catch (error) {
      toast.error("Failed to save profile");
      console.error(error)
    }
  }

  const onError = (errors: FieldErrors<JobSeekerProfileFormValues>) => {
    console.error("Errors: ", errors);
  }

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto bg-white p-6 shadow rounded">
        <h2 className="text-xl font-semibold mb-4">My Profile</h2>

        <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-4">
          <div>
            <label className="label">Full Name</label>
            <input {...register("fullName")} className="input" placeholder="Full Name" />
            <p className="error">{errors.fullName?.message}</p>
          </div>
          <div>
            <label className="label">Phone</label>
            <input {...register("phone")} className="input" />
            <p className="error">{errors.phone?.message}</p>
          </div>
          <div>
            <label className="label">Location</label>
            <input {...register("location")} className="input" placeholder="Tadipatri" />
            <p className="error">{errors.location?.message}</p>
          </div>
          <div>
            <label className="label">Skills</label>
            <input {...register("skills")} className="input" placeholder="Skills (Java, React, SQL)" />
            <p className="error">{errors.skills?.message}</p>
          </div>
          <div>
            <label className="label">Experience</label>
            <input {...register("experience")} className="input" placeholder="Experience (years)" />
            <p className="error">{errors.experience?.message}</p>
          </div>
          <div>
            <label className="label">Education</label>
            <input {...register("education")} className="input" />
            <p className="error">{errors.education?.message}</p>
          </div>
          <div>
            <label className="label">Resume</label>
            <input {...register("resumeUrl")} className="input" placeholder="Resume URL" />
            <p className="error">{errors.resumeUrl?.message}</p>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Save & Continue
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default JobSeekerProfile;
