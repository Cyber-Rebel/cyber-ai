import React from 'react';
import { HiPlus } from "react-icons/hi";
import { MdOutlineRestaurantMenu } from "react-icons/md";

const SidebarHeader = ({ desktop, setOpen, onNewChat }) => {
  return (
    <div className="p-4 border-b border-[#2d2d2d]">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-lg font-semibold text-gray-200">cyber-ai</h1>
        {!desktop && (
          <button
            onClick={() => setOpen(false)}
            className="p-1 hover:bg-[#2d2d2d] text-gray-400 rounded-md transition-colors duration-200"
          >
            <MdOutlineRestaurantMenu size={20} />
          </button>
        )}
      </div>
      
      {/* New Chat Button */}
      <button
        onClick={onNewChat}
        className="w-full flex items-center gap-3 px-3 py-3 bg-[#2d2d2d] hover:bg-[#3d3d3d] text-gray-200 rounded-lg transition-all duration-200 group"
      >
        <HiPlus size={18} className="group-hover:rotate-90 transition-transform duration-200" />
        New chat
      </button>
    </div>
  );
};

export default SidebarHeader;
