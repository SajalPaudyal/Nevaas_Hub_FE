/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import privateApi from "../../api/privateApi";
import React from "react";
import {
  Home,
  User,
  Users,
  Image as ImageIcon,
  MapPin,
  BadgeIndianRupee,
  Briefcase,
  Calendar,
  Bath,
  Bed,
  ChevronDown,
  AlertCircle,
  GraduationCap,
  Cigarette,
  PawPrint,
  HousePlus,
} from "lucide-react";

interface RoommateFormProps {
  initialData?: any;
  onSuccess: () => void;
}

const RoommateOpeningForm: React.FC<RoommateFormProps> = ({
  initialData,
  onSuccess,
}) => {
  const isEditMode = !!initialData?.id;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: initialData || {
      isSmoker: false,
      hasPets: false,
      prefMinAge: 18,
      prefMaxAge: 40,
    },
  });

  const selectedFile = watch("roommateOpeningImage");

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    const formData = new FormData();

    const fields = [
      "title",
      "description",
      "price",
      "address",
      "beds",
      "baths",
      "occupation",
      "age",
      "gender",
      "faculty",
      "education",
      "isSmoker",
      "hasPets",
      "prefGender",
      "prefMinAge",
      "prefMaxAge",
    ];

    fields.forEach((field) => {
      if (data[field] !== undefined) {
        formData.append(field, data[field]);
      }
    });

    formData.append("latitude", "27.7103");
    formData.append("longitude", "85.3222");

    if (data.roommateOpeningImage?.[0]) {
      formData.append("roommateOpeningImage", data.roommateOpeningImage[0]);
    }

    try {
      if (isEditMode) {
        console.log("Modifying ID:", initialData.id);
        await privateApi.put(`/roommate-openings/${initialData.id}`, formData);
        toast.success("Successfully updated!");
      } else {
        await privateApi.post("/roommate-openings", formData);
        toast.success("Successfully posted!");
      }
      onSuccess();
    } catch (e: any) {
      console.error("Frontend Error:", e.response?.data);
      toast.error(e.response?.data?.message || "Operation failed.");
    }
  };

  const ErrorMsg = ({ name }: { name: string }) => {
    const error = (errors as any)[name];
    if (!error) return null;
    return (
      <p className="text-red-500 text-[10px] mt-1 flex items-center gap-1 ml-2">
        <AlertCircle className="w-3 h-3" /> {error.message}
      </p>
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-6 space-y-6 max-h-[85vh] overflow-y-auto bg-white"
    >
      <div className="text-center mb-4">
        <h2 className="text-2xl font-black text-gray-900 ">
          {isEditMode ? "Modify Vacancy" : "Create Roommate Vacancy"}
        </h2>
      </div>

      <div className="space-y-4">
        <label className="text-[10px] font-bold text-violet-500 uppercase tracking-widest flex items-center gap-2">
          <Home className="w-3 h-3" /> Room & Location
        </label>

        <div className="relative">
          <HousePlus className="absolute left-3 top-3.5 h-5 w-5 text-violet-400" />
          <input
            {...register("title", { required: "Title is required" })}
            placeholder="Listing Title"
            className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl outline-none text-sm border border-transparent focus:ring-1 ring-violet-200"
          />
          <ErrorMsg name="title" />
        </div>
        <div className="relative">
          <textarea
            {...register("description")}
            placeholder="Please in short describe your room."
            className="w-full h-20 pr-4 py-3 bg-gray-50 rounded-xl outline-none text-sm border border-transparent focus:ring-1 ring-violet-200"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <BadgeIndianRupee className="absolute left-3 top-3.5 h-5 w-5 text-violet-400" />
            <input
              {...register("price", { required: "Required" })}
              type="number"
              placeholder="Rent/Mo"
              className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl outline-none text-sm"
            />
          </div>
          <div className="relative flex items-center">
            <MapPin className="absolute left-3 h-5 w-5 text-violet-400" />
            <select
              {...register("address", { required: "Required" })}
              className="w-full pl-10 pr-10 py-3 bg-gray-50 rounded-xl outline-none text-sm appearance-none"
            >
              <option value="">Location</option>
              <option value="Kathmandu">Kathmandu</option>
              <option value="Bhaktapur">Bhaktapur</option>
              <option value="Lalitpur">Lalitpur</option>
            </select>
            <ChevronDown className="absolute right-3 w-4 h-4 text-gray-400" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <Bed className="absolute left-3 top-3.5 h-5 w-5 text-violet-400" />
            <input
              type="number"
              {...register("beds", { required: true })}
              placeholder="Beds"
              className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl outline-none text-sm"
            />
          </div>
          <div className="relative">
            <Bath className="absolute left-3 top-3.5 h-5 w-5 text-violet-400" />
            <input
              type="number"
              {...register("baths", { required: true })}
              placeholder="Baths"
              className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl outline-none text-sm"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t border-gray-100">
        <label className="text-[10px] font-bold text-violet-500 uppercase tracking-widest flex items-center gap-2">
          <User className="w-3 h-3" /> About You
        </label>

        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <Briefcase className="absolute left-3 top-3.5 h-5 w-5 text-violet-400" />
            <input
              {...register("occupation", { required: true })}
              placeholder="Occupation"
              className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl outline-none text-sm"
            />
          </div>
          <div className="relative">
            <Calendar className="absolute left-3 top-3.5 h-5 w-5 text-violet-400" />
            <input
              {...register("age", { required: true, min: 18 })}
              type="number"
              placeholder="Age"
              className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl outline-none text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <select
            {...register("gender", { required: true })}
            className="p-3 bg-gray-50 rounded-xl outline-none text-sm"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <select
            {...register("faculty", { required: true })}
            className="p-3 bg-gray-50 rounded-xl outline-none text-sm"
          >
            <option value="others">Others Faculty</option>
            <option value="science">Science</option>
            <option value="management">Management</option>
            <option value="humanities">Humanities</option>
          </select>
        </div>

        <div className="relative flex items-center">
          <GraduationCap className="absolute left-3 h-5 w-5 text-violet-400" />
          <select
            {...register("education", { required: true })}
            className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl outline-none text-sm appearance-none"
          >
            <option value="high-school">High School</option>
            <option value="bachelor">Bachelor</option>
            <option value="master">Master</option>
            <option value="phd">PhD</option>
            <option value="undisclosable">Undisclosable</option>
          </select>
        </div>

        <div className="flex gap-4">
          <label className="flex-1 flex items-center justify-center gap-2 p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-violet-50 transition-colors">
            <input
              type="checkbox"
              {...register("isSmoker")}
              className="w-4 h-4 accent-violet-500"
            />
            <Cigarette className="w-4 h-4 text-violet-400" />
            <span className="text-xs font-bold text-gray-600">Smoker</span>
          </label>
          <label className="flex-1 flex items-center justify-center gap-2 p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-violet-50 transition-colors">
            <input
              type="checkbox"
              {...register("hasPets")}
              className="w-4 h-4 accent-violet-500"
            />
            <PawPrint className="w-4 h-4 text-violet-400" />
            <span className="text-xs font-bold text-gray-600">Has Pets</span>
          </label>
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t border-gray-100">
        <label className="text-[10px] font-bold text-violet-500 uppercase tracking-widest flex items-center gap-2">
          <Users className="w-3 h-3" /> Preferences
        </label>

        <div className="space-y-4">
          <select
            {...register("prefGender", { required: true })}
            className="w-full p-3 bg-gray-50 rounded-xl outline-none text-sm"
          >
            <option value="other">Any Gender</option>
            <option value="male">Male Only</option>
            <option value="female">Female Only</option>
          </select>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-[9px] font-black text-gray-400 uppercase ml-2">
                Min Age
              </p>
              <input
                type="number"
                {...register("prefMinAge")}
                className="w-full p-3 bg-gray-50 rounded-xl outline-none text-sm"
              />
            </div>
            <div className="space-y-1">
              <p className="text-[9px] font-black text-gray-400 uppercase ml-2">
                Max Age
              </p>
              <input
                type="number"
                {...register("prefMaxAge")}
                className="w-full p-3 bg-gray-50 rounded-xl outline-none text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">
          Vacancy Photo
        </label>
        <label
          className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-2xl cursor-pointer transition-all ${
            selectedFile?.[0]
              ? "border-green-400 bg-green-50"
              : "border-gray-200 bg-gray-50"
          }`}
        >
          <div className="flex flex-col items-center justify-center">
            {selectedFile?.[0] ? (
              <p className="text-[10px] text-green-700 font-bold">
                {selectedFile[0].name}
              </p>
            ) : (
              <>
                <ImageIcon className="w-8 h-8 text-violet-400 mb-2" />
                <p className="text-[10px] text-gray-400">
                  Click to upload photo
                </p>
              </>
            )}
          </div>
          <input
            type="file"
            {...register("roommateOpeningImage", {
              required: isEditMode ? false : "Photo is required",
            })}
            className="hidden"
            accept="image/*"
          />
        </label>
        <ErrorMsg name="roommateOpeningImage" />
      </div>

      <button
        disabled={isSubmitting}
        type="submit"
        className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold shadow-xl active:scale-[0.98] transition-all disabled:opacity-50 mt-4"
      >
        {isSubmitting
          ? "Processing..."
          : isEditMode
          ? "Save Changes"
          : "Post Roommate Vacancy"}
      </button>
    </form>
  );
};

export default RoommateOpeningForm;
