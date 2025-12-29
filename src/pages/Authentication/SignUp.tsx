import { useForm, type SubmitHandler } from "react-hook-form";
import type { RegisterUser } from "../../types/authenticationTypes";
import api from "../../api/axios";
import toast from "react-hot-toast";
import {
  AlertCircle,
  CheckCircle2,
  Lock,
  Mail,
  Upload,
  User,
} from "lucide-react";

interface SignUpProps {
  onSuccess: () => void;
}

const SignUp: React.FC<SignUpProps> = ({ onSuccess }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterUser>();

  const idCardFile = watch("idCard");

  const onSubmit: SubmitHandler<RegisterUser> = async (data, e) => {
    e?.preventDefault();
    const formData = new FormData();
    formData.append("fullName", data.fullName);
    formData.append("email", data.email);
    formData.append("password", data.password);
    if (data.idCard?.[0]) {
      formData.append("idCard", data.idCard[0]);
    }

    try {
      const response = await api.post("/auth/register", formData);

      if (response.status === 201 || response.status === 200) {
        toast.success("User successfully created.");
      }
      onSuccess();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      const errorMessage = e.response?.data?.message || "Registration Failed";
      toast.error(errorMessage);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-2">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Join NivaasHub</h2>
        <p className="text-sm text-violet-600 mt-1">
          Let's find a comfort place for you and your family.
        </p>
      </div>

      <div className="space-y-1">
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-violet-400" />
          <input
            {...register("fullName", { required: "Full name is required" })}
            type="text"
            placeholder="Full Name"
            className={`w-full pl-10 pr-4 py-3 bg-gray-50 border ${
              errors.fullName ? "border-red-500" : "border-gray-200"
            } rounded-xl focus:ring-violet-500/20 focus:border-violet-500 outline-none transition-all text-sm`}
          />
        </div>
        {errors.fullName && (
          <p className="text-xs text-red-500 flex items-center gap-1 ml-1">
            <AlertCircle className="h-3 w-3" /> {errors.fullName.message}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-violet-400" />
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Please input a valid email address.",
              },
            })}
            type="email"
            placeholder="Email Address"
            className={`w-full pl-10 pr-4 py-3 bg-gray-50 border ${
              errors.email ? "border-red-500" : "border-gray-200"
            } rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all text-sm`}
          />
        </div>
        {errors.email && (
          <p className="text-xs text-red-500 flex items-center gap-1 ml-1">
            <AlertCircle className="h-3 w-3" /> {errors.email.message}
          </p>
        )}
      </div>
      <div className="space-y-1">
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-violet-400" />
          <input
            {...register("password", {
              required: "Please input a password",
              minLength: {
                value: 8,
                message: "Password must be a minimum of 8 characters.",
              },
            })}
            type="password"
            placeholder="Password"
            className={`w-full pl-10 pr-4 py-3 bg-gray-50 ${
              errors.password ? "border-red-500" : "border-gray-200"
            } rounded-xl focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all text-sm`}
          />
        </div>
        {errors.password && (
          <p className="text-xs text-red-500 flex items-center gap-1 ml-1">
            <AlertCircle className="h-3 w-3" />
            {errors.password.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm  text-violet-500 tracking-wider">
          Official National Document (National Identity card/
          Citizenship/Password) <br />
          आधिकारिक राष्ट्रिय दस्तावेज (राष्ट्रिय परिचयपत्र/नागरिकता/राहदानी)
        </label>
        <label
          className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-2xl cursor-pointer transition-all ${
            idCardFile?.[0]
              ? "border-green-400 bg-green-50"
              : "border-gray-200 bg-gray-50 hover:bg-gray-100 hover:border-violet-500"
          }`}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {idCardFile?.[0] ? (
              <>
                <CheckCircle2 className="w-8 h-8 text-green-500" />
                <p className="text-xs text-gray-500">{idCardFile[0].name}</p>
                <p className="text-xs text-gray-400 mt-1">
                  Click to change the uploaded file.
                </p>
              </>
            ) : (
              <div className="flex items-center flex-col justify-center gap-1">
                <Upload className="w-8 h-8 text-violet-400 mb-2" />
                <p className="text-xs text-gray-500">Upload an Identity Card</p>
                <p className="text-xs text-gray-400 mt-1">
                  JPG, PNG, or PDF files only allowed.
                </p>
                <p className="text-[10px] text-red-400">
                  Maximum file size 5MB
                </p>
              </div>
            )}
          </div>
          <input
            type="file"
            className="hidden"
            accept="image/*, .pdf"
            {...register("idCard", {
              required: "Identity document is required.",
            })}
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-semibold shadow-lg transition-all transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed mt-4"
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Creating Account...
          </span>
        ) : (
          "Create Account"
        )}
      </button>
    </form>
  );
};

export default SignUp;
