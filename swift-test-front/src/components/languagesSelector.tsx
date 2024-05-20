import React from "react";
import { Select } from "antd";
import "../style/components/changeLanguagesButton.scss";
import { useTranslation } from "react-i18next";

type Props = {
  width: number;
  thai: String;
  eng: String;
  className?: string;
};

const LanguagesSelector: React.FC<Props> = ({
  width,
  thai,
  eng,
  className,
}) => {
  const { i18n } = useTranslation();

  const handleChangeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Select
      className={`changeLanguages ${className}`}
      defaultValue={i18n.language}
      style={{ width }}
      onChange={handleChangeLanguage}
      options={[
        { value: "en", label: eng },
        { value: "th", label: thai },
      ]}
    />
  );
};
export default LanguagesSelector;
