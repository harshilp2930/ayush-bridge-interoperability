import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  // --- Existing State ---
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'default');
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  // --- NEW: Email Subscription State ---
  const [email, setEmail] = useState('');

  // --- Theme Logic ---
  useEffect(() => {
    const root = document.documentElement;
    root.removeAttribute('data-theme');

    if (theme === 'default') {
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (systemDark) root.setAttribute('data-theme', 'dark');
    } else {
      root.setAttribute('data-theme', theme);
    }
    
    localStorage.setItem('theme', theme);
  }, [theme]);

  const cycleTheme = () => {
    if (theme === 'default') setTheme('light');
    else if (theme === 'light') setTheme('dark');
    else setTheme('default');
  };

  const getThemeIcon = () => {
    if (theme === 'light') return '☀️ Light';
    if (theme === 'dark') return '🌙 Dark';
    return '💻 System';
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  // --- FAQ Data ---
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

  // --- Search Function ---
  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);
    
    if (value.length > 1) {
      setLoading(true);
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/search/?q=${value}`);
        setResults(response.data);
      } catch (error) {
        console.error("Error connecting to backend:", error);
      }
      setLoading(false);
    } else {
      setResults([]);
    }
  };

  // --- NEW: Subscribe Function ---
  const handleSubscribe = async () => {
    if (!email || !email.includes('@')) {
      alert("Please enter a valid email address.");
      return;
    }

    try {
      // Send the email to your Django Backend
      await axios.post('http://127.0.0.1:8000/api/subscribe/', { email: email });
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

  return (
    <div className="App">
      
      {/* 1. Navigation Bar */}
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
          <span onClick={() => window.open('http://127.0.0.1:8000/swagger/', '_blank')}>API Docs</span>
          
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

      {/* 2. Hero Section */}
      <div id="home" className="hero">
        <h1>Interoperability for Traditional Medicine</h1>
        <p>
          Bridging the gap between NAMASTE Ayurveda codes and WHO ICD-11 Standards.
          Enabling seamless integration for Electronic Health Records (EHR).
        </p>
      </div>

      {/* 3. Main Search Interface */}
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

      {/* 4. How It Works Section */}
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

      {/* 5. Use Cases Section */}
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

      {/* 6. Discover & Analyze Resources */}
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

      {/* 7. FAQ Section */}
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

      {/* 8. Footer (Updated with Email Logic) */}
      <footer>
        <div className="footer-top">
          <div className="footer-cta">
            <h2>Stay Updated on Interoperability</h2>
            <p>Get the latest updates on Ayush-ICD mappings and API version releases.</p>
          </div>
          
          {/* --- NEW EMAIL INPUT SECTION --- */}
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
            <a href="#">🔎 Diagnosis Lookup</a>
            <a href="#">⚡ REST API Access</a>
            <a href="#">📄 Developer Docs</a>
            <a href="#">🟢 System Status</a>
          </div>
          <div className="footer-col">
            <h4>Research</h4>
            <a href="#">📚 Methodology</a>
            <a href="#">🧠 Semantic Mapping</a>
            <a href="#">📜 Literature Review</a>
            <a href="#">👥 Project Team</a>
          </div>
          <div className="footer-col">
            <h4>Connect</h4>
            <a href="#">🐙 GitHub Repository</a>
            <a href="#">💼 LinkedIn Profile</a>
            <a href="#">📧 Contact Research Lead</a>
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