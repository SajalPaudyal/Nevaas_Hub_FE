import { useState } from "react";
import { MapPin, Bed, Bath, ArrowRight, Users } from "lucide-react";
// Import your data and type directly
import { ListedProperty } from "../../data/Properties";
import type { Property } from "../../types/Properties";

const Featured = () => {
  const [activeTab, setActiveTab] = useState<string>("All");

  const tabs = ["All", "Full Flat", "Apartment", "Room", "House", "Roommate"];

  const filteredRentals = ListedProperty.filter((property: Property) => {
    if (activeTab === "All") return true;

    if (activeTab === "Roommate") return property.isRoommateOption === true;

    if (activeTab === "Room") {
      return (
        property.type.toLowerCase().includes("room") &&
        !property.isRoommateOption
      );
    }
    return property.type === activeTab;
  });

  return (
    <div className="bg-white py-16" id="rentals">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold text-gray-900">Latest Rentals</h2>
            <p className="text-gray-500 mt-2">
              Hot properties and shared spaces available now.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 bg-gray-100 p-1.5 rounded-xl border border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  activeTab === tab
                    ? "bg-white text-indigo-600 shadow-md ring-1 ring-black/5"
                    : "text-gray-500 hover:text-indigo-600 hover:bg-gray-50"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRentals.length > 0 ? (
            filteredRentals.map((property: Property) => (
              <div
                key={property.id}
                className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300 group cursor-pointer relative"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={
                      property.imageUrl ||
                      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=400"
                    }
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />

                  <div className="absolute top-4 left-4 flex gap-2">
                    {property.badge && (
                      <span className="bg-indigo-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-md">
                        {property.badge}
                      </span>
                    )}
                    {property.isRoommateOption && (
                      <span className="bg-pink-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-md flex items-center gap-1">
                        <Users className="w-3 h-3" /> Roommate
                      </span>
                    )}
                  </div>

                  <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg text-indigo-700 font-bold shadow-sm border border-gray-100">
                    {property.price}
                  </div>
                </div>

                <div className="p-6">
                  <div className="text-xs text-indigo-500 font-bold uppercase tracking-wider mb-1">
                    {property.type}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1 truncate">
                    {property.title}
                  </h3>
                  <div className="flex items-center text-gray-500 text-sm mb-4">
                    <MapPin className="w-4 h-4 mr-1 text-gray-400" />
                    {property.address}
                  </div>

                  <div className="flex justify-between border-t border-gray-100 pt-4">
                    <div className="flex items-center text-gray-600 text-sm font-medium">
                      <Bed className="w-4 h-4 mr-2 text-indigo-500" />
                      {property.beds} {property.beds === 1 ? "Bed" : "Beds"}
                    </div>
                    <div className="flex items-center text-gray-600 text-sm font-medium">
                      <Bath className="w-4 h-4 mr-2 text-indigo-500" />
                      {property.baths} {property.baths === 1 ? "Bath" : "Baths"}
                    </div>
                    <button className="flex items-center text-indigo-600 text-sm font-bold hover:translate-x-1 transition-transform cursor-pointer">
                      Details <ArrowRight className="w-3 h-3 ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-24 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                <MapPin className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">
                No properties found
              </h3>
              <p className="text-gray-500">
                Try adjusting your filters to find what you're looking for.
              </p>
            </div>
          )}
        </div>

        <div className="mt-12 text-center">
          <button className="inline-flex items-center justify-center px-8 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 transition-all cursor-pointer">
            View All Rentals
          </button>
        </div>
      </div>
    </div>
  );
};

export default Featured;
