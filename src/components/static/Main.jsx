import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Row, Col, Image } from 'antd';
import Sider from 'antd/lib/layout/Sider';
import MainHeader from './MainHeader';
import defaultAvatar from '../../assets/sample-avatar-female.png';
import ChatScreenWrapper from '../dynamic/ChatScreenWrapper';

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
                <Image width={50} src={defaultAvatar} />
              </Col>
              <Col span={18} offset={1}>
                <span className="chat-item-user-name">James Neumann</span>
                <span className="chat-item-message">hey what&#39;s going on? - 10m</span>
              </Col>
            </Row>
          </Menu.Item>
          <Menu.Item key="2" className="chat-item-row">
            <Row>
              <Col span={3}>
                <Image width={50} src={defaultAvatar} />
              </Col>
              <Col span={18} offset={1}>
                <span className="chat-item-user-name">James Neumann</span>
                <span className="chat-item-message unread">
                  Sent a GIF from Tenor - 14m
                  <div className="unread-circle"></div>  
                </span>
              </Col>
            </Row>
          </Menu.Item>
          <Menu.Item key="3" className="chat-item-row">
            <Row>
              <Col span={3}>
                <Image width={50} src={defaultAvatar} />
              </Col>
              <Col span={18} offset={1}>
                <span className="chat-item-user-name">James Neumann</span>
                <span className="chat-item-message">hey what&#39;s going on? - 10m</span>
              </Col>
            </Row>
          </Menu.Item>
        </Menu>
      
      </Sider>

      <Layout className="chat-screen-layout">
        <ChatScreenWrapper />
      </Layout>

    </Layout>
  )
}

export default Main;