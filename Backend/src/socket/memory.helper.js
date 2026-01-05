const Message = require("../Models/message.model.js");
const { generatevector } = require("../services/ai.services.js");
const { createMemory, queryMemory } = require("../services/vector.services.js");

// Save user message and generate vector
const saveUserMessageWithVector = async (chat, content, userId) => {
  const [messagereponse, vector] = await Promise.all([
    Message.create({
      chat: chat,
      content: content,
      user: userId,
      role: "user",
    }),
    generatevector(content)
  ]);

  return { messagereponse, vector };
};

// Create memory from message
const createMessageMemory = async (vector, messageId, chat, userId, text) => {
  await createMemory({  
    vector: vector,
    messageId: messageId,
    metadata: { 
      chat: chat,
      user: userId,
      text: text
    }
  });
};

// Get chat history and relevant memories
const getChatContextWithMemory = async (chat, vector, userId) => {
  const [chatHistory, Memory] = await Promise.all([
    Message.find({ chat: chat })
      .sort({ createdAt: -1 })
      .limit(10)
      .lean()
      .then(messages => messages.reverse()),
    queryMemory({
      queryVector: vector,
      limit: 4,   
      metadata: {
        user: userId
      }
    })
  ]);

  return { chatHistory, Memory };
};

// Build chat history for AI
const buildChatHistory = (chatHistory, Memory) => {
  const stm = chatHistory.map((item) => {  
    return {
      role: item.role,
      parts: [{ text: item.content }],
    };
  });

  const ltm = [
    {
      role: 'user',
      parts: [{text: `
         These are some previous messages from the chat , use them to generate  a reponces 
        ${Memory.map(iteam => iteam.metadata.text).join('\n')}
        `}]
    }
  ];

  return [...ltm, ...stm];
};

// Save AI response with vector
const saveAIResponseWithVector = async (chat, content, userId) => {
  const [airesponsemsg, aivectoresp] = await Promise.all([
    Message.create({
      chat: chat,
      content: content,
      user: userId,
      role: "model",
    }),
    generatevector(content)
  ]);

  await createMemory({ 
    vector: aivectoresp,
    messageId: airesponsemsg._id,
    metadata: { 
      chat: chat,
      user: userId,
      text: content
    }
  });
};

module.exports = {
  saveUserMessageWithVector,
  createMessageMemory,
  getChatContextWithMemory,
  buildChatHistory,
  saveAIResponseWithVector
};
