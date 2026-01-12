
import React, { useState } from 'react';
import { useApp } from '../App';
import { Role, User } from '../types';

const Login: React.FC = () => {
  const { setUser, isDark, settings, customers } = useApp();
  const [role, setRole] = useState<Role>('CUSTOMER');
  const [identifier, setIdentifier] = useState(''); // Email for Admin, ID for Customer
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (role === 'ADMIN') {
      // The credentials remain functional but are now hidden from the UI display
      if (identifier === 'mdlimonmiya2002@gmail.com' && password === 'limon2002') {
        const admin: User = {
          id: 'ADMIN001',
          name: 'Super Admin',
          email: 'mdlimonmiya2002@gmail.com',
          mobile: '01712345678',
          address: 'Main Office, Alamdanga',
          package: 'N/A',
          mbps: 0,
          price: 0,
          status: 'Active',
          role: 'ADMIN'
        };
        setUser(admin);
      } else {
        setError('Invalid admin credentials.');
      }
    } else {
      const customer = customers.find(c => c.id === identifier);
      // Customer login checks the individual password set in Admin Panel
      const customerPassword = customer?.password || 'cust123';
      
      if (customer && password === customerPassword) { 
        setUser(customer);
      } else {
        setError('Customer ID not found or incorrect password.');
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-6 bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
      <div className={`w-full max-w-md p-8 rounded-[2.5rem] shadow-2xl transition-all border ${isDark ? 'bg-slate-900/80 border-slate-800 backdrop-blur-xl' : 'bg-white/80 border-slate-200 backdrop-blur-xl'}`}>
        <div className="text-center mb-10">
          <div className="relative inline-block">
             <img src={settings.logoUrl} alt="Logo" className="w-24 h-24 rounded-3xl mx-auto mb-4 object-cover shadow-2xl rotate-3" />
             <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-xs shadow-lg">⚡</div>
          </div>
          <h1 className="text-3xl font-black tracking-tighter">{settings.appName}</h1>
          <p className="opacity-50 text-xs font-bold uppercase tracking-widest mt-2">Core Management Interface</p>
        </div>

        <div className="flex bg-slate-100 dark:bg-slate-800/50 p-1.5 rounded-2xl mb-8 border dark:border-slate-700">
          <button
            onClick={() => { setRole('CUSTOMER'); setError(''); }}
            className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${role === 'CUSTOMER' ? 'bg-white dark:bg-slate-700 shadow-xl scale-100' : 'opacity-40 scale-95 hover:opacity-100'}`}
          >
            Customer
          </button>
          <button
            onClick={() => { setRole('ADMIN'); setError(''); }}
            className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${role === 'ADMIN' ? 'bg-white dark:bg-slate-700 shadow-xl scale-100' : 'opacity-40 scale-95 hover:opacity-100'}`}
          >
            Admin
          </button>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest mb-2 opacity-50 ml-1">
              {role === 'ADMIN' ? 'Authorized Email' : 'Customer Account ID'}
            </label>
            <input
              type={role === 'ADMIN' ? 'email' : 'text'}
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder={role === 'ADMIN' ? 'administrator@netcare.com' : 'e.g. CID101'}
              className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium"
              required
            />
          </div>
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest mb-2 opacity-50 ml-1">Secure Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
              required
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 p-4 rounded-2xl bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 text-red-600 dark:text-red-400 text-xs font-bold animate-pulse">
               <span>⚠️</span> {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-5 rounded-2xl bg-blue-600 text-white font-black text-xs uppercase tracking-[0.2em] hover:bg-blue-700 transition-all shadow-2xl shadow-blue-500/30 active:scale-95 group"
          >
            Authenticate <span className="inline-block transition-transform group-hover:translate-x-1 ml-1">→</span>
          </button>
        </form>

        <div className="mt-10 text-center space-y-3">
          <p className="text-[10px] font-black uppercase tracking-widest opacity-20">Secure Access Protocol</p>
          <div className="flex flex-col gap-2 p-5 rounded-3xl bg-slate-50 dark:bg-slate-800/30 border border-dashed dark:border-slate-700">
             <p className="text-[10px] font-bold opacity-40 uppercase tracking-tighter">Login Guidance</p>
             {role === 'ADMIN' ? (
               <p className="text-xs font-medium opacity-60 italic">Please use your authorized administrator credentials provided during system setup.</p>
             ) : (
               <p className="text-xs font-medium opacity-60">Use the unique <span className="font-bold text-blue-600">ID</span> and <span className="font-bold text-blue-600">Password</span> assigned to you by the Netcare IT administration.</p>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
