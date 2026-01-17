import { useForm, type FieldErrors } from "react-hook-form"
import { type PostJobFormValues } from "../typevalues/FormValues";
import { yupResolver } from "@hookform/resolvers/yup";
import { jobSchema } from "../validation/jobSchema";
import { useEffect } from "react";
import { toast } from 'react-toastify'
import DashboardLayout from "../dashboard/DashboardLayout";
import { postJob } from "../service/jobService";
import { useNavigate } from "react-router-dom";

function PostJob() {

  const navigate = useNavigate();

  const form = useForm<PostJobFormValues>({
    resolver: yupResolver(jobSchema),
    mode: 'onTouched',
    reValidateMode: 'onChange'
  });

  const { register, reset, handleSubmit, formState } = form;
  const { errors, isValid, isDirty, isSubmitSuccessful, isSubmitting, submitCount } = formState;

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  useEffect(() => {
    if (submitCount > 3) {
      toast.warn("Still trying? Double-check your details!");
    }
  }, [submitCount]);

  const onSubmit = async (data: PostJobFormValues) => {
    try {
      console.log("Form values: ", data);
      const response = await postJob(data);
      toast.success("Job posted successfully!");
      reset();
    }
    catch (error) {
      console.error(error);
      if (localStorage.getItem("profileCompleted")?.includes("false")) {
        toast.warn("Complete your profile")
        navigate('/recruiter/profile')
      } else {
        toast.error("Unable to post job");
      }
    }
  }

  const onError = (errors: FieldErrors<PostJobFormValues>) => {
    console.error("Errors: ", errors);
  }

  return (
    <DashboardLayout>
      <div className="flex justify-center">
        <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Post a Job</h2>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit, onError)}>
            <div>
              <label htmlFor="title" className="label">Job Title</label>
              <input type="text" className="input" id="title" placeholder="Java Backend Developer" {...register('title')} />
              <p className="error">{errors.title?.message}</p>
            </div>

            <div>
              <label htmlFor="description" className="label">Description</label>
              <textarea id="description" className="input" {...register('description')} rows={4} placeholder="Job responsibilities and requirements" />
              <p className="error">{errors.description?.message}</p>
            </div>

            <div>
              <label htmlFor="location" className="label">Location</label>
              <textarea id="location" className="input" {...register('location')} rows={4} placeholder="Vishakapatnam" />
              <p className="error">{errors.location?.message}</p>
            </div>

            <div>
              <label htmlFor="jobType" className="label">Job Type</label>
              <select {...register('jobType')} className="input">
                <option value="FULL_TIME">Full Time</option>
                <option value="PART_TIME">Part Time</option>
                <option value="INTERNSHIP">Internship</option>
                <option value="CONTRACT">Contract</option>
              </select>
              <p className="error">{errors.jobType?.message}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="experience" className="label">Experience (Years)</label>
                <input
                  type="number"
                  {...register("experience")}
                  id="experience"
                  className="input"
                />
                <p className="error">{errors.experience?.message}</p>
              </div>

              <div>
                <label className="label" htmlFor="salary">Salary (₹)</label>
                <input
                  type="number"
                  {...register("salary")}
                  id="salary"
                  className="input"
                />
                <p className="error">{errors.salary?.message}</p>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              disabled={!isValid || !isDirty}
            >
              {isSubmitting ? "Posting job..." : "Post Job"}
            </button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default PostJob
