
import React, { useState, memo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Gift, Users, Trophy, Zap, Check, Star, Gem, Info, ChevronRight } from 'lucide-react';
import { userService, UserProfile } from '../../services/userService';

const RANKS = [
  { name: 'Bronze', color: 'from-orange-400 to-orange-700', minNetwork: 0 },
  { name: 'Silver', color: 'from-slate-300 to-slate-500', minNetwork: 10 },
  { name: 'Gold', color: 'from-yellow-400 to-yellow-600', minNetwork: 50 },
  { name: 'Diamond', color: 'from-cyan-400 to-blue-600', minNetwork: 200 },
];

const getRankDetails = (networkSize: number) => {
  let currentRankIndex = 0;
  for (let i = RANKS.length - 1; i >= 0; i--) {
    if (networkSize >= RANKS[i].minNetwork) {
      currentRankIndex = i;
      break;
    }
  }
  
  const currentRank = RANKS[currentRankIndex];
  const nextRank = RANKS[currentRankIndex + 1];
  
  // 5 sub-ranks per tier based on network size
  const networkInTier = networkSize - currentRank.minNetwork;
  const tierRange = nextRank ? (nextRank.minNetwork - currentRank.minNetwork) : 500;
  const progress = Math.min(100, (networkInTier / tierRange) * 100);
  const subRank = Math.min(5, Math.floor((progress / 100) * 5) + 1);
  
  return {
    rankName: `${currentRank.name} ${subRank}`,
    tierName: currentRank.name,
    color: currentRank.color,
    progress,
    subRank,
    nextNetwork: nextRank ? nextRank.minNetwork : 'MAX',
    currentNetwork: networkSize
  };
};

