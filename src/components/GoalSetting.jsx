import React, { useState } from 'react';
import { Target, Save, CheckCircle2, Download } from 'lucide-react';
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
const generateGoalsPDF = (shortGoals, longGoals, personalGoal) => {
    const doc = new jsPDF({ format: 'a4' });
    let currentY = 25;

    // Color Palette
    const textDark = [15, 22, 41];
    const textMuted = [100, 116, 139];
    const accentEmerald = [34, 197, 94];
    const lineLight = [226, 232, 240];

    // Helper for page breaks
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

    shortGoals.forEach((goal) => {
        checkPageBreak(6);
        doc.text(`✓ ${goal}`, 25, currentY);
        currentY += 6;
    });

    currentY += 5;
    doc.setDrawColor(...lineLight);
    doc.line(20, currentY, 190, currentY);
    currentY += 15;

    // ========== LONG TERM GOALS ==========
    doc.setTextColor(...accentEmerald);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text("LONG-TERM GOALS (3-5+ Years)", 20, currentY);
    currentY += 8;

    doc.setTextColor(...textDark);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);

    longGoals.forEach((goal) => {
        checkPageBreak(6);
        doc.text(`✓ ${goal}`, 25, currentY);
        currentY += 6;
    });

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

    // Save PDF
    doc.save("Career-Vision-Board.pdf");
};

export default function GoalSetting() {
    const [selectedShort, setSelectedShort] = useState([]);
    const [selectedLong, setSelectedLong] = useState([]);
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
        generateGoalsPDF(selectedShort, selectedLong, otherGoal);
    };

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

                {/* Short Term Goals */}
                <div>
                    <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <span className="w-1 h-4 bg-emerald-500 rounded-sm"></span> Short-Term Goals (0-1 Year)
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
                    </div>
                </div>

                {/* Long Term Goals */}
                <div>
                    <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <span className="w-1 h-4 bg-emerald-500 rounded-sm"></span> Long-Term Goals (3-5+ Years)
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
                    </div>
                </div>

                {/* Personal Goal */}
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

                {/* Action Buttons */}
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

                {/* Success Message */}
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