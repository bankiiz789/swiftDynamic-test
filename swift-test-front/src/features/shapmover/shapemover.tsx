import React from "react";
import ShapeBox from "../../components/shapeBox";
import { Space } from "antd";
import {
  CaretUpFilled,
  CaretDownFilled,
  CaretLeftFilled,
  CaretRightFilled,
} from "@ant-design/icons";
import "../../style/components/shape/ShapeMover.scss";
import { useTranslation } from "react-i18next";

type Props = {
  handlePosition: any;
  handleMoveLeft: any;
  handleMoveRight: any;
};

//Function ShapeMover start --------
const ShapeMover: React.FC<Props> = ({
  handlePosition,
  handleMoveLeft,
  handleMoveRight,
}) => {
  const { t } = useTranslation();
  const arrow = [
    {
      description: t("move-shape"),
      class: "left",
      element: <CaretLeftFilled />,
      fn: handleMoveLeft,
    },
    {
      description: t("move-position"),
      class: "up-down",
      element: (
        <div className="arrow-wrapper">
          <CaretUpFilled />
          <CaretDownFilled />
        </div>
      ),
      fn: handlePosition,
    },
    {
      description: t("move-shape"),
      class: "right",
      element: <CaretRightFilled />,
      fn: handleMoveRight,
    },
  ];
  return (
    <div className="shape-mover">
      <Space>
        {arrow.map((el) => (
          <ShapeBox
            onClick={() => el.fn()}
            key={el.class}
            name={el.description}
          >
            <div className={`shape-mover__icon`}>{el.element}</div>
          </ShapeBox>
        ))}
      </Space>
    </div>
  );
};

export default ShapeMover;
