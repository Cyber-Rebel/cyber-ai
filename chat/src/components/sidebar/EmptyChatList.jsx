import React from 'react';
import { RiMessage3Line } from "react-icons/ri";

const EmptyChatList = () => {
  return (
    <div className="text-center py-8">
      <RiMessage3Line size={32} className="text-gray-600 mx-auto mb-3" />
      <p className="text-gray-500 text-sm">No conversations yet</p>
      <p className="text-gray-600 text-xs mt-1">Start a new chat to begin</p>
    </div>
  );
};

export default EmptyChatList;
