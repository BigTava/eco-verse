import React from "react";
import clsx from "clsx";
import Label from "../Label";
import { formClasses } from "../styles";

type TextFieldProps = {
  id: string;
  label: string;
  className: string;
  children: React.ReactNode;
  name: string;
};

const SelectField: React.FC<TextFieldProps> = ({
  id,
  label,
  className = "",
  ...props
}) => {
  return (
    <div className={className}>
      {label && <Label id={id}>{label}</Label>}
      <select id={id} {...props} className={clsx(formClasses, "pr-8")} />
    </div>
  );
};

export default SelectField;
