import { useState } from "react";

const AuthenticationModal = () => {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  return (
    <div className="w-full">
      <div className="flex border-b border-gray-100">
        <button
          onClick={() => setActiveTab("login")}
          className={`
                flex-1 py-4 text-sm font-semibold transition-all ${
                  activeTab === "login"
                    ? "text-indigo-600 border-b-2 border-indigo-600"
                    : "text-gray-400 hover:text-gray-600"
                }`}
        >
          Login
        </button>
        <button
          onClick={() => setActiveTab("signup")}
          className={`flex-1 py-4 text-sm font-semibold transition-all ${
            activeTab === "signup"
              ? "text-indigo-600 border-b-2 border-indigo-600"
              : "text-gray-400 hover:text-gray-600"
          }`}
        >
          Sign Up
        </button>
      </div>

      <div className="p-6">
        {activeTab === "login" ? (
          <div className="py-4">
            <h2 className="text-xl font-bold mb-4">Welcome Back</h2>
            <p className="text-gray-500 text-sm">Login Form...</p>
          </div>
        ) : (
          <div className="py-4 flex flex-col items-center justify-center">
            <h2 className="text-xl font-bold mb-4">New to NivaasHub?</h2>
            <p className="text-gray-500 text-sm">Please fill up the form</p>
            <p className="text-indigo-600 text-sm">
              {" "}
              let's find you a new home together
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthenticationModal;
