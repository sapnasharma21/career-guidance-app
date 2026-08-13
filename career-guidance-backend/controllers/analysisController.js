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

    // resume dhundo, aur confirm karo ye isi user ka hai
    const resume = await Resume.findOne({ _id: resumeId, userId: req.userId });
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    // OpenAI ko bhejo
    const aiResult = await analyzeResume(resume.extractedText, targetRole);

    // database mein save karo
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

module.exports = { createAnalysis };