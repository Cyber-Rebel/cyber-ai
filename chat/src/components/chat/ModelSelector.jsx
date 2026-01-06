import React from 'react';
import { HiSparkles } from 'react-icons/hi';
import { FiCpu, FiSearch } from 'react-icons/fi';
import { SiMeta } from 'react-icons/si';

// Export models array so it can be used in other components
export const AI_MODELS = [
  { 
    id: 'gemini', 
    name: 'Gemini Pro',
    description: 'Google AI',
    logo: (
      <div className="relative w-8 h-8 flex-shrink-0">
        {/* Gemini Logo - Google's multicolor star/sparkle design */}
        <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-lg">
          <defs>
            <linearGradient id="gemini-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{stopColor: '#4285F4', stopOpacity: 1}} />
              <stop offset="33%" style={{stopColor: '#9B72F2', stopOpacity: 1}} />
              <stop offset="66%" style={{stopColor: '#D96570', stopOpacity: 1}} />
              <stop offset="100%" style={{stopColor: '#F9AB00', stopOpacity: 1}} />
            </linearGradient>
          </defs>
          <circle cx="32" cy="32" r="28" fill="url(#gemini-gradient)" opacity="0.15"/>
          <path d="M32 8 L40 28 L32 32 L24 28 Z" fill="#4285F4"/>
          <path d="M56 32 L36 40 L32 32 L36 24 Z" fill="#EA4335"/>
          <path d="M32 56 L24 36 L32 32 L40 36 Z" fill="#FBBC04"/>
          <path d="M8 32 L28 24 L32 32 L28 40 Z" fill="#34A853"/>
          <circle cx="32" cy="32" r="6" fill="white" opacity="0.9"/>
        </svg>
      </div>
    )
  },
  { 
    id: 'deepseek', 
    name: 'DeepSeek',
    description: 'Advanced AI',
    logo: (
      <div className="relative w-8 h-8 flex-shrink-0">
        {/* DeepSeek Logo - Deep neural network visualization */}
        <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-lg">
          <defs>
            <linearGradient id="deepseek-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{stopColor: '#667EEA', stopOpacity: 1}} />
              <stop offset="100%" style={{stopColor: '#764BA2', stopOpacity: 1}} />
            </linearGradient>
            <radialGradient id="deepseek-glow">
              <stop offset="0%" style={{stopColor: '#A78BFA', stopOpacity: 0.8}} />
              <stop offset="100%" style={{stopColor: '#667EEA', stopOpacity: 0}} />
            </radialGradient>
          </defs>
          <circle cx="32" cy="32" r="30" fill="url(#deepseek-gradient)"/>
          <circle cx="32" cy="32" r="24" fill="url(#deepseek-glow)"/>
          <path d="M 20 32 Q 26 24 32 32 T 44 32" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
          <path d="M 22 38 Q 27 34 32 38 T 42 38" stroke="white" strokeWidth="2" fill="none" opacity="0.7" strokeLinecap="round"/>
          <path d="M 22 26 Q 27 30 32 26 T 42 26" stroke="white" strokeWidth="2" fill="none" opacity="0.7" strokeLinecap="round"/>
          <circle cx="20" cy="32" r="3" fill="white"/>
          <circle cx="32" cy="32" r="3" fill="white"/>
          <circle cx="44" cy="32" r="3" fill="white"/>
        </svg>
      </div>
    )
  },
  { 
    id: 'websearch', 
    name: 'Web Search',
    description: 'Internet Search',
    logo: (
      <div className="relative w-8 h-8 flex-shrink-0">
        {/* Web Search Logo - Globe with magnifying glass */}
        <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-lg">
          <defs>
            <linearGradient id="websearch-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{stopColor: '#10B981', stopOpacity: 1}} />
              <stop offset="100%" style={{stopColor: '#059669', stopOpacity: 1}} />
            </linearGradient>
          </defs>
          <circle cx="32" cy="32" r="30" fill="url(#websearch-gradient)"/>
          <circle cx="28" cy="26" r="12" stroke="white" strokeWidth="3" fill="none"/>
          <line x1="36" y1="34" x2="44" y2="42" stroke="white" strokeWidth="3.5" strokeLinecap="round"/>
          <path d="M 15 48 L 18 45" stroke="white" strokeWidth="2" opacity="0.6" strokeLinecap="round"/>
          <path d="M 20 50 L 24 46" stroke="white" strokeWidth="2" opacity="0.6" strokeLinecap="round"/>
          <path d="M 46 18 L 49 15" stroke="white" strokeWidth="2" opacity="0.6" strokeLinecap="round"/>
          <path d="M 50 20 L 54 16" stroke="white" strokeWidth="2" opacity="0.6" strokeLinecap="round"/>
        </svg>
      </div>
    )
  },
  { 
    id: 'codingdeepseek', 
    name: 'Coding DeepSeek',
    description: 'Code Expert AI',
    logo: (
      <div className="relative w-8 h-8 flex-shrink-0">
        {/* Coding DeepSeek Logo - Code brackets with neural style */}
        <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-lg">
          <defs>
            <linearGradient id="coding-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{stopColor: '#8B5CF6', stopOpacity: 1}} />
              <stop offset="100%" style={{stopColor: '#6366F1', stopOpacity: 1}} />
            </linearGradient>
          </defs>
          <circle cx="32" cy="32" r="30" fill="url(#coding-gradient)"/>
          <path d="M 20 22 L 14 32 L 20 42" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M 44 22 L 50 32 L 44 42" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M 36 20 L 28 44" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        </svg>
      </div>
    )
  },
  { 
    id: 'serper', 
    name: 'Serper Search',
    description: 'Web Search AI',
    logo: (
      <div className="relative w-8 h-8 flex-shrink-0">
        {/* Serper Logo - Search magnifying glass with data streams */}
        <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-lg">
          <defs>
            <linearGradient id="serper-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{stopColor: '#10B981', stopOpacity: 1}} />
              <stop offset="100%" style={{stopColor: '#059669', stopOpacity: 1}} />
            </linearGradient>
          </defs>
          <circle cx="32" cy="32" r="30" fill="url(#serper-gradient)"/>
          <circle cx="28" cy="26" r="12" stroke="white" strokeWidth="3" fill="none"/>
          <line x1="36" y1="34" x2="44" y2="42" stroke="white" strokeWidth="3.5" strokeLinecap="round"/>
          <path d="M 15 48 L 18 45" stroke="white" strokeWidth="2" opacity="0.6" strokeLinecap="round"/>
          <path d="M 20 50 L 24 46" stroke="white" strokeWidth="2" opacity="0.6" strokeLinecap="round"/>
          <path d="M 46 18 L 49 15" stroke="white" strokeWidth="2" opacity="0.6" strokeLinecap="round"/>
          <path d="M 50 20 L 54 16" stroke="white" strokeWidth="2" opacity="0.6" strokeLinecap="round"/>
        </svg>
      </div>
    )
  },
  { 
    id: 'llama', 
    name: 'Llama (Meta)',
    description: 'Meta AI',
    logo: (
      <div className="relative w-8 h-8 flex-shrink-0">
        {/* Llama/Meta Logo - Infinity symbol with gradient */}
        <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-lg">
          <defs>
            <linearGradient id="meta-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{stopColor: '#0081FB', stopOpacity: 1}} />
              <stop offset="50%" style={{stopColor: '#0099FF', stopOpacity: 1}} />
              <stop offset="100%" style={{stopColor: '#00D4FF', stopOpacity: 1}} />
            </linearGradient>
          </defs>
          <circle cx="32" cy="32" r="30" fill="url(#meta-gradient)"/>
          <path d="M 16 32 C 16 24, 22 20, 28 24 C 30 25.5, 32 28, 32 32 C 32 28, 34 25.5, 36 24 C 42 20, 48 24, 48 32 C 48 40, 42 44, 36 40 C 34 38.5, 32 36, 32 32 C 32 36, 30 38.5, 28 40 C 22 44, 16 40, 16 32 Z" 
            fill="white" 
            stroke="white" 
            strokeWidth="0.5"/>
          <circle cx="23" cy="28" r="2.5" fill="url(#meta-gradient)"/>
          <circle cx="41" cy="28" r="2.5" fill="url(#meta-gradient)"/>
        </svg>
      </div>
    )
  }
];

