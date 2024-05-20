import React, { useState } from "react";
import {
  Button,
  DatePicker,
  Flex,
  Form,
  Input,
  Modal,
  Radio,
  Select,
} from "antd";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import { User, editUser, fetchUsers } from "../../reducer/user/UserReducer";
import ButtonGlobal from "../../components/button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { toast } from "react-toastify";

interface FormEditProps {
  data: User;
}

const FormEdit: React.FC<FormEditProps> = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ ...data });
  const dispatch = useDispatch<AppDispatch>();
  const { currentPage } = useSelector((state: RootState) => state.users);
  const { t } = useTranslation();

  const dateFormat = "MM/DD/YYYY";

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEditSubmit = () => {
    dispatch(editUser({ data: formData, id: formData.id }))
      .then(() => {
        dispatch(fetchUsers(currentPage));
        toast.success("Edit completed");
        setIsModalOpen(false);
      })
      .catch((error) => {
        toast.error("Error creating user");
        console.log(error);
      });
  };

  const formattedBirthDate = Array.isArray(data.birthDate)
    ? data.birthDate[0]
    : data.birthDate;
  return (
    <>
      <Button onClick={showModal}>{t("edit")}</Button>
      <Modal
        title="Edit Information"
        open={isModalOpen}
        footer={null}
        width={800}
        onCancel={handleCancel}
      >
        <Form
          onFinish={handleEditSubmit}
          onValuesChange={(allValues) => {
            setFormData({ ...formData, ...allValues });
          }}
        >
          <Form.Item label="Prefix" style={{ width: 150 }}>
            <Select
              placeholder="prefix"
              options={[
                { value: t("mr"), label: t("mr") },
                { value: t("ms"), label: t("ms") },
                { value: t("mrs"), label: t("mrs") },
              ]}
              defaultValue={formData.prefixName}
              onChange={(value) => handleSelectChange("prefixName", value)}
            />
          </Form.Item>
          <Form.Item label={t("firstName")}>
            <Input
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item label={t("lastName")}>
            <Input
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item label={t("birthDate")}>
            <DatePicker
              format={dateFormat}
              placeholder={t("date")}
              defaultValue={
                formattedBirthDate ? dayjs(formattedBirthDate) : null
              }
              onChange={(_, dateString) => {
                setFormData({ ...formData, birthDate: dateString });
              }}
            />
          </Form.Item>
          <Form.Item label={t("nationality")}>
            <Select
              placeholder="-- choose --"
              options={[
                { value: "Thai", label: t("Thai") },
                { value: "Japanese", label: t("Japanese") },
                { value: "Chinese", label: t("Chinese") },
                { value: "American", label: t("American") },
              ]}
              defaultValue={formData.nationality}
              onChange={(value) => handleSelectChange("nationality", value)}
            />
          </Form.Item>
          <Form.Item label={t("citizenId")}>
            <Input
              name="citizenId"
              value={formData.citizenId}
              onChange={handleInputChange}
              maxLength={13}
            />
          </Form.Item>
          <Form.Item label={t("gender")} name="gender">
            <Radio.Group
              defaultValue={formData.gender}
              onChange={(e) => handleSelectChange("gender", e.target.value)}
            >
              <Radio value={t("male")}>{t("male")}</Radio>
              <Radio value={t("female")}>{t("female")}</Radio>
              <Radio value={t("other")}>{t("other")}</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label={t("phone")}
            name="phoneNumber"
            style={{ margin: 0 }}
          >
            <div style={{ display: "flex", gap: "1rem" }}>
              <Form.Item name="phoneCode">
                <Select
                  options={[
                    {
                      value: "0",
                      label: `+66`,
                    },
                  ]}
                  style={{ width: 100 }}
                  defaultValue={formData.phoneCode}
                  onChange={(value) => handleSelectChange("phoneCode", value)}
                />
              </Form.Item>
              <span>-</span>
              <Form.Item>
                <Input
                  name="phoneNumber"
                  maxLength={9}
                  style={{ width: "400px" }}
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                />
              </Form.Item>
            </div>
          </Form.Item>
          <Form.Item
            label={t("passport")}
            name="passport"
            style={{ width: "400px" }}
          >
            <Input
              name="passport"
              value={formData.passport}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item label={t("expectSalary")}>
            <Input
              name="expectSalary"
              style={{ width: 400 }}
              value={formData.expectSalary}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Flex gap="3rem" justify="end">
            <ButtonGlobal
              onClick={() => handleCancel()}
              text="cancel"
              htmlType="button"
            />
            <ButtonGlobal text={t("submit")} htmlType="submit" />
          </Flex>
        </Form>
      </Modal>
    </>
  );
};

export default FormEdit;
