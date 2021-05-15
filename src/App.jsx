import React, {useEffect} from 'react';
import './App.css';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Main from './components/Main';
import { getTheme } from './utils/themes';

function App() {

  useEffect(() => {
    getTheme();
  });

  return (
    <HashRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={ Home } />
          <Route exact path="/main" component={ Main } />
        </Switch>
      </div>
    </HashRouter>
  );
}

export default App;
