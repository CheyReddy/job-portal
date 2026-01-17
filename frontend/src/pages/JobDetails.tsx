import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getJobDetails, applyJob } from "../service/jobseekerService";
import DashboardLayout from "../dashboard/DashboardLayout";
import { toast } from "react-toastify";

interface JobDetails {
  jobId: number;
  title: string;
  description: string;
  experience: number;
  location: string;
  salary: number;
  jobType: string;
  companyName: string;
  companyWebsite: string;
  recruiterName: string;
  enabled: boolean;
  applied: boolean;
}

const JobDetails = () => {

  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<JobDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);

  useEffect(() => {
    const loadJob = async () => {
      try {
        if (!id) return;
        const res = await getJobDetails(parseInt(id, 10));
        setJob(res.data);
      } catch (err) {
        console.error("Failed to load job", err);
      } finally {
        setLoading(false);
      }
    };

    loadJob();
  }, [id]);

  const handleApply = async () => {
    if (!job) return;

    try {
      setApplying(true);
      await applyJob(job.jobId);
      setJob({ ...job, applied: true });
      toast.success("Applied Successfully");
      navigate("/jobseeker/jobs")

    } catch (err) {
      console.error("Apply failed", err);
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return <div className="p-6 text-center">Loading job...</div>;
  }

  if (!job) {
    return <div className="p-6 text-center text-red-500">Job not found</div>;
  }

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto p-6 bg-white rounded-xl shadow">
        <div className="border-b pb-4">
          <h1 className="text-3xl font-semibold">{job.title}</h1>
          <p className="text-gray-600 mt-1">{job.companyName}</p>

          <div className="flex flex-wrap gap-4 text-sm text-gray-500 mt-2">
            <span>📍 {job.location}</span>
            <span>💼 {job.experience}+ yrs</span>
            <span>💰 ₹{job.salary}</span>
            <span>🧾 {job.jobType}</span>
          </div>
        </div>

        {/* APPLY */}
        <div className="mt-6">
          {job.applied ? (
            <button
              disabled
              className="bg-gray-400 text-white px-6 py-2 rounded"
            >
              Applied
            </button>
          ) : !job.enabled ? (
            <button
              disabled
              className="bg-red-500 text-white px-6 py-2 rounded"
            >
              Job Closed
            </button>
          ) : (
            <button
              onClick={handleApply}
              disabled={applying}
              className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
            >
              {applying ? "Applying..." : "Apply Now"}
            </button>
          )

            //   (
            //   <button
            //     onClick={handleApply}
            //     disabled={applying}
            //     className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
            //   >
            //     {applying ? "Applying..." : "Apply Now"}
            //   </button>
            // )
          }
        </div>

        {/* DESCRIPTION */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-2">Job Description</h2>
          <p className="text-gray-700 whitespace-pre-line">
            {job.description}
          </p>
        </div>

        {/* COMPANY */}
        {job.companyWebsite && (
          <div className="mt-6">
            <a
              href={job.companyWebsite}
              target="_blank"
              rel="noreferrer"
              className="text-indigo-600 underline"
            >
              Visit Company Website
            </a>
          </div>
        )}

        <div className="mt-6 text-sm">
          <span
            className={`px-3 py-1 rounded-full ${job.enabled
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
              }`}
          >
            {job.enabled ? "Open for Applications" : "Closed"}
          </span>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default JobDetails;
