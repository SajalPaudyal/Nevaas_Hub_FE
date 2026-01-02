/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
  import { Building, Plus, Users } from "lucide-react";
import { Link } from "react-router";
import privateApi from "../../api/privateApi";
import PropertyCard from "../../components/Properties/PropertyCard";
import RoommateCard from "../Roommates/RoommateCard";
import Modal from "../../components/Modal";
import AddProperty from "./AddProperty";
import RoommateOpeningForm from "../Roommates/RoommateOpeningForm";

const UserProperty = () => {
  const [userProperties, setUserProperties] = useState([]);
  const [userRoommates, setUserRoommates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(0);

  const [isPropModalOpen, setIsPropModalOpen] = useState(false);
  const [isRoommateModalOpen, setIsRoommateModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [props, rooms] = await Promise.all([
          privateApi.get("/properties/my-properties"),
          privateApi.get("/roommate-openings/my-openings"),
        ]);
        setUserProperties(props.data);
        setUserRoommates(rooms.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [refresh]);

  const triggerRefresh = () => setRefresh((prev) => prev + 1);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-24 min-h-screen">
      <section>
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tight">
              My Properties
            </h1>
            <p className="text-gray-500 mt-1">
              Manage your listed apartments and flats
            </p>
          </div>
          <button
            onClick={() => setIsPropModalOpen(true)}
            className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
          >
            <Plus className="h-4 w-4" /> Add Property
          </button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="h-64 bg-gray-100 animate-pulse rounded-4xl"
              />
            ))}
          </div>
        ) : userProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {userProperties.map((prop: any) => (
              <Link key={prop.id} to={`/property/${prop.id}`}>
                <PropertyCard property={prop} />
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-20 bg-white rounded-[40px] border border-dashed border-gray-200 text-center">
            <Building className="mx-auto w-12 h-12 text-gray-200 mb-4" />
            <p className="text-gray-400 font-medium">No properties found.</p>
          </div>
        )}
      </section>

      <section>
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tight">
              Roommate Vacancies
            </h1>
            <p className="text-gray-500 mt-1">
              Manage your shared space openings
            </p>
          </div>
          <button
            onClick={() => setIsRoommateModalOpen(true)}
            className="flex items-center gap-2 bg-violet-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-violet-700 transition-all shadow-lg shadow-violet-100"
          >
            <Plus className="h-4 w-4" /> Post Vacancy
          </button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="h-64 bg-gray-100 animate-pulse rounded-4xl"
              />
            ))}
          </div>
        ) : userRoommates.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {userRoommates.map((room: any) => (
              <Link key={room.id} to={`/roommate-vacancy/${room.id}`}>
                <RoommateCard item={room} />
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-20 bg-white rounded-[40px] border border-dashed border-gray-200 text-center">
            <Users className="mx-auto w-12 h-12 text-gray-200 mb-4" />
            <p className="text-gray-400 font-medium">
              No roommate vacancies found.
            </p>
          </div>
        )}
      </section>

      <Modal isOpen={isPropModalOpen} onClose={() => setIsPropModalOpen(false)}>
        <AddProperty
          onSuccess={() => {
            setIsPropModalOpen(false);
            triggerRefresh();
          }}
        />
      </Modal>

      <Modal
        isOpen={isRoommateModalOpen}
        onClose={() => setIsRoommateModalOpen(false)}
      >
        <RoommateOpeningForm
          onSuccess={() => {
            setIsRoommateModalOpen(false);
            triggerRefresh();
          }}
        />
      </Modal>
    </div>
  );
};

export default UserProperty;
