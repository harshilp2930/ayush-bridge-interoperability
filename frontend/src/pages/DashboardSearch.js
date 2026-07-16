import React from 'react';
import SearchInterface from '../components/SearchInterface';

const DashboardSearch = () => {
  return (
    <div className="space-y-6 animate-fade-in-up">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Diagnosis Lookup</h1>
        <p className="text-slate-500 mt-1">Search the database directly from your dashboard.</p>
      </div>
      
      <div className="mt-2">
        <SearchInterface isDashboard={true} />
      </div>
    </div>
  );
};

export default DashboardSearch;
