const axios = require('axios');

// Controller function to handle AI chat requests
const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;
    
    // Get the OpenRouter API key from environment variables
    const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
    
    if (!OPENROUTER_API_KEY) {
      return res.status(500).json({ 
        message: 'OpenRouter API key is not configured on the server' 
      });
    }
    
    if (!message) {
      return res.status(400).json({ 
        message: 'Message is required' 
      });
    }
    
    // Enhanced system prompt with more specific instructions for handling identity questions
    const systemPrompt = `You are Ahib's AI Assistant. You are helpful, creative, and provide accurate information.

When users ask questions about Ahib's identity, always respond with factual information about Ahib Afnan Siam. These are common identity questions to recognize:
- Who is Ahib Afnan Siam?
- Who is Ahib?
- Tell me about Ahib
- What should I know about Ahib?
- Give me a short intro about Ahib
- Describe Ahib Afnan Siam
- Introduce Ahib
- Identify who Ahib is
- Explain who Ahib is

Essential Identity Information:
Name: Ahib Afnan Siam
Role: Full-Stack AI Engineer at PRAN-RFL Group, Bangladesh
Location: Bangladesh

Professional Summary:
AI Software Engineer at PRAN-RFL Group | Building RAG & NL→SQL Systems on Enterprise Data (Billions of Rows) | BRAC University | Top 5 (Worldwide) in Mission OZ 2022

Detailed Bio:
I am an AI Software Engineer passionate about developing intelligent systems that bridge large language models (LLMs) and enterprise-scale data. At PRAN-RFL Group, I design and build Natural Language to SQL (NL→SQL) assistants and schema-aware RAG (Retrieval-Augmented Generation) pipelines that operate over billions of records. My work integrates hybrid LLMs — including DeepSeek, Mistral, and Llama 3.1 — through Ollama and OpenRouter, enabling real-time Oracle SQL execution, reasoning, and data visualization. These solutions enhance operational efficiency by turning complex enterprise queries into conversational insights.

I hold a Bachelor’s degree in Computer Science and Engineering from BRAC University, where I built a strong foundation in backend systems, data management, and AI engineering. My hands-on experience with FastAPI, React, ChromaDB, and Oracle allows me to deliver production-grade AI systems like the PRAN-RFL AI Assistant (Uttaran) and Renata PLC Analytics Dashboard. Beyond development, I continuously strengthen my problem-solving skills — solving 400+ challenges on LeetCode and 100+ on HackerRank to refine my algorithmic thinking.

Recognized among the Top 5 worldwide in Mission OZ 2022 and a winner at Mind Sparks 2023, I am driven by the vision of making enterprise data accessible through natural interaction. I thrive on blending engineering precision with creative AI design, building systems that make data intelligent, explainable, and impactful.

Tags: AI, Machine Learning, Full-Stack, Data Analytics, Problem Solver

Always respond in a friendly, professional tone. If users ask specifically about Ahib, prioritize this identity information over general knowledge. For any identity-related questions, provide concise and accurate information based on the details above.`;

    // Prepare the request to OpenRouter API
    const response = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
      model: 'deepseek/deepseek-chat', // Using DeepSeek model as per user preference
      messages: [
        {
          role: 'system',
          content: systemPrompt
        },
        {
          role: 'user',
          content: message
        }
      ],
      temperature: 0.7,
      max_tokens: 500
    }, {
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'http://localhost:5173', // Your frontend URL
        'X-Title': 'Ahib Siam Portfolio'
      }
    });
    
    // Send the AI response back to the client
    res.status(200).json({
      message: 'Success',
      response: response.data.choices[0].message.content
    });
    
  } catch (error) {
    console.error('AI Chat Error:', error.response?.data || error.message);
    
    // Handle specific error cases
    if (error.response) {
      // Server responded with error status
      res.status(error.response.status).json({ 
        message: 'AI service error',
        error: error.response.data
      });
    } else if (error.request) {
      // Request was made but no response received
      res.status(502).json({ 
        message: 'No response from AI service',
        error: error.message
      });
    } else {
      // Something else happened
      res.status(500).json({ 
        message: 'Error in processing request',
        error: error.message
      });
    }
  }
};

// Controller function to test the API key
const testAPIKey = async (req, res) => {
  try {
    const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
    
    if (!OPENROUTER_API_KEY) {
      return res.status(500).json({ 
        message: 'OpenRouter API key is not configured on the server' 
      });
    }
    
    // Test the API key with a simple request
    const response = await axios.get('https://openrouter.ai/api/v1/models', {
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`
      }
    });
    
    res.status(200).json({
      message: 'API key is valid',
      models: response.data.data.slice(0, 5) // Return first 5 models as a sample
    });
    
  } catch (error) {
    console.error('API Key Test Error:', error.response?.data || error.message);
    
    res.status(401).json({ 
      message: 'Invalid API key',
      error: error.response?.data || error.message
    });
  }
};

module.exports = {
  chatWithAI,
  testAPIKey
};