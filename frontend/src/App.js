/**
 * ============================================================================
 * AYUSH BRIDGE - FRONTEND APPLICATION
 * ============================================================================
 * 
 * Purpose:
 *   Main React component for the Ayush Bridge interoperability platform.
 *   Provides disease search, email subscription, and educational content
 *   about bridging NAMASTE (Traditional Medicine) and ICD-11 (WHO) standards.
 * 
 * Key Features:
 *   - Real-time fuzzy search for disease mappings
 *   - Theme switching (Light/Dark/System)
 *   - Email subscription system
 *   - FAQ accordion
 *   - Responsive design for all devices
 * 
 * API Integration:
 *   - Backend: https://ayush-backend-r2im.onrender.com
 *   - Endpoints: /api/search/, /api/subscribe/
 * 
 * ============================================================================
 */

// ============================================================================
// IMPORTS
// ============================================================================

// React core hooks
import React, { useState, useEffect } from 'react';

// HTTP client for API calls
import axios from 'axios';

// Stylesheet
import './App.css';


// ============================================================================
// MAIN COMPONENT
// ============================================================================

function App() {
  
  // ==========================================================================
  // STATE MANAGEMENT
  // ==========================================================================
  
  // --- Search State ---
  // Stores user's search query and results from backend
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // --- Theme State ---
  // Manages light/dark/system theme preference
  // Persisted in localStorage for user convenience
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'default');
  
  // --- FAQ State ---
  // Tracks which FAQ item is currently expanded
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  // --- Email Subscription State ---
  // Stores user's email for subscription feature
  const [email, setEmail] = useState('');

  // ==========================================================================
  // THEME MANAGEMENT
  // ==========================================================================
  
  /**
   * Effect: Apply theme to DOM and persist preference
   * 
   * Handles three theme modes:
   *   - 'default': Follows system preference (light/dark)
   *   - 'light': Force light mode
   *   - 'dark': Force dark mode
   * 
   * Updates CSS custom properties via data-theme attribute
   */
  useEffect(() => {
    const root = document.documentElement;
    root.removeAttribute('data-theme');

    if (theme === 'default') {
      // Check system preference and apply accordingly
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (systemDark) root.setAttribute('data-theme', 'dark');
    } else {
      // Apply user's explicit choice
      root.setAttribute('data-theme', theme);
    }
    
    // Persist theme choice to localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  /**
   * Function: Cycle through theme options
   * Order: default → light → dark → default
   */
  const cycleTheme = () => {
    if (theme === 'default') setTheme('light');
    else if (theme === 'light') setTheme('dark');
    else setTheme('default');
  };

  /**
   * Function: Get display label for current theme
   * Returns emoji + text for theme toggle button
   */
  const getThemeIcon = () => {
    if (theme === 'light') return '☀️ Light';
    if (theme === 'dark') return '🌙 Dark';
    return '💻 System';
  };

  // ==========================================================================
  // UTILITY FUNCTIONS
  // ==========================================================================
  
  /**
   * Function: Smooth scroll to page section
   * @param {string} id - Element ID to scroll to
   */
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  /**
   * Function: Toggle FAQ accordion item
   * @param {number} index - Index of FAQ item to toggle
   * Clicking an open item closes it, clicking a closed item opens it
   */
  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  // ==========================================================================
  // STATIC DATA
  // ==========================================================================
  
  /**
   * FAQ Data Structure
   * Contains frequently asked questions about the platform
   */
  const faqData = [
    {
      question: "What is the NAMASTE Portal?",
      answer: "It stands for 'National Ayush Morbidity Standardized Terminologies.' It is the Ministry of Ayush's centralized portal for standardizing codes for Ayurveda, Siddha, and Unani diagnoses."
    },
    {
      question: "Why do we need to map to ICD-11?",
      answer: "ICD-11 is the global standard for health reporting by the WHO. Mapping Ayush codes to ICD-11 allows traditional medicine data to be recognized internationally and integrated into modern hospital systems."
    },
    {
      question: "Is this system FHIR compliant?",
      answer: "Yes. The API output is structured according to HL7 FHIR (Fast Healthcare Interoperability Resources) R4 standards, ensuring it can be read by any modern EMR software."
    },
    {
      question: "Who can use this API?",
      answer: "This API is designed for Hospital Information Systems (HMIS), Insurance Companies, and Public Health Researchers who need to process Ayush data digitally."
    }
  ];

  // ==========================================================================
  // API HANDLERS
  // ==========================================================================
  
  /**
   * Function: Handle disease search
   * 
   * Features:
   *   - Debounced search (only triggers when query > 1 character)
   *   - Fuzzy matching on backend
   *   - Real-time results display
   * 
   * API Endpoint: GET /api/search/?q={query}
   * Backend performs fuzzy matching and returns top 10 results
   * 
   * @param {Event} e - Input change event
   */
  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);
    
    // Only search if query is meaningful (> 1 character)
    if (value.length > 1) {
      setLoading(true);
      try {
        // Call backend search API
        const response = await axios.get(`https://ayush-backend-r2im.onrender.com/api/search/?q=${value}`);
        setResults(response.data);
      } catch (error) {
        console.error("Error connecting to backend:", error);
        // Could show user-friendly error message here
      }
      setLoading(false);
    } else {
      // Clear results for short queries
      setResults([]);
    }
  };

  /**
   * Function: Handle email subscription
   * 
   * Validates email format and submits to backend subscription API
   * Backend prevents duplicate subscriptions automatically
   * 
   * API Endpoint: POST /api/subscribe/
   * Request Body: { email: string }
   * 
   * Success: Shows confirmation alert and clears input
   * Error: Shows specific error message from backend
   */
  const handleSubscribe = async () => {
    // Basic email validation
    if (!email || !email.includes('@')) {
      alert("Please enter a valid email address.");
      return;
    }

    try {
      // Submit subscription to backend
      await axios.post('https://ayush-backend-r2im.onrender.com/api/subscribe/', { email: email });
      alert("Success! You are now subscribed.");
      setEmail(''); // Clear the input field
    } catch (error) {
      console.error("Subscription error:", error);
      if (error.response && error.response.data) {
        // Show specific error from backend (e.g., "Already subscribed")
        alert(error.response.data.message || "Subscription failed.");
      } else {
        alert("Something went wrong. Please check your connection.");
      }
    }
  };

  // ==========================================================================
  // JSX RENDER
  // ==========================================================================
  
  return (
    <div className="App">
      
      {/* ================================================================== */}
      {/* SECTION 1: NAVIGATION BAR */}
      {/* ================================================================== */}
      <nav className="navbar">
        <div className="logo">
          <span>💠</span> Ayush<span style={{color: 'var(--primary)'}}>Bridge</span>
        </div>
        <div className="nav-links">
          <span onClick={() => scrollToSection('home')}>Home</span>
          <span onClick={() => scrollToSection('how-it-works')}>How It Works</span>
          <span onClick={() => scrollToSection('use-cases')}>Use Cases</span>
          <span onClick={() => scrollToSection('analyze-standards')}>Analyze Standards</span>
          <span onClick={() => scrollToSection('faq')}>FAQs</span>
          
          {/* CHANGED: Docs link now points to Render */}
          <span onClick={() => window.open('https://ayush-backend-r2im.onrender.com/api-docs/', '_blank')}>API Docs</span>
          
          <button 
            onClick={cycleTheme}
            style={{
              marginLeft: '20px', padding: '6px 12px', borderRadius: '20px',
              border: '1px solid var(--text-secondary)', background: 'transparent',
              color: 'var(--text-main)', cursor: 'pointer', fontWeight: '600',
              fontSize: '0.9rem', transition: 'all 0.2s'
            }}
            title="Toggle Theme: Light / Dark / System"
          >
            {getThemeIcon()}
          </button>
        </div>
      </nav>

      {/* ================================================================== */}
      {/* SECTION 2: HERO BANNER */}
      {/* ================================================================== */}
      <div id="home" className="hero">
        <h1>Interoperability for Traditional Medicine</h1>
        <p>
          Bridging the gap between NAMASTE Ayurveda codes and WHO ICD-11 Standards.
          Enabling seamless integration for Electronic Health Records (EHR).
        </p>
      </div>

      {/* ================================================================== */}
      {/* SECTION 3: SEARCH INTERFACE */}
      {/* Real-time disease lookup with fuzzy matching */}
      {/* ================================================================== */}
      <div className="search-section">
        <div className="search-box-card">
          <h2>Diagnosis Lookup Tool</h2>
          <p style={{marginBottom: '2rem', color: 'var(--text-secondary)'}}>
            Start typing a diagnosis (e.g. "Jwara", "Kasa") to see mapped codes.
          </p>
          <input
            type="text"
            className="search-input"
            placeholder="Search disease name..."
            value={query}
            onChange={handleSearch}
          />

          <div className="results-grid">
            {results.map((item, index) => (
              <div key={index} className="result-card">
                <h3>{item.term}</h3>
                <div className="code-row">
                  <span className="badge badge-namaste">NAMASTE</span>
                  <span className="code-text">{item.namaste}</span>
                </div>
                <div className="code-row">
                  <span className="badge badge-icd">ICD-11 TM2</span>
                  <span className="code-text">{item.icd}</span>
                </div>
              </div>
            ))}
          </div>
          
          {query.length > 1 && results.length === 0 && !loading && (
             <p style={{marginTop: '20px', color: 'var(--text-secondary)'}}>No matches found.</p>
          )}
        </div>
      </div>

      {/* ================================================================== */}
      {/* SECTION 4: HOW IT WORKS */}
      {/* Three-step explanation of the mapping process */}
      {/* ================================================================== */}
      <section id="how-it-works" className="page-section">
        <div style={{textAlign: 'center'}}>
           <h2 className="section-title">How It Works</h2>
        </div>
        <div className="steps-grid">
          <div className="step-card">
            <div className="step-number">1</div>
            <h3>Input Query</h3>
            <p style={{color: 'var(--text-secondary)'}}>Doctor or Clerk enters the traditional Ayush diagnosis term into the system.</p>
          </div>
          <div className="step-card">
            <div className="step-number">2</div>
            <h3>Semantic Mapping</h3>
            <p style={{color: 'var(--text-secondary)'}}>Our API maps the term to the NAMASTE portal ID and finds the corresponding WHO ICD-11 code.</p>
          </div>
          <div className="step-card">
            <div className="step-number">3</div>
            <h3>Standardized Output</h3>
            <p style={{color: 'var(--text-secondary)'}}>Returns a FHIR-compliant JSON object ready for storage in any National EMR system.</p>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* SECTION 5: USE CASES */}
      {/* Target audience and applications */}
      {/* ================================================================== */}
      <section id="use-cases" className="page-section section-alt">
        <div style={{textAlign: 'center'}}>
           <h2 className="section-title">Who is this for?</h2>
           <p style={{color: 'var(--text-secondary)', maxWidth: '600px', margin: '-2rem auto 3rem'}}>
             Empowering the entire healthcare ecosystem with standardized interoperability.
           </p>
        </div>
        <div className="use-case-grid">
          <div className="use-case-card">
            <h3 style={{display:'flex', alignItems:'center', gap:'10px'}}>
              <span style={{background:'rgba(37, 99, 235, 0.1)', padding:'8px', borderRadius:'8px'}}>🏥</span> 
              Hospitals & Clinics
            </h3>
            <p style={{color: 'var(--text-secondary)'}}>
              Allows Ayurvedic hospitals to file insurance claims using standard ICD codes, reducing rejection rates and ensuring compliance.
            </p>
          </div>
          <div className="use-case-card">
            <h3 style={{display:'flex', alignItems:'center', gap:'10px'}}>
              <span style={{background:'rgba(37, 99, 235, 0.1)', padding:'8px', borderRadius:'8px'}}>📊</span> 
              Public Health Research
            </h3>
            <p style={{color: 'var(--text-secondary)'}}>
              Enables government bodies to track disease outbreaks and effectiveness of Ayush treatments using global statistical standards.
            </p>
          </div>
          <div className="use-case-card">
            <h3 style={{display:'flex', alignItems:'center', gap:'10px'}}>
              <span style={{background:'rgba(37, 99, 235, 0.1)', padding:'8px', borderRadius:'8px'}}>💻</span> 
              EMR Software Vendors
            </h3>
            <p style={{color: 'var(--text-secondary)'}}>
              Provides a plug-and-play API for existing hospital management software to become Ayush-compliant immediately.
            </p>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* SECTION 6: EXTERNAL RESOURCES */}
      {/* Links to NAMASTE, ICD-11, and NRCeS portals */}
      {/* ================================================================== */}
      <section id="analyze-standards" className="page-section discovery-section">
        <div style={{textAlign: 'center'}}>
           <h2 className="section-title">Analyze Standards</h2>
           <p style={{color: 'var(--text-secondary)', maxWidth: '600px', margin: '-2rem auto 3rem'}}>
             Direct access to the global and national registries powering our interoperability engine.
           </p>
        </div>
        <div className="discovery-grid">
          <div className="resource-card" onClick={() => window.open('https://namaste.ayush.gov.in', '_blank')}>
            <div className="resource-icon">🕉️</div>
            <div>
              <h3>NAMASTE Portal</h3>
              <p>National Ayush Morbidity Standardized Terminologies. The backbone of traditional medicine coding.</p>
            </div>
            <div className="resource-link-text">Explore Database →</div>
          </div>
          <div className="resource-card" onClick={() => window.open('https://icd.who.int/en', '_blank')}>
            <div className="resource-icon">🌍</div>
            <div>
              <h3>WHO ICD-11</h3>
              <p>International Classification of Diseases (11th Revision). The global standard for diagnostic health information.</p>
            </div>
            <div className="resource-link-text">Analyze Codes →</div>
          </div>
          <div className="resource-card" onClick={() => window.open('https://www.nrces.in/', '_blank')}>
            <div className="resource-icon">🇮🇳</div>
            <div>
              <h3>NRCeS India</h3>
              <p>National Resource Centre for EHR Standards. Defining the interoperability roadmap for Indian Healthcare.</p>
            </div>
            <div className="resource-link-text">View Standards →</div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* SECTION 7: FAQ ACCORDION */}
      {/* Frequently asked questions with expand/collapse functionality */}
      {/* ================================================================== */}
      <section id="faq" className="page-section section-alt">
        <div style={{textAlign: 'center', marginBottom: '3rem'}}>
           <h2 className="section-title">Frequently Asked Questions</h2>
        </div>

        <div className="faq-container">
          {faqData.map((item, index) => (
            <div key={index} className="faq-item">
              <button 
                className={`faq-question ${openFaqIndex === index ? 'active' : ''}`} 
                onClick={() => toggleFaq(index)}
              >
                <span>{item.question}</span>
                <span className="faq-icon">
                  {openFaqIndex === index ? '−' : '+'}
                </span>
              </button>
              
              <div className={`faq-answer ${openFaqIndex === index ? 'open' : ''}`}>
                <div className="faq-answer-content">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================================================================== */}
      {/* SECTION 8: FOOTER */}
      {/* Subscription form, navigation links, and branding */}
      {/* ================================================================== */}
      <footer>
        <div className="footer-top">
          <div className="footer-cta">
            <h2>Stay Updated on Interoperability</h2>
            <p>Get the latest updates on Ayush-ICD mappings and API version releases.</p>
          </div>
          
          {/* --- EMAIL INPUT SECTION --- */}
          <div className="footer-input-group">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="footer-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="footer-btn" onClick={handleSubscribe}>
              Subscribe
            </button>
          </div>
          {/* ------------------------------- */}
        
        </div>
        <div className="footer-main">
          <div className="footer-brand-col">
            <div className="logo" style={{marginBottom: '1rem'}}>
              <span>💠</span> Ayush Bridge
            </div>
            <p>
              An academic initiative to bridge Traditional Medicine with modern Digital Health standards.
              Compliant with FHIR R4 & ICD-11.
            </p>
          </div>
          <div className="footer-col">
            <h4>Platform</h4>
            <a href="#home">🔎 Diagnosis Lookup</a>
            <a href="https://ayush-backend-r2im.onrender.com/api-docs/" target="_blank" rel="noreferrer">⚡ REST API Access</a>
            <a href="https://ayush-backend-r2im.onrender.com/api/docs/" target="_blank" rel="noreferrer">📄 Developer Docs</a>
            <a href="#faq">🟢 System Status</a>
          </div>
          <div className="footer-col">
            <h4>Research</h4>
            <a href="#how-it-works">📚 Methodology</a>
            <a href="#analyze-standards">🧠 Semantic Mapping</a>
            <a href="#faq">📜 Literature Review</a>
            <a href="#home">👥 Project Team</a>
          </div>
          <div className="footer-col">
            <h4>Connect</h4>
            <a href="https://github.com" target="_blank" rel="noreferrer">🐙 GitHub Repository</a>
            <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">💼 LinkedIn Profile</a>
            <a href="mailto:info@ayushbridge.org">📧 Contact Research Lead</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2025 Ayush Bridge.</span>
          <div style={{display: 'flex', gap: '20px'}}>
            <span>Privacy Policy</span>
            <span>Terms of Use</span>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default App;