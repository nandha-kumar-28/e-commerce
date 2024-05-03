"use client";
import React, { useState } from "react";
import { Button, Checkbox, Form, Input, Row, Col, Card, Modal } from "antd";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const Login = () => {
  const router = useRouter();
  const onFinish = async (values) => {
    console.log("Success:", values);
    try {
      // setLoading(true);
      const response = await axios.post("/api/login", values);
      console.log(response);
      router.push("/dashboard");
    } catch (error) {
      console.log("Login failed", error.message);
    } finally {
      // setLoading(false);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div>
      <Row>
        <Col span={4}></Col>
        <Col span={16} style={{ marginTop: 80 }}>
          <Card>
            <h2
              style={{
                justifyContent: "center",
                display: "flex",
              }}
            >
              Login
            </h2>
            <Form
              name="basic"
              {...layout}
              style={{
                // maxWidth: 500,
                margin: 70,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your Email Id!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button type="primary" htmlType="submit">
                  Login
                </Button>{" "}
                Or <Link href={"/signup"}>Register New User</Link>
              </Form.Item>
              {/* <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Link href={"/signup"}> Or Register New User</Link>
              </Form.Item> */}
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
export default Login;
