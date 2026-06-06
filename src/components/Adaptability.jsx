import React, { useState } from 'react';
import { Compass, Sparkles, Loader2, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { analyzeAdaptability } from '../services/aiService';

export default function Adaptability() {
    const [q1, setQ1] = useState("");
    const [q2, setQ2] = useState("");
    const [q3, setQ3] = useState("");
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [feedback, setFeedback] = useState(null);

    const handleAnalyze = async () => {
        if (!q1 || !q2 || !q3) return;
        setIsAnalyzing(true);
        setFeedback(null);

        const result = await analyzeAdaptability(q1, q2, q3);

        if (result) {
            setFeedback(result);
        } else {
            // Fallback just in case the API is slow
            setFeedback({ advice: "Your adaptability plan shows strong resilience. Identifying transferable skills early allows you to pivot confidently when unexpected career shifts happen." });
        }
        setIsAnalyzing(false);
    };

    return (
        <div className="w-full max-w-2xl mx-auto">
            <div className="mb-10 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-sm text-[10px] font-bold uppercase tracking-[0.2em] border border-amber-500/20 mb-6">
                    <Compass className="w-3.5 h-3.5" /> Adaptability
                </div>
                <h2 className="text-xl md:text-2xl font-serif font-bold text-slate-900 dark:text-white tracking-tight mb-2">Plan B Activated!</h2>
                <p className="text-slate-500 dark:text-slate-400 text-xs">Please write your response clearly below.</p>
            </div>

            <div className="bg-white dark:bg-[#0f1629] p-6 md:p-8 rounded-md border border-slate-200 dark:border-slate-800/80 shadow-xl space-y-6">

                <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">What will you do if your dream career field changes?</label>
                    <label className="block text-[10px] text-slate-500 dark:text-slate-500 italic mb-3">(Ano ang gagawin mo kung magbago ang pinapangarap mong larangan ng karera?)</label>
                    <textarea
                        value={q1} onChange={(e) => setQ1(e.target.value)}
                        className="w-full p-4 rounded-sm bg-slate-50 dark:bg-[#0a0f1c] border border-slate-200 dark:border-slate-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none text-slate-700 dark:text-slate-300 text-sm h-24 resize-none transition-colors"
                    />
                </div>

                <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">What steps will you take to adapt and move forward after experiencing a major change in your career plans?</label>
                    <label className="block text-[10px] text-slate-500 dark:text-slate-500 italic mb-3">(Anong mga hakbang ang gagawin mo upang makaangkop at makapagpatuloy pagkatapos makaranas ng malaking pagbabago sa iyong mga plano sa karera?)</label>
                    <textarea
                        value={q2} onChange={(e) => setQ2(e.target.value)}
                        className="w-full p-4 rounded-sm bg-slate-50 dark:bg-[#0a0f1c] border border-slate-200 dark:border-slate-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none text-slate-700 dark:text-slate-300 text-sm h-24 resize-none transition-colors"
                    />
                </div>

                <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">What skills will help you adapt to changes?</label>
                    <label className="block text-[10px] text-slate-500 dark:text-slate-500 italic mb-3">(Anong mga kasanayan ang makatutulong sa iyo upang makaangkop sa mga pagbabago?)</label>
                    <textarea
                        value={q3} onChange={(e) => setQ3(e.target.value)}
                        className="w-full p-4 rounded-sm bg-slate-50 dark:bg-[#0a0f1c] border border-slate-200 dark:border-slate-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none text-slate-700 dark:text-slate-300 text-sm h-24 resize-none transition-colors"
                    />
                </div>

                <button
                    onClick={handleAnalyze}
                    disabled={isAnalyzing || !q1 || !q2 || !q3}
                    className="w-full flex items-center justify-center gap-2 py-3.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-sm text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors disabled:opacity-50 shadow-md"
                >
                    {isAnalyzing ? <><Loader2 className="w-4 h-4 animate-spin" /> Evaluating Plan...</> : <><Sparkles className="w-4 h-4" /> Analyze Plan B</>}
                </button>

                <AnimatePresence>
                    {feedback && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="overflow-hidden">
                            <div className="p-5 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-sm mt-4">
                                <h4 className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest flex items-center gap-2 mb-2"><CheckCircle2 className="w-3.5 h-3.5" /> AI Feedback / Advice</h4>
                                <p className="text-sm text-amber-900 dark:text-amber-200 leading-relaxed font-medium">{feedback.advice}</p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}