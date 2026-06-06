/**
 * --------------------------------------------------------------------------
 * CAREER PATHS - ABOUT MODULE
 * --------------------------------------------------------------------------
 * Enterprise-grade typographic layout for the hub's mission statement.
 * Features elegant text formatting, clear visual hierarchy, and smooth entries.
 * --------------------------------------------------------------------------
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Info, BookOpen, Briefcase, ShieldAlert, HeartHandshake } from 'lucide-react';

export default function AboutPage() {
    return (
        <div className="w-full max-w-3xl mx-auto py-12 px-4 md:px-8">

            {/* --------------------------------------------------------------------------
                HEADER SECTION
            -------------------------------------------------------------------------- */}
            <div className="mb-12 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 rounded-sm text-[10px] font-bold uppercase tracking-[0.2em] border border-cyan-500/20 mb-6"
                >
                    <Info className="w-3.5 h-3.5" /> Project Overview
                </motion.div>
                <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-3xl md:text-4xl font-serif font-bold text-slate-900 dark:text-white tracking-tight mb-4"
                >
                    About the Hub
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-slate-500 dark:text-slate-400 text-sm md:text-base leading-relaxed max-w-2xl mx-auto"
                >
                    From Page to Profession is a career development hub inspired by the journey of English majors as they move from the academic world into the realities of professional life.
                </motion.p>
            </div>

            {/* --------------------------------------------------------------------------
                CONTENT BLOCKS
            -------------------------------------------------------------------------- */}
            <div className="space-y-6">

                {/* Block 1: The Metaphor */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white dark:bg-[#0f1629] p-8 rounded-md border border-slate-200 dark:border-slate-800/80 shadow-lg relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 p-8 opacity-5 dark:opacity-10 pointer-events-none">
                        <BookOpen className="w-32 h-32" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-widest flex items-center gap-3 mb-4">
                        <Briefcase className="w-4 h-4 text-cyan-600 dark:text-cyan-400" /> The Metaphor
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-loose relative z-10">
                        The title captures the central metaphor of this initiative: the <strong className="text-slate-900 dark:text-slate-200 font-semibold">“page”</strong> symbolizes the classroom experiences, academic texts, and curricular training that shape students’ identities during college, while the <strong className="text-slate-900 dark:text-slate-200 font-semibold">“profession”</strong> represents the unpredictable world of work that awaits after graduation.
                    </p>
                </motion.div>

                {/* Block 2: The Challenge */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white dark:bg-[#0f1629] p-8 rounded-md border border-slate-200 dark:border-slate-800/80 shadow-lg relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 p-8 opacity-5 dark:opacity-10 pointer-events-none">
                        <ShieldAlert className="w-32 h-32" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-widest flex items-center gap-3 mb-4">
                        <ShieldAlert className="w-4 h-4 text-rose-600 dark:text-rose-400" /> The Challenge
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-loose relative z-10 mb-4">
                        This hub was created in response to the growing challenges faced by students—academic stress, financial pressures, and uncertainty about future careers—that often lead to career anxiety. Research shows that mismatches between university training and labor market demands, limited internship opportunities, and lack of career guidance intensify these struggles.
                    </p>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-loose relative z-10">
                        In the Philippine context, these issues are especially pressing, with many students feeling unprepared for real-world roles in teaching, communication, and beyond.
                    </p>
                </motion.div>

                {/* Block 3: The Mission */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-slate-900 dark:bg-white p-8 rounded-md border border-slate-800 dark:border-slate-200 shadow-xl relative overflow-hidden"
                >
                    <h3 className="text-sm font-bold text-white dark:text-slate-900 uppercase tracking-widest flex items-center gap-3 mb-4 relative z-10">
                        <HeartHandshake className="w-4 h-4 text-cyan-400 dark:text-cyan-600" /> Our Mission
                    </h3>
                    <p className="text-slate-300 dark:text-slate-700 text-sm leading-loose relative z-10 font-medium">
                        By providing psychosocial support, career orientation, and practical resources, <span className="text-white dark:text-slate-900 font-bold">From Page to Profession</span> aims to strengthen career preparedness, promote mental well-being, and empower students to confidently transition from academic life to professional success.
                    </p>
                </motion.div>

            </div>
        </div>
    );
}