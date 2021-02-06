import React from 'react';
import Bubble from './Bubble';

function ChatScreen() {
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

export default ChatScreen;