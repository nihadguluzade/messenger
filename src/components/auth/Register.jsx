import React, { Component } from 'react';
import { Form, Input, Button, message } from 'antd';
import { Link } from 'react-router-dom';
import UserService from '../../services/UserService';
import { User } from '../../models/User';

class Register extends Component {

  state = {
    email: '',
    username: '',
    password: ''
  }

  userService = new UserService();

  render() {
    const {email, username, password} = this.state;

    return (
      <div className="App-header">

        <h2><strong>Create Account</strong></h2>
      
        <Form onFinish={this.handleRegister} className="register-form" layout="horizontal">

          <Form.Item label="Email" name="email"
            rules={[
              {
                required: true,
                message: "Email is required"
              },
            ]}>
            <Input placeholder="email" type="email" value={email} onChange={e => this.setState({email: e.target.value})} />
          </Form.Item>

          <Form.Item label="Username" name="username"
            rules={[
              {
                required: true,
                message: "Username is required"
              },
            ]}>
            <Input placeholder="username" value={username} onChange={e => this.setState({username: e.target.value})} />
          </Form.Item>

          <Form.Item label="Password" name="password"
            rules={[
              {
                required: true,
                message: "Password is required"
              },
            ]}>
            <Input placeholder="password" type="password" value={password} onChange={e => this.setState({password: e.target.value})} />
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

  handleRegister = () => {
    const {email, username, password} = this.state;
    if (this.checkInputs) {
      const newUser = new User(email, username, password);
      this.userService.saveUser(newUser);
      message.success('Welcome to the club!');
    }
  }

  checkInputs = () => {
    const {email, username, password} = this.state;
    if (email == undefined || username == undefined || password == undefined || email.length == 0 || 
      username.length == 0 || password.length == 0) {
      return false;
    }
    return true;
  }
}

export default Register;