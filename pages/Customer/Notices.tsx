
import React from 'react';
import { useApp } from '../../App';

const CustomerNotices: React.FC = () => {
  const { notices, isDark, t } = useApp();

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-top duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">{t.notices}</h2>
          <p className="text-sm opacity-60">Stay updated with the latest ISP announcements.</p>
        </div>
        <div className="flex gap-2">
           <div className="flex items-center gap-1">
             <span className="w-2 h-2 rounded-full bg-red-500"></span>
             <span className="text-[10px] font-black uppercase opacity-60">Urgent</span>
           </div>
           <div className="flex items-center gap-1">
             <span className="w-2 h-2 rounded-full bg-blue-500"></span>
             <span className="text-[10px] font-black uppercase opacity-60">General</span>
           </div>
        </div>
      </div>

      <div className="space-y-6">
        {notices.length > 0 ? notices.map(n => (
          <div key={n.id} className={`p-8 rounded-3xl border transition-all hover:shadow-lg ${
            isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'
          } ${n.isUrgent ? 'border-l-8 border-l-red-500' : 'border-l-8 border-l-blue-500'}`}>
            <div className="flex justify-between items-start mb-4">
               <span className="text-[10px] font-black opacity-40 uppercase tracking-widest">{n.date}</span>
               {n.isUrgent && <span className="flex items-center gap-1 text-red-600 font-black text-[10px] uppercase animate-pulse">
                 <span>🔔</span> Critical Alert
               </span>}
            </div>
            <h3 className="text-xl font-black mb-3">{n.title}</h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
              {n.content}
            </p>
          </div>
        )) : (
          <div className="py-20 text-center opacity-40">
             <span className="text-6xl mb-6">📭</span>
             <p className="text-xl font-bold">No new notices today.</p>
             <p>Check back later for updates.</p>
          </div>
        )}
      </div>

      <div className={`p-6 rounded-3xl bg-glass border ${isDark ? 'border-slate-700' : 'border-slate-100'} flex items-center gap-4`}>
         <div className="text-2xl">📧</div>
         <p className="text-xs opacity-60">Important notices are also sent to your registered mobile number as SMS alerts.</p>
      </div>
    </div>
  );
};

export default CustomerNotices;
