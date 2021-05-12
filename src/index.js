import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore } from 'redux';
import { userReducer } from './redux/Reducers';
import { Provider } from 'react-redux';

const getStateFromLS = (key) => {
  let state = {};
  if (global.localStorage) {
    try {
      state = JSON.parse(global.localStorage.getItem(key)) || {};
    } catch (e) {
      console.error(e);
    }
  }
  return state;
}

function preloadedState() {
  const state = getStateFromLS("state");
  if (state == undefined) {
    return undefined;
  } else {
    return {user: state};
  }
}

const store = createStore(userReducer, preloadedState());

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
