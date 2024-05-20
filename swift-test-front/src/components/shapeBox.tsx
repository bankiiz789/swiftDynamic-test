import React, { ReactNode, useState } from "react";
// import { Card } from "antd";
import "../style/components/shape/ShapeBox.scss";

type Props = {
  children: ReactNode;
  name?: string;
  onClick?: any;
};

const ShapeBox: React.FC<Props> = ({ children, name, onClick }) => {
  const [blinkBg, setBlinkBg] = useState<boolean>();
  const [isHovered, setIsHovered] = useState(false);

  const handleOnMouseUp = () => {
    setBlinkBg(true);
  };
  const handleOnMouseDown = () => {
    setBlinkBg(false);
  };
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className={`shape-box ${isHovered ? "hovered" : ""} ${
        blinkBg ? "blink" : ""
      }`}
      onMouseDown={handleOnMouseUp}
      onMouseUp={handleOnMouseDown}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <div>{children}</div>
      {name ? <div className="shape-description">{name}</div> : null}
    </div>
  );
};

export default ShapeBox;
