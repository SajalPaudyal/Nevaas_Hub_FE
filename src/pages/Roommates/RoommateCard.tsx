import { MapPin, GraduationCap, Bed, Bath } from "lucide-react";
import { type RoommateOpening } from "../../types/Roommate";

const RoommateCard = ({ item }: { item: RoommateOpening }) => {
  return (
    <div className="group bg-white rounded-4xl border border-gray-100 overflow-hidden hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-500">
      <div className="relative h-52">
        <img
          src={`http://localhost:5000/${item.imageUrl}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          alt={item.title}
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-2xl text-xs font-black text-indigo-600 shadow-sm">
          Rs. {item.price}/mo
        </div>
        <div className="absolute bottom-4 left-4 flex gap-2">
          <span className="px-2 py-1 bg-indigo-600 text-white text-[10px] font-bold rounded-lg uppercase tracking-wider">
            {item.gender}
          </span>
        </div>
      </div>

      <div className="p-5 space-y-3">
        <h3 className="font-bold text-gray-900 line-clamp-1 group-hover:text-indigo-600 transition-colors">
          {item.title}
        </h3>

        <div className="flex items-center text-gray-400 text-xs">
          <MapPin className="w-3 h-3 mr-1 text-indigo-500" /> {item.address}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-50">
          <div className="flex items-center gap-2 text-gray-600 text-[11px] font-bold">
            <GraduationCap className="w-3.5 h-3.5 text-violet-400" />
            <span className="uppercase tracking-tight">{item.faculty}</span>
          </div>
          <div className="flex gap-3 text-gray-300">
            <div className="flex items-center gap-1">
              <Bed className="w-3 h-3" />{" "}
              <span className="text-[10px]">{item.beds}</span>
            </div>
            <div className="flex items-center gap-1">
              <Bath className="w-3 h-3" />{" "}
              <span className="text-[10px]">{item.baths}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoommateCard;
