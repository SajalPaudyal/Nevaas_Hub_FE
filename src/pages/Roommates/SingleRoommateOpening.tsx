/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Trash2,
  Edit3,
  MapPin,
  Bed,
  Bath,
  ArrowLeft,
  User,
  GraduationCap,
  Briefcase,
  Calendar,
  Cigarette,
  CigaretteOff,
  PawPrint,
  Users,
  Info,
  ShieldCheck,
} from "lucide-react";
import { api } from "../../api/axios";
import privateApi from "../../api/privateApi";
import { type RootState } from "../../store/store";
import Modal from "../../components/Modal";
import RoommateOpeningForm from "./RoommateOpeningForm";
import toast from "react-hot-toast";

const SingleRoommateOpening = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);

  const [isApplying, setIsApplying] = useState(false);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const fetchOpening = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/roommate-openings/${id}`);
      setData(res.data);
    } catch (err: any) {
      toast.error("Vacancy not found");
      navigate("/roommates");
      console.log(err?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOpening();
  }, [id]);

  const isOwner = user?.id === data?.ownerId;

  const handleApply = async () => {
    try {
      setIsApplying(true);
      const res = await privateApi.post("/applications/roommate", {
        roommateOpeningId: data.id,
        message: `I'm interested in: ${data.title}`,
      });
      toast.success(res.data.message);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to apply");
    } finally {
      setIsApplying(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this vacancy?"))
      return;
    try {
      await privateApi.delete(`/roommate-openings/${id}`);
      toast.success("Vacancy removed");
      navigate("/my-properties");
    } catch (err: any) {
      toast.error("Failed to delete");
      console.log(err?.message);
    }
  };

  if (loading)
    return (
      <div className="p-20 text-center animate-pulse text-gray-400 font-bold italic">
        Loading Details...
      </div>
    );
  if (!data) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 min-h-screen bg-white">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-400 hover:text-violet-600 mb-8 transition-colors font-black text-xs uppercase tracking-widest"
      >
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Listings
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <div className="rounded-[48px] overflow-hidden shadow-2xl shadow-violet-100 border-4 border-white">
            <img
              src={`http://localhost:5000/${data.imageUrl}`}
              className="w-full h-[550px] object-cover"
              alt={data.title}
            />
          </div>

          <div className="bg-white p-10 rounded-[48px] shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-10">
              <div className="space-y-3">
                <h1 className="text-5xl font-black text-gray-900 tracking-tighter leading-tight">
                  {data.title}
                </h1>
                <p className="flex items-center text-gray-400 font-semibold italic">
                  <MapPin className="w-5 h-5 mr-2 text-violet-500" />{" "}
                  {data.address}
                </p>
              </div>
              <div className="text-4xl font-black text-violet-600">
                Rs. {data.price}
                <span className="text-sm text-gray-300 font-normal">/mo</span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
              <div className="flex items-center p-5 bg-gray-50 rounded-3xl gap-4 border border-transparent hover:border-violet-100 transition-colors">
                <div className="p-3 bg-white rounded-2xl shadow-sm text-violet-500">
                  <Bed className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-black text-gray-400 mb-1">
                    Beds
                  </p>
                  <p className="text-sm font-black text-gray-800">
                    {data.beds} Total
                  </p>
                </div>
              </div>
              <div className="flex items-center p-5 bg-gray-50 rounded-3xl gap-4 border border-transparent hover:border-violet-100 transition-colors">
                <div className="p-3 bg-white rounded-2xl shadow-sm text-violet-500">
                  <Bath className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-black text-gray-400 mb-1">
                    Baths
                  </p>
                  <p className="text-sm font-black text-gray-800">
                    {data.baths} Total
                  </p>
                </div>
              </div>
              <div className="flex items-center p-5 bg-gray-50 rounded-3xl gap-4 border border-transparent hover:border-violet-100 transition-colors">
                <div className="p-3 bg-white rounded-2xl shadow-sm text-violet-500">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-black text-gray-400 mb-1">
                    Occupation
                  </p>
                  <p className="text-sm font-black text-gray-800 capitalize">
                    {data.occupation}
                  </p>
                </div>
              </div>
              <div className="flex items-center p-5 bg-gray-50 rounded-3xl gap-4 border border-transparent hover:border-violet-100 transition-colors">
                <div className="p-3 bg-white rounded-2xl shadow-sm text-violet-500">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-black text-gray-400 mb-1">
                    Faculty
                  </p>
                  <p className="text-sm font-black text-gray-800 capitalize">
                    {data.faculty}
                  </p>
                </div>
              </div>
              <div className="flex items-center p-5 bg-gray-50 rounded-3xl gap-4 border border-transparent hover:border-violet-100 transition-colors">
                <div className="p-3 bg-white rounded-2xl shadow-sm text-violet-500">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-black text-gray-400 mb-1">
                    Gender
                  </p>
                  <p className="text-sm font-black text-gray-800 capitalize">
                    {data.gender}
                  </p>
                </div>
              </div>
              <div className="flex items-center p-5 bg-gray-50 rounded-3xl gap-4 border border-transparent hover:border-violet-100 transition-colors">
                <div className="p-3 bg-white rounded-2xl shadow-sm text-violet-500">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-black text-gray-400 mb-1">
                    Age
                  </p>
                  <p className="text-sm font-black text-gray-800">
                    {data.age} Years
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="flex gap-4">
                <div
                  className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold text-xs ${
                    data.isSmoker
                      ? "bg-red-50 text-red-500"
                      : "bg-green-50 text-green-600"
                  }`}
                >
                  {data.isSmoker ? (
                    <Cigarette className="w-4 h-4" />
                  ) : (
                    <CigaretteOff className="w-4 h-4" />
                  )}
                  {data.isSmoker ? "Smoker" : "Non-Smoker"}
                </div>
                <div
                  className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold text-xs ${
                    data.hasPets
                      ? "bg-violet-50 text-violet-600"
                      : "bg-gray-50 text-gray-400"
                  }`}
                >
                  <PawPrint className="w-4 h-4" />
                  {data.hasPets ? "Pets Allowed" : "No Pets"}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-black text-gray-900 flex items-center gap-2 italic underline decoration-violet-200 underline-offset-8">
                  <Info className="w-6 h-6 text-violet-500" /> About the room
                </h3>
                <p className="text-gray-500 leading-relaxed text-lg whitespace-pre-line">
                  {data.description ||
                    "The owner hasn't provided a detailed description, but the listing looks promising!"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-violet-600 p-8 rounded-[48px] text-white shadow-2xl shadow-violet-200 relative overflow-hidden">
            <div className="absolute -right-4 -top-4 opacity-10">
              <Users size={120} />
            </div>
            <h4 className="text-xl font-black mb-8 flex items-center gap-2 italic">
              <Users className="w-6 h-6" /> Seeking For
            </h4>
            <div className="space-y-4 relative z-10">
              <div className="p-5 bg-white/10 rounded-3xl backdrop-blur-sm border border-white/10">
                <p className="text-[10px] font-black uppercase tracking-widest text-violet-200 mb-1">
                  Preferred Gender
                </p>
                <p className="text-xl font-black capitalize">
                  {data.prefGender}
                </p>
              </div>
              <div className="p-5 bg-white/10 rounded-3xl backdrop-blur-sm border border-white/10">
                <p className="text-[10px] font-black uppercase tracking-widest text-violet-200 mb-1">
                  Age Requirement
                </p>
                <p className="text-xl font-black">
                  {data.prefMinAge} - {data.prefMaxAge} Years
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {isOwner ? (
              <div className="bg-gray-900 p-8 rounded-[48px] shadow-2xl space-y-4">
                <h3 className="text-white font-black text-center mb-4 uppercase text-xs tracking-widest flex items-center justify-center gap-2">
                  <ShieldCheck size={14} className="text-violet-400" />{" "}
                  Management Dashboard
                </h3>
                <button
                  onClick={() => setIsEditModalOpen(true)}
                  className="w-full py-4 bg-violet-600 text-white rounded-3xl font-black hover:bg-violet-700 transition-all flex items-center justify-center gap-2"
                >
                  <Edit3 className="w-5 h-5" /> Edit Vacancy
                </button>
                <button
                  onClick={handleDelete}
                  className="w-full py-4 bg-red-500/10 text-red-400 rounded-3xl font-black hover:bg-red-500 hover:text-white transition-all flex items-center justify-center gap-2 border border-red-500/20"
                >
                  <Trash2 className="w-5 h-5" /> Delete Permanently
                </button>
              </div>
            ) : (
              <div className="bg-white p-8 rounded-[48px] shadow-xl border border-gray-100 space-y-4">
                <button
                  onClick={handleApply}
                  disabled={isApplying}
                  className="w-full py-5 bg-gray-900 text-white rounded-[28px] font-black hover:bg-violet-700 transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isApplying ? "Sending..." : "Apply as Roommate"}
                </button>
                <p className="text-center text-[9px] text-gray-400 font-bold uppercase tracking-[0.2em] px-4 leading-relaxed">
                  Your ideal roommate is waiting for your application. 
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <RoommateOpeningForm
          initialData={data}
          onSuccess={() => {
            setIsEditModalOpen(false);
            fetchOpening();
          }}
        />
      </Modal>
    </div>
  );
};

export default SingleRoommateOpening;
