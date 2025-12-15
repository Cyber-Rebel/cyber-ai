import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createNewchats, Messagesfetch, deleteChat } from '../store/actions/chataction.jsx';
import toast, { Toaster } from 'react-hot-toast';

// Import broken down components
import MobileMenuButton from './sidebar/MobileMenuButton.jsx';
import MobileOverlay from './sidebar/MobileOverlay.jsx';
import SidebarHeader from './sidebar/SidebarHeader.jsx';
import NavigationItems from './sidebar/NavigationItems.jsx';
import ChatList from './sidebar/ChatList.jsx';
import UserProfile from './sidebar/UserProfile.jsx';
import SettingsModal from './SettingsModal.jsx';
import NewChatModal from './NewChatModal.jsx';

// Import styles
import './ChatSlider.css';

const ChatSlider = ({ chats, selectedChatId, desktop, userDetails }) => {
  // State management
  const [open, setOpen] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showNewChatModal, setShowNewChatModal] = useState(false);
  
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
    setShowNewChatModal(true);
  };

  const handleCreateChat = async (title) => {
    const loadingToast = toast.loading('Creating new chat...');
    
    try {
      const result = await dispatch(createNewchats({
        tittle: title
      }));
      
      if (result && result.success) {
        toast.success(`Chat "${title}" created!`, { id: loadingToast });
      } else {
        toast.error('Failed to create chat. Please try again.', { id: loadingToast });
      }
    } catch (error) {
      console.error('Error creating chat:', error);
      toast.error('Failed to create chat. Please try again.', { id: loadingToast });
    }
  };

  const handleDelete = () => {
    if (!selectedChatId) {
      toast.error('No chat selected to delete');
      return;
    }

    const selectedChat = chats.find(chat => chat._id === selectedChatId);
    const chatTitle = selectedChat?.tittle || 'this chat';
    
    // Create a custom toast for confirmation
    toast((t) => (
      <div className="flex flex-col gap-3">
        <p className="text-sm">Delete "{chatTitle}"?</p>
        <div className="flex gap-2">
          <button
            onClick={() => {
              toast.dismiss(t.id);
              confirmDelete();
            }}
            className="flex-1 px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-sm rounded-lg transition-colors"
          >
            Delete
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="flex-1 px-3 py-1.5 bg-gray-600 hover:bg-gray-700 text-white text-sm rounded-lg transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    ), {
      duration: 5000,
      style: {
        background: '#2d2d2d',
        color: '#fff',
        border: '1px solid #404040',
      }
    });
  };

  const confirmDelete = async () => {
    const loadingToast = toast.loading('Deleting chat...');
    
    try {
      await dispatch(deleteChat(selectedChatId));
      toast.success('Chat deleted successfully', { id: loadingToast });
    } catch (error) {
      console.error('Error deleting chat:', error);
      toast.error('Failed to delete chat', { id: loadingToast });
    }
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
      <Toaster 
        position="top-center"
        toastOptions={{
          style: {
            background: '#2d2d2d',
            color: '#fff',
            border: '1px solid #404040',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
      
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
        onClose={closeUserModal}
        userDetails={userDetails}
      />

      <NewChatModal
        isOpen={showNewChatModal}
        onClose={() => setShowNewChatModal(false)}
        onSubmit={handleCreateChat}
      />
    </>
  );
};

export default ChatSlider;

