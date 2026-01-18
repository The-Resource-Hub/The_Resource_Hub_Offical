
import React, { useState, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, Github, Chrome, ShieldCheck, Sparkles, Eye, EyeOff } from 'lucide-react';

interface AuthPageProps {
  onBack: () => void;
  onSuccess: () => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onBack, onSuccess }) => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulation
    setTimeout(() => {
      setLoading(false);
      onSuccess();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#020202] text-white flex items-center justify-center p-6 relative overflow-hidden font-sans">
      
      {/* 3D Ambient Background */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-cyan-500/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-500/10 blur-[120px] rounded-full" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="w-full max-w-[450px] relative z-10"
      >
        {/* Card with Glassmorphism & 3D Effect */}
        <div className="bg-[#0a0a0a]/80 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden group">
          
          {/* Top Decorative bar */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50" />
          
          <div className="text-center mb-10">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-cyan-500/20 rotate-12 group-hover:rotate-0 transition-transform duration-500"
            >
              <ShieldCheck size={32} className="text-white" />
            </motion.div>
            <h2 className="text-3xl font-black tracking-tighter uppercase mb-2">
              {mode === 'login' ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-white/40 text-xs font-bold uppercase tracking-widest">
              Secure Neural Access <span className="text-cyan-500">v2.0</span>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <AnimatePresence mode="wait">
              {mode === 'signup' && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-2"
                >
                  <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] ml-2">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                    <input 
                      type="text" 
                      required
                      placeholder="Neural Architect"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:border-cyan-500 focus:bg-white/[0.08] outline-none transition-all placeholder:text-white/10"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] ml-2">Email Identity</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                <input 
                  type="email" 
                  required
                  placeholder="core@nexus.com"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:border-cyan-500 focus:bg-white/[0.08] outline-none transition-all placeholder:text-white/10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] ml-2">Neural Key</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  required
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-12 text-sm focus:border-cyan-500 focus:bg-white/[0.08] outline-none transition-all placeholder:text-white/10"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-white text-black font-black uppercase tracking-widest py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-cyan-400 transition-all active:scale-95 disabled:opacity-50 shadow-xl shadow-cyan-500/10 mt-4 overflow-hidden relative group"
            >
              <span className="relative z-10">{loading ? 'Processing...' : mode === 'login' ? 'Authorize' : 'Initialize'}</span>
              {!loading && <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </form>

          <div className="mt-10">
            <div className="relative flex items-center justify-center mb-8">
              <div className="absolute w-full h-[1px] bg-white/5" />
              <span className="relative px-4 bg-[#0a0a0a] text-[9px] font-black text-white/20 uppercase tracking-[0.3em]">Neural Bridge</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-3 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-xs font-bold">
                <Chrome size={16} /> Google
              </button>
              <button className="flex items-center justify-center gap-3 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-xs font-bold">
                <Github size={16} /> GitHub
              </button>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button 
              onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
              className="text-xs font-bold text-white/40 hover:text-cyan-400 transition-colors uppercase tracking-widest"
            >
              {mode === 'login' ? "New Architect? Create Access" : "Existing Node? Authorize"}
            </button>
          </div>
        </div>

        {/* Back Button */}
        <motion.button 
          whileHover={{ x: -5 }}
          onClick={onBack}
          className="mt-8 mx-auto flex items-center gap-2 text-[10px] font-black text-white/30 uppercase tracking-widest hover:text-white transition-colors"
        >
          <ArrowRight size={14} className="rotate-180" /> Return to Terminal
        </motion.button>
      </motion.div>

      {/* Floating Particles */}
      <div className="absolute top-[20%] right-[10%] opacity-20 animate-bounce">
        <Sparkles size={40} className="text-cyan-500" />
      </div>
      <div className="absolute bottom-[20%] left-[10%] opacity-20 animate-pulse delay-700">
        <Sparkles size={30} className="text-purple-500" />
      </div>
    </div>
  );
};

export default memo(AuthPage);
