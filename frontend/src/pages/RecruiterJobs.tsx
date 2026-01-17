import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { useDebounce } from "../hooks/useDebounce";
import { getMyJobs, enableJob, disableJob } from '../service/recruiterService'
import DashboardLayout from "../dashboard/DashboardLayout";

interface Job {
  id: number;
  title: string;
  description: string;
  experience: number;
  location: string;
  jobType: string;
  active: boolean;
  createdAt: string;
  salary: number;
  recruiterProfile: object;
}

const PAGE_SIZE = 10;

function RecruiterJobs() {

  const [jobs, setJobs] = useState<Job[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    setPage(0);
  }, [debouncedSearch]);

  useEffect(() => {
    fetchJobs();
  }, [page, debouncedSearch]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await getMyJobs({
        search: debouncedSearch,
        page, size: PAGE_SIZE,
      });

      setJobs(response.content);
      setTotalPages(response.totalPages);
    } catch (error) {
      toast.error("Failed to load jobs");
    } finally {
      setLoading(false);
    }
  }

  const toggleJobStatus = async (job: Job) => {
    try {
      if (job.active) {
        await disableJob(job.id);
      } else {
        await enableJob(job.id);
      }

      setJobs((prev) =>
        prev.map((j) =>
          j.id === job.id ? { ...j, active: !j.active } : j
        )
      );

      toast.success("Status updated");
    } catch {
      toast.error("Action failed");
    }
  };

  const pages = useMemo(
    () => Array.from({ length: totalPages }, (_, i) => i),
    [totalPages]
  );

  return (
    <DashboardLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">My Jobs</h2>

          <input
            type="text"
            placeholder="Search jobs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-3 py-2 rounded w-64"
          />
        </div>

        {/* Table */}
        <div className="bg-white shadow rounded">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-3">Title</th>
                <th className="text-left p-3">Location</th>
                <th className="text-left p-3">Type</th>
                <th className="text-left p-3">Status</th>
                <th className="text-right p-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="p-6 text-center">
                    Loading...
                  </td>
                </tr>
              ) : jobs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-6 text-center">
                    No jobs found
                  </td>
                </tr>
              ) : (
                jobs.map((job) => (
                  <tr key={job.id} className="border-t">
                    <td className="p-3">{job.title}</td>
                    <td className="p-3">{job.location}</td>
                    <td className="p-3">{job.jobType}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded text-xs ${job.active
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                          }`}
                      >
                        {job.active ? "Active" : "Disabled"}
                      </span>
                    </td>
                    <td className="p-3 text-right space-x-2">
                      <button
                        onClick={() => toggleJobStatus(job)}
                        className={`px-3 py-1 rounded text-white ${job.active
                          ? "bg-red-600 hover:bg-red-700"
                          : "bg-green-600 hover:bg-green-700"
                          }`}
                      >
                        {job.active ? "Disable" : "Enable"}
                      </button>

                      <button
                        className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
                        onClick={() => {
                          // navigate(`/recruiter/jobs/edit/${job.id}`)
                        }}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-4">
            {pages.map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`px-3 py-1 rounded ${p === page
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
                  }`}
              >
                {p + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

export default RecruiterJobs

