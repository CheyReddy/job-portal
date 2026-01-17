import { useForm, type FieldErrors } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { recruiterProfileSchema } from "../validation/recruiterProfileSchema";
import { getRecruiterProfile, saveRecruiterProfile } from "../service/recruiterService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../dashboard/DashboardLayout";
import type { RecruiterFormValues } from "../typevalues/FormValues";
import { useEffect } from "react";

const initialValues: RecruiterFormValues = {
  companyName: '',
  companyWebsite: '',
  companyLocation: '',
  industryType: ''
}

export default function RecruiterProfile() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(recruiterProfileSchema),
    defaultValues: initialValues
  });

  useEffect(() => {
    getRecruiterProfile()
      .then(res => reset(res.data))
      .catch(() => {});
  }, [reset]);


  const onSubmit = async (data: RecruiterFormValues) => {
    try {
      await saveRecruiterProfile(data);
      navigate("/recruiter/profile");
      localStorage.setItem("profileCompleted", "true");
      toast.success("Profile completed successfully");

      navigate("/recruiter");
    } catch (error) {
      toast.error("Failed to save profile");
      console.log(error)
    }
  };

  const onError = (errors: FieldErrors<RecruiterFormValues>) => {
    console.error("Errors: ", errors);
  }

  return (
    <DashboardLayout>
      <div className="flex justify-center">
        <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow">

          <h2 className="text-xl font-semibold mb-2">
            Complete Recruiter Profile
          </h2>
          <p className="text-gray-600 mb-6">
            Complete your company details to start posting jobs.
          </p>

          <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-4">

            <div>
              <label className="label">Company Name</label>
              <input {...register("companyName")} className="input" />
              <p className="error">{errors.companyName?.message}</p>
            </div>

            <div>
              <label className="label">Company Website</label>
              <input {...register("companyWebsite")} className="input" />
              <p className="error">{errors.companyWebsite?.message}</p>
            </div>

            <div>
              <label className="label">Company Location</label>
              <input {...register("companyLocation")} className="input" />
              <p className="error">{errors.companyLocation?.message}</p>
            </div>

            <div>
              <label className="label">Industry Type</label>
              <input {...register("industryType")} className="input" />
              <p className="error">{errors.industryType?.message}</p>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Save & Continue
            </button>

          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
