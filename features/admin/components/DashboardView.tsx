import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { dbService } from '../../../services/dbService';
import { AdminIcons } from '../assets/AdminIcons';

export const DashboardView: React.FC = () => {
  const [stats, setStats] = useState({
    totalSales: 0,
    activeUsers: 0,
    ordersToday: 0,
    revenue: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubOrders = dbService.subscribe('orders', (orders) => {
      const today = new Date().toISOString().split('T')[0];
      const todayOrders = orders.filter((o: any) => o.createdAt?.startsWith(today));
      const totalRevenue = orders.reduce((acc: number, o: any) => acc + (parseFloat(o.amount) || 0), 0);
      
      setStats(prev => ({
        ...prev,
        ordersToday: todayOrders.length,
        revenue: totalRevenue,
        totalSales: orders.length
      }));
    });

    const unsubUsers = dbService.subscribe('users', (users) => {
      setStats(prev => ({
        ...prev,
        activeUsers: users.length
      }));
      setLoading(false);
    });

    return () => {
      unsubOrders();
      unsubUsers();
    };
  }, []);

  const metrics = [
    { label: 'REVENUE', val: `$${stats.revenue.toLocaleString()}`, color: 'text-emerald-400' },
    { label: 'TOTAL SALES', val: stats.totalSales, color: 'text-white' },
    { label: 'ACTIVE USERS', val: stats.activeUsers, color: 'text-cyan-400' },
    { label: 'TODAY ORDERS', val: stats.ordersToday, color: 'text-amber-500' }
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 md:space-y-12">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {metrics.map(k => (
          <div key={k.label} className="bg-[#080808] border border-white/5 rounded-3xl p-6 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
            <p className="text-[9px] font-black text-white/20 uppercase tracking-widest mb-3">{k.label}</p>
            <h3 className={`text-2xl md:text-3xl font-black ${k.color}`}>{k.val}</h3>
          </div>
        ))}
      </div>

      <div className="bg-[#080808] border border-white/5 rounded-[2.5rem] p-6 md:p-8 shadow-2xl">
        <h3 className="text-xl font-black mb-8 uppercase italic flex items-center gap-4 text-white">
          <div className="w-1.5 h-6 bg-red-600 rounded-full" /> Live Logistics Dashboard
        </h3>
        <div className="h-40 flex items-center justify-center text-white/10 font-black uppercase tracking-[0.5em] text-xs">
          {loading ? 'Decrypting Database...' : 'Operational - All Systems Go'}
        </div>
      </div>
    </motion.div>
  );
};
