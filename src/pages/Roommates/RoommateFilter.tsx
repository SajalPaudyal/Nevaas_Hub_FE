/* eslint-disable @typescript-eslint/no-explicit-any */
import { User, GraduationCap, MapPin, BadgeIndianRupee } from "lucide-react";

export const RoommateFilter = ({ filters, setFilters }: any) => {
  const update = (e: any) =>
    setFilters({ ...filters, [e.target.name]: e.target.value });

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
          <MapPin className="w-3 h-3" /> Location
        </label>
        <select
          name="location"
          onChange={update}
          className="w-full p-3 bg-gray-50 rounded-xl text-sm outline-none"
        >
          <option value="">All Locations</option>
          <option value="Kathmandu">Kathmandu</option>
          <option value="Bhaktapur">Bhaktapur</option>
          <option value="Lalitpur">Lalitpur</option>
        </select>
      </div>

      <div className="space-y-2">
        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
          <User className="w-3 h-3" /> Roommate Gender
        </label>
        <select
          name="gender"
          onChange={update}
          className="w-full p-3 bg-gray-50 rounded-xl text-sm outline-none"
        >
          <option value="">Any Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      <div className="space-y-2">
        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
          <GraduationCap className="w-3 h-3" /> Faculty
        </label>
        <select
          name="faculty"
          onChange={update}
          className="w-full p-3 bg-gray-50 rounded-xl text-sm outline-none"
        >
          <option value="">All Faculties</option>
          <option value="science">Science</option>
          <option value="management">Management</option>
          <option value="humanities">Humanities</option>
          <option value="others">Others</option>
        </select>
      </div>

      <div className="space-y-2">
        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
          <BadgeIndianRupee className="w-3 h-3" /> Max Budget
        </label>
        <input
          type="number"
          name="maxPrice"
          placeholder="Max Rs."
          onChange={update}
          className="w-full p-3 bg-gray-50 rounded-xl text-sm outline-none"
        />
      </div>
    </div>
  );
};
