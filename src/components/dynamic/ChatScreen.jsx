import React, { Component } from 'react';
import Bubble from './Bubble';
import { connect } from 'react-redux';

class ChatScreen extends Component {

  componentDidUpdate() {
    console.log("ChatScreen updated");
  }

  render() {
    return (
      <div id="ChatScreenComponent">
        <div className="container">
          <Bubble type="sender" message="Hey whats up?"/>
          <Bubble type="receiver" message="Fine! What are you doing today?"/>
          <Bubble type="sender" message="Good thanks"/>
          <Bubble type="sender" message="I'm coming here tomorrow 😁"/>
          <Bubble type="sender" message="tell me what to bring to you"/>
          <Bubble type="receiver" message="that's great!! yayy"/>
          <Bubble type="receiver" message="come soon and safe!"/>
        </div>
      </div>
    )
  }
}

export default connect((state) => {return {user: state.user}})(ChatScreen);
