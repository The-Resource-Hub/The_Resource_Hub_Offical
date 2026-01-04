import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { dbService } from '../../../services/dbService';
import { AdminIcons } from '../assets/AdminIcons.tsx';

interface OrdersViewProps {
    onHandover: (orderId: string) => void;
}

export const OrdersView: React.FC<OrdersViewProps> = ({ onHandover }) => {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [orderSubTab, setOrderSubTab] = useState<'all' | 'confirmed' | 'deliver'>('all');

    useEffect(() => {
        const unsubscribe = dbService.subscribe('orders', (data) => {
            setOrders(data);
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    const analytics = {
        total: orders.length,
        processing: orders.filter(o => o.status === 'Processing' || o.status === 'pending').length,
        completed: orders.filter(o => o.status === 'Completed' || o.status === 'success').length,
        cancelled: orders.filter(o => o.status === 'Cancelled').length
    };

    const renderTable = (data: any[]) => (
        <div className="overflow-x-auto">
            {loading ? (
                <div className="p-20 text-center text-white/20 uppercase font-black tracking-widest">fetching orders...</div>
            ) : (
                <table className="w-full text-left">
                    <thead className="bg-white/[0.02]">
                        <tr>
                            <th className="p-6 text-[10px] font-black uppercase tracking-widest text-white/30">Order ID</th>
                            <th className="p-6 text-[10px] font-black uppercase tracking-widest text-white/30">Customer</th>
                            <th className="p-6 text-[10px] font-black uppercase tracking-widest text-white/30">Amount</th>
                            <th className="p-6 text-[10px] font-black uppercase tracking-widest text-white/30">Status</th>
                            <th className="p-6 text-[10px] font-black uppercase tracking-widest text-white/30 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {data.map((order) => (
                            <tr key={order.id} className="hover:bg-white/[0.02] transition-colors group">
                                <td className="p-6">
                                    <span className="font-mono text-xs font-bold text-white/70">{order.id.substring(0,8)}</span>
                                    <div className="text-[10px] text-white/30 mt-1">{new Date(order.createdAt).toLocaleDateString()}</div>
                                </td>
                                <td className="p-6">
                                    <div className="font-bold text-white text-sm">{order.userEmail || order.userId}</div>
                                    <div className="text-[10px] text-white/40">{order.productName || 'Premium Asset'}</div>
                                </td>
                                <td className="p-6 font-mono font-bold text-white">${order.amount}</td>
                                <td className="p-6">
                                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded border ${
                                        order.status === 'Completed' || order.status === 'success' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                                        order.status === 'Cancelled' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
                                    }`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className="p-6 text-right">
                                    <button 
                                        onClick={() => onHandover(order.id)}
                                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-colors"
                                    >
                                        <AdminIcons.Eye />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Total Orders', val: analytics.total, color: 'text-white' },
                { label: 'Pending', val: analytics.processing, color: 'text-amber-500' },
                { label: 'Completed', val: analytics.completed, color: 'text-emerald-400' },
                { label: 'Cancelled', val: analytics.cancelled, color: 'text-red-500' }
              ].map((stat, i) => (
                 <div key={i} className="bg-[#080808] border border-white/5 rounded-2xl p-5 shadow-lg relative overflow-hidden group">
                    <p className="text-[9px] font-black text-white/30 uppercase tracking-widest mb-2 relative z-10">{stat.label}</p>
                    <h3 className={`text-2xl font-black ${stat.color} relative z-10`}>{stat.val}</h3>
                 </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
                <button
                    onClick={() => setOrderSubTab('all')}
                    className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${orderSubTab === 'all' ? 'bg-white text-black' : 'bg-white/5 text-white/40 hover:bg-white/10'}`}
                >
                    All Orders
                </button>
            </div>

            <div className="bg-[#080808] border border-white/5 rounded-[2rem] overflow-hidden min-h-[400px]">
                {renderTable(orderSubTab === 'all' ? orders : orders.filter(o => o.status === 'Processing'))}
            </div>
        </motion.div>
    );
};
