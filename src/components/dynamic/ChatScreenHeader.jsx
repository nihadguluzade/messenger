import React from 'react';
import { Row, Col, Image, Dropdown, Menu } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import defaultAvatar from '../../assets/sample-avatar-female.png';

const settings = (
  <Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
        Contact info
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
        Block user
      </a>
    </Menu.Item>
  </Menu>
);

function ChatScreenHeader() {
  return (
    <div id="ChatScreenHeaderComponent">
      <Row>
        {/*<Col span={2}>
          <Image className="image-circle" width={45} src={defaultAvatar} />
        </Col>*/}
        <Col span={11}>
          <span className="chat-dest-user">James Neumann</span>
        </Col>
        <Col span={2}>
          <Dropdown overlay={settings} trigger={['click']}>
            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
              <EllipsisOutlined className="chat-settings" />
            </a>
          </Dropdown>
        </Col>
      </Row>
    </div>
  )
}

export default ChatScreenHeader;