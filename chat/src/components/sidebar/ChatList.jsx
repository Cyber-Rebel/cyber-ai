import React from 'react';
import EmptyChatList from './EmptyChatList.jsx';
import ChatItem from './ChatItem.jsx';

const   ChatList = ({ chats, selectedChatId, onChatSelect, onDelete, truncateTitle }) => {
  // Filter out any chats without valid _id
  const validChats = (chats || []).filter(chat => chat && chat._id);
  
  return (
    <div className="flex-1 overflow-y-auto min-h-0 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent hover:scrollbar-thumb-gray-500">
      <div className="p-2">
        {validChats.length === 0 ? (
          <EmptyChatList />
        ) : (
          <div className="space-y-1">
            <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide px-3 py-2">
              Today
            </h3>
            {validChats.map((chat) => (
              <ChatItem
                key={chat._id}
                chat={chat}
                selectedChatId={selectedChatId}
                onChatSelect={onChatSelect}
                onDelete={onDelete}
                truncateTitle={truncateTitle}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatList;
