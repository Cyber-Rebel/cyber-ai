const { geminiresponce } = require("../services/ai.services.js");
const { serperSearch } = require("../services/serper.search.ai.js");
const { deepseek } = require("../services/aiDeepSeek.js");


const AiModelResponse = async(history, whichInput)=>{
  

    if(whichInput ==='code'){
        history = history + "\n\n Please provide a detailed code solution with explanations.";
       const  DeepSeeka = await deepseek(history)
        return DeepSeeka;
    }else if(whichInput ==='research'){
        history = history + "\n\n Please provide a well-researched and detailed response with references.";
        const serperresponse = await serperSearch(history)  
        return serperresponse;
    }else {
        const response = await geminiresponce(history)
        return response;
    }



    
}

module.exports={AiModelResponse}
