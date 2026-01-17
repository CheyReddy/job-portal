import DashboardLayout from "./DashboardLayout"
import { useEffect, useState } from "react";
import api from "../api/axios";


interface DashboardStats {
  applied: number;
  shortlisted: number;
  rejected: number;
  hired: number;
  profileCompletion: number;
}

interface StatCardProps {
  label: string;
  value: number;
}

interface ProfileCompletionProps {
  value: number;
}

const StatCard = ({ label, value }: StatCardProps) => (
  <div className="bg-white rounded-xl shadow p-6 text-center">
    <p className="text-sm text-gray-500">{label}</p>
    <p className="text-3xl font-bold text-indigo-600 mt-2">
      {value}
    </p>
  </div>
)

const ProfileCompletion = ({ value }: ProfileCompletionProps) => {
  const barColor =
    value < 50
      ? "bg-red-500"
      : value < 80
        ? "bg-yellow-500"
        : "bg-green-500";

  return (
    <div className="bg-white rounded-xl shadow p-6 mt-8">
      <p className="text-sm text-gray-600 mb-2">
        Profile Completion
      </p>

      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className={`h-3 rounded-full transition-all duration-500 ${barColor}`}
          style={{ width: `${value}%` }}
        />
      </div>

      <p className="text-sm text-gray-500 mt-2">
        {value}% complete
      </p>

      {value < 70 && (
        <p className="text-xs text-red-500 mt-1">
          Complete your profile to increase job visibility
        </p>
      )}
    </div>
  );
};

function JobSeekerDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get<DashboardStats>(
          "/jobseeker/dashboard"
        );
        setStats(res.data);
      } catch (error) {
        console.error("Failed to load dashboard", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500">
        Loading dashboard...
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="p-6 text-center text-red-500">
        Failed to load dashboard
      </div>
    );
  }
  return (
    <DashboardLayout>
      <div className="p-6 max-w-6xl mx-auto">
        {/* HEADER */}
        <h1 className="text-2xl font-semibold mb-6">
          Jobseeker Dashboard
        </h1>

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <StatCard label="Applied Jobs" value={stats.applied} />
          <StatCard label="Shortlisted" value={stats.shortlisted} />
          <StatCard label="Rejected" value={stats.rejected} />
          <StatCard label="Hired" value={stats.hired} />
        </div>

        {/* PROFILE COMPLETION */}
        <ProfileCompletion value={stats.profileCompletion} />
      </div>
    </DashboardLayout>
  )
}

export default JobSeekerDashboard
