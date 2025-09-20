import React from 'react';
import { FiMessageSquare } from 'react-icons/fi';

const ChatHeader = ({ selectedModel, models, onModelSelect, openModelPopup, setOpenModelPopup }) => {
  return (
    <div className="border-b border-[#2d2d2d] bg-[#212121] px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <img src="logo3.png" alt="" />
            <div className="text-white" size={16} />
          </div>
          <div>
            <h1 className="font-semibold text-gray-200">cyber-ai</h1>
            <p className="text-sm text-gray-400">
              {selectedModel === 'gemini' ? 'Gemini Pro' : 
               selectedModel === 'gpt-4' ? 'GPT-4' : 'Claude'} <span className="text-green-400">•</span> Online
            </p>
          </div>
        </div>
        
        {/* Model Selector */}
        <div className="relative">
          <button
            onClick={() => setOpenModelPopup(!openModelPopup)}
            className="flex items-center gap-2 px-3 py-2 bg-[#2d2d2d] hover:bg-[#3d3d3d] text-gray-200 rounded-lg transition-colors duration-200"
          >
            <div className={`w-2 h-2 rounded-full ${models.find(m => m.id === selectedModel)?.color}`} />
            <span className="text-sm font-medium">
              {models.find(m => m.id === selectedModel)?.name}
            </span>
            <div size={14} />
          </button>
          
          {/* Model Dropdown */}
          {openModelPopup && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-[#2d2d2d] border border-[#3d3d3d] rounded-xl shadow-lg py-2 z-10">
              {models.map((model) => (
                <button
                  key={model.id}
                  onClick={() => onModelSelect(model.id)}
                  className={`w-full flex items-center gap-3 px-4 py-2 hover:bg-[#3d3d3d] transition-colors duration-200 ${
                    selectedModel === model.id ? 'bg-[#3d3d3d] text-blue-400' : 'text-gray-300'
                  }`}
                >
                  <div className={`w-2 h-2 rounded-full ${model.color}`} />
                  <span className="text-sm font-medium">{model.name}</span>
                  {model.icon}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
