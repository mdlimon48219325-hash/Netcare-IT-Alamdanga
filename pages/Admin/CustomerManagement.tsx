
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../App';
import { User } from '../../types';

const CustomerManagement: React.FC = () => {
  const { t, customers, setCustomers, setDeletedCustomers, isDark } = useApp();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modals visibility
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  // Form States
  const [formCust, setFormCust] = useState<Partial<User>>({});

  const handleDelete = (id: string) => {
    if (window.confirm(t.confirmDelete)) {
      const customer = customers.find(c => c.id === id);
      if (customer) {
        setCustomers(customers.filter(c => c.id !== id));
        setDeletedCustomers(prev => [...prev, customer]);
      }
    }
  };

  const openEditModal = (customer: User) => {
    setFormCust(customer);
    setIsEditModalOpen(true);
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customers.some(c => c.id === formCust.id)) {
      alert("This Customer ID already exists.");
      return;
    }
    const newCustomer: User = {
      ...(formCust as User),
      status: formCust.status || 'Active',
      role: 'CUSTOMER'
    };
    setCustomers(prev => [...prev, newCustomer]);
    setIsAddModalOpen(false);
    resetForm();
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCustomers(customers.map(c => c.id === formCust.id ? { ...c, ...formCust } as User : c));
    setIsEditModalOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setFormCust({
      id: `CID${Date.now().toString().slice(-4)}`,
      name: '',
      mobile: '',
      address: '',
      package: 'Silver',
      mbps: 10,
      price: 500,
      password: '',
      status: 'Active'
    });
  };

  const handleSendMessage = (id: string) => {
    // Navigate to inbox and pass state to auto-select the customer
    navigate('/inbox', { state: { autoSelectId: id } });
  };

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.mobile.includes(searchTerm)
  );

  return (
    <div className="space-y-6 relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black tracking-tight">{t.customers}</h2>
          <p className="text-xs opacity-50 uppercase font-bold tracking-widest mt-1">Database Management</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 opacity-40">🔍</span>
            <input
              type="text"
              placeholder="Search by ID, Name, or Mobile..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-3 rounded-2xl border outline-none focus:ring-4 focus:ring-blue-500/10 transition-all ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}
            />
          </div>
          <button 
            onClick={() => {
              resetForm();
              setIsAddModalOpen(true);
            }}
            className="px-6 py-3 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/25 whitespace-nowrap active:scale-95"
          >
            + {t.addCustomer}
          </button>
        </div>
      </div>

      <div className={`rounded-[2.5rem] border overflow-hidden shadow-sm ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'}`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className={`text-[10px] uppercase font-black tracking-widest opacity-40 border-b ${isDark ? 'border-slate-700 bg-slate-900/30' : 'border-slate-100 bg-slate-50'}`}>
                <th className="px-8 py-5">Identifer</th>
                <th className="px-8 py-5">Profile</th>
                <th className="px-8 py-5">Connectivity</th>
                <th className="px-8 py-5">Bill</th>
                <th className="px-8 py-5">Health</th>
                <th className="px-8 py-5 text-right">Quick Control</th>
              </tr>
            </thead>
            <tbody className="divide-y dark:divide-slate-700">
              {filteredCustomers.map(c => (
                <tr key={c.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-all group">
                  <td className="px-8 py-5">
                    <span className="font-mono text-xs font-bold bg-slate-100 dark:bg-slate-900 px-2 py-1 rounded-lg border dark:border-slate-800">{c.id}</span>
                  </td>
                  <td className="px-8 py-5">
                    <p className="font-black text-sm">{c.name}</p>
                    <p className="text-[10px] opacity-40 font-bold uppercase">{c.mobile}</p>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2">
                       <span className="text-xs font-black text-blue-600 dark:text-blue-400">{c.package}</span>
                       <span className="text-[10px] opacity-40">/</span>
                       <span className="text-[10px] font-bold opacity-60">{c.mbps} Mbps</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="font-black text-sm">৳{c.price}</span>
                  </td>
                  <td className="px-8 py-5">
                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter ${
                      c.status === 'Active' ? 'bg-green-100 text-green-700 dark:bg-green-900/40' : 'bg-red-100 text-red-700 dark:bg-red-900/40'
                    }`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleSendMessage(c.id)}
                        className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 hover:bg-blue-600 hover:text-white transition-all"
                        title="Send SMS"
                      >
                        💬
                      </button>
                      <button
                        onClick={() => openEditModal(c)}
                        className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-900 dark:hover:bg-white hover:text-white dark:hover:text-slate-900 transition-all"
                        title="Edit Full Profile"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDelete(c.id)}
                        className="p-2.5 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 hover:bg-red-600 hover:text-white transition-all"
                        title="Move to Trash"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredCustomers.length === 0 && (
            <div className="p-20 text-center flex flex-col items-center justify-center opacity-20">
              <span className="text-6xl mb-4">🔍</span>
              <p className="font-bold text-xl uppercase tracking-[0.2em]">Zero Results</p>
            </div>
          )}
        </div>
      </div>

      {/* Shared Modal Logic for Add/Edit */}
      {(isAddModalOpen || isEditModalOpen) && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className={`w-full max-w-2xl rounded-[2.5rem] shadow-2xl p-10 overflow-y-auto max-h-[90vh] border ${isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'}`}>
            <h3 className="text-3xl font-black mb-8 flex items-center gap-3 tracking-tighter">
              <span className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-2xl text-2xl">{isAddModalOpen ? '👤' : '✏️'}</span>
              {isAddModalOpen ? t.addCustomer : 'Edit Customer Profile'}
            </h3>
            
            <form onSubmit={isAddModalOpen ? handleAddSubmit : handleEditSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              {/* ID and Password Row */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-1">{t.id}</label>
                <input
                  required
                  disabled={isEditModalOpen}
                  type="text"
                  value={formCust.id}
                  onChange={e => setFormCust({...formCust, id: e.target.value})}
                  className={`w-full px-5 py-3.5 rounded-2xl border outline-none focus:ring-2 focus:ring-blue-500 transition-all font-mono text-sm ${isDark ? 'bg-slate-900 border-slate-700 disabled:opacity-30' : 'bg-slate-50 border-slate-200 disabled:bg-slate-100'}`}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-1">{t.password}</label>
                <input
                  required
                  type="text"
                  value={formCust.password}
                  onChange={e => setFormCust({...formCust, password: e.target.value})}
                  className={`w-full px-5 py-3.5 rounded-2xl border outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm ${isDark ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'}`}
                />
              </div>

              {/* Name and Mobile Row */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-1">{t.customerName}</label>
                <input
                  required
                  type="text"
                  value={formCust.name}
                  onChange={e => setFormCust({...formCust, name: e.target.value})}
                  className={`w-full px-5 py-3.5 rounded-2xl border outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm ${isDark ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'}`}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-1">{t.mobileNumber}</label>
                <input
                  required
                  type="tel"
                  value={formCust.mobile}
                  onChange={e => setFormCust({...formCust, mobile: e.target.value})}
                  className={`w-full px-5 py-3.5 rounded-2xl border outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm ${isDark ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'}`}
                />
              </div>

              {/* Address - Span full row */}
              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-1">{t.address}</label>
                <input
                  required
                  type="text"
                  value={formCust.address}
                  onChange={e => setFormCust({...formCust, address: e.target.value})}
                  className={`w-full px-5 py-3.5 rounded-2xl border outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm ${isDark ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'}`}
                />
              </div>

              {/* Package, Speed, Price Row */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-1">{t.package}</label>
                <select
                  value={formCust.package}
                  onChange={e => setFormCust({...formCust, package: e.target.value})}
                  className={`w-full px-5 py-3.5 rounded-2xl border outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm appearance-none ${isDark ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'}`}
                >
                  <option>Silver</option>
                  <option>Gold</option>
                  <option>Platinum</option>
                  <option>Diamond</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-1">{t.mbps}</label>
                <input
                  type="number"
                  value={formCust.mbps}
                  onChange={e => setFormCust({...formCust, mbps: parseInt(e.target.value)})}
                  className={`w-full px-5 py-3.5 rounded-2xl border outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm ${isDark ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'}`}
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-1">{t.price}</label>
                <input
                  type="number"
                  value={formCust.price}
                  onChange={e => setFormCust({...formCust, price: parseInt(e.target.value)})}
                  className={`w-full px-5 py-3.5 rounded-2xl border outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm ${isDark ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'}`}
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-1">Account Health Status</label>
                <select
                  value={formCust.status}
                  onChange={e => setFormCust({...formCust, status: e.target.value as any})}
                  className={`w-full px-5 py-3.5 rounded-2xl border outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm font-bold ${
                    formCust.status === 'Active' ? 'text-green-600' : 'text-red-600'
                  } ${isDark ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'}`}
                >
                  <option value="Active">🟢 ACTIVE</option>
                  <option value="Expired">🔴 EXPIRED</option>
                </select>
              </div>

              <div className="md:col-span-2 flex gap-4 pt-6">
                <button
                  type="button"
                  onClick={() => { setIsAddModalOpen(false); setIsEditModalOpen(false); }}
                  className="flex-1 py-5 rounded-[1.25rem] bg-slate-100 dark:bg-slate-700 font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all"
                >
                  Discard Changes
                </button>
                <button
                  type="submit"
                  className="flex-1 py-5 rounded-[1.25rem] bg-blue-600 text-white font-black text-xs uppercase tracking-[0.2em] hover:bg-blue-700 transition-all shadow-2xl shadow-blue-500/25 active:scale-95"
                >
                  {isAddModalOpen ? 'Create Profile' : 'Commit Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerManagement;
