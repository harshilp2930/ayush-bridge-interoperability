import React, { useState } from 'react';
import axios from 'axios';
import { Stethoscope, CheckCircle2, AlertCircle } from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState({ show: false, message: '', type: '' });
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleSubscribe = async () => {
    if (!email || !email.includes('@')) {
      setSubscribeStatus({ show: true, message: 'Please enter a valid email address.', type: 'error' });
      setTimeout(() => setSubscribeStatus({ show: false, message: '', type: '' }), 3000);
      return;
    }

    setIsSubscribing(true);
    try {
      await axios.post('https://ayush-backend-r2im.onrender.com/api/subscribe/', { email: email });
      setSubscribeStatus({ show: true, message: 'Success! You are now subscribed.', type: 'success' });
      setEmail('');
      setTimeout(() => setSubscribeStatus({ show: false, message: '', type: '' }), 4000);
    } catch (error) {
      console.error("Subscription error:", error);
      const errorMsg = error.response?.data?.message || "Something went wrong. Please try again.";
      setSubscribeStatus({ show: true, message: errorMsg, type: 'error' });
      setTimeout(() => setSubscribeStatus({ show: false, message: '', type: '' }), 4000);
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-300">
      {/* Newsletter Section */}
      <div className="border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:flex lg:items-center lg:justify-between">
          <div className="lg:w-0 lg:flex-1">
            <h2 className="text-2xl font-bold text-white tracking-tight sm:text-3xl">
              Stay Updated on Interoperability
            </h2>
            <p className="mt-3 max-w-3xl text-lg text-slate-400">
              Get the latest updates on Ayush-ICD mappings and API version releases.
            </p>
          </div>
          <div className="mt-8 lg:mt-0 lg:ml-8 lg:flex-1 relative">
            <div className="sm:flex">
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                id="email-address"
                type="email"
                autoComplete="email"
                required
                className="w-full px-5 py-3 border border-transparent placeholder-slate-400 focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-teal-500 focus:border-white sm:max-w-xs rounded-xl bg-slate-800 text-white"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSubscribe()}
                disabled={isSubscribing}
              />
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                <button
                  type="button"
                  onClick={handleSubscribe}
                  disabled={isSubscribing}
                  className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-teal-500 disabled:opacity-50 transition-colors"
                >
                  {isSubscribing ? 'Subscribing...' : 'Subscribe'}
                </button>
              </div>
            </div>
            
            {/* Toast Notification */}
            {subscribeStatus.show && (
              <div className={`absolute top-full mt-4 left-0 flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium ${
                subscribeStatus.type === 'success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
              } animate-fade-in`}>
                {subscribeStatus.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                {subscribeStatus.message}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <div className="flex items-center gap-2">
              <div className="bg-teal-500/10 p-2 rounded-lg text-teal-400">
                <Stethoscope size={24} />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Ayush<span className="text-teal-500">Bridge</span>
              </span>
            </div>
            <p className="text-base text-slate-400 max-w-xs leading-relaxed">
              An academic initiative to bridge Traditional Medicine with modern Digital Health standards. Compliant with FHIR R4 & ICD-11.
            </p>
          </div>
          
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-slate-200 tracking-wider uppercase">Platform</h3>
                <ul className="mt-4 space-y-4">
                  <li><a href="#home" className="text-base text-slate-400 hover:text-white transition-colors">Diagnosis Lookup</a></li>
                  <li><a href="https://ayush-backend-r2im.onrender.com/api-docs/" target="_blank" rel="noreferrer" className="text-base text-slate-400 hover:text-white transition-colors">REST API Access</a></li>
                  <li><a href="https://ayush-backend-r2im.onrender.com/api/docs/" target="_blank" rel="noreferrer" className="text-base text-slate-400 hover:text-white transition-colors">Developer Docs</a></li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-slate-200 tracking-wider uppercase">Research</h3>
                <ul className="mt-4 space-y-4">
                  <li><a href="#how-it-works" className="text-base text-slate-400 hover:text-white transition-colors">Methodology</a></li>
                  <li><a href="#analyze-standards" className="text-base text-slate-400 hover:text-white transition-colors">Semantic Mapping</a></li>
                  <li><a href="#faq" className="text-base text-slate-400 hover:text-white transition-colors">Literature Review</a></li>
                </ul>
              </div>
            </div>
            
            <div className="md:grid md:grid-cols-1 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-slate-200 tracking-wider uppercase">Connect</h3>
                <ul className="mt-4 space-y-4">
                  <li><a href="https://github.com" target="_blank" rel="noreferrer" className="text-base text-slate-400 hover:text-white transition-colors">GitHub Repository</a></li>
                  <li><a href="https://www.linkedin.com" target="_blank" rel="noreferrer" className="text-base text-slate-400 hover:text-white transition-colors">LinkedIn Profile</a></li>
                  <li><a href="mailto:info@ayushbridge.org" className="text-base text-slate-400 hover:text-white transition-colors">Contact Research Lead</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-base text-slate-400 xl:text-center">
            &copy; {new Date().getFullYear()} Ayush Bridge. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#!" className="text-slate-400 hover:text-white text-sm">Privacy Policy</a>
            <a href="#!" className="text-slate-400 hover:text-white text-sm">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
