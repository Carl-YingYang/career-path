/**
 * --------------------------------------------------------------------------
 * CAREER PATHS - SELF AWARENESS MODULE
 * --------------------------------------------------------------------------
 * Interactive 10-question behavioral assessment designed to extract and rank
 * the user's top three professional strengths based on situational heuristics.
 * --------------------------------------------------------------------------
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, ArrowRight, RotateCcw, BrainCircuit, CheckCircle2 } from 'lucide-react';

// --------------------------------------------------------------------------
// DATA DICTIONARY: STRENGTHS QUESTIONNAIRE
// --------------------------------------------------------------------------
const STRENGTH_QUESTIONS = [
    {
        id: 1,
        question: "When working on a group project, what role do you naturally take?",
        options: [
            { text: "I organize tasks and keep everyone on track", trait: "Leadership" },
            { text: "I generate creative ideas", trait: "Creativity" },
            { text: "I support others", trait: "Empathy" },
            { text: "I focus on details", trait: "Attention to detail" }
        ]
    },
    {
        id: 2,
        question: "How do you usually solve a difficult problem?",
        options: [
            { text: "Break it down into smaller steps", trait: "Analytical thinking" },
            { text: "Brainstorm possibilities", trait: "Creativity" },
            { text: "Ask others for input", trait: "Teamwork" },
            { text: "Stay persistent", trait: "Resilience" }
        ]
    },
    {
        id: 3,
        question: "What motivates you the most in your studies or career?",
        options: [
            { text: "Achieving clear goals", trait: "Goal orientation" },
            { text: "Exploring new ideas", trait: "Curiosity" },
            { text: "Helping others succeed", trait: "Empathy" },
            { text: "Recognition for my work", trait: "Confidence" }
        ]
    },
    {
        id: 4,
        question: "When facing a new challenge, your first instinct is to:",
        options: [
            { text: "Plan carefully before acting", trait: "Strategic thinking" },
            { text: "Jump in and experiment", trait: "Adaptability" },
            { text: "Seek advice", trait: "Networking" },
            { text: "Reflect on past experiences", trait: "Self-awareness" }
        ]
    },
    {
        id: 5,
        question: "Which activity do you enjoy the most?",
        options: [
            { text: "Leading a team to success", trait: "Leadership" },
            { text: "Designing something new", trait: "Creativity" },
            { text: "Listening and supporting friends", trait: "Empathy" },
            { text: "Organizing schedules", trait: "Time management" }
        ]
    },
    {
        id: 6,
        question: "How do you handle stress during exams or deadlines?",
        options: [
            { text: "Create a clear plan and stick to it", trait: "Time management" },
            { text: "Try to stay positive", trait: "Optimism" },
            { text: "Talk to peers for support", trait: "Collaboration" },
            { text: "Focus on relaxation techniques", trait: "Mindfulness" }
        ]
    },
    {
        id: 7,
        question: "What do teachers or peers often compliment you on?",
        options: [
            { text: "My ability to lead", trait: "Leadership" },
            { text: "My creative ideas", trait: "Creativity" },
            { text: "My kindness", trait: "Empathy" },
            { text: "My accuracy", trait: "Attention to detail" }
        ]
    },
    {
        id: 8,
        question: "When learning something new, you prefer to:",
        options: [
            { text: "Break it into steps", trait: "Analytical thinking" },
            { text: "Explore through trial and error", trait: "Adaptability" },
            { text: "Discuss with others", trait: "Collaboration" },
            { text: "Relate it to past experiences", trait: "Reflection" }
        ]
    },
    {
        id: 9,
        question: "Which of these statements feels most true?",
        options: [
            { text: "I like setting clear goals", trait: "Goal orientation" },
            { text: "I enjoy experimenting", trait: "Creativity" },
            { text: "I value helping others", trait: "Empathy" },
            { text: "I thrive under pressure", trait: "Resilience" }
        ]
    },
    {
        id: 10,
        question: "In group discussions, you are usually:",
        options: [
            { text: "Taking the lead in organizing ideas", trait: "Leadership" },
            { text: "Sharing innovative suggestions", trait: "Creativity" },
            { text: "Encouraging quieter members to speak", trait: "Empathy" },
            { text: "Summarizing key points", trait: "Analytical thinking" }
        ]
    }
];

// --------------------------------------------------------------------------
// MAIN COMPONENT EXPORT
// --------------------------------------------------------------------------
export default function SelfAwareness() {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState({});
    const [results, setResults] = useState(null);

    /**
     * Captures the selected trait and advances the quiz or triggers calculation.
     * @param {string} trait - The psychological trait mapped to the chosen answer.
     */
    const handleAnswer = (trait) => {
        const newAnswers = { ...answers, [currentStep]: trait };
        setAnswers(newAnswers);

        setTimeout(() => {
            if (currentStep < STRENGTH_QUESTIONS.length - 1) {
                setCurrentStep(currentStep + 1);
            } else {
                calculateTopStrengths(newAnswers);
            }
        }, 250);
    };

    /**
     * Aggregates the selected traits, counts frequencies, and isolates the top 3.
     * @param {Object} finalAnswers - Dictionary of step indices to trait strings.
     */
    const calculateTopStrengths = (finalAnswers) => {
        const counts = {};
        Object.values(finalAnswers).forEach(trait => {
            counts[trait] = (counts[trait] || 0) + 1;
        });

        // Sort traits by frequency in descending order
        const sortedTraits = Object.entries(counts)
            .sort((a, b) => b[1] - a[1])
            .map(entry => ({ trait: entry[0], count: entry[1] }));

        setResults(sortedTraits.slice(0, 3));
    };

    const resetQuiz = () => {
        setAnswers({});
        setResults(null);
        setCurrentStep(0);
    };

    // --------------------------------------------------------------------------
    // RENDER: RESULTS DASHBOARD
    // --------------------------------------------------------------------------
    if (results) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-2xl mx-auto bg-white dark:bg-[#0f1629] p-8 rounded-md border border-slate-200 dark:border-slate-800 shadow-xl"
            >
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-cyan-500/10 mb-4 border border-cyan-500/20">
                        <Award className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-900 dark:text-white mb-2 tracking-tight">Your Core Strengths</h2>
                    <p className="text-slate-500 dark:text-slate-400 text-xs uppercase tracking-widest font-semibold">Self-Awareness Analysis Complete</p>
                </div>

                <div className="space-y-4 mb-10">
                    {results.map((item, index) => (
                        <motion.div
                            key={item.trait}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.15 }}
                            className="flex items-center justify-between p-5 bg-slate-50 dark:bg-[#0a0f1c]/50 rounded-sm border border-slate-200 dark:border-slate-800/80"
                        >
                            <div className="flex items-center gap-4">
                                <div className="text-2xl font-mono font-bold text-slate-300 dark:text-slate-700">0{index + 1}</div>
                                <span className="text-lg font-semibold text-slate-800 dark:text-slate-200">{item.trait}</span>
                            </div>
                            <div className="text-[10px] text-cyan-600 dark:text-cyan-400 uppercase tracking-widest font-bold">
                                Prominence: {item.count}
                            </div>
                        </motion.div>
                    ))}
                </div>

                <button
                    onClick={resetQuiz}
                    className="w-full flex items-center justify-center gap-2 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-sm text-xs font-bold uppercase tracking-[0.2em] hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors"
                >
                    <RotateCcw className="w-4 h-4" /> Retake Module
                </button>
            </motion.div>
        );
    }

    // --------------------------------------------------------------------------
    // RENDER: INTERACTIVE QUIZ LOOP
    // --------------------------------------------------------------------------
    const progress = ((currentStep) / STRENGTH_QUESTIONS.length) * 100;
    const currentQ = STRENGTH_QUESTIONS[currentStep];

    return (
        <div className="w-full max-w-2xl mx-auto">
            {/* Header & Progress */}
            <div className="mb-10 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-sm text-[10px] font-bold uppercase tracking-[0.2em] border border-blue-500/20 mb-6">
                    <BrainCircuit className="w-3.5 h-3.5" /> Self-Awareness Module
                </div>
                <h2 className="text-xl md:text-2xl font-serif font-bold text-slate-900 dark:text-white tracking-tight mb-2">Discover Your Strengths</h2>
                <p className="text-slate-500 dark:text-slate-400 text-xs">Select the option that best describes your natural behavior.</p>
            </div>

            <div className="mb-8">
                <div className="flex justify-between items-center text-[10px] font-bold text-slate-500 dark:text-slate-400 mb-2.5 uppercase tracking-widest">
                    <span>Diagnostic {currentStep + 1} / {STRENGTH_QUESTIONS.length}</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-none h-1 overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        className="bg-blue-500 h-full shadow-[0_0_8px_rgba(59,130,246,0.5)]"
                    />
                </div>
            </div>

            {/* Question Card */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentStep}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -20, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="bg-white dark:bg-[#0f1629] p-6 md:p-10 rounded-md border border-slate-200 dark:border-slate-800/80 shadow-xl"
                >
                    <h3 className="text-lg md:text-xl font-semibold mb-8 text-slate-900 dark:text-white leading-snug">
                        {currentQ.question}
                    </h3>

                    <div className="space-y-3">
                        {currentQ.options.map((option, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleAnswer(option.trait)}
                                className="w-full flex items-center justify-between p-4 bg-slate-50 dark:bg-[#0a0f1c]/50 border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 dark:hover:border-blue-500/50 rounded-sm group transition-all text-left"
                            >
                                <span className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                                    {option.text}
                                </span>
                                <CheckCircle2 className="w-4 h-4 text-slate-300 dark:text-slate-700 group-hover:text-blue-500 transition-colors" />
                            </button>
                        ))}
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}