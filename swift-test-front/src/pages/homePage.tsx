import React from "react";
import Container from "../components/container";
import CardBox from "../components/cardBox";
import LanguagesSelector from "../components/languagesSelector";
import { Space } from "antd";
import { useTranslation } from "react-i18next";

const HomePage: React.FC<{}> = () => {
  const { t } = useTranslation();
  return (
    <Container>
      <Space size="middle">
        <LanguagesSelector width={80} thai="TH" eng="EN" className="for-home" />
        <CardBox
          path="/geometry"
          title={t("test1")}
          description={t("layout&style")}
        />
        <CardBox
          path="/form"
          title={t("test2")}
          description={t("form&table")}
        />
      </Space>
    </Container>
  );
};

export default HomePage;
