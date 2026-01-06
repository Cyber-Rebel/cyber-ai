import React from 'react';
import ModelSelector, { AI_MODELS } from './ModelSelector.jsx';

const ChatHeader = ({ selectedModel, onModelSelect, openModelPopup, setOpenModelPopup }) => {
  const currentModel = AI_MODELS.find(m => m.id === selectedModel) || AI_MODELS[0];

  return (
    <div className="border-b border-[#2d2d2d] bg-[#212121] px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
            <img src="logo3.png" alt="cyber-ai" className="w-full h-full rounded-full object-cover" />
          </div>
          <div>
            <h1 className="font-semibold text-gray-200 text-lg">cyber-ai</h1>
            
          </div>
        </div>
        
        
       <div>
        <div className="flex items-center gap-4">
  <span className="flex items-center gap-2 text-gray-300 text-sm">
    <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></span>
    Online
  </span>


</div>

       </div>
      </div>
    </div>
  );
};

export default ChatHeader;
