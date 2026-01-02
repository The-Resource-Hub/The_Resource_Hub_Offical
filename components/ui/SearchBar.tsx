import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchBarProps {
  onSecretCode?: () => void;
}

const PLACEHOLDERS = [
  "Search premium resources...",
  "Find 3D models...",
  "Discover audio packs...",
  "Search textures...",
  "Type @hacker for admin..."
];

const SearchBar: React.FC<SearchBarProps> = ({ onSecretCode }) => {
  const [query, setQuery] = useState('');
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  useEffect(() => {
    // Normalize query to handle case sensitivity and whitespace
    const normalizedQuery = query.toLowerCase().trim();
    
    // Check for secret code '@hacker'
    if (normalizedQuery === '@hacker' && onSecretCode) {
      onSecretCode();
      setQuery(''); 
    }
  }, [query, onSecretCode]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % PLACEHOLDERS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto group relative z-20">
      <div className="relative flex items-center transition-all duration-300 transform group-focus-within:scale-[1.02]">
        <Search className="absolute left-5 text-white/20 group-focus-within:text-cyan-400 transition-colors z-10 duration-300" size={20} />
        
        {/* Animated Placeholder Layer */}
        {query === '' && (
          <div className="absolute left-14 top-0 bottom-0 flex items-center pointer-events-none overflow-hidden">
             <AnimatePresence mode="wait">
                <motion.span
                  key={placeholderIndex}
                  initial={{ y: 15, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -15, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="text-white/30 text-sm font-medium tracking-wide"
                >
                  {PLACEHOLDERS[placeholderIndex]}
                </motion.span>
             </AnimatePresence>
          </div>
        )}

        <input 
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-6 outline-none focus:bg-black/60 focus:border-cyan-500/50 focus:ring-4 focus:ring-cyan-500/10 transition-all text-white text-sm font-medium shadow-2xl backdrop-blur-md"
        />
        
        {/* Ambient Glow Effect on Focus */}
        <div className="absolute inset-0 rounded-2xl bg-cyan-500/5 opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 -z-10 blur-xl pointer-events-none" />
      </div>
    </div>
  );
};

export default React.memo(SearchBar);