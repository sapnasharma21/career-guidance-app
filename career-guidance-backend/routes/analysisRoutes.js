const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const { createAnalysis } = require('../controllers/analysisController');

router.post('/analyze', protect, createAnalysis);

module.exports = router;