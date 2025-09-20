import React from 'react';
import { FiMessageSquare } from 'react-icons/fi';

const EmptyChat = ({ onNewChat }) => {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center">
      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
        <FiMessageSquare className="text-white" size={24} />
      </div>
      <h2 className="text-2xl font-bold text-gray-200 mb-2">How can I help you today?</h2>
      <p className="text-gray-400 mb-6 max-w-md">
        Choose a chat from the sidebar or create a new one to begin chatting with AI
      </p>
      <button
        onClick={onNewChat}
        className="px-6 py-3 bg-[#2d2d2d] hover:bg-[#3d3d3d] text-gray-200 rounded-xl transition-colors duration-200 font-medium"
      >
        Start New Chat
      </button>
    </div>
  );
};

export default EmptyChat;
