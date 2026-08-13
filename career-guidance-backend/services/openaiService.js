const { GoogleGenAI } = require('@google/genai');

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const analyzeResume = async (resumeText, targetRole) => {
  const prompt = `
You are a career guidance expert. Analyze the resume text below for someone targeting the role of "${targetRole}".

Resume Text:
"""
${resumeText}
"""

Return ONLY a valid JSON object (no extra text, no markdown formatting, no code blocks) with exactly this structure:
{
  "currentSkills": ["skill1", "skill2"],
  "skillGaps": ["missing skill1", "missing skill2"],
  "recommendedPaths": ["career path1", "career path2"],
  "learningResources": ["resource/course suggestion1", "resource/course suggestion2"]
}

Keep each array to 5-8 items maximum. Be specific and practical.
`;

  const response = await ai.models.generateContent({
    model: 'gemini-flash-latest',
    contents: prompt,
  });

  let text = response.text;
  text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

  return JSON.parse(text);
};

module.exports = { analyzeResume };