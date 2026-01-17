import DashboardLayout from "./DashboardLayout"
import StatCard from "../component/StatCard"
import RecruiterApprovalTable from "../component/RecruiterApprovalTable"
import { useEffect, useState } from "react"
import { getAdminStats } from "../service/adminDashboard";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import PendingRecruiters from "../component/PendingRecruiters";

interface AdminStats {
  totalUsers: number;
  totalRecruiters: number;
  pendingRecruiters: number;
  totalJobs: number;
  jobsPerMonth: Record<string, number>;
}


function AdminDashboard() {

  const [stats, setStats] = useState<AdminStats | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await getAdminStats();
        setStats(res.data);
      } catch (error) {
        console.error("Failed to load admin stats", error);
      }
    };

    fetchStats();
  }, []);


  if (!stats) return <p>Loading...</p>;

  const chartData = Object.entries(stats.jobsPerMonth).map(
    ([month, count]) => ({ month, count })
  );

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-semibold mb-6">Admin Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard title="Users" value={stats.totalUsers} />
        <StatCard title="Recruiters" value={stats.totalRecruiters} />
        <StatCard title="Pending Approvals" value={stats.pendingRecruiters} />
        <StatCard title="Jobs" value={stats.totalJobs} />
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h3 className="mb-2 font-semibold">Jobs per Month</h3>
        <BarChart width={600} height={300} data={chartData}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" />
        </BarChart>
      </div>
      <PendingRecruiters />
    </DashboardLayout>
  )
}

export default AdminDashboard
