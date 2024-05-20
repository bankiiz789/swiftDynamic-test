import React from "react";
import FormHeader from "./formHeader";
import FormContent from "./formContent";
import FormTable from "./formTable";
import "../../style/components/form/formContainer.scss";

type Props = {};

const FormContainer: React.FC = ({}: Props) => {
  return (
    <div className="form-container">
      <FormHeader />
      <FormContent />
      <FormTable />
    </div>
  );
};

export default FormContainer;
