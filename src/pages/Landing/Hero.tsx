import { Home, MapPin, Search } from "lucide-react";
import landingImage from "../../assets/landing_image.jpg";
const Hero = () => {
  return (
    <div className="px-4 pb-10">
      <div className="mx-auto max-w-7xl relative rounded-2xl overflow-hidden shadow-2xl h-[550px] md:h-[600px]">
        <div className="absolute inset-0">
          <img
            src={landingImage}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-r from-gray-900/95 via-gray-900/70 to-transparent mix-blend-multiply"></div>
        </div>
        <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-12 lg:px-20">
          <div className="inline-flex items-center gap-2 bg-indigo-500/20 backdrop-blur-sm px-3 py-1 rounded-full w-fit mb-4 border border-indigo-500/30">
            <span className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></span>
            <span className="text-indigo-200 font-medium text-xs uppercase tracking-wide">
              The Most Trusted Rental Platform in Nepal
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight max-w-3xl mb-6">
            Find a Home. <br />
            <span className="text-indigo-400">Find A Friend.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-8 leading-relaxed">
            Not just houses, flats, or rooms, we help you find the perfect
            roommate to make stories, share feelings, and create a great bond.
            From single rooms, to full Flats in Kathmandu Valley. <br />
            <span className="font-bold text-indigo-400">NivaasHub</span> does it
            all.
          </p>

          <div className="bg-white p-3 rounded-xl shadow-2xl max-w-4xl w-full flex flex-col md:flex-row gap-2">
            <div className="flex-1 flex items-center px-4 h-12 border-b md:border-b-0 md:border-r border-gray-200">
              <MapPin className="text-gray-400 w-5 h-5 mr-3" />
              <select className="w-full outline-none text-gray-700 bg-transparent cursor-pointer">
                <option value="">Location (eg: Koteshwor)</option>
                <option value="">Kathmandu</option>
                <option value="">Bhaktapur</option>
                <option value="">Lalitpur</option>
              </select>
            </div>
            <div className="flex-1 flex items-center px-4 h-12 border-b md:border-b-0 md:border-r border-gray-200">
              <Home className="text-gray-400 w-5 h-5 mr-3" />
              <select className="w-full outline-none text-gray-700 bg-transparent cursor-pointer ">
                <option value="">I am looking for...</option>
                <option value="">A Room</option>
                <option value="">A Flat/Apartment</option>
                <option value="">A Full House</option>
                <option value="">A Roommate</option>
              </select>
            </div>
            <div className="flex-1 flex items-center px-4 h-12">
              <span className="text-gray-400 mr-3 font-semibold text-sm">
                Rs.
              </span>
              <input
                type="text"
                placeholder="Max Rent/Month"
                className="w-full outline-none text-gray-700 placeholder-gray-400"
              />
            </div>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-0 rounded-lg font-semibold transition flex items-center justify-center shadow-md cursor-pointer">
              <Search className="w-5 h-5 md:mr-2" />
              <span className="hidden md:inline">Search</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
