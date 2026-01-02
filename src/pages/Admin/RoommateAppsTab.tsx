/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Mail, Users, User, Loader2, Phone } from "lucide-react";
import privateApi from "../../api/privateApi";

const RoommateAppsTab = () => {
  const [apps, setApps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    privateApi
      .get("/admin/roommate-apps")
      .then((res) => setApps(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-400">
        <Loader2 className="w-10 h-10 animate-spin mb-4 text-violet-600" />
        <p className="font-bold animate-pulse uppercase text-[10px] tracking-widest">
          Loading Roommate Apps...
        </p>
      </div>
    );

  if (apps.length === 0)
    return (
      <div className="py-20 text-center text-gray-400">
        <Users className="mx-auto w-12 h-12 mb-4 opacity-20" />
        <p>No roommate requests found.</p>
      </div>
    );

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-50 border-b border-gray-100 text-[10px] font-black uppercase tracking-widest text-gray-400">
          <tr>
            <th className="p-6">Seeker (Applicant)</th>
            <th className="p-6">Opening Details</th>
            <th className="p-6">Owner (Host)</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {apps.map((app) => (
            <tr
              key={app.applicationId}
              className="hover:bg-gray-50/50 transition-colors"
            >
              <td className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-violet-50 rounded-lg text-violet-600">
                    <User size={16} />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{app.seekerName}</p>
                    <p className="text-xs text-gray-400 flex items-center gap-1">
                      <Mail size={10} /> {app.seekerEmail}
                    </p>
                    <p className="text-[10px] text-indigo-600 font-bold flex items-center gap-1 mt-0.5">
                      <Phone size={10} /> {app.seekerPhone}
                    </p>
                  </div>
                </div>
              </td>
              <td className="p-6">
                <p className="font-bold text-indigo-600">{app.vacancyTitle}</p>
                <p className="text-sm font-bold text-gray-700 ">
                  {app.openingId}
                </p>
                <p className="text-[10px]  text-gray-400 italic">
                  Target: {app.prefGender} Roommate
                </p>
              </td>
              <td className="p-6 text-gray-600">
                <p className="font-semibold">{app.ownerName}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoommateAppsTab;
