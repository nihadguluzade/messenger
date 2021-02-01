import React from 'react';
import ChatScreenHeader from './ChatScreenHeader';
import ChatScreen from './ChatScreen';
import ChatInput from './ChatInput';

function ChatScreenWrapper() {
  return (
    <>
      <ChatScreenHeader />
      <ChatScreen />
      <ChatInput />
    </>
  )
}

export default ChatScreenWrapper;