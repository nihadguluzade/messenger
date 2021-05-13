import React, { Component } from 'react';
import ChatScreenHeader from './ChatScreenHeader';
import ChatScreen from './ChatScreen';
import ChatInput from './ChatInput';
import Bubble from './Bubble';
import MessageService from '../../services/MessageService';
import { connect } from 'react-redux';
import { Button } from 'antd';
import socketIOClient from "socket.io-client";

const SERVER_ENDPOINT = "http://127.0.0.1:5000"
const socket = socketIOClient(SERVER_ENDPOINT);

class ChatScreenWrapper extends Component {

  state = {
    conversation: new Array(),
  }

  messageService = new MessageService();

  charScrollRef = React.createRef();

  componentDidMount() {
    const that = this;
    this.refreshMessages();
    this.scrollToBottom();
    socket.on('newMessage', function(data) {
      that.refreshMessages();
      that.props.updateConversations();
      that.scrollToBottom();
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.destUID != this.props.destUID) {
      this.refreshMessages();
    }
    this.scrollToBottom();
  }

  emitSent = (message) => {
    socket.emit('msg', message);
    this.refreshMessages();
    this.props.updateConversations();
  }

  refreshMessages = () => {
    const {user, destUID} = this.props;
    this.messageService.getConversation(destUID, user._id)
      .then(conversation => this.setState({ conversation }))
      .catch(console.error);
  }

  scrollToBottom = () => {
    this.charScrollRef.current?.scrollIntoView({behavior: 'auto'});
  }

  render() {
    const { destUID } = this.props;
    const { conversation } = this.state;
    let currentType;
    let prevType;
    let nextType;
    return (
      <>
        <ChatScreenHeader destUID={destUID} />

        {/* <ChatScreen /> */}

        <div id="ChatScreenComponent">
          <div className="container">
            {conversation.length > 0 && conversation.map((message, index) => {

              if (index < conversation.length - 1) {
                if (conversation[index + 1].srcUID == this.props.user._id) {
                  nextType = "sender";
                } else {
                  nextType = "receiver";
                }

                console.log(message);
                if (message.srcUID == this.props.user._id) {
                  currentType = "sender-default";
                } else {
                  currentType = "receiver-default";
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
                } else if (nextType == "sender" && prevType == "receiver-middle") {
                  currentType = "receiver-end";
                } else if (nextType == "sender" && prevType == "receiver-end") {
                  currentType = "sender-start";
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

        <ChatInput destUID={destUID} emit={this.emitSent} />
      </>
    )
  }

}

export default connect((state) => {return {user: state.user}})(ChatScreenWrapper);
