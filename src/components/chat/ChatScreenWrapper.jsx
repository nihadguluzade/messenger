import React, { Component, Fragment } from 'react';
import ChatScreenHeader from './ChatScreenHeader';
import ChatScreen from './ChatScreen';
import ChatInput from './ChatInput';
import Bubble from './Bubble';
import MessageService from '../../services/MessageService';
import { connect } from 'react-redux';
import {Button, Empty} from 'antd';
import socketIOClient, { io } from "socket.io-client";
import {SocketContext} from '../../utils/SocketContext';

class ChatScreenWrapper extends Component {

  state = {
    conversation: new Array(),
    childUpdate: undefined
  }

  messageService = new MessageService();

  charScrollRef = React.createRef();

  static contextType = SocketContext;

  socket = this.context;

  prepareSocket = (socket) => {
    const that = this;

    socket.on("online", (userId) => {
      this.setState({childUpdate: userId + '-online'});
    });

    socket.on("offline", (userId) => {
      this.setState({childUpdate: userId + '-offline'});
    });

    socket.on('newMessage', function(data) {
      that.refreshMessages();
      that.props.updateConversations();
      that.scrollToBottom();
    });
  }

  componentDidMount() {
    this.refreshMessages();
    this.scrollToBottom();
    this.prepareSocket(this.socket);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.destUser != this.props.destUser) {
      this.refreshMessages();
      this.setState({childUpdate: {}})
    }
    this.scrollToBottom();
  }

  emitSent = (message) => {
    this.socket.emit('msg', message);
    this.refreshMessages();
    this.props.updateConversations();
  }

  refreshMessages = () => {
    const {user, destUser} = this.props;
    this.messageService.getConversation(destUser._id, user._id)
      .then(conversation => this.setState({ conversation }))
      .catch(console.error);
  }

  scrollToBottom = () => {
    this.charScrollRef.current?.scrollIntoView({behavior: 'auto'});
  }

  render() {
    const { destUser } = this.props;
    const { conversation, childUpdate } = this.state;
    let currentType;
    let prevType;
    let nextType;

    if (destUser._id == undefined) {
      return (
        <div className="empty-chat-screen">
          <Empty description="Select user from the left to start the chat!" />
        </div>
      )
    }

    return (
      <Fragment>
        <ChatScreenHeader statusUpdate={childUpdate} destUser={destUser} socket={this.socket} />

        {/* <ChatScreen /> */}

        <div id="ChatScreenComponent">
          <div className="container">
            {conversation.length > 0 && conversation.map((message, index) => {

              if (index <= conversation.length - 1) {

                if (message.srcUID == this.props.user._id) {
                  currentType = "sender-default";
                } else {
                  currentType = "receiver-default";
                }

                if (index == conversation.length - 1) {
                  if (prevType == "sender-start" || prevType == "sender-middle") {
                    currentType = "sender-end";
                  } else if (prevType == "sender-end" || prevType == "sender-default") {
                    currentType = "receiver-default";
                  } else if (prevType == "receiver-start" || prevType == "receiver-middle") {
                    currentType = "receiver-end";
                  } else if (prevType == "receiver-end" || prevType == "receiver-default") {
                    currentType = "sender-default";
                  }

                } else {
                  if (conversation[index + 1].srcUID == this.props.user._id) {
                    nextType = "sender";
                  } else {
                    nextType = "receiver";
                  }

                  if (nextType == "sender" && prevType == undefined) {
                    currentType = "sender-start";
                  } else if (nextType == "sender" && prevType == "sender-start") {
                    currentType = "sender-middle";
                  } else if (nextType == "sender" && prevType == "sender-middle") {
                    currentType = "sender-middle";
                  } else if (nextType == "receiver" && prevType == "sender-middle") {
                    currentType = "sender-end";
                  } else if (nextType == "receiver" && prevType == "sender-end") {
                    currentType = "receiver-start";
                  } else if (nextType == "receiver" && prevType == "receiver-start") {
                    currentType = "receiver-middle";
                  } else if (nextType == "receiver" && prevType == "receiver-middle") {
                    currentType = "receiver-middle";
                  } else if (nextType == "receiver" && prevType == undefined) {
                    currentType = "receiver-start";
                  } else if (nextType == "receiver" && prevType == "sender-start") {
                    currentType = "sender-end";
                  } else if (nextType == "sender" && prevType == "receiver-middle") {
                    currentType = "receiver-end";
                  } else if (nextType == "sender" && prevType == "receiver-end") {
                    currentType = "sender-start";
                  } else if (nextType == "sender" && prevType == "receiver-default") {
                    currentType = "sender-start";
                  } else if (nextType == "sender" && prevType == "receiver-start") {
                    currentType = "receiver-end";
                  } else if (nextType == "receiver" && prevType == "sender-default") {
                    currentType = "receiver-start";
                  }
                }
              }

              prevType = currentType;

              return (
                <Bubble key={index} type={currentType} message={message.content} />
              )
            })}
            <div className="ant-row" ref={this.charScrollRef} />
          </div>
        </div>

        <ChatInput destUID={destUser._id} emit={this.emitSent} />
      </Fragment>
    )
  }

}

export default connect((state) => {return {user: state.user}})(ChatScreenWrapper);
