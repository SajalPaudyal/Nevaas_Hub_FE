/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import PropertyForm from "./PropertyForm";

const EditProperty = ({
  data,
  onSuccess,
}: {
  data: any;
  onSuccess: () => void;
}) => {
  return <PropertyForm initialData={data} onSuccess={onSuccess} />;
};

export default EditProperty;
