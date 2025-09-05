// const { GoogleGenerativeAI } = require("@google/generative-ai");

// const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// const {
//   conceptExplainPrompt,
//   questionAnswerPrompt,
// } = require("../utils/prompts");

// //@desc Generate interview questions and answers using gemini
// //@route POST/api/ai/generate-questions
// //@access Private

// const generateInterviewQuestions = async (req, res) => {
//   try {
//     const { role, experience, topicsToFocus, numberOfQuestions } = req.body;

//     if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
//       return res.status(400).json({ message: "Missing required fields" });
//     }
//     const prompt = questionAnswerPrompt(
//       role,
//       experience,
//       topicsToFocus,
//       numberOfQuestions
//     );
//     const model = ai.getGenerativeModel({ model: "gemini-pro" });
//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     let rawText = response.text();

//     const cleanedText = rawText
//       .replace(/^```json\s*/, "")
//       .replace(/```$/, "")
//       .trim();

//     const data = JSON.parse(cleanedText);

//     res.status(200).json(data);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "failed to generate questions", error: error.message });
//   }
// };

// //@desc Generate explanations
// //@route POST/api/ai/generate-explanation
// //@access Private
// const generateConceptExplanation = async (req, res) => {
//   try {
//     const { question } = req.body;
//     if (!question) {
//       return res.status(400).json({ message: "Missing required fields" });
//     }
//     const prompt = conceptExplainPrompt(question);
//     const response = await ai.models.generateContext({
//       model: "gemini-2.0-flash-lite",
//       contents: prompt,
//     });
//     let rawText = response.text;

//     //clean it
//     const cleanedText = rawText
//       .replace(/^```json\s*/, "")
//       .replace(/```$/, "")
//       .trim();
//     const data = JSON.parse(cleanedText);
//     res.status(200).json(data);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "failed to generate questions", error: error.message });
//   }
// };
// module.exports = { generateInterviewQuestions, generateConceptExplanation };
const { GoogleGenerativeAI } = require("@google/generative-ai");

const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const {
  conceptExplainPrompt,
  questionAnswerPrompt,
} = require("../utils/prompts");

//@desc Generate interview questions and answers using gemini
//@route POST /api/ai/generate-questions
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

    const model = ai.getGenerativeModel({ model: "gemini-2.5-flash-lite" });
    const result = await model.generateContent(prompt);

    let rawText = result.response.text();

    const cleanedText = rawText
      .replace(/^```json\s*/, "")
      .replace(/```$/, "")
      .trim();

    const data = JSON.parse(cleanedText);

    res.status(200).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "failed to generate questions", error: error.message });
  }
};

//@desc Generate explanations
//@route POST /api/ai/generate-explanation
//@access Private
const generateConceptExplanation = async (req, res) => {
  try {
    const { question } = req.body;
    if (!question) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const prompt = conceptExplainPrompt(question);

    const model = ai.getGenerativeModel({ model: "gemini-2.0-flash-lite" });
    const result = await model.generateContent(prompt);
    let rawText = result.response.text();

    const cleanedText = rawText
      .replace(/^```json\s*/, "")
      .replace(/```$/, "")
      .trim();

    const data = JSON.parse(cleanedText);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: "failed to generate explanation",
      error: error.message,
    });
  }
};

module.exports = { generateInterviewQuestions, generateConceptExplanation };
