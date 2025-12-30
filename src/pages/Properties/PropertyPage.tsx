import { useState, useEffect } from "react";
import api from "../../api/axios";
import PropertyCard from "../../components/Properties/PropertyCard";
import { FilterSidebar } from "../../components/Properties/FilterSidebar";
import { type Property } from "../../types/Properties";
import { Filter, X } from "lucide-react";

const PropertyPage = () => {
  const [data, setData] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    location: "",
    maxPrice: "",
    type: "",
    beds: "0",
    baths: "0",
  });

  useEffect(() => {
    api.get("/properties").then((res) => {
      setData(res.data);
      setLoading(false);
    });
  }, []);

  const filteredProperties = data.filter((p) => {
    return (
      (!filters.location || p.address.includes(filters.location)) &&
      (!filters.maxPrice ||
        parseFloat(p.price) >= parseFloat(filters.maxPrice)) &&
      (!filters.type || p.type === filters.type) &&
      (!filters.beds || p.beds >= parseInt(filters.beds)) &&
      (!filters.baths || p.baths >= parseInt(filters.baths))
    );
  });

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="lg:hidden sticky top-20 z-30 px-4 py-3 bg-white border-b border-gray-100 flex justify-between items-center">
        <span className="text-sm font-bold text-gray-500">
          {filteredProperties.length} Places Found
        </span>
        <button onClick={() => setIsFilterOpen(true)}>
          <Filter className="w-4 h-4" /> Filters
        </button>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-28 bg-white p-8 rounded-3xl shadow-xl shadow-indigo-100/50 border border-gray-50">
              <h2 className="text-xl font-black text-gray-900 mb-8">
                Filter Properties
              </h2>
              <FilterSidebar filters={filters} setFilters={setFilters} />
            </div>
          </div>

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
              className={`absolute inset-y-0 left-0 w-full max-w-xs bg-white shadow-2xl p-6 transition-transform duration-300 transform ${
                isFilterOpen ? "translate-x-0" : "-translate-x-full"
              }`}
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-black text-gray-900">Filters</h2>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="p-2 bg-gray-100 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <FilterSidebar filters={filters} setFilters={setFilters} />

              <button
                onClick={() => setIsFilterOpen(false)}
                className="w-full mt-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold"
              >
                Show {filteredProperties.length} Results
              </button>
            </div>
          </div>

          <div className="flex-1">
            <div className="hidden lg:flex mb-8 items-center justify-between" >
              <h1 className="text-3xl font-black text-gray-900">
                Explore Properties
                
              </h1>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-72 bg-gray-200 animate-pulse rounded-3xl"
                  />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
                {filteredProperties.map((item) => (
                  <PropertyCard key={item.id} property={item} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyPage;
