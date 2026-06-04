import React, { useEffect } from 'react';
import { AssessmentProvider, useAssessment } from './context/AssessmentContext';
import LandingPage from './pages/LandingPage';
import AssessmentPage from './pages/AssessmentPage';
import ResultPage from './pages/ResultPage';
import { ArrowLeft, Compass } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MainLayout = () => {
  const { currentStep, results, setCurrentStep, resetAssessment } = useAssessment();

  // ---------------------------------------------------------
  // ENTERPRISE THEME ENFORCEMENT
  // ---------------------------------------------------------
  useEffect(() => {
    // Enforce dark mode globally for the telemetry aesthetic
    document.documentElement.classList.add('dark');
  }, []);

  const handleReset = () => {
    // Reset to Landing Page securely
    if (resetAssessment) {
      resetAssessment();
    } else {
      setCurrentStep(0);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-50 dark:bg-[#050811] text-slate-900 dark:text-slate-100 transition-colors duration-500 selection:bg-cyan-500/30">

      {/* --------------------------------------------------------- */}
      {/* ELEGANT GLOBAL HEADER */}
      {/* --------------------------------------------------------- */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-[#0f1629]/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800/80 transition-colors duration-500 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">

          {/* Brand / Logo - Upgraded Enterprise UI */}
          <button
            onClick={handleReset}
            className="flex items-center gap-3 group outline-none"
          >
            {/* Geometric Icon Container */}
            <div className="bg-cyan-500/10 p-1.5 rounded-sm border border-cyan-500/20 group-hover:border-cyan-500/50 group-hover:bg-cyan-500/20 transition-all duration-300">
              <Compass className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
            </div>

            {/* Sharp Serif Typography */}
            <span className="font-serif text-lg md:text-xl font-bold tracking-[0.25em] uppercase text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors duration-300">
              Career Paths
            </span>
          </button>

          {/* Navigation Controls */}
          <div className="flex items-center">
            <AnimatePresence mode="popLayout">
              {(currentStep > 0 || results) && (
                <motion.button
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  onClick={handleReset}
                  className="flex items-center gap-2 px-4 py-2 rounded-sm text-xs font-bold uppercase tracking-[0.15em] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="hidden md:block">Start Over</span>
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      {/* --------------------------------------------------------- */}
      {/* MAIN CONTENT ROUTER */}
      {/* --------------------------------------------------------- */}
      <main className="flex-grow flex flex-col items-center w-full">
        {currentStep === 0 && <LandingPage />}
        {currentStep > 0 && !results && (
          <div className="w-full flex-grow flex items-center justify-center p-4 md:p-8">
            <AssessmentPage />
          </div>
        )}
        {results && <ResultPage />}
      </main>

      {/* --------------------------------------------------------- */}
      {/* MINIMALIST FOOTER */}
      {/* --------------------------------------------------------- */}
      <footer className="border-t border-slate-200 dark:border-slate-800/50 bg-white/50 dark:bg-[#0a0f1c]/50 backdrop-blur-sm py-8 text-center transition-colors duration-500">
        <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 font-medium tracking-wide">
          Discover your perfect career path through AI-powered assessment.
        </p>
        <p className="text-[10px] md:text-xs text-slate-400 dark:text-slate-500 mt-3 tracking-[0.1em] uppercase">
          © 2026 Career Paths. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <AssessmentProvider>
      <MainLayout />
    </AssessmentProvider>
  );
}