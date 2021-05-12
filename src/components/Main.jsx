import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import {Layout, Menu, Row, Col, Image, Empty} from 'antd';
import Sider from 'antd/lib/layout/Sider';
import MainHeader from './MainHeader';
import defaultAvatar from '../assets/sample-avatar-female.png';
import ChatScreenWrapper from './chat/ChatScreenWrapper';
import { connect } from 'react-redux';
import UserService from "../services/UserService";

class Main extends Component {

  state = {
    visibleUsers: [],
    destUID: -1
  }

  userService = new UserService();

  getUsers = () => {
    const {user} = this.props;
    this.userService.getUsers().then(users => {
      if (users.length > 0) {
        console.log('getUsers', users);
        this.setState({visibleUsers: users.filter(u => u.username != user.username)});
      }
    });
  }

  handleMenuClick = (e) => {
    const user = this.state.visibleUsers[parseInt(e.key)];
    this.setState({destUID: user._id});
  }

  componentDidMount() {
    this.getUsers();
  }

  render() {
    const {visibleUsers, destUID} = this.state;
    return (
      <Layout id="MainComponent">
        <Sider
          theme="light"
          width={380}
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
          }}>

          <MainHeader />

          <Menu theme="light" mode="inline" onClick={e => this.handleMenuClick(e)}>
            {visibleUsers.length > 0 ? (
              visibleUsers.map((user, index) => {
                return (
                  <Menu.Item key={index} className="chat-item-row">
                    <Row>
                      <Col span={18} offset={1}>
                        <span className="chat-item-user-name">{user.username}</span>
                        {/*<span className="chat-item-message">hey what&#39;s going on? - 10m</span>*/}
                      </Col>
                    </Row>
                  </Menu.Item>
                )
              })
            ) : (<Empty />)}
          </Menu>

        </Sider>

        <Layout className="chat-screen-layout">
          <ChatScreenWrapper destUID={destUID} />
        </Layout>

      </Layout>
    )
  }
}

function mapState(state) {
  return {user: state.user}
}

export default connect(mapState)(Main);
