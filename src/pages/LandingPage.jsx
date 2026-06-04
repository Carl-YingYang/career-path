/**
 * --------------------------------------------------------------------------
 * CAREER PATHS - ENTERPRISE LANDING PAGE (V3.0 - HIGH-FIDELITY ARCHITECTURE)
 * --------------------------------------------------------------------------
 * Designed with a premium minimalist aesthetic matching elite software platforms.
 * Employs absolute visual precision, robust image handling, and stable layout rules.
 * 
 * - Stable, hardware-accelerated CSS-only transforms on grid elements.
 * - Hardware-blended smooth opacity background loop for crossfading.
 * - Strict structural containment to eliminate unstyled layout shifts (CLS).
 * --------------------------------------------------------------------------
 */

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAssessment } from '../context/AssessmentContext';
import { ArrowRight, Sparkles } from 'lucide-react';

// --------------------------------------------------------------------------
// DETERMINISTIC ASSET MAPS (Strictly using pre-existing local image paths)
// --------------------------------------------------------------------------
import teacherImg from '../assets/teacher.png';
import lawyerImg from '../assets/lawyer.png';
import callCenterImg from '../assets/call_center.png';
import journalistImg from '../assets/journalist.png';
import tourGuideImg from '../assets/tour_guide.png';
import flightAttendantImg from '../assets/Flight_Attendant.png';
import pilotImg from '../assets/Pilot.png';
import newsAnchorImg from '../assets/News_Anchor.png';

// Premium Background Slider Images
import bg1 from '../assets/hero/bg-1.png';
import bg2 from '../assets/hero/bg-2.png';
import bg3 from '../assets/hero/bg-3.png';

const TARGET_CAREERS = [
    { name: "Teacher", image: teacherImg },
    { name: "Lawyer", image: lawyerImg },
    { name: "Call Center Agent", image: callCenterImg },
    { name: "Journalist", image: journalistImg },
    { name: "Tour Guide", image: tourGuideImg },
    { name: "Flight Attendant", image: flightAttendantImg },
    { name: "Pilot", image: pilotImg },
    { name: "News Anchor", image: newsAnchorImg },
];

