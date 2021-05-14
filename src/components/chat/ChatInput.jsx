import React, { Component } from 'react';
import { Row, Col, Input, Button } from 'antd';
import { PlusOutlined, SendOutlined } from '@ant-design/icons';
import MessageService from '../../services/MessageService';
import { Message } from '../../models/Message';
import { connect } from 'react-redux';
import { User } from '../../models/User';

class ChatInput extends Component {

  state = {
    message: ''
  }

  messageService = new MessageService();

  handleChange = (e) => {
    this.setState({ message: e.target.value });
  }

  send = () => {
    const { user, destUID, emit } = this.props;
    const message = new Message(destUID, user._id, this.state.message);
    this.messageService.sendMessage(message);
    this.setState({ message: '' });
    emit(message);
  }

  render() {
    return (
      <div id="ChatInputComponent">
        <Row>
          {/*<Col span={1}>
            <Button
              className="op-btn"
              type="primary"
              shape="circle"
              icon={<PlusOutlined className="add-option" />} />
          </Col>*/}
          <Col span={19} offset={1}>
            <Input
              className="chat-input"
              placeholder="Type a message..."
              value={this.state.message}
              onChange={this.handleChange}
              onPressEnter={this.send}
            />
          </Col>
          <Col span={1} offset={1}>
            <Button
              className="op-btn"
              type="primary"
              shape="circle"
              icon={<SendOutlined />}
              onClick={this.send}
            />
          </Col>
        </Row>
      </div>
    )
  }
}

export default connect((state) => {return {user: state.user}})(ChatInput);
