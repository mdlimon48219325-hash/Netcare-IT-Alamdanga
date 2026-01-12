
import React, { useState } from 'react';
import { useApp } from '../../App';

const AdminSettings: React.FC = () => {
  const { settings, setSettings, isDark, t } = useApp();
  const [localSettings, setLocalSettings] = useState(settings);

  const handleSave = () => {
    setSettings(localSettings);
    alert("Settings saved successfully!");
  };

  return (
    <div className="max-w-4xl space-y-8 animate-in fade-in duration-500">
      <h2 className="text-2xl font-bold">{t.settings}</h2>

      <div className={`p-8 rounded-3xl border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'}`}>
        <h3 className="text-lg font-bold mb-8 flex items-center gap-2">
          <span>🛠️</span> Branding & Contact
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold mb-2 opacity-70">App Name</label>
              <input
                type="text"
                value={localSettings.appName}
                onChange={(e) => setLocalSettings({...localSettings, appName: e.target.value})}
                className={`w-full px-4 py-2 rounded-xl border outline-none ${isDark ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'}`}
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2 opacity-70">Logo URL</label>
              <input
                type="text"
                value={localSettings.logoUrl}
                onChange={(e) => setLocalSettings({...localSettings, logoUrl: e.target.value})}
                className={`w-full px-4 py-2 rounded-xl border outline-none ${isDark ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'}`}
              />
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold mb-2 opacity-70">Helpline Number</label>
              <input
                type="text"
                value={localSettings.helpline}
                onChange={(e) => setLocalSettings({...localSettings, helpline: e.target.value})}
                className={`w-full px-4 py-2 rounded-xl border outline-none ${isDark ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'}`}
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2 opacity-70">Office Address</label>
              <textarea
                rows={3}
                value={localSettings.address}
                onChange={(e) => setLocalSettings({...localSettings, address: e.target.value})}
                className={`w-full px-4 py-2 rounded-xl border outline-none resize-none ${isDark ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'}`}
              />
            </div>
          </div>
        </div>
      </div>

      <div className={`p-8 rounded-3xl border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'}`}>
        <h3 className="text-lg font-bold mb-8 flex items-center gap-2">
          <span>💰</span> {t.paymentNumbers}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-bold mb-2 opacity-70">bKash (Personal)</label>
            <input
              type="text"
              value={localSettings.payments.bkash}
              onChange={(e) => setLocalSettings({...localSettings, payments: {...localSettings.payments, bkash: e.target.value}})}
              className={`w-full px-4 py-2 rounded-xl border outline-none ${isDark ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'}`}
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2 opacity-70">Nagad (Personal)</label>
            <input
              type="text"
              value={localSettings.payments.nagad}
              onChange={(e) => setLocalSettings({...localSettings, payments: {...localSettings.payments, nagad: e.target.value}})}
              className={`w-full px-4 py-2 rounded-xl border outline-none ${isDark ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'}`}
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2 opacity-70">Rocket (Personal)</label>
            <input
              type="text"
              value={localSettings.payments.rocket}
              onChange={(e) => setLocalSettings({...localSettings, payments: {...localSettings.payments, rocket: e.target.value}})}
              className={`w-full px-4 py-2 rounded-xl border outline-none ${isDark ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'}`}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button
          onClick={handleSave}
          className="px-10 py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/25 active:scale-95"
        >
          {t.save} Settings
        </button>
      </div>
    </div>
  );
};

export default AdminSettings;
