
import React, { useState, useEffect, useCallback, memo, Suspense, lazy } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ChatMessage, ChatSession } from './types.ts';
import { MOCK_CHAT_HISTORY } from './data/constants.ts';
import ComponentLoader from '../../components/ui/ComponentLoader.tsx';
import { runShreeGen } from '../../services/aiService.ts';

const ChatInterface = lazy(() => import('./components/ChatInterface.tsx'));
const HistorySidebar = lazy(() => import('./components/HistorySidebar.tsx'));

const AUTOSAVE_KEY = 'shree_gen_autosave';

const ShreeGenPage: React.FC<{ onBack: () => void }> = memo(({ onBack }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]); 
  const [isHistorySidebarOpen, setIsHistorySidebarOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const [isLoadingChat, setIsLoadingChat] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem(AUTOSAVE_KEY);
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
          setLastSaved('Restored');
        }
      } catch (e) { console.error(e); }
    }
  }, []);

  const handleSendMessage = useCallback(async (text: string, attachment: any, model: string) => {
    const timestamp = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    const newUserMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: text,
      timestamp,
      files: attachment ? [{
        name: attachment.file.name,
        type: attachment.type,
        url: attachment.type === 'image' ? attachment.preview : '#',
        size: (attachment.file.size / 1024).toFixed(1) + ' KB'
      }] : undefined,
      model: model as any
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setIsTyping(true);

    const result = await runShreeGen(text, model);
    
    const aiResponse: ChatMessage = {
      id: `ai-${Date.now()}`,
      sender: 'ai',
      text: result.text || (result.error ? "Error: Neural connection failed. Please check your API keys." : "No response from AI."),
      timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
      model: result.modelUsed as any
    };
    
    setMessages((prev) => {
      const updated = [...prev, aiResponse];
      localStorage.setItem(AUTOSAVE_KEY, JSON.stringify(updated));
      return updated;
    });
    
    setIsTyping(false);
    setLastSaved('Saved just now');
  }, []);

  const handleSelectSession = useCallback((session: ChatSession) => {
    setIsHistorySidebarOpen(false);
    setIsLoadingChat(true);
    setMessages([]);
    setTimeout(() => {
        setMessages(session.messages);
        setIsLoadingChat(false);
        setLastSaved(`Loaded: ${session.title}`);
    }, 800);
  }, []);

  const handleNewChat = useCallback(() => {
    setMessages([]);
    localStorage.removeItem(AUTOSAVE_KEY);
    setLastSaved('New Session');
  }, []);

  return (
    <>
      <Suspense fallback={<ComponentLoader height="h-screen" message="Initializing Shree Gen..." />}>
         <ChatInterface 
            messages={messages}
            isTyping={isTyping}
            isLoadingChat={isLoadingChat}
            onSendMessage={handleSendMessage}
            onBack={onBack}
            onToggleHistory={() => setIsHistorySidebarOpen(true)}
            lastSaved={lastSaved}
         />
      </Suspense>

      <AnimatePresence>
        {isHistorySidebarOpen && (
           <Suspense fallback={<div className="fixed top-0 right-0 h-full w-[280px] bg-[#050505] z-[101] border-l border-white/10" />}>
             <HistorySidebar 
               isOpen={isHistorySidebarOpen}
               onClose={() => setIsHistorySidebarOpen(false)}
               sessions={MOCK_CHAT_HISTORY}
               onSelectSession={handleSelectSession}
               onNewChat={handleNewChat}
             />
           </Suspense>
        )}
      </AnimatePresence>
    </>
  );
});

export default ShreeGenPage;
