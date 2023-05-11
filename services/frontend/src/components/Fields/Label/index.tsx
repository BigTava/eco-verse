import React from "react";

type LabelProps = {
  id?: string;
  children?: React.ReactNode;
};

const Label: React.FC<LabelProps> = ({ id, children }) => {
  return (
    <label
      htmlFor={id}
      className="mb-3 block text-sm font-medium text-gray-700"
    >
      {children}
    </label>
  );
};

export default Label;
