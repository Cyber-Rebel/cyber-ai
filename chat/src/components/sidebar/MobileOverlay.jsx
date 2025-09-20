import React from 'react';

const MobileOverlay = ({ open, setOpen, desktop }) => {
  if (desktop || !open) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-30"
      onClick={() => setOpen(false)}
    />
  );
};

export default MobileOverlay;
