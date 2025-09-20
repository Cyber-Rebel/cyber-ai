import React from 'react';
import EmptyChatList from './EmptyChatList.jsx';
import ChatItem from './ChatItem.jsx';

const   ChatList = ({ chats, selectedChatId, onChatSelect, onDelete, truncateTitle }) => {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-2">
        {!chats || chats.length === 0 ? (
          <EmptyChatList />
        ) : (
          <div className="space-y-1">
            <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide px-3 py-2">
              Today
            </h3>
            {chats.map((chat) => (
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
