const { PDFParse } = require('pdf-parse');
const mammoth = require('mammoth');
const Resume = require('../models/Resume');

// UPLOAD RESUME
const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const { targetRole } = req.body;
    const fileBuffer = req.file.buffer;
    const fileName = req.file.originalname;
    const ext = fileName.split('.').pop().toLowerCase();

    let extractedText = '';

    // PDF hai to pdf-parse (v2) use karo
    if (ext === 'pdf') {
      const parser = new PDFParse({ data: fileBuffer });
      const result = await parser.getText();
      extractedText = result.text;
    }
    // DOCX hai to mammoth use karo
    else if (ext === 'docx') {
      const result = await mammoth.extractRawText({ buffer: fileBuffer });
      extractedText = result.value;
    } else {
      return res.status(400).json({ message: 'Unsupported file type' });
    }

    if (!extractedText || extractedText.trim().length === 0) {
      return res.status(400).json({ message: 'Could not extract text from file' });
    }

    // database mein save karo
    const resume = await Resume.create({
      userId: req.userId,
      fileName,
      extractedText,
      targetRole: targetRole || '',
    });

    res.status(201).json({
      _id: resume._id,
      fileName: resume.fileName,
      targetRole: resume.targetRole,
      extractedText: resume.extractedText.substring(0, 200) + '...',
      createdAt: resume.createdAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { uploadResume };