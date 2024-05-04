"use client";
import React, { useEffect, useState } from "react";
import { Space, Table, Card, Button, Spin } from "antd";
import { message } from "antd";
import { PlusCircleOutlined, DownCircleOutlined } from "@ant-design/icons";
import { CSVLink } from "react-csv";
import { useRouter } from "next/navigation";
import axios from "axios";
const productlist = () => {
  const router = useRouter();
  const [editData, setEditData] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    getProductDetails();
  }, []);

  const getProductDetails = () => {
    axios
      .get("/api/product", {})
      .then((res) => {
        setEditData(res?.data?.data);
        setLoader(false);
      })
      .catch((err) => {
        setLoader(false);
      });
  };

  const handleEdit = (id) => {
    localStorage.setItem("productCode", id);
    router.push("/productdetails");
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
          <Button onClick={() => handleEdit(record.productCode)}>View</Button>
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
              <Button>
                {" "}
                <DownCircleOutlined />
                Download List
              </Button>
            </CSVLink>
          </>
        }
        style={{ margin: 60 }}
      >
        <Table columns={columns} dataSource={editData} />
      </Card>
      <Spin spinning={loader} fullscreen />
    </div>
  );
};
export default productlist;
