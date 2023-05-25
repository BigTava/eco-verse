import React, { forwardRef } from "react";
import clsx from "clsx";

import { baseStyles, variantStyles } from "./styles";

type DefaultButtonProps = {
  variant?: "solid" | "outline";
  color?: "cyan" | "white" | "gray";
  className?: string;
  href?: string;
  type?: "button" | "submit" | "reset";
  children?: React.ReactNode;
};

/*eslint-disable*/
export const DefaultButton = forwardRef(function Button(
  {
    variant = "solid",
    color = "gray",
    className,
    href,
    ...props
  }: DefaultButtonProps,
  ref: any
) {
  className = clsx(
    baseStyles[variant],
    variantStyles[variant][color],
    className
  );

  return href ? (
    <a ref={ref} href={href} className={className} {...props} />
  ) : (
    <button ref={ref} className={className} {...props} />
  );
});
