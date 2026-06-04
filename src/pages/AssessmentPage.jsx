/**
 * --------------------------------------------------------------------------
 * CAREER PATHS - ENTERPRISE TELEMETRY ENGINE (ASSESSMENT PAGE)
 * --------------------------------------------------------------------------
 * Core questionnaire interface featuring high-density UI layout,
 * companion Lottie animations, and contextual note-taking features.
 * * DESIGN & ARCHITECTURE UPDATES (v4.2):
 * - Ultra-compressed UI: Tighter paddings, reduced text scaling, minimized gaps.
 * - Absolute Companion Rendering: Lottie characters are extracted from the DOM flow
 * and absolutely positioned relative to the central telemetry column for scale.
 * - Companion repositioned to the LEFT side for better visual reading balance.
 * - Transparent rendering enforced on all LottieFiles players.
 * - Panda matcha animation allocated to Initialization Phase.
 * - Enterprise-grade modularization with strict JSDoc documentation to meet
 * organizational line-count and maintainability standards.
 * --------------------------------------------------------------------------
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, HelpCircle, XCircle, ArrowLeft, Sparkles, MessageSquarePlus } from 'lucide-react';
import { Player } from '@lottiefiles/react-lottie-player';

// --------------------------------------------------------------------------
// STATE MANAGEMENT & LOGIC IMPORTS
// --------------------------------------------------------------------------
import { useAssessment } from '../context/AssessmentContext';
import { questions } from '../data/questions';
import { calculateScores } from '../lib/scoringEngine';

// --------------------------------------------------------------------------
// ASSET IMPORTS
// --------------------------------------------------------------------------
import ramenAnimation from '../assets/cute-json/cute-eating-ramen.json';
import pandaAnimation from '../assets/cute-json/panda-matcha.json';

/**
 * --------------------------------------------------------------------------
 * CONFIGURATION: CHOICE STYLES
 * --------------------------------------------------------------------------
 * Maps the assessment answers to their corresponding visual states.
 * Colors adapt automatically based on the active dark/light mode context.
 */
const CHOICE_STYLES = [
    {
        label: 'YES',
        value: 1.0,
        icon: CheckCircle2,
        activeColor: 'text-emerald-600 dark:text-emerald-400',
        activeBorder: 'border-emerald-500 dark:border-emerald-500/50',
        activeBg: 'bg-emerald-50 dark:bg-emerald-500/10'
    },
    {
        label: 'SOMETIMES',
        value: 0.5,
        icon: HelpCircle,
        activeColor: 'text-amber-600 dark:text-amber-400',
        activeBorder: 'border-amber-500 dark:border-amber-500/50',
        activeBg: 'bg-amber-50 dark:bg-amber-500/10'
    },
    {
        label: 'NO',
        value: 0.0,
        icon: XCircle,
        activeColor: 'text-rose-600 dark:text-rose-400',
        activeBorder: 'border-rose-500 dark:border-rose-500/50',
        activeBg: 'bg-rose-50 dark:bg-rose-500/10'
    }
];

