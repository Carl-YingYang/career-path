import React, { useState, useRef, useEffect } from 'react';
import { Target, Save, CheckCircle2, Download, Plus, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { jsPDF } from 'jspdf';

const SHORT_GOALS = [
    "Improve my communication skills",
    "Build my confidence in speaking English",
    "Improve my writing skills",
    "Participate in seminars or workshops",
    "Create a professional resume or portfolio",
    "Gain teaching or tutoring experience",
    "Improve my academic performance"
];

const LONG_GOALS = [
    "Teacher (English Teacher / ESL Teacher)",
    "Lawyer",
    "Journalist",
    "News Anchor",
    "Tourist Guide",
    "Writer / Editor",
    "Translator / Interpreter",
    "Human Resources Officer",
    "Public Information Officer",
    "Administrative Officer"
];

// --------------------------------------------------------------------------
// PDF GENERATION UTILITY
// --------------------------------------------------------------------------
const generateGoalsPDF = (shortGoals, longGoals, customShortGoals, customLongGoals, personalGoal) => {
    const doc = new jsPDF({ format: 'a4' });
    let currentY = 25;

    const textDark = [15, 22, 41];
    const textMuted = [100, 116, 139];
    const accentEmerald = [34, 197, 94];
    const lineLight = [226, 232, 240];

    const checkPageBreak = (addedHeight) => {
        if (currentY + addedHeight > 280) {
            doc.addPage();
            currentY = 25;
        }
    };

    // ========== HEADER ==========
    doc.setFillColor(...accentEmerald);
    doc.rect(20, currentY - 5, 2, 14, 'F');

    doc.setTextColor(...textDark);
    doc.setFont("times", "bold");
    doc.setFontSize(22);
    doc.text("CAREER VISION BOARD", 26, currentY + 2);

    doc.setTextColor(...textMuted);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.text("PERSONAL GOAL SETTING PLAN", 26, currentY + 8);

    currentY += 25;

    // ========== TIMESTAMP ==========
    doc.setTextColor(...textMuted);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text(`Generated: ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`, 20, currentY);

    currentY += 12;
    doc.setDrawColor(...lineLight);
    doc.setLineWidth(0.5);
    doc.line(20, currentY, 190, currentY);
    currentY += 15;

    // ========== SHORT TERM GOALS ==========
    doc.setTextColor(...accentEmerald);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text("SHORT-TERM GOALS (0-1 Year)", 20, currentY);
    currentY += 8;

    doc.setTextColor(...textDark);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);

    // Preset short-term goals
    shortGoals.forEach((goal) => {
        checkPageBreak(6);
        doc.text(`✓ ${goal}`, 25, currentY);
        currentY += 6;
    });

    // Custom short-term goals
    const validCustomShort = customShortGoals.filter(g => g.trim() !== '');
    if (validCustomShort.length > 0) {
        checkPageBreak(8);
        doc.setTextColor(...textMuted);
        doc.setFont("helvetica", "italic");
        doc.setFontSize(8);
        doc.text("Custom Goals:", 25, currentY);
        currentY += 6;

        doc.setTextColor(...textDark);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        validCustomShort.forEach((goal) => {
            checkPageBreak(6);
            const splitGoal = doc.splitTextToSize(`✦ ${goal}`, 160);
            doc.text(splitGoal, 25, currentY);
            currentY += splitGoal.length * 5 + 1;
        });
    }

    currentY += 5;
    doc.setDrawColor(...lineLight);
    doc.line(20, currentY, 190, currentY);
    currentY += 15;

    // ========== LONG TERM GOALS ==========
    checkPageBreak(20);
    doc.setTextColor(...accentEmerald);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text("LONG-TERM GOALS (3-5+ Years)", 20, currentY);
    currentY += 8;

    doc.setTextColor(...textDark);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);

    // Preset long-term goals
    longGoals.forEach((goal) => {
        checkPageBreak(6);
        doc.text(`✓ ${goal}`, 25, currentY);
        currentY += 6;
    });

    // Custom long-term goals
    const validCustomLong = customLongGoals.filter(g => g.trim() !== '');
    if (validCustomLong.length > 0) {
        checkPageBreak(8);
        doc.setTextColor(...textMuted);
        doc.setFont("helvetica", "italic");
        doc.setFontSize(8);
        doc.text("Custom Goals:", 25, currentY);
        currentY += 6;

        doc.setTextColor(...textDark);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        validCustomLong.forEach((goal) => {
            checkPageBreak(6);
            const splitGoal = doc.splitTextToSize(`✦ ${goal}`, 160);
            doc.text(splitGoal, 25, currentY);
            currentY += splitGoal.length * 5 + 1;
        });
    }

    currentY += 5;
    doc.setDrawColor(...lineLight);
    doc.line(20, currentY, 190, currentY);
    currentY += 15;

    // ========== PERSONAL OBJECTIVE ==========
    checkPageBreak(30);
    doc.setTextColor(...accentEmerald);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text("PERSONAL CAREER OBJECTIVE", 20, currentY);
    currentY += 10;

    doc.setTextColor(...textDark);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    const splitObjective = doc.splitTextToSize(personalGoal || "No personal objective specified", 170);
    doc.text(splitObjective, 20, currentY);
    currentY += splitObjective.length * 5 + 15;

    // ========== FOOTER ==========
    doc.setTextColor(...textMuted);
    doc.setFont("helvetica", "italic");
    doc.setFontSize(8);
    doc.text("From Page To Profession | English Career Hub", 105, 290, { align: "center" });

    doc.save("Career-Vision-Board.pdf");
};

