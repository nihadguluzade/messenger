import React from 'react';
import { Row, Col, Input, Button } from 'antd';
import { PlusOutlined, SendOutlined } from '@ant-design/icons';

function ChatInput() {
  return (
    <div id="ChatInputComponent">
      <Row>
        <Col span={1}>
          <Button
            className="op-btn"
            type="primary"
            shape="circle"
            icon={<PlusOutlined className="add-option" />} />
        </Col>
        <Col span={19} offset={1}>
          <Input className="chat-input" />
        </Col>
        <Col span={1} offset={1}>
          <Button
            className="op-btn"
            type="primary"
            shape="circle"
            icon={<SendOutlined />} />
        </Col>
      </Row>
    </div>
  )
}

export default ChatInput;