// --------------------------------------------------------------------------
// ORCHESTRATED STRUCTURAL ANIMATION CONFIGURATIONS
// --------------------------------------------------------------------------
const textRevealVariants = {
    hidden: { opacity: 0, y: 15 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
};

// --------------------------------------------------------------------------
// COMPONENT: HERO BACKGROUND CROSSFADER
// --------------------------------------------------------------------------
/**
 * Drives a clean, continuous crossfade sequence across three image components.
 * Utilizes hardware-accelerated transition properties to prevent reflow stutter.
 */
const HeroBackgroundFader = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const images = [bg1, bg2, bg3];

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((current) => (current + 1) % images.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div className="absolute inset-0 overflow-hidden z-0 bg-slate-950">
            {images.map((img, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${index === activeIndex ? 'opacity-100' : 'opacity-0'
                        }`}
                >
                    <img
                        src={img}
                        alt=""
                        aria-hidden="true"
                        className="w-full h-full object-cover object-center scale-100 transform"
                    />
                </div>
            ))}
            {/* 
              High-Contrast Overlay: 
              Brings that professional cinematic vignette and dark blend style.
              Protects text contrast values completely across light and dark frames.
            */}
            <div className="absolute inset-0 bg-white/90 dark:bg-[#050811]/85 backdrop-blur-[1px] transition-colors duration-500" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-50 dark:to-[#050811]" />
        </div>
    );
};

// --------------------------------------------------------------------------
// COMPONENT: ULTRA-STABLE TAPPABLE CAREER BLOCK
// --------------------------------------------------------------------------
/**
 * Renders an optimized, stable interactive profile card.
 * Stripped of complex runtime inline styles to guarantee instantaneous rendering.
 */
const CareerCard = ({ career }) => {
    return (
        <div
            onClick={() => console.log(`${career.name} context selected`)}
            className="group relative h-40 md:h-52 w-full cursor-pointer overflow-hidden rounded-sm 
                       bg-slate-200 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 
                       shadow-sm transition-all duration-300"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                }
            }}
        >
            {/* 
              Optimized Image Delivery Layer:
              CSS transition ensures zero lag or refresh crashes on web browsers.
            */}
            <img
                src={career.image}
                alt={career.name}
                className="absolute inset-0 w-full h-full object-cover grayscale opacity-50 dark:opacity-30
                           group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-[1.04] 
                           transition-all duration-500 ease-out"
                loading="lazy"
            />

            {/* Premium Linear Matte Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent 
                            opacity-85 group-hover:opacity-90 transition-opacity duration-300" />

            {/* Center-Aligned Interactive Text Anchor */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 
                            translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                <h4 className="font-serif text-lg md:text-xl text-white font-medium tracking-wide text-center selection:bg-transparent">
                    {career.name}
                </h4>

                {/* Clean geometric indicator line that reveals on hover */}
                <div className="w-0 h-[1.5px] bg-cyan-400 mt-2 group-hover:w-8 transition-all duration-500 ease-out" />
            </div>
        </div>
    );
};

// --------------------------------------------------------------------------
// MAIN PLATFORM COMPONENT: LANDING PAGE
// --------------------------------------------------------------------------
export default function LandingPage() {
    const { setCurrentStep } = useAssessment();

    return (
        <div className="relative w-full bg-transparent flex flex-col overflow-hidden">

            {/* Core Immersive Crossfading Imagery Layer */}
            <HeroBackgroundFader />

            {/* --------------------------------------------------------------------------
                HERO VIEWPORT CONTEXT (Elevated with tighter structural gaps)
            -------------------------------------------------------------------------- */}
            <section className="relative z-10 flex flex-col items-center justify-center pt-20 pb-12 px-6 md:px-12 max-w-5xl mx-auto w-full">
                <div className="text-center w-full mx-auto flex flex-col items-center">

                    {/* Minimalist Micro-Badge Component */}
                    <motion.div
                        variants={textRevealVariants}
                        initial="hidden"
                        animate="show"
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 
                                   bg-slate-900/5 dark:bg-white/5 text-slate-800 dark:text-slate-300 
                                   border border-slate-900/10 dark:border-white/10 backdrop-blur-md select-none"
                    >
                        Discover Your Future
                    </motion.div>

                    {/* Elite Headline Typography Container */}
                    <motion.div
                        variants={textRevealVariants}
                        initial="hidden"
                        animate="show"
                        className="w-full"
                    >
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight leading-[1.15]">
                            Find the career path <br className="hidden sm:block" />
                            <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 dark:from-white dark:via-slate-200 dark:to-slate-400 bg-clip-text text-transparent">
                                that matches you.
                            </span>
                        </h1>
                    </motion.div>

                    {/* Platform Informative Brief */}
                    <motion.p
                        variants={textRevealVariants}
                        initial="hidden"
                        animate="show"
                        className="text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed font-light"
                    >
                        No complicated tests. Just a simple, AI-analyzed assessment to help you discover where your true strengths lie.
                    </motion.p>

                    {/* Refactored High-Contrast Executive CTA */}
                    <motion.div
                        variants={textRevealVariants}
                        initial="hidden"
                        animate="show"
                    >
                        <button
                            onClick={() => setCurrentStep(1)}
                            className="group relative inline-flex items-center gap-3 px-10 py-4 rounded-sm
                                       bg-slate-900 dark:bg-white text-white dark:text-slate-950 
                                       hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors duration-300 
                                       text-xs font-bold tracking-[0.2em] uppercase overflow-hidden outline-none 
                                       border border-slate-900 dark:border-white shadow-md"
                        >
                            <span>Start Assessment</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* --------------------------------------------------------------------------
                CLEAN UI SEPARATOR (New!)
            -------------------------------------------------------------------------- */}
            <div className="relative z-10 w-full max-w-4xl mx-auto px-8 mb-10">
                <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-700 to-transparent opacity-60" />
            </div>


            {/* --------------------------------------------------------------------------
                EXPLORATION DISCIPLINES SECTION (Compressed Structural Layout)
            -------------------------------------------------------------------------- */}
            <section className="relative z-10 w-full pb-16 px-6 md:px-12 max-w-7xl mx-auto">

                {/* Structural Section Header Label */}
                <div className="mb-8 text-center">
                    <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.25em]">
                        Explore These Careers
                    </h3>
                    <div className="w-8 h-[1px] bg-slate-300 dark:bg-slate-800 mx-auto mt-3" />
                </div>

                {/* Highly Stable Tappable Flex/Grid Grid System */}
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
                    {TARGET_CAREERS.map((career) => (
                        <CareerCard key={career.name} career={career} />
                    ))}
                </div>

            </section>
        </div>
    );
}