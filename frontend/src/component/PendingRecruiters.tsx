import { useEffect, useState } from "react";
import RecruiterApprovalTable from "./RecruiterApprovalTable";
import { approveRecruiter, getPendingRecruiters, rejectRecruiter } from "../service/adminService";
import { toast } from "react-toastify";

const PendingRecruiters = () => {
  const [recruiters, setRecruiters] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRecruiters();
  }, []);

  const fetchRecruiters = async () => {
    try {
      setLoading(true);
      const res = await getPendingRecruiters();
      setRecruiters(res.data);
    } catch {
      toast.error("Failed to load recruiters");
    } finally {
      setLoading(false);
    }
  };

  const onApprove = async (id: number) => {
    try {
      await approveRecruiter(id);
      toast.success("Recruiter approved");
      fetchRecruiters();
    } catch {
      toast.error("Approval failed");
    }
  };

  const onReject = async (id: number) => {
    try {
      await rejectRecruiter(id);
      toast.success("Recruiter rejected");
      fetchRecruiters();
    } catch {
      toast.error("Rejection failed");
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">
        Pending Recruiter Approvals
      </h2>

      <RecruiterApprovalTable
        recruiters={recruiters}
        loading={loading}
        onApprove={onApprove}
        onReject={onReject}
      />
    </div>
  );
};

export default PendingRecruiters;
