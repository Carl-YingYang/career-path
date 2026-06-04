/**
 * --------------------------------------------------------------------------
 * CAREER PATHS - ENTERPRISE SCORING ENGINE
 * --------------------------------------------------------------------------
 * Core telemetry calculation logic. Maps user heuristic inputs (YES/SOMETIMES/NO)
 * against predefined weight matrices to calculate career compatibility percentages.
 * --------------------------------------------------------------------------
 */

const CAREERS = [
    "Teacher", "Lawyer", "Call Center Agent", "Journalist",
    "Tour Guide", "Flight Attendant", "Pilot", "News Anchor"
];

/**
 * @constant {Array<Object>} scoringMatrix
 * Relational weight matrix. Each index corresponds to a questionnaire step.
 * Keys are target careers; values are the heuristic weight (importance) of that question.
 */
const scoringMatrix = [
    { "Journalist": 5, "Call Center Agent": 5 }, // Q1: Online/home-based
    { "Teacher": 5, "Journalist": 4 }, // Q2: Checking written work
    { "Teacher": 5, "Tour Guide": 4, "Lawyer": 3 }, // Q3: Explaining ideas
    { "Journalist": 5, "Tour Guide": 4, "News Anchor": 3 }, // Q4: Creative
    { "Lawyer": 5, "Journalist": 4, "Pilot": 4 }, // Q5: Independent
    { "Teacher": 5, "Call Center Agent": 4 }, // Q6: English skills
    { "News Anchor": 5, "Teacher": 4, "Lawyer": 4, "Tour Guide": 4 }, // Q7: Speaking in front
    { "Lawyer": 5, "Journalist": 5, "Teacher": 3 }, // Q8: Essays/books
    { "Journalist": 5, "Call Center Agent": 5 }, // Q9: (Dup 1)
    { "Teacher": 5, "Journalist": 4 }, // Q10: (Dup 2)
    { "Teacher": 5, "Tour Guide": 4, "Lawyer": 3 }, // Q11: (Dup 3)
    { "Journalist": 5, "Tour Guide": 4, "News Anchor": 3 }, // Q12: (Dup 4)
    { "Lawyer": 5, "Journalist": 4, "Pilot": 4 }, // Q13: (Dup 5)
    { "Teacher": 5, "Call Center Agent": 4 }, // Q14: (Dup 6)
    { "Flight Attendant": 5, "Call Center Agent": 5, "Tour Guide": 4 }, // Q15: Communicating
    { "Teacher": 5 }, // Q16: School setting
    { "Teacher": 5, "Journalist": 5 }, // Q17: Grammar/spelling
    { "Journalist": 5, "Teacher": 4 }, // Q18: Editing
    { "Flight Attendant": 5, "Tour Guide": 5, "Call Center Agent": 4 }, // Q19: Different types
    { "Lawyer": 5, "Journalist": 5, "News Anchor": 4 } // Q20: Reading
];

/**
 * Executes the algorithmic assessment of user inputs against the scoring matrix.
 * 
 * @param {Object} answers - Dictionary of user answers { qIndex: floatValue }
 * @returns {Object} Structured telemetry results containing top match and alternatives.
 */
export const calculateScores = (answers) => {
    const scores = {};
    const maxScores = {};

    // Initialize baseline telemetry mapping
    CAREERS.forEach(career => {
        scores[career] = 0;
        maxScores[career] = 0;
    });

    // Compute weighted scores based on user input floats (1.0, 0.5, 0.0)
    scoringMatrix.forEach((weights, qIndex) => {
        const answerValue = answers[qIndex] ?? 0;

        for (const [career, weight] of Object.entries(weights)) {
            // maxScores captures the highest possible outcome if the user answered YES (1.0)
            maxScores[career] += weight;
            // scores captures the actual weighted outcome based on the user's input
            scores[career] += weight * answerValue;
        }
    });

    // Normalize raw scores into percentile arrays
    const percentages = CAREERS.map(career => {
        const max = maxScores[career];
        const score = scores[career];
        const percentage = max > 0 ? Math.round((score / max) * 100) : 0;
        return { career, percentage };
    });

    // Sort descending to establish the highest compatibility ranking
    percentages.sort((a, b) => b.percentage - a.percentage);

    // Package and return the finalized telemetry report structure
    return {
        topMatch: percentages[0],
        alternatives: percentages.slice(1, 4), // Extract the next 3 highest matches
        allScores: percentages
    };
};