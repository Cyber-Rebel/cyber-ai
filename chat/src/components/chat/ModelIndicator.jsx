import React from 'react';
import { AI_MODELS } from './ModelSelector.jsx';

const ModelIndicator = ({ modelId }) => {
  const model = AI_MODELS.find(m => m.id === modelId);
  
  if (!model) return null;

  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-[#2a2a2a] to-[#252525] border border-[#404040] rounded-lg shadow-sm">
      <div className="scale-75">
        {model.logo}
      </div>
      <span className="text-xs font-medium text-gray-400">{model.name}</span>
    </div>
  );
};

export default ModelIndicator;
