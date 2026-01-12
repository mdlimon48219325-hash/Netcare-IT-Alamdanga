
import React from 'react';
import { useApp } from '../../App';

const CustomerEntertainment: React.FC = () => {
  const { entLinks, isDark, t } = useApp();

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold">{t.entertainment}</h2>
          <p className="text-sm opacity-60">Enjoy high-speed streaming on our local servers.</p>
        </div>
        <div className="text-right hidden sm:block">
          <p className="text-xs font-bold opacity-40 uppercase tracking-widest">Powered By</p>
          <p className="font-black text-blue-600">NETCARE BDIX</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {entLinks.length > 0 ? entLinks.map(link => (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`p-8 rounded-3xl border flex flex-col items-center text-center group transition-all hover:scale-105 active:scale-95 ${
              isDark ? 'bg-slate-800 border-slate-700 hover:bg-slate-700' : 'bg-white border-slate-100 hover:shadow-xl'
            }`}
          >
            <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-6 text-4xl shadow-inner ${
              link.type === 'Movie' ? 'bg-amber-100 text-amber-600' :
              link.type === 'TV' ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'
            }`}>
              {link.type === 'Movie' ? '🎬' : link.type === 'TV' ? '📺' : '🎭'}
            </div>
            <h4 className="text-xl font-bold group-hover:text-blue-600 transition-colors">{link.title}</h4>
            <span className="mt-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest opacity-40 border dark:border-slate-600">
              {link.type} SERVER
            </span>
            <div className="mt-6 flex items-center gap-2 text-blue-600 font-bold text-sm">
              Connect Now <span>→</span>
            </div>
          </a>
        )) : (
          <div className="col-span-full py-20 text-center opacity-40">
            <span className="text-6xl mb-6">📡</span>
            <p className="text-xl font-bold">No servers available right now.</p>
            <p>Our team is updating the network links.</p>
          </div>
        )}
      </div>

      <div className={`p-8 rounded-3xl border-2 border-dashed flex flex-col items-center text-center space-y-4 ${isDark ? 'border-slate-700' : 'border-slate-200'}`}>
         <div className="text-3xl">🧩</div>
         <h4 className="font-bold">Missing something?</h4>
         <p className="text-sm opacity-60 max-w-sm">If you want us to add a specific movie server or live TV channel, please send a message to our support team.</p>
      </div>
    </div>
  );
};

export default CustomerEntertainment;
