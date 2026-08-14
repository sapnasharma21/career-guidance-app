const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const { createAnalysis, getHistory } = require('../controllers/analysisController');

router.post('/analyze', protect, createAnalysis);
router.get('/history', protect, getHistory);

module.exports = router;