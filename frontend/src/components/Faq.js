import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const Faq = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

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

  return (
    <section id="faq" className="py-24 bg-gray-50 border-t border-gray-200/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div 
              key={index} 
              className={`bg-white border rounded-2xl overflow-hidden transition-all duration-200 ${
                openFaqIndex === index ? 'border-teal-200 shadow-md ring-1 ring-teal-50' : 'border-gray-100 shadow-sm hover:border-gray-200'
              }`}
            >
              <button 
                className="w-full flex justify-between items-center px-6 py-5 text-left focus:outline-none"
                onClick={() => toggleFaq(index)}
              >
                <span className={`text-lg font-semibold transition-colors ${openFaqIndex === index ? 'text-teal-700' : 'text-slate-800'}`}>
                  {item.question}
                </span>
                <span className={`ml-4 flex-shrink-0 transition-transform duration-200 ${openFaqIndex === index ? 'text-teal-600 rotate-180' : 'text-slate-400'}`}>
                  {openFaqIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                </span>
              </button>
              
              <div 
                className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                  openFaqIndex === index ? 'max-h-96 pb-5 opacity-100' : 'max-h-0 pb-0 opacity-0'
                }`}
              >
                <p className="text-slate-600 leading-relaxed border-t border-gray-50 pt-4">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
