import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle } from 'lucide-react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Save to simulated session
    localStorage.setItem('ayush_user', JSON.stringify({
      name: name,
      email: email,
      role: 'System Administrator',
      organization: organization || 'Independent Healthcare'
    }));

    console.log("Registration submitted", { name, email, password, organization });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Panel - Branding/Marketing (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-slate-900 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-900 via-slate-900 to-teal-900 z-0"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 z-0"></div>
        <div className="absolute top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-teal-500/20 blur-[100px] z-0"></div>
        
        <div className="relative z-10 flex flex-col justify-between p-16 h-full text-white">
          <Link to="/" className="flex items-center gap-3 w-max hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 rounded-xl bg-teal-500 flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">A+</span>
            </div>
            <span className="font-bold text-2xl tracking-tight">Ayush Bridge</span>
          </Link>
          
          <div className="max-w-md">
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-8">
              Join the healthcare interoperability network.
            </h1>
            
            <ul className="space-y-4">
              {[
                'Instant access to NAMASTE & ICD-11 mappings',
                'Generate secure API keys for your applications',
                'Detailed usage analytics and reporting',
                'Priority support for enterprise integrations'
              ].map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle size={24} className="text-teal-400 shrink-0" />
                  <span className="text-slate-300 text-lg">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-4 text-sm text-slate-400">
            <span>© {new Date().getFullYear()} Ayush Bridge Inc.</span>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </div>

      {/* Right Panel - Register Form */}
      <div className="w-full lg:w-1/2 flex flex-col p-6 sm:p-12 lg:p-16 relative">
        <Link to="/" className="lg:hidden absolute top-6 left-6 flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors">
          <ArrowLeft size={20} />
          <span className="text-sm font-medium">Back</span>
        </Link>

        <div className="flex-1 flex flex-col justify-center max-w-md w-full mx-auto py-10">
          <div className="mb-8 text-center lg:text-left">
            <div className="lg:hidden w-12 h-12 rounded-xl bg-teal-600 flex items-center justify-center shadow-md mx-auto mb-6">
              <span className="text-white font-bold text-xl">A+</span>
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-3 tracking-tight">Create an account</h2>
            <p className="text-slate-500 text-lg">Start building with Ayush Bridge in seconds.</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
              <input 
                type="text" 
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600/50 focus:border-teal-600 transition-all text-slate-900"
                placeholder="Dr. Rajesh Kumar"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600/50 focus:border-teal-600 transition-all text-slate-900"
                placeholder="doctor@hospital.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Organization / Hospital</label>
              <input 
                type="text" 
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600/50 focus:border-teal-600 transition-all text-slate-900"
                placeholder="City General Hospital"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600/50 focus:border-teal-600 transition-all text-slate-900"
                placeholder="Create a strong password"
              />
            </div>

            <button 
              type="submit" 
              className="w-full bg-slate-900 text-white font-semibold py-4 rounded-xl hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20 active:scale-[0.98] mt-2"
            >
              Create Account
            </button>
          </form>
          
          <p className="text-center lg:text-left text-slate-500 mt-8">
            Already have an account? <Link to="/login" className="font-semibold text-teal-600 hover:text-teal-700">Sign in here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
