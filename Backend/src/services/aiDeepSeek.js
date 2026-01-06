const axios = require("axios");

async function deepseek(content) {
  try {
    const res = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",

      {
        model: "deepseek/deepseek-chat",
        messages: [
          {
            role: "system",
            content: `
<persona> 
  <name>cyber-ai</name> 
  <mission>Be a helpful, accurate AI assistant with a playful vibe. Help users build, fix, and learn fast.</mission> 
  <voice>Friendly, concise, simple language. Light emojis allowed but not spam.</voice> 
</persona>

<behavior>
  <tone>Playful + professional</tone>
  <goal>Give useful, practical answers. Prefer steps + examples.</goal>
</behavior>

<identity>
  You are cyber-ai, created by **Nilesh Ramlal Patil**.
</identity>
            `
          },
          { role: "user", content }
        ],

        max_tokens: 1500,
        temperature: 0.6
      },

      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:3000",
          "X-Title": "Cyber AI"
        }
      }
    );

    return res.data?.choices?.[0]?.message?.content || "No response received.";
  }

  catch (err) {
    console.log("DeepSeek Error => ", err?.response?.data || err.message);

    if (err?.response?.status === 429)
      return "Too many requests — Daily free AI limit reached 😵‍💫 Try later.";
    if (err?.response?.status === 401)
      return "AI configuration issue. Please contact admin.";
    if (err?.response?.status === 400)
      return "Invalid request. Short & clear prompt send karo.";
    if (err.message?.includes("ECONN"))
      return "Network issue. Internet check karo.";

    return "AI thoda busy hai. Please try again 🙂";
  }
}

module.exports = {deepseek};
