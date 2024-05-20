import React, { useState } from "react";
import ButtonGlobal from "../../components/button";
import { useTranslation } from "react-i18next";
import { Flex, Form, Input, Select, DatePicker, Radio } from "antd";
import { User, createUser } from "../../reducer/user/UserReducer";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import "../../style/components/form/formcontent.scss";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type Props = {};

const userInitialState: Omit<User, "id"> = {
  prefixName: "",
  firstName: "",
  lastName: "",
  birthDate: "",
  gender: "",
  nationality: "",
  citizenId: "",
  phoneCode: "",
  phoneNumber: "",
  passport: undefined,
  expectSalary: 0,
};

const FormContent: React.FC = ({}: Props) => {
  const { t } = useTranslation();
  const [user, setUser] = useState(userInitialState);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const dateFormat = "MM/DD/YYYY";

  const handleReset = () => {
    setUser(userInitialState);
  };

  const handleSubmit = async (values: any) => {
    const citizenId = `${values.citizenId1}${values.citizenId2}${values.citizenId3}${values.citizenId4}`;
    const newUser = { ...values, citizenId };
    delete newUser.citizenId1;
    delete newUser.citizenId2;
    delete newUser.citizenId3;
    delete newUser.citizenId4;
    dispatch(createUser(newUser))
      .then(() => {
        toast.success("Create user success");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <>
      <div className="form-wrapper">
        <ButtonGlobal
          onClick={() => navigate("/")}
          className="home-button"
          text={t("home")}
        />
        {/* row 1 Salutation FirstName LastName*/}
        <Form
          className="form-content"
          initialValues={user}
          onFinish={handleSubmit}
          onValuesChange={(allValues) => {
            setUser({ ...user, ...allValues });
          }}
        >
          <Flex gap="8px">
            {/* prefix */}
            <Form.Item
              label={t("prefix")}
              name="prefixName"
              rules={[
                { required: true, message: "Please enter your salutation" },
              ]}
              // wrapperCol={}
              style={{ width: "180px" }}
            >
              <Select
                options={[
                  { value: t("mr"), label: t("mr") },
                  { value: t("ms"), label: t("ms") },
                  { value: t("mrs"), label: t("mrs") },
                ]}
                placeholder={t("prefix")}
              />
            </Form.Item>
            {/* First name */}
            <Form.Item
              label={t("firstName")}
              name="firstName"
              rules={[
                { required: true, message: "Please enter your first name" },
              ]}
              style={{ width: "400px" }}
            >
              <Input name="firstName" />
            </Form.Item>
            {/* Last name */}
            <Form.Item
              label={t("lastName")}
              name="lastName"
              rules={[
                { required: true, message: "Please enter your last name" },
              ]}
              style={{ width: "400px" }}
            >
              <Input name="lastName" />
            </Form.Item>
          </Flex>
          {/* row 2  BirthDate and Nationality*/}
          <Flex gap="2rem">
            {/* BirthDate */}
            <Form.Item
              label={t("birthDate")}
              name="birthDate"
              rules={[
                { required: true, message: "Please enter your Birth Date" },
              ]}
            >
              <DatePicker
                placeholder={t("date")}
                format={dateFormat}
                onChange={(_, dateString) => {
                  setUser({ ...user, birthDate: dateString });
                }}
              />
            </Form.Item>
            {/* Nationality */}
            <Form.Item
              label={t("nationality")}
              name="nationality"
              rules={[
                { required: true, message: "Please select your Nationality" },
              ]}
              style={{ width: "400px" }}
            >
              <Select
                placeholder="-- choose --"
                options={[
                  { value: t("Thai"), label: t("Thai") },
                  { value: t("Japanese"), label: t("Japanese") },
                  { value: t("Chinese"), label: t("Chinese") },
                  { value: t("American"), label: t("American") },
                ]}
              />
            </Form.Item>
          </Flex>
          {/* row 3 Citizen Id*/}
          <Form.Item
            label={t("citizenId")}
            // name="citizenId"
            style={{ width: "fit-content" }}
          >
            <Flex gap="1rem" align="baseline">
              <Form.Item name="citizenId1" noStyle>
                <Input style={{ width: 80 }} maxLength={5} />
              </Form.Item>
              <span>-</span>
              <Form.Item name="citizenId2" noStyle>
                <Input style={{ width: 80 }} maxLength={5} />
              </Form.Item>
              <span>-</span>
              <Form.Item name="citizenId3" noStyle>
                <Input maxLength={2} style={{ width: 50 }} />
              </Form.Item>
              <span>-</span>
              <Form.Item name="citizenId4" noStyle>
                <Input maxLength={1} style={{ width: 40 }} />
              </Form.Item>
            </Flex>
          </Form.Item>
          {/* row 4 Gender */}
          <Form.Item
            label={t("gender")}
            name="gender"
            rules={[{ required: true, message: "Please select your Gender" }]}
          >
            <Radio.Group>
              <Radio value={t("male")}>{t("male")}</Radio>
              <Radio value={t("female")}>{t("female")}</Radio>
              <Radio value={t("other")}>{t("other")}</Radio>
            </Radio.Group>
          </Form.Item>
          {/* row 5 Phone number */}
          <Form.Item
            label={t("phone")}
            name="phoneNumber"
            rules={[
              { required: true, message: "Please enter your phone number" },
            ]}
            style={{ margin: 0 }}
          >
            <Flex gap="1rem" align="baseline">
              <Form.Item name="phoneCode">
                <Select
                  options={[{ value: "0", label: "+66" }]}
                  style={{ width: 100 }}
                />
              </Form.Item>
              <span>-</span>
              <Form.Item>
                <Input maxLength={9} style={{ width: "400px" }} />
              </Form.Item>
            </Flex>
          </Form.Item>
          {/* row 6 Passport */}
          <Form.Item
            label={t("passport")}
            name="passport"
            style={{ width: "400px" }}
          >
            <Input />
          </Form.Item>
          {/* row 7 Expect Salary */}
          <Form.Item
            label={t("expectSalary")}
            name="expectSalary"
            rules={[
              { required: true, message: "Please enter your Expect salary" },
            ]}
          >
            <Flex gap="8rem">
              <Input style={{ width: 400 }} />
              <Flex gap="3rem">
                <ButtonGlobal
                  onClick={() => handleReset()}
                  text={t("reset")}
                  htmlType="reset"
                />
                <ButtonGlobal text={t("submit")} htmlType="submit" />
              </Flex>
            </Flex>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default FormContent;
