
import React, { useState, useCallback, memo } from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, User, Lock, ArrowRight, X } from 'lucide-react';

interface AdminLoginPageProps {
  onLoginSuccess: () => void;
  onClose?: () => void;
}

const AdminLoginPage: React.FC<AdminLoginPageProps> = ({ onLoginSuccess, onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    // Simulated network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Owner credentials check
    if (username === 'Hacker' && password === 'Online') {
      onLoginSuccess();
    } else {
      setError('Invalid credentials. Identity unknown.');
    }
    setIsLoading(false);
  }, [username, password, onLoginSuccess]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-3xl overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-[#0f0f0f] border border-white/10 rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-14 w-full max-w-md relative shadow-2xl overflow-hidden my-auto"
      >
        {/* Glow effect */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-50 shadow-[0_0_20px_rgba(239,68,68,0.5)]" />
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-red-600/10 blur-[60px] rounded-full" />
        
        {onClose && (
          <button 
            onClick={onClose}
            className="absolute top-6 md:top-8 right-6 md:right-8 p-2.5 md:p-3 rounded-xl md:rounded-2xl bg-white/5 text-white/30 hover:text-white hover:bg-white/10 transition-all active:scale-90"
          >
            <X size={20} />
          </button>
        )}

        <div className="mb-10 md:mb-12 text-center">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl md:rounded-3xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-6 md:mb-8 shadow-xl">
            <ShieldAlert size={32} className="text-red-500 md:w-10 md:h-10 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
          </div>
          <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-white uppercase mb-2">
            RESTRICTED <span className="text-red-500">ACCESS</span>
          </h2>
          <p className="text-white/20 text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em]">Owner Identity Verification</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 md:space-y-5">
          <div className="relative group">
            <User className="absolute left-4 md:left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-red-500 transition-colors" size={18} md:size={20} />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-[1.25rem] py-4 md:py-4.5 pl-12 md:pl-14 pr-4 md:pr-6 text-white text-sm md:text-base outline-none focus:border-red-500/50 transition-all placeholder:text-white/10"
              disabled={isLoading}
              required
            />
          </div>

          <div className="relative group">
            <Lock className="absolute left-4 md:left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-red-500 transition-colors" size={18} md:size={20} />
            <input
              type="password"
              placeholder="Security Key"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-[1.25rem] py-4 md:py-4.5 pl-12 md:pl-14 pr-4 md:pr-6 text-white text-sm md:text-base outline-none focus:border-red-500/50 transition-all placeholder:text-white/10"
              disabled={isLoading}
              required
            />
          </div>

          {error && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-[9px] md:text-[10px] font-black text-center uppercase tracking-widest bg-red-500/10 py-2 rounded-lg border border-red-500/20">
              {error}
            </motion.p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 md:py-5 rounded-xl md:rounded-[1.5rem] bg-white text-black font-black uppercase tracking-widest text-xs md:text-sm hover:bg-red-500 hover:text-white transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2 md:gap-3 group mt-6 md:mt-8 shadow-2xl shadow-black/50"
          >
            {isLoading ? (
              <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
            ) : (
              <>
                Initialize Access <ArrowRight size={18} md:size={20} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default memo(AdminLoginPage);
