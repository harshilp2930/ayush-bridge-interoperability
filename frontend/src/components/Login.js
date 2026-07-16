import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Stethoscope, ArrowLeft, ShieldCheck } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create a real-feeling user session in localStorage
    // Capitalize the first part of the email for a fallback name
    const fallbackName = email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1);
    
    localStorage.setItem('ayush_user', JSON.stringify({
      name: fallbackName,
      email: email,
      role: 'API Developer',
      organization: 'Independent Clinic'
    }));

    console.log("Login submitted", { email, password });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Panel - Branding/Marketing (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-slate-900 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-900 via-slate-900 to-slate-900 z-0"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 z-0"></div>
        <div className="absolute -top-[30%] -right-[10%] w-[70%] h-[70%] rounded-full bg-teal-500/20 blur-[120px] z-0"></div>
        
        <div className="relative z-10 flex flex-col justify-between p-16 h-full text-white">
          <Link to="/" className="flex items-center gap-3 w-max hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 rounded-xl bg-teal-500 flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">A+</span>
            </div>
            <span className="font-bold text-2xl tracking-tight">Ayush Bridge</span>
          </Link>
          
          <div className="max-w-md">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
              <ShieldCheck size={16} className="text-teal-400" />
              <span className="text-sm font-medium">Enterprise Grade Security</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">
              Connect traditional medicine with modern standards.
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed">
              Log in to access your API keys, monitor usage analytics, and manage your integrations with the unified healthcare platform.
            </p>
          </div>

          <div className="flex items-center gap-4 text-sm text-slate-400">
            <span>© {new Date().getFullYear()} Ayush Bridge Inc.</span>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col p-6 sm:p-12 lg:p-16 xl:p-24 relative">
        <Link to="/" className="lg:hidden absolute top-6 left-6 flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors">
          <ArrowLeft size={20} />
          <span className="text-sm font-medium">Back</span>
        </Link>

        <div className="flex-1 flex flex-col justify-center max-w-md w-full mx-auto">
          <div className="mb-10 text-center lg:text-left">
            <div className="lg:hidden w-12 h-12 rounded-xl bg-teal-600 flex items-center justify-center shadow-md mx-auto mb-6">
              <span className="text-white font-bold text-xl">A+</span>
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-3 tracking-tight">Welcome back</h2>
            <p className="text-slate-500 text-lg">Enter your details to access your dashboard.</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
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
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-semibold text-slate-700">Password</label>
                <button type="button" className="text-sm font-semibold text-teal-600 hover:text-teal-700">Forgot password?</button>
              </div>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600/50 focus:border-teal-600 transition-all text-slate-900"
                placeholder="••••••••"
              />
            </div>

            <button 
              type="submit" 
              className="w-full bg-slate-900 text-white font-semibold py-4 rounded-xl hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20 active:scale-[0.98]"
            >
              Sign In
            </button>
          </form>
          
          <p className="text-center lg:text-left text-slate-500 mt-8">
            Don't have an account? <Link to="/register" className="font-semibold text-teal-600 hover:text-teal-700">Create one now</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
