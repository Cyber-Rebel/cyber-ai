const axios = require("axios");

async function llamaChat(history) {
  try {

    const messages = Array.isArray(history)
      ? convertHistory(history)
      : [
          {
            role: "user",
            content: [{ type: "text", text: history }]
          }
        ];

    const res = await axios.post(
      "https://router.huggingface.co/v1/chat/completions",
      {
        model: "meta-llama/Llama-3.1-8B-Instruct",
        messages,
        max_tokens: 1000
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    return res.data?.choices?.[0]?.message?.content || "No response";

  } catch (err) {
    console.log("LLAMA ERROR =", err.response?.data || err);
    return "Llama AI busy hai, baad me try karo 🙂";
  }
}

function convertHistory(history){
  return history.map(msg => ({
    role: msg.role === "model" ? "assistant" : "user",
    content: [
      {
        type: "text",
        text: msg?.parts?.[0]?.text || ""
      }
    ]
  }));
}

module.exports = { llamaChat };
