import { Component } from "react";

class MessageService extends Component {

  async sendMessage(message) {
    const response = await fetch('/api/message', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        _id: message._id, 
        destUID: message.destUID,
        srcUID: message.srcUID,
        sentTime: message.sentTime,
        read: message.read
      }),
    });
    return await response.text();
  }

}

export default MessageService;