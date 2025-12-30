/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import api from "../../api/axios";
import { Building, Plus } from "lucide-react";
import { Link } from "react-router";
import PropertyCard from "../../components/Properties/PropertyCard";

const UserProperty = () => {
  const [userProperties, setUserProperties] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    api.get("/properties").then((res) => {
      setUserProperties(res.data);
    });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-black text-gray-900">My Properties</h1>
          <p>Manage your properties listed on NivaasHub</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-indigo-500 text-white px-6 py-3 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
        >
          <Plus className="h-3 w-3" /> Add a Property
        </button>
      </div>

      {userProperties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {userProperties.map((prop: any) => (
            <Link key={prop.id} to={`/manage-property/${prop.id}`}>
              <PropertyCard property={prop} />
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl">
            <Building className="w-12 h-12 text-violet-500 mb-4"/>
            <p>You have not added any properties yet.</p>
        </div>
      )}
    </div>
  );
};

export default UserProperty;
