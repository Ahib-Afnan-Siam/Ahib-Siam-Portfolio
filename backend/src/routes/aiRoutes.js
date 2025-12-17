const express = require('express');
const router = express.Router();
const { chatWithAI, testAPIKey } = require('../controllers/aiController');

// POST /api/ai/chat - Handle AI chat requests
router.post('/chat', chatWithAI);

// GET /api/ai/test-key - Test the OpenRouter API key
router.get('/test-key', testAPIKey);

module.exports = router;