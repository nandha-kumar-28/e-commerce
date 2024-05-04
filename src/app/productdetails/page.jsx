"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  Row,
  Col,
  List,
  Button,
  Form,
  Input,
  Modal,
  notification,
  Spin,
} from "antd";
import axios from "axios";
const { Meta } = Card;
const productdetails = () => {
  const [loader, setLoader] = useState(true);
  const [buyVisible, setbuyVisible] = useState(false);
  const [productDetails, setproductDetails] = useState([]);
  const [purchaseStatus, setPurchaseStatus] = useState(false);
  const [addtoCardStatus, setAddtoCardStatus] = useState(false);
  useEffect(() => {
    getProductDetails();
  }, []);

  const getProductDetails = () => {
    const id = localStorage.getItem("productCode");
    const data = {
      productCode: id,
    };
    axios
      .post("/api/productedit", { ...data })
      .then((res) => {
        setLoader(false);
        setproductDetails(res?.data?.data);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
  const onFinish = (values) => {
    const submitData = {
      emailId: values.emailId,
      productName: productDetails.productName,
      productCode: productDetails.productCode,
      mobileNo: values.mobileNo,
      address1: values.address1,
      landmark: values.landmark,
    };
    axios
      .post("/api/purchase", { ...submitData })
      .then((res) => {
        setbuyVisible(false);
        setPurchaseStatus(true);
      })
      .catch((error) => {
        setbuyVisible(false);
        notification.open({
          message: error?.response?.data?.errorTitle,
          description: error?.response?.data?.errordescription,
        });
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const handleCliked = () => {
    setbuyVisible(true);
  };
  const handleOk = () => {
    setbuyVisible(false);
  };
  const handleCancel = () => {
    setbuyVisible(false);
  };
  const addtoCardStatusFuntion = () => {
    setAddtoCardStatus(true);
    notification.open({
      message: "Added in Your Account",
      description: `${productDetails.productName} Added in your Account`,
    });
  };
  return (
    <div>
      <Row>
        <Col span={4}></Col>
        <Col span={8}>
          <Card
            hoverable
            style={{
              margin: 20,
              width: 250,
            }}
            cover={
              <img
                alt="example"
                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
              />
            }
          >
            <Meta
              title={productDetails.productName}
              description="www.instagram.com"
            />
          </Card>
        </Col>
        <Col span={12} style={{ marginTop: 150 }}>
          <p>{productDetails?.productDescription}</p>
          <Row style={{ marginTop: 30 }}>
            <Col span={12}>
              <Button
                type="primary"
                style={{ marginLeft: 20 }}
                onClick={() => {
                  !purchaseStatus ? handleCliked() : {};
                }}
              >
                {purchaseStatus ? "Dispatched" : "Buy"}
              </Button>
            </Col>
            <Col span={12}>
              <Button
                type="danger"
                onClick={() => {
                  !addtoCardStatus ? addtoCardStatusFuntion() : {};
                }}
              >
                {" "}
                {addtoCardStatus ? "In-Card" : "Add Card"}
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <Modal
        title="Address Details"
        open={buyVisible}
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
          style={{ margin: 20 }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="E-Mail Id"
            name="emailId"
            rules={[
              {
                required: true,
                message: "Please input your EmailID!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Mobile No"
            name="mobileNo"
            rules={[
              {
                required: true,
                message: "Please input your mobile number!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Address Line1"
            name="address1"
            rules={[
              {
                required: true,
                message: "Please input your address!",
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            label="Landmark"
            name="landmark"
            rules={[
              {
                required: true,
                message: "Please input your landmark!",
              },
            ]}
          >
            <Input />
          </Form.Item>

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
export default productdetails;
