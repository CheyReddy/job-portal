import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getApplicants,
  updateApplicationStatus,
} from "../service/recruiterService";
import DashboardLayout from "../dashboard/DashboardLayout";

interface Applicant {
  applicationId: number;
  applicantName: string;
  applicantEmail: string;
  appliedAt: string;
  status: "APPLIED" | "SHORTLISTED" | "REJECTED";
  resumeUrl: string;
}

const RecruiterApplicants = () => {
  const { jobId } = useParams<{ jobId: string }>();

  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (jobId) fetchApplicants();
  }, [jobId, page]);

  const fetchApplicants = async () => {
    try {
      setLoading(true);
      const res = await getApplicants(Number(jobId), page);

      setApplicants(res.data.content);
      setTotalPages(res.data.totalPages);
    } catch {
      toast.error("Failed to load applicants");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (
    applicationId: number,
    status: "SHORTLISTED" | "REJECTED"
  ) => {
    try {
      await updateApplicationStatus(applicationId, status);

      setApplicants((prev) =>
        prev.map((a) =>
          a.applicationId === applicationId ? { ...a, status } : a
        )
      );

      toast.success("Status updated");
    } catch {
      toast.error("Failed to update status");
    }
  };

  const pages = useMemo(
    () => Array.from({ length: totalPages }, (_, i) => i),
    [totalPages]
  );

  return (
    <DashboardLayout>
      <div className="p-6 max-w-6xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Applicants</h2>

        <div className="bg-white shadow rounded">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-3">Name</th>
                <th className="text-left p-3">Email</th>
                <th className="text-left p-3">Resume</th>
                <th className="text-left p-3">Applied On</th>
                <th className="text-left p-3">Status</th>
                <th className="text-right p-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="p-6 text-center">
                    Loading...
                  </td>
                </tr>
              ) : applicants.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-6 text-center">
                    No applicants found
                  </td>
                </tr>
              ) : (
                applicants.map((a) => (
                  <tr key={a.applicationId} className="border-t">
                    <td className="p-3">{a.applicantName}</td>
                    <td className="p-3">{a.applicantEmail}</td>

                    <td className="p-3">
                      <a
                        href={a.resumeUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-indigo-600 underline"
                      >
                        View Resume
                      </a>
                    </td>

                    <td className="p-3">
                      {new Date(a.appliedAt).toLocaleDateString()}
                    </td>

                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          a.status === "SHORTLISTED"
                            ? "bg-green-100 text-green-700"
                            : a.status === "REJECTED"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {a.status}
                      </span>
                    </td>

                    <td className="p-3 text-right space-x-2">
                      {a.status === "APPLIED" && (
                        <>
                          <button
                            onClick={() =>
                              updateStatus(a.applicationId, "SHORTLISTED")
                            }
                            className="px-3 py-1 bg-green-600 text-white rounded"
                          >
                            Shortlist
                          </button>
                          <button
                            onClick={() =>
                              updateStatus(a.applicationId, "REJECTED")
                            }
                            className="px-3 py-1 bg-red-600 text-white rounded"
                          >
                            Reject
                          </button>
                        </>
                      )}
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
                className={`px-3 py-1 rounded ${
                  p === page
                    ? "bg-indigo-600 text-white"
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
  );
};

export default RecruiterApplicants;
