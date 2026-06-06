import React from 'react';
import { HeartPulse, BrainCircuit, Activity, Users, ShieldCheck, AlertTriangle, Target } from 'lucide-react';

export default function Guidance() {
    return (
        <div className="bg-white dark:bg-[#0f1629] p-6 rounded-md border border-slate-200 dark:border-slate-800/80 shadow-xl h-full flex flex-col">
            <div className="mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-rose-500/10 text-rose-600 dark:text-rose-400 rounded-sm text-[10px] font-bold uppercase tracking-[0.2em] mb-3">
                    <HeartPulse className="w-3 h-3" /> Wellness Center
                </div>
                <h2 className="text-lg font-serif font-bold text-slate-900 dark:text-white">Guidance and Support</h2>
            </div>

            <div className="flex-grow space-y-6">
                <div>
                    <h3 className="text-[11px] font-bold text-slate-800 dark:text-slate-200 uppercase tracking-widest flex items-center gap-2 mb-2">
                        <BrainCircuit className="w-3.5 h-3.5 text-rose-500" /> Why do I feel anxious?
                    </h3>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed bg-slate-50 dark:bg-[#0a0f1c] p-3 rounded-sm border border-slate-100 dark:border-slate-800">
                        You feel anxious because your mind is responding to stress and uncertainty about what the future holds, and evidence shows that is normal among college students. Academic stress, financial concerns, and uncertainty about your future career are the most common causes of career anxiety, and more than 60% of students with anxiety symptoms report they have difficulty finding support because of stigma or lack of resources.
                    </p>
                </div>

                <div>
                    <h3 className="text-[11px] font-bold text-slate-800 dark:text-slate-200 uppercase tracking-widest flex items-center gap-2 mb-3">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> How to Cope
                    </h3>
                    <div className="space-y-4">
                        <div className="flex gap-3">
                            <Activity className="w-4 h-4 text-cyan-500 flex-shrink-0" />
                            <div><h4 className="text-[10px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">Quick Calm</h4><p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">When anxiety spikes, use a 2-minute breathing exercise (inhale 4, hold 4, exhale 6) or a grounding trick (name 5 things you see, 4 you can touch, 3 you hear).</p></div>
                        </div>
                        <div className="flex gap-3">
                            <Target className="w-4 h-4 text-cyan-500 flex-shrink-0" />
                            <div><h4 className="text-[10px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">Short-term Coping</h4><p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">Break big tasks into tiny steps (e.g., “update one CV section — 20 minutes”), schedule one mock interview with a friend.</p></div>
                        </div>
                        <div className="flex gap-3">
                            <BrainCircuit className="w-4 h-4 text-cyan-500 flex-shrink-0" />
                            <div><h4 className="text-[10px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">Build Resilience</h4><p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">Practice simple CBT reframing and complete short lessons on CVs, interviews, and classroom management.</p></div>
                        </div>
                        <div className="flex gap-3">
                            <Users className="w-4 h-4 text-cyan-500 flex-shrink-0" />
                            <div><h4 className="text-[10px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">Support Systems</h4><p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">Use one-on-one career coaching or join a peer support group / alumni mentoring for real advice and emotional reassurance.</p></div>
                        </div>
                    </div>
                </div>

                <div className="bg-rose-50 dark:bg-rose-950/20 p-4 rounded-sm border border-rose-200 dark:border-rose-900/30 text-center mt-6">
                    <AlertTriangle className="w-5 h-5 text-rose-600 dark:text-rose-400 mx-auto mb-2" />
                    <h4 className="text-[10px] font-bold text-rose-800 dark:text-rose-300 uppercase tracking-widest mb-1">If anxiety is strong</h4>
                    <p className="text-[10px] text-rose-700 dark:text-rose-400 font-medium">Seek professional help (campus counselor or mental-health services). If you feel hopeless or unsafe, contact emergency services immediately.</p>
                </div>
            </div>
        </div>
    );
}