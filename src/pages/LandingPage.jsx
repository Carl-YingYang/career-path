/**
 * --------------------------------------------------------------------------
 * CAREER PATHS - ENTERPRISE LANDING PAGE (V4.0 - HIGH-FIDELITY ARCHITECTURE)
 * --------------------------------------------------------------------------
 * Designed with a premium minimalist aesthetic matching elite software platforms.
 * Employs absolute visual precision, robust image handling, and stable layout rules.
 * 
 * - Stable, hardware-accelerated CSS-only transforms on grid elements.
 * - Hardware-blended smooth opacity background loop for crossfading.
 * - Strict structural containment to eliminate unstyled layout shifts (CLS).
 * - Expanded 35-career matrix with dynamic placeholder fallbacks.
 * --------------------------------------------------------------------------
 */

import React, { useEffect, useState, useRef } from 'react';
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
import newsAnchorImg from '../assets/News_Anchor.png';

// Premium Background Slider Images
import bg1 from '../assets/hero/bg-1.png';
import bg2 from '../assets/hero/bg-2.png';
import bg3 from '../assets/hero/bg-3.png';

// Extra Career Images
import publicInfoOfficerImg from '../assets/extra_images/Public_Information_Officer.png';
import adminOfficerImg from '../assets/extra_images/Administrative_Officer.png';
import civilServiceImg from '../assets/extra_images/Civil_Service_Professional.png';
import trainingOfficerImg from '../assets/extra_images/Training_Officer.png';
import communityDevImg from '../assets/extra_images/Community_Development_Worker.png';
import researchAssistantImg from '../assets/extra_images/Research_Assistant.png';
import languageSpecialistImg from '../assets/extra_images/Language_Specialist.png';
import linguisticsResearcherImg from '../assets/extra_images/Linguistics_Researcher.png';
import translatorImg from '../assets/extra_images/Translator.png';
import interpreterImg from '../assets/extra_images/Interpreter.png';
import hrOfficerImg from '../assets/extra_images/Human_Resources_Officer.png';
import trainingDevSpecialistImg from '../assets/extra_images/TrainingandDevelopmentSpecialist.png';
import corporateTrainerImg from '../assets/extra_images/CorporateTrainer.png';
import communicationsOfficerImg from '../assets/extra_images/CommunicationsOfficer.png';
import prOfficerImg from '../assets/extra_images/PublicRelationsOfficer.png';
import customerRelationsImg from '../assets/extra_images/CustomerRelationsSpecialist.png';
import recruitmentSpecialistImg from '../assets/extra_images/Human_Resources_Officer.png';
import academicCoordinatorImg from '../assets/extra_images/SchoolAdministrator.png';
import curriculumDeveloperImg from '../assets/extra_images/CurriculumDeveloper.png';
import learningMaterialsImg from '../assets/extra_images/LearningMaterialsWriter.png';
import educationalConsultantImg from '../assets/extra_images/EducationalConsultant.png';
import schoolAdminImg from '../assets/extra_images/SchoolAdministrator.png';
import socialMediaManagerImg from '../assets/extra_images/SocialMediaManager.png';
import digitalContentImg from '../assets/extra_images/DigitalContentCreator.png';
import seoContentWriterImg from '../assets/extra_images/SEOContentWriter.png';
import marketingAssistantImg from '../assets/extra_images/MarketingAssistant.png';
import brandCommImg from '../assets/extra_images/BrandCommunicationsSpecialist.png';
import communityManagerImg from '../assets/extra_images/CommunityManager.png';

