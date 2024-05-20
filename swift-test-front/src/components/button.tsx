import React from "react";
import { Button } from "antd";

type Props = {
  text: string;
  onClick?: any;
  htmlType?: "button" | "submit" | "reset";
  className?: string | undefined;
};

const ButtonGlobal: React.FC<Props> = ({
  text,
  onClick,
  htmlType,
  className,
}) => {
  return (
    <Button
      className={`button ${className}`}
      onClick={onClick}
      htmlType={htmlType}
    >
      {text}
    </Button>
  );
};

export default ButtonGlobal;
