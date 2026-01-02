import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AdminIcons } from '../assets/AdminIcons';
import { Check, X, ShieldCheck, Clock, Image as ImageIcon } from 'lucide-react';

export const PaymentView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ledger' | 'verification'>('verification');
  const [selectedTx, setSelectedTx] = useState<any>(null);

  const transactions = [
    { id: 'TXN-9921', user: 'Alex Designer', amount: '$299.00', method: 'Stripe', status: 'Success', date: '2023-10-25 14:20', proof: 'https://picsum.photos/seed/p1/400/600' },
    { id: 'TXN-9922', user: 'Sarah Connor', amount: '$450.50', method: 'Manual Transfer', status: 'Pending', date: '2023-10-25 13:10', proof: 'https://picsum.photos/seed/p2/400/600' },
    { id: 'TXN-9924', user: 'Jessica Pearson', amount: '$1,200.00', method: 'Bank Transfer', status: 'Pending', date: '2023-10-24 12:00', proof: 'https://picsum.photos/seed/p3/400/600' },
  ];

  const pendingVerifications = transactions.filter(t => t.status === 'Pending');

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-[#080808] border border-white/5 rounded-[2rem] p-4 md:px-8">
        <div className="flex gap-2 w-full md:w-auto">
          <button 
            onClick={() => setActiveTab('ledger')}
            className={`flex-1 md:flex-none px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'ledger' ? 'bg-white text-black' : 'bg-white/5 text-white/40'}`}
          >
            Transaction Ledger
          </button>
          <button 
            onClick={() => setActiveTab('verification')}
            className={`flex-1 md:flex-none px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${activeTab === 'verification' ? 'bg-cyan-500 text-black' : 'bg-white/5 text-white/40'}`}
          >
            Verifications
            {pendingVerifications.length > 0 && (
              <span className="w-4 h-4 rounded-full bg-red-600 text-white text-[8px] flex items-center justify-center animate-pulse shadow-[0_0_10px_rgba(220,38,38,0.5)]">
                {pendingVerifications.length}
              </span>
            )}
          </button>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <div className="text-right">
             <p className="text-[9px] font-black text-white/30 uppercase tracking-widest mb-1">Global Revenue</p>
             <p className="text-lg font-black text-emerald-400">$142.8K</p>
          </div>
          <div className="w-px h-8 bg-white/10" />
          <div className="p-3 rounded-2xl bg-white/5 text-white/20"><AdminIcons.Revenue /></div>
        </div>
      </div>

      <div className="bg-[#080808] border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl min-h-[500px] relative">
        <AnimatePresence mode="wait">
          {activeTab === 'verification' ? (
            <motion.div key="verification" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-8 md:p-12">
              <div className="flex items-center justify-between mb-10">
                <div>
                  <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Manual Review Queue</h3>
                  <p className="text-xs text-white/30 font-bold uppercase tracking-widest mt-1">Proof of Handover Verification</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-white/40 text-[10px] font-black uppercase tracking-widest">
                   <Clock size={14} /> Real-time Buffer
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                {pendingVerifications.map(tx => (
                  <motion.div 
                    layoutId={tx.id}
                    key={tx.id} 
                    className="group bg-white/5 border border-white/5 rounded-[2rem] p-8 flex flex-col justify-between hover:border-white/20 transition-all relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 p-8 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity"><AdminIcons.Payment /></div>
                    
                    <div className="flex justify-between items-start mb-8 relative z-10">
                      <div>
                        <h4 className="text-lg font-black text-white tracking-tight uppercase">{tx.user}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">{tx.id}</span>
                          <span className="text-white/20">/</span>
                          <span className="text-[9px] text-white/30 font-bold uppercase">{tx.method}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-black text-white">{tx.amount}</p>
                        <p className="text-[10px] text-white/20 uppercase font-black mt-1 tracking-widest">{tx.date}</p>
                      </div>
                    </div>

                    <div className="aspect-[16/9] bg-black/40 rounded-2xl mb-8 overflow-hidden border border-white/5 group/img relative cursor-zoom-in" onClick={() => setSelectedTx(tx)}>
                      <img src={tx.proof} className="w-full h-full object-cover opacity-60 group-hover/img:opacity-100 transition-opacity" alt="Proof" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="px-5 py-2.5 rounded-full bg-white text-black text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                           <ImageIcon size={14} /> Full Resolution Review
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4 relative z-10">
                      <button className="flex-1 py-4 rounded-2xl bg-white text-black font-black uppercase tracking-widest text-[10px] hover:bg-emerald-400 transition-all flex items-center justify-center gap-2">
                        <Check size={14} /> Approve Handover
                      </button>
                      <button className="px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-red-500 font-black uppercase tracking-widest text-[10px] hover:bg-red-500/10 transition-all">
                        <X size={16} />
                      </button>
                    </div>
                  </motion.div>
                ))}
                {pendingVerifications.length === 0 && (
                  <div className="col-span-2 py-32 text-center flex flex-col items-center gap-6">
                    <div className="p-8 rounded-full bg-emerald-500/5 text-emerald-500/20"><ShieldCheck size={64} /></div>
                    <div>
                      <h4 className="text-xl font-black text-white/20 uppercase tracking-widest">Buffer Fully Synced</h4>
                      <p className="text-[10px] text-white/10 font-bold uppercase mt-2 tracking-tighter">No transactions awaiting manual confirmation.</p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div key="ledger" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="overflow-x-auto">
               <table className="w-full text-left">
                  <thead className="bg-white/[0.02]">
                    <tr>
                      <th className="p-6 text-[10px] font-black uppercase tracking-widest text-white/30">Transaction Hash</th>
                      <th className="p-6 text-[10px] font-black uppercase tracking-widest text-white/30">Identity</th>
                      <th className="p-6 text-[10px] font-black uppercase tracking-widest text-white/30">Volume</th>
                      <th className="p-6 text-[10px] font-black uppercase tracking-widest text-white/30">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {transactions.map((tx) => (
                      <tr key={tx.id} className="hover:bg-white/[0.01] transition-colors">
                        <td className="p-6 font-mono text-xs text-white/60">{tx.id}</td>
                        <td className="p-6 font-bold text-white text-sm">{tx.user}</td>
                        <td className="p-6 font-mono text-sm text-white font-black">{tx.amount}</td>
                        <td className="p-6">
                          <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest border ${
                            tx.status === 'Success' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                            tx.status === 'Pending' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'
                          }`}>
                            {tx.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
               </table>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Expanded Evidence Modal */}
      <AnimatePresence>
        {selectedTx && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-8 bg-black/95 backdrop-blur-3xl">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-6xl w-full flex flex-col md:flex-row gap-12"
            >
              <div className="flex-1 bg-black rounded-[3rem] overflow-hidden border border-white/10 shadow-3xl">
                <img src={selectedTx.proof} className="w-full h-full object-contain" alt="Handover Evidence" />
              </div>
              <div className="w-full md:w-96 flex flex-col justify-center">
                <div className="p-10 bg-white/5 rounded-[3rem] border border-white/10 backdrop-blur-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-[0.05]"><ShieldCheck size={80} /></div>
                  
                  <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-tight">{selectedTx.user}</h3>
                  <p className="text-sm text-white/40 mb-8 font-medium">Identity verified. Manual review for volume <span className="text-white font-bold">{selectedTx.amount}</span> via {selectedTx.method}.</p>
                  
                  <div className="space-y-4 relative z-10">
                    <button className="w-full py-5 rounded-2xl bg-emerald-500 text-black font-black uppercase tracking-widest text-[11px] hover:bg-emerald-400 shadow-2xl shadow-emerald-500/20 active:scale-95 transition-all">Verify Handover</button>
                    <button className="w-full py-5 rounded-2xl bg-white/5 border border-white/10 text-white/60 font-black uppercase tracking-widest text-[11px] hover:bg-white/10 transition-all">Request Clarification</button>
                    <button onClick={() => setSelectedTx(null)} className="w-full py-5 text-white/20 font-black uppercase tracking-widest text-[9px] hover:text-white transition-colors">Terminate Review</button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
