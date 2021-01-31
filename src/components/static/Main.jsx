import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Row, Col, Image } from 'antd';
import Sider from 'antd/lib/layout/Sider';
import MainHeader from './MainHeader';
import defaultAvatar from '../../assets/sample-avatar-female.png';

function Main() {
  return (
    <Layout id="MainComponent">
      <Sider width={380} 
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
        }}>

        <MainHeader />

        <Menu theme="dark" mode="inline" defaultSelectedKeys={['3']}>
          <Menu.Item key="1" className="chat-item-row">
            <Row>
              <Col span={3}>
                <Image width={47} src={defaultAvatar} />
              </Col>
              <Col span={18} offset={1}>
                <span className="chat-item-user-name">James Neumann</span>
                <span className="chat-item-message">hey what&#39;s going on? - 10m</span>
              </Col>
            </Row>
          </Menu.Item>
          <Menu.Item key="2">
            nav2
          </Menu.Item>
          <Menu.Item key="3">
          nav 3
          </Menu.Item>
          <Menu.Item key="4">
            <Link to="/">Home</Link>
          </Menu.Item>
        </Menu>
      
      </Sider>
    </Layout>
  )
}

export default Main;