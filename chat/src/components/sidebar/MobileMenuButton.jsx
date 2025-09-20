import React from 'react';
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { MdOutlineRestaurantMenu } from "react-icons/md";

const MobileMenuButton = ({ open, setOpen, desktop }) => {
  if (desktop) return null;

  return (
    <button
      onClick={() => setOpen(!open)}
      className="fixed top-4 left-4 z-50 p-2 bg-[#2d2d2d] text-gray-300 rounded-lg hover:bg-[#3d3d3d] transition-colors duration-200"
    >
      {open ? <MdOutlineRestaurantMenu size={24} /> : <HiOutlineMenuAlt1 size={24} />}
    </button>
  );
};

export default MobileMenuButton;
