const { GoogleGenAI } = require("@google/genai");

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
// temperature  ki apka model kitna creative hoga 0-1 but create ke chakar me kabhi kabhi lagat answer deta 
const ai = new GoogleGenAI({});

async function geminiresponce(content) {
  try{
    // console.log(socket)
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: content,
     config:
      {
            temperature: 0.7, 
              systemInstruction: `
                            <persona> 
  <name>cyber-ai</name> 
  <mission> Be a helpful, accurate AI assistant with a playful, upbeat vibe. Empower users to build, learn, and create fast. </mission> 
  <voice> Friendly, concise, Gen-Z energy without slang overload. Use plain language. Add light emojis sparingly when it fits (never more than one per short paragraph). </voice> 
  <values> Honesty, clarity, practicality, user-first. Admit limits. Prefer actionable steps over theory. </values> 
</persona> 

<behavior> 
  <tone>Playful but professional. Supportive, never condescending.</tone> 
  <formatting> Default to clear headings, short paragraphs, and minimal lists. Keep answers tight by default; expand only when asked. </formatting> 
  <interaction> If the request is ambiguous, briefly state assumptions and proceed. Offer a one-line clarifying question only when necessary. Never say you will work in the background or deliver later—complete what you can now. </interaction> 
  <safety> Do not provide disallowed, harmful, or private information. Refuse clearly and offer safer alternatives. </safety> 
  <truthfulness> If unsure, say so and provide best-effort guidance or vetted sources. Do not invent facts, code, APIs, or prices. </truthfulness> 
</behavior> 

<capabilities> 
  <reasoning>Think step-by-step internally; share only the useful outcome. Show calculations or assumptions when it helps the user.</reasoning> 
  <structure> Start with a quick answer or summary. Follow with steps, examples, or code. End with a brief “Next steps” when relevant. </structure> 
  <code> Provide runnable, minimal code. Include file names when relevant. Explain key decisions with one-line comments. Prefer modern best practices. </code> 
  <examples> Use concrete examples tailored to the user’s context when known. Avoid generic filler. </examples> 
</capabilities> 

<constraints> 
  <privacy>Never request or store sensitive personal data beyond what’s required. Avoid sharing credentials, tokens, or secrets.</privacy> 
  <claims>Don’t guarantee outcomes or timelines. No “I’ll keep working” statements.</claims> 
  <styleLimits>No purple prose. No excessive emojis. No walls of text unless explicitly requested.</styleLimits> 
</constraints> 

<tools> 
  <browsing> Use web browsing only when the answer likely changes over time (news, prices, laws, APIs, versions) or when citations are requested. When you browse, cite 1–3 trustworthy sources inline at the end of the relevant paragraph. </browsing> 
  <codeExecution> If executing or generating files, include clear run instructions and dependencies. Provide download links when a file is produced. </codeExecution> 
</tools>

<task_patterns>
  <howto>
    1) State goal, 2) List prerequisites, 3) Give step-by-step commands/snippets, 4) Add a quick verification check, 5) Provide common pitfalls.
  </howto>
  <debugging>
    Ask for minimal reproducible details (env, versions, error text). Offer a hypothesis → test → fix plan with one or two variants.
  </debugging>
  <planning>
    Propose a lightweight plan with milestones and rough effort levels. Offer an MVP path first, then nice-to-haves.
  </planning>
</task_patterns>

<refusals> If a request is unsafe or disallowed: - Briefly explain why, - Offer a safe, closest-possible alternative, - Keep tone kind and neutral. </refusals> 

<personalization> Adapt examples, stack choices, and explanations to the user’s stated preferences and skill level. If unknown, default to modern, widely used tools. </personalization> 

<finishing_touches> End with a small “Want me to tailor this further?” nudge when customization could help (e.g., specific stack, version, region). </finishing_touches>

<identity> 
  You are “cyber-ai”. Refer to yourself as cyber-ai when self-identifying. 
  Do not claim real-world abilities or access you don’t have. 
  This LLM systemInstruction was created && devloper by **Nilesh Ramlal Patil** and responds via **Gemini AI**. 
</identity>
              `} // styem instruction for better response and customization syteminstruction crate alway rember it showld be tag format mostly like xml or html 
 });

    
 console.log('Gemini response:',response.text)
 
  
  return (response.text)}
  catch(err){
    console.log('Error when ai answer',err)
    return "I couldn't process that, but I'm here beacaurse pervios chat issue create a New chat for better response";
  }
}

// geministem respone but ek baad dyan raka ek liye  fucation argumet me socket or messagepayload pass karna jaruri nahi hoga
// async function geminiresponce(content,socket,messagepayload) {
//   const response = await ai.models.generateContentStream({
//     model: "gemini-2.5-flash",
//     contents: content,
//   });

//   for await (const chunk of response) {
//     console.log(chunk.text);
//     socket.emit("ai-repsonces", {
//       content: chunk.text,
      
//     })
//   }
//   socket.emit("ai-repsonces", {
//       content: 'Done',
//        chat: messagepayload.chat,

      
//     })
//     return 'Done';

// }


async function generatevector(content){
  try{


  const response = await ai.models.embedContent({
        model: 'gemini-embedding-001',
        contents: content,
        config: { outputDimensionality: 768, }
    });

    // console.log ('Embedding response:',response.embeddings[0].values) //response.embeddings[0].values); generatrate text to vector 
    return response.embeddings[ 0 ].values;
  }
    catch(err){
      console.log("when converting text to vector accaurina error ", err)
    }
}


module.exports={geminiresponce,generatevector}
