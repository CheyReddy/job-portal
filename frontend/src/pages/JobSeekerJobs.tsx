import { getJobsForJobSeeker } from "../service/jobseekerService";
import { useState, useEffect } from "react";
import DashboardLayout from "../dashboard/DashboardLayout";
import { useNavigate } from "react-router-dom";

interface Job {
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

const JobCard = ({ job }: { job: Job }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h3 className="text-lg font-semibold">{job.title}</h3>
      <p className="text-sm text-gray-500">{job.companyName}</p>

      <div className="flex gap-4 text-sm text-gray-600 mt-2">
        <span>{job.location}</span>
        <span>{job.experience}+ yrs</span>
      </div>

      <button
        onClick={() => navigate(`/jobseeker/jobs/${job.jobId}`)}
        className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
      >
        View
      </button>
    </div >
  )
};

export default function JobSeekerJobs() {

  const [jobs, setJobs] = useState<Job[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    loadJobs();
  }, [page, search]);

  const loadJobs = async () => {
    const res = await getJobsForJobSeeker(page, search);
    setJobs(res.data.content);
    setTotalPages(res.data.totalPages);
  };

  return (
    <DashboardLayout>
      <div className="p-6 max-w-6xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6">Find Jobs</h1>

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search jobs..."
          className="border rounded px-4 py-2 w-full mb-6"
          value={search}
          onChange={(e) => {
            setPage(0);
            setSearch(e.target.value);
          }}
        />

        {/* JOB LIST */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobs.map((job) => (
            <JobCard
              key={job.jobId}
              job={job}
            />
          ))}
        </div>

        {/* PAGINATION */}
        <div className="flex justify-center gap-4 mt-8">
          <button
            disabled={page === 0}
            onClick={() => setPage((p) => p - 1)}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Prev
          </button>

          <span>
            Page {page + 1} of {totalPages}
          </span>

          <button
            disabled={page + 1 >= totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}

