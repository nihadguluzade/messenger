import React from 'react';
import { Link } from 'react-router-dom';
import {Button} from "antd";
import { signIn } from '../../redux/Actions';
import { connect } from 'react-redux';
import logo from '../../messenger-logo.png';
import { User } from '../../models/User';

const Home = (props) => {
  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h2><strong>Messenger</strong></h2>
      <div className="actions-wrapper">
        <Button type="primary"><Link to="/login">Sign In</Link></Button>
        <Button type="primary" onClick={() => signInAsAdmin(props)}>
          <Link to="/main">Sign In As Admin</Link>
        </Button>
        <Button type="primary" onClick={() => signInAsDev(props)}>
          <Link to="/main">Sign In As Dev</Link>
        </Button>
        <Button><Link to="/main">Home</Link></Button>
      </div>
    </header>
  )
}

function signInAsAdmin(props) {
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
}

function mapState(state) {
  return {
    user: state.user
  }
}

const mapDispatch = {signIn: signIn}

export default connect(mapState, mapDispatch)(Home);