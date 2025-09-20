import React from 'react';
import { RiMessage3Line } from "react-icons/ri";
import { FiEdit3, FiTrash2 } from "react-icons/fi";

const ChatItem = ({ chat, selectedChatId, onChatSelect, onDelete, truncateTitle }) => {
  return (
    <div
      key={chat._id}
      onClick={() => onChatSelect(chat)}
      className={`
        group relative cursor-pointer p-3 rounded-lg transition-all duration-200
        ${selectedChatId === chat._id 
          ? 'bg-[#2d2d2d] text-white' 
          : 'text-gray-300 hover:bg-[#2d2d2d]'
        }
      `}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3">
            <RiMessage3Line size={16} className="flex-shrink-0" />
            <span className="text-sm font-medium truncate">
              {truncateTitle(chat.tittle || chat.title)}
            </span>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={(e) => {
              e.stopPropagation();
              // Add edit functionality
            }}
            className="p-1 hover:bg-[#3d3d3d] rounded transition-colors duration-200"
            title="Rename chat"
          >
            <FiEdit3 size={12} className="text-gray-400" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="p-1 hover:bg-[#3d3d3d] rounded transition-colors duration-200 ml-1"
            title="Delete chat"
          >
            <FiTrash2 size={12} className="text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatItem;
