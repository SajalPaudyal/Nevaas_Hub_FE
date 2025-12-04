import type React from "react";
import { Home, Building2, Users, Bed } from "lucide-react";

const OurService: React.FC = () => {
  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">What We Offer</h2>
          <p className="text-gray-500 mt-2 max-w-2xl mx-auto">
            More than just a rental listing site. We provide a complete
            ecosystem for tenants and landlords.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Rent a Room",
              icon: Bed,
              desc: "Single or shared rooms for students and professionals.",
              color: "bg-red-100 text-red-600",
            },
            {
              title: "Rent a Flat",
              icon: Building2,
              desc: "1BHK, 2BHK, 3BHK flats for small families or groups.",
              color: "bg-red-100 text-red-600",
            },
            {
              title: "Rent a House",
              icon: Home,
              desc: "Full independent houses for privacy and space.",
              color: "bg-red-100 text-red-600",
            },
            {
              title: "Find Roommate",
              icon: Users,
              desc: "Connect with verified people to share your space and cost.",
              color: "bg-red-100 text-red-600",
            },
          ].map((service, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition border border-gray-100 text-center"
            >
              <div
                className={`w-14 h-14 rounded-full mx-auto flex items-center justify-center mb-4 ${service.color}`}
              >
                <service.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {service.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurService;
