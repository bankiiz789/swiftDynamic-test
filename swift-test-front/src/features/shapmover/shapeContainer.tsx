import React from "react";
import ShapeHeader from "./shapeHeader";
import LanguagesSelector from "../../components/languagesSelector";
import ShapeGrid from "./shapgrid";
import "../../style/components/shape/ShapeContainer.scss";
// type Props = {};

const ShapeContainer: React.FC = () => {
  return (
    <div className="shape-container">
      <LanguagesSelector width={80} thai="TH" eng="EN" className="for-layout" />
      <ShapeHeader />
      <div className="wrapper">
        <div className="shape-content">
          <ShapeGrid />
        </div>
      </div>
    </div>
  );
};

export default ShapeContainer;
