import { useEffect, useState } from "react";
import { getUsers, disableUser, enableUser } from "../service/adminUsersService";
import { toast } from "react-toastify";
import DashboardLayout from "../dashboard/DashboardLayout";
import { useDebounce } from "../hooks/useDebounce";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  const debouncedSearch = useDebounce(search);


  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await getUsers(page, debouncedSearch);
      setUsers(res.data.content);
      setTotalPages(res.data.totalPages);
    } catch {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(0);
  }, [debouncedSearch]);


  useEffect(() => {
    fetchUsers();
  }, [page, debouncedSearch]);

  const toggleUser = async (user) => {
    try {
      if (user.enabled) {
        await disableUser(user.id);
        toast.success("User disabled");
      } else {
        await enableUser(user.id);
        toast.success("User enabled");
      }
      fetchUsers();
    } catch {
      toast.error("Action failed");
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            Users Management
          </h2>

          <input
            type="text"
            placeholder="Search by email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-3 py-1 rounded w-64"
          />
        </div>

        <table className="w-full bg-white rounded shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-t">
                <td className="p-3">{u.email}</td>
                <td className="p-3 text-center">{u.role}</td>
                <td className="p-3 text-center">
                  {u.enabled ? "Active" : "Disabled"}
                </td>
                <td className="p-3 text-center">
                  <button
                    onClick={() => toggleUser(u)}
                    className={`px-3 py-1 rounded text-white ${u.enabled
                      ? "bg-red-600"
                      : "bg-green-600"
                      }`}
                  >
                    {u.enabled ? "Disable" : "Enable"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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

export default AdminUsers;
