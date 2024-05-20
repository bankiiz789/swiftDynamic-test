import React, { useState } from "react";
import ShapeBox from "../../components/shapeBox";
import { Space } from "antd";
import ShapeMover from "./shapemover";
import "../../style/components/shape/ShapeGrid.scss";

const geometry = [
  "circle",
  "square",
  "rectangle",
  "ellipse",
  "parallel",
  "trapezoid",
];

const ShapeGrid: React.FC = () => {
  const [shapes, setShapes] = useState<string[]>(geometry);
  const [movePosition, setPosition] = useState<boolean>(false);

  // Move left function ******************
  const handleMoveLeft = (): void => {
    if (shapes.length > 1) {
      let firstElement = shapes[0];

      const newShapes = shapes.slice(1).concat(firstElement);

      setShapes(newShapes);
    }
  };

  // Move right function **********************
  const handleMoveRight = (): void => {
    if (shapes.length > 1) {
      let lastElement = shapes[shapes.length - 1];

      const newShapes = [lastElement].concat(
        shapes.slice(0, shapes.length - 1)
      );

      setShapes(newShapes);
    }
  };

  // Move Position Function *******************
  const handlePosition = (): void => {
    setPosition((prev) => !prev);
  };
  // Random Position Function *****************
  const handleRandomPosition = (index: number): void => {
    const randomIndex = Math.floor(Math.random() * shapes.length);
    const newShapes = [...shapes];
    [newShapes[index], newShapes[randomIndex]] = [
      newShapes[randomIndex],
      newShapes[index],
    ];
    setShapes(newShapes);
  };
  const togglePositionUpper = movePosition ? "center" : "";
  const togglePositionLower = movePosition ? "end" : "";
  return (
    <>
      <ShapeMover
        handlePosition={handlePosition}
        handleMoveLeft={handleMoveLeft}
        handleMoveRight={handleMoveRight}
      />
      <div className="shape-grid">
        <div className={`upper ${togglePositionUpper}`}>
          <Space>
            {shapes.slice(0, 3).map((item, index) => (
              <ShapeBox onClick={() => handleRandomPosition(index)} key={item}>
                <div className={`geo ${item}`}></div>
              </ShapeBox>
            ))}
          </Space>
        </div>
        <div className={`lower ${togglePositionLower}`}>
          <Space>
            {shapes.slice(3).map((item, index) => (
              <ShapeBox
                onClick={() => handleRandomPosition(index + 3)}
                key={item}
              >
                <div className={`geo ${item}`}></div>
              </ShapeBox>
            ))}
          </Space>
        </div>
      </div>
    </>
  );
};

export default ShapeGrid;
