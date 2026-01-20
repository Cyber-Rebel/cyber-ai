const { Server } = require("socket.io");
const multer = require('multer');
const { authenticateSocket } = require('./auth.socket.js');
const {
  handleImageMessage,
  handleFileMessage,
  handleTextMessage
} = require('./message.handlers.js');

const upload = multer({
    storage: multer.memoryStorage()
})
const socketserver = (httpserver) => {
  // Get frontend URLs from environment variables
  const allowedOrigins = [
    "https://ai.cyberhash.me",
    'http://localhost:5173',
  ].filter(Boolean);

  const io = new Server(httpserver, {
    cors:{
      origin: allowedOrigins,
      allowedHeaders: [ "Content-Type", "Authorization" ], 
      credentials: true
    }
  });
  
  io.use(authenticateSocket);

  io.on("connection", (socket) => {
    //  console.log("✅ User connected",socket.user);// Line remove rs

    socket.on("ai-message", async (messagepayload) => {
      console.log("Received ai-message:", messagepayload);
      if(messagepayload.content?.length>5000){
         return socket.emit("ai-repsonces", {
          content: "Message too long, please limit to 5000 characters.",
          chat: messagepayload.chat,
        })
      }
      console.log("Processing ai-message with whichInput:", messagepayload.whichInput);
      
      if(messagepayload.whichInput==='image'){
        await handleImageMessage(socket, messagepayload);
      } else if (messagepayload.whichInput === 'file') {
        await handleFileMessage(socket, messagepayload);
      } else {
        await handleTextMessage(socket, messagepayload);
      }
    });
  });
};

module.exports = socketserver;
