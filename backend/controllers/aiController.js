const Groq = require("groq-sdk");
const { questionAnswerPrompt, conceptExplainPrompt } = require("../utils/promts");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

//@desc Generate interview questions and answers
//@route POST /api/generate-questions
//@access Private
const generateInterviewQuestions = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, numberOfQuestions } = req.body;

    if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const prompt = questionAnswerPrompt(
      role,
      experience,
      topicsToFocus,
      numberOfQuestions
    );

    const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0,
      response_format: { type: "json_object" },
    });

    let raw = response.choices[0].message.content;

    // console.log("RAW AI RESPONSE:", raw);

    // 🔥 STEP 1: Clean markdown if present
    if (typeof raw === "string") {
      raw = raw.replace(/```json|```/g, "").trim();
    }

    // 🔥 STEP 2: Parse JSON safely
    let parsed;
    try {
      parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
    } catch (err) {
      console.error("JSON Parse Error:", err);
      return res.status(500).json({
        message: "AI did not return valid questions",
      });
    }

    // 🔥 STEP 3: Extract questions array
    let questions = [];

    if (Array.isArray(parsed)) {
      questions = parsed;
    } else if (parsed.questions && Array.isArray(parsed.questions)) {
      questions = parsed.questions;
    } else {
      return res.status(500).json({
        message: "AI did not return valid questions",
      });
    }

    // 🔥 STEP 4: Validate structure
    const isValid = questions.every(
      (q) =>
        q &&
        typeof q.question === "string" &&
        typeof q.answer === "string"
    );

    if (!isValid) {
      return res.status(500).json({
        message: "Invalid question format",
      });
    }

    // ✅ FINAL CLEAN RESPONSE
    return res.status(200).json({
      data: questions,
    });

  } catch (error) {
    console.error("Generate Questions Error:", error);

    res.status(500).json({
      message: "Failed to generate questions",
      error: error.message,
    });
  }
};

//@desc Generate explanation for interview question
//@route POST /api/ai/generate-explanation
//@access Private
const generateConceptExplain = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const prompt = conceptExplainPrompt(question);

    const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0,
      response_format: { type: "json_object" },
    });

    let raw = response.choices[0].message.content;

    // console.log("RAW EXPLANATION:", raw);

    // Clean markdown
    if (typeof raw === "string") {
      raw = raw.replace(/```json|```/g, "").trim();
    }

    // Parse safely
    let parsed;
    try {
      parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
    } catch (err) {
      return res.status(500).json({
        message: "AI did not return valid explanation",
      });
    }

    return res.status(200).json({
      data: parsed,
    });

  } catch (error) {
    console.error("Generate Explanation Error:", error);

    res.status(500).json({
      message: "Failed to generate explanation",
      error: error.message,
    });
  }
};

module.exports = {
  generateInterviewQuestions,
  generateConceptExplain,
};