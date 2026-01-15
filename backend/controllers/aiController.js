const axios = require("axios");

exports.aiSuggest = async (req, res) => {
  const { title } = req.body;

  try {
    let prompt = "";

    if (!title || title.trim() === "") {
      prompt = `
Suggest a task title and description for a productivity app.
Return JSON only in this format:
{
  "title": "...",
  "description": "..."
}
`;
    } else {
      prompt = `
Given this task title: "${title}"
Generate a short, clear task description related to it.
Return JSON only in this format:
{
  "description": "..."
}
`;
    }

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ]
      }
    );

    const aiText = response.data.candidates[0].content.parts[0].text;

    // Clean JSON extraction
    const jsonStart = aiText.indexOf("{");
    const jsonEnd = aiText.lastIndexOf("}") + 1;
    const cleanJSON = aiText.slice(jsonStart, jsonEnd);

    res.json({
      success: true,
      data: JSON.parse(cleanJSON),
    });
  } catch (error) {
    console.error("Gemini AI error:", error.response?.data || error);
    res.status(500).json({ message: "AI suggestion failed" });
  }
};
