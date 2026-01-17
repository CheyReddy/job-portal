import React from "react";

const RecruiterApprovalTable = ({
  recruiters,
  onApprove,
  onReject,
  loading,
}) => {
  if (loading) {
    return <p className="text-center">Loading recruiters...</p>;
  }

  if (!recruiters || recruiters.length === 0) {
    return (
      <p className="text-center text-gray-500">
        No pending recruiter approvals
      </p>
    );
  }

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="px-4 py-3">Company</th>
            <th className="px-4 py-3">Industry</th>
            <th className="px-4 py-3">Location</th>
            <th className="px-4 py-3">Website</th>
            <th className="px-4 py-3 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {recruiters.map((rec) => (
            <tr key={rec.id} className="border-t">
              <td className="px-4 py-3 font-medium">
                {rec.companyName}
              </td>

              <td className="px-4 py-3">
                {rec.industryType}
              </td>

              <td className="px-4 py-3">
                {rec.companyLocation}
              </td>

              <td className="px-4 py-3">
                <a
                  href={rec.companyWebsite}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Visit
                </a>
              </td>

              <td className="px-4 py-3 text-center space-x-2">
                <button
                  onClick={() => onApprove(rec.id)}
                  className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Approve
                </button>

                <button
                  onClick={() => {
                    if (
                      window.confirm(
                        "Are you sure you want to reject this recruiter?"
                      )
                    ) {
                      onReject(rec.id);
                    }
                  }}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecruiterApprovalTable;
