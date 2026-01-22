import React, { useState } from 'react';
import { HiDotsVertical } from "react-icons/hi";

const UserProfile = ({ userDetails, onUserClick }) => {
  const [imgError, setImgError] = useState(false);
  
  const fallbackAvatar = "https://ui-avatars.com/api/?name=" + encodeURIComponent(userDetails?.firstName || 'User') + "&background=6366f1&color=fff&size=128";
  
  const avatarSrc = imgError 
    ? fallbackAvatar 
    : (userDetails?.avatarimage || fallbackAvatar);

  return (
    <div className="p-4 border-t border-[#2d2d2d]">
      <div 
        onClick={onUserClick}
        className="flex items-center gap-3 p-3 text-gray-300 hover:bg-[#2d2d2d] rounded-lg cursor-pointer transition-colors group"
      >
        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium overflow-hidden">
          <img 
            src={avatarSrc} 
            alt="User Avatar" 
            className="w-full h-full object-cover rounded-full"
            onError={() => setImgError(true)}
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">{userDetails?.firstName || 'User'}</p>
          <p className="text-xs text-gray-500">Free plan</p>
        </div>
        <HiDotsVertical className="w-4 h-4 group-hover:text-cyan-400 transition-colors" />
      </div>
    </div>
  );
};

export default UserProfile