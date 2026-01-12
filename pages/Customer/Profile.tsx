
import React from 'react';
import { useApp } from '../../App';

const CustomerProfile: React.FC = () => {
  const { user, t, isDark, settings } = useApp();

  if (!user) return null;

  const detailRows = [
    { label: t.id, value: user.id },
    { label: 'Mobile Number', value: user.mobile },
    { label: t.package, value: `${user.package} (${user.mbps} Mbps)` },
    { label: t.address, value: user.address },
    { label: 'Account Status', value: user.status, isStatus: true },
    { label: 'Monthly Bill', value: `৳${user.price}` },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-bottom duration-500">
      <div className={`relative overflow-hidden p-8 rounded-3xl border ${isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'}`}>
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center text-4xl text-white font-bold shadow-xl shadow-blue-500/30">
              {user.name.charAt(0)}
            </div>
            <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-4 ${isDark ? 'border-slate-800' : 'border-white'} ${user.status === 'Active' ? 'bg-green-500' : 'bg-red-500'}`}></div>
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-black mb-1">{user.name}</h2>
            <p className="opacity-60 flex items-center justify-center md:justify-start gap-2">
              <span>📍</span> {user.address}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className={`p-8 rounded-3xl border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <span>📋</span> Account Details
          </h3>
          <div className="space-y-4">
            {detailRows.map((row, i) => (
              <div key={i} className="flex justify-between items-center py-3 border-b border-slate-100 dark:border-slate-700 last:border-0">
                <span className="text-sm opacity-60">{row.label}</span>
                {row.isStatus ? (
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                    row.value === 'Active' ? 'bg-green-100 text-green-700 dark:bg-green-900/40' : 'bg-red-100 text-red-700 dark:bg-red-900/40'
                  }`}>
                    {row.value}
                  </span>
                ) : (
                  <span className="font-bold text-sm">{row.value}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className={`p-8 rounded-3xl border flex flex-col justify-center items-center text-center space-y-4 ${isDark ? 'bg-blue-900/20 border-blue-900' : 'bg-blue-50 border-blue-100'}`}>
          <div className="text-4xl">📞</div>
          <h3 className="text-lg font-bold">Need Help?</h3>
          <p className="text-sm opacity-70">If you have any issues with your connection, please call our 24/7 helpline.</p>
          <a
            href={`tel:${settings.helpline}`}
            className="mt-2 px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/25"
          >
            {settings.helpline}
          </a>
          <p className="text-[10px] opacity-40 uppercase tracking-widest mt-4">Office Address: {settings.address}</p>
        </div>
      </div>
    </div>
  );
};

export default CustomerProfile;
