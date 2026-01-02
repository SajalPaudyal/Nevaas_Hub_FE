import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router";
import { Plus, Users, LayoutGrid } from "lucide-react";
import privateApi from "../../api/privateApi";
import RoommateCard from "./RoommateCard";
import Modal from "../../components/Modal";
import RoommateOpeningForm from "./RoommateOpeningForm";
import { type RoommateOpening } from "../../types/Roommate";

const UserRoommateOpenings = () => {
  const [openings, setOpenings] = useState<RoommateOpening[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // 1. Fetch function (reusable for refresh)
  const fetchMyOpenings = useCallback(async () => {
    try {
      setLoading(true);
      const res = await privateApi.get("/roommate-openings/my-openings");
      setOpenings(res.data);
    } catch (err) {
      console.error("Failed to fetch roommate vacancies", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMyOpenings();
  }, [fetchMyOpenings]);

  const handleSuccess = () => {
    setIsModalOpen(false);
    fetchMyOpenings();
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 min-h-screen">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-black text-gray-900 flex items-center gap-3">
            <LayoutGrid className="text-violet-600 w-8 h-8" />
            My Roommate Vacancies
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage the rooms you are offering to potential roommates.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-violet-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-violet-700 transition-all shadow-lg shadow-violet-100"
        >
          <Plus className="h-4 w-4" /> Post New Vacancy
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="h-72 bg-gray-100 animate-pulse rounded-4xl"
            />
          ))}
        </div>
      ) : openings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {openings.map((item) => (
            <Link key={item.id} to={`/roommate-vacancy/${item.id}`}>
              <RoommateCard item={item} />
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 bg-white rounded-[40px] border border-dashed border-gray-200">
          <Users className="w-16 h-16 text-violet-100 mb-4" />
          <p className="text-gray-400 font-medium text-lg">
            You haven't posted any roommate vacancies yet.
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-4 text-violet-600 font-bold hover:underline"
          >
            List your spare room today
          </button>
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <RoommateOpeningForm onSuccess={handleSuccess} />
      </Modal>
    </div>
  );
};

export default UserRoommateOpenings;