// --------------------------------------------------------------------------
// CUSTOM GOALS INPUT COMPONENT
// --------------------------------------------------------------------------
function CustomGoalsInput({ goals, setGoals, placeholder }) {
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef(null);

    const addGoal = () => {
        const trimmed = inputValue.trim();
        if (!trimmed) return;
        setGoals(prev => [...prev, trimmed]);
        setInputValue('');
        inputRef.current?.focus();
    };

    const removeGoal = (index) => {
        setGoals(prev => prev.filter((_, i) => i !== index));
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addGoal();
        }
    };

    return (
        <div className="mt-3 space-y-2">
            {/* Added custom goals list */}
            <AnimatePresence>
                {goals.map((goal, index) => (
                    <motion.div
                        key={`${goal}-${index}`}
                        initial={{ opacity: 0, y: -6, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -10, scale: 0.95 }}
                        transition={{ duration: 0.18 }}
                        className="flex items-center gap-2 p-2.5 bg-emerald-50/60 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 rounded-sm"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0"></span>
                        <span className="text-xs text-emerald-800 dark:text-emerald-300 flex-1 font-medium">{goal}</span>
                        <button
                            onClick={() => removeGoal(index)}
                            className="text-emerald-400 hover:text-red-500 dark:hover:text-red-400 transition-colors flex-shrink-0"
                            title="Remove this goal"
                        >
                            <X className="w-3.5 h-3.5" />
                        </button>
                    </motion.div>
                ))}
            </AnimatePresence>

            {/* Input row */}
            <div className="flex gap-2">
                <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    className="flex-1 px-3 py-2.5 text-xs rounded-sm bg-slate-50 dark:bg-[#0a0f1c] border border-dashed border-slate-300 dark:border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none text-slate-700 dark:text-slate-300 placeholder-slate-400 dark:placeholder-slate-600 transition-all"
                />
                <button
                    onClick={addGoal}
                    disabled={!inputValue.trim()}
                    className="flex items-center gap-1.5 px-3 py-2.5 bg-emerald-600 disabled:bg-slate-200 dark:disabled:bg-slate-800 text-white disabled:text-slate-400 rounded-sm text-[10px] font-bold uppercase tracking-wider hover:bg-emerald-700 disabled:cursor-not-allowed transition-all"
                >
                    <Plus className="w-3.5 h-3.5" />
                    Add
                </button>
            </div>
            <p className="text-[10px] text-slate-400 dark:text-slate-600 pl-0.5">Press Enter or click Add to save your goal.</p>
        </div>
    );
}

