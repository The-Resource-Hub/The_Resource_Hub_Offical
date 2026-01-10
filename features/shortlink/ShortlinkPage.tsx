import React, { useState, useEffect, memo } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  BarChart3, 
  Globe, 
  ExternalLink,
  Scissors,
  Wallet,
} from 'lucide-react';
import { userService, UserProfile } from '../../services/userService';

// --- TYPES ---
interface ActiveLink {
  id: number;
  original: string;
  short: string;
  clicks: number;
  region: string;
  status: string;
  earnings: number;
}

// --- MOCK DATA ---
const MOCK_ACTIVE_LINKS: ActiveLink[] = [
  { id: 1, original: 'https://dribbble.com/shots/23941...', short: 'res.hub/x8k29', clicks: 1240, region: 'US, IN', status: 'Active', earnings: 12.40 },
  { id: 2, original: 'https://youtube.com/watch?v=dQw...', short: 'res.hub/r1l02', clicks: 850, region: 'Global', status: 'Active', earnings: 8.50 },
  { id: 3, original: 'https://github.com/facebook/rea...', short: 'res.hub/dev01', clicks: 420, region: 'UK, DE', status: 'Paused', earnings: 4.20 },
  { id: 4, original: 'https://www.google.com/search?q=g...', short: 'res.hub/gogl1', clicks: 1500, region: 'US', status: 'Active', earnings: 15.00 },
];

interface ShortlinkPageProps {
  balance: number;
  updateBalance: (newBalance: number) => void;
  onWalletClick: () => void;
  onViewRewards: () => void;
}

const ShortlinkPage: React.FC<ShortlinkPageProps> = ({ balance: propBalance, onWalletClick, onViewRewards }) => {
  const [activeLinks] = useState<ActiveLink[]>(MOCK_ACTIVE_LINKS);
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const mockUid = "MOCK_USER_ID";
    const unsubscribe = userService.subscribeToProfile(mockUid, (p) => {
      setProfile(p);
    });
    return unsubscribe;
  }, []);

  const balance = profile?.balance ?? propBalance;
  const totalShortlinkEarnings = profile?.stats?.shortLinks ?? MOCK_ACTIVE_LINKS.reduce((sum, link) => sum + link.earnings, 0);

  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="w-full max-w-5xl mx-auto pt-8 pb-20 relative px-4">
      {/* Background ambience */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-indigo-900/10 blur-[120px] rounded-full -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-cyan-900/10 blur-[120px] rounded-full -z-10 pointer-events-none" />

      {/* Page Title */}
      <motion.div variants={item} className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em] mb-6 backdrop-blur-md">
           <Scissors size={12} /> Quantum Hub
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4">
          SHORTLINK <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">OVERVIEW</span>
        </h1>
        <p className="text-white/40 max-w-xl mx-auto text-lg">Your earnings dashboard for all active shortlinks.</p>
      </motion.div>

      {/* Balance Box */}
      <motion.div variants={item} className="mb-16">
        <div className="relative w-full bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 overflow-hidden group text-center shadow-2xl shadow-indigo-900/10">
           <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-[#0a0a0a] to-[#0a0a0a] opacity-50" />
           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50" />
           
           <div className="relative z-10 flex flex-col md:flex-row items-center justify-around gap-6">
              <div className="flex flex-col items-center">
                 <p className="text-indigo-400 text-xs font-bold uppercase tracking-[0.2em] mb-2">Current Balance</p>
                 <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter drop-shadow-[0_0_20px_rgba(99,102,241,0.3)]">
                    ${balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                 </h2>
                 <button 
                    onClick={onWalletClick}
                    className="mt-3 px-4 py-2 text-xs bg-white/5 border border-white/10 rounded-full text-white/70 hover:text-white hover:border-white/20 transition-all"
                 >
                    <Wallet size={12} className="inline-block mr-1" /> View Wallet
                 </button>
              </div>

              <div className="w-px h-20 bg-white/10 hidden md:block" />

              <div className="flex flex-col items-center">
                 <p className="text-cyan-400 text-xs font-bold uppercase tracking-[0.2em] mb-2">Total Shortlink Earnings</p>
                 <h2 className="text-3xl md:text-4xl font-black text-white tracking-tighter">
                    ${totalShortlinkEarnings.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                 </h2>
                 <span className="mt-2 text-xs text-white/40 flex items-center gap-1">
                    <BarChart3 size={12} />
                    {MOCK_ACTIVE_LINKS.length} Active Links
                 </span>
              </div>
           </div>
        </div>
      </motion.div>

      {/* Active Links */}
      <motion.div variants={item}>
        <div className="flex items-center justify-between mb-6">
           <h3 className="text-xl font-bold text-white flex items-center gap-2"><BarChart3 className="text-cyan-400" /> Active Shortlinks</h3>
           <button className="text-xs font-bold text-white/30 hover:text-white uppercase tracking-widest transition-colors">View All Reports</button>
        </div>
        <div className="grid grid-cols-1 gap-4">
           {activeLinks.map((link) => (
             <div key={link.id} className="group bg-[#111] border border-white/5 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-white/20 transition-all">
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform"><Globe size={20} /></div>
                   <div>
                      <div className="flex items-center gap-2">
                         <h4 className="font-bold text-white text-lg tracking-tight">{link.short}</h4>
                         <a href="#" className="text-white/20 hover:text-white transition-colors"><ExternalLink size={12} /></a>
                      </div>
                      <p className="text-xs text-white/30 truncate max-w-[200px]">{link.original}</p>
                   </div>
                </div>
                <div className="flex items-center gap-8 md:gap-12 pl-14 md:pl-0">
                   <div><p className="text-[10px] uppercase font-bold text-white/20 mb-1">Total Clicks</p><p className="text-white font-mono font-bold">{link.clicks.toLocaleString()}</p></div>
                   <div><p className="text-[10px] uppercase font-bold text-white/20 mb-1">Earnings</p><p className="text-emerald-400 font-mono font-bold">${link.earnings.toFixed(2)}</p></div>
                   <div className="hidden md:block"><div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${link.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-yellow-500/10 text-yellow-400'}`}>{link.status}</div></div>
                   <button className="p-2 hover:bg-white/10 rounded-lg text-white/20 hover:text-white transition-colors ml-auto"><ArrowRight size={18} /></button>
                </div>
             </div>
           ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default memo(ShortlinkPage);
