import React from 'react';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  const scrollToSearch = () => {
    const element = document.getElementById('search-interface');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div id="home" className="relative bg-slate-50 overflow-hidden pt-24 pb-32 animate-fade-in-up">
      {/* Premium Mesh Gradient Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[60%] rounded-full bg-teal-200/40 blur-[100px] mix-blend-multiply"></div>
        <div className="absolute top-[10%] -right-[10%] w-[40%] h-[50%] rounded-full bg-emerald-200/40 blur-[100px] mix-blend-multiply"></div>
        <div className="absolute -bottom-[20%] left-[20%] w-[60%] h-[50%] rounded-full bg-blue-100/40 blur-[100px] mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
      </div>
      
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/60 backdrop-blur-md border border-teal-100 text-teal-800 text-sm font-medium mb-8 animate-fade-in-up shadow-sm" style={{ animationDelay: '0.1s' }}>
          <span className="flex h-2 w-2 rounded-full bg-teal-500 animate-pulse"></span>
          FHIR R4 & ICD-11 Compliant API
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-slate-900 tracking-tight mb-6 leading-[1.1] animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          Interoperability for <br className="hidden md:block"/> 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-500">Traditional Medicine</span>
        </h1>
        
        <p className="mt-6 max-w-2xl text-lg md:text-xl text-slate-600 mx-auto mb-10 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          Seamlessly bridge the gap between NAMASTE Ayurveda codes and WHO ICD-11 Standards. 
          Integrate traditional diagnoses into modern Electronic Health Records instantly.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <button 
            onClick={scrollToSearch}
            className="flex items-center justify-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-xl font-semibold hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20 active:scale-[0.98]"
          >
            Try the Mapping Tool <ArrowRight size={18} />
          </button>
          <a 
            href="https://ayush-backend-r2im.onrender.com/api/docs/" 
            target="_blank" rel="noreferrer"
            className="flex items-center justify-center gap-2 bg-white/80 backdrop-blur-sm text-slate-700 border border-gray-200 px-8 py-4 rounded-xl font-semibold hover:bg-white transition-colors shadow-sm"
          >
            View Documentation
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
