import React from 'react';
import { FiSearch, FiX } from "react-icons/fi";
import { RiMessage3Line } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';
import { searchChats } from '../../store/actions/chataction.jsx';

const NavigationItems = () => {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => state.chat.searchTerm);

  const handleChange = (e) => {
    const value = e.target.value;
    dispatch(searchChats(value)); // empty value returns full list
  };

  const handleClear = () => {
    dispatch(searchChats(''));
  };

  return (
    <div className="p-2 space-y-2 border-b border-[#2d2d2d]">
      <div className="relative">
        <FiSearch className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchTerm}
          onChange={handleChange}
          placeholder="Search chats"
          className="w-full bg-[#1f1f1f] border border-[#2d2d2d] rounded-lg pl-9 pr-9 py-2 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-white/30 focus:bg-[#252525]"
        />
        {searchTerm && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
            aria-label="Clear search"
          >
            <FiX className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="flex items-center gap-3 p-3 text-gray-300 bg-[#1f1f1f] rounded-lg cursor-not-allowed opacity-60">
        <RiMessage3Line className="w-4 h-4" />
        <span className="text-sm">New Project (soon)</span>
      </div>
    </div>
  );
};

export default NavigationItems;