// --------------------------------------------------------------------------
// MAIN COMPONENT
// --------------------------------------------------------------------------
export default function GoalSetting() {
    const [selectedShort, setSelectedShort] = useState([]);
    const [selectedLong, setSelectedLong] = useState([]);
    const [customShortGoals, setCustomShortGoals] = useState([]);
    const [customLongGoals, setCustomLongGoals] = useState([]);
    const [showCustomShort, setShowCustomShort] = useState(false);
    const [showCustomLong, setShowCustomLong] = useState(false);
    const [otherGoal, setOtherGoal] = useState("");
    const [isSaved, setIsSaved] = useState(false);

    const toggleGoal = (goal, list, setList) => {
        setIsSaved(false);
        setList(list.includes(goal) ? list.filter(g => g !== goal) : [...list, goal]);
    };

    const handleSaveGoals = () => {
        setIsSaved(true);
    };

    const handleDownloadPDF = () => {
        generateGoalsPDF(selectedShort, selectedLong, customShortGoals, customLongGoals, otherGoal);
    };

    // Reset saved state when custom goals change
    useEffect(() => { setIsSaved(false); }, [customShortGoals, customLongGoals]);

    return (
        <div className="w-full max-w-2xl mx-auto">
            {/* Header */}
            <div className="mb-10 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-sm text-[10px] font-bold uppercase tracking-[0.2em] border border-emerald-500/20 mb-6">
                    <Target className="w-3.5 h-3.5" /> Goal Setting
                </div>
                <h2 className="text-xl md:text-2xl font-serif font-bold text-slate-900 dark:text-white tracking-tight mb-2">Career Vision Board</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">Plan your path to success with clear, actionable goals</p>
            </div>

            {/* Content Card */}
            <div className="bg-white dark:bg-[#0f1629] p-6 md:p-8 rounded-md border border-slate-200 dark:border-slate-800/80 shadow-xl space-y-8">

                {/* ── Short Term Goals ── */}
                <div>
                    <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <span className="w-1 h-4 bg-emerald-500 rounded-sm"></span>
                        Short-Term Goals (0-1 Year)
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {SHORT_GOALS.map(goal => (
                            <label key={goal} className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-[#0a0f1c] rounded-sm border border-slate-200 dark:border-slate-800 hover:border-emerald-400 hover:bg-emerald-50/30 dark:hover:bg-emerald-500/5 cursor-pointer transition-all">
                                <input
                                    type="checkbox"
                                    checked={selectedShort.includes(goal)}
                                    onChange={() => toggleGoal(goal, selectedShort, setSelectedShort)}
                                    className="mt-0.5 accent-emerald-500 cursor-pointer"
                                />
                                <span className={`text-xs ${selectedShort.includes(goal) ? 'font-bold text-emerald-600 dark:text-emerald-400' : 'text-slate-600 dark:text-slate-300'}`}>
                                    {goal}
                                </span>
                            </label>
                        ))}

                        {/* Other (specify) toggle row */}
                        <label
                            className={`flex items-start gap-3 p-3 rounded-sm border cursor-pointer transition-all ${showCustomShort
                                ? 'border-emerald-400 bg-emerald-50/40 dark:bg-emerald-500/10'
                                : 'bg-slate-50 dark:bg-[#0a0f1c] border-dashed border-slate-300 dark:border-slate-700 hover:border-emerald-400 hover:bg-emerald-50/30 dark:hover:bg-emerald-500/5'
                                }`}
                            onClick={() => setShowCustomShort(v => !v)}
                        >
                            <input
                                type="checkbox"
                                checked={showCustomShort}
                                onChange={() => setShowCustomShort(v => !v)}
                                className="mt-0.5 accent-emerald-500 cursor-pointer"
                                onClick={e => e.stopPropagation()}
                            />
                            <span className={`text-xs font-bold ${showCustomShort ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400 dark:text-slate-500'}`}>
                                Other (specify)…
                            </span>
                        </label>
                    </div>

                    {/* Custom short-term goals input */}
                    <AnimatePresence>
                        {showCustomShort && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="overflow-hidden"
                            >
                                <div className="mt-3 p-4 bg-slate-50 dark:bg-[#0a0f1c] border border-emerald-200 dark:border-emerald-500/20 rounded-sm">
                                    <p className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-2">
                                        Add Your Own Short-Term Goals
                                    </p>
                                    <CustomGoalsInput
                                        goals={customShortGoals}
                                        setGoals={setCustomShortGoals}
                                        placeholder="e.g. Complete an online English course…"
                                    />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* ── Long Term Goals ── */}
                <div>
                    <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <span className="w-1 h-4 bg-emerald-500 rounded-sm"></span>
                        Long-Term Goals (3-5+ Years)
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {LONG_GOALS.map(goal => (
                            <label key={goal} className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-[#0a0f1c] rounded-sm border border-slate-200 dark:border-slate-800 hover:border-emerald-400 hover:bg-emerald-50/30 dark:hover:bg-emerald-500/5 cursor-pointer transition-all">
                                <input
                                    type="checkbox"
                                    checked={selectedLong.includes(goal)}
                                    onChange={() => toggleGoal(goal, selectedLong, setSelectedLong)}
                                    className="mt-0.5 accent-emerald-500 cursor-pointer"
                                />
                                <span className={`text-xs ${selectedLong.includes(goal) ? 'font-bold text-emerald-600 dark:text-emerald-400' : 'text-slate-600 dark:text-slate-300'}`}>
                                    {goal}
                                </span>
                            </label>
                        ))}

                        {/* Other (specify) toggle row */}
                        <label
                            className={`flex items-start gap-3 p-3 rounded-sm border cursor-pointer transition-all ${showCustomLong
                                ? 'border-emerald-400 bg-emerald-50/40 dark:bg-emerald-500/10'
                                : 'bg-slate-50 dark:bg-[#0a0f1c] border-dashed border-slate-300 dark:border-slate-700 hover:border-emerald-400 hover:bg-emerald-50/30 dark:hover:bg-emerald-500/5'
                                }`}
                            onClick={() => setShowCustomLong(v => !v)}
                        >
                            <input
                                type="checkbox"
                                checked={showCustomLong}
                                onChange={() => setShowCustomLong(v => !v)}
                                className="mt-0.5 accent-emerald-500 cursor-pointer"
                                onClick={e => e.stopPropagation()}
                            />
                            <span className={`text-xs font-bold ${showCustomLong ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400 dark:text-slate-500'}`}>
                                Other (specify)…
                            </span>
                        </label>
                    </div>

                    {/* Custom long-term goals input */}
                    <AnimatePresence>
                        {showCustomLong && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="overflow-hidden"
                            >
                                <div className="mt-3 p-4 bg-slate-50 dark:bg-[#0a0f1c] border border-emerald-200 dark:border-emerald-500/20 rounded-sm">
                                    <p className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-2">
                                        Add Your Own Long-Term Goals
                                    </p>
                                    <CustomGoalsInput
                                        goals={customLongGoals}
                                        setGoals={setCustomLongGoals}
                                        placeholder="e.g. Start my own language school…"
                                    />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* ── Personal Goal ── */}
                <div>
                    <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <span className="w-1 h-4 bg-emerald-500 rounded-sm"></span> My Personal Career Objective
                    </h3>
                    <textarea
                        value={otherGoal}
                        onChange={(e) => { setOtherGoal(e.target.value); setIsSaved(false); }}
                        placeholder="Write your specific career objective here... Be as detailed as possible about where you see yourself in the future."
                        className="w-full p-4 rounded-sm bg-slate-50 dark:bg-[#0a0f1c] border border-slate-200 dark:border-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none text-slate-700 dark:text-slate-300 text-sm h-24 resize-none"
                    />
                </div>

                {/* ── Action Buttons ── */}
                <div className="flex gap-3 pt-4">
                    <button
                        onClick={handleSaveGoals}
                        className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-sm text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-slate-800 dark:hover:bg-slate-100 transition-all shadow-md"
                    >
                        <Save className="w-4 h-4" /> Save Goals
                    </button>
                    <button
                        onClick={handleDownloadPDF}
                        className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-emerald-600 text-white rounded-sm text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-emerald-700 transition-all shadow-md"
                    >
                        <Download className="w-4 h-4" /> Download PDF
                    </button>
                </div>

                {/* ── Success Message ── */}
                <AnimatePresence>
                    {isSaved && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                        >
                            <div className="p-5 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 rounded-sm flex gap-3">
                                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-xs font-bold text-emerald-800 dark:text-emerald-300 mb-1">Goals Saved!</p>
                                    <p className="text-xs text-emerald-700 dark:text-emerald-400 leading-relaxed">
                                        You have successfully set your career vision. Use the Download button to save this as a PDF for future reference.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}