/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { ShieldCheck, Users, Home, UserCheck } from "lucide-react";
import UserValidationTab from "./UserValidationTab";
import PropertyAppsTab from "./PropertyAppsTab";
import RoommateAppsTab from "./RoommateAppsTab";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<
    "users" | "properties" | "roommates"
  >("users");

  const tabs = [
    { id: "users", label: "User Verification", icon: UserCheck },
    { id: "properties", label: "Property Applicants", icon: Home },
    { id: "roommates", label: "Roommate Applicants", icon: Users },
  ];

  return (
    <div className="min-h-screen bg-gray-50/50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-4xl font-black text-gray-900 flex items-center gap-3">
            <ShieldCheck className="w-10 h-10 text-violet-600" />
            Admin Panel
          </h1>
          <p className="text-gray-500 mt-2">
            Manage NivaasHub users and oversee applications.
          </p>
        </div>

        <div className="flex flex-wrap gap-4 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all ${
                activeTab === tab.id
                  ? "bg-gray-900 text-white shadow-xl"
                  : "bg-white text-gray-500 hover:bg-gray-100 border border-gray-100"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 overflow-hidden">
          {activeTab === "users" && <UserValidationTab />}
          {activeTab === "properties" && <PropertyAppsTab />}
          {activeTab === "roommates" && <RoommateAppsTab />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
