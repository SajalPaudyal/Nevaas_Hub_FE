import { useForm, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import {api} from "../../api/axios";
import { type SignInUser } from "../../types/authenticationTypes";
import { AlertCircle, Eye, EyeClosed, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../store/slices/authSlices";
interface LoginFormProps {
  onSuccess: () => void;
}

const Login: React.FC<LoginFormProps> = ({ onSuccess }) => {


  const dispatch = useDispatch();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInUser>();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit: SubmitHandler<SignInUser> = async (data) => {
    try {
      const response = await api.post("/auth/login", data);
      if (response.status === 200) {
        dispatch(
          setCredentials({
            user: response.data.user,
            token: response.data.token,
          })
        );
        toast.success("User successfully logged in.");
        onSuccess();
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      const message =
        e.response?.data?.message || "Invalid email or password provided.";
      toast.error(message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 pt-2">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Log In to NevaasHub
        </h2>
        <p className="text-lg text-violet-600 mt-1">Welcome back</p>
        <p className="text-sm text-gray-600 mt-1">
          Let's find a comfort place for you together.
        </p>
      </div>

      <div className="space-y-1">
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-violet-400" />
          <input
            {...register("email", {
              required: "Please enter email to proceed.",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Please input a valid email address.",
              },
            })}
            type="email"
            placeholder="Email"
            className={`w-full pl-10 pr-4 py-3 bg-gray-50 border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } rounded-xl focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 outline-none transition-all text-sm`}
          />
        </div>
        {errors.email && (
          <p className="text-xs text-red-500 flex items-center gap-1 ml-1">
            <AlertCircle className="h-5 w-3" /> {errors.email.message}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-violet-400" />
          <input
            {...register("password", {
              required: "Please insert your password.",
            })}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className={`w-full pl-10 pr-4 py-3 bg-gray-50 border ${
              errors.password ? "border-red-500" : "border-gray-200"
            } rounded-xl focus:ring-violet-500/20 focus:border-violet-500 outline-none transition-all text-sm`}
          />

          {showPassword ? (
            <Eye
              className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-violet-400"
              onClick={() => setShowPassword(!showPassword)}
            />
          ) : (
            <EyeClosed
              className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-violet-400"
              onClick={() => setShowPassword(!showPassword)}
            />
          )}
        </div>
        {errors.password && (
          <p className="text-sm text-red-500 flex items-center gap-1 ml-1">
            <AlertCircle className="h-3 w-3" /> {errors.password.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 bg-gray-900 hover:bg-gray-700 text-white rounded-xl font-semibold shadow-lg transition-all transform active:scale-[0.98] disabled:opacity-70 flex justify-center items-center gap-2"
      >
        {isSubmitting ? "Signing In..." : "Sign In"}
      </button>
    </form>
  );
};
export default Login;
