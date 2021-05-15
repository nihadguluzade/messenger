import React, {Component, Fragment} from 'react';
import { Link } from 'react-router-dom';
import {Layout, Menu, Row, Col, Typography, Spin} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import MainHeader from './MainHeader';
import defaultAvatar from '../assets/avatar.png';
import ChatScreenWrapper from './chat/ChatScreenWrapper';
import { connect } from 'react-redux';
import UserService from "../services/UserService";
import MessageService from "../services/MessageService";
import {io} from "socket.io-client";
import {SocketContext} from "../utils/SocketContext";

const {Sider, Content} = Layout;
const {Text} = Typography;

class Main extends Component {

  state = {
    visibleUsers: [],
    destUser: {},
    conversations: [],
    socket: undefined
  }

  userService = new UserService();

  messageService = new MessageService();

  SERVER_ENDPOINT = "http://127.0.0.1:5000"

  getUsers = () => {
    const {user} = this.props;
    const visibleUsers = [];

    this.userService.getParticipants(user._id)
      .then(uids => {
        if (uids.length > 0) {

          uids.map((uid) => {
            this.userService.getUser(uid)
              .then(filteredUser => {
                visibleUsers.push(filteredUser);
              })
              .catch(console.error);
          });

          this.setState({visibleUsers}, this.getConversations);
        }
      })
      .catch(console.error);
  }

  getConversations = () => {
    const {user} = this.props;
    const {visibleUsers} = this.state;
    this.messageService.getUserConversations(user._id)
      .then(messages => {
        const conversations = [];
        visibleUsers.map((_user, index) => {
          const dateTimes = [];

          messages
            .filter(conv => conv.destUID._id == _user._id || conv.srcUID == _user._id)
            .map(v => dateTimes.push(new Date(v.sentTime)));

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
    this.setState({destUser: user});
  }

  startChatWith = (username) => {
    this.userService.getUserByUsername(username)
      .then(user => this.setState({destUser: user[0]}))
      .catch(console.error);
  }

  componentDidMount() {
    this.setState({
      socket: io(this.SERVER_ENDPOINT, {
        query: {userId: this.props.user._id}
      })
    });
    this.getUsers();
  }

  render() {
    const {visibleUsers, destUser, conversations, socket} = this.state;

    if (socket == undefined) {
      return <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
    }

    return (
      <SocketContext.Provider value={socket}>
        <Layout id="MainComponent">
          <Sider
            theme="light"
            width={380}
            style={{}}>

            <MainHeader startChatWith={this.startChatWith} />

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
              ) : (<Menu.Item><Text type="secondary"><i>Add users from top search to start chatting...</i></Text></Menu.Item>)}
            </Menu>

          </Sider>

          <Layout className="chat-screen-layout">
            <Content>
              <ChatScreenWrapper destUser={destUser} updateConversations={this.getConversations} />
            </Content>
          </Layout>

        </Layout>
      </SocketContext.Provider>
    )
  }
}

function mapState(state) {
  return {user: state.user}
}

export default connect(mapState)(Main);
