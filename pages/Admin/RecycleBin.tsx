
import React from 'react';
import { useApp } from '../../App';

const RecycleBin: React.FC = () => {
  const { t, deletedCustomers, setDeletedCustomers, setCustomers, isDark } = useApp();

  const handleRestore = (id: string) => {
    const customer = deletedCustomers.find(c => c.id === id);
    if (customer) {
      setDeletedCustomers(deletedCustomers.filter(c => c.id !== id));
      setCustomers(prev => [...prev, customer]);
    }
  };

  const handlePermanentDelete = (id: string) => {
    if (window.confirm("Delete permanently? This action cannot be undone.")) {
      setDeletedCustomers(deletedCustomers.filter(c => c.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{t.recycleBin}</h2>
        <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-bold opacity-60">
          {deletedCustomers.length} Items
        </span>
      </div>

      {deletedCustomers.length > 0 ? (
        <div className={`rounded-3xl border overflow-hidden ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'}`}>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className={`text-xs uppercase font-black opacity-60 border-b ${isDark ? 'border-slate-700 bg-slate-900/30' : 'border-slate-100 bg-slate-50'}`}>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Deleted From</th>
                  <th className="px-6 py-4 text-right">{t.actions}</th>
                </tr>
              </thead>
              <tbody className="divide-y dark:divide-slate-700">
                {deletedCustomers.map(c => (
                  <tr key={c.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-bold">{c.name}</p>
                      <p className="text-xs opacity-60">{c.id} • {c.mobile}</p>
                    </td>
                    <td className="px-6 py-4 text-sm opacity-60">Customer Management</td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        onClick={() => handleRestore(c.id)}
                        className="px-4 py-2 rounded-lg bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400 font-bold text-xs hover:bg-green-200 transition-all"
                      >
                        {t.restore}
                      </button>
                      <button
                        onClick={() => handlePermanentDelete(c.id)}
                        className="px-4 py-2 rounded-lg bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400 font-bold text-xs hover:bg-red-200 transition-all"
                      >
                        Delete Permanently
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="p-20 flex flex-col items-center justify-center text-center opacity-40">
          <span className="text-6xl mb-6">🗑️</span>
          <p className="text-xl font-bold">Recycle Bin is empty</p>
          <p className="text-sm mt-1">Deleted customers will appear here for 30 days.</p>
        </div>
      )}
    </div>
  );
};

export default RecycleBin;
