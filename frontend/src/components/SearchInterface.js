import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Search, Loader2, AlertCircle, FileDigit } from 'lucide-react';

const SearchInterface = ({ isDashboard = false }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const latestQuery = useRef('');

  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);
    latestQuery.current = value;
    
    if (value.length > 1) {
      setLoading(true);
      try {
        const response = await axios.get(`https://ayush-backend-r2im.onrender.com/api/search/?q=${value}`);
        // Prevent race condition: only update if this is still the most recent query
        if (latestQuery.current === value) {
          setResults(response.data);
        }
      } catch (error) {
        console.error("Error connecting to backend:", error);
      }
      if (latestQuery.current === value) {
        setLoading(false);
      }
    } else {
      setResults([]);
    }
  };

  return (
    <div id="search-interface" className={`relative max-w-5xl mx-auto ${isDashboard ? 'w-full' : 'px-4 sm:px-6 lg:px-8 -mt-20 z-20 mb-24'}`}>
      <div className={`bg-white rounded-3xl border border-gray-100 p-6 md:p-10 animate-fade-in-up ${isDashboard ? 'shadow-sm' : 'shadow-xl shadow-slate-200/50'}`} style={{ animationDelay: '0.5s' }}>
        
        {!isDashboard && (
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Diagnosis Lookup Tool</h2>
            <p className="text-slate-500">
              Search a traditional term (e.g., "Jwara") to find standardized mapped codes.
            </p>
          </div>
        )}
        
        <div className="relative max-w-2xl mx-auto mb-10">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-6 w-6 text-slate-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-12 pr-12 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:bg-white transition-all shadow-inner"
            placeholder="Search disease name..."
            value={query}
            onChange={handleSearch}
          />
          {loading && (
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
              <Loader2 className="h-6 w-6 text-teal-600 animate-spin" />
            </div>
          )}
        </div>

        {/* Loading Skeletons */}
        {loading && results.length === 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm animate-pulse">
                <div className="h-6 bg-slate-200 rounded w-1/2 mb-6"></div>
                <div className="space-y-4">
                  <div className="h-10 bg-slate-100 rounded-xl w-full"></div>
                  <div className="h-10 bg-slate-100 rounded-xl w-full"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Results Grid */}
        {results.length > 0 && !loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {results.map((item, index) => (
              <div key={index} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-teal-200 transition-all group animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <h3 className="text-xl font-bold text-slate-900 mb-4 pb-3 border-b border-gray-100 flex items-center gap-2">
                  <FileDigit className="text-teal-600" size={20} />
                  {item.term}
                </h3>
                
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center bg-teal-50/50 px-4 py-3 rounded-xl border border-teal-100/50">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-100 text-emerald-800 tracking-wide uppercase">
                      NAMASTE
                    </span>
                    <span className="font-mono font-medium text-slate-800">{item.namaste}</span>
                  </div>
                  
                  <div className="flex justify-between items-center bg-blue-50/50 px-4 py-3 rounded-xl border border-blue-100/50">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-blue-100 text-blue-800 tracking-wide uppercase">
                      ICD-11 TM2
                    </span>
                    <span className="font-mono font-medium text-slate-800">{item.icd}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Empty State */}
        {query.length > 1 && results.length === 0 && !loading && (
          <div className="text-center py-12 px-4 animate-fade-in">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-rose-50 text-rose-500 mb-4">
              <AlertCircle size={32} />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-1">No matches found</h3>
            <p className="text-slate-500">We couldn't find any standardized mappings for "{query}". Try a different term or spelling.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchInterface;
