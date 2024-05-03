"use client"
import React, { useState } from 'react';
import { Card ,Row,Col,List,Button,Form, Input,Modal} from 'antd';
const { Meta } = Card;
const data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
  ];
const productdetails = () => {
    const [buyVisible,setbuyVisible] = useState(false);
    const onFinish = (values) => {
        console.log('Success:', values);
      };
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };
    const handleCliked =()=>{
        setbuyVisible(true);
    }
    const handleOk = () => {
        setbuyVisible(false);
      };
      const handleCancel = () => {
        setbuyVisible(false);
      };
    return(
        <div>
        <Row>
        <Col span={4}></Col>
        <Col span={8}>
  <Card
    hoverable
    style={{
    margin:20,
    width:250
    }}
    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
  >
    <Meta title="Europe Street beat" description="www.instagram.com" />
  </Card>
  </Col>
  <Col span={12} style={{marginTop:150}}>
  <List
      size="small"
      dataSource={data}
      renderItem={(item) => <List.Item>{item}</List.Item>}
    />
    <Row style={{marginTop:30}}>
        <Col span={12}>
        <Button type='primary' style={{marginLeft:20}} onClick={()=>handleCliked()}>Buy</Button>
        </Col>
        <Col span={12}>
            
    <Button type='danger'>Add Card</Button>
        </Col>
    </Row>

  </Col>
  </Row>
  <Modal title="Address Details" open={buyVisible} onOk={handleOk} onCancel={handleCancel} footer={false}>
  <Form
    name="basic"
    labelCol={{
      span: 8,
    }}
    wrapperCol={{
      span: 16,
    }}
    
    style={
        {margin:20}
    }
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
          message: 'Please input your EmailID!',
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
          message: 'Please input your mobile number!',
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
          message: 'Please input your address!',
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
          message: 'Please input your landmark!',
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
  </div>
    )
}
export default productdetails;