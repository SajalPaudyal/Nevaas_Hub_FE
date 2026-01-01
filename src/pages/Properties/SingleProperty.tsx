/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Trash,
  Edit3,
  MapPin,
  Bed,
  Bath,
  ArrowLeft,
  Form,
} from "lucide-react";
import { api } from "../../api/axios";
import { type RootState } from "../../store/store";
import Modal from "../../components/Modal";
import toast from "react-hot-toast";
import EditProperty from "./EditProperty";
import privateApi from "../../api/privateApi";

const SingleProperty = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { user } = useSelector((state: RootState) => state.auth);

  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const fetchProperty = async () => {
    try {
      const res = await api.get(`/properties/${id}`);
      setProperty(res.data);
    } catch (err) {
      toast.error("Property not found");
      navigate("/properties");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperty();
  });

  const isOwner = user?.id === property?.ownerId;

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this listing?"))
      return;
    try {
      await privateApi.delete(`/properties/${id}`);
      toast.success("Listing removed");
      navigate("/my-properties");
    } catch (err) {
      toast.error("Failed to delete");
    }
  };

  if (loading)
    return (
      <div className="p-20 text-center animate-pulse">Loading Details...</div>
    );
  if (!property) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-500 hover:text-indigo-600 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" /> Go Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          <div className="rounded-[40px] overflow-hidden shadow-2xl shadow-indigo-100/50 border border-gray-100">
            <img
              src={`http://localhost:5000/${property.imageUrl}`}
              className="w-full h-[500px] object-cover"
              alt={property.title}
            />
          </div>

          <div className="bg-white p-8 rounded-4xl border border-gray-50">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-4xl font-black text-gray-900 mb-2">
                  {property.title}
                </h1>
                <p className="flex items-center text-gray-400">
                  <MapPin className="w-4 h-4 mr-2 text-indigo-500" />{" "}
                  {property.address}
                </p>
              </div>
              <div className="text-3xl font-black text-indigo-600">
                Rs. {property.price}
              </div>
            </div>

            <div className="flex gap-8 py-6 border-y border-gray-50 my-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-indigo-50 rounded-2xl text-indigo-600">
                  <Bed />
                </div>
                <span className="font-bold text-gray-700">
                  {property.beds} Beds
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-indigo-50 rounded-2xl text-indigo-600">
                  <Bath />
                </div>
                <span className="font-bold text-gray-700">
                  {property.baths} Baths
                </span>
              </div>
            </div>

            <h3 className="text-xl font-bold mb-4">Description</h3>
            <p className="text-gray-600 leading-relaxed text-lg">
              {property.description}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {isOwner ? (
            <div className="bg-gray-900 p-8 rounded-4xl text-white shadow-xl shadow-gray-200">
              <div className="space-y-4">
                <button
                  onClick={() => setIsEditModalOpen(true)}
                  className="w-full flex items-center justify-center gap-2 py-4 bg-indigo-600 hover:bg-indigo-700 rounded-2xl font-bold transition-all"
                >
                  <Edit3 className="w-5 h-5" /> Edit Details
                </button>
                <button
                  onClick={handleDelete}
                  className="w-full flex items-center justify-center gap-2 py-4 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/20 rounded-2xl font-bold transition-all"
                >
                  <Trash className="w-5 h-5" /> Delete Property
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white p-8 rounded-4xl border border-gray-100 shadow-xl shadow-indigo-100/30">
              <h3 className="text-xl font-bold mb-6">
                Apply for this property.
              </h3>
              <div className="space-y-4">
                <button className="w-full flex items-center justify-center gap-2 py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all">
                  <Form className="w-5 h-5" /> Apply Now
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <EditProperty
          data={property}
          onSuccess={() => {
            setIsEditModalOpen(false);
            fetchProperty();
          }}
        />
      </Modal>
    </div>
  );
};

export default SingleProperty;
