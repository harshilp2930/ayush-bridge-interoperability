import React, { useState, useEffect } from 'react';
import { User, Building, Shield, Save } from 'lucide-react';

const Settings = () => {
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    role: '',
  });

  const [orgData, setOrgData] = useState({
    organization: '',
    website: 'https://',
    apiUsageLimit: '100,000 / month',
  });

  useEffect(() => {
    const saved = localStorage.getItem('ayush_user');
    if (saved) {
      const parsed = JSON.parse(saved);
      setProfileData({
        name: parsed.name || '',
        email: parsed.email || '',
        role: parsed.role || 'Clinical Researcher',
      });
      setOrgData(prev => ({
        ...prev,
        organization: parsed.organization || 'City General Hospital',
      }));
    }
  }, []);

  const [isSaving, setIsSaving] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Save to local storage
    localStorage.setItem('ayush_user', JSON.stringify({
      name: profileData.name,
      email: profileData.email,
      role: profileData.role,
      organization: orgData.organization
    }));
    
    // Dispatch custom event to notify layout
    window.dispatchEvent(new Event('userUpdated'));

    setTimeout(() => {
      setIsSaving(false);
      // In a real app we'd show a success toast here
    }, 1000);
  };

  return (
    <div className="space-y-6 animate-fade-in-up pb-10 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
        <p className="text-slate-500 mt-1">Manage your account settings and preferences.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Profile Information */}
        <div className="bg-white shadow-sm rounded-2xl border border-gray-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 bg-slate-50/50 flex items-center gap-3">
            <User className="text-teal-600" size={20} />
            <h2 className="text-lg font-semibold text-slate-800">Profile Information</h2>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Full Name</label>
              <input 
                type="text" 
                value={profileData.name}
                onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-600/50 focus:border-teal-600 transition-all text-slate-900"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email Address</label>
              <input 
                type="email" 
                value={profileData.email}
                onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-600/50 focus:border-teal-600 transition-all text-slate-900"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Role / Job Title</label>
              <input 
                type="text" 
                value={profileData.role}
                onChange={(e) => setProfileData({...profileData, role: e.target.value})}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-600/50 focus:border-teal-600 transition-all text-slate-900"
              />
            </div>
          </div>
        </div>

        {/* Organization Details */}
        <div className="bg-white shadow-sm rounded-2xl border border-gray-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 bg-slate-50/50 flex items-center gap-3">
            <Building className="text-teal-600" size={20} />
            <h2 className="text-lg font-semibold text-slate-800">Organization Details</h2>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Organization Name</label>
              <input 
                type="text" 
                value={orgData.organization}
                onChange={(e) => setOrgData({...orgData, organization: e.target.value})}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-600/50 focus:border-teal-600 transition-all text-slate-900"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Website</label>
              <input 
                type="url" 
                value={orgData.website}
                onChange={(e) => setOrgData({...orgData, website: e.target.value})}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-600/50 focus:border-teal-600 transition-all text-slate-900"
              />
            </div>
            <div className="md:col-span-2 bg-slate-50 border border-slate-100 rounded-lg p-4 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-semibold text-slate-800">API Usage Plan</h4>
                <p className="text-sm text-slate-500 mt-0.5">Your current rate limit for live API requests.</p>
              </div>
              <div className="text-right">
                <span className="text-sm font-bold text-slate-900 bg-white border border-gray-200 px-3 py-1.5 rounded-md shadow-sm">
                  {orgData.apiUsageLimit}
                </span>
                <p className="text-xs text-teal-600 font-medium mt-2 hover:underline cursor-pointer">Upgrade Plan</p>
              </div>
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="bg-white shadow-sm rounded-2xl border border-gray-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 bg-slate-50/50 flex items-center gap-3">
            <Shield className="text-teal-600" size={20} />
            <h2 className="text-lg font-semibold text-slate-800">Security</h2>
          </div>
          <div className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-semibold text-slate-800">Change Password</h4>
                <p className="text-sm text-slate-500 mt-0.5">Ensure your account is using a long, random password to stay secure.</p>
              </div>
              <button type="button" className="px-4 py-2 bg-white border border-gray-200 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors shadow-sm whitespace-nowrap">
                Update Password
              </button>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-4">
          <button 
            type="submit"
            disabled={isSaving}
            className="flex items-center gap-2 px-6 py-2.5 bg-teal-600 text-white font-semibold rounded-xl hover:bg-teal-700 transition-colors shadow-sm disabled:opacity-70"
          >
            {isSaving ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Saving...
              </>
            ) : (
              <>
                <Save size={18} /> Save Changes
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
