import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { logger } from '../../../services/loggerService';

export const LogsView: React.FC = () => {
  const [logs, setLogs] = useState(logger.getLogs());
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsubscribe = logger.subscribe((newLogs) => {
      setLogs([...newLogs]);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [logs]);

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'error': return 'text-red-500';
      case 'warn': return 'text-amber-500';
      case 'success': return 'text-emerald-500';
      default: return 'text-blue-400';
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="bg-[#080808] border border-white/5 rounded-[2rem] overflow-hidden shadow-2xl flex flex-col h-[600px]">
        <div className="p-6 border-b border-white/5 bg-white/[0.01] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <h3 className="text-xl font-black uppercase tracking-wider text-white">Live System Console</h3>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">Buffer: {logs.length}/100</span>
            <button 
              onClick={() => logger.log('info', 'Console buffer cleared', 'System')}
              className="text-[10px] font-black text-white/30 hover:text-white uppercase tracking-[0.2em] border border-white/10 px-4 py-2 rounded-xl transition-all hover:bg-white/5"
            >
              Clear
            </button>
          </div>
        </div>
        
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-4 font-mono text-xs space-y-1 scrollbar-hide selection:bg-white/10"
        >
          <AnimatePresence initial={false}>
            {logs.map((log) => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="group flex items-start gap-4 py-1 px-2 rounded hover:bg-white/[0.02] transition-colors"
              >
                <span className="text-white/20 shrink-0 select-none">[{log.timestamp}]</span>
                <span className={`font-bold shrink-0 uppercase w-16 ${getLevelColor(log.level)}`}>
                  {log.level}
                </span>
                <span className="text-white/40 shrink-0 select-none">[{log.category}]</span>
                <span className="text-white/80 break-all">{log.message}</span>
              </motion.div>
            ))}
          </AnimatePresence>
          {logs.length === 0 && (
            <div className="h-full flex items-center justify-center text-white/20 uppercase tracking-widest animate-pulse">
              Waiting for system events...
            </div>
          )}
        </div>
        
        <div className="p-4 border-t border-white/5 bg-black/40 shrink-0">
          <div className="flex items-center gap-2 text-[10px] font-mono text-white/20">
            <span className="text-emerald-500">●</span>
            <span>READY</span>
            <span className="mx-2">|</span>
            <span>LISTENING ON ALL NODES</span>
            <span className="ml-auto">v1.0.0-PRO</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
