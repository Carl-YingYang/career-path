/**
 * --------------------------------------------------------------------------
 * CAREER PATHS - ENTERPRISE STATE MANAGEMENT
 * --------------------------------------------------------------------------
 * Centralized telemetry context provider. Manages user session data,
 * quantitative assessment inputs, qualitative context notes, and final AI results.
 * --------------------------------------------------------------------------
 */

import React, { createContext, useState, useContext } from 'react';

// Initialize the global assessment context
const AssessmentContext = createContext();

/**
 * Custom hook to securely access the Assessment Context.
 * @returns {Object} Global session state and mutator functions.
 */
export const useAssessment = () => useContext(AssessmentContext);

/**
 * Global Context Provider component. Wraps the main application router 
 * to provide centralized state distribution.
 * 
 * @param {Object} props - React children components.
 */
export const AssessmentProvider = ({ children }) => {
    // --------------------------------------------------------------------------
    // SESSION STATE
    // --------------------------------------------------------------------------

    // Global User Identity
    const [userName, setUserName] = useState('');

    // Quantitative Telemetry (Numeric heuristic inputs: 1.0, 0.5, 0.0)
    const [answers, setAnswers] = useState({});

    // Qualitative Telemetry (User-provided context strings for AI analysis)
    const [notes, setNotes] = useState({});

    // Engine Routing Pointer (0: Landing, 1: Identity, 2+: Questionnaire)
    const [currentStep, setCurrentStep] = useState(0);

    // Final Compiled Analysis Results (Top Match & Alternatives)
    const [results, setResults] = useState(null);

    // --------------------------------------------------------------------------
    // SYSTEM ACTIONS
    // --------------------------------------------------------------------------

    /**
     * Purges the current session data and resets the telemetry engine 
     * back to the initial landing state.
     */
    const resetAssessment = () => {
        setUserName('');
        setAnswers({});
        setNotes({}); // Ensure AI context notes are also purged
        setCurrentStep(0);
        setResults(null);
    };

    return (
        <AssessmentContext.Provider value={{
            // Identity
            userName, setUserName,
            // Telemetry Data
            answers, setAnswers,
            notes, setNotes,
            // Engine State
            currentStep, setCurrentStep,
            results, setResults,
            // Actions
            resetAssessment
        }}>
            {children}
        </AssessmentContext.Provider>
    );
};