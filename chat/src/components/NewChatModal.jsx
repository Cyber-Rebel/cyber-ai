import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const NewChatModal = ({ isOpen, onClose, onSubmit }) => {
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (isOpen) {
      setTitle('');
      // Focus input when modal opens
      setTimeout(() => {
        document.getElementById('chat-title-input')?.focus();
      }, 100);
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onSubmit(title.trim());
      setTitle('');
      onClose();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-[#171717] border border-[#2d2d2d] rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#2d2d2d]">
          <h2 className="text-xl font-medium text-white">New Chat</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/5 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            <div>
              <label 
                htmlFor="chat-title-input" 
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Chat Title
              </label>
              <input
                id="chat-title-input"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="e.g., Python Project Help, Code Review..."
                className="w-full px-4 py-3 bg-[#212121] border border-[#2d2d2d] rounded-xl 
                         text-white placeholder-gray-500
                         focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/20
                         hover:border-[#404040] transition-all duration-200"
                maxLength={50}
              />
              <p className="text-xs text-gray-500 mt-2">
                {title.length}/50 characters
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 bg-white/5 hover:bg-white/10 
                       border border-white/10 rounded-xl text-gray-300 
                       transition-all duration-200 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!title.trim()}
              className={`flex-1 px-4 py-2.5 rounded-xl font-medium transition-all duration-200
                ${title.trim() 
                  ? 'bg-white/10 hover:bg-white/20 border border-white/20 text-white' 
                  : 'bg-white/5 border border-white/5 text-gray-500 cursor-not-allowed'
                }`}
            >
              Create Chat
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewChatModal;
