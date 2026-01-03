import { useState, useEffect } from "react";
import { api } from "../../api/axios";
import { Filter, X, Users } from "lucide-react";
import { Link } from "react-router";
import RoommateCard from "../Roommates/RoommateCard";
import { RoommateFilter } from "../Roommates/RoommateFilter";
import { type RoommateOpening } from "../../types/Roommate";

const RoommatePage = () => {
  const [data, setData] = useState<RoommateOpening[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    location: "",
    maxPrice: "",
    gender: "",
    faculty: "",
  });

  useEffect(() => {
    api.get("/roommate-openings").then((res) => {
      setData(res.data);
      setLoading(false);
    });
  }, []);

  const filtered = data.filter((item) => {
    return (
      (!filters.location || item.address.includes(filters.location)) &&
      (!filters.maxPrice ||
        parseFloat(item.price) <= parseFloat(filters.maxPrice)) &&
      (!filters.gender || item.gender === filters.gender) &&
      (!filters.faculty || item.faculty === filters.faculty)
    );
  });

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="lg:hidden sticky top-20 z-30 px-4 py-3 bg-white border-b border-gray-100 flex justify-between items-center">
        <span className="text-sm font-bold text-gray-500">
          {filtered.length} Roommates Found
        </span>
        <button
          onClick={() => setIsFilterOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold"
        >
          <Filter className="w-3 h-3" /> Filters
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
        <div className="flex flex-col lg:flex-row gap-10">
          <aside className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-28 bg-white p-8 rounded-[40px] shadow-xl shadow-indigo-100/50 border border-gray-50">
              <h2 className="text-xl font-black text-gray-900 mb-8 flex items-center gap-2">
                <Users className="text-indigo-600 w-5 h-5" /> Preferences
              </h2>
              <RoommateFilter filters={filters} setFilters={setFilters} />
            </div>
          </aside>

          <div
            className={`fixed inset-0 z-100 lg:hidden transition-opacity duration-300 ${
              isFilterOpen ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
          >
            <div
              className="absolute inset-0 bg-gray-900/60 backdrop-blur-md"
              onClick={() => setIsFilterOpen(false)}
            />
            <div
              className={`absolute inset-y-0 left-0 w-full max-w-xs bg-white p-6 transition-transform duration-300 transform ${
                isFilterOpen ? "translate-x-0" : "-translate-x-full"
              }`}
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-black">Filters</h2>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="p-2 bg-gray-100 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <RoommateFilter filters={filters} setFilters={setFilters} />
              <button
                onClick={() => setIsFilterOpen(false)}
                className="w-full mt-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold"
              >
                Show {filtered.length} Results
              </button>
            </div>
          </div>

          <div className="flex-1">
            <div className="hidden lg:flex mb-10 items-center justify-between">
              <h1 className="text-3xl font-black text-gray-900 italic">
                Roommate Openings
              </h1>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-72 bg-gray-200 animate-pulse rounded-4xl"
                  />
                ))}
              </div>
            ) : filtered.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
                {filtered.map((item) => (
                  <Link key={item.id} to={`/roommate-vacancy/${item.id}`}>
                    <RoommateCard item={item} />
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-[40px] border border-dashed">
                <p className="text-gray-400 font-medium">
                  No roommate openings match your search.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoommatePage;
