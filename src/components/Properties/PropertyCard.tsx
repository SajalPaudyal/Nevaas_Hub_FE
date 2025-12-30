import React from "react";

import { type Property } from "../../types/Properties";
import { Bath, Bed, Clock, MapPin, ShieldCheck, Sparkles } from "lucide-react";
const PropertyCard: React.FC<{ property: Property }> = ({ property }) => {
  const imageSource = `http://localhost:5000/${property.imageUrl}`;
  return (
    <div className="group bg-white rounded-3xl border border-gray-100 overflow-hidden hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-500 cursor-pointer">
      <div className="relative h-56 w-full overflow-hidden">
        <img
          src={imageSource}
          alt={property.title}
          className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
        />

        {property.badge && (
          <div
            className={`absolute top-4 left-4 px-3 py-1.5 rounded-full text-sm font-bold uppercase tracking-wide flex items-center gap-1.5 shadow-lg text-white ${
              property.badge === "New"
                ? "bg-emerald-600"
                : property.badge === "Featured"
                ? "bg-indigo-600"
                : "bg-amber-500"
            }`}
          >
            {property.badge === "New" && <Clock className="w-3 h-3" />}
            {property.badge === "Featured" && <Sparkles className="w-3 h-3" />}
            {property.badge === "Verified" && (
              <ShieldCheck className="w-3 h-3" />
            )}
            {property.badge}
          </div>
        )}
        <div
          className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-2xl shadow-sm
        "
        >
          <span className="text-lg font-black text-gray-900">
            Rs. {parseInt(property.price).toLocaleString()}
          </span>
        </div>
      </div>

      <div className="p-5 space-y-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
            {property.title}
          </h3>
          <div className="flex items-center text-gray-400 mt-1">
            <MapPin className="w-4 h-4 mr-1 text-indigo-500" />
            <span className="text-xs font-medium line-clamp-1">
              {property.address}
            </span>
          </div>
        </div>
        <div className="flex py-3 border-t border-gray-50">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="flex gap-2 p-2 bg-indigo-50 rounded-lg text-indigo-600">
                <Bed className="w-4 h-4" />
                <span className="text-sm font-bold text-gray-700">
                  {property.beds}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className=" flex  gap-2 p-2 bg-indigo-50 rounded-lg text-indigo-600">
                <Bath className="w-4 h-4" />
                <span className="text-sm font-bold text-gray-700">
                  {property.baths}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="border border-violet-500 inline-block py-1 px-3 rounded-xl items-center hover:bg-violet-400 hover:text-white ">
          <span className="text-[10px] font-black uppercase tracking-widest">
            {property.type}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
