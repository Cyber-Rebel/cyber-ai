import React from 'react'
import ReactMarkdown from 'react-markdown'
import MessageActions from './MessageActions'
import InputBox from './InputBox'

const MessagesBox = React.forwardRef(({ messages, input, setInput, send }, ref) => (
  <div className="flex-1 flex flex-col">
    <div className="flex-1 overflow-y-auto px-8 py-6 flex flex-col gap-4" style={{scrollbarWidth:'thin'}} ref={ref}>
      {messages.map((msg) =>
        msg.from === 'ai' ? (
          <div className="flex" key={msg.id}>
            <div className="rounded-full relative w-10 h-10 bg-indigo-700 flex items-center justify-center mr-3 text-lg font-bold">A</div>
            <div className="bg-gray-800 text-gray-100 px-5 py-3 rounded-2xl max-w-xl shadow">
              <ReactMarkdown>{msg.text}</ReactMarkdown>
            </div>
          </div>
        ) : (
          <div className="flex justify-end" key={msg.id}>
            <div className="bg-indigo-600 text-white px-5 py-3 rounded-2xl max-w-xl shadow mr-3">{msg.text}</div>
            <div className="rounded-full w-10 h-10 bg-gray-700 flex items-center justify-center text-lg font-bold">U</div>
          </div>
        )
      )}
    </div>
    <div className="sticky bottom-0 w-full">
      <InputBox input={input} setInput={setInput} send={send} />
    </div>
  </div>
))

export default MessagesBox
