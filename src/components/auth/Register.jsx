import React from 'react';
import { Form, Input, Button } from 'antd';
import { Link } from 'react-router-dom';

const handleRegister = () => {
  console.log('register');
}

function Register() {
  return (
    <div className="App-header">

      <h2><strong>Create Account</strong></h2>
      
      <Form onFinish={handleRegister} className="register-form" layout="horizontal">

        <Form.Item label="Email" name="email"
          rules={[
            {
              required: true,
              message: "Email is required"
            },
          ]}>
          <Input placeholder="email" type="email" />
        </Form.Item>

        <Form.Item label="Username" name="username"
          rules={[
            {
              required: true,
              message: "Username is required"
            },
          ]}>
          <Input placeholder="username" />
        </Form.Item>

        <Form.Item label="Password" name="password"
          rules={[
            {
              required: true,
              message: "Password is required"
            },
          ]}>
          <Input placeholder="password" type="password" />
        </Form.Item>

        <Form.Item className="register-form-button-wrapper">
          <Button type="link" className="register-form-cancel-btn">
            <Link to="/login">Cancel</Link>
          </Button>
          <Button type="primary" htmlType="submit" className="register-form-submit-btn">
            Sign Up
          </Button>
        </Form.Item>

      </Form>
    </div>
  )
}

export default Register;