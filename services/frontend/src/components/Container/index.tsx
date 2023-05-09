import React, { ReactNode } from "react";

type ContainerProps = {
  className?: string;
  children: ReactNode;
};

const Container: React.FC<ContainerProps> = (props) => {
  return (
    <div
      className={`container mx-auto p-8 xl:px-0 ${
        props.className ? props.className : ""
      }`}
    >
      {props.children}
    </div>
  );
};

export default Container;
