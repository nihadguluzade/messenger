import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import {Layout, Menu, Row, Col, Image, Empty} from 'antd';
import MainHeader from './MainHeader';
import defaultAvatar from '../assets/avatar.png';
import ChatScreenWrapper from './chat/ChatScreenWrapper';
import { connect } from 'react-redux';
import UserService from "../services/UserService";
import MessageService from "../services/MessageService";

const {Sider, Content} = Layout;

class Main extends Component {

  state = {
    visibleUsers: [],
    destUID: -1,
    conversations: []
  }

  userService = new UserService();

  messageService = new MessageService();

  getUsers = () => {
    const {user} = this.props;
    this.userService.getUsers().then(users => {
      if (users.length > 0) {
        this.setState({visibleUsers: users.filter(u => u.username != user.username)}, this.getConversations);
      }
    }).catch(console.error);
  }

  getConversations = () => {
    const {user} = this.props;
    const {visibleUsers} = this.state;
    this.messageService.getUserConversations(user._id)
      .then(messages => {
        const conversations = [];
        visibleUsers.map((_user, index) => {
          const dateTimes = [];

          messages.filter(conv => conv.destUID == _user._id || conv.srcUID == _user._id).map(v => dateTimes.push(new Date(v.sentTime)));

          const maxDate = new Date(Math.max(...dateTimes));
          const lastMes = messages.filter(m => new Date(m.sentTime).valueOf() == maxDate.valueOf())[0];

          if (lastMes != undefined) {
            let lastConversations = {
              date: maxDate,
              user: _user._id,
              lastMessage: lastMes.content
            };
            conversations.push(lastConversations);
          }
        });
        this.setState({conversations});
      })
      .catch(console.error);
  }

  handleMenuClick = (e) => {
    const user = this.state.visibleUsers[parseInt(e.key)];
    this.setState({destUID: user._id});
  }

  componentDidMount() {
    this.getUsers();
  }

  render() {
    const {visibleUsers, destUID, conversations} = this.state;
    return (
      <Layout id="MainComponent">
        <Sider
          theme="light"
          width={380}
          style={{}}>

          <MainHeader />

          <Menu theme="light" mode="inline" onClick={e => this.handleMenuClick(e)} className="chat-item-menu">
            {visibleUsers.length > 0 ? (
              visibleUsers.map((user, index) => {
                return (
                  <Menu.Item key={index}>
                    <Row>
                      <Col span={18} offset={0}>
                        <div className="chat-item-avatar">
                          <img src={defaultAvatar} style={{width: 55}} />
                        </div>
                        <div className="chat-item-desc">
                          <span className="chat-item-user-name">{user.username}</span>
                          {conversations.length > 0 && conversations.filter(c => c.user == user._id).length > 0 ? (
                            <span className="chat-item-message">{conversations.filter(c => c.user == user._id)[0].lastMessage}</span>
                          ) : (<span />)}
                        </div>
                      </Col>
                    </Row>
                  </Menu.Item>
                )
              })
            ) : (<Menu.Item><Empty /></Menu.Item>)}
          </Menu>

        </Sider>

        <Layout className="chat-screen-layout">
          <Content>
            <ChatScreenWrapper destUID={destUID} updateConversations={this.getConversations} />
          </Content>
        </Layout>

      </Layout>
    )
  }
}

function mapState(state) {
  return {user: state.user}
}

export default connect(mapState)(Main);
