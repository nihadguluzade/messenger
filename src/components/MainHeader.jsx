import React, { Component } from 'react';
import {Row, Col, Image, Input, Button, Select} from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import defaultAvatar from '../assets/sample-avatar-female.png';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {logout} from "../redux/Actions";
import logo from '../messenger-logo.png';
import ThemeToggler from "./ThemeToggler";
import {SocketContext} from "../utils/SocketContext";
import UserService from "../services/UserService";

const {Option} = Select;

class MainHeader extends Component {

  state = {
    searchedUsers: []
  }

  static contextType = SocketContext;

  socket = this.context;

  userService = new UserService();

  handleLogout = () => {
    const {logout, history} = this.props;
    logout();
    history.push("/");
    this.socket.emit('logout');
    if (global.localStorage) {
      global.localStorage.removeItem("state");
    }
  }

  handleOnSearch = (val) => {
    if (val.length > 0) {
      this.userService.getUsersStartingWith(val)
        .then(res => {
          this.setState({searchedUsers: res})
        })
        .catch(console.error);
    }
  }

  render() {
    const {user} = this.props;
    const {searchedUsers} = this.state;
    return (
      <div id="MainHeaderComponent">
        <Row>
          {/*<Col span={5} offset={1}>
            <Image width={40} className="avatar" src={defaultAvatar}/>
          </Col>*/}
          <Col span={11}>
            <h2 className="app-heading">
              <img src={logo} className="header-logo"/>
              Messenger
            </h2>
            <span>Welcome, {user.username}</span>
          </Col>
          <Col span={12} offset={1}>
            <div className="header-right">
              <ThemeToggler />
              <Button type="link" className="logout-btn" onClick={() => this.handleLogout()}>
                Log Out
              </Button>
            </div>
          </Col>
        </Row>
        <Row>
          <Select
            showSearch
            placeholder="Search user"
            className="header-search"
            onSearch={this.handleOnSearch}
          >
            {searchedUsers.length > 0 && searchedUsers.map((user, index) => {
              return (
                <Option key={index} value={user.username}>{user.username}</Option>
              )
            })}
          </Select>
          {/*<Input.Search
            size="small"
            placeholder="Search"
            allowClear
            onSearch={onSearch}/>*/}
        </Row>
      </div>
    )
  }
}

function mapState(state) {
  return {
    user: state.user
  }
}

const mapDispatch = {logout: logout}

export default connect(mapState, mapDispatch)(withRouter(MainHeader));
