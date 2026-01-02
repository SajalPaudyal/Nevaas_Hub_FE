/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Mail, Home, User, Clock, Loader2, Hash, Phone } from "lucide-react";
import privateApi from "../../api/privateApi";

const PropertyAppsTab = () => {
  const [apps, setApps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    privateApi
      .get("/admin/property-apps")
      .then((res) => setApps(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-400">
        <Loader2 className="w-10 h-10 animate-spin mb-4 text-violet-600" />
        <p className="font-bold animate-pulse uppercase text-[10px] tracking-widest">
          Loading Property Apps...
        </p>
      </div>
    );

  if (apps.length === 0)
    return (
      <div className="py-20 text-center text-gray-400">
        <Home className="mx-auto w-12 h-12 mb-4 opacity-20" />
        <p>No property applications found.</p>
      </div>
    );

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-50 border-b border-gray-100 text-[10px] font-black uppercase tracking-widest text-gray-400">
          <tr>
            <th className="p-6">Applicant Info</th>
            <th className="p-6">Target Listing</th>
            <th className="p-6">Listed By (Owner)</th>
            <th className="p-6">Date Applied</th>
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
                  <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                    <User size={16} />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">
                      {app.applicantName}
                    </p>
                    <p className="text-xs text-gray-400 flex items-center gap-1">
                      <Mail size={10} /> {app.applicantEmail}
                    </p>
                    <p className="text-[10px] text-indigo-600 font-bold flex items-center gap-1 mt-0.5">
                      <Phone size={10} /> {app.applicantPhone}
                    </p>
                  </div>
                </div>
              </td>
              <td className="p-6">
                <p className="font-bold text-violet-600">{app.propertyTitle}</p>
                <div className="flex items-center gap-1 bg-violet-50 text-violet-600 w-fit px-1.5 py-0.5 rounded border border-violet-100 text-[9px] font-black">
                  <Hash size={8} /> ID: {app.propertyId}
                </div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">
                  Rs. {app.propertyPrice}
                </p>
              </td>
              <td className="p-6">
                <p className="font-semibold text-gray-700">{app.ownerName}</p>
                <p className="text-xs text-gray-400 italic">{app.ownerEmail}</p>
              </td>
              <td className="p-6 text-gray-400 text-xs">
                <div className="flex items-center gap-1">
                  <Clock size={12} />{" "}
                  {new Date(app.createdAt).toLocaleDateString()}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PropertyAppsTab;
