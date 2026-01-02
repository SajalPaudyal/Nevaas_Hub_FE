/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import privateApi from "../../api/privateApi";
import toast from "react-hot-toast";
import {
  Eye,
  ExternalLink,
  UserCheck,
  ShieldAlert,
  Loader2,
} from "lucide-react";

const UserValidationTab = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    const getUsers = async () => {
      try {
        setLoading(true);
        const res = await privateApi.get("/admin/users");
        setUsers(res.data);
      } catch (err: any) {
        toast.error("Failed to load users");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, [refreshTrigger]);

  const handleStatusUpdate = async (id: number, status: string) => {
    try {
      await privateApi.put(`/admin/users/verify/${id}`, { status });
      toast.success(`User updated to ${status}`);
      setRefreshTrigger((prev) => prev + 1);
    } catch (err) {
      toast.error("Update failed");
      console.log(err);
    }
  };

  if (loading && users.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="w-10 h-10 animate-spin text-violet-600 mb-4" />
        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
          Fetching NivaasHub Members...
        </p>
      </div>
    );
  }

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-50 border-b border-gray-100 text-[10px] font-black uppercase tracking-widest text-gray-400">
          <tr>
            <th className="p-6">User Details</th>
            <th className="p-6">ID Verification</th>
            <th className="p-6">Account Role</th>
            <th className="p-6">Current Status</th>
            <th className="p-6 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {users.map((u) => (
            <tr
              key={u.id}
              className="hover:bg-gray-50/50 transition-colors group"
            >
              <td className="p-6">
                <p className="font-bold text-gray-900">{u.fullName}</p>
                <p className="text-xs text-gray-400 font-medium">{u.email}</p>
              </td>
              <td className="p-6">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() =>
                      setPreviewImage(
                        `http://localhost:5000/${u.idDocumentPath}`
                      )
                    }
                    className="p-2 bg-violet-50 text-violet-600 rounded-lg hover:bg-violet-600 hover:text-white transition-all"
                    title="Quick Preview"
                  >
                    <Eye size={16} />
                  </button>
                  <a
                    href={`http://localhost:5000/${u.idDocumentPath}`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 bg-gray-100 text-gray-400 rounded-lg hover:bg-gray-200 hover:text-gray-600 transition-all"
                  >
                    <ExternalLink size={16} />
                  </a>
                </div>
              </td>
              <td className="p-6">
                <div className="flex items-center gap-1.5">
                  {u.role === "admin" ? (
                    <ShieldAlert size={14} className="text-red-500" />
                  ) : (
                    <UserCheck size={14} className="text-gray-400" />
                  )}
                  <span className="text-xs uppercase font-black text-gray-400 tracking-tighter">
                    {u.role}
                  </span>
                </div>
              </td>
              <td className="p-6">
                <span
                  className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                    u.status === "accepted"
                      ? "bg-green-100 text-green-600"
                      : u.status === "pending"
                      ? "bg-amber-100 text-amber-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {u.status}
                </span>
              </td>
              <td className="p-6 text-right">
                <select
                  value={u.status}
                  onChange={(e) => handleStatusUpdate(u.id, e.target.value)}
                  className="bg-gray-100 border-none rounded-xl text-[10px] font-black uppercase tracking-widest px-4 py-2.5 outline-none cursor-pointer focus:ring-2 ring-violet-200 hover:bg-gray-200 transition-all"
                >
                  <option value="pending">Pending</option>
                  <option value="accepted">Accept</option>
                  <option value="rejected">Reject</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {previewImage && (
        <div className="fixed inset-0 z-200 flex items-center justify-center p-8">
          <div
            className="absolute inset-0 bg-gray-900/80 backdrop-blur-md"
            onClick={() => setPreviewImage(null)}
          />
          <div className="relative max-w-4xl max-h-full bg-white p-2 rounded-4xl overflow-hidden shadow-2xl animate-in zoom-in duration-200">
            <img
              src={previewImage}
              alt="Verification Document"
              className="max-h-[80vh] w-auto rounded-3xl object-contain"
            />
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute top-6 right-6 bg-white/20 backdrop-blur-md text-white p-2 rounded-full hover:bg-white hover:text-black transition-all"
            >
              <ShieldAlert />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserValidationTab;
