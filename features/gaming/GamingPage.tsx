import React, { useState, useRef, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, Wallet, Activity, Puzzle, Eye, 
  Timer, Crosshair, Grid, Headphones, Trophy, 
  Home, Shield, Swords, LogOut, Brain, Zap,
  Rocket
} from 'lucide-react';
import { userService, UserProfile } from '../../services/userService';

// --- TYPES ---
interface Game {
  id: number;
  title: string;
  category: string;
  image: string;
  level: number;
  xp: number; 
  maxXp: number; 
  rating: number;
  players: string;
}

const GAMES: Game[] = [];

const CATEGORIES = [
  { id: 'all', label: 'All', icon: Brain },
  { id: 'reflex', label: 'Reflex', icon: Zap },
  { id: 'strategy', label: 'Strategy', icon: Crosshair },
  { id: 'logic', label: 'Logic', icon: Puzzle },
  { id: 'memory', label: 'Memory', icon: Activity },
  { id: 'patterns', label: 'Patterns', icon: Grid },
  { id: 'attention', label: 'Attention', icon: Eye },
  { id: 'math', label: 'Math', icon: Timer },
  { id: 'audio', label: 'Audio', icon: Headphones },
];

// --- LIGHTWEIGHT GAMING HERO ---
const GamingHero = memo(() => (
  <div className="relative w-full h-[200px] bg-gradient-to-br from-[#111] to-[#0a0a0a] rounded-3xl overflow-hidden border border-white/10 shadow-lg flex items-center justify-center">
    <motion.div 
      animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.3, 0.6, 0.3] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      className="absolute inset-0 bg-purple-500/10 blur-3xl rounded-full"
    />
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="relative z-10 p-6 rounded-full bg-white/5 border border-white/10 shadow-xl"
    >
      <Rocket size={48} className="text-cyan-400" />
    </motion.div>
    <h2 className="absolute bottom-4 text-white text-xl font-black tracking-widest uppercase z-20">Nexus Online</h2>
  </div>
));

// --- CUSTOM MENU ---
const GamingMenu = memo(({ isOpen, onClose, onNavigate }: { isOpen: boolean, onClose: () => void, onNavigate: (path: string) => void }) => {
  if (!isOpen) return null;
  const menuItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'tournament', label: 'Tournament', icon: Trophy },
    { id: 'clan', label: 'Clan', icon: Shield },
    { id: '2v2', label: '2v2', icon: Swords },
    { id: 'back', label: 'Back', icon: LogOut },
  ];
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9, y: -20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      className="absolute top-16 left-4 z-50 w-56 bg-[#0e0e0e] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
    >
      <div className="p-2 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-colors text-white/70 hover:text-white group text-left"
          >
            <item.icon size={18} className={item.id === 'back' ? 'text-red-400' : 'group-hover:text-cyan-400'} />
            <span className="font-bold text-sm">{item.label}</span>
          </button>
        ))}
      </div>
    </motion.div>
  );
});

interface GamingPageProps {
  onMenuClick: () => void; 
  onWalletClick: () => void;
  onBack: () => void;
  balance: number;
}

const GamingPage: React.FC<GamingPageProps> = ({ onMenuClick, onWalletClick, onBack, balance: propBalance }) => {
  const [activeTab, setActiveTab] = useState('all');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const mockUid = "MOCK_USER_ID";
    const unsubscribe = userService.subscribeToProfile(mockUid, (p) => {
      setProfile(p);
    });
    return unsubscribe;
  }, []);

  const balance = profile?.balance ?? propBalance;

  return (
    <div className="flex flex-col h-screen bg-[#0a0a0a] overflow-hidden relative">
      <div className="flex items-center justify-between px-4 md:px-8 py-4 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/5 z-40 sticky top-0">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-white"><Menu size={24} /></button>
        <AnimatePresence>
          {isMenuOpen && <GamingMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} onNavigate={(id) => { if(id==='back') onBack(); setIsMenuOpen(false); }} />}
        </AnimatePresence>
        <h1 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 tracking-widest">GAMING ZONE</h1>
        <button onClick={onWalletClick} className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full">
          <Wallet size={16} className="text-white/60" />
          <span className="text-sm font-bold text-white">${balance.toLocaleString()}</span>
        </button>
      </div>
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="w-full max-w-4xl mx-auto px-4 md:px-8 pb-16">
          <div className="w-full h-[200px] mt-6 mb-8"><GamingHero /></div>
          <div className="text-center py-20 opacity-20 uppercase font-black tracking-[0.5em]">No Active Tournaments</div>
        </div>
      </div>
    </div>
  );
};

export default memo(GamingPage);
