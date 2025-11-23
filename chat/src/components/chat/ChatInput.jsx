import React, { useState, useRef, useEffect } from 'react';
import { FiSend, FiPlus, FiPaperclip, FiImage, FiMic, FiX } from 'react-icons/fi';
import { BsStopCircle } from 'react-icons/bs';

const ChatInput = ({ input, setInput, onSend, loading, onKeyPress, whichInput, setWhichInput }) => {
  const [showUpload, setShowUpload] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);

  const handlePlusClick = () => {
    setShowUpload((prev) => !prev);
  };

  const handleImageChange = () => {
    whichInput === 'text' ? setWhichInput('image') : setWhichInput('text');
    setShowUpload(false);
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const scrollHeight = textareaRef.current.scrollHeight;
      const maxHeight = 200; // max-height equivalent
      textareaRef.current.style.height = Math.min(scrollHeight, maxHeight) + 'px';
    }
  }, [input]);

  // Enhanced key handling
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (input.trim() && !loading) {
        onSend();
      }
    }
    if (e.key === 'Escape') {
      setShowUpload(false);
    }
  };

  // Drag and drop handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      // Handle file upload logic here
      console.log('Files dropped:', files);
    }
  };

  // Close upload menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showUpload && !event.target.closest('.upload-menu')) {
        setShowUpload(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showUpload]);

  return (
    <div className="relative bg-transparent">
      {/* Drag Overlay */}
      {dragOver && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border-2 border-dashed border-cyan-400 rounded-2xl p-8 text-center">
            <FiPaperclip size={48} className="mx-auto text-cyan-400 mb-4" />
            <p className="text-xl text-white font-medium">Drop files to upload</p>
            <p className="text-gray-400 mt-2">Release to attach files to your message</p>
          </div>
        </div>
      )}

      {/* Main Input Container */}
      <div className="max-w-4xl mx-auto px-4 pb-6">
        <div className="relative">
          {/* Enhanced Input Box */}
          <div 
            className={`
              relative flex items-end gap-3 p-4 rounded-3xl transition-all duration-300 ease-in-out
              ${isFocused 
                ? 'bg-white/8 border border-cyan-400/40 shadow-lg shadow-cyan-500/15 scale-[1.02]' 
                : 'bg-white/[0.03] border border-white/10 hover:border-white/20 hover:bg-white/5'
              }
              ${dragOver ? 'border-cyan-400/60 bg-cyan-500/10' : ''}
              backdrop-blur-xl
            `}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            
            {/* Left Actions */}
            <div className="flex items-center gap-2">
              {/* Plus Button */}
              <div className="relative upload-menu">
                <button
                  type="button"
                  className={`
                    group flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/20
                    ${showUpload 
                      ? 'bg-cyan-500/20 border border-cyan-500/40 text-cyan-400' 
                      : 'bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-500/30 text-gray-400 hover:text-cyan-400'
                    }
                  `}
                  onClick={handlePlusClick}
                  aria-label="Add attachments"
                  aria-expanded={showUpload}
                >
                  {showUpload ? (
                    <FiX size={18} className="transition-transform" />
                  ) : (
                    <FiPlus size={18} className="transition-transform group-hover:rotate-90" />
                  )}
                </button>

                {/* Upload Options Dropdown */}
                {showUpload && (
                  <div className="absolute left-0 bottom-full mb-2 z-20 bg-slate-900/95 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-2 min-w-[220px] animate-in slide-in-from-bottom-2 duration-200">
                    <div className="space-y-1">
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center gap-3 w-full p-3 rounded-xl text-gray-300 hover:text-cyan-400 hover:bg-white/8 transition-all duration-200 group text-left"
                      >
                        <FiPaperclip size={16} className="text-gray-400 group-hover:text-cyan-400 flex-shrink-0" />
                        <div>
                          <span className="text-sm font-medium">Upload Files</span>
                          <p className="text-xs text-gray-500 group-hover:text-gray-400">Documents, images, etc.</p>
                        </div>
                      </button>
                      <button 
                        onClick={handleImageChange}
                        className="flex items-center gap-3 w-full p-3 rounded-xl text-gray-300 hover:text-cyan-400 hover:bg-white/8 transition-all duration-200 group text-left"
                      >
                        <FiImage size={16} className="text-gray-400 group-hover:text-cyan-400 flex-shrink-0" />
                        <div>
                          <span className="text-sm font-medium">Image Mode</span>
                          <p className="text-xs text-gray-500 group-hover:text-gray-400">Generate or analyze images</p>
                        </div>
                      </button>
                      <button className="flex items-center gap-3 w-full p-3 rounded-xl text-gray-300 hover:text-cyan-400 hover:bg-white/8 transition-all duration-200 group text-left">
                        <FiMic size={16} className="text-gray-400 group-hover:text-cyan-400 flex-shrink-0" />
                        <div>
                          <span className="text-sm font-medium">Voice Input</span>
                          <p className="text-xs text-gray-500 group-hover:text-gray-400">Coming soon</p>
                        </div>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Mode Indicator */}
              {whichInput === 'image' && (
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30">
                  <FiImage size={12} className="text-purple-400" />
                  <span className="text-xs font-medium text-purple-300">Image Mode</span>
                </div>
              )}
            </div>

            {/* Main Input Area */}
            <div className="flex-1 relative">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder={whichInput === 'image' ? "Describe the image you want to create..." : "Message cyber-ai..."}
                className="w-full resize-none bg-transparent text-gray-100 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 py-2 px-1 text-[15px] leading-6 max-h-[200px] custom-scrollbar"
                rows={1}
                disabled={loading}
                style={{ 
                  minHeight: '24px',
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none'
                }}
                aria-label="Message input"
              />
              
              {/* Character Count */}
              {input.length > 1000 && (
                <div className="absolute -bottom-5 right-0 text-xs text-gray-500">
                  {input.length}/2000
                </div>
              )}
            </div>

            {/* Send Button */}
            <div className="flex items-end">
              <button
                onClick={onSend}
                disabled={!input.trim() || loading}
                className={`
                  flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:ring-offset-2 focus:ring-offset-transparent
                  ${input.trim() && !loading
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-400 hover:to-blue-400 hover:shadow-lg hover:shadow-cyan-500/25 hover:scale-110 active:scale-95' 
                    : 'bg-white/5 text-gray-500 cursor-not-allowed'
                  }
                `}
                aria-label={loading ? "Sending message..." : "Send message"}
              >
                {loading ? (
                  <BsStopCircle size={18} className="animate-pulse" />
                ) : (
                  <FiSend size={16} className={input.trim() ? "translate-x-0.5 transition-transform" : ""} />
                )}
              </button>
            </div>
          </div>

                
         
          {/* Hidden File Input */}
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            multiple
            accept="image/*,text/*,.pdf,.doc,.docx"
            onChange={handleImageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
