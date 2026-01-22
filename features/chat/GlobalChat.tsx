
import React, { useState, useEffect, useRef, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, ArrowLeft, Globe, CheckCheck, Smile, LayoutGrid, User } from 'lucide-react';
import { dbService } from '../../services/dbService';

interface Message {
  id: string;
  text: string;
  senderId: string;
  senderName: string;
  time: string;
  createdAt?: string;
}

interface GlobalChatProps {
  onBack: () => void;
}

const GlobalChat: React.FC<GlobalChatProps> = ({ onBack }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const userId = 'user_' + Math.random().toString(36).substr(2, 9); // Fallback persistent-ish ID for session

  useEffect(() => {
    const unsub = dbService.subscribe('global_messages', (data) => {
      const sorted = data.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      setMessages(sorted);
    });
    return unsub;
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const newMessage = {
      text: inputValue,
      senderId: userId,
      senderName: 'User',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setInputValue('');
    try {
      await dbService.add('global_messages', newMessage);
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0a0a0a] flex flex-col">
      {/* Header */}
      <div className="px-4 py-3 bg-[#0e0e0e] border-b border-white/5 flex items-center gap-3">
        <button onClick={onBack} className="p-2 hover:bg-white/5 rounded-full text-white/60">
          <ArrowLeft size={24} />
        </button>
        <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
          <Globe size={20} />
        </div>
        <div className="flex-1">
          <h2 className="text-sm font-black uppercase tracking-tight">Global Chat</h2>
          <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">Live Community</p>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.senderId === userId ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] group`}>
              {msg.senderId !== userId && (
                <span className="text-[10px] text-white/30 font-bold ml-2 mb-1 block uppercase tracking-tighter">
                  {msg.senderName}
                </span>
              )}
              <div className={`px-4 py-2 rounded-2xl text-sm relative ${
                msg.senderId === userId 
                  ? 'bg-cyan-500 text-black rounded-tr-none' 
                  : 'bg-[#1a1a1a] text-white rounded-tl-none border border-white/5'
              }`}>
                <p className="leading-relaxed whitespace-pre-wrap break-words">{msg.text}</p>
                <div className={`text-[9px] mt-1 flex justify-end items-center gap-1 ${
                  msg.senderId === userId ? 'text-black/50' : 'text-white/30'
                }`}>
                  {msg.time}
                  {msg.senderId === userId && <CheckCheck size={10} />}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 bg-[#0e0e0e] border-t border-white/5 pb-8 sm:pb-4">
        <div className="max-w-3xl mx-auto flex items-center gap-2">
          <button className="p-2 text-white/40 hover:text-white"><Smile size={20} /></button>
          <div className="flex-1">
            <input 
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type message to everyone..."
              className="w-full bg-[#1a1a1a] border border-white/5 rounded-full py-2.5 px-4 text-sm text-white focus:outline-none focus:border-cyan-500/50"
            />
          </div>
          <button 
            onClick={handleSendMessage}
            className={`p-2.5 rounded-full ${inputValue.trim() ? 'bg-cyan-500 text-black' : 'bg-white/5 text-white/20'}`}
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(GlobalChat);
