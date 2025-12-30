/* eslint-disable @typescript-eslint/no-explicit-any */
import { Bath, ChevronDown, Home, Map, Wallet } from "lucide-react";
import React from "react";

interface FilterProperties {
  filters: any;
  setFilters: (f: any) => void;
}

export const FilterSidebar: React.FC<FilterProperties> = ({
  filters,
  setFilters,
}) => {
  const update = (e: any) =>
    setFilters({ ...filters, [e.target.name]: e.target.value });

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <label className="text-xs font-black uppercase track-wide text-gray-500 flex items-center gap-2">
          <Map className="w-3 h-3" />
          Location
        </label>
        <div className="relative flex items-center">
          <select
            name="location"
            className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-2xl outline-none text-sm appearance-none cursor-pointer focus:bg-white focus:border-indigo-500 transition-all"
            onChange={update}
            value={filters.location}
          >
            <option value="">All Locations</option>
            <option value="Kathmandu">Kathmandu</option>
            <option value="Bhaktapur">Bhaktapur</option>
            <option value="Lalitpur">Lalitpur</option>
          </select>
          <ChevronDown className="absolute right-4 h-4 w-4 text-gray-400 pointer-events-none" />
        </div>
      </div>

      <div className="space-y-3">
        <label className="text-xs font-black uppercase tracking-wide text-gray-400 flex items-center gap-2">
          <Wallet className="w-3 h-3" /> Max Price
        </label>
        <input
          type="number"
          name="maxPrice"
          placeholder="Max Budget"
          className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-indigo-500 outline-none text-sm transition-all"
          onChange={update}
        />
      </div>
      <div className="space-y-3">
        <label className="text-xs font-black uppercase tracking-wide text-gray-400 flex items-center gap-2">
          <Home className="w-3 h-3" /> Type
        </label>
        <div className="relative flex items-center">
          <select
            name="type"
            className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-2xl outline-none text-sm appearance-none cursor-pointer focus:bg-white focus:border-indigo-500 transition-all"
            onChange={update}
          >
            <option value="">All Categories</option>
            <option value="apartment">Apartment</option>
            <option value="flat">Flat</option>
            <option value="room">Room</option>
            <option value="house">House</option>
          </select>
          <ChevronDown className="absolute right-4 h-4 w-4 text-gray-400 pointer-events-none" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase text-gray-400">
            Min Beds
          </label>
          <input
            type="number"
            name="beds"
            placeholder="0"
            min="0"
            className="w-full px-4 py-2 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-indigo-500 outline-none text-sm transition-all"
            onChange={update}
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-black uppercase text-gray-400 flex items-center gap-2">
            <Bath className="w-3 h-3" /> Min Baths
          </label>
          <input
            type="number"
            name="beds"
            placeholder="0"
            min="0"
            className="w-full px-4 py-2 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-indigo-500 outline-none text-sm transition-all"
            onChange={update}
          />
        </div>
      </div>
    </div>
  );
};
