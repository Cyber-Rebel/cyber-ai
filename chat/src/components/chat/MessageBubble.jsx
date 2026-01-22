import React, { memo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useSpeechSynthesis } from 'react-speech-kit'
import { Volume2, Square, Copy, Download, Check } from 'lucide-react';
import toast from 'react-hot-toast';
import { useState } from 'react';

const CodeBlock = ({ language, code }) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
      toast.success('Copied to clipboard!');
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy code');
    }
  };

  const downloadCode = () => {
    try {
      const blob = new Blob([code], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `code.${language || 'txt'}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast.success('Code downloaded!');
    } catch (err) {
      toast.error('Failed to download code');
    }
  };

  return (
    <div className="relative group rounded-lg overflow-hidden my-4 border border-gray-700/50">
      <div className="flex items-center justify-between bg-[#1e1e1e] px-4 py-2 border-b border-gray-700/50">
        <span className="text-xs font-mono text-gray-400 uppercase">{language}</span>
        <div className="flex gap-2">
          <button
            onClick={copyToClipboard}
            className="p-1.5 rounded-md hover:bg-gray-700 text-gray-400 hover:text-white transition-colors"
            title="Copy code"
          >
            {isCopied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
          </button>
          <button
            onClick={downloadCode}
            className="p-1.5 rounded-md hover:bg-gray-700 text-gray-400 hover:text-white transition-colors"
            title="Download code"
          >
            <Download size={14} />
          </button>
        </div>
      </div>
      <SyntaxHighlighter
        style={dracula}
        language={language}
        PreTag="div"
        customStyle={{
          margin: 0,
          borderRadius: 0,
          background: 'transparent',
          padding: '1rem',
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

const MessageBubble = memo(({ message }) => {
  const { speak, cancel, speaking } = useSpeechSynthesis();
  const [isTextCopied, setIsTextCopied] = useState(false);

  const copyTextToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setIsTextCopied(true);
      toast.success('Copied to clipboard!');
      setTimeout(() => setIsTextCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy text');
    }
  };

  const downloadImage = async (imageUrl) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `image-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast.success('Image downloaded!');
    } catch (err) {
      toast.error('Failed to download image');
    }
  };

  return (
    <div className={`flex gap-4 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
      {message.role !== 'user' && (
        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
          <div className="text-white" size={16} />
        </div>
      )}

      <div className={`max-w-[80%] ${message.role === 'user' ? 'order-1' : ''}`}>
        <div
          className={`rounded-2xl px-4 py-3 ${message.role === 'user'
            ? 'bg-[#2d2d2d] text-gray-200 ml-auto'
            : 'bg-transparent text-gray-200'
            }`}
        >
          {/* Show image above text for both user and model messages */}
          {message.imageUrl && (
            <div className="mb-3 relative group/image">
              <img
                src={message.imageUrl}
                alt={message.role === 'user' ? 'Uploaded' : 'Generated'}
                className="rounded-lg max-w-full h-auto max-h-[400px] object-contain"
              />
              <button
                onClick={() => downloadImage(message.imageUrl)}
                className="absolute top-2 right-2 p-2 rounded-lg bg-black/60 hover:bg-black/80 text-white opacity-0 group-hover/image:opacity-100 transition-opacity duration-200"
                title="Download image"
              >
                <Download size={18} />
              </button>
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
                    const codeString = String(children).replace(/\n$/, '');

                    return !inline && match ? (
                      <CodeBlock language={match[1]} code={codeString} />
                    ) : (
                      <code className="text-green-600 px-1 py-0.5 rounded text-sm font-mono bg-gray-800/30" {...props}>
                        {children}
                      </code>
                    );
                  },
                  a: ({ node, ...props }) => {
                    return (
                      <a
                        {...props}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 underline break-all"
                      />
                    );
                  }
                }}
              >
                {message.content}
              </ReactMarkdown>

              {/* GPT-style icon buttons for speak/stop/copy */}
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

                <button
                  onClick={copyTextToClipboard}
                  aria-label="Copy text"
                  className="p-2 rounded-md hover:bg-gray-700 text-gray-400 hover:text-gray-200 transition-colors duration-200"
                  title="Copy text"
                >
                  {isTextCopied ? <Check size={18} strokeWidth={1.5} className="text-green-500" /> : <Copy size={18} strokeWidth={1.5} />}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
});

export default MessageBubble;
