import React, { Component } from 'react';
import { Row, Col, Image, Input, Button } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import defaultAvatar from '../assets/sample-avatar-female.png';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {logout} from "../redux/Actions";

const onSearch = value => console.log(value);

class MainHeader extends Component {

  handleLogout = () => {
    const {logout, history} = this.props;
    logout();
    history.push("/");
    if (global.localStorage) {
      global.localStorage.removeItem("state");
    }
  }

  render() {
    const {user} = this.props;
    return (
      <div id="MainHeaderComponent">
        <Row>
          {/*<Col span={5} offset={1}>
            <Image width={40} className="avatar" src={defaultAvatar}/>
          </Col>*/}
          <Col span={11}>
            <h2 className="app-heading"><strong>Messenger</strong></h2>
            <span>{user.username}</span>
          </Col>
          <Col span={5} offset={1}>
            <Button icon={<LogoutOutlined/>} onClick={() => this.handleLogout()}/>
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

function mapState(state) {
  return {
    user: state.user
  }
}

const mapDispatch = {logout: logout}

export default connect(mapState, mapDispatch)(withRouter(MainHeader));
