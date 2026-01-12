
import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../App';
import { Message } from '../../types';

const CustomerSupport: React.FC = () => {
  const { user, isDark, t, messages, setMessages } = useApp();
  const [inputText, setInputText] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  if (!user) return null;

  const chatHistory = messages.filter(m => 
    (m.from === user.id && m.to === 'ADMIN') || 
    (m.from === 'ADMIN' && m.to === user.id)
  ).sort((a, b) => a.timestamp - b.timestamp);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  const handleSend = () => {
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      from: user.id,
      fromName: user.name,
      to: 'ADMIN',
      text: inputText,
      timestamp: Date.now(),
      isAdmin: false,
    };

    setMessages(prev => [...prev, newMessage]);
    setInputText('');
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-180px)] flex flex-col animate-in slide-in-from-right duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h2 className="text-3xl font-black tracking-tighter">{t.support}</h2>
          <p className="text-sm opacity-60">Reach out to our Netcare team via SMS.</p>
        </div>
        <div className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border dark:border-slate-700">
          <div className="relative">
            <span className="block w-2.5 h-2.5 rounded-full bg-green-500"></span>
            <span className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-green-500 animate-ping"></span>
          </div>
          <span className="text-xs font-black uppercase tracking-widest opacity-70">Admin Agent Online</span>
        </div>
      </div>

      <div className={`flex-1 flex flex-col border rounded-[2.5rem] overflow-hidden shadow-2xl ${isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'}`}>
        {/* Chat Header */}
        <div className={`px-6 py-4 border-b flex items-center gap-4 ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-100'}`}>
          <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-xl font-bold">
            N
          </div>
          <div>
            <h4 className="font-black text-sm">Netcare Helpdesk</h4>
            <p className="text-[10px] opacity-50 uppercase font-bold tracking-tighter">Typical reply time: 5 mins</p>
          </div>
        </div>

        {/* Chat Messages */}
        <div className={`flex-1 overflow-y-auto p-6 space-y-6 ${isDark ? 'bg-slate-900' : 'bg-slate-50/30'}`}>
          {chatHistory.length > 0 ? chatHistory.map(msg => (
            <div key={msg.id} className={`flex flex-col ${msg.isAdmin ? 'items-start' : 'items-end'}`}>
              <div className={`max-w-[85%] px-5 py-3 rounded-3xl text-sm shadow-sm transition-all hover:shadow-md ${
                msg.isAdmin 
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-tl-none border dark:border-slate-700' 
                  : 'bg-blue-600 text-white rounded-tr-none shadow-blue-500/20'
              }`}>
                {msg.text}
              </div>
              <div className="flex items-center gap-2 mt-1.5 px-1 opacity-50">
                <p className="text-[9px] font-bold">
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
                {!msg.isAdmin && <span className="text-[9px] uppercase tracking-tighter font-black">Sent via App SMS</span>}
              </div>
            </div>
          )) : (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-30 py-20">
               <div className="w-24 h-24 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-5xl mb-6 border-4 border-dashed border-slate-300">💬</div>
               <p className="text-xl font-black">No Messages Yet</p>
               <p className="text-sm mt-2 max-w-[200px]">Send us a message about any connection issues or billing queries.</p>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Chat Input */}
        <div className={`p-6 border-t dark:border-slate-700 ${isDark ? 'bg-slate-800/50' : 'bg-white'}`}>
          <div className="flex items-center gap-3 max-w-3xl mx-auto">
            <div className="flex-1 relative">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder={t.typeMessage}
                className={`w-full px-6 py-4 rounded-2xl outline-none border focus:ring-2 focus:ring-blue-500 transition-all shadow-inner ${
                  isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'
                }`}
              />
            </div>
            <button
              onClick={handleSend}
              disabled={!inputText.trim()}
              className="p-4 bg-blue-600 text-white rounded-2xl font-black hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/25 disabled:opacity-50 disabled:shadow-none active:scale-95"
            >
              <span className="hidden sm:inline px-4 text-xs tracking-[0.2em] uppercase">{t.send}</span>
              <span className="sm:hidden">➤</span>
            </button>
          </div>
          <p className="text-[9px] text-center mt-4 opacity-40 font-bold uppercase tracking-widest">
            Your connection: {user.package} Plan ({user.mbps} Mbps)
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomerSupport;
