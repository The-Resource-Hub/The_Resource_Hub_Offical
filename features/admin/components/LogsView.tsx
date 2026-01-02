
import React from 'react';
import { motion } from 'framer-motion';
import { AdminIcons } from '../assets/AdminIcons';

export const LogsView: React.FC = () => {
  const logs = [
    { event: 'Admin Login', user: 'Hacker', severity: 'Info', time: '2 minutes ago', ip: '192.168.1.1' },
    { event: 'User Banned', user: 'Mike Ross', severity: 'Alert', time: '1 hour ago', ip: 'System Node' },
    { event: 'Price Updated', user: 'Hacker', severity: 'Warning', time: '3 hours ago', ip: '192.168.1.1' },
    { event: 'System Payout', user: 'Auto-Task', severity: 'Info', time: '5 hours ago', ip: 'Cron' },
    { event: 'Database Backup', user: 'System', severity: 'Info', time: '12 hours ago', ip: 'Internal' },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="bg-[#080808] border border-white/5 rounded-[2rem] overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-white/5 bg-white/[0.01] flex items-center justify-between">
          <h3 className="text-xl font-black uppercase tracking-wider text-white">Terminal Output</h3>
          <button className="text-[10px] font-black text-white/30 hover:text-white uppercase tracking-[0.2em] border border-white/10 px-4 py-2 rounded-xl">Clear Buffer</button>
        </div>
        <div className="p-2">
          {logs.map((log, i) => (
            <div key={i} className="flex items-center gap-6 p-4 hover:bg-white/[0.02] transition-colors border-b border-white/5 last:border-0">
               <span className={`text-[10px] font-black uppercase tracking-tighter w-16 ${
                 log.severity === 'Alert' ? 'text-red-500' :
                 log.severity === 'Warning' ? 'text-amber-500' : 'text-cyan-400'
               }`}>[{log.severity}]</span>
               <div className="flex-1">
                 <p className="text-sm font-bold text-white/80">{log.event} by <span className="text-white">{log.user}</span></p>
                 <div className="flex items-center gap-4 mt-1">
                   <span className="text-[10px] font-mono text-white/30">{log.ip}</span>
                   <span className="text-[10px] font-mono text-white/30 tracking-tighter uppercase">{log.time}</span>
                 </div>
               </div>
               <div className="text-white/10 group-hover:text-white/30 transition-colors"><AdminIcons.Eye /></div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
