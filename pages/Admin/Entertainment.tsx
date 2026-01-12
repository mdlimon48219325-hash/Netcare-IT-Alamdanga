
import React, { useState } from 'react';
import { useApp } from '../../App';
import { EntertainmentLink } from '../../types';

const AdminEntertainment: React.FC = () => {
  const { entLinks, setEntLinks, isDark, t } = useApp();
  const [newLink, setNewLink] = useState<Partial<EntertainmentLink>>({ type: 'Movie' });

  const handleAdd = () => {
    if (!newLink.title || !newLink.url) return;
    const link: EntertainmentLink = {
      id: Date.now().toString(),
      type: newLink.type as any,
      title: newLink.title,
      url: newLink.url
    };
    setEntLinks([...entLinks, link]);
    setNewLink({ type: 'Movie', title: '', url: '' });
  };

  const handleDelete = (id: string) => {
    setEntLinks(entLinks.filter(l => l.id !== id));
  };

  return (
    <div className="max-w-4xl space-y-8 animate-in fade-in duration-500">
      <h2 className="text-2xl font-bold">{t.entertainment} Management</h2>

      <div className={`p-8 rounded-3xl border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'}`}>
        <h3 className="text-lg font-bold mb-6">Add New Link</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <select
            value={newLink.type}
            onChange={(e) => setNewLink({...newLink, type: e.target.value as any})}
            className={`px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500 ${isDark ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'}`}
          >
            <option>Movie</option>
            <option>TV</option>
            <option>Drama</option>
          </select>
          <input
            type="text"
            placeholder="Title (e.g. FTP Server 1)"
            value={newLink.title || ''}
            onChange={(e) => setNewLink({...newLink, title: e.target.value})}
            className={`px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500 ${isDark ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'}`}
          />
          <input
            type="text"
            placeholder="URL (http://...)"
            value={newLink.url || ''}
            onChange={(e) => setNewLink({...newLink, url: e.target.value})}
            className={`md:col-span-2 px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500 ${isDark ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'}`}
          />
        </div>
        <button
          onClick={handleAdd}
          className="mt-6 w-full py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/25"
        >
          Add to Server List
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {entLinks.map(link => (
          <div key={link.id} className={`p-6 rounded-3xl border relative group transition-all hover:shadow-lg ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'}`}>
            <button
              onClick={() => handleDelete(link.id)}
              className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity p-2 text-red-500 bg-red-50 dark:bg-red-900/20 rounded-lg"
            >
              🗑️
            </button>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${
              link.type === 'Movie' ? 'bg-amber-100 text-amber-600' :
              link.type === 'TV' ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'
            }`}>
              {link.type === 'Movie' ? '🎬' : link.type === 'TV' ? '📺' : '🎭'}
            </div>
            <h4 className="font-bold">{link.title}</h4>
            <p className="text-[10px] uppercase font-black opacity-40 mt-1 tracking-widest">{link.type} Server</p>
            <p className="text-xs truncate opacity-60 mt-3">{link.url}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminEntertainment;
