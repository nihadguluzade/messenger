import React, { Component } from 'react';
import ChatScreenHeader from './ChatScreenHeader';
import ChatScreen from './ChatScreen';
import ChatInput from './ChatInput';
import Bubble from './Bubble';
import MessageService from '../../services/MessageService';
import { connect } from 'react-redux';
import { Button } from 'antd';

class ChatScreenWrapper extends Component {

  state = {
    conversation: new Array(),
    destUID: -1
  }

  messageService = new MessageService();

  componentDidMount() {
    this.refreshMessages();
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("this.state", this.state.conversation);
    console.log("prevState", prevState.conversation);
    if (this.state.conversation.length != prevState.conversation.length && 
      this.state.conversation != prevState.conversation) {
      this.refreshMessages();
    }
  }

  refreshMessages = () => {
    const {user} = this.props;
    const {destUID} = this.state;
    this.messageService.getConversation(destUID, user.id)
      .then(conversation => this.setState({ conversation }))
      .catch(console.error);
  }

  render() {
    const { destUID, conversation } = this.state;
    return (
      <>
        <ChatScreenHeader />
        <div>
          <Button onClick={() => this.setState({destUID: 1}, this.refreshMessages)}>Chat with admin</Button>
          <Button onClick={() => this.setState({destUID: 3}, this.refreshMessages)}>Chat with dev</Button>
        </div>
        
        {/* <ChatScreen /> */}
        <div id="ChatScreenComponent">
          <div className="container">
            {conversation.length > 0 && conversation.map((message, index) => {
              let type;
              if (message.srcUID == this.props.user.id) {
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
        
        <ChatInput destUID={destUID} refresh={this.refreshMessages} />
      </>
    )
  }

}

export default connect((state) => {return {user: state.user}})(ChatScreenWrapper);
