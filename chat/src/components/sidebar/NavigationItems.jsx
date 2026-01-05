import React, { useRef, useState } from 'react';
import { FiSearch, FiX } from "react-icons/fi";
import { RiMessage3Line } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';
import { searchChats } from '../../store/actions/chataction.jsx';

const NavigationItems = () => {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => state.chat.searchTerm);
  const [searchQuery, setSearchQuery] = useState('');
  // debounce timer store karne ke liye
  const debounceRef = useRef(null);

  const handleChange = (e) => {
    const value = e.target.value;
   
    setSearchQuery(value);
    // dispatch(searchChats(value)); // empty value returns full list

    if(debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    
    debounceRef.current = setTimeout(() => {

      dispatch(searchChats(value));
      // here why we not use SearchQuery because setState is async so it may not update immediately konsi bhi useSate sate jo set hoti hae vo async hoti hae isliye hum direct value use kar rahe hae
    }, 300);


  };

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter') {
      if(debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
      dispatch(searchChats(searchQuery));
      // e.preventDefault();
    }
  };



  const handleClear = () => {
    setSearchQuery('');          // input bhi clear
  dispatch(searchChats('')); 
  };

  return (
    <div className="p-2 space-y-2 border-b border-[#2d2d2d]">
      <div className="relative">
        <FiSearch className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={handleChange}
             onKeyDown={handleSearchKeyDown}
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
