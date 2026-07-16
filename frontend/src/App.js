import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layouts
import PublicLayout from './layouts/PublicLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Public Marketing Pages
import Hero from './components/Hero';
import SearchInterface from './components/SearchInterface';
import HowItWorks from './components/HowItWorks';
import UseCases from './components/UseCases';
import AnalyzeStandards from './components/AnalyzeStandards';
import Faq from './components/Faq';

// Auth Pages
import Login from './components/Login';
import Register from './components/Register';

// Dashboard Pages
import DashboardHome from './pages/DashboardHome';
import ApiKeys from './pages/ApiKeys';
import DashboardSearch from './pages/DashboardSearch';
import Settings from './pages/Settings';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes with Navbar and Footer */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={
            <>
              <Hero />
              <SearchInterface />
              <HowItWorks />
              <UseCases />
              <AnalyzeStandards />
              <Faq />
            </>
          } />
          {/* We keep Login/Register outside PublicLayout to give them a completely custom split-screen layout */}
        </Route>

        {/* Custom Auth Routes (No Navbar/Footer) */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Private Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="keys" element={<ApiKeys />} />
          <Route path="search" element={<DashboardSearch />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;