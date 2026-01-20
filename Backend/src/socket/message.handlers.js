const Message = require("../Models/message.model.js");
const { geminiresponce, geminiResponseWithFile } = require("../services/ai.services.js");
const ImageGenerate = require('../services/Imagegererate.js');
const { anyfileupload } = require("../services/storge.service.js");
const { AiModelResponse } = require("./ai.selection.js");
const {
  saveUserMessageWithVector,
  createMessageMemory,
  getChatContextWithMemory,
  buildChatHistory,
  saveAIResponseWithVector
} = require('./memory.helper.js');

// Handle image generation messages
const handleImageMessage = async (socket, messagepayload) => {
  const data = await ImageGenerate(messagepayload.content);

  await Message.create({
    chat: messagepayload.chat,
    content: messagepayload.content,
    user: socket.user._id,
    role: "user",
  });

  const response = await Message.create({
    chat: messagepayload.chat,
    content: "Image generated successfully",
    user: socket.user._id,
    imageUrl: data,
    role: "model",
  });

  socket.emit("ai-repsonces", {
    content: response.content,
    imageUrl: response.imageUrl,
    chat: messagepayload.chat,
  });
};

// Handle file upload messages
const handleFileMessage = async (socket, messagepayload) => {
  try {
    // messagepayload.file should be: { data: base64String, type: 'image/png', name: 'file.png' }
    const fileData = messagepayload.file;
    if (!fileData || !fileData.data) {
      console.error('No file data received');
      socket.emit('ai-repsonces', { content: 'No file received', chat: messagepayload.chat });
      return;
    }

    const sizeInBytes = Buffer.byteLength(fileData.data, 'base64');
    if(sizeInBytes > 5 * 1024 * 1024){
      return socket.emit('ai-repsonces',{content:'File > 5MB',chat: messagepayload.chat})
    }

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
    console.log("File uploaded successfully:", messagepayload.prompt);

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
};

// Handle text messages with memory and AI
const handleTextMessage = async (socket, messagepayload) => {
  // Save user message and generate vector
  const { messagereponse, vector } = await saveUserMessageWithVector(
    messagepayload.chat,
    messagepayload.content,
    socket.user._id
  );
// ese aap ek two asyn funcation ek asycn funcation suppose 3s time lag raha hae but dusra ek asycs funation ko 4s lag rahe hae to total time 7s hoga 
// const []= await Promise.all([]) // But in case ek uppar wali sirf jis ek asyn funcation jadya time lage sirf use utna total time lagefa matlab total time 4s hoga  
// promise.all([]) ese ek yaad dyan har to asyns funcation ek durse par depende nahi karna chaiye 

//p2

  // Create memory from user message
  await createMessageMemory(
    vector,
    messagereponse._id,
    messagepayload.chat,
    socket.user._id,
    messagepayload.content
  );
//p3

  // Get chat context with memory
  const { chatHistory, Memory } = await getChatContextWithMemory(
    messagepayload.chat,
    vector,
    socket.user._id
  );

  // Build history for AI
  const history = buildChatHistory(chatHistory, Memory);

  // Get AI response
  // const repsonces = await geminiresponce(history); //p4
  const repsonces = await AiModelResponse(history, messagepayload.whichInput)

  // Emit response to user
  try {
    socket.emit("ai-repsonces", { // np103177@gmail.com
      content: repsonces,
      chat: messagepayload.chat,
    });
  } catch(err) {
    console.log("Error when emitting ai response to user", err);
  }

  // Save AI response with vector
  try {
    await saveAIResponseWithVector(
      messagepayload.chat,
      repsonces,
      socket.user._id
    );
  } catch(err) {
    console.log("Error when saving ai message to db", err);
  }
};

module.exports = {
  handleImageMessage,
  handleFileMessage,
  handleTextMessage
};
