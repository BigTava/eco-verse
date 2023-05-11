import React from "react";
import clsx from "clsx";

import { baseStyles, variantStyles } from "./styles";

type DefaultButtonProps = {
  variant?: "solid" | "outline";
  color?: "slate" | "blue" | "white";
  className?: string;
  href?: string;
  type?: "button" | "submit" | "reset";
  children?: React.ReactNode;
};

export const DefaultButton: React.FC<DefaultButtonProps> = ({
  variant = "solid",
  color = "slate",
  className,
  href,
  ...props
}) => {
  className = clsx(
    baseStyles[variant],
    variantStyles[variant][color],
    className
  );

  return href ? (
    <a href={href} className={className} {...props} />
  ) : (
    <button className={className} {...props} />
  );
};
