
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AdminIcons } from '../assets/AdminIcons.tsx';

const SIDEBAR_ITEMS = [
    { id: 'dashboard', label: 'Dashboard', icon: AdminIcons.Dashboard },
    { id: 'users', label: 'User Management', icon: AdminIcons.Users },
    { id: 'orders', label: 'Order Management', icon: AdminIcons.Orders },
    { id: 'payment', label: 'Payment Mgmt', icon: AdminIcons.Payment },
    { id: 'inventory', label: 'Inventory', icon: AdminIcons.Inventory },
    { id: 'offers', label: 'Offers', icon: AdminIcons.Offers },
    { id: 'logs', label: 'Logs', icon: AdminIcons.Logs },
    { id: 'settings', label: 'Setting', icon: AdminIcons.Settings }
];

interface AdminSidebarProps {
    activeView: string;
    onNavigate: (viewId: string) => void;
    isOpen: boolean;
    isMobile: boolean;
    onClose: () => void;
    onLogout: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ activeView, onNavigate, isOpen, isMobile, onClose, onLogout }) => {
    return (
        <AnimatePresence mode="wait">
            {isOpen && (
                <motion.aside
                    initial={isMobile ? { x: '-100%' } : { width: 0, opacity: 0 }}
                    animate={isMobile ? { x: 0 } : { width: 280, opacity: 1 }}
                    exit={isMobile ? { x: '-100%' } : { width: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className={`
              fixed md:relative z-50 h-full bg-[#050505] border-r border-white/5 flex flex-col shadow-2xl
              w-[280px] md:w-auto
            `}
                >
                    <div className="p-6 md:p-8 flex flex-col h-full w-[280px]">
                        <div className="flex items-center gap-3 mb-8 md:mb-12">
                            <AdminIcons.Alert />
                            <span className="font-black tracking-[0.2em] text-[10px] uppercase">System Node</span>
                        </div>
                        <nav className="flex-1 space-y-2 overflow-y-auto no-scrollbar pr-2">
                            {SIDEBAR_ITEMS.map(item => (
                                <button
                                    key={item.id}
                                    onClick={() => { onNavigate(item.id); if (isMobile) onClose(); }}
                                    className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all group ${activeView === item.id
                                            ? 'bg-white text-black shadow-lg shadow-white/10'
                                            : 'text-white/40 hover:bg-white/5 hover:text-white'
                                        }`}
                                >
                                    <item.icon />
                                    <span className="text-sm font-bold">{item.label}</span>
                                </button>
                            ))}
                        </nav>
                        <button onClick={onLogout} className="mt-4 flex items-center gap-4 p-4 text-white/20 hover:text-red-500 transition-all font-black uppercase text-[10px] tracking-widest shrink-0">
                            <AdminIcons.Exit /> Terminate
                        </button>
                    </div>
                </motion.aside>
            )}
        </AnimatePresence>
    );
};
