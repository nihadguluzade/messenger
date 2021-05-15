import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import {Button, Col, Row} from "antd";
import { signIn } from '../redux/Actions';
import { connect } from 'react-redux';
import logo from '../messenger-logo.png';
import { User } from '../models/User';
import Login from "./auth/Login";
import Register from "./auth/Register";
import ThemeToggler from "./ThemeToggler";

const Home = (props) => {
  const [mode, setMode] = useState("login");

  return (
    <header className="home App-header">
      <Row style={{width: "100%"}}>
        <Col span={12}>
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <span className="home-title">Messenger</span>
            <div className="m-t-12" >
              <ThemeToggler />
            </div>
          </div>
        </Col>
        <Col span={12}>
          {mode == "login" ? (
            <Login switchTo={setMode} />
          ) : (
            <Register switchTo={setMode} />
          )}
        </Col>
      </Row>
    </header>
  )
}

/*function signInAsAdmin(props) {
  const {signIn} = props;
  const user = new User('admin@messenger.fb', 'admin', 'admin');
  user._id = 1;
  signIn(user);
}

function signInAsDev(props) {
  const {signIn} = props;
  const user = new User('dev@messenger.fb', 'dev', 'dev');
  user._id = 3;
  signIn(user);
}*/

function mapState(state) {
  return {
    user: state.user
  }
}

const mapDispatch = {signIn: signIn}

export default connect(mapState, mapDispatch)(Home);
