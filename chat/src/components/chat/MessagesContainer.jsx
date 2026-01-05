import React, { useEffect, memo } from 'react';
import MessageBubble from './MessageBubble.jsx';
import TypingIndicator from './TypingIndicator.jsx';
import './ChatMessages.css';

const MessagesContainer = memo(({ messages, loading, messagesContainerRef, messagesEndRef ,title}) => {
 
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
    // console.log(messages)
  }, [messages, loading]);

  return (
    <div 
      ref={messagesContainerRef}
      className="flex-1 overflow-y-auto px-4 py-6 min-h-0 chat-scrollbar"
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {messages && messages.length > 0 ? (
          messages.map((message) => (
            <MessageBubble key={message._id} message={message} />
          ))
        ) : (
          <div className="text-center flex justify-center items-center h-screen text-gray-400 py-8">
            <p>
              {messages && messages.chatName
                ? `The chat "${messages.chatName}" is empty. Now add a message.`
                : `This chat ${title} is empty. Now add a message.`}
            </p>
          </div>
        )}

        {loading && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
});

export default MessagesContainer;
