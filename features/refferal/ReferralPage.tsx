
import React, { useState, memo } from 'react';
import { motion } from 'framer-motion';
import { Copy, Gift, Users, Trophy, Zap, Check, Star, Gem } from 'lucide-react';

const ReferralPage: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const inviteLink = "resourcehub.io/ref/u/alex_design";

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemAnim = {
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
                  <h3 className="text-4xl font-black text-white mb-2">$1,250.00</h3>
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold bg-emerald-400/10 px-2 py-1 rounded inline-block">
                     <Zap size={10} fill="currentColor" /> +12% this week
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
                  <h3 className="text-4xl font-black text-white mb-2">142</h3>
                  <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold bg-cyan-400/10 px-2 py-1 rounded inline-block">
                     <Users size={10} /> 5 new today
                  </div>
               </div>
               <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-transparent opacity-50" />
            </div>

            <div className="relative p-8 rounded-3xl bg-[#111]/50 border border-white/10 overflow-hidden group hover:border-white/20 transition-all backdrop-blur-sm">
               <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-700">
                  <Trophy size={120} />
               </div>
               <div className="relative z-10">
                  <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-2">Current Tier</p>
                  <h3 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-2">Diamond</h3>
                  <div className="text-white/50 text-xs font-medium">
                     Top 5% of affiliates
                  </div>
               </div>
               <div className="mt-6">
                 <div className="flex justify-between text-[10px] uppercase font-bold text-white/30 mb-1">
                    <span>Progress</span>
                    <span>900 / 1000 XP</span>
                 </div>
                 <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: '90%' }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                    />
                 </div>
               </div>
            </div>
         </div>
      </motion.div>
    </motion.div>
  );
};

export default memo(ReferralPage);