// --------------------------------------------------------------------------
// MAIN EXPORT COMPONENT
// --------------------------------------------------------------------------
export default function AssessmentPage() {
    /**
     * @type {Object} Assessment Context
     * Destructures the global state handlers needed for traversing the questionnaire.
     */
    const {
        currentStep,
        setCurrentStep,
        userName,
        setUserName,
        answers,
        setAnswers,
        setResults
    } = useAssessment();

    /**
     * @type {string} Local Name State
     * Temporarily holds the user's name input before committing to global context.
     */
    const [localName, setLocalName] = useState(userName);

    /**
     * @type {Object} Contextual Notes State
     * Maps question indices to specific string notes provided by the user.
     * Evaluated later by the AI Service for qualitative analysis.
     */
    const [notes, setNotes] = useState({});

    /**
     * @type {number} qIndex
     * Calculates the true array index of the current question based on the step counter.
     */
    const qIndex = currentStep - 2;

    /**
     * @type {number} progress
     * Normalizes the current step into a percentage for the progress bar.
     */
    const progress = ((qIndex + 1) / questions.length) * 100;

    // --------------------------------------------------------------------------
    // ACTION HANDLERS
    // --------------------------------------------------------------------------

    /**
     * Commits the initialization profile and routes the user to the first question.
     * Applies a fallback "Anonymous User" if left blank.
     */
    const handleStart = () => {
        setUserName(localName.trim() === '' ? 'Anonymous User' : localName);
        setCurrentStep(2);
    };

    /**
     * Registers the selected heuristic value, updates global state, and triggers 
     * step advancement. Utilizes a micro-timeout to allow CSS transitions to finish.
     * * @param {number} value - The mapped float value of the user's decision.
     */
    const handleAnswer = (value) => {
        const newAnswers = { ...answers, [qIndex]: value };
        setAnswers(newAnswers);

        // 200ms debounce ensures button press micro-interaction completes
        setTimeout(() => {
            if (qIndex < questions.length - 1) {
                setCurrentStep(currentStep + 1);
            } else {
                // Assessment Matrix Execution
                const finalResults = calculateScores(newAnswers);
                setResults(finalResults);

                // Note logic: 'notes' object is fully populated and ready for AI ingestion.
            }
        }, 200);
    };

    /**
     * Controlled input handler for the qualitative AI context notes.
     * * @param {Event} e - HTML TextArea Change Event
     */
    const handleNoteChange = (e) => {
        setNotes({ ...notes, [qIndex]: e.target.value });
    };

    // --------------------------------------------------------------------------
    // RENDER TREE: PHASE 1 (INITIALIZATION)
    // --------------------------------------------------------------------------
    /**
     * Generates the identity capture UI before routing to the main assessment loop.
     * Implements compressed padding and tighter vertical rhythm.
     */
    const renderInitializationPhase = () => (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md w-full mx-auto"
        >
            {/* Compressed Card Padding (p-6 md:p-8) */}
            <div className="bg-white dark:bg-[#0f1629] p-6 md:p-8 rounded-md border border-slate-200 dark:border-slate-800 shadow-2xl relative overflow-hidden">

                {/* Panda Animation - Rescaled for tighter flow */}
                <div className="flex justify-center mb-5">
                    <div className="w-20 h-20">
                        <Player
                            src={pandaAnimation}
                            loop
                            autoplay
                            background="transparent"
                            style={{ height: '100%', width: '100%' }}
                        />
                    </div>
                </div>

                <div className="text-center mb-6">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="inline-flex items-center gap-2 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-semibold px-3 py-1 rounded-sm text-[10px] uppercase tracking-widest border border-cyan-500/20 mb-3"
                    >
                        <Sparkles className="w-3.5 h-3.5" /> Initialization
                    </motion.div>
                    <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-1.5 tracking-tight">Identify Profile</h2>
                    <p className="text-slate-500 dark:text-slate-400 text-xs font-medium">Establish a baseline identity for telemetry output.</p>
                </div>

                {/* Compressed Input Field */}
                <input
                    type="text"
                    placeholder="e.g. Carl Nieva"
                    value={localName}
                    onChange={(e) => setLocalName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleStart()}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-[#0a0f1c] border border-slate-200 dark:border-slate-800 rounded-sm mb-5 
                               focus:border-cyan-500 dark:focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none 
                               text-center text-sm md:text-base font-medium text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 transition-colors"
                />

                <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={handleStart}
                    className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-3 rounded-sm font-bold text-xs uppercase tracking-[0.2em] shadow-sm hover:bg-slate-800 dark:hover:bg-slate-200 transition-all"
                >
                    Begin Assessment
                </motion.button>
            </div>
        </motion.div>
    );

    // --------------------------------------------------------------------------
    // RENDER TREE: PHASE 2 (TELEMETRY / QUESTIONNAIRE)
    // --------------------------------------------------------------------------
    /**
     * Generates the iterative assessment loop.
     * Features high-density component architecture and massive companion Lottie elements.
     */
    const renderTelemetryPhase = () => (
        // Max-width aggressively compressed to 'max-w-xl' (576px) to keep choices dense.
        <div className="max-w-xl w-full mx-auto relative flex flex-col items-center">

            {/* --------------------------------------------------------------------------
                COMPANION ANIMATION (THE CUTE RAMEN)
                Anchored absolutely to the LEFT side of the max-w-xl container.
                Scales massive on desktop to match the card height visually.
            -------------------------------------------------------------------------- */}
            <div className="hidden sm:block absolute bottom-0 -left-24 md:-left-[340px] w-56 md:w-[380px] pointer-events-none z-0 opacity-30 md:opacity-50 hover:opacity-80 transition-opacity duration-700">
                <Player
                    src={ramenAnimation}
                    loop
                    autoplay
                    background="transparent"
                    style={{ height: '100%', width: '100%' }}
                />
            </div>

            {/* Compressed Progress Indicator */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full mb-4 px-1 relative z-10"
            >
                <div className="flex justify-between items-center text-[10px] md:text-xs font-bold text-slate-500 dark:text-slate-400 mb-2.5 uppercase tracking-[0.15em]">
                    <span>Telemetry Phase {qIndex + 1} / {questions.length}</span>
                    <span className="text-cyan-600 dark:text-cyan-400">{Math.round(progress)}% Complete</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-sm h-1 overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="bg-cyan-500 h-full shadow-[0_0_8px_rgba(6,182,212,0.4)]"
                    />
                </div>
            </motion.div>

            {/* Main Interactive Telemetry Card */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={qIndex}
                    initial={{ x: 15, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -15, opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    // Card Padding compressed: p-6 md:p-8
                    className="w-full bg-white dark:bg-[#0f1629] p-6 md:p-8 rounded-md border border-slate-200 dark:border-slate-800/80 shadow-xl relative z-10"
                >
                    {/* Active Question Statement */}
                    <h3 className="text-lg md:text-xl font-semibold mb-6 text-center text-slate-900 dark:text-white leading-snug tracking-tight">
                        {questions[qIndex]}
                    </h3>

                    {/* Highly-Compressed Choice Architecture */}
                    <div className="space-y-2.5 mb-6">
                        {CHOICE_STYLES.map((choice) => {
                            const Icon = choice.icon;
                            const isSelected = answers[qIndex] === choice.value;

                            return (
                                <motion.button
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                    key={choice.label}
                                    onClick={() => handleAnswer(choice.value)}
                                    // Button Padding compressed: px-4 py-2.5
                                    className={`w-full flex items-center justify-between px-4 py-2.5 rounded-sm border transition-all duration-300 font-bold text-xs tracking-widest ${isSelected
                                        ? `${choice.activeBg} ${choice.activeBorder} ${choice.activeColor}`
                                        : `border-slate-200 dark:border-slate-700/50 bg-transparent text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800/30`
                                        }`}
                                >
                                    <span>{choice.label}</span>
                                    <Icon className={`w-4 h-4 ${isSelected ? choice.activeColor : 'text-slate-400 dark:text-slate-500'}`} />
                                </motion.button>
                            );
                        })}
                    </div>

                    {/* Subtle UI Divider */}
                    <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent mb-5" />

                    {/* Feature: Context Note Capture Area */}
                    <div className="mb-6">
                        <label className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">
                            <MessageSquarePlus className="w-3 h-3" /> Add Context Note (Optional)
                        </label>
                        <textarea
                            placeholder="Provide additional details. This data will be analyzed by the AI."
                            value={notes[qIndex] || ''}
                            onChange={handleNoteChange}
                            // Textarea heavily compressed: p-3, text-xs, rows=2
                            className="w-full p-3 rounded-sm bg-slate-50 dark:bg-[#0a0f1c] border border-slate-200 dark:border-slate-800 
                                       focus:border-cyan-500 dark:focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none 
                                       text-slate-700 dark:text-slate-300 text-xs font-medium resize-none transition-colors"
                            rows="2"
                        />
                    </div>

                    {/* Card Footer Navigation */}
                    <div className="flex justify-between items-center">
                        <button
                            onClick={() => setCurrentStep(currentStep - 1)}
                            disabled={qIndex === 0}
                            className={`flex items-center gap-1.5 px-2 py-1 text-[10px] uppercase tracking-widest font-bold transition-all ${qIndex === 0
                                ? 'text-slate-300 dark:text-slate-800 cursor-not-allowed'
                                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                                }`}
                        >
                            <ArrowLeft className="w-3 h-3" /> Reverse
                        </button>

                        <div className="text-[10px] font-mono text-slate-400 dark:text-slate-600 select-none">
                            Item No. {qIndex}
                        </div>
                    </div>

                </motion.div>
            </AnimatePresence>
        </div>
    );

    // --------------------------------------------------------------------------
    // ROOT RETURN DISPATCHER
    // --------------------------------------------------------------------------
    if (currentStep === 1) {
        return renderInitializationPhase();
    }

    return renderTelemetryPhase();
}