/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm, type SubmitHandler } from "react-hook-form";
import {api} from "../../api/axios";
import toast from "react-hot-toast";
import type React from "react";
import {
  BadgeIndianRupee,
  Bath,
  Bed,
  File,
  Home,
  Image,
  MapPin,
} from "lucide-react";

interface PropertyFormProps {
  initialData?: any;
  onSuccess: () => void;
}

const PropertyForm: React.FC<PropertyFormProps> = ({
  initialData,
  onSuccess,
}) => {
  const isEditMode = !initialData;

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: initialData || {
      beds: 1,
      baths: 1,
    },
  });

  const onSubmit: SubmitHandler<any> = async (data:any) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("address", data.address);
    formData.append("beds", data.beds);
    formData.append("baths", data.baths);
    formData.append("latitude", "27.7103");
    formData.append("longitude", "85.3222");

    if (data.propertyImage?.[0]) {
      formData.append("propertyImage", data.propertyImage[0]);
    }

    try {
      if (isEditMode) {
        await api.put(`/properties/${initialData.id}`, formData);
        toast.success("Property successfully updated.");
      } else {
        await api.post("/properties", formData);
        toast.success(
          "Congratulation, property successfully added, let's wait for your new tenant."
        );
      }
      onSuccess();
    } catch (e: any) {
      toast.error(
        e.response?.data?.message ||
          "Something went wrong while handling with property."
      );
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-6 space-y-4 max-h-[80vh] overflow-y-auto"
    >
      <div className="text-center mb-6">
        <h2 className="text-2xl font-black text-gray-900">
          {isEditMode ? "Edit your property" : "Add a new property."}
        </h2>
      </div>

      <div className="relative">
        <Home className="absolute left-3 top-4 h-5 w-5 text-violet-400" />
        <input
          {...register("title", { required: true })}
          placeholder="Title"
          className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl outline-none focus:border-violet-500 text-sm"
        />
      </div>

      <div className="relative">
        <File className="absolute left-3 top-4 h-5 w-5 text-violet-400" />
        <input
          {...register("description")}
          placeholder="Describe your place..."
          className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl outline-none focus:border-violet-500 text-sm h-24"
        />
      </div>

      <div className="relative">
        <MapPin className="absolute left-3 top-4 h-5 w-5 text-violet-400" />
        <select
          {...register("address", { required: true })}
          className="w-full pl-10 pr-4 py-3 bg-gray-50 border rounded-xl outline-none focus:border-violet-500 text-sm appearance-none"
        >
          <option value="Kathmandu">Kathmandu</option>
          <option value="Bhaktapur">Bhaktapur</option>
          <option value="Lalitpur">Lalitpur</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="relative col-span-2">
          <BadgeIndianRupee className="absolute left-3 top-4 h-5 w-5 text-violet-400" />
          <input
            {...register("price", { required: true })}
            type="number"
            placeholder="Rent per month in Rs."
            className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl outline-none focus:border-violet-500 text-sm h-24"
          />
        </div>

        <div className="relative">
          <Bath className="absolute left-3 top-4 h-5 w-5 text-violet-400" />
          <input
            {...register("beds")}
            type="number"
            placeholder="Bathrooms/Toilets"
            className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl outline-none focus:border-violet-500 text-sm h-24"
          />
        </div>

        <div className="relative">
          <Bed className="absolute left-3 top-4 h-5 w-5 text-violet-400" />
          <input
            {...register("beds")}
            placeholder="Bedrooms"
            className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl outline-none focus:border-violet-500 text-sm h-24"
          />
        </div>
      </div>

      <select
        {...register("type", { required: true })}
        className="w-full pl-10 pr-4 py-3 bg-gray-50 border rounded-xl outline-none focus:border-violet-500 text-sm appearance-none"
      >
        <option value="apartment">Apartment</option>
        <option value="flat">Flat</option>
        <option value="room">Room</option>
        <option value="house">House</option>
      </select>

      <div className="space-y-2">
        <label className="text-xs font-bold text-gray-500 ">
          Property Image
        </label>
        <div className="flex items-center justify-center w-full">
          <label className="flex flex-col items-center justify-center w-full h-32 border border-dashed border-pink-400 rounded-2xl cursor-pointer bg-gray-50 hover:bg-violet-50 hover:border-pink-600 transition-all">
            <div className="flex flex-col items-center justify-center pt-4 pb-5">
              <Image className="w-8 h-8 text-violet-500 mb-2" />
              <p className="text-xs text-gray-400">Upload your image here...</p>
            </div>
            <input
              type="file"
              {...register("propertyImage", { required: !isEditMode })}
              className="hidden"
              accept="image/*"
            />
          </label>
        </div>
      </div>

      <button
        disabled={isSubmitting}
        type="submit"
        className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold shadow-xl shadow-gray-200 active:-[0.98] transition-all disabled:opacity-70"
      >
        {isSubmitting
          ? "Processing..."
          : isEditMode
          ? "Edit Property"
          : "Add Property"}
      </button>
    </form>
  );
};

export default PropertyForm;
