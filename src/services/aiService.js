export const generateAnalysis = async (userName, topMatch, alternatives, contextNotes = {}) => {
    const API_KEY = import.meta.env.VITE_GROQ_API_KEY;

    if (!API_KEY) {
        console.error("Missing Groq API Key in .env file");
        return null;
    }

    // Parse the user's contextual notes into a readable format for the AI
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

        if (!response.ok) {
            const errorData = await response.text();
            console.error("Groq API Error Details:", errorData);
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const jsonString = data.choices[0].message.content;
        return JSON.parse(jsonString);

    } catch (error) {
        console.error("Groq Generation Error:", error);
        return null;
    }
};