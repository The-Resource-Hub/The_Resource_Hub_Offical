
import React, { useState, memo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Globe, Send, User, LifeBuoy, Search, MoreVertical, CheckCheck, Menu, ArrowLeft, Paperclip, Smile, LayoutGrid } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot' | 'other';
  time: string;
  status: 'sent' | 'delivered' | 'read';
}

interface ChatWindowProps {
  chat: ChatItem;
  onBack: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ chat, onBack }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: chat.type === 'support' ? "Hello! How can we help you today?" : "Welcome to the Global Chat!",
      sender: 'bot',
      time: '12:00 PM',
      status: 'read'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent'
    };

    setMessages([...messages, newMessage]);
    setInputValue('');

    // Mock response
    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        text: chat.type === 'support' ? "Thanks for your message! Our team will get back to you shortly." : "That's interesting! (Global Chat Bot)",
        sender: 'bot',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'read'
      };
      setMessages(prev => [...prev, response]);
    }, 1000);
  };

  return (
    <motion.div 
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed inset-0 z-50 bg-[#0a0a0a] flex flex-col"
    >
      {/* Chat Header */}
      <div className="px-4 py-3 bg-[#0e0e0e] border-b border-white/5 flex items-center gap-3">
        <button onClick={onBack} className="p-2 hover:bg-white/5 rounded-full text-white/60">
          <ArrowLeft size={24} />
        </button>
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
          chat.type === 'support' ? 'bg-orange-500/10 text-orange-400' : 'bg-cyan-500/10 text-cyan-400'
        }`}>
          {chat.type === 'support' ? <LifeBuoy size={20} /> : <Globe size={20} />}
        </div>
        <div className="flex-1">
          <h2 className="text-sm font-black uppercase tracking-tight">{chat.name}</h2>
          <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">Online</p>
        </div>
        <button className="p-2 hover:bg-white/5 rounded-full text-white/40">
          <MoreVertical size={20} />
        </button>
      </div>

      {/* Messages Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm relative ${
              msg.sender === 'user' 
                ? 'bg-orange-500 text-black rounded-tr-none' 
                : 'bg-[#1a1a1a] text-white rounded-tl-none border border-white/5'
            }`}>
              <p className="leading-relaxed">{msg.text}</p>
              <div className={`text-[9px] mt-1 flex justify-end items-center gap-1 ${
                msg.sender === 'user' ? 'text-black/50' : 'text-white/30'
              }`}>
                {msg.time}
                {msg.sender === 'user' && <CheckCheck size={10} />}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input Bar */}
      <div className="p-4 bg-[#0e0e0e] border-t border-white/5 pb-8 sm:pb-4">
        <div className="max-w-3xl mx-auto flex items-center gap-2">
          {chat.type === 'global' ? (
            <>
              <button className="p-2 text-white/40 hover:text-white transition-colors">
                <Smile size={20} />
              </button>
              <button className="p-2 text-white/40 hover:text-white transition-colors">
                <LayoutGrid size={20} />
              </button>
            </>
          ) : (
            <button className="p-2 text-white/40 hover:text-white transition-colors">
              <Paperclip size={20} />
            </button>
          )}
          <div className="flex-1 relative">
            <input 
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Write a message..."
              className="w-full bg-[#1a1a1a] border border-white/5 rounded-full py-2.5 px-4 text-sm focus:outline-none focus:border-orange-500/50 transition-all"
            />
          </div>
          <button 
            onClick={handleSendMessage}
            className={`p-2.5 rounded-full transition-all ${
              inputValue.trim() ? 'bg-orange-500 text-black scale-110' : 'bg-white/5 text-white/20'
            }`}
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

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
  }
];

interface SupportPageProps {
  onMenuClick: () => void;
  hideNavbar?: boolean;
  isAdminView?: boolean;
}

const SupportPage: React.FC<SupportPageProps> = ({ onMenuClick, hideNavbar = false, isAdminView = false }) => {
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [userChats, setUserChats] = useState<ChatItem[]>([]);

  useEffect(() => {
    if (isAdminView) {
      // In a real app, we'd fetch all unique user support threads from Firebase
      // For now, let's mock the list of users who need support
      setUserChats([
        {
          id: 'user_1',
          name: 'Customer: John Doe',
          lastMessage: 'I have an issue with my order',
          time: '5m ago',
          unreadCount: 2,
          type: 'support' as const,
          status: 'online' as const
        },
        {
          id: 'user_2',
          name: 'Customer: Jane Smith',
          lastMessage: 'How do I upgrade to premium?',
          time: '1h ago',
          unreadCount: 0,
          type: 'support' as const,
          status: 'offline' as const
        }
      ]);
    }
  }, [isAdminView]);

  const displayChats = isAdminView 
    ? [{ id: 'global', name: 'Global Chat', lastMessage: 'Community Chat', time: 'Live', unreadCount: 0, type: 'global', status: 'online' }, ...userChats]
    : CHATS;

  const activeChat = displayChats.find(c => c.id === activeChatId);

  return (
    <div className={`flex flex-col h-screen bg-[#0a0a0a] text-white overflow-hidden ${hideNavbar ? 'pt-0' : ''}`}>
      {/* Navbar */}
      {!hideNavbar && (
        <div className="px-6 py-4 bg-[#0e0e0e] border-b border-white/5 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <button 
              onClick={onMenuClick}
              className="p-2 -ml-2 hover:bg-white/5 rounded-full transition-colors text-white/40 hover:text-white"
            >
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
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar pb-20">
        <div className="max-w-2xl mx-auto p-4 space-y-3">
          {displayChats.map((chat) => (
            <motion.button
              key={chat.id}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => setActiveChatId(chat.id)}
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

      <AnimatePresence>
        {activeChat && (
          <ChatWindow chat={activeChat} onBack={() => setActiveChatId(null)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default memo(SupportPage);
