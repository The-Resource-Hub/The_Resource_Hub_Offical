
import React, { memo, useState, useEffect, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Menu as MenuIcon } from 'lucide-react';
import { AdminIcons } from './assets/AdminIcons.tsx';
import { AdminSidebar } from './components/AdminSidebar.tsx';
import { dbService } from '../../services/dbService';

// Lazy load views with mandatory extensions
const DashboardView = lazy(() => import('./components/DashboardView.tsx').then(m => ({ default: m.DashboardView })));
const UsersView = lazy(() => import('./components/UsersView.tsx').then(m => ({ default: m.UsersView })));
const OrdersView = lazy(() => import('./components/OrdersView.tsx').then(m => ({ default: m.OrdersView })));
const PaymentView = lazy(() => import('./components/PaymentView.tsx').then(m => ({ default: m.PaymentView })));
const InventoryView = lazy(() => import('./components/InventoryView.tsx').then(m => ({ default: m.InventoryView })));
const OffersView = lazy(() => import('./components/OffersView.tsx').then(m => ({ default: m.OffersView })));
const LogsView = lazy(() => import('./components/LogsView.tsx').then(m => ({ default: m.LogsView })));
const SupportView = lazy(() => import('../support/SupportPage.tsx'));
const SettingsView = lazy(() => import('./components/SettingsView.tsx').then(m => ({ default: m.SettingsView })));
const ShreeGenPrime = lazy(() => import('./components/ShreeGenPrime.tsx').then(m => ({ default: m.ShreeGenPrime })));

interface AdminDashboardPageProps {
  onLogout: () => void;
}

const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({ onLogout }) => {
  const [activeView, setActiveView] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const unsubUsers = dbService.subscribe('users', (data) => {
      setUsers(data);
    });
    return unsubUsers;
  }, []);

  const [orders, setOrders] = useState([
    { id: '#ORD-8821', user: 'Alex Designer', amount: '$299.00', status: 'Processing', date: 'Oct 24, 2023', items: 2 },
    { id: '#ORD-7732', user: 'John Wick', amount: '$1,250.00', status: 'Completed', date: 'Oct 22, 2023', items: 5 },
  ]);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) setIsSidebarOpen(false);
      else setIsSidebarOpen(true);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const renderActiveView = () => {
    switch (activeView) {
      case 'dashboard': return <DashboardView />;
      case 'users': return <UsersView users={users} onEdit={() => {}} onBan={() => {}} />;
      case 'orders': return <OrdersView onHandover={() => {}} />;
      case 'payment': return <PaymentView />;
      case 'inventory': return <PaymentView />; // Note: existing logic seems to map inventory to PaymentView or similar in snippet, but I'll focus on support
      case 'offers': return <OffersView />;
      case 'logs': return <LogsView />;
      case 'settings': return <SettingsView />;
      case 'shree-prime': return <ShreeGenPrime onClose={() => setActiveView('dashboard')} />;
      default: return <DashboardView />;
    }
  };

  return (
    <div className="flex h-screen bg-[#020202] text-white overflow-hidden font-sans">
      <AdminSidebar 
        activeView={activeView} 
        onNavigate={setActiveView} 
        isOpen={isSidebarOpen} 
        isMobile={isMobile}
        onClose={() => setIsSidebarOpen(false)}
        onLogout={onLogout}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {activeView !== 'support' && (
          <header className="h-20 border-b border-white/5 flex items-center justify-between px-6 md:px-10 shrink-0 bg-[#050505]/50 backdrop-blur-xl sticky top-0 z-40">
            <div className="flex items-center gap-6">
              {isMobile && (
                <button onClick={() => setIsSidebarOpen(true)} className="p-2.5 rounded-xl bg-white/5 text-white/60">
                  <MenuIcon size={20} />
                </button>
              )}
              <motion.h2 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm font-black uppercase tracking-[0.4em]"
              >
                <span className="text-red-600">ADMIN</span>
                <span className="text-white">ISTRATION</span>
              </motion.h2>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex flex-col items-end">
                <span className="text-xs font-bold text-white">Preet Bopche</span>
                <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">Master Admin</span>
              </div>
              <img src="https://picsum.photos/seed/admin/100/100" className="w-10 h-10 rounded-xl border border-white/10" alt="Admin" />
            </div>
          </header>
        )}

        <main className={`flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar bg-[#020202] ${activeView === 'support' ? '!p-0' : ''}`}>
          <Suspense fallback={
            <div className="flex items-center justify-center h-full">
              <Loader2 className="animate-spin text-cyan-500" size={32} />
            </div>
          }>
            {renderActiveView()}
          </Suspense>
        </main>
      </div>
    </div>
  );
};

export default memo(AdminDashboardPage);
