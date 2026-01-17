import { useEffect, useState } from "react";
import DashboardLayout from "../dashboard/DashboardLayout";
import { getMyApplications } from "../service/jobseekerService";
import { useNavigate } from "react-router-dom";

interface Application {
  applicationId: number;
  jobId: number;
  jobTitle: string;
  companyName: string;
  location: string;
  experience: number;
  status: string;
  appliedAt: string;
}

export default function JobSeekerApplications() {
  const navigate = useNavigate();
  const [apps, setApps] = useState<Application[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    loadApplications();
  }, [page]);

  const loadApplications = async () => {
    const res = await getMyApplications(page);
    setApps(res.data.content);
    setTotalPages(res.data.totalPages);
  };

  const statusColor = (status: string) => {
    switch (status) {
      case "APPLIED":
        return "bg-blue-100 text-blue-700";
      case "SHORTLISTED":
        return "bg-yellow-100 text-yellow-700";
      case "REJECTED":
        return "bg-red-100 text-red-700";
      case "HIRED":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-2xl font-semibold mb-6">My Applications</h1>

        {apps.length === 0 ? (
          <p className="text-gray-500">You haven’t applied to any jobs yet.</p>
        ) : (
          <div className="space-y-4">
            {apps.map(app => (
              <div
                key={app.applicationId}
                className="bg-white rounded-xl shadow p-5 flex justify-between items-center"
              >
                <div>
                  <h3 className="text-lg font-semibold">{app.jobTitle}</h3>
                  <p className="text-sm text-gray-500">
                    {app.companyName} • {app.location}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Applied on {new Date(app.appliedAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor(app.status)}`}
                  >
                    {app.status}
                  </span>

                  <button
                    onClick={() =>
                      navigate(`/jobseeker/jobs/${app.jobId}`)
                    }
                    className="text-indigo-600 text-sm hover:underline"
                  >
                    View Job
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* PAGINATION */}
        <div className="flex justify-center gap-4 mt-8">
          <button
            disabled={page === 0}
            onClick={() => setPage(p => p - 1)}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Prev
          </button>

          <span>
            Page {page + 1} of {totalPages}
          </span>

          <button
            disabled={page + 1 >= totalPages}
            onClick={() => setPage(p => p + 1)}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
