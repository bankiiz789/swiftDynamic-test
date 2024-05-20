import React from "react";
import { Card } from "antd";
import { useNavigate } from "react-router-dom";
import "../style/components/cardBox.scss";

type Props = {
  title: string;
  description: string;
  path: string;
};

const CardBox: React.FC<Props> = ({ title, description, path }) => {
  const navigate = useNavigate();
  return (
    <Card
      className="card-box"
      onClick={() => navigate(path)}
      title={title}
      bordered={false}
      style={{ width: 300 }}
    >
      <p>{description}</p>
    </Card>
  );
};
export default CardBox;
