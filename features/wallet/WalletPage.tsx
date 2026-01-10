import React, { useState, useEffect, memo } from 'react'; 
import { motion, AnimatePresence } from 'framer-motion';
import { userService, walletService, UserProfile } from '../../services/userService';
import { 
  ArrowUpRight, ArrowDownLeft, History, ShieldCheck,
  Gamepad2, Link as LinkIcon, Users, TrendingDown,
  CreditCard, ChevronDown, Copy, Loader2, Download
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
    const mockUid = "MOCK_USER_ID"; 
    const unsubProfile = userService.subscribeToProfile(mockUid, (p) => {
      setProfile(p);
      setLoading(false);
    });
    const unsubTxs = walletService.subscribeToTransactions(mockUid, (txs) => {
      setTransactions(txs);
      setLoading(false);
    });
    const timeout = setTimeout(() => setLoading(false), 5000);
    return () => { unsubProfile(); unsubTxs(); clearTimeout(timeout); };
  }, []);

  const balance = profile?.balance ?? 0;
  const stats = profile?.stats ?? { gameWinnings: 0, shortLinks: 0, referrals: 0, expenses: 0 };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-5xl mx-auto pt-8 pb-20 px-4">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-2">MY <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">VAULT</span></h1>
        <p className="text-white/40 text-xs uppercase tracking-widest font-bold">Secure Asset Management</p>
      </div>
      <div className="mb-8 relative w-full bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 text-center shadow-2xl">
        <p className="text-cyan-400 text-[10px] font-black uppercase tracking-[0.3em] mb-4">Available Balance</p>
        <h2 className="text-6xl font-black text-white tracking-tighter">${balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</h2>
      </div>
      <div className="bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden">
        <div className="px-6 py-5 border-b border-white/5 bg-white/[0.02] flex justify-between items-center">
          <h3 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-3"><History size={16} className="text-cyan-400" /> History</h3>
        </div>
        <div className="divide-y divide-white/5">
          {loading ? (
            <div className="p-20 flex flex-col items-center gap-4 text-white/20"><Loader2 size={32} className="animate-spin text-cyan-500" /><span className="text-[10px] font-black uppercase tracking-widest">Syncing Vault...</span></div>
          ) : transactions.length > 0 ? (
            transactions.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between px-6 py-4 hover:bg-white/[0.03] transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center border border-white/5 ${tx.type === 'deposit' ? 'bg-emerald-500/5 text-emerald-400' : 'bg-white/5 text-white/40'}`}>
                    {tx.type === 'deposit' ? <ArrowDownLeft size={16} /> : <ArrowUpRight size={16} />}
                  </div>
                  <div><h4 className="font-bold text-white text-sm">{tx.title}</h4><p className="text-[10px] text-white/30 font-mono">{new Date(tx.timestamp).toLocaleString()}</p></div>
                </div>
                <div className="text-right"><p className={`font-mono font-bold ${tx.type === 'deposit' ? 'text-emerald-400' : 'text-white'}`}>{tx.type === 'deposit' ? '+' : '-'}${Math.abs(tx.amount).toFixed(2)}</p><p className="text-[9px] text-white/20 font-black uppercase">{tx.status}</p></div>
              </div>
            ))
          ) : (
            <div className="p-20 text-center text-white/40 uppercase tracking-widest font-black text-xs">No Transaction Available</div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default memo(WalletPage);
