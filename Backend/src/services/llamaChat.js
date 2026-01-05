const axios = require("axios");
require("dotenv").config();

async function llamaChat(content) {
  try {
     const res = await axios.post(
      "https://router.huggingface.co/v1/chat/completions",
      {
        model: "meta-llama/Llama-3.1-8B-Instruct",
        messages: [
          { role: "user", content }
        ],
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

// module.exports = llamaChat;

llamaChat("Hello, how are you?").then(response => {
  console.log("LLAMA Response:", response);
});