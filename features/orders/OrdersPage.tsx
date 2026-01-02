
import React, { useState, memo, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, Package, Truck, CheckCircle, Clock, 
  Search, Filter, ExternalLink, Wallet, RefreshCw, Download
} from 'lucide-react';

const ORDERS = [
  {
    id: '#ORD-9281-X',
    items: [
      { name: 'Premium Wireless Headphones', image: 'https://picsum.photos/seed/audio1/200/200', qty: 1 },
      { name: 'Alum. Headphone Stand', image: 'https://picsum.photos/seed/stand1/200/200', qty: 1 }
    ],
    total: 329.00,
    date: 'Oct 24, 2023',
    status: 'Delivered',
    tracking: 'TRK-8829102'
  },
  {
    id: '#ORD-8821-B',
    items: [
       { name: 'Mechanical Keyboard Kit (Pro)', image: 'https://picsum.photos/seed/kb1/200/200', qty: 1 }
    ],
    total: 159.00,
    date: 'Oct 20, 2023',
    status: 'Shipping',
    tracking: 'TRK-1120039'
  },
  {
    id: '#ORD-7732-A',
    items: [
       { name: 'Ergonomic Mesh Chair', image: 'https://picsum.photos/seed/chair1/200/200', qty: 1 }
    ],
    total: 450.00,
    date: 'Oct 18, 2023',
    status: 'Processing',
    tracking: null
  },
  {
    id: '#ORD-1102-C',
    items: [
       { name: '4K OLED Monitor', image: 'https://picsum.photos/seed/mon1/200/200', qty: 1 },
       { name: 'Monitor Arm', image: 'https://picsum.photos/seed/arm1/200/200', qty: 1 },
       { name: 'HDMI 2.1 Cable', image: 'https://picsum.photos/seed/cable1/200/200', qty: 2 }
    ],
    total: 945.50,
    date: 'Sep 15, 2023',
    status: 'Delivered',
    tracking: 'TRK-9921002'
  }
];

const TABS = ['All Orders', 'In Progress', 'Completed', 'Returns'];

const OrdersPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('All Orders');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOrders = useMemo(() => {
    return ORDERS.filter(order => {
      if (activeTab === 'In Progress' && (order.status === 'Delivered' || order.status === 'Cancelled')) return false;
      if (activeTab === 'Completed' && order.status !== 'Delivered') return false;
      if (activeTab === 'Returns' && order.status !== 'Returned') return false; 
      if (searchQuery && !order.id.toLowerCase().includes(searchQuery.toLowerCase()) && !order.items.some(i => i.name.toLowerCase().includes(searchQuery.toLowerCase()))) return false;
      return true;
    });
  }, [activeTab, searchQuery]);

  const getStatusStyle = useCallback((status: string) => {
    switch (status) {
      case 'Delivered': return { color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', icon: CheckCircle };
      case 'Shipping': return { color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20', icon: Truck };
      case 'Processing': return { color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20', icon: Clock };
      default: return { color: 'text-gray-400', bg: 'bg-gray-500/10', border: 'border-gray-500/20', icon: Package };
    }
  }, []); // No dependencies, can be memoized once

  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } };
  const item = { hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0 } };

  return (
    <div className="w-full max-w-6xl mx-auto pt-8 pb-20 px-4 md:px-8">
        <div className="fixed top-20 left-10 w-64 h-64 bg-purple-600/10 blur-[100px] rounded-full -z-10 pointer-events-none" />
        <div className="fixed bottom-20 right-10 w-96 h-96 bg-cyan-600/10 blur-[120px] rounded-full -z-10 pointer-events-none" />

        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                <div>
                    <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-2 flex items-center gap-4">
                      MY ORDERS 
                      <div className="px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs font-bold tracking-widest text-white/50 uppercase">History</div>
                    </h1>
                    <p className="text-white/40 max-w-md">Real-time tracking of your digital and physical assets.</p>
                </div>
                
                <div className="flex items-center gap-3">
                    <div className="p-4 rounded-2xl bg-[#111] border border-white/10 flex items-center gap-4 hover:border-white/20 transition-all">
                        <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400"><Wallet size={20} /></div>
                        <div><p className="text-[10px] text-white/30 font-bold uppercase tracking-wider">Total Spent</p><p className="text-xl font-bold text-white">$1,883.50</p></div>
                    </div>
                    <div className="p-4 rounded-2xl bg-[#111] border border-white/10 flex items-center gap-4 hover:border-white/20 transition-all">
                        <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400"><ShoppingBag size={20} /></div>
                        <div><p className="text-[10px] text-white/30 font-bold uppercase tracking-wider">Total Orders</p><p className="text-xl font-bold text-white">4</p></div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-4 justify-between items-center p-2 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="flex items-center gap-1 w-full lg:w-auto overflow-x-auto no-scrollbar">
                    {TABS.map(tab => (
                        <button key={tab} onClick={() => setActiveTab(tab)} className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${activeTab === tab ? 'bg-white text-black shadow-lg' : 'text-white/40 hover:text-white hover:bg-white/5'}`}>{tab}</button>
                    ))}
                </div>
                <div className="flex items-center gap-3 w-full lg:w-auto">
                    <div className="relative flex-1 lg:w-64">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" />
                        <input type="text" placeholder="Search Order ID or Item..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:border-white/30 outline-none transition-all placeholder:text-white/20" />
                    </div>
                    <button className="p-2.5 rounded-xl bg-[#0a0a0a] border border-white/10 text-white/40 hover:text-white hover:border-white/30 transition-all"><Filter size={18} /></button>
                </div>
            </div>
        </motion.div>

        <motion.div variants={container} initial="hidden" animate="show" className="space-y-4">
            <AnimatePresence mode="popLayout">
                {filteredOrders.length > 0 ? (
                    filteredOrders.map((order) => {
                        const status = getStatusStyle(order.status);
                        const StatusIcon = status.icon;
                        return (
                            <motion.div key={order.id} variants={item} layout className="group relative bg-[#111]/80 backdrop-blur-sm border border-white/5 rounded-2xl p-6 hover:border-white/20 transition-all duration-300 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none" />
                                <div className="flex flex-col lg:flex-row gap-8">
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-3">
                                                <span className="font-mono text-lg font-bold text-white tracking-wider">{order.id}</span>
                                                <span className="text-white/20 text-xs">●</span>
                                                <span className="text-white/40 text-sm font-medium">{order.date}</span>
                                            </div>
                                            <div className={`lg:hidden flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold uppercase tracking-wider ${status.bg} ${status.color} ${status.border}`}><StatusIcon size={12} /> {order.status}</div>
                                        </div>
                                        <div className="flex flex-wrap gap-4">
                                            {order.items.map((item, idx) => (
                                                <div key={idx} className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors w-full sm:w-auto">
                                                    <div className="w-12 h-12 rounded-lg bg-black overflow-hidden shrink-0"><img src={item.image} alt={item.name} loading="lazy" decoding="async" className="w-full h-full object-cover opacity-80" /></div>
                                                    <div><p className="text-sm font-bold text-white leading-tight">{item.name}</p><p className="text-xs text-white/40 mt-1">Qty: {item.qty}</p></div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end justify-between gap-6 border-t border-white/5 pt-6 lg:border-t-0 lg:pt-0 lg:border-l lg:pl-8 min-w-[200px]">
                                        <div className="hidden lg:flex flex-col items-end">
                                            <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold uppercase tracking-wider mb-2 ${status.bg} ${status.color} ${status.border}`}><StatusIcon size={12} /> {order.status}</div>
                                            {order.tracking && <p className="text-[10px] text-white/30 font-mono tracking-widest flex items-center gap-1">TRK: {order.tracking} <ExternalLink size={8} /></p>}
                                        </div>
                                        <div className="flex flex-col items-end w-full">
                                            <p className="text-[10px] text-white/30 uppercase font-bold tracking-wider mb-1">Total Amount</p>
                                            <p className="text-2xl font-black text-white mb-4">${order.total.toFixed(2)}</p>
                                            <div className="flex items-center gap-2 w-full">
                                                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white text-black text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-cyan-400 transition-colors"><RefreshCw size={14} /> Reorder</button>
                                                <button className="p-2 rounded-lg bg-white/5 border border-white/10 text-white/50 hover:text-white hover:border-white/30 transition-all" title="Download Invoice">
                                                   <Download size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })
                ) : (
                    <motion.div variants={item} className="text-center py-24 border border-dashed border-white/10 rounded-2xl bg-white/[0.01]">
                        <Package size={48} className="mx-auto text-white/10 mb-4" />
                        <h3 className="text-lg font-bold text-white/50">No orders found</h3>
                        <p className="text-sm text-white/30">Try adjusting your filters.</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    </div>
  );
};

export default memo(OrdersPage);
