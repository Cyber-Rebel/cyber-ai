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
  // State management - with localStorage persistence for selected model
  const [selectedModel, setSelectedModel] = useState(() => {
    // Try to load from localStorage, default to 'gemini'
    const savedModel = localStorage.getItem('selectedAIModel');
    return savedModel || 'gemini';
  });
  const [openModelPopup, setOpenModelPopup] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [whichInput , setWhichInput] = useState('text');
  const [selectedFile, setSelectedFile] = useState(null); // { data: base64, type, name }


  // Redux
  const dispatch = useDispatch();
  const chatId = useSelector((state) => state.chat.selectedChatId);

  // Refs
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  // Model configurations - now handled in ModelSelector component

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
    // For file mode, allow sending even if input is empty (file is the content)
    if (!input.trim() && whichInput !== 'file') return;
    if (whichInput === 'file' && !selectedFile) return;

    const inputMode = whichInput;
    setLoading(true);

    if (inputMode === 'file' && selectedFile) {
      // Send file message
      socket.emit("ai-message", {
        chat: chatId,
        whichInput: 'file',
        prompt: input || 'Describe this file',
        file: selectedFile, // { data: base64, type, name }
        modelName: selectedModel,
      });
      dispatch(
        addNewMessage({
          _id: Date.now().toString(),
          content: input || 'Uploaded file: ' + selectedFile.name,
          chat: chatId,
          imageUrl: null,
          role: "user",
        })
      );
      setInput("");
      setSelectedFile(null);
      setWhichInput('text');
    } else {
      // Normal text or image mode
      socket.emit("ai-message", {
        chat: chatId,
        content: input,
        whichInput: inputMode,
        modelName: selectedModel,
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

      if (inputMode === "image") {
        setWhichInput("text");
      }
    }
  };

  const handleModelSelect = (model) => {
    setSelectedModel(model);
    // Save to localStorage for persistence
    localStorage.setItem('selectedAIModel', model);
    setOpenModelPopup(false);
    
    // Optional: Show a brief notification that model changed
    console.log(`✨ Switched to ${model} model`);
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
        setWhichInput("text"); // ensure UI returns to text mode after an image run completes
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
           title={selectedChatId}
          />
          
          <ChatInput 
            whichInput={whichInput}
            setWhichInput={setWhichInput} 
            input={input}
            setInput={setInput}
            onSend={handleSend}
            loading={loading}
            onKeyPress={handleKeyPress}
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
          />
        </>
      )}
    </div>
  );
}

