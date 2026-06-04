/**
 * --------------------------------------------------------------------------
 * CAREER PATHS - ENTERPRISE TELEMETRY ENGINE (RESULT PAGE)
 * --------------------------------------------------------------------------
 * Core analytics dashboard displaying the user's computed career trajectory.
 * * DESIGN & ARCHITECTURE UPDATES:
 * - High-compression UI: Tighter paddings and sharp geometric borders (rounded-sm).
 * - Typography: Integrated font-serif for primary headers to match platform branding.
 * - Monospaced data points for technical "telemetry" aesthetic.
 * - Enterprise dark/light mode color enforcement.
 * --------------------------------------------------------------------------
 */

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Loader2, Sparkles, Target, Award, ArrowRight, Zap, ChevronRight } from 'lucide-react';
import { useAssessment } from '../context/AssessmentContext';
import { generateAnalysis } from '../services/aiService';
import { generatePDF } from '../services/pdfService';

// Asset Imports
import teacherImg from '../assets/teacher.png';
import lawyerImg from '../assets/lawyer.png';
import callCenterImg from '../assets/call_center.png';
import journalistImg from '../assets/journalist.png';
import tourGuideImg from '../assets/tour_guide.png';
import flightAttendantImg from '../assets/Flight_Attendant.png';
import pilotImg from '../assets/Pilot.png';
import newsAnchorImg from '../assets/News_Anchor.png';

const careerImages = {
    'Teacher': teacherImg,
    'Lawyer': lawyerImg,
    'Call Center Agent': callCenterImg,
    'Journalist': journalistImg,
    'Tour Guide': tourGuideImg,
    'Flight Attendant': flightAttendantImg,
    'Pilot': pilotImg,
    'News Anchor': newsAnchorImg,
};

// --------------------------------------------------------------------------
// COMPONENT: AMBIENT PARTICLE BACKGROUND
// --------------------------------------------------------------------------
const ParticleBackground = () => {
    const particles = Array.from({ length: 20 }).map((_, i) => ({
        id: i,
        size: Math.random() * 3 + 1,
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: Math.random() * 25 + 15,
        delay: Math.random() * -20,
    }));

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            {/* Minimalist Glows - Adapts to Light/Dark */}
            <div className="hidden dark:block absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-900/10 blur-[120px]" />
            <div className="hidden dark:block absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-900/10 blur-[120px]" />
            <div className="block dark:hidden absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-100/40 blur-[120px]" />
            <div className="block dark:hidden absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-100/40 blur-[120px]" />

            {/* Subtle Drift Particles */}
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute rounded-full bg-cyan-500/20 dark:bg-cyan-400/10"
                    style={{
                        width: p.size,
                        height: p.size,
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                    }}
                    animate={{
                        y: ["0%", "-50%", "0%"],
                        opacity: [0, 0.5, 0],
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        delay: p.delay,
                        ease: "linear",
                    }}
                />
            ))}
        </div>
    );
};

