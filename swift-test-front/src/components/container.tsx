import React, { ReactNode } from "react";
import "../style/components/container.scss";

type Props = {
  children: ReactNode;
};

const Container: React.FC<Props> = ({ children }) => {
  return <div className="container">{children}</div>;
};

export default Container;
