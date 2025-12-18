import { CheckCircle } from "lucide-react";
import flat from "../../assets/flat.jpg";

const RoommateFinder = () => {
  const roomateFeatures = [
    "Verified Identities (Citizenship/NationalID/Passport)",
    "Filter by Hobbies (Night owl or Early bird)",
    "Split rent, and utilities",
  ];

  return (
    <div className="bg-gray-900 py-16 text-white overflow-hidden relative rounded-2xl">
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-indigo-600 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-purple-600 rounded-full opacity-20 blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 bg-indigo-500/20 backdrop-blur-sm px-3 py-1 rounded-full w-fit mb-4 border border-indigo-500/30">
              <span className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></span>
              <span className="text-indigo-200 font-medium text-xs uppercase tracking-wide">
                What makes us UNIQUE{" "}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
              Living alone is expensive <br />
              Sharing is Caring <span>(and Cheaper)</span>
            </h2>
            <p className="text-gray-200 text-lg mb-8 leading-relaxed">
              Finding a roommate in Kathmandu is way too hard. We are here to
              take that burden off your head. Checkout lifestyle preferences and
              know your roommate before moving in.
            </p>
            <ul className="space-y-4 mb-8">
              {roomateFeatures.map((feature, i) => (
                <li key={i} className="flex items-center text-gray-200">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  {feature}
                </li>
              ))}
            </ul>
            <button className="bg-white text-gray-900 px-8 py-3 rounded-lg font-bold hover:bg-gray-200 transition shadow-[0_0_20px_rgba(255,255,255,0.3)] cursor-pointer">
              Find a Roommate
            </button>
          </div>

          <div className="flex-1 relative items-center">
            <div className="relative">
              <img
                src={flat}
                alt="a fully furnished flat"
                className="rounded-2xl shadow-2xl border-4 border-gray-700/50 transform rotate-2 hover:rotate-0 transition duration-500 "
              />
              <div className="absolute -bottom-6 -left-6 bg-white text-gray-900 p-4 rounded-xl shadow-xl max-w-xs">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold">
                    PD
                  </div>
                  <div>
                    <div className="font-bold text-sm">Pooja Dhungel</div>
                    <div className="text-xs text-gray-500">
                      Looking for a tenant for a fully furnished flat.
                    </div>
                  </div>
                </div>
                <div className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded inline-block">
                  Best Match
                </div>
              </div>
              <div className="text-xs font-medium text-green-500 bg-green-50 px-2 py-2 rounded inline-block">
                Best Match
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoommateFinder;