// --------------------------------------------------------------------------
// MAIN EXPORT COMPONENT: RESULT PAGE
// --------------------------------------------------------------------------
export default function ResultPage() {
    const { userName, results } = useAssessment();
    const [aiData, setAiData] = useState(null);
    const [loading, setLoading] = useState(true);

    // Initialization hook for AI analysis
    useEffect(() => {
        const fetchAI = async () => {
            const data = await generateAnalysis(userName, results.topMatch, results.alternatives);
            setAiData(data);
            setLoading(false);
        };
        fetchAI();
    }, [results, userName]);

    const handleDownload = () => {
        generatePDF(userName, results, aiData);
    };

    return (
        <div className="relative w-full flex flex-col items-center py-12 px-4 md:px-8 text-slate-900 dark:text-slate-200">
            <ParticleBackground />

            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl w-full relative z-10"
            >
                {/* --------------------------------------------------------------------------
                    SECTION: EXECUTIVE HEADER
                -------------------------------------------------------------------------- */}
                <div className="text-center mb-10">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="inline-flex items-center gap-2 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-semibold px-3 py-1 rounded-sm text-[10px] mb-4 uppercase tracking-[0.2em] border border-cyan-500/20"
                    >
                        <Sparkles className="w-3 h-3" /> Analysis Complete
                    </motion.div>
                    {/* Integrated Font-Serif for Enterprise Branding */}
                    <h2 className="text-3xl md:text-4xl font-serif font-medium text-slate-900 dark:text-white mb-2 tracking-tight">
                        Your Career Trajectory
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 text-xs md:text-sm uppercase tracking-widest font-semibold">
                        Target Profile: <span className="text-cyan-600 dark:text-cyan-400 font-bold">{userName}</span>
                    </p>
                </div>

                {/* --------------------------------------------------------------------------
                    SECTION: PRIMARY MATCH (High-Fidelity Data Card)
                -------------------------------------------------------------------------- */}
                <motion.div
                    initial={{ scale: 0.98, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white dark:bg-[#0f1629]/90 backdrop-blur-md border border-slate-200 dark:border-slate-700/50 rounded-md overflow-hidden mb-8 shadow-xl"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                        {/* Data Context Side */}
                        <div className="p-6 md:p-10 flex flex-col justify-center order-2 md:order-1">
                            <h3 className="text-[10px] font-bold text-cyan-600 dark:text-cyan-500 uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                                <Target className="w-3.5 h-3.5" /> Primary Match
                            </h3>
                            <h1 className="text-4xl md:text-5xl font-serif text-slate-900 dark:text-white mb-6 tracking-tight leading-none">
                                {results.topMatch.career}
                            </h1>

                            <div className="flex flex-col gap-1 mb-4">
                                <div className="text-5xl font-light text-slate-900 dark:text-white flex items-end gap-2 font-mono">
                                    {results.topMatch.percentage}<span className="text-2xl text-cyan-500 font-bold">%</span>
                                </div>
                                <div className="text-slate-500 dark:text-slate-500 font-semibold text-[10px] uppercase tracking-widest">
                                    Compatibility Metric
                                </div>
                            </div>

                            {/* Sharp Precision Progress Bar */}
                            <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-none h-1 mt-2 overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${results.topMatch.percentage}%` }}
                                    transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                                    className="bg-cyan-500 h-full shadow-[0_0_10px_rgba(6,182,212,0.5)]"
                                />
                            </div>
                        </div>

                        {/* Image Side - Strict Grayscale Filter Base */}
                        <div className="relative h-56 md:h-full overflow-hidden order-1 md:order-2 border-b md:border-b-0 md:border-l border-slate-200 dark:border-slate-700/50">
                            <div className="absolute inset-0 bg-slate-900/10 dark:bg-[#0f1629]/40 z-10 mix-blend-overlay" />
                            <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#0f1629] via-transparent to-transparent z-10 md:hidden" />
                            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-white dark:to-[#0f1629] z-10 hidden md:block" />
                            <img
                                src={careerImages[results.topMatch.career]}
                                alt={results.topMatch.career}
                                className="w-full h-full object-cover grayscale-[30%] contrast-125"
                            />
                        </div>
                    </div>
                </motion.div>

                {/* --------------------------------------------------------------------------
                    SECTION: SECONDARY ALIGNMENTS (Embedded Flex Row)
                -------------------------------------------------------------------------- */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mb-8"
                >
                    <div className="flex flex-col md:flex-row gap-3">
                        {results.alternatives.map((alt, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ scale: 1.01, y: -2 }}
                                whileTap={{ scale: 0.99 }}
                                className="flex-1 bg-white dark:bg-[#0f1629]/50 backdrop-blur-md border border-slate-200 dark:border-slate-800 hover:border-cyan-500/40 dark:hover:border-cyan-500/40 rounded-sm p-4 flex items-center justify-between cursor-pointer group transition-all shadow-sm"
                            >
                                <div className="flex flex-col">
                                    <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1 font-bold">Secondary</span>
                                    <span className="font-serif text-sm md:text-base font-medium text-slate-800 dark:text-slate-200 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{alt.career}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-lg font-mono font-bold text-cyan-600 dark:text-cyan-500">{alt.percentage}%</span>
                                    <ChevronRight className="w-4 h-4 text-slate-400 dark:text-slate-600 group-hover:text-cyan-500 transition-colors" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* --------------------------------------------------------------------------
                    SECTION: AI INTELLIGENCE DASHBOARD
                -------------------------------------------------------------------------- */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-16 border border-slate-200 dark:border-slate-800 rounded-sm bg-white/50 dark:bg-[#0f1629]/30 backdrop-blur-sm">
                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}>
                            <Loader2 className="w-5 h-5 text-cyan-600 dark:text-cyan-500" />
                        </motion.div>
                        <p className="text-slate-500 text-[10px] font-bold mt-4 tracking-widest uppercase">Compiling AI Insights...</p>
                    </div>
                ) : aiData ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-white dark:bg-[#0f1629]/90 backdrop-blur-md border border-slate-200 dark:border-slate-700/50 rounded-md p-6 md:p-8 shadow-xl"
                    >
                        <div className="flex items-center gap-2 mb-6 border-b border-slate-100 dark:border-slate-800 pb-3">
                            <Zap className="w-4 h-4 text-cyan-600 dark:text-cyan-500" />
                            <h3 className="text-xs md:text-sm font-bold text-slate-900 dark:text-white tracking-widest uppercase">Executive Briefing</h3>
                        </div>

                        {/* Summary Block */}
                        <div className="mb-8">
                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm pl-4 border-l-2 border-cyan-500/50">
                                {aiData.summary}
                            </p>
                        </div>

                        {/* Data Grid: Strengths & Recommendations */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">

                            {/* Strengths Module */}
                            <div className="p-5 bg-slate-50 dark:bg-[#0a0f1c]/50 rounded-sm border border-slate-100 dark:border-slate-800/50">
                                <h4 className="text-[10px] font-bold text-slate-500 dark:text-slate-400 mb-4 uppercase tracking-widest flex items-center gap-2">
                                    <Award className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-500" /> Core Strengths
                                </h4>
                                <ul className="space-y-3">
                                    {aiData.strengths.map((s, i) => (
                                        <li key={i} className="flex gap-3 text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
                                            <div className="mt-1.5 w-1 h-1 rounded-none bg-cyan-500 flex-shrink-0" />
                                            <span>{s}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Recommendations Module */}
                            <div className="p-5 bg-slate-50 dark:bg-[#0a0f1c]/50 rounded-sm border border-slate-100 dark:border-slate-800/50">
                                <h4 className="text-[10px] font-bold text-slate-500 dark:text-slate-400 mb-4 uppercase tracking-widest flex items-center gap-2">
                                    <ArrowRight className="w-3.5 h-3.5 text-blue-600 dark:text-blue-500" /> Action Items
                                </h4>
                                <ul className="space-y-3">
                                    {aiData.learningRecs.map((r, i) => (
                                        <li key={i} className="flex gap-3 text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
                                            <div className="mt-1 w-1.5 h-1.5 border border-blue-500 flex-shrink-0 rotate-45" />
                                            <span>{r}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Export Action */}
                        <motion.button
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={handleDownload}
                            className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-200 font-bold py-3.5 rounded-sm flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.2em] transition-colors shadow-md"
                        >
                            <Download className="w-4 h-4" /> Export Telemetry Data
                        </motion.button>
                    </motion.div>
                ) : (
                    <div className="border border-red-200 dark:border-red-900/30 bg-red-50 dark:bg-red-950/20 rounded-sm p-6 text-center">
                        <p className="text-red-600 dark:text-red-400 text-xs tracking-widest uppercase font-bold">System Error: AI Initialization Failed.</p>
                    </div>
                )}
            </motion.div>
        </div>
    );
}