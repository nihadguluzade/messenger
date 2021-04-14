import React from 'react';
import logo from './messenger-logo.png';
import './App.css';
import { HashRouter, Link, Route, Switch } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Main from './components/static/Main';
import {Button} from "antd";

const Home = () => {
  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h2><strong>Messenger</strong></h2>
      <div className="actions-wrapper">
        <Button type="primary"><Link to="/login">Log in</Link></Button>
        <Button><Link to="/main">Home</Link></Button>
      </div>
    </header>
  )
}

function App() {
  return (
    <HashRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={ Home } />
          <Route exact path="/login" component={ Login } />
          <Route exact path="/register" component={ Register } />
          <Route exact path="/main" component={ Main } />
        </Switch>
      </div>
    </HashRouter>
  );
}

export default App;
