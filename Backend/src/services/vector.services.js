// Import the Pinecone library
const { Pinecone } = require('@pinecone-database/pinecone');

// Initialize a Pinecone client with your API key
const pc = new Pinecone({ apiKey: process.env.PINECONE_API });

const gptclone  = pc.Index('ai-code');// pc.Index('gpt-clone')
async function createMemory({vector , metadata,messageId} ) { // Store the Vector value ke andar vector 

    await gptclone.upsert([{  // ese memory create hoti hati hae 
        id: messageId,
        values: vector,
        metadata
    }])
    
}

async function queryMemory({queryVector ,limit = 3 , metadata}) {

    const data = await gptclone.query({ 
        vector: queryVector,
        topK: limit,     
        filter: metadata ? metadata: undefined,
        includeMetadata: true  
    })
    return data.matches;
    
}

module.exports = { createMemory , queryMemory }