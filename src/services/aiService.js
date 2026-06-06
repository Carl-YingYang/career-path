export const generateAnalysis = async (userName, topMatch, alternatives, contextNotes = {}) => {
    const API_KEY = import.meta.env.VITE_GROQ_API_KEY;

    if (!API_KEY) {
        console.error("Missing Groq API Key in .env file");
        return null;
    }

    const formattedNotes = Object.entries(contextNotes)
        .filter(([_, note]) => note && note.trim() !== '')
        .map(([index, note]) => `- Telemetry Data (Question ${parseInt(index) + 1}): "${note}"`)
        .join('\n');

    const notesSection = formattedNotes.length > 0
        ? `\nUser's Qualitative Context Notes:\n${formattedNotes}\n(Use these specific notes to highly personalize the advice and strengths.)`
        : `\nUser's Qualitative Context Notes: None provided.`;

    const systemPrompt = `
    You are an Executive Career Strategist and AI Profiler.
    Rules:
    - DO NOT calculate scores or suggest different careers.
    - KEEP IT HIGHLY PROFESSIONAL, POSITIVE, AND STUDENT-FOCUSED.
    - Maximum 300 words.
    - Integrate any provided user context notes to make the advice hyper-personalized.
    - Format output EXACTLY as a JSON object with these exact keys: 
      "summary" (string), 
      "strengths" (array of 3 strings), 
      "areasToImprove" (array of 2 strings), 
      "advice" (string), 
      "learningRecs" (array of 2 strings).
    `;

    const userPrompt = `
    Target Profile: ${userName}
    Primary Career Match: ${topMatch.career} (${topMatch.percentage}%)
    Secondary Alignments: ${alternatives.map(a => `${a.career} (${a.percentage}%)`).join(', ')}
    ${notesSection}
    `;

    try {
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "llama-3.1-8b-instant",
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: userPrompt }
                ],
                response_format: { type: "json_object" },
                temperature: 0.6
            })
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        return JSON.parse(data.choices[0].message.content);
    } catch (error) {
        console.error("Groq Generation Error:", error);
        return null;
    }
};

/**
 * Evaluates a user's interview answer and provides structured feedback.
 */
export const analyzeInterviewAnswer = async (question, answer) => {
    const API_KEY = import.meta.env.VITE_GROQ_API_KEY;

    if (!API_KEY) return null;

    const systemPrompt = `
    You are an expert HR Interview Coach. Evaluate the user's answer to the interview question.
    Format your response EXACTLY as a JSON object with these keys:
    "clarity" (string: short feedback on how clear the answer is),
    "tone" (string: short feedback on the professional tone and confidence),
    "structure" (string: short feedback on the flow and organization),
    "suggestion" (string: one specific tip to improve the answer).
    Keep feedback constructive, encouraging, and brief (max 2 sentences per key).
    `;

    const userPrompt = `
    Interview Question: "${question}"
    User's Answer: "${answer}"
    `;

    try {
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "llama-3.1-8b-instant",
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: userPrompt }
                ],
                response_format: { type: "json_object" },
                temperature: 0.7
            })
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        return JSON.parse(data.choices[0].message.content);
    } catch (error) {
        console.error("Groq Interview Analysis Error:", error);
        return null;
    }
};