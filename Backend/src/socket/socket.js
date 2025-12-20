const { Server } = require("socket.io");
const cookie = require("cookie");
const jwt = require("jsonwebtoken");
const UserModels = require("../Models/user.models.js");
const Message = require("../Models/message.model.js");
const { geminiresponce,generatevector ,geminiResponseWithFile } = require("../services/ai.services.js");
const ImageGenerate = require('../services/Imagegererate.js');
const multer = require('multer');
const {createMemory,queryMemory} = require('../services/vector.services.js');
const {uploadfile , anyfileupload} = require("../services/storge.service.js");
const upload = multer({
    storage: multer.memoryStorage()
})
const socketserver = (httpserver) => {
  // Get frontend URLs from environment variables
  const allowedOrigins = [
    process.env.FRONTEND_URL,
    process.env.FRONTEND_URL_ALT,
    process.env.PRODUCTION_URL
  ].filter(Boolean);

  const io = new Server(httpserver, {
    cors:{
      origin: allowedOrigins,
      allowedHeaders: [ "Content-Type", "Authorization" ], 
      credentials: true
    }
  });
  
  io.use(async (socket, next) => {
    try{
    const cookies = cookie.parse(socket.handshake.headers?.cookie || "");
    if (!cookies.token) {
      next(new Error("Authetntication error"));
    }
    try {
      const decode =  jwt.verify(cookies.token, process.env.JWT_SECRET);
    

      const user = await UserModels.findById({ _id: decode.id }).select(
        "-password"
      );
      if (!user) {
       return next(new Error("User not found")); // res not so next new Erro
      }

      socket.user = user; 
    } catch (error) {
      console.error("Authentication error:", error);
      return next(new Error("Authentication error"));
    }
    next();}
    catch(error){
      console.log('Errror'+error)
    }
  });

  io.on("connection", (socket) => {
    //  console.log("✅ User connected",socket.user);// Line remove rs
 
// Test socket emit and on
    // socket.emit('sey',"Server hsay hello to you")
    // socket.on('frontend',(F)=>{
    //   console.log(F)
    //   })

    socket.on("ai-message", async (messagepayload) => {
      //p1
      // console.log(messagepayload.whichInput)
      if(messagepayload.whichInput==='image'){
const data =  await ImageGenerate(messagepayload.content)

          
 Message.create({
   chat: messagepayload.chat,
   content: messagepayload.content,
   user: socket.user._id,
   role: "user",
      })


    const response =  await  Message.create({
  chat: messagepayload.chat,
  content: "Image generated successfully",
  user: socket.user._id,
   imageUrl:data,
  role: "model",
  
})
console.log("Generated image url:",response)

socket.emit("ai-repsonces", { // np103177@gmail.com
        content: response.content,
        imageUrl:response.imageUrl,
        chat: messagepayload.chat,
      })


    } else if (messagepayload.whichInput === 'file') {
      try {
        // messagepayload.file should be: { data: base64String, type: 'image/png', name: 'file.png' }
        const fileData = messagepayload.file;
        if (!fileData || !fileData.data) {
          console.error('No file data received');
          socket.emit('ai-repsonces', { content: 'No file received', chat: messagepayload.chat });
          return;
        }

        console.log('File received at socket server:', fileData.name || 'unnamed');

        // Convert base64 to buffer for storage
        const fileBuffer = Buffer.from(fileData.data, 'base64');
        const uploadResult = await anyfileupload(fileBuffer);

        // Save user message with uploaded file URL
        await Message.create({
          chat: messagepayload.chat,
          content: messagepayload.prompt || '',
          user: socket.user._id,
          role: 'user',
          imageUrl: uploadResult.url
        });

        // Gemini call with file (expects { data: base64, type: mimeType })
        const aiReply = await geminiResponseWithFile(
          messagepayload.prompt || 'Describe this file',
          { data: fileData.data, type: fileData.type || 'application/octet-stream' }
        );

        // Emit response
        socket.emit('ai-repsonces', {
          content: aiReply,
          chat: messagepayload.chat
        });

        // Save AI message
        await Message.create({
          chat: messagepayload.chat,
          content: aiReply,
          user: socket.user._id,
          role: 'model'
        });
      } catch (err) {
        console.error('Error processing file:', err);
        socket.emit('ai-repsonces', { content: 'Error processing file', chat: messagepayload.chat });
      }






    }
      
else{



const [ messagereponse ,vector]= await Promise.all([
 Message.create({
   chat: messagepayload.chat,
   content: messagepayload.content,
   user: socket.user._id,
   role: "user",
      }),

       generatevector(messagepayload.content)

])
// ese aap ek two asyn funcation ek asycn funcation suppose 3s time lag raha hae but dusra ek asycs funation ko 4s lag rahe hae to total time 7s hoga 
// const []= await Promise.all([]) // But in case ek uppar wali sirf jis ek asyn funcation jadya time lage sirf use utna total time lagefa matlab total time 4s hoga  
// promise.all([]) ese ek yaad dyan har to asyns funcation ek durse par depende nahi karna chaiye 

//p2

await createMemory({  
  vector:vector,
        messageId:messagereponse._id,
        metadata:{ 
          chat:messagepayload.chat,
          user: socket.user._id,
          text:messagepayload.content

        }

      })
//p3

const [chatHistory,Memory]= await Promise.all([
   Message.find({ chat: messagepayload.chat })
          .sort({ createdAt: -1 })
          .limit(10)
          .lean()
      .then(messages => messages.reverse()),
        queryMemory({
        queryVector:vector,
        limit:4,   
        metadata:{
             user: socket.user._id
        }
      } )

  
])
  
    const stm = chatHistory.map((item) => {  
          return {
            role: item.role,
            parts: [{ text: item.content }],
          };
        })

    const ltm = [
      {
        role:'user',
        parts:[{text:`
           These are some previous messages from the chat , use them to generate  a reponces 
          ${Memory.map(iteam=>iteam.metadata.text).join('\n')}
          `}]
      }
    ]  
    
      const repsonces = await geminiresponce([...ltm,...stm]); //p4
      try{

      socket.emit("ai-repsonces", { // np103177@gmail.com
        content: repsonces,
        chat: messagepayload.chat,
      })
      }catch(err){console.log("Error when emitting ai response to user",err)}





try{
      
      const [airesponsemsg,aivectoresp] = await  Promise.all([
        Message.create({
  chat: messagepayload.chat,
  content: repsonces,
  user: socket.user._id,
  role: "model",
}),
generatevector(repsonces)

      ])



       await createMemory({ 
        vector:aivectoresp,
        messageId:airesponsemsg._id,
        metadata:{ 
          chat:messagepayload.chat,
          user: socket.user._id,
          text:repsonces


        }

      })
    }catch(err){
      console.log("Error when saving ai message to db",err)
    }

;
  }




});
  });
};

module.exports = socketserver;
    //  console.log("✅ User connected",socket.user);// Line remove rs
 
// Test socket emit and on
    // socket.emit('sey',"Server hsay hello to you")
    // socket.on('frontend',(F)=>{
    //   console.log(F)
    //   })
