const axios = require('axios');

async function serperSearch(query) {
  try {
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://google.serper.dev/search',
      headers: { 
        'X-API-KEY': `${process.env.SERPER_API_KEY}`, 
        'Content-Type': 'application/json'
      },
      data: JSON.stringify({ q: query })
    };

    const response = await axios.request(config);
    const data = response.data;
    
    let formattedResults = `Search results for: "${query}"\n\n`;
    
    if (data.answerBox) {
      formattedResults += `📌 Quick Answer:\n${data.answerBox.answer || data.answerBox.snippet}\n\n`;
    }
    
    if (data.organic && data.organic.length > 0) {
      formattedResults += `🔍 Top Results:\n\n`;
      data.organic.slice(0, 5).forEach((result, index) => {
        formattedResults += `${index + 1}. ${result.title}\n`;
        formattedResults += `   ${result.snippet}\n`;
        formattedResults += `   🔗 ${result.link}\n\n`;
      });
    }
    
    return formattedResults || "No results found for your query.";
    
  } catch (error) {
    console.error('Serper Search Error:', error.response?.data || error.message);
    return "Search failed. Please try again later.";
  }
}

module.exports = { serperSearch };