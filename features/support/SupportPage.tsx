
import React, { useState, memo } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Globe, Send, User, LifeBuoy, Search, MoreVertical, CheckCheck, Menu } from 'lucide-react';

interface ChatItem {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unreadCount: number;
  type: 'support' | 'global';
  status: 'online' | 'offline';
}

const CHATS: ChatItem[] = [
  {
    id: 'support',
    name: 'Official Support',
    lastMessage: 'How can we help you today?',
    time: 'Just now',
    unreadCount: 1,
    type: 'support',
    status: 'online'
  },
  {
    id: 'global',
    name: 'Global Chat',
    lastMessage: 'Welcome to the community hub!',
    time: '2m ago',
    unreadCount: 0,
    type: 'global',
    status: 'online'
  }
];

const SupportPage: React.FC = () => {
  const [activeChat, setActiveChat] = useState<string | null>(null);

  return (
    <div className="flex flex-col h-screen bg-[#0a0a0a] text-white overflow-hidden">
      {/* Navbar */}
      <div className="px-6 py-4 bg-[#0e0e0e] border-b border-white/5 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button className="p-2 -ml-2 hover:bg-white/5 rounded-full transition-colors text-white/40 hover:text-white">
            <Menu size={20} />
          </button>
          <div className="p-2.5 rounded-2xl bg-orange-500/10 border border-orange-500/20">
            <LifeBuoy size={20} className="text-orange-400" />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tighter uppercase">Support Center</h1>
            <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest">Connect with us</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar pb-20">
        <div className="max-w-2xl mx-auto p-4 space-y-3">
          {CHATS.map((chat) => (
            <motion.button
              key={chat.id}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => setActiveChat(chat.id)}
              className="w-full flex items-center gap-4 p-4 bg-[#111] border border-white/5 rounded-[2rem] hover:bg-white/[0.03] transition-all group text-left relative overflow-hidden"
            >
              {/* Profile Icon */}
              <div className="relative">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                  chat.type === 'support' ? 'bg-orange-500/10 text-orange-400' : 'bg-cyan-500/10 text-cyan-400'
                }`}>
                  {chat.type === 'support' ? <LifeBuoy size={24} /> : <Globe size={24} />}
                </div>
                {chat.status === 'online' && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-4 border-[#111] rounded-full" />
                )}
              </div>

              {/* Chat Info */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-black text-sm uppercase tracking-tight">{chat.name}</h3>
                  <span className="text-[10px] text-white/20 font-bold uppercase">{chat.time}</span>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-xs text-white/40 truncate pr-4">{chat.lastMessage}</p>
                  {chat.unreadCount > 0 ? (
                    <div className="bg-orange-500 text-black text-[10px] font-black h-5 min-w-[20px] px-1.5 rounded-full flex items-center justify-center animate-pulse">
                      {chat.unreadCount}
                    </div>
                  ) : (
                    <CheckCheck size={14} className="text-white/10" />
                  )}
                </div>
              </div>

              {/* Glow Effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${
                chat.type === 'support' ? 'from-orange-500/0 via-orange-500/0 to-orange-500/5' : 'from-cyan-500/0 via-cyan-500/0 to-cyan-500/5'
              } opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none`} />
            </motion.button>
          ))}

          {/* Empty State / Tip */}
          <div className="pt-10 text-center space-y-4 opacity-30">
            <MessageSquare size={48} className="mx-auto" />
            <p className="text-[10px] font-black uppercase tracking-[0.3em]">Select a channel to start chatting</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(SupportPage);
