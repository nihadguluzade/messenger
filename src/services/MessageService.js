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
        read: message.read,
        content: message.content
      }),
    });
    return await response.text();
  }

  async getMessages() {
    const response = await fetch('/api/messages');
    const responseBody = await response.json();

    if (response.status !== 200) throw Error(responseBody.message);
    return responseBody;
  }

  async getConversation(destUID, srcUID) {
    const response = await fetch('/api/conversation/u1id=' + destUID + '&u2id=' + srcUID);
    const responseBody = await response.json();

    if (response.status !== 200) throw Error(responseBody.message);
    return responseBody;
  }

  async getUserConversations(userId) {
    const response = await fetch(`/api/conversations/uid=${userId}`);
    const responseBody = await response.json();

    if (response.status !== 200) throw Error(responseBody.message);
    return responseBody;
  }

}

export default MessageService;
