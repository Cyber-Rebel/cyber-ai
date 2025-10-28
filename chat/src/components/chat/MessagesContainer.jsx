import React, { useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble.jsx';
import TypingIndicator from './TypingIndicator.jsx';

const MessagesContainer = ({ messages, loading, messagesContainerRef, messagesEndRef }) => {
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages, loading]);


  return (
    <div 
      ref={messagesContainerRef}
      className="flex-1 overflow-y-auto px-4 py-6"
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {messages && messages.map((message) => {
          console.log("Rendering message:", message);
          return (  
            <MessageBubble key={message._id} message={message} />
          );
        })}

        {loading && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default MessagesContainer;
