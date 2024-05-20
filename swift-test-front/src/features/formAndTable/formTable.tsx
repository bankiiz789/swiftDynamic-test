import React, { useEffect, useState } from "react";
import { Table, Checkbox, Flex } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import ButtonGlobal from "../../components/button";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import {
  fetchUsers,
  setPage,
  deleteUser,
} from "../../reducer/user/UserReducer";
import FormEdit from "./formEdit";

type TableRowSelection<T> = TableProps<T>["rowSelection"];

interface DataType {
  key: number;
  name: string;
  gender: string;
  phone: string;
  nationality: string;
  manage: React.ReactNode;
}

const FormTable: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const { users, loading, currentPage, totalPages } = useSelector(
    (state: RootState) => state.users
  );
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();

  const data: DataType[] = users.map((item) => ({
    key: item.id,
    name: `${item.firstName} ${item.lastName}`,
    gender: item.gender,
    phone: `${item.phoneCode}${item.phoneNumber}`,
    nationality: item.nationality,
    manage: <FormEdit data={item} />,
  }));

  useEffect(() => {
    dispatch(fetchUsers(currentPage));
  }, [dispatch, currentPage, selectedRowKeys]);

  const handleTableChange = (pagination: any) => {
    dispatch(setPage(pagination.current));
  };

  const handleDelete = (id: React.Key[]) => {
    const numberIds = id.map((id) => Number(id));
    dispatch(deleteUser(numberIds));
    setSelectedRowKeys([]);
  };

  const columns: TableColumnsType<DataType> = [
    {
      title: t("name"),
      dataIndex: "name",
    },
    {
      title: t("gender"),
      dataIndex: "gender",
      sorter: (a, b) => a.gender.localeCompare(b.gender),
    },
    {
      title: t("phone"),
      dataIndex: "phone",
      sorter: (a, b) => a.phone.localeCompare(b.phone),
    },
    {
      title: t("nationality"),
      dataIndex: "nationality",
      sorter: (a, b) => a.nationality.localeCompare(b.nationality),
    },
    {
      title: t("manage"),
      dataIndex: "manage",
    },
  ];

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const handleSelectAllChange = (e: CheckboxChangeEvent) => {
    const checked = e.target.checked;
    setSelectAll(checked);
    if (checked) {
      const allKey = data.map((item) => item.key);
      setSelectedRowKeys(allKey);
      console.log(allKey);
    } else {
      setSelectedRowKeys([]);
    }
  };
  console.log(users);
  return (
    <>
      <Flex vertical gap="8px" style={{ paddingInline: "4rem" }}>
        <div>
          <Checkbox checked={selectAll} onChange={handleSelectAllChange}>
            {t("selectAll")}
          </Checkbox>
          <ButtonGlobal
            onClick={() => handleDelete(selectedRowKeys)}
            text={t("delete")}
          />
        </div>
        <Table
          // loading
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
          pagination={{ current: currentPage, total: totalPages * 10 }}
          onChange={handleTableChange}
          loading={loading}
        />
      </Flex>
    </>
  );
};

export default FormTable;
