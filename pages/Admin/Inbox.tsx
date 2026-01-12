
import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useApp } from '../../App';
import { Message } from '../../types';

const AdminInbox: React.FC = () => {
  const { customers, isDark, messages, setMessages } = useApp();
  const location = useLocation();
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);
  const [inputText, setInputText] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Check for auto-select from navigation state
  useEffect(() => {
    const state = location.state as { autoSelectId?: string } | null;
    if (state?.autoSelectId) {
      setSelectedCustomerId(state.autoSelectId);
    }
  }, [location]);

  const selectedCustomer = customers.find(c => c.id === selectedCustomerId);
  
  const filteredMessages = messages.filter(m => 
    (m.from === selectedCustomerId && m.to === 'ADMIN') || 
    (m.from === 'ADMIN' && m.to === selectedCustomerId)
  ).sort((a, b) => a.timestamp - b.timestamp);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [filteredMessages]);

  const handleSend = () => {
    if (!selectedCustomerId || !inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      from: 'ADMIN',
      fromName: 'Admin Assistant',
      to: selectedCustomerId,
      text: inputText,
      timestamp: Date.now(),
      isAdmin: true,
    };

    setMessages(prev => [...prev, newMessage]);
    setInputText('');
  };

  return (
    <div className="flex h-[calc(100vh-180px)] border rounded-3xl overflow-hidden shadow-2xl dark:border-slate-700 bg-white dark:bg-slate-900 animate-in zoom-in-95 duration-300">
      {/* Customer List Sidebar */}
      <div className={`w-full sm:w-80 flex flex-col border-r ${isDark ? 'bg-slate-800/40 border-slate-700' : 'bg-slate-50/50 border-slate-100'}`}>
        <div className="p-6 border-b dark:border-slate-700">
          <h3 className="text-lg font-black tracking-tight">SMS Gateway</h3>
          <p className="text-[10px] uppercase font-bold text-blue-500 mt-1">Active Connections</p>
        </div>
        <div className="flex-1 overflow-y-auto">
          {customers.length > 0 ? customers.map(c => {
            const customerMsgs = messages.filter(m => m.from === c.id || m.to === c.id);
            const lastMsg = customerMsgs[customerMsgs.length - 1];
            const hasUnread = customerMsgs.some(m => m.from === c.id && !m.isAdmin);

            return (
              <button
                key={c.id}
                onClick={() => setSelectedCustomerId(c.id)}
                className={`w-full p-4 flex items-center gap-4 text-left border-b transition-all relative group ${
                  selectedCustomerId === c.id 
                    ? 'bg-white dark:bg-slate-700 shadow-lg z-10 scale-[1.02]' 
                    : 'hover:bg-slate-100 dark:hover:bg-slate-800/50'
                } dark:border-slate-700/50`}
              >
                <div className="relative">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg shadow-sm ${
                    selectedCustomerId === c.id ? 'bg-blue-600 text-white' : 'bg-blue-100 dark:bg-blue-900 text-blue-600'
                  }`}>
                    {c.name.charAt(0)}
                  </div>
                  {hasUnread && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white dark:border-slate-800 rounded-full animate-pulse"></span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <p className="font-bold truncate text-sm">{c.name}</p>
                    {lastMsg && (
                      <span className="text-[9px] opacity-40 whitespace-nowrap ml-2">
                        {new Date(lastMsg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    )}
                  </div>
                  <p className="text-xs opacity-50 truncate mt-0.5">
                    {lastMsg ? (lastMsg.isAdmin ? `You: ${lastMsg.text}` : lastMsg.text) : 'Start a conversation...'}
                  </p>
                </div>
              </button>
            );
          }) : (
            <div className="p-8 text-center opacity-40 italic text-sm">No customers found.</div>
          )}
        </div>
      </div>

      {/* SMS Chat Interface */}
      <div className="flex-1 flex flex-col relative">
        {selectedCustomer ? (
          <>
            <div className={`p-4 border-b dark:border-slate-700 flex items-center justify-between ${isDark ? 'bg-slate-800/40' : 'bg-white'}`}>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xl">
                  👤
                </div>
                <div>
                  <h4 className="font-black text-sm">{selectedCustomer.name}</h4>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono opacity-50">{selectedCustomer.id}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                    <span className="text-[10px] font-bold text-green-500 uppercase tracking-tighter">Verified Link</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <a href={`tel:${selectedCustomer.mobile}`} className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">📞</a>
                <button className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">⚙️</button>
              </div>
            </div>

            <div className={`flex-1 overflow-y-auto p-6 space-y-4 bg-pattern ${isDark ? 'bg-slate-900' : 'bg-slate-50'}`}>
              <div className="flex justify-center mb-6">
                <span className="px-3 py-1 rounded-full bg-slate-200 dark:bg-slate-800 text-[10px] font-bold opacity-50 uppercase tracking-widest">
                  End-to-End Encrypted SMS
                </span>
              </div>
              
              {filteredMessages.map(msg => (
                <div key={msg.id} className={`flex flex-col ${msg.isAdmin ? 'items-end' : 'items-start'}`}>
                  <div className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm shadow-sm transition-transform hover:scale-[1.01] ${
                    msg.isAdmin 
                      ? 'bg-blue-600 text-white rounded-tr-none' 
                      : 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-tl-none border dark:border-slate-700'
                  }`}>
                    {msg.text}
                  </div>
                  <p className="text-[9px] mt-1.5 opacity-40 font-bold px-1">
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} 
                    {msg.isAdmin && ' • Delivered'}
                  </p>
                </div>
              ))}
              <div ref={chatEndRef} />
              
              {filteredMessages.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-30 mt-20">
                  <div className="w-20 h-20 rounded-full border-4 border-dashed border-slate-400 flex items-center justify-center text-4xl mb-4">💬</div>
                  <p className="font-bold text-lg">No SMS History</p>
                  <p className="text-sm">Send a message to reach {selectedCustomer.name}</p>
                </div>
              )}
            </div>

            <div className={`p-4 border-t dark:border-slate-700 ${isDark ? 'bg-slate-800/40' : 'bg-white'}`}>
              <div className="flex items-end gap-3 max-w-4xl mx-auto">
                <div className="flex-1 relative">
                  <textarea
                    rows={1}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                      }
                    }}
                    placeholder="Type SMS message..."
                    className={`w-full px-5 py-3 rounded-2xl outline-none border focus:ring-2 focus:ring-blue-500 transition-all resize-none ${
                      isDark ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'
                    }`}
                  />
                </div>
                <button
                  onClick={handleSend}
                  disabled={!inputText.trim()}
                  className="p-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/25 disabled:opacity-50 disabled:shadow-none active:scale-95"
                >
                  <span className="sm:hidden text-xl">➤</span>
                  <span className="hidden sm:inline px-4 uppercase text-xs tracking-widest">Send SMS</span>
                </button>
              </div>
              <p className="text-[10px] text-center mt-3 opacity-30 font-bold uppercase tracking-tighter">
                Messages are sent via Netcare Local SMS Gateway
              </p>
            </div>
          </>
        ) : (
          <div className={`h-full flex flex-col items-center justify-center text-center p-12 ${isDark ? 'bg-slate-900' : 'bg-slate-50'}`}>
            <div className="w-24 h-24 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-5xl mb-6 animate-pulse">
              📩
            </div>
            <h3 className="text-2xl font-black mb-2 tracking-tight">Select a Chat</h3>
            <p className="text-sm opacity-50 max-w-xs">Pick a customer from the left sidebar to view their SMS history and reply to complaints.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminInbox;
