import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Activity, Key, Search, Settings, LogOut, Menu, X, User } from 'lucide-react';

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState({ name: 'Demo User', email: 'doctor@hospital.com' });
  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = () => {
      const saved = localStorage.getItem('ayush_user');
      if (saved) {
        setUser(JSON.parse(saved));
      }
    };
    
    // Load initially
    loadUser();

    // Listen for custom event from Settings page
    window.addEventListener('userUpdated', loadUser);
    return () => window.removeEventListener('userUpdated', loadUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('ayush_user');
    navigate('/');
  };

  const navItems = [
    { name: 'Overview', path: '/dashboard', icon: Activity, exact: true },
    { name: 'API Keys', path: '/dashboard/keys', icon: Key },
    { name: 'Search Tool', path: '/dashboard/search', icon: Search },
    { name: 'Settings', path: '/dashboard/settings', icon: Settings },
  ];

  return (
    <div className="h-screen bg-slate-50 flex overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 z-50 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:w-72 flex flex-col ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        
        {/* Brand */}
        <div className="h-16 flex items-center px-6 border-b border-gray-100">
          <NavLink to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-sm">A+</span>
            </div>
            <span className="font-bold text-lg text-slate-900 tracking-tight">Ayush Bridge</span>
          </NavLink>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 px-2">Menu</div>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.exact}
                onClick={() => setIsSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-all duration-200 ${
                    isActive 
                      ? 'bg-teal-50 text-teal-700 shadow-sm border border-teal-100/50' 
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`
                }
              >
                <Icon size={20} className="shrink-0" />
                {item.name}
              </NavLink>
            );
          })}
        </div>

        {/* User / Logout */}
        <div className="p-4 border-t border-gray-100">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-slate-600 hover:bg-rose-50 hover:text-rose-600 w-full transition-colors"
          >
            <LogOut size={20} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-4 sm:px-6 z-30">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 focus:outline-none lg:hidden"
          >
            <Menu size={24} />
          </button>
          
          <div className="flex items-center justify-end w-full gap-4 relative">
            <button 
              onClick={() => {
                const dropdown = document.getElementById('user-dropdown');
                if (dropdown) dropdown.classList.toggle('hidden');
              }}
              onBlur={() => {
                // Delay hiding to allow clicks on dropdown items
                setTimeout(() => {
                  const dropdown = document.getElementById('user-dropdown');
                  if (dropdown) dropdown.classList.add('hidden');
                }, 150);
              }}
              className="flex items-center gap-2 hover:bg-slate-50 p-1.5 pr-3 rounded-full border border-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500/50"
            >
              <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-700">
                <User size={16} />
              </div>
              <span className="text-sm font-medium text-slate-700 hidden sm:block">{user.name}</span>
            </button>

            {/* Profile Dropdown */}
            <div id="user-dropdown" className="hidden absolute right-0 top-12 mt-1 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50 animate-fade-in-up" style={{ animationDuration: '0.2s' }}>
              <div className="px-4 py-2 border-b border-gray-50">
                <p className="text-sm font-bold text-slate-900 truncate">{user.name}</p>
                <p className="text-xs text-slate-500 truncate">{user.email}</p>
              </div>
              <div className="py-1">
                <NavLink 
                  to="/dashboard/settings" 
                  className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                >
                  <Settings size={16} className="text-slate-400" /> Account Settings
                </NavLink>
              </div>
              <div className="h-px bg-gray-100 my-1"></div>
              <div className="py-1">
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 w-full text-left font-medium"
                >
                  <LogOut size={16} className="text-rose-500" /> Sign Out
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-slate-50">
          <div className="max-w-5xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
