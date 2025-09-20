import React from 'react';
import { FiSearch } from "react-icons/fi";
import { RiMessage3Line } from "react-icons/ri";

const NavigationItems = () => {
  return (
    <div className="p-2 space-y-1 border-b border-[#2d2d2d]">
      <div className="flex items-center gap-3 p-3 text-gray-300 hover:bg-[#2d2d2d] rounded-lg cursor-pointer transition-colors">
        <FiSearch className="w-4 h-4" />
        <span className="text-sm">Search chats</span>
      </div>
      <div className="flex items-center gap-3 p-3 text-gray-300 hover:bg-[#2d2d2d] rounded-lg cursor-pointer transition-colors hover:cursor-not-allowed">
        <RiMessage3Line className="w-4 h-4" />
        <span className="text-sm">New Project</span>
      </div>
    </div>
  );
};

export default NavigationItems;
