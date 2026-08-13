const mongoose = require('mongoose');

const analysisSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  resumeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Resume',
    required: true,
  },
  targetRole: {
    type: String,
    required: true,
  },
  currentSkills: {
    type: [String],
    default: [],
  },
  skillGaps: {
    type: [String],
    default: [],
  },
  recommendedPaths: {
    type: [String],
    default: [],
  },
  learningResources: {
    type: [String],
    default: [],
  },
}, { timestamps: true });

module.exports = mongoose.model('Analysis', analysisSchema);