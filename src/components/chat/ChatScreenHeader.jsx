import React, {Component} from 'react';
import { Row, Col, Image, Dropdown, Menu } from 'antd';
import { EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import defaultAvatar from '../../assets/avatar.png';
import UserService from "../../services/UserService";

class ChatScreenHeader extends Component {

  state = {
    status: 'Offline'
  }

  userService = new UserService();

  componentDidMount() {
    const {socket} = this.props;
    const that = this;
    socket.on("statusReport", function(data) {
      if (data == null) {
        that.setState({status: "Offline"});
      } else {
        that.setState({status: "Online"});
      }
    })
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {statusUpdate, destUser, socket} = this.props;
    if (destUser != prevProps.destUser || statusUpdate != prevProps.statusUpdate) {
      socket.emit("statusRequest", destUser._id);
    }
  }

  render() {
    const {destUser} = this.props;
    const {status} = this.state;
    const settings = (
      <Menu>
        <Menu.Item>
          <a>
            Contact info
          </a>
        </Menu.Item>
        <Menu.Item>
          <a>
            Block user
          </a>
        </Menu.Item>
      </Menu>
    );

    return (
      <div id="ChatScreenHeaderComponent">
        {destUser != undefined ? (
          <Row>
            {/*<Col span={2}>
              <Image className="image-circle" width={45} src={defaultAvatar} />
            </Col>*/}
            <Col span={18}>
              <div className="chat-avatar">
                <img src={defaultAvatar} />
              </div>
              <div className="chat-desc-wrapper">
                <span className="chat-dest-user">{destUser.username}</span>
                <span className="chat-status" style={{color: status == "Online" ? "#389e0d" : "#9a9a9a"}}>{status}</span>
              </div>
            </Col>
            <Col span={6}>
              <div className="chat-options">
                <Dropdown overlay={settings} trigger={['click']}>
                  <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                    <SettingOutlined className="chat-settings" />
                  </a>
                </Dropdown>
              </div>
            </Col>
          </Row>
        ) : (<div />)}
      </div>
    )
  }


}

export default ChatScreenHeader;
