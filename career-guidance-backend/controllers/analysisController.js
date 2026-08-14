const Resume = require('../models/Resume');
const Analysis = require('../models/Analysis');
const { analyzeResume } = require('../services/openaiService');

// ANALYZE RESUME
const createAnalysis = async (req, res) => {
  try {
    const { resumeId, targetRole } = req.body;

    if (!resumeId || !targetRole) {
      return res.status(400).json({ message: 'resumeId and targetRole are required' });
    }

    const resume = await Resume.findOne({ _id: resumeId, userId: req.userId });
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    const aiResult = await analyzeResume(resume.extractedText, targetRole);

    const analysis = await Analysis.create({
      userId: req.userId,
      resumeId: resume._id,
      targetRole,
      currentSkills: aiResult.currentSkills || [],
      skillGaps: aiResult.skillGaps || [],
      recommendedPaths: aiResult.recommendedPaths || [],
      learningResources: aiResult.learningResources || [],
    });

    res.status(201).json(analysis);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET HISTORY - saari past analyses laao (naya wala sabse upar)
const getHistory = async (req, res) => {
  try {
    const analyses = await Analysis.find({ userId: req.userId })
      .sort({ createdAt: -1 })
      .select('targetRole currentSkills skillGaps createdAt');

    res.status(200).json(analyses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createAnalysis, getHistory };