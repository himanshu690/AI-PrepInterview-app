const questionAnswerPrompt = (
  role,
  experience,
  topicsToFocus,
  numberOfQuestions
) => `
You are an AI that generates technical interview questions and answers.

Generate ${numberOfQuestions} interview questions for the role "${role}"
for a candidate with ${experience} years of experience.
Focus on these topics: ${topicsToFocus}.

Rules:
- Return ONLY valid JSON.
- Do NOT include markdown, headings, bullet points, or extra text.
- Answers must be beginner-friendly and clear.
- If code is needed, include it as plain text inside the answer.
- Do NOT use triple backticks.

Return JSON in this exact format:
[
  {
    "question": "Question text here",
    "answer": "Answer text here"
  }
]
`;

const conceptExplainPrompt = (question) => `
You are an AI that explains interview questions to beginners.

Explain the concept behind this interview question in simple language:
"${question}"

Rules:
- Return ONLY valid JSON.
- Do NOT include markdown, bullet points, or extra text.
- Explanation must be beginner-friendly and detailed.
- If code is needed, include it as plain text inside the explanation.
- Do NOT use triple backticks.

Return JSON in this exact format:
{
  "title": "Short clear title",
  "explanation": "Detailed explanation here"
}
`;

module.exports = {
  questionAnswerPrompt,
  conceptExplainPrompt,
};
