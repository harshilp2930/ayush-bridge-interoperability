import React from 'react';
import { Leaf, Globe2, BookOpen, ArrowRight } from 'lucide-react';

const AnalyzeStandards = () => {
  const resources = [
    {
      icon: <Leaf className="text-emerald-600" size={28} />,
      bg: "bg-emerald-50",
      title: "NAMASTE Portal",
      description: "National Ayush Morbidity Standardized Terminologies. The backbone of traditional medicine coding.",
      linkText: "Explore Database",
      url: "https://namaste.ayush.gov.in"
    },
    {
      icon: <Globe2 className="text-blue-600" size={28} />,
      bg: "bg-blue-50",
      title: "WHO ICD-11",
      description: "International Classification of Diseases (11th Revision). The global standard for diagnostic health information.",
      linkText: "Analyze Codes",
      url: "https://icd.who.int/en"
    },
    {
      icon: <BookOpen className="text-amber-600" size={28} />,
      bg: "bg-amber-50",
      title: "NRCeS India",
      description: "National Resource Centre for EHR Standards. Defining the interoperability roadmap for Indian Healthcare.",
      linkText: "View Standards",
      url: "https://www.nrces.in/"
    }
  ];

  return (
    <section id="analyze-standards" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative gradient blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-teal-50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
            Analyze Standards
          </h2>
          <p className="mt-4 text-lg text-slate-500">
            Direct access to the global and national registries powering our interoperability engine.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {resources.map((resource, index) => (
            <div 
              key={index} 
              onClick={() => window.open(resource.url, '_blank')}
              className="group flex flex-col justify-between bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer"
            >
              <div>
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl ${resource.bg} mb-6`}>
                  {resource.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-teal-700 transition-colors">{resource.title}</h3>
                <p className="text-slate-500 leading-relaxed mb-6">
                  {resource.description}
                </p>
              </div>
              <div className="flex items-center text-sm font-bold text-teal-600 group-hover:text-teal-800 transition-colors">
                {resource.linkText}
                <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AnalyzeStandards;
