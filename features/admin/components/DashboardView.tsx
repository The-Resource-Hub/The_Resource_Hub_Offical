import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { dbService } from '../../../services/dbService';
import { 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  DollarSign, 
  Activity, 
  Clock, 
  Package,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const [stats, setStats] = useState({
    totalSales: 0,
    activeUsers: 0,
    ordersToday: 0,
    revenue: 0,
    averageOrderValue: 0,
    growth: 12.5
  });
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubOrders = dbService.subscribe('orders', (orders) => {
      const today = new Date().toISOString().split('T')[0];
      const todayOrders = orders.filter((o: any) => o.createdAt?.startsWith(today));
      const totalRevenue = orders.reduce((acc: number, o: any) => acc + (parseFloat(o.amount) || 0), 0);
      const avgValue = orders.length > 0 ? totalRevenue / orders.length : 0;
      
      setStats(prev => ({
        ...prev,
        ordersToday: todayOrders.length,
        revenue: totalRevenue,
        totalSales: orders.length,
        averageOrderValue: avgValue
      }));

      // Get last 5 orders for activity
      setRecentActivity(orders.slice(0, 5).map((o: any) => ({
        id: o.id,
        type: 'order',
        title: `New Order #${o.id.substring(0, 6)}`,
        desc: `Amount: $${parseFloat(o.amount).toFixed(2)}`,
        time: new Date(o.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      })));
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
    { label: 'TOTAL REVENUE', val: `$${stats.revenue.toLocaleString()}`, color: 'text-emerald-400', icon: DollarSign, trend: '+8.2%' },
    { label: 'TOTAL SALES', val: stats.totalSales, color: 'text-white', icon: ShoppingBag, trend: '+12%' },
    { label: 'ACTIVE USERS', val: stats.activeUsers, color: 'text-cyan-400', icon: Users, trend: '+5.4%' },
    { label: 'AVG ORDER', val: `$${stats.averageOrderValue.toFixed(2)}`, color: 'text-purple-400', icon: TrendingUp, trend: '-2.1%' }
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map(k => (
          <div key={k.label} className="bg-[#080808] border border-white/5 rounded-3xl p-6 relative overflow-hidden group hover:border-white/10 transition-all">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-white/5 rounded-xl text-white/40 group-hover:text-white transition-colors">
                <k.icon size={18} />
              </div>
              <span className={`text-[10px] font-bold flex items-center gap-1 ${k.trend.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'}`}>
                {k.trend.startsWith('+') ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                {k.trend}
              </span>
            </div>
            <p className="text-[9px] font-black text-white/20 uppercase tracking-widest mb-1">{k.label}</p>
            <h3 className={`text-2xl font-black ${k.color}`}>{k.val}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart Placeholder / Activity */}
        <div className="lg:col-span-2 bg-[#080808] border border-white/5 rounded-[2.5rem] p-8 relative overflow-hidden">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-black uppercase italic flex items-center gap-4 text-white">
              <div className="w-1.5 h-6 bg-red-600 rounded-full" /> System Analytics
            </h3>
            <div className="flex gap-2">
              <div className="px-3 py-1 bg-white/5 rounded-lg text-[9px] font-bold text-white/40">24H</div>
              <div className="px-3 py-1 bg-white text-black rounded-lg text-[9px] font-bold">7D</div>
            </div>
          </div>
          
          <div className="h-64 flex flex-col items-center justify-center relative">
            <div className="absolute inset-0 bg-gradient-to-t from-red-600/5 to-transparent opacity-30" />
            <Activity size={48} className="text-red-500/20 mb-4 animate-pulse" />
            <p className="text-white/10 font-black uppercase tracking-[0.5em] text-xs">
              {loading ? 'Analyzing Data Streams...' : 'Neural Network Operational'}
            </p>
          </div>
        </div>

        {/* Recent Activity Feed */}
        <div className="bg-[#080808] border border-white/5 rounded-[2.5rem] p-8 flex flex-col">
          <h3 className="text-sm font-black mb-6 uppercase tracking-widest text-white/40 flex items-center gap-2">
            <Clock size={14} /> Recent Events
          </h3>
          <div className="flex-1 space-y-6">
            {recentActivity.length > 0 ? recentActivity.map((act, i) => (
              <div key={i} className="flex gap-4 group">
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 group-hover:text-white transition-colors">
                    <Package size={14} />
                  </div>
                  {i !== recentActivity.length - 1 && <div className="absolute top-8 bottom-[-24px] left-1/2 -translate-x-1/2 w-px bg-white/5" />}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white group-hover:text-red-500 transition-colors">{act.title}</h4>
                  <p className="text-[10px] text-white/30">{act.desc}</p>
                  <span className="text-[9px] font-mono text-white/20 uppercase mt-1 block">{act.time}</span>
                </div>
              </div>
            )) : (
              <div className="h-full flex items-center justify-center text-white/10 font-black uppercase text-[10px] tracking-widest">
                No events recorded
              </div>
            )}
          </div>
          <button className="mt-8 w-full py-3 bg-white/5 border border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white/40 hover:bg-white hover:text-black transition-all">
            View All Logs
          </button>
        </div>
      </div>
    </motion.div>
  );
};
