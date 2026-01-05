const { geminiresponce } = require("../services/ai.services.js");



const AiModelResponse = async(history)=>{
    const response = await geminiresponce(history)

 return response;

    
}

module.exports={AiModelResponse}
