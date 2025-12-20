import React, { useEffect, memo } from 'react';
import MessageBubble from './MessageBubble.jsx';
import TypingIndicator from './TypingIndicator.jsx';
import './ChatMessages.css';

const MessagesContainer = memo(({ messages, loading, messagesContainerRef, messagesEndRef }) => {
 
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages, loading]);

  return (
    <div 
      ref={messagesContainerRef}
      className="flex-1 overflow-y-auto px-4 py-6 min-h-0 chat-scrollbar"
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {messages && messages.map((message) => (
          <MessageBubble key={message._id} message={message} />
        ))}

        {loading && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
});

export default MessagesContainer;
