import { WhyUsContent } from "../../data/WhyUsContent";

const WhyUs = () => {
  return (
    <div className="py-20 bg-indigo-50 text-gray-900 rounded-3xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">
            Rent with Trust and Confidence
          </h2>
          <p className="text-gray-600">
            We solve the biggest headaches of renting in the valley: middlemen
            fee, unreliable landlords, water issues, and fake properties
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {WhyUsContent.map((whyUs, i) => (
            <div
              key={i}
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition"
            >
              <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <whyUs.icon className="w-6 h-6 text-green-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">{whyUs.title}</h3>
              <p className="text-gray-500 leading-relaxed">
                {whyUs.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyUs;
