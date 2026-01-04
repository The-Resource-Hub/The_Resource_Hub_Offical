
import React, { useState, useEffect, memo } from 'react'; 
import { motion, AnimatePresence } from 'framer-motion';
import { userService, walletService, UserProfile } from '../../services/userService';
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  History, 
  ShieldCheck,
  Gamepad2,
  Link as LinkIcon,
  Users,
  TrendingDown,
  CreditCard,
  ChevronDown,
  Copy,
  Loader2, 
  Download
} from 'lucide-react';

import ThreeDCard from '../../components/ui/ThreeDCard';

interface WalletPageProps {
  balance: number;
}

const WalletPage: React.FC<WalletPageProps> = ({ balance: propBalance }) => {
  const [showVirtualCard, setShowVirtualCard] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, we'd get the current user ID from Auth
    const mockUid = "MOCK_USER_ID"; 
    
    const unsubProfile = userService.subscribeToProfile(mockUid, (p) => {
      setProfile(p);
      setLoading(false);
    });

    const unsubTxs = walletService.subscribeToTransactions(mockUid, (txs) => {
      setTransactions(txs);
    });

    return () => {
      unsubProfile();
      unsubTxs();
    };
  }, []);

  const balance = profile?.balance ?? 0;
  const stats = profile?.stats ?? {
    gameWinnings: 0,
    shortLinks: 0,
    referrals: 0,
    expenses: 0
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="w-full max-w-5xl mx-auto pt-8 pb-20 relative px-4"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-cyan-900/10 blur-[120px] rounded-full -z-10 pointer-events-none" />

      {/* HEADER */}
      <motion.div variants={item} className="text-center mb-10">
        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-2">
          MY <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">VAULT</span>
        </h1>
        <div className="flex items-center justify-center gap-2 text-white/40 text-sm md:text-base font-medium uppercase tracking-widest">
           <ShieldCheck size={14} className="text-emerald-500" />
           Secure Asset Management
        </div>
      </motion.div>

      {/* BALANCE */}
      <motion.div variants={item} className="mb-8">
        <div className="relative w-full bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 overflow-hidden group text-center shadow-2xl shadow-cyan-900/10">
           <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 via-[#0a0a0a] to-[#0a0a0a] opacity-50" />
           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50" />
           
           <div className="relative z-10">
              <p className="text-cyan-400 text-xs font-bold uppercase tracking-[0.2em] mb-4">Total Available Balance</p>
              <h2 className="text-6xl md:text-7xl font-black text-white tracking-tighter drop-shadow-[0_0_25px_rgba(6,182,212,0.3)]">
                 ${balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </h2>
           </div>
        </div>
      </motion.div>

      {/* ACTIONS */}
      <motion.div variants={item} className="grid grid-cols-2 gap-4 mb-10">
         <button className="relative group overflow-hidden bg-white text-black font-black py-4 rounded-2xl transition-transform active:scale-95 shadow-lg hover:shadow-cyan-500/20">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10 flex items-center justify-center gap-3">
               <div className="p-1 rounded-full bg-black/10">
                  <ArrowDownLeft size={20} strokeWidth={3} />
               </div>
               <span className="text-lg tracking-wide">DEPOSIT</span>
            </div>
         </button>

         <button className="relative group overflow-hidden bg-[#111] border border-white/10 text-white font-black py-4 rounded-2xl transition-transform active:scale-95 hover:border-white/30">
            <div className="relative z-10 flex items-center justify-center gap-3">
               <div className="p-1 rounded-full bg-white/10">
                  <ArrowUpRight size={20} strokeWidth={3} />
               </div>
               <span className="text-lg tracking-wide">WITHDRAW</span>
            </div>
         </button>
      </motion.div>

      {/* INCOME CARDS */}
      <motion.div variants={item} className="bg-[#0e0e0e] border border-white/5 rounded-[2.5rem] p-6 mb-8 relative">
         <div className="absolute top-6 left-6 text-[10px] font-bold text-white/20 uppercase tracking-widest">Income Breakdown</div>
         <div className="absolute top-6 right-6 text-[10px] font-bold text-white/20 uppercase tracking-widest">Live Data</div>
         
         <div className="mt-8 grid grid-cols-2 gap-3 md:gap-4">
            <div className="bg-[#151515] rounded-2xl p-4 md:p-5 border border-white/5 hover:border-purple-500/30 transition-colors group">
               <div className="flex justify-between items-start mb-4">
                  <div className="p-2 md:p-3 rounded-xl bg-purple-500/10 text-purple-400 group-hover:scale-110 transition-transform">
                     <Gamepad2 size={20} className="md:w-6 md:h-6" />
                  </div>
                  <span className="text-[9px] md:text-[10px] font-bold text-white/30 bg-white/5 px-2 py-1 rounded">+12%</span>
               </div>
               <p className="text-white/40 text-[10px] md:text-xs font-bold uppercase tracking-wider mb-1">Game Winnings</p>
               <p className="text-lg md:text-2xl font-bold text-white truncate">${stats.gameWinnings.toLocaleString()}</p>
            </div>

            <div className="bg-[#151515] rounded-2xl p-4 md:p-5 border border-white/5 hover:border-blue-500/30 transition-colors group">
               <div className="flex justify-between items-start mb-4">
                  <div className="p-2 md:p-3 rounded-xl bg-blue-500/10 text-blue-400 group-hover:scale-110 transition-transform">
                     <LinkIcon size={20} className="md:w-6 md:h-6" />
                  </div>
                  <span className="text-[9px] md:text-[10px] font-bold text-white/30 bg-white/5 px-2 py-1 rounded">+5%</span>
               </div>
               <p className="text-white/40 text-[10px] md:text-xs font-bold uppercase tracking-wider mb-1">Short Links</p>
               <p className="text-lg md:text-2xl font-bold text-white truncate">${stats.shortLinks.toLocaleString()}</p>
            </div>

            <div className="bg-[#151515] rounded-2xl p-4 md:p-5 border border-white/5 hover:border-emerald-500/30 transition-colors group">
               <div className="flex justify-between items-start mb-4">
                  <div className="p-2 md:p-3 rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:scale-110 transition-transform">
                     <Users size={20} className="md:w-6 md:h-6" />
                  </div>
                  <span className="text-[9px] md:text-[10px] font-bold text-white/30 bg-white/5 px-2 py-1 rounded">+8 New</span>
               </div>
               <p className="text-white/40 text-[10px] md:text-xs font-bold uppercase tracking-wider mb-1">Referral Earnings</p>
               <p className="text-lg md:text-2xl font-bold text-white truncate">${stats.referrals.toLocaleString()}</p>
            </div>

            <div className="bg-[#151515] rounded-2xl p-4 md:p-5 border border-white/5 hover:border-red-500/30 transition-colors group">
               <div className="flex justify-between items-start mb-4">
                  <div className="p-2 md:p-3 rounded-xl bg-red-500/10 text-red-400 group-hover:scale-110 transition-transform">
                     <TrendingDown size={20} className="md:w-6 md:h-6" />
                  </div>
                  <span className="text-[9px] md:text-[10px] font-bold text-white/30 bg-white/5 px-2 py-1 rounded">Limit: 2k</span>
               </div>
               <p className="text-white/40 text-[10px] md:text-xs font-bold uppercase tracking-wider mb-1">Total Expenses</p>
               <p className="text-lg md:text-2xl font-bold text-white truncate">-${stats.expenses.toLocaleString()}</p>
            </div>
         </div>
      </motion.div>

      {/* VIRTUAL CARD */}
      <motion.div variants={item} className="mb-8">
        <button
          onClick={() => setShowVirtualCard(!showVirtualCard)}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#111] to-[#161616] border border-white/10 flex items-center justify-between group active:scale-[0.99] transition-all shadow-lg hover:shadow-cyan-900/10 hover:border-white/20"
        >
           <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-white/5 text-purple-400 group-hover:text-white group-hover:bg-purple-500 transition-colors">
                <CreditCard size={20} />
              </div>
              <span className="font-bold text-white tracking-widest uppercase text-xs md:text-sm">
                 {showVirtualCard ? 'Hide Virtual Card' : 'View Virtual Card'}
              </span>
           </div>
           <ChevronDown 
              size={18} 
              className={`text-white/40 transition-transform duration-300 ${showVirtualCard ? 'rotate-180 text-white' : ''}`} 
           />
        </button>

        <AnimatePresence>
          {showVirtualCard && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: 'auto', marginTop: 24 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              className="overflow-hidden"
            >
               <div className="w-full max-w-lg mx-auto h-[260px] relative z-10">
                 {/* ThreeDCard is a CSS-only component, so no Suspense needed */}
                 <ThreeDCard />
               </div>
               
               <div className="mt-2 flex justify-center pb-4">
                 <button className="flex items-center gap-2 text-xs font-bold text-white/40 hover:text-white transition-colors uppercase tracking-widest">
                    <Copy size={12} /> Copy Card Number
                 </button>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* HISTORY */}
      <motion.div variants={item} className="bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden">
         <div className="px-6 py-5 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
            <h3 className="text-lg font-bold text-white flex items-center gap-3">
              <History size={18} className="text-cyan-400" /> 
              TRANSACTION HISTORY
            </h3>
            <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-colors">
               <Download size={16} />
            </button>
         </div>

         <div className="divide-y divide-white/5">
            {loading ? (
              <div className="p-10 flex flex-col items-center justify-center gap-4 text-white/20">
                <Loader2 size={32} className="animate-spin text-cyan-500" />
                <span className="text-[10px] font-black uppercase tracking-widest">Accessing Vault...</span>
              </div>
            ) : transactions.length > 0 ? (
              transactions.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between px-6 py-4 hover:bg-white/[0.03] transition-colors group">
                  <div className="flex items-center gap-4">
                     <div className={`w-10 h-10 rounded-xl flex items-center justify-center border border-white/5 ${
                        tx.type === 'deposit' 
                           ? 'bg-emerald-500/5 text-emerald-400 border-emerald-500/20' 
                           : 'bg-white/5 text-white/60'
                     }`}>
                        {tx.type === 'deposit' ? <ArrowDownLeft size={16} /> : <ArrowUpRight size={16} />}
                     </div>
                     <div>
                        <h4 className="font-bold text-white text-sm mb-0.5">{tx.title}</h4>
                        <div className="flex items-center gap-2">
                           <span className="text-[10px] text-white/30 font-mono">{tx.date || new Date(tx.timestamp).toLocaleString()}</span>
                           <span className="text-[10px] text-white/30 bg-white/5 px-1.5 rounded">{tx.method}</span>
                        </div>
                     </div>
                  </div>
                  <div className="text-right">
                     <p className={`font-mono font-bold text-base ${tx.type === 'deposit' ? 'text-emerald-400' : 'text-white'}`}>
                        {tx.type === 'deposit' ? '+' : '-'}${Math.abs(tx.amount).toFixed(2)}
                     </p>
                     <p className="text-[9px] text-white/20 uppercase font-bold tracking-wider mt-0.5">
                        {tx.status}
                     </p>
                  </div>
               </div>
              ))
            ) : (
              <div className="p-10 text-center text-white/20 uppercase tracking-widest text-xs font-black animate-pulse">
                No Transactions Found
              </div>
            )}
         </div>
      </motion.div>
    </motion.div>
  );
};

export default memo(WalletPage);
