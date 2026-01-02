import { MountainSnow, ShieldCheck, Users, Heart } from "lucide-react";
import { Link } from "react-router";
import BhaktapurExternal from "../assets/bhaktapur_external.jpg";
import BhaktapurInternal from "../assets/bhaktapur_internal.jpg";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-white">
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-black text-gray-900 tracking-tighter mb-5">
          Moving into the Valley? <br />
          <br />
          <span className="text-violet-600 ">Welcome</span>
        </h1>
        <p className="max-w-2xl mx-auto text-gray-500 text-lg leading-relaxed">
          <span className="text-violet-500">Match-Making</span> for finding your
          rooms and roommates. NivaasHub facilitates you in finding your next
          best place to live.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[600px]">
          <div className="md:col-span-2 rounded-[48px] overflow-hidden shadow-2xl relative group">
            <img
              src={BhaktapurExternal}
              alt="Kathmandu"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute bottom-8 left-8 text-white">
              <p className="text-xs font-bold uppercase tracking-[0.3em] opacity-80">
                Our Roots
              </p>
              <h3 className="text-2xl font-black">Dekocha, Bhaktapur, Nepal</h3>
            </div>
          </div>

          <div className="space-y-6">
            <div className="h-1/2 rounded-[40px] overflow-hidden shadow-xl">
              <img
                src={BhaktapurInternal}
                className="w-full h-full object-cover"
                alt="Patan"
              />
            </div>
            <div className="h-[calc(50%-1.5rem)] rounded-[40px] bg-violet-600 p-8 flex flex-col justify-center text-white">
              <MountainSnow className="w-12 h-12 mb-4 opacity-50" />
              <h4 className="text-2xl font-bold leading-tight">
                Founded in the Heart of the Himalayas.
              </h4>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-24">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-black text-gray-900 mb-6 underline decoration-violet-500 underline-offset-8">
              Why NivaasHub?
            </h2>
            <p className="text-gray-600 text-lg mb-6">
              Finding a room in Nepal has traditionally been a game of luck and
              word-of-mouth. We decided to change that by introducing
              transparency and safety.
            </p>
            <p className="text-gray-600 text-lg">
              Whether you are a science student in Bhaktapur or a manager in
              Lalitpur, our goal is to match you with compatible roommates who
              share your lifestyle and values.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-8 bg-white rounded-4xl shadow-sm border border-gray-100">
              <ShieldCheck className="text-violet-600 mb-4" />
              <h5 className="font-bold mb-2">Verified</h5>
              <p className="text-xs text-gray-400">
                Every user uploads official ID documents for safety.
              </p>
            </div>
            <div className="p-8 bg-white rounded-4xl shadow-sm border border-gray-100 mt-8">
              <Users className="text-violet-600 mb-4" />
              <h5 className="font-bold mb-2">Matches</h5>
              <p className="text-xs text-gray-400">
                Filter roommates by faculty, gender, and habits.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 text-center px-6">
        <div className="max-w-3xl mx-auto bg-gray-900 p-12 rounded-[56px] text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-violet-600 blur-[80px] opacity-50" />
          <Heart className="mx-auto mb-6 text-violet-400" />
          <h2 className="text-3xl font-black mb-4">Start your new chapter.</h2>
          <p className="text-gray-400 mb-8">
            Join many others finding their comfort home in Nepal.
          </p>
          <div className="flex justify-center gap-4">
            <Link to={"/properties"}>
              <button className="px-8 py-3 bg-white text-gray-900 rounded-2xl font-bold hover:bg-violet-100 transition-all cursor-pointer">
                Explore Rooms
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
