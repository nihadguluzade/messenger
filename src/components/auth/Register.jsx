import React, { Component } from 'react';
import { Form, Input, Button, message } from 'antd';
import { Link } from 'react-router-dom';
import UserService from '../../services/UserService';
import { User } from '../../models/User';

class Register extends Component {

  state = {
    email: '',
    username: '',
    password: '',
    emailStatus: '',
    usernameStatus: ''
  }

  userService = new UserService();

  handleRegister = () => {
    const {switchTo} = this.props;
    const {email, username, password, emailStatus, usernameStatus} = this.state;
    if (this.checkInputs) {
      if (emailStatus != "error" && usernameStatus != "error") {
        const newUser = new User(email, username, password);
        this.userService.saveUser(newUser);
        message.success('Welcome to the club!');
        switchTo("login");
      }
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

  render() {
    const {switchTo} = this.props;
    const {email, username, password, emailStatus, usernameStatus} = this.state;

    return (
      <div className="App-header">

        <div className="register-container">
          <span className="register-title">Join In!</span>

          <Form onFinish={this.handleRegister} className="register-form" layout="horizontal">

            <Form.Item
              label="Email"
              name="email"
              hasFeedback
              validateStatus={emailStatus}
              help={emailStatus == "error" && "This email is in use"}
              rules={[
                {
                  required: true,
                  message: "Email is required"
                },
              ]}>
              <Input placeholder="email"
                type="email"
                value={email}
                onBlur={() => {
                  this.userService.getUserByEmail(email)
                    .then(res => {
                      if (res.length == 0) {
                        this.setState({emailStatus: "success"});
                      } else {
                        this.setState({emailStatus: "error"});
                      }
                    })
                }}
                onChange={e => this.setState({email: e.target.value})} />
            </Form.Item>

            <Form.Item
              label="Username"
              name="username"
              hasFeedback
              validateStatus={usernameStatus}
              help={usernameStatus == "error" && "Sorry, this username is taken"}
              rules={[
                {
                  required: true,
                  message: "Username is required"
                },
              ]}>
              <Input placeholder="username"
                value={username}
                onBlur={() => {
                  this.userService.getUserByUsername(username)
                    .then(res => {
                      if (res.length == 0) {
                        this.setState({usernameStatus: "success"});
                      } else {
                        this.setState({usernameStatus: "error"});
                      }
                    })
                    .catch(console.error);
                }}
                onChange={e => this.setState({username: e.target.value})} />
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
              <Button type="primary" htmlType="submit" className="register-form-submit-btn">
                Create Account
              </Button>
              <Button type="link" className="register-form-cancel-btn" onClick={() => switchTo("login")}>
                Cancel
              </Button>
            </Form.Item>

          </Form>
        </div>
      </div>
    )
  }
}

export default Register;
