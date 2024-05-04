"use client";
import React, { useEffect, useState } from "react";
import {
  Space,
  Table,
  Tag,
  Card,
  Modal,
  Input,
  Form,
  Button,
  Spin,
} from "antd";
import { message, Upload, notification } from "antd";
import { PlusCircleOutlined, DownCircleOutlined } from "@ant-design/icons";
import { CSVLink } from "react-csv";
import { useRouter } from "next/navigation";
import axios from "axios";
const props = {
  name: "file",
  action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
  headers: {
    authorization: "authorization-text",
  },
  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const dashboard = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [datalist, setDatalist] = useState([]);
  const [editData, setEditData] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    getProductDetails();
  }, []);

  const getProductDetails = () => {
    setLoader(true);
    axios
      .get("/api/product", {})
      .then((res) => {
        setLoader(false);
        setDatalist(res?.data?.data);
      })
      .catch((error) => {
        setLoader(false);
        notification.open({
          message: error?.response?.data?.errorTitle,
          description: error?.response?.data?.errordescription,
        });
      });
  };
  const onFinish = (values) => {
    setLoader(true);
    const submitPayload = {
      productCode: values.productCode,
      productName: values.productName,
      quantity: parseInt(values.quantity),
      productDescription: values.productDescription,
      purchaseCount: 0,
      inStack: parseInt(values.quantity),
    };
    console.log("submit", submitPayload);
    axios
      .post("/api/product", { ...submitPayload })
      .then((res) => {
        setIsVisible(false);
        setLoader(false);
        notification.open({
          message: "Success",
          description: res?.data?.message,
        });
        window.location.reload();
      })
      .catch((error) => {
        console.log("sjhdjshdsdd", error);
        setLoader(false);
        setIsVisible(false);
        notification.open({
          message: error?.response?.data?.errorTitle,
          description: error?.response?.data?.errordescription,
        });
        // setsaveClicked(false);
        // errorMessage(err?.response?.data?.error);
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const handleEdit = (id) => {
    setIsVisible(true);
    const data = {
      productCode: id,
    };
    axios
      .post("/api/productedit", { ...data })
      .then((res) => {
        const dataList = {
          productName: res?.data?.data.productName,
          productCode: res?.data?.data.productCode,
          quantity: res?.data?.data.quantity,
          producDescription: res?.data?.data.producDescription,
        };
        setEditData(dataList);
        form.setFieldsValue(dataList);
      })
      .catch((error) => {
        notification.open({
          message: error?.response?.data?.errorTitle,
          description: error?.response?.data?.errordescription,
        });
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
      title: "In- Stack",
      dataIndex: "inStack",
      key: "inStack",
    },
    {
      title: "Purchase Count",
      dataIndex: "purchaseCount",
      key: "purchaseCount",
    },
    // {
    //   title: "Action",
    //   key: "action",
    //   render: (_, record) => (
    //     <Space size="middle">
    //       <a onClick={() => handleEdit(record.productCode)}>Edit {record.id}</a>
    //       <a>Delete</a>
    //     </Space>
    //   ),
    // },
  ];
  const handleCliked = () => {
    setIsVisible(true);
  };
  const handleOk = () => {
    setIsVisible(false);
  };
  const handleCancel = () => {
    setIsVisible(false);
  };
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
              data={datalist}
              onClick={() => {
                message.success("The file is downloading");
              }}
            >
              <Button type="primary" ghost>
                <DownCircleOutlined />
                Report
              </Button>
            </CSVLink>
            <Button
              type="primary"
              style={{ marginLeft: 20 }}
              onClick={() => handleCliked()}
            >
              <PlusCircleOutlined />
              Add Product
            </Button>
          </>
        }
        style={{ margin: 60 }}
      >
        <Table columns={columns} dataSource={datalist} />
      </Card>
      <Modal
        title="Product Add"
        open={isVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
      >
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
            margin: 10,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Product Name"
            name="productName"
            rules={[
              {
                required: true,
                message: "Please input your product name!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Product Code"
            name="productCode"
            rules={[
              {
                required: true,
                message: "Please input your product code!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Product Quanlity"
            name="quantity"
            rules={[
              {
                required: true,
                message: "Please input your product quanlity!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Product Description"
            name="productDescription"
            rules={[
              {
                required: true,
                message: "Please input your product Description!",
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
          {/* <Form.Item
      label="Product Image"
      name="Product Image"
      rules={[
        {
          required: true,
          message: 'Please input your product image!',
        },
      ]}
    >
        <Upload {...props}>
    <Button icon={<UploadOutlined />}>Click to Upload</Button>
  </Upload>
    </Form.Item> */}

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Spin spinning={loader} fullscreen />
    </div>
  );
};
export default dashboard;
