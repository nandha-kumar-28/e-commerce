"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { Button, Checkbox, Form, Input, Row, Col, Card, Modal } from "antd";
import { useRouter } from "next/navigation";
import axios from "axios";

const signup = () => {
  const router = useRouter();

  const onFinish = async (values) => {
    console.log("Success:", values);
    try {
      const response = await axios.post("/api/signup", values);
      router.push("/login");
    } catch (error) {
      console.log("Signup failed", error.message);
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
              Registration Form
            </h2>
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
                label="User Name"
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input your User Name!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Email ID"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your Email ID!",
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
                name="isAdmin"
                valuePropName="checked"
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Checkbox>Admin Access</Checkbox>
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button type="primary" htmlType="submit">
                  Sign Up
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default signup;