const TARGET_CAREERS = [
    { name: "Teacher", image: teacherImg, description: "Shape minds and inspire the next generation through engaging education." },
    { name: "Lawyer", image: lawyerImg, description: "Advocate for justice and provide expert legal counsel to clients." },
    { name: "Call Center Agent", image: callCenterImg, description: "Deliver exceptional customer service with professionalism and empathy." },
    { name: "Journalist", image: journalistImg, description: "Investigate stories and communicate truth to the world." },
    { name: "Tour Guide", image: tourGuideImg, description: "Share cultural knowledge and create unforgettable travel experiences." },
    { name: "News Anchor", image: newsAnchorImg, description: "Present news with clarity and authority to diverse audiences." },
    { name: "Public Information Officer", image: publicInfoOfficerImg, description: "Manages public communications by preparing announcements, press releases, and informational materials to keep the public informed." },
    { name: "Administrative Officer", image: adminOfficerImg, description: "Performs administrative and organizational tasks, including record management, coordination of office activities, and support for daily operations." },
    { name: "Civil Service Professional", image: civilServiceImg, description: "Provides public services, implements government policies, and performs administrative, technical, or professional duties within government agencies." },
    { name: "Training Officer", image: trainingOfficerImg, description: "Plans, organizes, and conducts training programs to enhance the knowledge, skills, and professional development of employees." },
    { name: "Community Development Worker", image: communityDevImg, description: "Works with communities to identify needs, implement programs, and promote social, educational, and economic development initiatives." },
    { name: "Research Assistant", image: researchAssistantImg, description: "Assists in collecting, organizing, analyzing, and interpreting data while supporting researchers in academic, educational, or professional studies." },
    { name: "Language Specialist", image: languageSpecialistImg, description: "Applies expertise in language, communication, and linguistics to develop, evaluate, and improve language-related programs and materials." },
    { name: "Linguistics Researcher", image: linguisticsResearcherImg, description: "Conducts studies on language structure, use, acquisition, and development to contribute to linguistic knowledge and research." },
    { name: "Translator", image: translatorImg, description: "Converts written texts from one language to another while preserving the original meaning, tone, and context." },
    { name: "Interpreter", image: interpreterImg, description: "Facilitates spoken communication between individuals who speak different languages by accurately translating conversations in real time." },
    { name: "Human Resources Officer", image: hrOfficerImg, description: "Manages employee recruitment, records, benefits, and workplace policies while supporting organizational and staff development." },
    { name: "Training and Development Specialist", image: trainingDevSpecialistImg, description: "Designs and implements training programs that enhance employees' skills, knowledge, and job performance." },
    { name: "Corporate Trainer", image: corporateTrainerImg, description: "Conducts workshops, seminars, and training sessions to help employees develop professional competencies and workplace skills." },
    { name: "Communications Officer", image: communicationsOfficerImg, description: "Develops and delivers internal and external communications to ensure clear, consistent, and effective organizational messaging." },
    { name: "Public Relations Officer", image: prOfficerImg, description: "Maintains a positive public image for an organization by managing media relations, public communications, and promotional activities." },
    { name: "Customer Relations Specialist", image: customerRelationsImg, description: "Builds and maintains positive relationships with customers by addressing concerns, providing support, and improving customer satisfaction." },
    { name: "Recruitment Specialist", image: recruitmentSpecialistImg, description: "Identifies, attracts, and evaluates job candidates while managing hiring processes to meet organizational staffing needs." },
    { name: "Academic Coordinator", image: academicCoordinatorImg, description: "Oversees academic programs, supports teachers, and helps ensure the effective implementation of educational policies and standards." },
    { name: "Curriculum Developer", image: curriculumDeveloperImg, description: "Designs, evaluates, and improves educational programs, learning objectives, and instructional materials to meet academic requirements." },
    { name: "Learning Materials Writer", image: learningMaterialsImg, description: "Creates educational resources such as textbooks, modules, worksheets, and instructional guides for teaching and learning purposes." },
    { name: "Educational Consultant", image: educationalConsultantImg, description: "Provides professional advice and recommendations to schools, teachers, or organizations on educational practices and program development." },
    { name: "School Administrator", image: schoolAdminImg, description: "Manages school operations, supervises staff, implements policies, and ensures the effective delivery of educational services." },
    { name: "Social Media Manager", image: socialMediaManagerImg, description: "Plans, creates, and manages content across social media platforms to increase audience engagement and strengthen an organization's online presence." },
    { name: "Digital Content Creator", image: digitalContentImg, description: "Produces engaging digital content such as articles, videos, graphics, and social media posts for online audiences." },
    { name: "SEO Content Writer", image: seoContentWriterImg, description: "Writes website content optimized for search engines to improve online visibility and attract targeted audiences." },
    { name: "Marketing Assistant", image: marketingAssistantImg, description: "Supports marketing activities by assisting with campaigns, market research, content creation, and promotional efforts." },
    { name: "Brand Communications Specialist", image: brandCommImg, description: "Develops and delivers messages that promote a positive brand image and maintain effective communication with target audiences." },
    { name: "Community Manager", image: communityManagerImg, description: "Builds and maintains relationships with online communities by engaging with members, responding to inquiries, and fostering audience interaction." }
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
// COMPONENT: ENHANCED CAREER CARD WITH DESCRIPTION
// --------------------------------------------------------------------------
const EnhancedCareerCard = ({ career, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onClick={() => console.log(`${career.name} selected`)}
            className="group relative flex-shrink-0 w-72 h-96 cursor-pointer overflow-hidden rounded-lg 
                       bg-slate-900 dark:bg-slate-900 border border-slate-700/50 dark:border-slate-800 
                       shadow-lg hover:shadow-2xl transition-all duration-500 hover:border-cyan-500/50"
            role="button"
            tabIndex={0}
        >
            {/* Background Image Layer */}
            <img
                src={career.image}
                alt={career.name}
                className="absolute inset-0 w-full h-full object-cover grayscale opacity-40 dark:opacity-30
                           group-hover:grayscale-0 group-hover:opacity-80 group-hover:scale-110 
                           transition-all duration-700 ease-out"
                loading="lazy"
            />

            {/* Premium Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent 
                            opacity-90 group-hover:opacity-95 transition-opacity duration-500" />

            {/* Content Container */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                {/* Title */}
                <h4 className="font-serif text-2xl font-bold mb-3 tracking-tight group-hover:text-cyan-400 
                             transition-colors duration-300">
                    {career.name}
                </h4>

                {/* Description */}
                <p className="text-sm text-slate-300 leading-relaxed mb-4 font-medium opacity-0 
                            group-hover:opacity-100 transition-opacity duration-500 delay-75">
                    {career.description}
                </p>

                {/* Interactive Indicator */}
                <div className="flex items-center gap-2 text-cyan-400 opacity-0 group-hover:opacity-100 
                              transition-all duration-500 delay-100">
                    <span className="text-xs font-bold uppercase tracking-widest">Learn More</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
            </div>
        </motion.div>
    );
};

// --------------------------------------------------------------------------
// COMPONENT: AUTO-SCROLLING CAREER CAROUSEL (Mobile-Friendly)
// --------------------------------------------------------------------------
const AutoScrollCarousel = ({ careers }) => {
    const scrollContainerRef = useRef(null);
    const [isAutoScroll, setIsAutoScroll] = useState(true);

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container || !isAutoScroll) return;

        const scrollAmount = 2; // pixels to scroll per frame
        const scrollInterval = 50; // milliseconds between frames

        const interval = setInterval(() => {
            if (container) {
                container.scrollLeft += scrollAmount;

                // Loop back to start when reaching end
                if (
                    container.scrollLeft >=
                    container.scrollWidth - container.clientWidth - 10
                ) {
                    container.scrollLeft = 0;
                }
            }
        }, scrollInterval);

        return () => clearInterval(interval);
    }, [isAutoScroll]);

    const handleMouseEnter = () => setIsAutoScroll(false);
    const handleMouseLeave = () => setIsAutoScroll(true);
    const handleTouchStart = () => setIsAutoScroll(false);
    const handleTouchEnd = () => setIsAutoScroll(true);

    return (
        <div
            ref={scrollContainerRef}
            className="relative w-full overflow-x-auto overflow-y-hidden scrollbar-hide"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            <div className="flex gap-6 pb-4 px-2 min-w-min">
                {careers.map((career, index) => (
                    <EnhancedCareerCard key={`${career.name}-${index}`} career={career} index={index} />
                ))}
                {/* Duplicate for seamless loop */}
                {careers.map((career, index) => (
                    <EnhancedCareerCard key={`${career.name}-duplicate-${index}`} career={career} index={index} />
                ))}
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
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-6 
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
                            <span className="bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-500 bg-clip-text text-transparent">
                                that matches you.
                            </span>
                        </h1>
                    </motion.div>

                    {/* Platform Informative Brief */}
                    <motion.p
                        variants={textRevealVariants}
                        initial="hidden"
                        animate="show"
                        className="text-sm md:text-base lg:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed font-medium"
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
                CLEAN UI SEPARATOR
            -------------------------------------------------------------------------- */}
            <div className="relative z-10 w-full max-w-4xl mx-auto px-8 mb-10">
                <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-700 to-transparent opacity-60" />
            </div>

            {/* --------------------------------------------------------------------------
                HORIZONTAL SCROLLING CAREER CAROUSEL (Clean UI, Performance Optimized)
            -------------------------------------------------------------------------- */}
            <section className="relative z-10 w-full pb-16 px-6 md:px-12 max-w-7xl mx-auto">

                {/* Section Header */}
                <div className="mb-12 text-center">
                    <h3 className="text-[10px] md:text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-[0.25em] mb-2">
                        Explore These Careers
                    </h3>
                    <div className="w-8 h-[1px] bg-cyan-500/50 dark:bg-cyan-500/50 mx-auto" />
                </div>

                {/* Auto-Scrolling Carousel */}
                <AutoScrollCarousel careers={TARGET_CAREERS} />

                {/* Subtle scroll indicator */}
                <p className="text-center text-xs text-slate-500 dark:text-slate-500 mt-6 font-medium">
                    34 Career paths • Auto-scrolling • Scroll or tap to interact →
                </p>
            </section>
        </div>
    );
}