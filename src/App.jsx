/**
 * --------------------------------------------------------------------------
 * FROM PAGE TO PROFESSION - ENTERPRISE MAIN LAYOUT
 * --------------------------------------------------------------------------
 * Root application wrapper. Manages global theming, high-level routing,
 * and the primary navigation interface for the English Career Hub.
 * --------------------------------------------------------------------------
 */

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Compass, BookOpen, HeartPulse, Info, LayoutGrid } from 'lucide-react';

// Page Components
import LandingPage from './pages/LandingPage';
import AssessmentPage from './pages/AssessmentPage';
import ResultPage from './pages/ResultPage';
import SelfAwareness from './components/SelfAwareness';
import AboutPage from './pages/AboutPage';
import CommunicationSkills from './components/CommunicationSkills';
import { AssessmentProvider, useAssessment } from './context/AssessmentContext';

// --------------------------------------------------------------------------
// MAIN LAYOUT ORCHESTRATOR
// --------------------------------------------------------------------------
const MainLayout = () => {
  const { currentStep, results, setCurrentStep, resetAssessment } = useAssessment();

  const [activeView, setActiveView] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const handleReset = () => {
    if (resetAssessment) resetAssessment();
    else setCurrentStep(0);
    setActiveView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateTo = (view) => {
    setActiveView(view);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-50 dark:bg-[#050811] text-slate-900 dark:text-slate-100 transition-colors duration-500 selection:bg-cyan-500/30">

      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-[#0f1629]/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800/80 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <button onClick={handleReset} className="flex items-center gap-3 group outline-none">
            <div className="bg-cyan-500/10 p-1.5 rounded-sm border border-cyan-500/20 group-hover:border-cyan-500/50 group-hover:bg-cyan-500/20 transition-all duration-300">
              <Compass className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
            </div>
            <div className="flex flex-col items-start">
              <span className="font-serif text-sm md:text-lg font-bold tracking-[0.15em] uppercase text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors duration-300 leading-none">
                From Page To Profession
              </span>
              <span className="text-[8px] md:text-[10px] text-slate-500 tracking-widest uppercase font-medium mt-1">
                An English Career Hub
              </span>
            </div>
          </button>

          <nav className="hidden lg:flex items-center gap-8">
            <button onClick={handleReset} className={`text-xs font-bold uppercase tracking-widest transition-all px-3 py-2 rounded-md ${activeView === 'home' ? 'text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-500/30' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50 border border-transparent'}`}>Home</button>
            <button onClick={() => navigateTo('skills')} className={`text-xs font-bold uppercase tracking-widest transition-all px-3 py-2 rounded-md ${activeView === 'skills' ? 'text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-500/30' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50 border border-transparent'}`}>Build Your Skills</button>
            <button onClick={() => navigateTo('guidance')} className={`text-xs font-bold uppercase tracking-widest transition-all px-3 py-2 rounded-md ${activeView === 'guidance' ? 'text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-500/30' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50 border border-transparent'}`}>Guidance & Support</button>
            <button onClick={() => navigateTo('about')} className={`text-xs font-bold uppercase tracking-widest transition-all px-3 py-2 rounded-md ${activeView === 'about' ? 'text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-500/30' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50 border border-transparent'}`}>About</button>
          </nav>

          <div className="flex items-center gap-4">
            <AnimatePresence mode="popLayout">
              {(activeView === 'home' && (currentStep > 0 || results)) && (
                <motion.button
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  onClick={handleReset}
                  className="hidden md:flex items-center gap-2 px-4 py-2 rounded-sm text-xs font-bold uppercase tracking-[0.15em] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                >
                  <ArrowLeft className="w-4 h-4" /> Start Over
                </motion.button>
              )}
            </AnimatePresence>
            <button className="lg:hidden p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <LayoutGrid className="w-5 h-5" />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.nav initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="lg:hidden border-t border-slate-800 bg-[#0f1629] overflow-hidden">
              <div className="flex flex-col px-6 py-4 gap-2">
                <button onClick={handleReset} className={`text-left text-xs font-bold uppercase tracking-widest flex items-center gap-3 px-3 py-2 rounded-md transition-all ${activeView === 'home' ? 'text-cyan-600 bg-cyan-50 border border-cyan-200' : 'text-slate-600 hover:bg-slate-100 border border-transparent'}`}><Compass className="w-4 h-4" /> Home</button>
                <button onClick={() => navigateTo('skills')} className={`text-left text-xs font-bold uppercase tracking-widest flex items-center gap-3 px-3 py-2 rounded-md transition-all ${activeView === 'skills' ? 'text-cyan-600 bg-cyan-50 border border-cyan-200' : 'text-slate-600 hover:bg-slate-100 border border-transparent'}`}><BookOpen className="w-4 h-4" /> Build Your Skills</button>
                <button onClick={() => navigateTo('guidance')} className={`text-left text-xs font-bold uppercase tracking-widest flex items-center gap-3 px-3 py-2 rounded-md transition-all ${activeView === 'guidance' ? 'text-cyan-600 bg-cyan-50 border border-cyan-200' : 'text-slate-600 hover:bg-slate-100 border border-transparent'}`}><HeartPulse className="w-4 h-4" /> Guidance & Support</button>
                <button onClick={() => navigateTo('about')} className={`text-left text-xs font-bold uppercase tracking-widest flex items-center gap-3 px-3 py-2 rounded-md transition-all ${activeView === 'about' ? 'text-cyan-600 bg-cyan-50 border border-cyan-200' : 'text-slate-600 hover:bg-slate-100 border border-transparent'}`}><Info className="w-4 h-4" /> About</button>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      {/* CONTENT */}
      <main className="flex-grow flex flex-col items-center w-full">
        {activeView === 'home' && (
          <>
            {currentStep === 0 && <LandingPage />}
            {currentStep > 0 && !results && (
              <div className="w-full flex-grow flex items-center justify-center p-4 md:p-8">
                <AssessmentPage />
              </div>
            )}
            {results && <ResultPage />}
          </>
        )}
        {activeView === 'skills' && <div className="w-full flex-grow py-12 px-4 md:px-8"><SelfAwareness /></div>}
        {activeView === 'guidance' && <div className="w-full flex-grow py-12 px-4 md:px-8 flex items-center justify-center"><CommunicationSkills /></div>}
        {activeView === 'about' && <AboutPage />}
      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 dark:border-slate-800/50 bg-white/50 dark:bg-[#0a0f1c]/50 backdrop-blur-sm py-8 text-center">
        <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 font-medium tracking-wide">
          From Page To Profession: Discover your perfect career path through AI.
        </p>
        <p className="text-[10px] md:text-xs text-slate-400 dark:text-slate-500 mt-3 tracking-[0.1em] uppercase">
          © 2026 English Career Hub. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

// --------------------------------------------------------------------------
// ROOT APP EXPORT
// --------------------------------------------------------------------------
export default function App() {
  return (
    <AssessmentProvider>
      <MainLayout />
    </AssessmentProvider>
  );
}
