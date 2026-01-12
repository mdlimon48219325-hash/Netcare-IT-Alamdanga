
import React, { useState } from 'react';
import { useApp } from '../../App';
import { User } from '../../types';

const CustomerManagement: React.FC = () => {
  const { t, customers, setCustomers, setDeletedCustomers, isDark } = useApp();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [tempPrice, setTempPrice] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  // New Customer Form State
  const [newCust, setNewCust] = useState({
    id: `CID${Date.now().toString().slice(-4)}`,
    name: '',
    mobile: '',
    address: '',
    package: 'Silver',
    mbps: 10,
    price: 500,
    password: ''
  });

  const handleDelete = (id: string) => {
    if (window.confirm(t.confirmDelete)) {
      const customer = customers.find(c => c.id === id);
      if (customer) {
        setCustomers(customers.filter(c => c.id !== id));
        setDeletedCustomers(prev => [...prev, customer]);
      }
    }
  };

  const handleEditPrice = (customer: User) => {
    setEditingId(customer.id);
    setTempPrice(customer.price);
  };

  const savePrice = (id: string) => {
    setCustomers(customers.map(c => c.id === id ? { ...c, price: tempPrice } : c));
    setEditingId(null);
  };

  const handleAddCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if ID already exists
    if (customers.some(c => c.id === newCust.id)) {
      alert("This Customer ID already exists. Please choose a unique one.");
      return;
    }

    const newCustomer: User = {
      ...newCust,
      status: 'Active',
      role: 'CUSTOMER'
    };
    setCustomers(prev => [...prev, newCustomer]);
    setIsAddModalOpen(false);
    // Reset form with new temporary ID
    setNewCust({ 
      id: `CID${Date.now().toString().slice(-4)}`,
      name: '', 
      mobile: '', 
      address: '', 
      package: 'Silver', 
      mbps: 10, 
      price: 500,
      password: ''
    });
  };

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.mobile.includes(searchTerm)
  );

  return (
    <div className="space-y-6 relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold">{t.customers}</h2>
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 opacity-40">🔍</span>
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500 ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}
            />
          </div>
          <button 
            onClick={() => {
              setNewCust(prev => ({ ...prev, id: `CID${Date.now().toString().slice(-4)}` }));
              setIsAddModalOpen(true);
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/30 whitespace-nowrap"
          >
            + {t.addCustomer}
          </button>
        </div>
      </div>

      <div className={`rounded-3xl border overflow-hidden ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'}`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className={`text-xs uppercase font-black opacity-60 border-b ${isDark ? 'border-slate-700 bg-slate-900/30' : 'border-slate-100 bg-slate-50'}`}>
                <th className="px-6 py-4">{t.id}</th>
                <th className="px-6 py-4">Name & Mobile</th>
                <th className="px-6 py-4">{t.package}</th>
                <th className="px-6 py-4">Price (Monthly)</th>
                <th className="px-6 py-4">{t.status}</th>
                <th className="px-6 py-4 text-right">{t.actions}</th>
              </tr>
            </thead>
            <tbody className="divide-y dark:divide-slate-700">
              {filteredCustomers.map(c => (
                <tr key={c.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-colors">
                  <td className="px-6 py-4 font-mono text-sm">{c.id}</td>
                  <td className="px-6 py-4">
                    <p className="font-bold">{c.name}</p>
                    <p className="text-xs opacity-60">{c.mobile}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium">{c.package}</span>
                    <span className="ml-2 px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-[10px]">{c.mbps} Mbps</span>
                  </td>
                  <td className="px-6 py-4">
                    {editingId === c.id ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          value={tempPrice}
                          onChange={(e) => setTempPrice(Number(e.target.value))}
                          className="w-20 px-2 py-1 rounded border border-blue-500 bg-transparent text-sm"
                        />
                        <button onClick={() => savePrice(c.id)} className="text-green-500">✅</button>
                        <button onClick={() => setEditingId(null)} className="text-red-500">❌</button>
                      </div>
                    ) : (
                      <span className="font-bold">৳{c.price}</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                      c.status === 'Active' ? 'bg-green-100 text-green-700 dark:bg-green-900/40' : 'bg-red-100 text-red-700 dark:bg-red-900/40'
                    }`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      onClick={() => handleEditPrice(c)}
                      className="p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-600 transition-colors"
                      title={t.editPrice}
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDelete(c.id)}
                      className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 transition-colors"
                      title={t.delete}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredCustomers.length === 0 && (
            <div className="p-12 text-center opacity-40">No customers found.</div>
          )}
        </div>
      </div>

      {/* Add Customer Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className={`w-full max-w-xl rounded-3xl shadow-2xl p-8 overflow-y-auto max-h-[90vh] ${isDark ? 'bg-slate-800 text-white' : 'bg-white text-slate-900'}`}>
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span>👤</span> {t.addCustomer}
            </h3>
            <form onSubmit={handleAddCustomer} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black uppercase opacity-60 mb-2">{t.id}</label>
                  <input
                    required
                    type="text"
                    value={newCust.id}
                    onChange={e => setNewCust({...newCust, id: e.target.value})}
                    placeholder="e.g. CID101"
                    className={`w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500 ${isDark ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'}`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase opacity-60 mb-2">{t.password}</label>
                  <input
                    required
                    type="text"
                    value={newCust.password}
                    onChange={e => setNewCust({...newCust, password: e.target.value})}
                    placeholder="Customer Login Password"
                    className={`w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500 ${isDark ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'}`}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black uppercase opacity-60 mb-2">{t.customerName}</label>
                  <input
                    required
                    type="text"
                    value={newCust.name}
                    onChange={e => setNewCust({...newCust, name: e.target.value})}
                    className={`w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500 ${isDark ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'}`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase opacity-60 mb-2">{t.mobileNumber}</label>
                  <input
                    required
                    type="tel"
                    value={newCust.mobile}
                    onChange={e => setNewCust({...newCust, mobile: e.target.value})}
                    className={`w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500 ${isDark ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'}`}
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-black uppercase opacity-60 mb-2">{t.address}</label>
                <input
                  required
                  type="text"
                  value={newCust.address}
                  onChange={e => setNewCust({...newCust, address: e.target.value})}
                  className={`w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500 ${isDark ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'}`}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-black uppercase opacity-60 mb-2">{t.package}</label>
                  <select
                    value={newCust.package}
                    onChange={e => setNewCust({...newCust, package: e.target.value})}
                    className={`w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500 ${isDark ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'}`}
                  >
                    <option>Silver</option>
                    <option>Gold</option>
                    <option>Platinum</option>
                    <option>Diamond</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-black uppercase opacity-60 mb-2">{t.mbps}</label>
                  <input
                    type="number"
                    value={newCust.mbps}
                    onChange={e => setNewCust({...newCust, mbps: parseInt(e.target.value)})}
                    className={`w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500 ${isDark ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'}`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase opacity-60 mb-2">{t.price}</label>
                  <input
                    type="number"
                    value={newCust.price}
                    onChange={e => setNewCust({...newCust, price: parseInt(e.target.value)})}
                    className={`w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500 ${isDark ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'}`}
                  />
                </div>
              </div>
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 py-4 rounded-xl bg-slate-100 dark:bg-slate-700 font-bold hover:bg-slate-200 transition-all"
                >
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  className="flex-1 py-4 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/25"
                >
                  {t.save} Customer
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
