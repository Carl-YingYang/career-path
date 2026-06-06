import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainCircuit, Mic, Target, Compass } from 'lucide-react';

// Import the 4 separate module components
import SelfAwareness from '../components/SelfAwareness';
import InterviewPractice from '../components/InterviewPractice'; // Tiyaking ito ang pangalan ng file mo para sa interview
import GoalSetting from '../components/GoalSetting';
import Adaptability from '../components/Adaptability';

export default function SkillsPage() {
    const [activeTab, setActiveTab] = useState('awareness');

    // Tab Configuration
    const tabs = [
        { id: 'awareness', label: 'Self Awareness', icon: BrainCircuit },
        { id: 'communication', label: 'Communication', icon: Mic },
        { id: 'goals', label: 'Goal Setting', icon: Target },
        { id: 'adaptability', label: 'Adaptability', icon: Compass }
    ];

    return (
        <div className="w-full max-w-4xl mx-auto py-12 px-4 md:px-8">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-serif font-bold text-slate-900 dark:text-white mb-4">Build Your Skills</h1>
                <p className="text-slate-500 dark:text-slate-400">Select a module below to continue your professional development.</p>
            </div>

            {/* Premium Tab Navigation System */}
            <div className="flex flex-wrap justify-center gap-2 mb-10 bg-white dark:bg-[#0f1629] p-2 rounded-lg border border-slate-200 dark:border-slate-800/80 shadow-sm max-w-3xl mx-auto">
                {tabs.map(tab => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-4 py-3 rounded-md text-[10px] sm:text-xs font-bold uppercase tracking-widest transition-all ${isActive
                                    ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 shadow-sm border border-cyan-200 dark:border-cyan-500/20'
                                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50 border border-transparent'
                                }`}
                        >
                            <Icon className="w-4 h-4" />
                            <span className="hidden sm:block">{tab.label}</span>
                        </button>
                    );
                })}
            </div>

            {/* Active Content Area with Smooth Fade Transition */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                >
                    {activeTab === 'awareness' && <SelfAwareness />}
                    {activeTab === 'communication' && <InterviewPractice />}
                    {activeTab === 'goals' && <GoalSetting />}
                    {activeTab === 'adaptability' && <Adaptability />}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}