import React, { Component } from 'react';
import { Row, Col, Image, Input, Button } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import defaultAvatar from '../assets/sample-avatar-female.png';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const onSearch = value => console.log(value);

class MainHeader extends Component {
  render() {
    const { user, history } = this.props;
    return (
      <div id="MainHeaderComponent">
        <Row>
          {/*<Col span={5} offset={1}>
            <Image width={40} className="avatar" src={defaultAvatar}/>
          </Col>*/}
          <Col span={11}>
            <h2 className="app-heading"><strong>Messenger</strong></h2>
            <span>{user.user.username}</span>
          </Col>
          <Col span={5} offset={1}>
            <Button icon={<LogoutOutlined/>} onClick={() => history.push("/")}/>
          </Col>
        </Row>
        <Row>
          <Input.Search
            size="small"
            placeholder="Search"
            allowClear
            onSearch={onSearch}/>
        </Row>
      </div>
    )
  }
}

export default connect((state) => {return {user: state}})(withRouter(MainHeader));