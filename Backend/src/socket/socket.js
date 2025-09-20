const { Server } = require("socket.io");
const cookie = require("cookie");
const jwt = require("jsonwebtoken");
const UserModels = require("../Models/user.models.js");
const Message = require("../Models/message.model.js");
const { geminiresponce,generatevector } = require("../services/ai.services.js");
const {createMemory,queryMemory} = require('../services/vector.services.js');

const socketserver = (httpserver) => {
  const io = new Server(httpserver, {
    cors:{
    origin:"http://localhost:5173",
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
      console.log(messagepayload)

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
