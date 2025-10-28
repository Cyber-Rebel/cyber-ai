import React, { useState } from 'react';
import { FiSend } from 'react-icons/fi';

const ChatInput = ({ input, setInput, onSend, loading, onKeyPress, whichInput, setWhichInput }) => {
  const [showUpload, setShowUpload] = useState(false);

  const handlePlusClick = () => {
    setShowUpload((prev) => !prev);
  };

const handleImageChange =()=>{
whichInput ==='text'? setWhichInput('image'):setWhichInput('text')

}
  return (
    <div className="border-t border-[#2d2d2d] bg-[#212121] p-4">
      <div className="max-w-4xl mx-auto">
        <div className="relative">
          <div className="flex items-center gap-2">

            <button  onClick={handleImageChange}  type='button' className="">
        AI Image
            </button>
            {/* Plus Button */}

            <button
              type="button"
              className="flex items-center justify-center w-12 h-10 rounded-full bg-cyan-600 hover:bg-cyan-700 text-white text-xl transition-colors focus:outline-none"
              onClick={handlePlusClick}
              aria-label="Add options"
            >
              +
            </button>
            {/* Upload Docs Option */}
            {showUpload && (
              <div className="absolute left-0 bottom-20 z-10 bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-4 flex flex-col gap-2 animate-fade-in">
                <label className="cursor-pointer text-white hover:text-cyan-400 transition-colors">
                  Upload Docs
                  <input  onChange={handleImageChange}  id="fileUpload"   accept="image/*" type="file" className="hidden" multiple />
                </label>
              </div>
            )}
            {/* Textarea and Send Button */}
            {whichInput==='text'&&
            <textarea
              value={input}
             
              
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={onKeyPress}
              placeholder="Message cyber-ai..."
              className="w-full resize-none border border-[#3d3d3d] bg-[#2d2d2d] text-gray-200 placeholder-gray-500 rounded-2xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[52px] max-h-32"
              rows={1}

              disabled={loading}
            />}
            <button
            onClick={onSend}
            disabled={!input.trim() || loading}
            className={`absolute right-3 top-1/3 transform -translate-y-1/2 p-2 rounded-xl transition-all duration-200 ${
              input.trim() && !loading
              ? 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg'
              : 'bg-[#3d3d3d] text-gray-500 cursor-not-allowed'
              }`}
              >
              <FiSend size={16} />
              </button>
              {whichInput==='image'&&
              <textarea
              value={input}
              
              
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={onKeyPress}
              placeholder="Create Image and cyber-ai..."
              className="w-full resize-none border border-[#3d3d3d] bg-[#2d2d2d] text-gray-200 placeholder-gray-500 rounded-2xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[52px] max-h-32"
              rows={1}
              disabled={loading}
            />  
              }
              
              
              
          </div>
          <div className="text-center mt-2">
            <p className="text-xs text-gray-500">
              cyber-ai can make mistakes. Check important info.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
