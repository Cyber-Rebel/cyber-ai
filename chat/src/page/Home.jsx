

import {  useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ChatSlider from "../components/ChatSlider.jsx";
import ChatMessages from "../components/chat/ChatMessages.jsx";
import { useSelector, useDispatch } from "react-redux";
import { io } from "socket.io-client";
import { API_URL } from "../config/api.config.js";
import { Chatfetch, Messagesfetch } from "../store/actions/chataction.jsx";
import {authenticateUser} from "../store/actions/useraction.jsx"

const Home = () => {
  const { chatId: urlChatId } = useParams();
  const navigate = useNavigate();
  const [desktop,setdesktop ] = useState(window.innerWidth >= 768); // Example: true if width >= 768px 1089>768 1089 sppose laptop
  const dispatch = useDispatch();
  const [socket, setSocket] = useState(null);
  const userDetails = useSelector((state) => state.user);
  let { selectedChatId, chats, Messages } = useSelector((state) => state.chat);

  const socketInstance = io('http://13.49.82.81/', {
    withCredentials: true,
  });
  const [loading,setLoading ] =useState(true)
  
  // Initial setup effect - runs once on mount
  useEffect(() => {
    const init = async () => {
      try {
        await Promise.all([
          dispatch(Chatfetch()),
          dispatch(authenticateUser())
        ]);
      } finally {
        // setLoading(false);
      }
    };

    init();
    setSocket(socketInstance);

    socketInstance.on("connect", () => {
      console.warn("Connected to server socket ");
    });

    window.addEventListener('resize',()=>{
      setdesktop(window.innerWidth >= 768)
    })
    
    return () => {
      setSocket(null);
    };
  }, []);

  // Effect to fetch messages when urlChatId changes
  useEffect(() => {
    if (urlChatId) {
      dispatch(Messagesfetch(urlChatId));
    }
  }, [urlChatId, dispatch]);

// console.log(desktop)

  return (<>
    <div className="flex h-screen bg-[#212121] overflow-hidden">
      {/* Sidebar */}
      <ChatSlider userDetails={userDetails} desktop={desktop} chats={chats} selectedChatId={selectedChatId} navigate={navigate} />
      
      {/* Main Chat Area */}
      <div className={`flex-1 flex flex-col ${!desktop ? 'w-full' : ''} relative bg-[#212121]`}>
        <ChatMessages 
          desktop={desktop} 
          userDetails={userDetails} 
          Messages={Messages} 
          socketInstance={socketInstance} 
          socket={socket} 
          selectedChatId={selectedChatId}    
        />
      </div>
    </div>
    </>
  );
};

export default Home;

// selcetedChatId == null tar create chat or Select chat dakhana hae