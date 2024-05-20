import React from "react";
import "../../style/components/shape/ShapeHeader.scss";
import { useTranslation } from "react-i18next";

type Props = {};

const ShapeHeader: React.FC = ({}: Props) => {
  const { t } = useTranslation();
  return <h1 className="shape-header">{t("layout&style")}</h1>;
};

export default ShapeHeader;
