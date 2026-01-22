
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Home, 
  Gamepad2, 
  Users, 
  Headphones, 
  Code, 
  Info,
  Globe,
  Zap,
  Wallet,
  ShoppingBag,
  Crown,
  Link as LinkIcon,
  Sparkles,
  Cpu 
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: string) => void;
}

const MENU_ITEMS = [
  { id: 'home', label: 'Home', icon: Home, color: 'from-blue-500 to-cyan-400' },
  { id: 'premium', label: 'Premium', icon: Crown, color: 'from-amber-400 to-yellow-600' }, 
  { id: 'orders', label: 'My Orders', icon: ShoppingBag, color: 'from-violet-500 to-purple-500' }, 
  { id: 'wallet', label: 'Wallet', icon: Wallet, color: 'from-emerald-400 to-green-600' },
  
  { id: 'gaming', label: 'Gaming Zone', icon: Gamepad2, color: 'from-purple-500 to-pink-500' },
  { id: 'shree-gen', label: 'Shree Gen AI', icon: Sparkles, color: 'from-pink-500 to-rose-500' },
  { id: 'global-chat', label: 'Global Chat', icon: Globe, color: 'from-blue-400 to-indigo-500' },
  { id: 'shortlink', label: 'Shortlink', icon: LinkIcon, color: 'from-indigo-400 to-cyan-400' }, 
  
  { id: 'referral', label: 'Referral', icon: Users, color: 'from-teal-400 to-cyan-500' },
  { id: 'support', label: 'Support', icon: Headphones, color: 'from-orange-500 to-red-500' },
  { id: 'dev', label: 'Developer', icon: Code, color: 'from-indigo-500 to-blue-500' },
  { id: 'shree-gen-api', label: 'Shree Gen API', icon: Cpu, color: 'from-cyan-500 to-blue-600' },
  { id: 'about', label: 'About', icon: Info, color: 'from-gray-400 to-gray-600' },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, onNavigate }) => {
  const handleNavigation = (id: string) => {
    onNavigate(id);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-md"
            onClick={onClose}
          />

          <motion.aside 
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '-100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 z-[101] h-full w-full max-w-[320px] bg-[#050505] border-r border-white/10 flex flex-col shadow-2xl"
          >
            <div className="p-8 border-b border-white/5 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cyan-500/10 via-transparent to-transparent opacity-40 pointer-events-none" />
              
              <div className="relative flex items-center justify-between">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2 mb-1">
                    <Zap size={14} className="text-cyan-400 fill-cyan-400/20" />
                    <span className="text-[10px] uppercase tracking-[0.4em] text-white/30 font-black">Main Hub</span>
                  </div>
                  <h2 className="text-lg font-black tracking-tighter text-white">
                    THE RESOURCE <span className="text-cyan-500">HUB</span>
                  </h2>
                </div>
                <motion.button 
                  whileHover={{ rotate: 90, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-2.5 rounded-full bg-white/5 border border-white/10 text-white/50 hover:text-white transition-all shadow-lg"
                >
                  <X size={18} />
                </motion.button>
              </div>
            </div>

            <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto no-scrollbar">
              {MENU_ITEMS.map((item, index) => {
                const Icon = item.icon;
                const isGroupStart = item.id === 'gaming' || item.id === 'referral';
                
                return (
                  <React.Fragment key={item.id}>
                    {isGroupStart && <div className="h-4" />}
                    
                    <motion.button
                      onClick={() => handleNavigation(item.id)}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + index * 0.05, type: 'spring', stiffness: 120 }}
                      whileHover={{ x: 8 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full group relative flex items-center justify-between p-3 rounded-2xl transition-all duration-300 hover:bg-white/[0.04]"
                    >
                      <div className="flex items-center gap-4 relative z-10">
                        <div className="relative p-2.5 rounded-xl bg-white/5 text-white/40 group-hover:text-white transition-all duration-500">
                          <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 bg-gradient-to-br ${item.color} blur-md transition-opacity duration-500 -z-10`} />
                          <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 bg-gradient-to-br ${item.color} transition-opacity duration-500 -z-10`} />
                          <Icon size={18} className="relative z-10" />
                        </div>
                        <div className="flex flex-col items-start">
                          <span className="text-sm font-bold text-white/60 group-hover:text-white tracking-wide transition-colors">
                            {item.label}
                          </span>
                        </div>
                      </div>
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 group-hover:h-6 bg-white/20 rounded-r-full transition-all duration-300 opacity-0 group-hover:opacity-100" />
                    </motion.button>
                  </React.Fragment>
                );
              })}
            </nav>

            <div className="p-6 bg-black/60 border-t border-white/5">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="relative p-5 rounded-2xl bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 overflow-hidden group cursor-default"
              >
                <div className="absolute -top-10 -right-10 w-24 h-24 bg-cyan-500/10 blur-[40px] rounded-full group-hover:bg-cyan-500/20 transition-all duration-700" />
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-black shadow-inner relative overflow-hidden">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_10px_#06b6d4]" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-white/80 uppercase tracking-tighter">System Core v1.0.5</p>
                    <p className="text-[8px] text-white/30 uppercase tracking-[0.2em] mt-0.5">Verified Connection</p>
                  </div>
                </div>
                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ x: '-100%' }}
                    animate={{ x: '100%' }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
                    className="h-full w-1/2 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"
                  />
                </div>
              </motion.div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
