import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createNewchats, Messagesfetch, deleteChat } from '../store/actions/chataction.jsx';

// Import broken down components
import MobileMenuButton from './sidebar/MobileMenuButton.jsx';
import MobileOverlay from './sidebar/MobileOverlay.jsx';
import SidebarHeader from './sidebar/SidebarHeader.jsx';
import NavigationItems from './sidebar/NavigationItems.jsx';
import ChatList from './sidebar/ChatList.jsx';
import UserProfile from './sidebar/UserProfile.jsx';
import SettingsModal from './SettingsModal.jsx';

// Import styles
import './ChatSlider.css';

const ChatSlider = ({ chats, selectedChatId, desktop, userDetails }) => {
  // State management
  const [open, setOpen] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  
  // Redux
  const dispatch = useDispatch();

  // Utility functions
  const formatDate = (dateString) => {
    if (!dateString) return 'Today';
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  const truncateTitle = (title, maxLength = 30) => {
    if (!title) return 'New Chat';
    return title.length > maxLength ? title.substring(0, maxLength) + '...' : title;
  };


  // Event handlers
  const handleNewChat = () => {
    const title = prompt('Enter chat title:');
    if (!title) return;

    console.log(title);
    dispatch(createNewchats({
      tittle: title
    }));
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this chat?");
    if (!confirmDelete) return;
    if (!selectedChatId) return;
    
    console.log("delete chat id", selectedChatId);
    dispatch(deleteChat(selectedChatId));
  };

  const handleChatSelect = (data) => {
    dispatch(Messagesfetch(data._id));
  };

  const handleUserModalClick = () => {
    setShowUserModal(true);
  };

  const closeUserModal = () => {
    setShowUserModal(false);
  };

 
  

  // Main render
  return (
    <>
      <MobileMenuButton 
        open={open} 
        setOpen={setOpen} 
        desktop={desktop} 
      />

      <MobileOverlay 
        open={open} 
        setOpen={setOpen} 
        desktop={desktop} 
      />

      {/* Sidebar */}
      <div className={`
        ${desktop ? 'relative' : 'fixed'} 
        ${desktop ? 'translate-x-0' : open ? 'translate-x-0' : '-translate-x-full'}
        ${desktop ? 'w-64' : 'w-64'}
        h-screen bg-[#171717] border-r border-[#2d2d2d] 
        transform transition-transform duration-300 ease-in-out z-40
        flex flex-col
      `}>
        <SidebarHeader 
          desktop={desktop}
          setOpen={setOpen}
          onNewChat={handleNewChat}
        />

        <NavigationItems />

        <ChatList 
          chats={chats}
          selectedChatId={selectedChatId}
          onChatSelect={handleChatSelect}
          onDelete={handleDelete}
          truncateTitle={truncateTitle}
        />

        <UserProfile 
          userDetails={userDetails}
          onUserClick={handleUserModalClick}
        />
      </div>

      <SettingsModal 
          isOpen={showUserModal}
          // isOpen={showSettingsModal}
        onClose={closeUserModal}
        userDetails={userDetails}
      />
    </>
  );
};

export default ChatSlider;

