import React, {Component} from 'react';
import { Row, Col, Image, Dropdown, Menu } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import defaultAvatar from '../../assets/sample-avatar-female.png';
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

    return (
      <div id="ChatScreenHeaderComponent">
        {user != undefined ? (
          <Row>
            {/*<Col span={2}>
              <Image className="image-circle" width={45} src={defaultAvatar} />
            </Col>*/}
            <Col span={11}>
              <span className="chat-dest-user">{user.username}</span>
            </Col>
            <Col span={2}>
              <Dropdown overlay={settings} trigger={['click']}>
                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                  <EllipsisOutlined className="chat-settings" />
                </a>
              </Dropdown>
            </Col>
          </Row>
        ) : (<div />)}
      </div>
    )
  }


}

export default ChatScreenHeader;
