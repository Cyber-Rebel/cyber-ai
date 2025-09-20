

import {  useEffect, useState } from "react";
import ChatSlider from "../components/ChatSlider.jsx";
import ChatMessages from "../components/chat/ChatMessages.jsx";
import { useSelector, useDispatch } from "react-redux";
import { io } from "socket.io-client";
import { Chatfetch, Messagesfetch } from "../store/actions/chataction.jsx";
import {authenticateUser} from "../store/actions/useraction.jsx"
import  { API_URL } from "../api/axios.jsx";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const Home = () => {
  const [desktop,setdesktop ] = useState(window.innerWidth >= 768); // Example: true if width >= 768px 1089>768 1089 sppose laptop
  const dispatch = useDispatch();
  const [socket, setSocket] = useState(null);
  const userDetails = useSelector((state) => state.user);
  console.log(userDetails)
  let { selectedChatId, chats, Messages } = useSelector((state) => state.chat);
  const socketInstance = io(API_URL, {
    withCredentials: true,
  });
  const [loading,setLoading ] = useState(true)
  console.log("Selected Chat ID:", selectedChatId);
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

// console.log(desktop)

  return (<>
    <div className="flex h-screen bg-[#212121] overflow-hidden">
      {/* Sidebar */}
      <ChatSlider userDetails={userDetails} desktop={desktop} chats={chats} selectedChatId={selectedChatId} />
      
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