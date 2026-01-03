
import React, { useState, useRef, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, History, Paperclip, Send, Brain, Sparkles, X, FileText, AlertCircle, ChevronDown, Mic, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { MODELS, PROMPT_STARTERS, DYNAMIC_PLACEHOLDERS } from '../data/constants';
import { ChatMessage } from '../types';

// --- Components ---
const TypingIndicator = () => (
  <div className="flex gap-1 p-2 items-center">
    {[0, 1, 2].map((i) => (
      <motion.div
        key={i}
        className="w-1.5 h-1.5 rounded-full bg-purple-400"
        animate={{ y: ["0%", "-50%", "0%"], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut", delay: i * 0.15 }}
      />
    ))}
  </div>
);

const AmbientBackground = memo(() => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
    <div className="absolute inset-0 bg-[#020202]" />
    <motion.div 
      animate={{ opacity: [0.1, 0.2, 0.1], scale: [1, 1.1, 1] }}
      transition={{ duration: 10, repeat: Infinity }}
      className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-purple-900/5 blur-[120px] rounded-full" 
    />
    <motion.div 
      animate={{ opacity: [0.1, 0.2, 0.1], scale: [1, 1.2, 1] }}
      transition={{ duration: 15, repeat: Infinity, delay: 2 }}
      className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-cyan-900/5 blur-[120px] rounded-full" 
    />
  </div>
));

interface ChatInterfaceProps {
  messages: ChatMessage[];
  isTyping: boolean;
  isLoadingChat: boolean;
  onSendMessage: (text: string, attachment: any, model: string) => void;
  onBack: () => void;
  onToggleHistory: () => void;
  lastSaved: string | null;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ 
  messages, 
  isTyping, 
  isLoadingChat,
  onSendMessage, 
  onBack, 
  onToggleHistory, 
  lastSaved 
}) => {
  const [prompt, setPrompt] = useState('');
  const [selectedModel, setSelectedModel] = useState<string>('fast');
  const [showModelMenu, setShowModelMenu] = useState(false);
  const [attachment, setAttachment] = useState<{ file: File; preview: string; type: 'image' | 'document' } | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  const chatDisplayRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % DYNAMIC_PLACEHOLDERS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (chatDisplayRef.current) {
      chatDisplayRef.current.scrollTop = chatDisplayRef.current.scrollHeight;
    }
  }, [messages, isTyping, attachment, isLoadingChat]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
    }
  }, [prompt]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError(null);
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 10 * 1024 * 1024) {
        setUploadError(`Max size is 10MB.`);
        if (fileInputRef.current) fileInputRef.current.value = '';
        return;
      }
      const isImage = file.type.startsWith('image/');
      const preview = isImage ? URL.createObjectURL(file) : '';
      setAttachment({ file, preview, type: isImage ? 'image' : 'document' });
    }
  };

  const handleSend = () => {
    if (prompt.trim() === '' && !attachment) return;
    onSendMessage(prompt, attachment, selectedModel);
    setPrompt('');
    setAttachment(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleSend();
    }
  };

  const currentModelData = MODELS.find(m => m.id === selectedModel) || MODELS[0];

  return (
    <div className="flex flex-col h-screen w-full text-white relative overflow-hidden bg-[#020202]">
      <AmbientBackground />

      {/* --- Top Navigation Bar --- */}
      <nav className="relative flex items-center justify-between px-4 py-3 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5 z-50">
        <button onClick={onBack} className="p-2 rounded-full hover:bg-white/5 text-white/60 hover:text-white transition-colors">
          <ArrowLeft size={18} />
        </button>

        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2">
            <Sparkles size={14} className="text-cyan-400" />
            <span className="text-sm font-black tracking-widest text-white">SHREE GEN AI</span>
          </div>
          {lastSaved && <span className="text-[9px] text-white/30 font-mono">{lastSaved}</span>}
        </div>

        <button onClick={onToggleHistory} className="p-2 rounded-full hover:bg-white/5 text-white/60 hover:text-white transition-colors">
          <History size={18} />
        </button>
      </nav>

      {/* --- Chat Display Area --- */}
      <div ref={chatDisplayRef} className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-6 max-w-3xl mx-auto w-full relative">
        {isLoadingChat ? (
           <div className="absolute inset-0 flex items-center justify-center bg-[#020202]/50 backdrop-blur-sm z-20">
              <div className="flex flex-col items-center gap-3">
                 <Loader2 size={32} className="text-cyan-400 animate-spin" />
                 <p className="text-xs font-bold uppercase tracking-widest text-white/50">Restoring Session...</p>
              </div>
           </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center pb-20 animate-in fade-in zoom-in duration-500">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center mb-6 ring-1 ring-white/10">
               <Brain size={32} className="text-white/80" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">How can I help you today?</h2>
            
            <div className="grid grid-cols-2 gap-3 mt-8 w-full max-w-lg px-2">
               {PROMPT_STARTERS.map((starter, idx) => (
                 <button 
                   key={idx} 
                   onClick={() => setPrompt(starter.prompt)}
                   className="flex flex-col items-start gap-2 p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] hover:border-white/10 transition-all text-left group"
                 >
                    <starter.icon size={16} className="text-cyan-400 group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-medium text-white/80">{starter.label}</span>
                 </button>
               ))}
            </div>
          </div>
        ) : (
          <>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex flex-col max-w-[85%] ${msg.sender === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'}`}
              >
                <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  msg.sender === 'user' 
                    ? 'bg-[#1a1a1a] text-white border border-white/10 rounded-tr-sm' 
                    : 'bg-transparent text-white/90 rounded-tl-sm pl-0'
                }`}>
                  {msg.sender === 'ai' && (
                     <div className="flex items-center gap-2 mb-1.5 opacity-50">
                        <Sparkles size={10} />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Shree Gen</span>
                     </div>
                  )}
                  
                  {msg.files && msg.files.length > 0 && (
                    <div className="mb-3 flex flex-wrap gap-2">
                      {msg.files.map((file, idx) => (
                        <div key={idx} className="overflow-hidden rounded-lg border border-white/10 bg-black/20 relative group">
                          {file.type === 'image' ? (
                            <img src={file.url} alt={file.name} className="h-20 w-20 object-cover" />
                          ) : (
                            <div className="flex items-center gap-2 p-2">
                              <FileText size={16} className="text-cyan-400" />
                              <span className="text-xs truncate max-w-[100px]">{file.name}</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  <ReactMarkdown 
                    components={{
                      p: ({ children }) => <p className="leading-relaxed mb-4 last:mb-0">{children}</p>,
                      pre: ({ children }) => <pre className="bg-[#050505] border border-white/10 rounded-xl p-4 overflow-x-auto my-4">{children}</pre>,
                      code: ({ children }) => <code className="bg-white/10 rounded px-1.5 py-0.5 font-mono text-xs">{children}</code>
                    }}
                  >
                    {msg.text}
                  </ReactMarkdown>
                </div>
                <span className="text-[9px] text-white/20 mt-1 px-1 font-mono">{msg.timestamp}</span>
              </motion.div>
            ))}
            {isTyping && (
              <div className="flex items-center gap-2 text-white/40 text-xs pl-2">
                 <Sparkles size={12} className="animate-pulse" />
                 <TypingIndicator />
              </div>
            )}
          </>
        )}
      </div>

      {/* --- Input Area --- */}
      <div className="w-full px-4 pb-6 bg-[#020202]">
        <AnimatePresence>
          {uploadError && (
             <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="mb-2 text-center">
               <span className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 text-red-400 text-[10px] font-bold rounded-full border border-red-500/20">
                 <AlertCircle size={10} /> {uploadError} <button onClick={() => setUploadError(null)}><X size={10} /></button>
               </span>
             </motion.div>
          )}
        </AnimatePresence>

        <div className="max-w-3xl mx-auto bg-[#0a0a0a] border border-white/10 rounded-[1.5rem] p-2 relative shadow-2xl transition-colors focus-within:border-white/20 group">
           <AnimatePresence>
             {attachment && (
               <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="absolute bottom-full left-0 mb-2 ml-2">
                  <div className="relative group">
                     {attachment.type === 'image' ? (
                        <img src={attachment.preview} className="h-16 w-16 object-cover rounded-xl border border-white/10" alt="upload" />
                     ) : (
                        <div className="h-16 w-16 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center"><FileText size={24} className="text-white/50" /></div>
                     )}
                     <button onClick={() => setAttachment(null)} className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 shadow-sm"><X size={10} /></button>
                  </div>
               </motion.div>
             )}
           </AnimatePresence>

           <div className="relative px-2 pt-1">
              {prompt === '' && (
                 <div className="absolute top-4 left-3 pointer-events-none text-white/20 text-sm truncate">
                    <AnimatePresence mode="wait">
                       <motion.span key={placeholderIndex} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}>
                          {DYNAMIC_PLACEHOLDERS[placeholderIndex]}
                       </motion.span>
                    </AnimatePresence>
                 </div>
              )}
              <textarea
                ref={textareaRef}
                className="w-full bg-transparent text-white text-sm placeholder:text-transparent outline-none resize-none max-h-[150px] py-3 pl-1 leading-relaxed custom-scrollbar"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={1}
                style={{ minHeight: '52px' }}
              />
           </div>

           <div className="flex items-center justify-between px-1 pb-1 mt-1">
              <div className="flex items-center gap-1">
                 <div className="relative">
                    <button 
                       onClick={() => setShowModelMenu(!showModelMenu)}
                       className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all border ${
                          showModelMenu ? 'bg-white/10 border-white/20 text-white' : 'bg-white/5 border-transparent text-white/50 hover:text-white hover:bg-white/10'
                       }`}
                    >
                       <currentModelData.icon size={10} className={currentModelData.color} />
                       <span>{currentModelData.label}</span>
                       <ChevronDown size={10} />
                    </button>

                    <AnimatePresence>
                       {showModelMenu && (
                          <>
                             <div className="fixed inset-0 z-10" onClick={() => setShowModelMenu(false)} />
                             <motion.div 
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                className="absolute bottom-full left-0 mb-2 w-48 bg-[#151515] border border-white/10 rounded-xl shadow-xl overflow-hidden z-20"
                             >
                                <div className="p-1 space-y-0.5">
                                   {MODELS.map((m) => (
                                      <button 
                                         key={m.id}
                                         onClick={() => { setSelectedModel(m.id); setShowModelMenu(false); }}
                                         className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
                                            selectedModel === m.id ? 'bg-white/10' : 'hover:bg-white/5'
                                         }`}
                                      >
                                         <m.icon size={14} className={m.color} />
                                         <div>
                                            <div className="text-xs font-bold text-white">{m.label}</div>
                                            <div className="text-[9px] text-white/30">{m.desc}</div>
                                         </div>
                                         {selectedModel === m.id && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-400" />}
                                      </button>
                                   ))}
                                </div>
                             </motion.div>
                          </>
                       )}
                    </AnimatePresence>
                 </div>

                 <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileSelect} accept="image/*,.pdf,.txt" />
                 <button onClick={() => fileInputRef.current?.click()} className={`p-2 rounded-full transition-colors ${attachment ? 'bg-cyan-500/20 text-cyan-400' : 'text-white/40 hover:text-white hover:bg-white/5'}`}>
                    <Paperclip size={16} />
                 </button>
                 <button className="p-2 rounded-full text-white/40 hover:text-white hover:bg-white/5 transition-colors">
                    <Mic size={16} />
                 </button>
              </div>

              <motion.button
                 onClick={handleSend}
                 disabled={(prompt.trim() === '' && !attachment) || isTyping}
                 whileHover={{ scale: 1.05 }}
                 whileTap={{ scale: 0.95 }}
                 className={`p-2.5 rounded-full flex items-center justify-center transition-all shadow-lg ${
                    (prompt.trim() !== '' || attachment) && !isTyping
                       ? 'bg-white text-black hover:bg-cyan-400' 
                       : 'bg-white/10 text-white/30 cursor-not-allowed'
                 }`}
              >
                 <Send size={16} fill="currentColor" />
              </motion.button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default memo(ChatInterface);
