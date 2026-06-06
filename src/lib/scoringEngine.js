/**
 * --------------------------------------------------------------------------
 * CAREER PATHS - ENTERPRISE SCORING ENGINE
 * --------------------------------------------------------------------------
 * Core telemetry calculation logic. Maps user heuristic inputs (YES/SOMETIMES/NO)
 * against predefined weight matrices to calculate career compatibility percentages.
 * --------------------------------------------------------------------------
 */

// Expanded Career Trajectories based on the new curriculum mapping
const CAREERS = [
    "Teacher", "Lawyer", "Call Center Agent", "Journalist", "Tour Guide", "News Anchor",
    "Writer / Editor", "Public Information Officer", "Administrative Officer",
    "Civil Service Professional", "Training Officer", "Community Development Worker",
    "Research Assistant", "Language Specialist", "Linguistics Researcher", "Translator",
    "Interpreter", "Human Resources Officer", "Training and Development Specialist",
    "Corporate Trainer", "Communications Officer", "Public Relations Officer",
    "Customer Relations Specialist", "Recruitment Specialist", "Academic Coordinator",
    "Curriculum Developer", "Learning Materials Writer", "Educational Consultant",
    "School Administrator", "Social Media Manager", "Digital Content Creator",
    "SEO Content Writer", "Marketing Assistant", "Brand Communications Specialist", "Community Manager"
];

/**
 * @constant {Array<Object>} scoringMatrix
 * Relational weight matrix. Each index (0-24) corresponds to a questionnaire question.
 * Keys are target careers; values are the heuristic weight (importance) of that question.
 */
const scoringMatrix = [
    { "Journalist": 5, "SEO Content Writer": 5, "Digital Content Creator": 4, "Learning Materials Writer": 4, "Writer / Editor": 5 }, // Q1: Writing articles
    { "Digital Content Creator": 5, "Journalist": 4, "Brand Communications Specialist": 3, "Social Media Manager": 4 }, // Q2: Expressing ideas creatively
    { "Curriculum Developer": 5, "Public Information Officer": 4, "Communications Officer": 4, "Teacher": 3 }, // Q3: Transforming info
    { "Research Assistant": 5, "Linguistics Researcher": 5, "Journalist": 4, "Lawyer": 4 }, // Q4: Researching information
    { "Writer / Editor": 5, "Learning Materials Writer": 4, "Teacher": 3, "Language Specialist": 4 }, // Q5: Reviewing grammar
    { "Marketing Assistant": 5, "Brand Communications Specialist": 5, "Public Relations Officer": 4, "Social Media Manager": 4 }, // Q6: Persuasive messages
    { "Journalist": 5, "Recruitment Specialist": 4, "Human Resources Officer": 3, "News Anchor": 3 }, // Q7: Conducting interviews
    { "News Anchor": 5, "Teacher": 5, "Corporate Trainer": 4, "Tour Guide": 4, "Public Relations Officer": 3 }, // Q8: Speaking in front of audience
    { "Public Information Officer": 5, "Communications Officer": 5, "School Administrator": 4, "Writer / Editor": 3 }, // Q9: Ensuring accurate public info
    { "Social Media Manager": 5, "Digital Content Creator": 5, "Brand Communications Specialist": 4, "Marketing Assistant": 4 }, // Q10: Social media/online content
    { "Teacher": 5, "Educational Consultant": 4, "Corporate Trainer": 4, "Training Officer": 4 }, // Q11: Teaching/Mentoring
    { "Training Officer": 5, "Training and Development Specialist": 5, "Corporate Trainer": 5, "School Administrator": 3 }, // Q12: Conducting training
    { "Teacher": 5, "School Administrator": 4, "Academic Coordinator": 4, "Educational Consultant": 3 }, // Q13: Teaching in school setting
    { "Teacher": 5, "Corporate Trainer": 4, "Training and Development Specialist": 3, "Educational Consultant": 3 }, // Q14: Explaining lessons repeatedly
    { "Curriculum Developer": 5, "Learning Materials Writer": 5, "Teacher": 4, "Educational Consultant": 4, "Academic Coordinator": 3 }, // Q15: Designing lessons/materials
    { "Linguistics Researcher": 5, "Language Specialist": 5, "Translator": 4, "Teacher": 3 }, // Q16: Studying language/communication
    { "Translator": 5, "Interpreter": 4, "Language Specialist": 3, "Linguistics Researcher": 3 }, // Q17: Translating written info
    { "Interpreter": 5, "Translator": 4, "Tour Guide": 4, "Language Specialist": 4, "Call Center Agent": 3 }, // Q18: Cross-cultural/multilingual communication
    { "Administrative Officer": 5, "Human Resources Officer": 4, "Academic Coordinator": 3, "Lawyer": 3 }, // Q19: Organizing records/documents
    { "Administrative Officer": 5, "School Administrator": 5, "Academic Coordinator": 4, "Civil Service Professional": 3 }, // Q20: Coordinating activities
    { "Community Development Worker": 5, "Civil Service Professional": 4, "Educational Consultant": 3, "School Administrator": 3 }, // Q21: Implementing community programs
    { "Recruitment Specialist": 5, "Human Resources Officer": 5, "School Administrator": 3, "Corporate Trainer": 3 }, // Q22: Recruiting/Evaluating people
    { "Customer Relations Specialist": 5, "Call Center Agent": 5, "Community Manager": 4, "Public Relations Officer": 3 }, // Q23: Helping customers/clients
    { "Call Center Agent": 5, "Customer Relations Specialist": 5, "Human Resources Officer": 4, "Lawyer": 3, "School Administrator": 3 }, // Q24: Patient with complaints
    { "Research Assistant": 5, "Linguistics Researcher": 4, "Marketing Assistant": 3, "Journalist": 3 } // Q25: Collecting/analyzing information
];

/**
 * Executes the algorithmic assessment of user inputs against the scoring matrix.
 * * @param {Object} answers - Dictionary of user answers { qIndex: floatValue }
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