
import React from 'react';
import { motion } from 'framer-motion';

interface ComponentLoaderProps {
  message?: string;
  height?: string;
}

const ComponentLoader: React.FC<ComponentLoaderProps> = ({ message = "Synchronizing...", height = "h-screen" }) => {
  return (
    <div className={`flex flex-col items-center justify-center ${height} w-full text-white/50 bg-[#020202] z-50`}>
      <div className="relative w-12 h-12 mb-6">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-full h-full border-2 border-white/5 border-t-cyan-500 rounded-full"
        />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-2 bg-cyan-500/20 blur-md rounded-full"
        />
      </div>
      <p className="text-[10px] font-black uppercase tracking-[0.3em] animate-pulse">{message}</p>
    </div>
  );
};

export default React.memo(ComponentLoader);
