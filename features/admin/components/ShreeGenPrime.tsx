
import React from 'react';
import { motion } from 'framer-motion';
import { User, Plus, Copy, Trash2, Sparkles, Cpu, Activity, Fingerprint, X } from 'lucide-react';

export const ShreeGenPrime = ({ onClose }: { onClose: () => void }) => {
  // Mock Keys Data
  const accessKeys = [
    { id: 'key_8821', key: 'sg_live_99281...', creator: 'Alex Admin', date: 'Oct 24, 2023', status: 'Active' },
    { id: 'key_7721', key: 'sg_dev_11029...', creator: 'System', date: 'Sep 12, 2023', status: 'Active' },
    { id: 'key_1102', key: 'sg_test_55921...', creator: 'Sarah Dev', date: 'Aug 05, 2023', status: 'Revoked' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl"
    >
      {/* Modal Content */}
      <div className="w-full max-w-5xl h-[85vh] bg-[#050505] border border-white/10 rounded-[2.5rem] overflow-hidden flex flex-col relative shadow-2xl">
        
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/5 blur-[120px] rounded-full pointer-events-none" />

        {/* Header */}
        <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.01]">
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-600 p-[1px]">
                 <div className="w-full h-full bg-black rounded-2xl flex items-center justify-center">
                    <Sparkles size={24} className="text-white" />
                 </div>
              </div>
              <div>
                 <h2 className="text-2xl font-black text-white uppercase tracking-tight">Shree Gen <span className="text-cyan-400">Prime</span></h2>
                 <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Internal Agent Orchestrator</p>
              </div>
           </div>
           <button onClick={onClose} className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-colors">
              <X size={20} />
           </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
           
           {/* Stats Row */}
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="p-6 rounded-3xl bg-[#0a0a0a] border border-white/5 relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-6 text-white/5 group-hover:text-cyan-500/10 transition-colors"><Cpu size={64} /></div>
                 <p className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-2">Compute Load</p>
                 <h3 className="text-4xl font-black text-white">42%</h3>
                 <div className="w-full bg-white/10 h-1 mt-4 rounded-full overflow-hidden">
                    <div className="h-full bg-cyan-500 w-[42%]" />
                 </div>
              </div>
              <div className="p-6 rounded-3xl bg-[#0a0a0a] border border-white/5 relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-6 text-white/5 group-hover:text-purple-500/10 transition-colors"><Activity size={64} /></div>
                 <p className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-2">Total Requests</p>
                 <h3 className="text-4xl font-black text-white">1.2M</h3>
                 <div className="flex gap-1 mt-4">
                    {[1,2,3,4,5,6].map(i => <div key={i} className="h-1 flex-1 bg-purple-500/20 rounded-full" />)}
                 </div>
              </div>
              <div className="p-6 rounded-3xl bg-[#0a0a0a] border border-white/5 relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-6 text-white/5 group-hover:text-emerald-500/10 transition-colors"><Fingerprint size={64} /></div>
                 <p className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-2">Active Keys</p>
                 <h3 className="text-4xl font-black text-white">2</h3>
                 <p className="text-[10px] text-emerald-400 font-bold mt-4">System Optimal</p>
              </div>
           </div>

           {/* Keys Section */}
           <div className="bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] overflow-hidden">
              <div className="p-8 border-b border-white/5 flex items-center justify-between">
                 <div>
                    <h3 className="text-xl font-black text-white uppercase tracking-tight mb-1">Access Keys</h3>
                    <p className="text-xs text-white/40 font-medium">Manage API tokens for internal services.</p>
                 </div>
                 <button className="px-6 py-3 rounded-xl bg-white text-black font-black uppercase tracking-widest text-[10px] hover:bg-cyan-400 transition-colors flex items-center gap-2">
                    <Plus size={14} /> Generate Key
                 </button>
              </div>
              
              <div className="overflow-x-auto">
                 <table className="w-full text-left">
                    <thead className="bg-white/[0.02]">
                       <tr>
                          <th className="p-6 text-[10px] font-black uppercase tracking-widest text-white/30">Key ID</th>
                          <th className="p-6 text-[10px] font-black uppercase tracking-widest text-white/30">Token</th>
                          <th className="p-6 text-[10px] font-black uppercase tracking-widest text-white/30">Created By</th>
                          <th className="p-6 text-[10px] font-black uppercase tracking-widest text-white/30">Status</th>
                          <th className="p-6 text-[10px] font-black uppercase tracking-widest text-white/30 text-right">Actions</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                       {accessKeys.map((key) => (
                          <tr key={key.id} className="hover:bg-white/[0.01] transition-colors">
                             <td className="p-6 font-mono text-xs text-white/60">{key.id}</td>
                             <td className="p-6 font-mono text-sm text-white font-bold tracking-wider">{key.key}</td>
                             <td className="p-6">
                                <div className="flex items-center gap-2">
                                   <div className="p-1.5 rounded bg-white/5"><User size={12} className="text-white/60" /></div>
                                   <span className="text-xs font-bold text-white/80">{key.creator}</span>
                                </div>
                                <div className="text-[9px] text-white/30 mt-1 pl-7">{key.date}</div>
                             </td>
                             <td className="p-6">
                                <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                                   key.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'
                                }`}>
                                   {key.status}
                                </span>
                             </td>
                             <td className="p-6 text-right">
                                <div className="flex items-center justify-end gap-2">
                                   <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-colors"><Copy size={14} /></button>
                                   <button className="p-2 rounded-lg bg-white/5 hover:bg-red-500/10 text-white/40 hover:text-red-500 transition-colors"><Trash2 size={14} /></button>
                                </div>
                             </td>
                          </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
           </div>

        </div>

      </div>
    </motion.div>
  );
};
