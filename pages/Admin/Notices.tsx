
import React, { useState } from 'react';
import { useApp } from '../../App';
import { Notice } from '../../types';

const AdminNotices: React.FC = () => {
  const { notices, setNotices, isDark, t } = useApp();
  const [newNotice, setNewNotice] = useState<Partial<Notice>>({ isUrgent: false });

  const handleAdd = () => {
    if (!newNotice.title || !newNotice.content) return;
    const notice: Notice = {
      id: Date.now().toString(),
      title: newNotice.title,
      content: newNotice.content,
      date: new Date().toISOString().split('T')[0],
      isUrgent: !!newNotice.isUrgent
    };
    setNotices([notice, ...notices]);
    setNewNotice({ title: '', content: '', isUrgent: false });
  };

  const handleDelete = (id: string) => {
    setNotices(notices.filter(n => n.id !== id));
  };

  return (
    <div className="max-w-4xl space-y-8 animate-in fade-in duration-500">
      <h2 className="text-2xl font-bold">{t.notices} Management</h2>

      <div className={`p-8 rounded-3xl border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'}`}>
        <h3 className="text-lg font-bold mb-6">Create New Announcement</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold mb-2 opacity-70">Notice Title</label>
            <input
              type="text"
              placeholder="System Upgrade Notice"
              value={newNotice.title || ''}
              onChange={(e) => setNewNotice({...newNotice, title: e.target.value})}
              className={`w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500 ${isDark ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'}`}
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2 opacity-70">Content</label>
            <textarea
              rows={4}
              placeholder="Enter detailed notice information here..."
              value={newNotice.content || ''}
              onChange={(e) => setNewNotice({...newNotice, content: e.target.value})}
              className={`w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500 resize-none ${isDark ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'}`}
            />
          </div>
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="isUrgent"
              checked={newNotice.isUrgent}
              onChange={(e) => setNewNotice({...newNotice, isUrgent: e.target.checked})}
              className="w-5 h-5 rounded border-slate-300"
            />
            <label htmlFor="isUrgent" className="text-sm font-bold text-red-600">Mark as Urgent (Triggers Popup for Customers)</label>
          </div>
        </div>
        <button
          onClick={handleAdd}
          className="mt-8 w-full py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/25"
        >
          Publish Notice
        </button>
      </div>

      <div className="space-y-4">
        {notices.map(notice => (
          <div key={notice.id} className={`p-6 rounded-3xl border relative group ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'}`}>
             <div className="flex justify-between items-start">
               <div>
                 <div className="flex items-center gap-2 mb-2">
                   {notice.isUrgent && <span className="px-2 py-0.5 rounded bg-red-100 text-red-600 text-[10px] font-black uppercase">Urgent</span>}
                   <span className="text-[10px] font-bold opacity-40 uppercase">{notice.date}</span>
                 </div>
                 <h4 className="text-xl font-bold">{notice.title}</h4>
                 <p className="text-sm opacity-60 mt-2 whitespace-pre-wrap">{notice.content}</p>
               </div>
               <button
                 onClick={() => handleDelete(notice.id)}
                 className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
               >
                 🗑️
               </button>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminNotices;
