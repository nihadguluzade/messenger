import React from 'react';
import logo from './messenger-logo.png';
import './App.css';
import { HashRouter, Link, Route, Switch } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

const Home = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2><strong>Messenger</strong></h2>
        <p>
          <Link to="/login">Sign in to get started!</Link>
        </p>
      </header>
    </div>
  )
}

function App() {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route exact path="/login" component={ Login } />
        <Route exact path="/register" component={ Register } />
      </Switch>
    </HashRouter>
  );
}

export default App;
