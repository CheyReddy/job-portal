import { useEffect, useState } from "react";
import { getPendingRecruiters, approveRecruiter, rejectRecruiter } from "../service/adminService";
import { toast } from "react-toastify";
import type { RecruiterFormValues } from "../typevalues/FormValues";
import DashboardLayout from "../dashboard/DashboardLayout";

const PendingRecruiters = () => {
  const [recruiters, setRecruiters] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRecruiters = async () => {
    try {
      setLoading(true);
      const res = await getPendingRecruiters();
      setRecruiters(res.data);
    } catch (err) {
      toast.error("Failed to load recruiters");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecruiters();
  }, []);

  const handleApprove = async (id: number) => {
    try {
      await approveRecruiter(id);
      toast.success("Recruiter approved");
      fetchRecruiters();
    } catch {
      toast.error("Approval failed");
    }
  };

  const handleReject = async (id: number) => {
    try {
      await rejectRecruiter(id);
      toast.success("Recruiter rejected");
      fetchRecruiters();
    } catch {
      toast.error("Rejection failed");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">
          Pending Recruiter Approvals
        </h2>

        {recruiters.length === 0 ? (
          <p>No pending recruiters</p>
        ) : (
          <div className="grid gap-4">
            {recruiters.map((rec: RecruiterFormValues) => (
              <div
                key={rec.id}
                className="bg-white p-4 rounded-lg shadow flex justify-between items-center"
              >
                <div>
                  <p className="font-medium">{rec.companyName}</p>
                  <p className="text-sm text-gray-500">
                    {rec.industryType} • {rec.companyLocation}
                  </p>
                  <a
                    href={rec.companyWebsite}
                    className="text-blue-600 text-sm"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {rec.companyWebsite}
                  </a>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleApprove(rec.id)}
                    className="px-4 py-1 bg-green-600 text-white rounded"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => handleReject(rec.id)}
                    className="px-4 py-1 bg-red-600 text-white rounded"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default PendingRecruiters;
