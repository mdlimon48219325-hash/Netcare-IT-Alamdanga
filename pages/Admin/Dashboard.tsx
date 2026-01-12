
import React from 'react';
import { useApp } from '../../App';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const AdminDashboard: React.FC = () => {
  const { t, customers, isDark } = useApp();

  const activeCount = customers.filter(c => c.status === 'Active').length;
  const expiredCount = customers.length - activeCount;
  const totalRevenue = customers.reduce((sum, c) => sum + (c.status === 'Active' ? c.price : 0), 0);

  const data = [
    { name: 'Jul', revenue: 45000 },
    { name: 'Aug', revenue: 52000 },
    { name: 'Sep', revenue: 48000 },
    { name: 'Oct', revenue: totalRevenue },
  ];

  const stats = [
    { label: t.totalCustomers, value: customers.length, color: 'blue', icon: '👥' },
    { label: t.activeCustomers, value: activeCount, color: 'green', icon: '🟢' },
    { label: 'Expired Users', value: expiredCount, color: 'red', icon: '🔴' },
    { label: t.monthlyRevenue, value: `৳${totalRevenue.toLocaleString()}`, color: 'amber', icon: '💰' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className={`p-6 rounded-3xl border shadow-sm ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'}`}>
            <div className="flex justify-between items-start mb-4">
              <span className="text-3xl">{stat.icon}</span>
              <span className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase ${
                stat.color === 'green' ? 'bg-green-100 text-green-700 dark:bg-green-900/40' :
                stat.color === 'red' ? 'bg-red-100 text-red-700 dark:bg-red-900/40' :
                stat.color === 'amber' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/40' :
                'bg-blue-100 text-blue-700 dark:bg-blue-900/40'
              }`}>
                {stat.label}
              </span>
            </div>
            <p className="text-3xl font-black">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className={`p-8 rounded-3xl border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'}`}>
          <h3 className="text-xl font-bold mb-8">Revenue Analysis</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? '#334155' : '#e2e8f0'} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', backgroundColor: isDark ? '#1e293b' : '#ffffff' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={`p-8 rounded-3xl border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'}`}>
          <h3 className="text-xl font-bold mb-8">Package Distribution</h3>
          <div className="h-72 w-full">
             <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[
                  { name: 'Silver', count: 45 },
                  { name: 'Gold', count: 82 },
                  { name: 'Platinum', count: 31 },
                  { name: 'Diamond', count: 12 },
                ]}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? '#334155' : '#e2e8f0'} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                  <Tooltip 
                    cursor={{fill: isDark ? '#334155' : '#f1f5f9'}}
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', backgroundColor: isDark ? '#1e293b' : '#ffffff' }}
                  />
                  <Bar dataKey="count" fill="#3b82f6" radius={[6, 6, 0, 0]} barSize={40} />
                </BarChart>
             </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
