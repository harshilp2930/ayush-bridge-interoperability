import React, { useState, useEffect, useRef } from 'react';
import { Key, Copy, Plus, MoreVertical, ShieldAlert, Check, Trash2, X } from 'lucide-react';

const ApiKeys = () => {
  const [keys, setKeys] = useState([
    { id: 1, name: 'Production App', prefix: 'ayush_live_', key: '••••••••••••••••••••••••xw9q', fullKey: 'ayush_live_a1b2c3d4e5f6g7h8xw9q', created: 'Oct 24, 2023', lastUsed: '2 mins ago', status: 'active' },
    { id: 2, name: 'Development Test', prefix: 'ayush_test_', key: '••••••••••••••••••••••••8m2z', fullKey: 'ayush_test_z9y8x7w6v5u4t3s28m2z', created: 'Nov 12, 2023', lastUsed: '5 days ago', status: 'active' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [keyEnvironment, setKeyEnvironment] = useState('test');
  const [copiedId, setCopiedId] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCopy = (id, fullKey) => {
    navigator.clipboard.writeText(fullKey);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
    setActiveDropdown(null);
  };

  const generateRandomKey = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from({ length: 24 }).map(() => chars.charAt(Math.floor(Math.random() * chars.length))).join('');
  };

  const handleCreateKey = (e) => {
    e.preventDefault();
    if (!newKeyName.trim()) return;

    const prefix = keyEnvironment === 'live' ? 'ayush_live_' : 'ayush_test_';
    const randomKeyPart = generateRandomKey();
    const last4 = randomKeyPart.slice(-4);
    
    const newKey = {
      id: Date.now(),
      name: newKeyName,
      prefix,
      key: `••••••••••••••••••••••••${last4}`,
      fullKey: `${prefix}${randomKeyPart}`,
      created: 'Just now',
      lastUsed: 'Never',
      status: 'active'
    };

    setKeys([newKey, ...keys]);
    setNewKeyName('');
    setIsModalOpen(false);
  };

  const handleRevoke = (id) => {
    if(window.confirm('Are you sure you want to revoke this API key? This action cannot be undone and will immediately break any integrations using it.')) {
      setKeys(keys.filter(k => k.id !== id));
      setActiveDropdown(null);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in-up pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">API Keys</h1>
          <p className="text-slate-500 mt-1">Manage your API keys to authenticate requests to the Ayush Bridge.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-teal-600 text-white font-medium rounded-xl hover:bg-teal-700 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
        >
          <Plus size={18} />
          Create new key
        </button>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3">
        <ShieldAlert className="text-amber-600 shrink-0 mt-0.5" size={20} />
        <div>
          <h3 className="text-sm font-semibold text-amber-800">Keep your keys secure</h3>
          <p className="text-sm text-amber-700 mt-1">
            Do not share your API keys in publicly accessible areas such as GitHub, client-side code, and so forth.
          </p>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-2xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-slate-50">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Name</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Secret Key</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Created</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Last Used</th>
                <th scope="col" className="relative px-6 py-4"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {keys.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-10 text-center text-slate-500">
                    No API keys found. Create one to get started.
                  </td>
                </tr>
              )}
              {keys.map((key) => (
                <tr key={key.id} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-9 w-9 rounded-full bg-teal-50 flex items-center justify-center">
                        <Key className="h-4 w-4 text-teal-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-semibold text-slate-900">{key.name}</div>
                        <div className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                          {key.status}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <code className="text-sm font-mono text-slate-700 bg-slate-100 px-2 py-1 rounded border border-slate-200">
                        {key.prefix}{key.key}
                      </code>
                      <button 
                        onClick={() => handleCopy(key.id, key.fullKey)}
                        className={`p-1.5 rounded-md transition-all ${copiedId === key.id ? 'bg-emerald-100 text-emerald-700' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100 opacity-0 group-hover:opacity-100'}`}
                        title="Copy key"
                      >
                        {copiedId === key.id ? <Check size={16} /> : <Copy size={16} />}
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 font-medium">{key.created}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{key.lastUsed}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium relative">
                    <button 
                      onClick={() => setActiveDropdown(activeDropdown === key.id ? null : key.id)}
                      className="text-slate-400 hover:text-slate-700 p-1.5 rounded-md hover:bg-slate-100 transition-colors"
                    >
                      <MoreVertical size={18} />
                    </button>
                    
                    {/* Dropdown Menu */}
                    {activeDropdown === key.id && (
                      <div ref={dropdownRef} className="absolute right-6 top-10 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-10 animate-fade-in-up" style={{ animationDuration: '0.2s' }}>
                        <button 
                          onClick={() => handleCopy(key.id, key.fullKey)}
                          className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                        >
                          <Copy size={16} className="text-slate-400" /> Copy secret key
                        </button>
                        <div className="h-px bg-gray-100 my-1"></div>
                        <button 
                          onClick={() => handleRevoke(key.id)}
                          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 font-medium"
                        >
                          <Trash2 size={16} className="text-red-500" /> Revoke key
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Key Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-fade-in-up" style={{ animationDuration: '0.2s' }}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="text-lg font-bold text-slate-900">Create new API key</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-md hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleCreateKey} className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Name</label>
                  <input 
                    type="text" 
                    required
                    value={newKeyName}
                    onChange={(e) => setNewKeyName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-600/50 focus:border-teal-600 transition-all text-slate-900"
                    placeholder="e.g. Production Mobile App"
                    autoFocus
                  />
                  <p className="text-xs text-slate-500 mt-1.5">A descriptive name for your key to help you track usage.</p>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Environment</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button 
                      type="button"
                      onClick={() => setKeyEnvironment('test')}
                      className={`px-4 py-2.5 rounded-lg border text-sm font-medium transition-all flex items-center justify-center gap-2 ${keyEnvironment === 'test' ? 'border-teal-600 bg-teal-50 text-teal-700' : 'border-gray-200 text-slate-600 hover:bg-slate-50'}`}
                    >
                      <div className={`w-2 h-2 rounded-full ${keyEnvironment === 'test' ? 'bg-teal-500' : 'bg-slate-300'}`}></div>
                      Test
                    </button>
                    <button 
                      type="button"
                      onClick={() => setKeyEnvironment('live')}
                      className={`px-4 py-2.5 rounded-lg border text-sm font-medium transition-all flex items-center justify-center gap-2 ${keyEnvironment === 'live' ? 'border-amber-500 bg-amber-50 text-amber-700' : 'border-gray-200 text-slate-600 hover:bg-slate-50'}`}
                    >
                      <div className={`w-2 h-2 rounded-full ${keyEnvironment === 'live' ? 'bg-amber-500' : 'bg-slate-300'}`}></div>
                      Live
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex gap-3">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 bg-white text-slate-700 font-semibold py-2.5 rounded-lg border border-gray-200 hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={!newKeyName.trim()}
                  className="flex-1 bg-teal-600 text-white font-semibold py-2.5 rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                >
                  Create Secret Key
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApiKeys;
