import { useState } from "react";
import SignUp from "./SignUp";
import Login from "./Login";

interface AuthModalProps {
  onClose: () => void;
}
const AuthenticationModal: React.FC<AuthModalProps> = ({ onClose }) => {
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
          <Login onSuccess={onClose}/>
        ) : (
          <SignUp onSuccess={onClose} />
        )}
      </div>
    </div>
  );
};

export default AuthenticationModal;
