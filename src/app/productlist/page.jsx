"use client";
import React, { useEffect, useState } from "react";
import { Space, Table, Card, Button } from "antd";
import { message } from "antd";
import { PlusCircleOutlined, DownCircleOutlined } from "@ant-design/icons";
import { CSVLink } from "react-csv";
import { useRouter } from "next/navigation";
import axios from "axios";
const productlist = () => {
  const router = useRouter();
  const [editData, setEditData] = useState([]);

  useEffect(() => {
    getProductDetails();
  }, []);

  const getProductDetails = () => {
    axios
      .get("/api/product", {})
      .then((res) => {
        console.log("res", res);
        setEditData(res?.data?.data);
        // setsaveClicked(false);
      })
      .catch((err) => {
        console.log("error", err);
        // setsaveClicked(false);
        // errorMessage(err?.response?.data?.error);
      });
  };

  const handleEdit = (id) => {
    setIsVisible(true);
    const data = {
      productCode: id,
    };
    axios
      .post("/api/productedit", { ...data })
      .then((res) => {
        console.log("res", res?.data?.data);
        setEditData(res?.data?.data);
      })
      .catch((err) => {
        console.log("error", err);
        // setsaveClicked(false);
        // errorMessage(err?.response?.data?.error);
      });
  };
  const columns = [
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Product Code ",
      dataIndex: "productCode",
      key: "productCode",
    },
    {
      title: "Product Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Product Description",
      dataIndex: "productDescription",
      key: "productDescription",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleEdit(record.productCode)}>Edit {record.id}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];
  const logOut = async () => {
    try {
      await axios.get("/api/logout");
      router.push("/login");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div>
      <Button onClick={() => logOut()}>Logout</Button>
      <Card
        title="Product Details"
        extra={
          <>
            <CSVLink
              filename={"Expense_Table.csv"}
              data={editData}
              onClick={() => {
                message.success("The file is downloading");
              }}
            >
              <DownCircleOutlined style={{ fontSize: 28, marginRight: 20 }} />
            </CSVLink>
            <PlusCircleOutlined
              style={{ fontSize: 28 }}
              onClick={() => handleCliked()}
            />
          </>
        }
        style={{ margin: 60 }}
      >
        <Table columns={columns} dataSource={editData} />
      </Card>
    </div>
  );
};
export default productlist;
