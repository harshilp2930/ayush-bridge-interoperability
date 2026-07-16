import React, { useState } from 'react';
import { Activity, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const DashboardHome = () => {
  const stats = [
    { name: 'Total Requests', value: '0', change: '0%', trend: 'neutral' },
    { name: 'Active API Keys', value: '0', change: '0%', trend: 'neutral' },
    { name: 'Success Rate', value: '0%', change: '0%', trend: 'neutral' },
    { name: 'Avg Latency', value: '0ms', change: '0ms', trend: 'neutral' },
  ];

  // Empty data for the 7-day usage chart
  const chartData = [
    { day: 'Mon', requests: 0, height: '0%' },
    { day: 'Tue', requests: 0, height: '0%' },
    { day: 'Wed', requests: 0, height: '0%' },
    { day: 'Thu', requests: 0, height: '0%' },
    { day: 'Fri', requests: 0, height: '0%' },
    { day: 'Sat', requests: 0, height: '0%' },
    { day: 'Sun', requests: 0, height: '0%' },
  ];

  const [activities] = useState([]);

  return (
    <div className="space-y-6 animate-fade-in-up pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
          <p className="text-slate-500 mt-1">Welcome back. Here's what's happening with your API integrations today.</p>
        </div>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item, index) => (
          <div key={item.name} className="bg-white overflow-hidden shadow-sm rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-shadow animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Activity className="h-6 w-6 text-slate-400" aria-hidden="true" />
              </div>
              <div className="ml-4 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-slate-500 truncate">{item.name}</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-slate-900">{item.value}</div>
                    <div className={`ml-2 flex items-baseline text-sm font-semibold ${item.trend === 'up' ? 'text-emerald-600' : item.trend === 'down' ? 'text-emerald-600' : 'text-slate-500'}`}>
                      {item.change}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Usage Chart */}
        <div className="bg-white shadow-sm rounded-2xl border border-gray-100 p-6 lg:col-span-2 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-900">API Usage (Last 7 Days)</h2>
            <select className="text-sm border-gray-200 rounded-lg text-slate-600 py-1.5 pl-3 pr-8 focus:ring-teal-500 focus:border-teal-500 bg-slate-50">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          
          <div className="flex-1 flex items-end justify-between gap-2 sm:gap-6 pt-4 pb-2">
            {chartData.map((data, idx) => (
              <div key={idx} className="flex flex-col items-center flex-1 h-full group">
                {/* Bar area taking remaining space above the text */}
                <div className="flex-1 w-full flex items-end justify-center border-b border-gray-100 pb-2 relative">
                  {data.requests === 0 && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-[10px] text-slate-400 font-medium">0 reqs</span>
                    </div>
                  )}
                  <div className="relative w-full bg-teal-50 rounded-t-md overflow-hidden transition-all group-hover:bg-teal-100" style={{ height: data.height || '2%' }}>
                    <div className="absolute bottom-0 w-full bg-teal-500 rounded-t-md transition-all group-hover:bg-teal-600 h-full"></div>
                    {/* Tooltip */}
                    {data.requests > 0 && (
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs font-bold py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                        {data.requests.toLocaleString()} reqs
                      </div>
                    )}
                  </div>
                </div>
                <span className="text-xs font-medium text-slate-500 mt-2">{data.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white shadow-sm rounded-2xl border border-gray-100 p-6 lg:col-span-1 flex flex-col">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Recent Activity</h2>
          
          {activities.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-10 opacity-70">
              <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 mb-3">
                <Activity size={24} />
              </div>
              <p className="text-sm font-medium text-slate-900">No recent activity</p>
              <p className="text-xs text-slate-500 mt-1">Your API integration logs will appear here.</p>
            </div>
          ) : (
            <div className="space-y-4 flex-1">
              {activities.map((activity) => (
                <div key={activity.id} className="flex gap-3 py-3 border-b border-gray-50 last:border-0 relative">
                  <div className={`mt-0.5 w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    activity.type === 'success' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                  }`}>
                    {activity.type === 'success' ? <CheckCircle2 size={16} /> : <AlertTriangle size={16} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 truncate" title={activity.message}>{activity.message}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{activity.time}</p>
                  </div>
                  <div className="text-xs font-mono font-medium text-slate-500 bg-slate-50 px-2 py-1 rounded h-fit shrink-0">
                    {activity.code}
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <Link to="/dashboard/keys" className="mt-4 flex items-center justify-center gap-2 w-full py-2.5 text-sm font-semibold text-teal-600 bg-teal-50 hover:bg-teal-100 rounded-xl transition-colors">
            View all logs <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
