
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
      // Updated Admin Credentials as per user request
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
      // Customer login now checks the individual password set in Admin Panel
      // Falls back to 'cust123' for default pre-existing demo customers without a password field set
      const customerPassword = customer?.password || 'cust123';
      
      if (customer && password === customerPassword) { 
        setUser(customer);
      } else {
        setError('Customer ID not found or incorrect password.');
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className={`w-full max-w-md p-8 rounded-3xl shadow-2xl transition-all border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
        <div className="text-center mb-10">
          <img src={settings.logoUrl} alt="Logo" className="w-20 h-20 rounded-2xl mx-auto mb-4 object-cover shadow-lg" />
          <h1 className="text-2xl font-bold">{settings.appName}</h1>
          <p className="opacity-60 text-sm mt-1">Management Information System</p>
        </div>

        <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-xl mb-8">
          <button
            onClick={() => setRole('CUSTOMER')}
            className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${role === 'CUSTOMER' ? 'bg-white dark:bg-slate-700 shadow-sm' : 'opacity-60'}`}
          >
            Customer
          </button>
          <button
            onClick={() => setRole('ADMIN')}
            className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${role === 'ADMIN' ? 'bg-white dark:bg-slate-700 shadow-sm' : 'opacity-60'}`}
          >
            Admin
          </button>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-bold mb-2 opacity-70">
              {role === 'ADMIN' ? 'Email Address' : 'Customer ID'}
            </label>
            <input
              type={role === 'ADMIN' ? 'email' : 'text'}
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder={role === 'ADMIN' ? 'mdlimonmiya2002@gmail.com' : 'CID101'}
              className="w-full px-5 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2 opacity-70">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-5 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

          <button
            type="submit"
            className="w-full py-4 rounded-xl bg-blue-600 text-white font-bold text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/25 active:scale-95"
          >
            Sign In
          </button>
        </form>

        <div className="mt-8 text-center text-xs opacity-50 space-y-1">
          <p className="font-bold">Access Credentials:</p>
          <p>Admin: mdlimonmiya2002@gmail.com / limon2002</p>
          <p>Customer: Use the ID and Password set by Admin</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
