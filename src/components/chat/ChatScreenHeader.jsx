import React, {Component} from 'react';
import { Row, Col, Image, Dropdown, Menu } from 'antd';
import { EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import defaultAvatar from '../../assets/avatar.png';
import UserService from "../../services/UserService";

class ChatScreenHeader extends Component {

  state = {
    user: undefined
  }

  userService = new UserService();

  getUser = () => {
    const {destUID} = this.props;
    if (destUID != -1) {
      this.userService.getUser(destUID)
        .then(u => {
          this.setState({user: u});
        })
        .catch(console.error)
    }
  }

  componentDidMount() {
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {destUID} = this.props;
    if (destUID != prevProps.destUID) {
      this.getUser();
    }
  }

  render() {
    const {user} = this.state;
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
        {user != undefined ? (
          <Row>
            {/*<Col span={2}>
              <Image className="image-circle" width={45} src={defaultAvatar} />
            </Col>*/}
            <Col span={18}>
              <div className="chat-avatar">
                <img src={defaultAvatar} />
              </div>
              <span className="chat-dest-user">{user.username}</span>
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
