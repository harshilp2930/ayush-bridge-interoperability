import React from 'react';
import { Link } from 'react-router-dom';
import { Stethoscope, Menu } from 'lucide-react';

const Navbar = () => {

  const scrollToSection = (id) => {
    // If not on home page, maybe we should navigate to home first, but for simplicity we keep it as is.
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm animate-fade-in-down">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-teal-50 p-2 rounded-lg text-teal-700 group-hover:bg-teal-100 transition-colors">
              <Stethoscope size={24} />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">
              Ayush<span className="text-teal-600">Bridge</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6">
            <button onClick={() => scrollToSection('home')} className="text-sm font-medium text-slate-600 hover:text-teal-600 transition-colors">Home</button>
            <button onClick={() => scrollToSection('how-it-works')} className="text-sm font-medium text-slate-600 hover:text-teal-600 transition-colors">How It Works</button>
            <button onClick={() => scrollToSection('use-cases')} className="text-sm font-medium text-slate-600 hover:text-teal-600 transition-colors">Use Cases</button>
            <a href="https://ayush-backend-r2im.onrender.com/api-docs/" target="_blank" rel="noreferrer" className="text-sm font-medium text-slate-600 hover:text-teal-600 transition-colors">API Docs</a>
            
            <div className="h-4 w-px bg-gray-200 mx-2"></div>
            
            <Link to="/login" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Log in</Link>
            <Link to="/register" className="text-sm font-medium bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors shadow-sm shadow-teal-600/20">
              Get API Key
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-4">
            <Link to="/login" className="text-sm font-medium text-teal-600">Log in</Link>
            <button className="text-slate-500 hover:text-slate-900">
              <Menu size={24} />
            </button>
          </div>
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
