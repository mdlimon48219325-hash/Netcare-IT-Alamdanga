
import React, { useState, useEffect, createContext, useContext } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { translations } from './translations';
import { User, Role, AppSettings, Notice, Message, EntertainmentLink, Transaction } from './types';
import Login from './pages/Login';
import AdminDashboard from './pages/Admin/Dashboard';
import CustomerManagement from './pages/Admin/CustomerManagement';
import AdminInbox from './pages/Admin/Inbox';
import AdminEntertainment from './pages/Admin/Entertainment';
import AdminNotices from './pages/Admin/Notices';
import AdminSettings from './pages/Admin/Settings';
import RecycleBin from './pages/Admin/RecycleBin';
import CustomerProfile from './pages/Customer/Profile';
import CustomerBilling from './pages/Customer/Billing';
import CustomerSupport from './pages/Customer/Support';
import CustomerEntertainment from './pages/Customer/Entertainment';
import CustomerNotices from './pages/Customer/Notices';

// --- Contexts ---
interface AppContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  lang: 'en' | 'bn';
  setLang: React.Dispatch<React.SetStateAction<'en' | 'bn'>>;
  isDark: boolean;
  setIsDark: React.Dispatch<React.SetStateAction<boolean>>;
  t: any;
  settings: AppSettings;
  setSettings: React.Dispatch<React.SetStateAction<AppSettings>>;
  notices: Notice[];
  setNotices: React.Dispatch<React.SetStateAction<Notice[]>>;
  customers: User[];
  setCustomers: React.Dispatch<React.SetStateAction<User[]>>;
  deletedCustomers: User[];
  setDeletedCustomers: React.Dispatch<React.SetStateAction<User[]>>;
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  entLinks: EntertainmentLink[];
  setEntLinks: React.Dispatch<React.SetStateAction<EntertainmentLink[]>>;
  transactions: Transaction[];
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('netcare_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [lang, setLang] = useState<'en' | 'bn'>(() => (localStorage.getItem('netcare_lang') as 'en' | 'bn') || 'en');
  const [isDark, setIsDark] = useState<boolean>(() => localStorage.getItem('netcare_theme') === 'dark');
  const [settings, setSettings] = useState<AppSettings>(() => {
    const saved = localStorage.getItem('netcare_settings');
    return saved ? JSON.parse(saved) : {
      appName: "Netcare IT Alamdanga",
      logoUrl: "https://picsum.photos/seed/netcare/200/200",
      helpline: "+880 1700-000000",
      address: "Alamdanga, Chuadanga, Bangladesh",
      payments: { bkash: "01700000001", nagad: "01700000002", rocket: "01700000003" }
    };
  });

  const [notices, setNotices] = useState<Notice[]>(() => {
    const saved = localStorage.getItem('netcare_notices');
    return saved ? JSON.parse(saved) : [
      { id: '1', title: 'System Maintenance', content: 'Our servers will be down from 2 AM to 4 AM tonight.', date: '2023-10-25', isUrgent: true }
    ];
  });

  const [customers, setCustomers] = useState<User[]>(() => {
    const saved = localStorage.getItem('netcare_customers');
    return saved ? JSON.parse(saved) : [
      { id: 'CID101', name: 'Zahirul Islam', mobile: '01711223344', address: 'Ward 5, Alamdanga', package: 'Platinum', mbps: 20, price: 1200, status: 'Active', role: 'CUSTOMER' },
      { id: 'CID102', name: 'Rahat Khan', mobile: '01855667788', address: 'Bazar Road, Alamdanga', package: 'Gold', mbps: 10, price: 800, status: 'Expired', role: 'CUSTOMER' }
    ];
  });

  const [deletedCustomers, setDeletedCustomers] = useState<User[]>(() => {
    const saved = localStorage.getItem('netcare_deleted');
    return saved ? JSON.parse(saved) : [];
  });

  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem('netcare_messages');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [entLinks, setEntLinks] = useState<EntertainmentLink[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    localStorage.setItem('netcare_user', JSON.stringify(user));
    localStorage.setItem('netcare_lang', lang);
    localStorage.setItem('netcare_theme', isDark ? 'dark' : 'light');
    localStorage.setItem('netcare_settings', JSON.stringify(settings));
    localStorage.setItem('netcare_notices', JSON.stringify(notices));
    localStorage.setItem('netcare_customers', JSON.stringify(customers));
    localStorage.setItem('netcare_deleted', JSON.stringify(deletedCustomers));
    localStorage.setItem('netcare_messages', JSON.stringify(messages));
    if (isDark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [user, lang, isDark, settings, notices, customers, deletedCustomers, messages]);

  const t = translations[lang];

  const value = {
    user, setUser, lang, setLang, isDark, setIsDark, t,
    settings, setSettings, notices, setNotices,
    customers, setCustomers, deletedCustomers, setDeletedCustomers,
    messages, setMessages, entLinks, setEntLinks, transactions, setTransactions
  };

  return (
    <AppContext.Provider value={value}>
      <Router>
        <div className={`min-h-screen transition-colors duration-200 ${isDark ? 'dark bg-slate-900 text-white' : 'bg-slate-50 text-slate-900'}`}>
          <Routes>
            <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
            <Route path="/" element={user ? <Layout /> : <Navigate to="/login" />}>
              <Route index element={user?.role === 'ADMIN' ? <AdminDashboard /> : <CustomerProfile />} />
              <Route path="customers" element={<CustomerManagement />} />
              <Route path="inbox" element={<AdminInbox />} />
              <Route path="entertainment" element={user?.role === 'ADMIN' ? <AdminEntertainment /> : <CustomerEntertainment />} />
              <Route path="notices" element={user?.role === 'ADMIN' ? <AdminNotices /> : <CustomerNotices />} />
              <Route path="recycle-bin" element={<RecycleBin />} />
              <Route path="settings" element={<AdminSettings />} />
              <Route path="billing" element={<CustomerBilling />} />
              <Route path="support" element={<CustomerSupport />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </AppContext.Provider>
  );
};

const Layout: React.FC = () => {
  const { user, lang, setLang, isDark, setIsDark, t, settings, setUser, notices } = useApp();
  const location = useLocation();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const urgent = notices.find(n => n.isUrgent);
    if (urgent) setShowPopup(true);
  }, [notices]);

  const handleLogout = () => {
    setUser(null);
  };

  const navItems = user?.role === 'ADMIN' ? [
    { label: t.dashboard, path: '/', icon: '📊' },
    { label: t.customers, path: '/customers', icon: '👥' },
    { label: t.inbox, path: '/inbox', icon: '📩' },
    { label: t.entertainment, path: '/entertainment', icon: '🎬' },
    { label: t.notices, path: '/notices', icon: '📢' },
    { label: t.recycleBin, path: '/recycle-bin', icon: '🗑️' },
    { label: t.settings, path: '/settings', icon: '⚙️' },
  ] : [
    { label: t.profile, path: '/', icon: '👤' },
    { label: t.payBill, path: '/billing', icon: '💳' },
    { label: t.support, path: '/support', icon: '💬' },
    { label: t.entertainment, path: '/entertainment', icon: '🍿' },
    { label: t.notices, path: '/notices', icon: '🔔' },
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      <aside className={`hidden md:flex flex-col w-64 ${isDark ? 'bg-slate-800 border-r border-slate-700' : 'bg-white border-r border-slate-200'}`}>
        <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex items-center gap-3">
          <img src={settings.logoUrl} alt="Logo" className="w-10 h-10 rounded-lg object-cover" />
          <h1 className="font-bold text-lg leading-tight">{settings.appName}</h1>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                location.pathname === item.path
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                  : 'hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-200 dark:border-slate-700">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl w-full text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all font-medium"
          >
            <span>🚪</span> {t.logout}
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className={`h-16 flex items-center justify-between px-6 border-b ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
          <div className="flex items-center gap-4">
            <button className="md:hidden text-2xl">☰</button>
            <h2 className="font-bold text-xl">{navItems.find(n => n.path === location.pathname)?.label || t.dashboard}</h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setLang(lang === 'en' ? 'bn' : 'en')}
              className="px-3 py-1 rounded-full border border-slate-300 dark:border-slate-600 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700"
            >
              {lang === 'en' ? 'BN' : 'EN'}
            </button>
            <button
              onClick={() => setIsDark(!isDark)}
              className="w-10 h-10 rounded-full flex items-center justify-center border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700"
            >
              {isDark ? '☀️' : '🌙'}
            </button>
            <div className="flex items-center gap-3 pl-3 border-l dark:border-slate-700">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold">{user?.name}</p>
                <p className="text-[10px] opacity-60 uppercase">{user?.role}</p>
              </div>
              <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                {user?.name.charAt(0)}
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <Routes>
             <Route path="/" element={user?.role === 'ADMIN' ? <AdminDashboard /> : <CustomerProfile />} />
             <Route path="/customers" element={<CustomerManagement />} />
             <Route path="/inbox" element={<AdminInbox />} />
             <Route path="/entertainment" element={user?.role === 'ADMIN' ? <AdminEntertainment /> : <CustomerEntertainment />} />
             <Route path="/notices" element={user?.role === 'ADMIN' ? <AdminNotices /> : <CustomerNotices />} />
             <Route path="/recycle-bin" element={<RecycleBin />} />
             <Route path="/settings" element={<AdminSettings />} />
             <Route path="/billing" element={<CustomerBilling />} />
             <Route path="/support" element={<CustomerSupport />} />
          </Routes>
        </main>
      </div>

      {showPopup && notices.filter(n => n.isUrgent).length > 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className={`w-full max-w-md rounded-2xl shadow-2xl p-6 ${isDark ? 'bg-slate-800 text-white' : 'bg-white text-slate-900'}`}>
            <div className="flex items-center gap-3 mb-4 text-red-500">
              <span className="text-3xl">⚠️</span>
              <h3 className="text-xl font-bold">{t.urgentNotice}</h3>
            </div>
            <div className="space-y-4">
              {notices.filter(n => n.isUrgent).map(n => (
                <div key={n.id} className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                  <h4 className="font-bold text-red-700 dark:text-red-400">{n.title}</h4>
                  <p className="text-sm mt-1">{n.content}</p>
                </div>
              ))}
            </div>
            <button
              onClick={() => setShowPopup(false)}
              className="mt-6 w-full py-3 rounded-xl bg-slate-200 dark:bg-slate-700 font-bold hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
            >
              {t.close}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
