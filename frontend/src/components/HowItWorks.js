import React from 'react';
import { Keyboard, GitMerge, FileJson } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: <Keyboard className="text-teal-600" size={28} />,
      title: "Input Query",
      description: "Doctor or Clerk enters the traditional Ayush diagnosis term into the EMR system.",
      number: "01"
    },
    {
      icon: <GitMerge className="text-teal-600" size={28} />,
      title: "Semantic Mapping",
      description: "Our API maps the term to the NAMASTE portal ID and finds the exact WHO ICD-11 equivalent.",
      number: "02"
    },
    {
      icon: <FileJson className="text-teal-600" size={28} />,
      title: "Standardized Output",
      description: "Returns a FHIR-compliant JSON object ready for storage in any National EMR system.",
      number: "03"
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-4 text-lg text-slate-500">
            A frictionless three-step process that works behind the scenes to standardize your medical records.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {steps.map((step, index) => (
            <div key={index} className="relative bg-white border border-gray-100 rounded-3xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 group">
              {/* Number watermark */}
              <div className="absolute top-4 right-6 text-6xl font-black text-gray-50 opacity-50 select-none group-hover:text-teal-50 transition-colors">
                {step.number}
              </div>
              
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-teal-50 mb-6 group-hover:scale-110 transition-transform duration-300">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                <p className="text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
