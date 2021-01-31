import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';

const handleSubmit = (props) => {
  message.success("handleSubmit: ", props);
}

function Login() {
  return (
    <div className="App-header">

      <h2><strong>Welcome back!</strong></h2>

      <Form onFinish={handleSubmit} className="login-form" layout="vertical">

        <Form.Item name="username"
          rules={[
            {
              required: true,
              message: "Username is required"
            },
          ]}>
          <Input placeholder="Username" />
        </Form.Item>

        <Form.Item name="password"
          rules={[
            {
              required: true,
              message: "Password is required"
            },
          ]}>
          <Input type="password" placeholder="Password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-submit-btn">
          Sign in
          </Button>
          <Link to="/register" className="login-form-register-link">Create an account</Link>
        </Form.Item>

      </Form>

      <Link to="/">Home</Link>
    </div>
  )
}

export default Login;