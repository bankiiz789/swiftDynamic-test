import React from "react";
import { Flex } from "antd";
import { useTranslation } from "react-i18next";
import LanguagesSelector from "../../components/languagesSelector";
import "../../style/components/form/formHeader.scss";

type Props = {};

const FormHeader: React.FC = ({}: Props) => {
  const { t } = useTranslation();
  return (
    <Flex justify="space-between" align="center" className="form-header">
      <h1>{t("form&table")}</h1>
      <LanguagesSelector width={120} thai="Thai" eng="English" />
    </Flex>
  );
};

export default FormHeader;
