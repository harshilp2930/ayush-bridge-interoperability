import React from 'react';
import { Hospital, LineChart, Code2 } from 'lucide-react';

const UseCases = () => {
  const useCases = [
    {
      icon: <Hospital className="text-teal-700" size={24} />,
      title: "Hospitals & Clinics",
      description: "Allows Ayurvedic hospitals to file insurance claims using standard ICD codes, reducing rejection rates and ensuring compliance."
    },
    {
      icon: <LineChart className="text-teal-700" size={24} />,
      title: "Public Health Research",
      description: "Enables government bodies to track disease outbreaks and effectiveness of Ayush treatments using global statistical standards."
    },
    {
      icon: <Code2 className="text-teal-700" size={24} />,
      title: "EMR Software Vendors",
      description: "Provides a plug-and-play API for existing hospital management software to become Ayush-compliant immediately."
    }
  ];

  return (
    <section id="use-cases" className="py-24 bg-gray-50 border-t border-b border-gray-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
            Who is this for?
          </h2>
          <p className="mt-4 text-lg text-slate-500">
            Empowering the entire healthcare ecosystem with standardized interoperability.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {useCases.map((useCase, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md hover:border-teal-100 transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-teal-50">
                  {useCase.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900">{useCase.title}</h3>
              </div>
              <p className="text-slate-600 leading-relaxed">
                {useCase.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCases;
