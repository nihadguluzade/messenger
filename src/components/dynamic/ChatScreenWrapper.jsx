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

  componentDidMount() {
    const that = this;
    this.refreshMessages();
    socket.on('newMessage', function(data) {
      that.refreshMessages();
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.destUID != this.props.destUID) {
      this.refreshMessages();
    }
  }

  emitSent = (message) => {
    socket.emit('msg', message);
  }

  refreshMessages = () => {
    const {user, destUID} = this.props;
    this.messageService.getConversation(destUID, user._id)
      .then(conversation => this.setState({ conversation }))
      .catch(console.error);
  }

  render() {
    const { destUID } = this.props;
    const { conversation } = this.state;
    return (
      <>
        <ChatScreenHeader destUID={destUID} />

        {/*<div>
          <Button onClick={() => this.setState({destUID: 1}, this.refreshMessages)}>Chat with admin</Button>
          <Button onClick={() => this.setState({destUID: 3}, this.refreshMessages)}>Chat with dev</Button>
        </div>*/}

        {/* <ChatScreen /> */}
        <div id="ChatScreenComponent">
          <div className="container">
            {conversation.length > 0 && conversation.map((message, index) => {
              let type;
              if (message.srcUID == this.props.user._id) {
                type = "sender";
              } else {
                type = "receiver";
              }
              return (
                <Bubble key={index} type={type} message={message.content} />
              )
            })}
          </div>
        </div>

        <ChatInput destUID={destUID} emit={this.emitSent} />
      </>
    )
  }

}

export default connect((state) => {return {user: state.user}})(ChatScreenWrapper);
