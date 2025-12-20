import React, { memo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useSpeechSynthesis } from 'react-speech-kit'
import { Volume2, Square } from 'lucide-react'

const MessageBubble = memo(({ message }) => {
  const { speak, cancel, speaking } = useSpeechSynthesis();

 
  return (
    <div className={`flex gap-4 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
      {message.role !== 'user' && (
        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
          <div className="text-white" size={16} />
        </div>
      )}
      
      <div className={`max-w-[80%] ${message.role === 'user' ? 'order-1' : ''}`}>
        <div
          className={`rounded-2xl px-4 py-3 ${
            message.role === 'user'
              ? 'bg-[#2d2d2d] text-gray-200 ml-auto'
              : 'bg-transparent text-gray-200'
          }`}
        >
          {/* Show image above text for both user and model messages */}
          {message.imageUrl && (
            <div className="mb-3">
              <img 
                src={message.imageUrl} 
                alt={message.role === 'user' ? 'Uploaded' : 'Generated'} 
                className="rounded-lg max-w-full h-auto max-h-[400px] object-contain" 
              />
            </div>
          )}

          {message.role === 'user' ? (
            <p className="whitespace-pre-wrap">{message.content}</p>
          ) : (
            <>
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={{
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '');
                    return !inline && match ? (
                      <SyntaxHighlighter
                        style={dracula}
                        language={match[1]}
                        PreTag="div"
                        className="rounded-lg my-2"
                        {...props}
                      >
                        {String(children).replace(/\n$/, '')}
                      </SyntaxHighlighter>
                    ) : (
                      <code className="text-green-600 px-1 py-0.5 rounded text-sm" {...props}>
                        {children}
                      </code>
                    );
                  },
                }}
              >
                {message.content}
              </ReactMarkdown>
              
              {/* GPT-style icon buttons for speak/stop */}
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => speak({ text: message.content })}
                  disabled={speaking}
                  aria-label="Read aloud"
                  className="p-2 rounded-md hover:bg-gray-700 text-gray-400 hover:text-gray-200 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  title={speaking ? 'Speaking...' : 'Read aloud'}
                >
                  <Volume2 size={18} strokeWidth={1.5} />
                </button>
                
                {speaking && (
                  <button
                    onClick={() => cancel()}
                    aria-label="Stop reading"
                    className="p-2 rounded-md hover:bg-red-900/30 text-red-400 hover:text-red-300 transition-colors duration-200"
                    title="Stop reading"
                  >
                    <Square size={18} strokeWidth={1.5} fill="currentColor" />
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
});

export default MessageBubble;
