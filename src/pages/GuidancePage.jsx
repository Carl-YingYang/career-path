import React from 'react';
import { motion } from 'framer-motion';
import { HeartPulse, BrainCircuit, Activity, Users, ShieldCheck, AlertTriangle, Target } from 'lucide-react';

export default function GuidancePage() {
    return (
        <div className="w-full max-w-3xl mx-auto py-12 px-4 md:px-8">
            <div className="mb-12 text-center">
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-3 py-1 bg-rose-500/10 text-rose-600 dark:text-rose-400 rounded-sm text-[10px] font-bold uppercase tracking-[0.2em] border border-rose-500/20 mb-6">
                    <HeartPulse className="w-3.5 h-3.5" /> Wellness Center
                </motion.div>
                <motion.h2 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-3xl md:text-4xl font-serif font-bold text-slate-900 dark:text-white tracking-tight mb-4">
                    Guidance and Support
                </motion.h2>
                <p className="text-slate-500 dark:text-slate-400 text-sm">Mental health and career anxiety resources for students.</p>
            </div>

            <div className="space-y-6">
                <div className="bg-white dark:bg-[#0f1629] p-8 rounded-md border border-slate-200 dark:border-slate-800/80 shadow-lg">
                    <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-widest flex items-center gap-3 mb-4">
                        <BrainCircuit className="w-4 h-4 text-rose-500" /> Why do I feel anxious?
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-loose">
                        You feel anxious because your mind is responding to stress and uncertainty about what the future holds, and evidence shows that is normal among college students. Academic stress, financial concerns, and uncertainty about your future career are the most common causes of career anxiety, and more than 60% of students with anxiety symptoms report they have difficulty finding support because of stigma or lack of resources.
                    </p>
                </div>

                <div className="bg-white dark:bg-[#0f1629] p-8 rounded-md border border-slate-200 dark:border-slate-800/80 shadow-lg">
                    <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-widest flex items-center gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
                        <ShieldCheck className="w-4 h-4 text-emerald-500" /> How to Cope
                    </h3>
                    <div className="space-y-6">
                        <div className="flex gap-4">
                            <Activity className="w-5 h-5 text-cyan-500 flex-shrink-0" />
                            <div><h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">Quick Calm</h4><p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">When anxiety spikes, use a 2-minute breathing exercise (inhale 4, hold 4, exhale 6) or a grounding trick (name 5 things you see, 4 you can touch, 3 you hear).</p></div>
                        </div>
                        <div className="flex gap-4">
                            <Target className="w-5 h-5 text-cyan-500 flex-shrink-0" />
                            <div><h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">Short-term Coping</h4><p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">Break big tasks into tiny steps (e.g., “update one CV section — 20 minutes”), schedule one mock interview with a friend.</p></div>
                        </div>
                        <div className="flex gap-4">
                            <BrainCircuit className="w-5 h-5 text-cyan-500 flex-shrink-0" />
                            <div><h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">Build Resilience and Skills</h4><p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">Practice simple CBT reframing (notice a negative thought, challenge it, replace it with a realistic one) and complete short lessons on CVs, interviews, and classroom management.</p></div>
                        </div>
                        <div className="flex gap-4">
                            <Users className="w-5 h-5 text-cyan-500 flex-shrink-0" />
                            <div><h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">Personal Support</h4><p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">Use one-on-one career coaching for planning and referrals, and see a counselor if anxiety affects sleep or grades.</p></div>
                        </div>
                        <div className="flex gap-4">
                            <Users className="w-5 h-5 text-cyan-500 flex-shrink-0" />
                            <div><h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">Peer and Alumni Mentoring</h4><p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">Join a peer support group or get matched with an alumni mentor for real advice, networking, and emotional reassurance.</p></div>
                        </div>
                    </div>
                </div>

                <div className="bg-rose-50 dark:bg-rose-950/20 p-6 rounded-md border border-rose-200 dark:border-rose-900/30 text-center">
                    <AlertTriangle className="w-6 h-6 text-rose-600 dark:text-rose-400 mx-auto mb-3" />
                    <h4 className="text-xs font-bold text-rose-800 dark:text-rose-300 uppercase tracking-widest mb-2">If anxiety is strong</h4>
                    <p className="text-rose-700 dark:text-rose-400 text-sm font-medium">Seek professional help (campus counselor or mental-health services). If you feel hopeless or unsafe, contact emergency services immediately.</p>
                </div>
            </div>
        </div>
    );
}