
import React from 'react';
import { motion } from 'framer-motion';

export const DashboardView = () => {
    const metrics = { revenue: '$24.8k', conv: '3.4%', active: 1242, totalUsers: '8.4k' };

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 md:space-y-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: 'REVENUE', val: metrics.revenue, color: 'text-emerald-400' },
                    { label: 'CONVERSION', val: metrics.conv, color: 'text-red-500' },
                    { label: 'ACTIVE', val: metrics.active, color: 'text-cyan-400' },
                    { label: 'TOTAL USERS', val: metrics.totalUsers, color: 'text-amber-500' }
                ].map(k => (
                    <div key={k.label} className="bg-[#080808] border border-white/5 rounded-3xl p-6 shadow-xl">
                        <p className="text-[9px] font-black text-white/20 uppercase tracking-widest mb-3">{k.label}</p>
                        <h3 className={`text-2xl md:text-3xl font-black ${k.color}`}>{k.val}</h3>
                    </div>
                ))}
            </div>

            <div className="bg-[#080808] border border-white/5 rounded-[2.5rem] p-6 md:p-8 shadow-2xl">
                <h3 className="text-xl font-black mb-8 uppercase italic flex items-center gap-4">
                    <div className="w-1.5 h-6 bg-red-600 rounded-full" /> Order Logistics
                </h3>
                <div className="grid grid-cols-2 gap-4">
                    {[
                        { l: 'TOTAL', v: '4,821', c: 'text-cyan-400' },
                        { l: 'COMPLETE', v: '4,680', c: 'text-emerald-400' },
                        { l: 'PENDING', v: '92', c: 'text-amber-500' },
                        { l: 'CANCEL', v: '49', c: 'text-red-500' }
                    ].map(s => (
                        <div key={s.l} className="bg-white/5 border border-white/5 rounded-2xl p-4 md:p-6 hover:bg-white/10 transition-all">
                            <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-2">{s.l}</p>
                            <h4 className={`text-2xl md:text-3xl font-black ${s.c}`}>{s.v}</h4>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};
