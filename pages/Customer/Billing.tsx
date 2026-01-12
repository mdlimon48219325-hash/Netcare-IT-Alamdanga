
import React, { useState } from 'react';
import { useApp } from '../../App';

const CustomerBilling: React.FC = () => {
  const { user, t, isDark, settings } = useApp();
  const [txId, setTxId] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (txId.length < 8) return alert("Please enter a valid Transaction ID.");
    setSubmitted(true);
    setTxId('');
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{t.payBill}</h2>
        <div className={`px-4 py-2 rounded-xl text-sm font-bold ${isDark ? 'bg-slate-800' : 'bg-white shadow-sm'}`}>
          Due: <span className="text-blue-600">৳{user?.price}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { name: 'bKash', color: 'bg-[#e2136e]', number: settings.payments.bkash },
          { name: 'Nagad', color: 'bg-[#f04923]', number: settings.payments.nagad },
          { name: 'Rocket', color: 'bg-[#8c3494]', number: settings.payments.rocket },
        ].map((pm, i) => (
          <div key={i} className={`p-6 rounded-3xl text-white ${pm.color} shadow-xl shadow-slate-200 dark:shadow-none`}>
            <p className="text-xs uppercase font-black opacity-80 mb-1">{pm.name} Personal</p>
            <h3 className="text-xl font-black">{pm.number}</h3>
            <div className="mt-4 pt-4 border-t border-white/20 text-[10px] uppercase font-bold">
              Send Money to this number
            </div>
          </div>
        ))}
      </div>

      <div className={`p-8 rounded-3xl border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
        <h3 className="text-lg font-bold mb-6">Confirm Your Payment</h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold mb-2 opacity-70">{t.submitTx}</label>
            <input
              type="text"
              value={txId}
              onChange={(e) => setTxId(e.target.value.toUpperCase())}
              placeholder="e.g. AX92JK88"
              className={`w-full px-5 py-4 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500 font-mono ${isDark ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'}`}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-4 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/25"
          >
            Submit for Verification
          </button>
        </form>

        {submitted && (
          <div className="mt-6 p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 flex items-center gap-3">
            <span className="text-xl">✅</span>
            <p className="text-sm font-medium text-green-700 dark:text-green-400">
              Payment information submitted! Our team will verify it within 24 hours.
            </p>
          </div>
        )}
      </div>

      <div className="opacity-60 text-xs text-center">
        <p>⚠️ Always double-check the number before sending money.</p>
        <p>Keep the transaction confirmation SMS for reference.</p>
      </div>
    </div>
  );
};

export default CustomerBilling;
