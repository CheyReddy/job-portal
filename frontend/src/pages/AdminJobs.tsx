import { useEffect, useState } from "react";
import { getJobs, disableJob, enableJob } from "../service/adminJobsService";
import { toast } from "react-toastify";
import DashboardLayout from "../dashboard/DashboardLayout";
import { useDebounce } from "../hooks/useDebounce";

const AdminJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const res = await getJobs(page, debouncedSearch);
      setJobs(res.data.content);
      setTotalPages(res.data.totalPages);
    } catch {
      toast.error("Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(0);
  }, [debouncedSearch]);

  useEffect(() => {
    fetchJobs();
  }, [page, debouncedSearch]);

  const toggleJob = async (job) => {
    try {
      if (job.active) {
        await disableJob(job.id);
        toast.success("Job disabled");
      } else {
        await enableJob(job.id);
        toast.success("Job enabled");
      }
      fetchJobs();
    } catch {
      toast.error("Action failed");
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            Jobs Management
          </h2>

          <input
            type="text"
            placeholder="Search by job or company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-3 py-1 rounded w-64"
          />
        </div>


        <table className="w-full bg-white rounded shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Title</th>
              <th className="p-3">Company</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="p-4 text-center">
                  Loading...
                </td>
              </tr>
            ) : (
              jobs.map((job) => (
                <tr key={job.id} className="border-t">
                  <td className="p-3">{job.title}</td>
                  <td className="p-3 text-center">
                    {job.companyName}
                  </td>
                  <td className="p-3 text-center">
                    {job.active ? "Active" : "Disabled"}
                  </td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => toggleJob(job)}
                      className={`flex items-center justify-center gap-1 w-28 px-3 py-1 rounded text-white ${job.active ? "bg-red-600" : "bg-green-600"
                        }`}
                    >
                      {job.active ? "Disable" : "Enable"}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* PAGINATION */}
        <div className="flex justify-center mt-4 gap-2">
          <button
            disabled={page === 0}
            onClick={() => setPage(page - 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setPage(index)}
              className={`px-3 py-1 border rounded ${page === index
                ? "bg-blue-600 text-white"
                : "bg-white"
                }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            disabled={page === totalPages - 1}
            onClick={() => setPage(page + 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminJobs;
