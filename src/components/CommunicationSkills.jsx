import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Sparkles, Loader2, CheckCircle2, Mic } from 'lucide-react';
import { analyzeInterviewAnswer } from '../services/aiService';

const INTERVIEW_QUESTIONS = [
    "Tell me about yourself.",
    "What is your greatest strength?",
    "Describe a challenge you overcame.",
    "Where do you see yourself in 5 years?"
];

export default function CommunicationSkills() {
    const [selectedQuestion, setSelectedQuestion] = useState(INTERVIEW_QUESTIONS[0]);
    const [answer, setAnswer] = useState("");
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [feedback, setFeedback] = useState(null);

    const handleAnalyze = async () => {
        if (!answer.trim()) return;
        setIsAnalyzing(true);
        setFeedback(null);
        const result = await analyzeInterviewAnswer(selectedQuestion, answer);
        setFeedback(result);
        setIsAnalyzing(false);
    };

    return (
        <div className="w-full max-w-2xl mx-auto">
            <div className="mb-10 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-sm text-[10px] font-bold uppercase tracking-[0.2em] border border-purple-500/20 mb-6">
                    <Mic className="w-3.5 h-3.5" /> Communication Skills
                </div>
                <h2 className="text-xl md:text-2xl font-serif font-bold text-slate-900 dark:text-white tracking-tight mb-2">Practice Your Interview</h2>
                <p className="text-slate-500 dark:text-slate-400 text-xs">Choose a question and type your answer to receive automated AI feedback.</p>
            </div>

            <div className="bg-white dark:bg-[#0f1629] p-6 md:p-8 rounded-md border border-slate-200 dark:border-slate-800/80 shadow-xl">
                <div className="mb-6">
                    <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 mb-3 uppercase tracking-widest">Select Question</label>
                    <div className="grid grid-cols-1 gap-2">
                        {INTERVIEW_QUESTIONS.map((q) => (
                            <button
                                key={q}
                                onClick={() => { setSelectedQuestion(q); setFeedback(null); }}
                                className={`text-left p-3 rounded-sm text-xs font-medium border transition-all ${selectedQuestion === q
                                        ? 'bg-purple-50 dark:bg-purple-500/10 border-purple-500 dark:border-purple-500/50 text-purple-700 dark:text-purple-400'
                                        : 'bg-slate-50 dark:bg-[#0a0f1c] border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-600'
                                    }`}
                            >
                                {q}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="mb-6">
                    <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 mb-3 uppercase tracking-widest flex items-center gap-2">
                        <MessageSquare className="w-3.5 h-3.5" /> Your Response
                    </label>
                    <textarea
                        placeholder="Type your answer here..."
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        className="w-full p-4 rounded-sm bg-slate-50 dark:bg-[#0a0f1c] border border-slate-200 dark:border-slate-800 focus:border-purple-500 outline-none text-slate-700 dark:text-slate-300 text-sm resize-none h-32"
                    />
                </div>

                <button
                    onClick={handleAnalyze}
                    disabled={isAnalyzing || !answer.trim()}
                    className="w-full flex items-center justify-center gap-2 py-3.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-sm text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors disabled:opacity-50"
                >
                    {isAnalyzing ? <><Loader2 className="w-4 h-4 animate-spin" /> Analyzing...</> : <><Sparkles className="w-4 h-4" /> Analyze Answer</>}
                </button>

                <AnimatePresence>
                    {feedback && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="overflow-hidden">
                            <div className="p-5 bg-purple-50 dark:bg-purple-500/5 border border-purple-200 dark:border-purple-500/20 rounded-sm mt-6 space-y-4">
                                <h4 className="text-[10px] font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5" /> AI Feedback</h4>
                                <div><span className="text-[10px] font-bold text-slate-700 dark:text-slate-300 uppercase block mb-1">Clarity</span><p className="text-sm text-slate-600 dark:text-slate-400">{feedback.clarity}</p></div>
                                <div><span className="text-[10px] font-bold text-slate-700 dark:text-slate-300 uppercase block mb-1">Tone</span><p className="text-sm text-slate-600 dark:text-slate-400">{feedback.tone}</p></div>
                                <div><span className="text-[10px] font-bold text-slate-700 dark:text-slate-300 uppercase block mb-1">Structure</span><p className="text-sm text-slate-600 dark:text-slate-400">{feedback.structure}</p></div>
                                <div className="pt-3 border-t border-slate-200 dark:border-slate-800"><span className="text-[10px] font-bold text-cyan-600 dark:text-cyan-500 uppercase block mb-1">Expert Suggestion</span><p className="text-sm text-slate-600 dark:text-slate-400">{feedback.suggestion}</p></div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}