import { jsPDF } from "jspdf";

export const generatePDF = (userName, results, aiData) => {
    // Initialize A4 PDF
    const doc = new jsPDF({ format: 'a4' });
    let currentY = 25; // Vertical position tracker

    // --------------------------------------------------------------------------
    // ENTERPRISE COLOR PALETTE
    // --------------------------------------------------------------------------
    const textDark = [15, 22, 41];    // Slate-900 equivalent
    const textMuted = [100, 116, 139]; // Slate-500 equivalent
    const accentCyan = [6, 182, 212];  // Cyan-500 equivalent
    const lineLight = [226, 232, 240]; // Slate-200 equivalent

    // Helper function to handle page breaks dynamically
    const checkPageBreak = (addedHeight) => {
        if (currentY + addedHeight > 280) {
            doc.addPage();
            currentY = 25;
        }
    };

    // --------------------------------------------------------------------------
    // HEADER SECTION
    // --------------------------------------------------------------------------
    // Sharp Accent Block
    doc.setFillColor(...accentCyan);
    doc.rect(20, currentY - 5, 2, 14, 'F');

    // Branding Title (Serif)
    doc.setTextColor(...textDark);
    doc.setFont("times", "bold");
    doc.setFontSize(22);
    doc.text("CAREER PATHS", 26, currentY + 2);

    // Subtitle (Sans-serif, small, tracked out look)
    doc.setTextColor(...textMuted);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.text("EXECUTIVE TELEMETRY REPORT", 26, currentY + 8);

    currentY += 25;

    // --------------------------------------------------------------------------
    // TARGET PROFILE SECTION
    // --------------------------------------------------------------------------
    doc.setTextColor(...textMuted);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text("TARGET PROFILE:", 20, currentY);

    doc.setTextColor(...textDark);
    doc.setFont("helvetica", "normal");
    doc.text(userName.toUpperCase(), 55, currentY);

    doc.setTextColor(...textMuted);
    doc.setFont("helvetica", "bold");
    doc.text("TIMESTAMP:", 130, currentY);

    doc.setTextColor(...textDark);
    doc.setFont("helvetica", "normal");
    doc.text(new Date().toLocaleDateString(), 155, currentY);

    currentY += 8;

    // Geometric Separator Line
    doc.setDrawColor(...lineLight);
    doc.setLineWidth(0.5);
    doc.line(20, currentY, 190, currentY);
    currentY += 15;

    // --------------------------------------------------------------------------
    // PRIMARY MATCH SECTION
    // --------------------------------------------------------------------------
    doc.setTextColor(...accentCyan);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text("PRIMARY ALIGNMENT", 20, currentY);
    currentY += 10;

    // Role (Serif)
    doc.setTextColor(...textDark);
    doc.setFont("times", "bold");
    doc.setFontSize(32);
    doc.text(results.topMatch.career, 20, currentY);

    // Percentage (Monospace/Courier for data feel)
    doc.setTextColor(...accentCyan);
    doc.setFont("courier", "bold");
    doc.setFontSize(32);
    doc.text(`${results.topMatch.percentage}%`, 160, currentY, { align: "right" });

    currentY += 15;

    // --------------------------------------------------------------------------
    // SECONDARY MATCHES
    // --------------------------------------------------------------------------
    doc.setTextColor(...textMuted);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text("SECONDARY ALIGNMENTS", 20, currentY);
    currentY += 8;

    doc.setTextColor(...textDark);
    doc.setFont("times", "normal");
    doc.setFontSize(12);

    results.alternatives.forEach((alt) => {
        doc.text(alt.career, 20, currentY);
        doc.setFont("courier", "bold");
        doc.setTextColor(...accentCyan);
        doc.text(`${alt.percentage}%`, 100, currentY);
        doc.setFont("times", "normal");
        doc.setTextColor(...textDark);
        currentY += 7;
    });

    currentY += 10;
    doc.setDrawColor(...lineLight);
    doc.line(20, currentY, 190, currentY);
    currentY += 15;

    // --------------------------------------------------------------------------
    // AI INTELLIGENCE DASHBOARD (If data exists)
    // --------------------------------------------------------------------------
    if (aiData) {
        checkPageBreak(30);

        doc.setTextColor(...textDark);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.text("EXECUTIVE BRIEFING", 20, currentY);
        currentY += 8;

        // Handle Summary Paragraph
        doc.setTextColor(...textDark);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        const splitSummary = doc.splitTextToSize(aiData.summary, 170);
        doc.text(splitSummary, 20, currentY);
        currentY += (splitSummary.length * 5) + 10;

        checkPageBreak(40);

        // Handle Core Strengths
        doc.setTextColor(...textDark);
        doc.setFont("helvetica", "bold");
        doc.text("CORE STRENGTHS", 20, currentY);
        currentY += 8;

        doc.setFont("helvetica", "normal");
        aiData.strengths.forEach((strength) => {
            const splitStrength = doc.splitTextToSize(`• ${strength}`, 165);
            doc.text(splitStrength, 25, currentY);
            currentY += (splitStrength.length * 5) + 3;
            checkPageBreak(15);
        });

        currentY += 5;
        checkPageBreak(40);

        // Handle Action Items / Recommendations
        doc.setFont("helvetica", "bold");
        doc.text("ACTION ITEMS", 20, currentY);
        currentY += 8;

        doc.setFont("helvetica", "normal");
        aiData.learningRecs.forEach((rec) => {
            const splitRec = doc.splitTextToSize(`> ${rec}`, 165);
            doc.text(splitRec, 25, currentY);
            currentY += (splitRec.length * 5) + 3;
            checkPageBreak(15);
        });
    }

    // --------------------------------------------------------------------------
    // FOOTER
    // --------------------------------------------------------------------------
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setTextColor(...textMuted);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8);
        doc.text(
            `© ${new Date().getFullYear()} Career Paths. CONFIDENTIAL TELEMETRY REPORT - PAGE ${i} OF ${pageCount}`,
            105,
            290,
            { align: "center" }
        );
    }

    // Output Generation
    doc.save(`${userName.replace(/\s+/g, '_')}_Career_Telemetry.pdf`);
};

