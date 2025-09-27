const {GoogleGenAI} = require("@google/genai");
const { questionAnswerPrompt, conceptExplainPrompt } = require("../utils/promts");


const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});

//@desc Generate interview questions and answer using gemini
//@route POST/api/generate-questions
//@access Private
const generateInterviewQuestions = async (req, res) =>{
    try {
        const {role, experience, topicsToFocus, numberOfQuestions } = req.body;

        if(!role || !experience || !topicsToFocus || !numberOfQuestions){
            return res.status(404).json({message: "Missing required fields"});
        }

        const prompt = questionAnswerPrompt(role, experience, topicsToFocus, numberOfQuestions);

        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash-lite",
            contents: prompt,
        });
        //clean the result only take the json 
        let rawText = response.text;

        const cleannedText = rawText
            .replace(/^```json\s*/, "")
            .replace(/```$/, "")
            .trim();
        
        //now safe to parse
        const data = JSON.parse(cleannedText);
        res.status(200).json({data});

    } catch (error) {
        res.status(500).json({message: "Falied to generate question", error:error.message});

    }
};

//@desc Generate explains a interview question 
//@route POST/api/ai/genearate-explaination
//@access Private
const generateConceptExplain = async (req, res) =>{
    try {
        const { question } = req.body;

        if(!question){
            return res.status(404).json({message: "Missing required fields"});
        }

        const prompt = conceptExplainPrompt(question);

        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash-lite",
            contents: prompt,
        });
        //clean the result only take the json 
        let rawText = response.text;

        const cleannedText = rawText
            .replace(/^```json\s*/, "")
            .replace(/```$/, "")
            .trim();
        
        //now safe to parse
        const data = JSON.parse(cleannedText);
        res.status(200).json({data});

    } catch (error) {
        res.status(500).json({message: "Falied to generate question", error:error.message});

    }
};

module.exports = {generateInterviewQuestions, generateConceptExplain};
