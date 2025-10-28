import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewchats } from "../../store/actions/chataction.jsx";
import { addNewMessage } from "../../store/Slicees/chatSlice";
import { HiSparkles, HiLightningBolt } from "react-icons/hi";
import { FiCpu } from "react-icons/fi";
// Import the broken down components
import ChatHeader from "./ChatHeader.jsx";
import EmptyChat from "./EmptyChat.jsx";
import MessagesContainer from "./MessagesContainer.jsx";
import ChatInput from "./ChatInput.jsx";

// Import styles
import "./ChatMessage.css";
import "./ButtonAnimation.css";

export default function ChatMessages({
  Messages,
  socketInstance,
  socket,
  desktop,
  selectedChatId,
  userDetails
}) {
  // State management
  const [selectedModel, setSelectedModel] = useState("gemini");
  const [openModelPopup, setOpenModelPopup] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [whichInput , setWhichInput] = useState('text');


  // Redux
  const dispatch = useDispatch();
  const chatId = useSelector((state) => state.chat.selectedChatId);

  // Refs
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  // Model configurations
  const models = [
    { id: 'gemini', name: 'Gemini Pro', icon: <HiSparkles />, color: 'bg-blue-500' },
    { id: 'gpt-4', name: 'GPT-4', icon: <HiLightningBolt />, color: 'bg-green-500' },
    { id: 'claude', name: 'Claude', icon: <FiCpu />, color: 'bg-purple-500' },
    
  ];

  // Event handlers
  const handleNewChat = () => {
    const title = prompt("Enter chat title:");
    if (!title) return;

    dispatch(
      createNewchats({
        tittle: title,
      })
    );
  };

  const handleSend = () => {
    if (!input.trim()) return;
    setLoading(true);
    socket.emit("ai-message", {
      chat: chatId,
      content: input,
      whichInput: whichInput,
      model: selectedModel,
    });
    dispatch(
      addNewMessage({
        _id: Date.now().toString(),
        content: input,
        chat: chatId,
        imageUrl: null,
        role: "user",
      })
    );
    setInput("");
  };

  const handleModelSelect = (model) => {
    setSelectedModel(model);
    setOpenModelPopup(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
// ---- set here text input as default
setWhichInput('text');

    }
  };

  // Effects
  useEffect(() => {
    const handleAiResponse = (data) => {
      console.log("AI Response:", data);
      dispatch(
        addNewMessage({
          _id: Date.now().toString(),
          content: data.content,
          chat: chatId,
          imageUrl: data?.imageUrl,
          role: "model",
        })
      );
      if (data) {
        setLoading(false);
      }
    };

    socketInstance.on("ai-repsonces", handleAiResponse);

    return () => {
      socketInstance.off("ai-response", handleAiResponse);
    };
  }, [chatId, dispatch, socketInstance]);

  // Main render
  return (
    <div className="flex flex-col h-full bg-[#212121]">
      <ChatHeader 
        selectedModel={selectedModel}
        models={models}
        onModelSelect={handleModelSelect}
        openModelPopup={openModelPopup}
        setOpenModelPopup={setOpenModelPopup}
      />

      {!selectedChatId ? (
        <EmptyChat onNewChat={handleNewChat} />
      ) : (
        <>
          <MessagesContainer 
            messages={Messages}
            loading={loading}
            messagesContainerRef={messagesContainerRef}
            messagesEndRef={messagesEndRef}
          />
          
          <ChatInput 
            whichInput={whichInput}
            setWhichInput={setWhichInput} 
            input={input}
            setInput={setInput}
            onSend={handleSend}
            loading={loading}
            onKeyPress={handleKeyPress}
          />
        </>
      )}
    </div>
  );
}