export const generateGoalPDF = (selectedShort, selectedLong, personalGoal) => {
    const doc = new jsPDF({ format: 'a4' });
    let currentY = 25;

    // Palettes (matching your existing service)
    const textDark = [15, 22, 41];
    const textMuted = [100, 116, 139];
    const accentEmerald = [16, 185, 129]; // Emerald-500

    // Header
    doc.setFillColor(...accentEmerald);
    doc.rect(20, currentY - 5, 2, 14, 'F');
    doc.setTextColor(...textDark);
    doc.setFont("times", "bold");
    doc.setFontSize(22);
    doc.text("CAREER VISION BOARD", 26, currentY + 2);
    currentY += 20;

    // Section: Short Term
    doc.setTextColor(...accentEmerald);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text("SHORT-TERM GOALS (0-1 YEAR)", 20, currentY);
    currentY += 8;
    doc.setTextColor(...textDark);
    doc.setFont("helvetica", "normal");
    selectedShort.forEach(g => {
        doc.text(`- ${g}`, 25, currentY);
        currentY += 7;
    });

    currentY += 10;
    // Section: Long Term
    doc.setTextColor(...accentEmerald);
    doc.text("LONG-TERM GOALS (3-5 YEARS+)", 20, currentY);
    currentY += 8;
    doc.setTextColor(...textDark);
    selectedLong.forEach(g => {
        doc.text(`- ${g}`, 25, currentY);
        currentY += 7;
    });

    // Section: Personal Goal
    currentY += 10;
    doc.setTextColor(...accentEmerald);
    doc.text("PERSONAL CAREER GOAL", 20, currentY);
    currentY += 8;
    doc.setTextColor(...textDark);
    const splitGoal = doc.splitTextToSize(personalGoal || "No personal goal defined.", 160);
    doc.text(splitGoal, 20, currentY);

    doc.save("My_Career_Vision_Board.pdf");
};