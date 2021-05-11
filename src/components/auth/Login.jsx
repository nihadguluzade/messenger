import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import {Form, Input, Button, message, Alert} from 'antd';
import UserService from "../../services/UserService";
import {signIn} from "../../redux/Actions";
import {connect} from "react-redux";

class Login extends Component {

  state = {
    username: '',
    password: '',
    errorMessage: ''
  }

  userService = new UserService();

  handleSubmit = () => {
    this.authenticate();
  }

  authenticate = () => {
    const {signIn, history} = this.props;
    const {username, password} = this.state;
    this.userService.authenticate(username, password)
      .then(res => {
        if (res.length == 0) {
          this.setState({errorMessage: 'Username or password is incorrect.'})
        } else {
          signIn(res[0]);
          this.setState({errorMessage: ''});
          history.push('/main');
        }
      })
      .catch(console.error)
  }

  render() {
    const {errorMessage} = this.state;
    return (
      <div className="App-header">

        <Form onFinish={this.handleSubmit} className="login-form" layout="vertical">

          <Form.Item label={"Username"} name="username"
            rules={[
              {
                required: true,
                message: "Username is required"
              },
            ]}>
            <Input placeholder="Username" onChange={e => this.setState({username: e.target.value})} />
          </Form.Item>

          <Form.Item label={"Password"} name="password"
            rules={[
              {
                required: true,
                message: "Password is required"
              },
            ]}>
            <Input type="password" placeholder="Password" onChange={e => this.setState({password: e.target.value})} />
          </Form.Item>

          {errorMessage.length > 0 && (
            <Alert message={errorMessage} type="error" className="m-b-12" />
          )}

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
}

function mapState(state) {
  return {
    user: state.user
  }
}

const mapDispatch = {signIn: signIn}

export default connect(mapState, mapDispatch)(Login);
