
import React from 'react';
import { motion } from 'framer-motion';
import { X, Plus, MessageSquare } from 'lucide-react';
import { ChatSession } from '../types';

interface HistorySidebarProps {
  isOpen: boolean;
  onClose: () => void;
  sessions: ChatSession[];
  onSelectSession: (session: ChatSession) => void;
  onNewChat: () => void;
}

// Default export for React.lazy
const HistorySidebar: React.FC<HistorySidebarProps> = ({ 
  isOpen, 
  onClose, 
  sessions, 
  onSelectSession, 
  onNewChat 
}) => {
  if (!isOpen) return null;

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-md"
        onClick={onClose}
      />
      <motion.aside
        initial={{ x: '100%', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: '100%', opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed top-0 right-0 z-[101] h-full w-full max-w-[280px] bg-[#050505] border-l border-white/10 flex flex-col shadow-2xl"
      >
        <div className="p-5 border-b border-white/5 flex items-center justify-between">
            <h3 className="text-sm font-black uppercase tracking-widest text-white">Chat History</h3>
            <button onClick={onClose}><X size={18} className="text-white/50 hover:text-white" /></button>
        </div>
        <div className="p-4">
            <button 
                onClick={() => { onNewChat(); onClose(); }} 
                className="w-full py-2.5 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 text-white/70 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
            >
                <Plus size={14} /> New Chat
            </button>
        </div>
        <div className="flex-1 overflow-y-auto px-4 space-y-2 custom-scrollbar">
            {sessions.map((session) => (
            <motion.div 
                key={session.id}
                whileHover={{ x: -4, backgroundColor: 'rgba(255,255,255,0.05)' }}
                onClick={() => { onSelectSession(session); onClose(); }} 
                className="p-3 rounded-lg cursor-pointer group transition-all border border-transparent hover:border-white/5"
            >
                <div className="flex items-center gap-3">
                    <MessageSquare size={14} className="text-white/30 group-hover:text-cyan-400" />
                    <div className="overflow-hidden">
                        <div className="text-xs font-bold text-white/80 group-hover:text-white truncate">{session.title}</div>
                        <div className="text-[10px] text-white/30 mt-1">{session.lastUpdated}</div>
                    </div>
                </div>
            </motion.div>
            ))}
            {sessions.length === 0 && (
                <div className="text-center py-10 text-white/20 text-xs">
                    No history yet.
                </div>
            )}
        </div>
      </motion.aside>
    </>
  );
};

export default HistorySidebar;
