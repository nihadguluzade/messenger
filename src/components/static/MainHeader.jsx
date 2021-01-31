import React from 'react';
import { Row, Col, Image, Tooltip, Input } from 'antd';
import { FormOutlined } from '@ant-design/icons';
import defaultAvatar from '../../assets/sample-avatar-female.png';

const onSearch = value => console.log(value);

function MainHeader() {
  return (
    <div id="MainHeaderComponent">
      <Row>
        <Col span={5} offset={1}>
          <Image width={40} className="avatar" src={defaultAvatar} />
        </Col>
        <Col span={11}>
          <h2 className="app-heading"><strong>Messenger</strong></h2>
        </Col>
        <Col span={5} offset={1}>
          <Tooltip title="Edit mode (Coming soon)">
            <FormOutlined className="edit-icon" />
          </Tooltip>
        </Col>
      </Row>
      <Row>
        <Input.Search 
          placeholder="Search" 
          allowClear
          onSearch={onSearch} />
      </Row>
    </div>
  )
}

export default MainHeader;