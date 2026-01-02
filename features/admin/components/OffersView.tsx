
import React from 'react';
import { motion } from 'framer-motion';
import { AdminIcons } from '../assets/AdminIcons';

export const OffersView: React.FC = () => {
  const offers = [
    { code: 'NEXUS20', type: 'Percentage', value: '20%', status: 'Active', used: '142 times' },
    { code: 'OWNER50', type: 'Percentage', value: '50%', status: 'Active', used: '12 times' },
    { code: 'WELCOME5', type: 'Fixed', value: '$5.00', status: 'Expired', used: '842 times' },
    { code: 'ALPHA100', type: 'Percentage', value: '100%', status: 'Paused', used: '0 times' },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-black uppercase tracking-tighter text-white">Promotional Nexus</h3>
        <button className="px-6 py-3 rounded-xl bg-purple-600 text-white font-black uppercase tracking-widest text-xs hover:bg-purple-500 transition-colors">
          Initialize Coupon
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {offers.map((offer, i) => (
          <div key={i} className="bg-[#080808] border border-white/5 rounded-2xl p-6 relative overflow-hidden group">
            <div className={`absolute top-0 left-0 w-1 h-full ${offer.status === 'Active' ? 'bg-emerald-500' : 'bg-red-500'}`} />
            <div className="flex justify-between items-start mb-4">
               <h4 className="text-xl font-black text-white tracking-tighter group-hover:text-purple-400 transition-colors">{offer.code}</h4>
               <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded border ${
                 offer.status === 'Active' ? 'text-emerald-400 border-emerald-500/20' : 'text-white/20 border-white/5'
               }`}>{offer.status}</span>
            </div>
            <div className="space-y-1">
               <p className="text-2xl font-black text-white">{offer.value} OFF</p>
               <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest">{offer.type} Discount</p>
            </div>
            <div className="mt-6 flex items-center gap-2 text-[10px] text-white/20 font-mono">
               <AdminIcons.Users /> {offer.used}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
