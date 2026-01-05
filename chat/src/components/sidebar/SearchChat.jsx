import React, { useState, useRef } from 'react'
import { FaSearch } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { searchChats } from '../../store/actions/chataction.jsx'

const SearchChat = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const debounceRef = useRef(null)
  const dispatch = useDispatch()

  const handleSearchChange = (e) => {
    const value = e.target.value
    setSearchQuery(value)

    // clear previous timer
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }

    // debounce search
    debounceRef.current = setTimeout(() => {
      dispatch(searchChats(value))
    }, 300)
  }

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
      }
      dispatch(searchChats(searchQuery))
    }
  }

  return (
    <div className="relative">
      <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#b3b3b3] text-sm pointer-events-none" />
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        onKeyDown={handleSearchKeyDown}
        placeholder="Search chats..."
        className="w-full bg-[#242424] text-white pl-12 pr-4 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-[#1db954]"
      />
    </div>
  )
}

export default SearchChat
