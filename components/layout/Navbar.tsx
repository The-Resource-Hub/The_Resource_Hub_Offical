
import React from 'react';
import { Menu, Bell, ShoppingCart, User, LayoutGrid, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

interface NavbarProps {
  onMenuClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-black/40 border-b border-white/10 px-4 md:px-8 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="p-2 hover:bg-white/10 rounded-full transition-colors text-white flex items-center gap-2"
        >
          <Menu size={24} />
          <span className="text-sm font-bold uppercase tracking-wider hidden sm:block">Menu</span>
        </button>
        <div className="hidden md:block">
          <span className="text-xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent tracking-tighter">
            THE RESOURCE HUB
          </span>
        </div>
      </div>
      
      <div className="flex items-center gap-2 md:gap-4">
        {!localStorage.getItem('user_session_token') && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => (window as any).dispatchView?.('auth')}
            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:text-white transition-all"
          >
            <Zap size={16} className="text-cyan-400" />
            <span className="text-xs font-bold uppercase tracking-wider">Access Portal</span>
          </motion.button>
        )}
        <button className="p-2 hover:bg-white/10 rounded-full transition-colors text-white relative">
          <Bell size={24} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-cyan-500 rounded-full border border-black animate-pulse"></span>
        </button>
        <button className="p-2 hover:bg-white/10 rounded-full transition-colors text-white">
          <ShoppingCart size={24} />
        </button>
        <button 
          onClick={() => (window as any).dispatchView?.('profile')}
          className="p-2 hover:bg-white/10 rounded-full transition-colors text-white"
        >
          <User size={24} />
        </button>
      </div>
    </nav>
  );
};

export default React.memo(Navbar);