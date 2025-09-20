import React from 'react';

const TypingIndicator = () => {
  return (
    <div className="flex gap-4 justify-start">
      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
        <div className="text-white" size={16} />
      </div>
      <div className="bg-transparent rounded-2xl px-4 py-3">
        <div className="flex items-center gap-1">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          </div>
          <span className="text-gray-400 text-sm ml-2">AI is thinking...</span>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
