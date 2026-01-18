
import React, { useState, useEffect, memo } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Shield, Calendar, Wallet, Award, Settings, LogOut, Camera, ChevronRight, Zap, Star, ArrowLeft } from 'lucide-react';
import { userService, UserProfile as UserProfileType } from '../../services/userService';

interface UserProfileProps {
  onBack: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ onBack }) => {
  const [profile, setProfile] = useState<UserProfileType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const uid = localStorage.getItem('user_session_token');
    if (uid) {
      const unsub = userService.subscribeToProfile(uid, (data) => {
        setProfile(data);
        setLoading(false);
      });
      return unsub;
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogout = async () => {
    await userService.logout();
    window.location.reload();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020202] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020202] text-white font-sans selection:bg-cyan-500/30">
      {/* Ambient Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-900/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-900/10 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Return to Hub
          </button>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">Node Status:</span>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400">Online & Verified</span>
          </div>
        </div>

        {/* Profile Hero */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative p-8 md:p-12 rounded-[3rem] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/10 shadow-2xl overflow-hidden mb-8"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50" />
          
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 relative z-10">
            <div className="relative group">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-[2.5rem] bg-gradient-to-br from-cyan-500 to-blue-600 p-1">
                <div className="w-full h-full rounded-[2.3rem] bg-[#0a0a0a] flex items-center justify-center overflow-hidden">
                  {profile?.photoURL ? (
                    <img src={profile.photoURL} className="w-full h-full object-cover" alt="Profile" />
                  ) : (
                    <User size={60} className="text-white/20" />
                  )}
                </div>
              </div>
              <button className="absolute bottom-2 right-2 p-3 rounded-2xl bg-white text-black hover:bg-cyan-400 transition-all shadow-xl group-hover:scale-110">
                <Camera size={18} />
              </button>
            </div>

            <div className="text-center md:text-left flex-1">
              <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase leading-none">{profile?.displayName || 'Galaxy Architect'}</h1>
                <div className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-black uppercase tracking-widest self-center md:self-auto">
                  LVL {Math.floor((profile?.referralStats?.xp || 0) / 100) + 1}
                </div>
              </div>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-6 text-white/40">
                <div className="flex items-center gap-2">
                  <Mail size={16} className="text-cyan-500/50" />
                  <span className="text-xs font-bold uppercase tracking-wider">{profile?.email || 'neural-id@galaxy.hub'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-purple-500/50" />
                  <span className="text-xs font-bold uppercase tracking-wider">Joined {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Unknown'}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Neural Balance', val: `$${profile?.balance || 0}`, icon: Wallet, color: 'text-emerald-400' },
            { label: 'XP Points', val: profile?.referralStats?.xp || 0, icon: Zap, color: 'text-cyan-400' },
            { label: 'Shortlinks', val: profile?.stats?.shortLinks || 0, icon: Star, color: 'text-purple-400' },
            { label: 'Referrals', val: profile?.stats?.referrals || 0, icon: Award, color: 'text-amber-400' }
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors group"
            >
              <stat.icon className={`mb-4 \${stat.color} opacity-50 group-hover:opacity-100 transition-opacity`} size={20} />
              <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em] mb-1">{stat.label}</p>
              <h3 className="text-xl font-black">{stat.val}</h3>
            </motion.div>
          ))}
        </div>

        {/* Actions List */}
        <div className="space-y-4">
          {[
            { label: 'Neural Identity', icon: Settings, desc: 'Update your signature and preferences' },
            { label: 'Security Protocols', icon: Shield, desc: 'Manage access keys and authentication' },
            { label: 'Node Withdrawal', icon: Wallet, desc: 'Transfer credits to external storage' }
          ].map((action, i) => (
            <button 
              key={i}
              className="w-full p-6 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white/40 group-hover:text-cyan-400 group-hover:bg-cyan-500/10 transition-all">
                  <action.icon size={24} />
                </div>
                <div className="text-left">
                  <h4 className="text-sm font-black uppercase tracking-widest">{action.label}</h4>
                  <p className="text-[10px] font-bold text-white/20 uppercase mt-1">{action.desc}</p>
                </div>
              </div>
              <ChevronRight size={20} className="text-white/10 group-hover:text-white transition-colors" />
            </button>
          ))}

          <button 
            onClick={handleLogout}
            className="w-full p-6 rounded-[2rem] bg-red-500/5 border border-red-500/10 hover:bg-red-500/10 transition-all flex items-center gap-6 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-500">
              <LogOut size={24} />
            </div>
            <div className="text-left">
              <h4 className="text-sm font-black uppercase tracking-widest text-red-500">Terminate Session</h4>
              <p className="text-[10px] font-bold text-red-500/30 uppercase mt-1">Safely exit the neural hub</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(UserProfile);
