const { geminiresponce } = require("../services/ai.services.js");
const { llamaChat } = require("../services/llamaChat.js");
const { serperSearch } = require("../services/serper.search.ai.js");
const { deepseek } = require("../services/aiDeepSeek.js");


const AiModelResponse = async(history)=>{
  


console.log("HISTORY IN AI MODEL RESPONSE =", history);

    const response = await geminiresponce(history)
    const DeepSeek = await deepseek(history)
    const  llmaresponse2 = await llamaChat(history)
    const serperresponse = await serperSearch(history)  
    console.log("GEMINI RESPONSE =", response);
console.log('SERPER RESPONSE =', serperresponse);
    console.log("DEEPSEEK RESPONSE =", DeepSeek);
    console.log("LLAMA RESPONSE 2 =", llmaresponse2);

 return response;

    
}

module.exports={AiModelResponse}
