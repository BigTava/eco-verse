import React from "react";
import Label from "../Label";
import { formClasses } from "../styles";

type TextFieldProps = {
  id?: string;
  label?: string;
  type?: string;
  className?: string;
  name?: string;
  autoComplete?: string;
  required?: boolean;
};

const TextField: React.FC<TextFieldProps> = ({
  id,
  label,
  type = "text",
  className = "",
  ...props
}) => {
  return (
    <div className={className}>
      {label && <Label id={id}>{label}</Label>}
      <input id={id} type={type} {...props} className={formClasses} />
    </div>
  );
};

export default TextField;