const ReferralPage: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [showRankGuide, setShowRankGuide] = useState(false);
  
  useEffect(() => {
    const mockUid = "MOCK_USER_ID";
    const unsubscribe = userService.subscribeToProfile(mockUid, (p) => {
      setProfile(p);
    });
    return unsubscribe;
  }, []);

  const referralStats = profile?.referralStats ?? { totalEarnings: 0, networkSize: 0, xp: 0 };
  const rankInfo = getRankDetails(referralStats.networkSize);
  const inviteLink = `resourcehub.io/ref/u/${profile?.referralCode ?? 'INVITE'}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemAnim: any = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="w-full relative min-h-screen pb-20 overflow-hidden"
    >
      <AnimatePresence>
        {showRankGuide && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setShowRankGuide(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-[#0e0e0e] border border-white/10 rounded-[2.5rem] p-8 max-w-lg w-full shadow-2xl overflow-hidden relative"
              onClick={e => e.stopPropagation()}
            >
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500" />
               <h2 className="text-2xl font-black text-white mb-6 uppercase tracking-tighter">Rank Progression Guide</h2>
               <div className="space-y-4">
                 {RANKS.map((r, i) => (
                   <div key={r.name} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
                     <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${r.color} flex items-center justify-center shadow-lg shadow-black/20`}>
                           <Trophy size={18} className="text-white" />
                        </div>
                        <div>
                           <p className="text-white font-black uppercase text-sm tracking-wider">{r.name}</p>
                           <p className="text-white/30 text-[10px] font-bold">5 Sub-Ranks Available</p>
                        </div>
                     </div>
                     <div className="text-right">
                        <p className="text-white/20 text-[10px] font-black uppercase mb-1">Unlocks At</p>
                        <p className="text-cyan-400 font-mono font-bold text-sm">{r.minNetwork} Network</p>
                     </div>
                   </div>
                 ))}
               </div>
               <button 
                 onClick={() => setShowRankGuide(false)}
                 className="w-full mt-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-bold uppercase tracking-widest text-xs hover:bg-white/10 transition-colors"
               >
                 Close Guide
               </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CSS Background Ambience */}
      <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-purple-600 rounded-full mix-blend-screen filter blur-[120px] opacity-20 -z-10 pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-cyan-600 rounded-full mix-blend-screen filter blur-[120px] opacity-20 -z-10 pointer-events-none" />

      {/* --- HERO SECTION --- */}
      <div className="max-w-7xl mx-auto px-4 pt-8 md:pt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
        
        {/* Left: Content */}
        <motion.div variants={itemAnim} className="relative z-10 order-2 lg:order-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-yellow-500/30 bg-yellow-500/10 text-yellow-400 text-[10px] font-black uppercase tracking-[0.2em] mb-6 backdrop-blur-md">
            <Trophy size={12} /> Affiliate Program
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6 leading-[0.9]">
            INVITE. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 animate-pulse">EARN.</span> <br />
            REPEAT.
          </h1>
          
          <p className="text-white/50 text-lg max-w-md mb-8 leading-relaxed">
            Turn your network into net worth. Earn <span className="text-white font-bold">20% commission</span> on every purchase made by your referrals, forever.
          </p>

          {/* Referral Link Input */}
          <div className="relative group max-w-lg">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-75 transition duration-1000"></div>
            <div className="relative flex items-center bg-[#050505] border border-white/10 rounded-xl p-2 pr-2">
              <div className="pl-4 pr-2 flex-1 font-mono text-cyan-400 text-sm md:text-base truncate select-all">
                {inviteLink}
              </div>
              <button 
                onClick={handleCopy}
                className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-lg font-bold hover:bg-cyan-50 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.3)]"
              >
                {copied ? <Check size={18} /> : <Copy size={18} />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Right: Static Graphic Visualization */}
        <motion.div 
          variants={itemAnim}
          className="relative h-[300px] md:h-[400px] w-full order-1 lg:order-2 flex items-center justify-center"
        >
           <div className="relative w-64 h-64 md:w-80 md:h-80">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-full blur-[80px] opacity-30 animate-pulse" />
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent border border-white/20 backdrop-blur-xl rounded-[3rem] transform -rotate-6 z-10 flex items-center justify-center shadow-2xl">
                 <Gem size={80} className="text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.6)]" strokeWidth={1} />
              </div>
              <div className="absolute inset-0 bg-gradient-to-tl from-white/5 to-transparent border border-white/5 backdrop-blur-sm rounded-[3rem] transform rotate-6 scale-90 -z-10 translate-y-4" />
              <div className="absolute -top-4 -right-8 p-4 bg-[#111] border border-white/10 rounded-2xl shadow-xl animate-bounce" style={{ animationDuration: '3s' }}>
                 <Users className="text-cyan-400" size={24} />
              </div>
              <div className="absolute -bottom-4 -left-8 p-4 bg-[#111] border border-white/10 rounded-2xl shadow-xl animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>
                 <Gift className="text-purple-400" size={24} />
              </div>
           </div>
        </motion.div>
      </div>

      {/* --- STATS GRID --- */}
      <motion.div variants={itemAnim} className="max-w-7xl mx-auto px-4 mb-24">
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative p-8 rounded-3xl bg-[#111]/50 border border-white/10 overflow-hidden group hover:border-white/20 transition-all backdrop-blur-sm">
               <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-700">
                  <Gift size={120} />
               </div>
               <div className="relative z-10">
                  <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-2">Total Earnings</p>
                  <h3 className="text-4xl font-black text-white mb-2">${referralStats.totalEarnings.toLocaleString(undefined, { minimumFractionDigits: 2 })}</h3>
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold bg-emerald-400/10 px-2 py-1 rounded inline-block">
                     <Zap size={10} fill="currentColor" /> Lifetime Commission
                  </div>
               </div>
               <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-transparent opacity-50" />
            </div>

            <div className="relative p-8 rounded-3xl bg-[#111]/50 border border-white/10 overflow-hidden group hover:border-white/20 transition-all backdrop-blur-sm">
               <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-700">
                  <Users size={120} />
               </div>
               <div className="relative z-10">
                  <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-2">Network Size</p>
                  <h3 className="text-4xl font-black text-white mb-2">{referralStats.networkSize}</h3>
                  <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold bg-cyan-400/10 px-2 py-1 rounded inline-block">
                     <Users size={10} /> Active Referrals
                  </div>
               </div>
               <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-transparent opacity-50" />
            </div>

            <button 
              onClick={() => setShowRankGuide(true)}
              className="relative p-8 rounded-3xl bg-[#111]/50 border border-white/10 overflow-hidden group hover:border-white/20 transition-all backdrop-blur-sm text-left group"
            >
               <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-700">
                  <Trophy size={120} />
               </div>
               <div className="relative z-10">
                  <div className="flex justify-between items-start">
                    <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-2">Current Tier</p>
                    <Info size={14} className="text-white/20 group-hover:text-white/50 transition-colors" />
                  </div>
                  <h3 className={`text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r ${rankInfo.color} mb-2`}>{rankInfo.rankName}</h3>
                  <div className="flex gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star 
                        key={s} 
                        size={12} 
                        className={s <= rankInfo.subRank ? "text-yellow-400 fill-yellow-400" : "text-white/10"} 
                      />
                    ))}
                  </div>
                  <div className="text-white/50 text-xs font-medium flex items-center gap-1">
                     View rank progression <ChevronRight size={10} />
                  </div>
               </div>
               <div className="mt-6">
                 <div className="flex justify-between text-[10px] uppercase font-bold text-white/30 mb-1">
                    <span>Progress</span>
                    <span>{rankInfo.currentNetwork} / {rankInfo.nextNetwork} Network</span>
                 </div>
                 <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${rankInfo.progress}%` }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className={`h-full bg-gradient-to-r ${rankInfo.color}`}
                    />
                 </div>
               </div>
            </button>
         </div>
      </motion.div>
    </motion.div>
  );
};

export default memo(ReferralPage);