const ModelSelector = ({ selectedModel, onModelSelect, isOpen, onToggle }) => {
  const models = AI_MODELS;

  const currentModel = models.find(m => m.id === selectedModel) || models[0];

  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="flex items-center gap-2 px-3 py-2.5 bg-gradient-to-r from-[#2d2d2d] to-[#252525] hover:from-[#3a3a3a] hover:to-[#2d2d2d] text-gray-200 rounded-xl transition-all duration-200 border border-[#404040] hover:border-[#505050] shadow-lg hover:shadow-xl group"
      >
        <div className="transform group-hover:scale-110 transition-transform duration-200">
          {currentModel.logo}
        </div>
        <svg 
          className={`w-4 h-4 transition-transform duration-200 text-gray-400 ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={onToggle}
          />
          <div className="absolute right-0 top-full mt-2 w-72 bg-[#2a2a2a] border border-[#404040] rounded-2xl shadow-2xl py-2 z-50 overflow-hidden backdrop-blur-xl model-selector-dropdown">
            <div className="px-4 py-3 border-b border-[#404040] bg-gradient-to-r from-[#252525] to-[#2a2a2a]">
              <p className="text-xs text-gray-400 font-bold tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
                SELECT AI MODEL
              </p>
            </div>
            <div className="py-1 max-h-96 overflow-y-auto custom-scrollbar">
              {models.map((model) => (
                <button
                  key={model.id}
                  onClick={() => {
                    onModelSelect(model.id);
                    onToggle();
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 hover:bg-gradient-to-r hover:from-[#353535] hover:to-[#3a3a3a] transition-all duration-150 group ${
                    selectedModel === model.id ? 'bg-gradient-to-r from-[#2d3748] to-[#333333] border-l-4 border-cyan-400' : ''
                  }`}
                >
                  <div className={`flex-shrink-0 transform group-hover:scale-110 transition-transform duration-200 ${selectedModel === model.id ? 'model-logo-active' : ''}`}>
                    {model.logo}
                  </div>
                  <div className="flex-1 text-left">
                    <div className={`text-sm font-semibold mb-0.5 ${
                      selectedModel === model.id ? 'text-cyan-400' : 'text-gray-300'
                    }`}>
                      {model.name}
                    </div>
                    <div className="text-xs text-gray-500">{model.description}</div>
                  </div>
                  {selectedModel === model.id && (
                    <div className="flex-shrink-0">
                      <svg className="w-5 h-5 text-cyan-400 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ModelSelector;
