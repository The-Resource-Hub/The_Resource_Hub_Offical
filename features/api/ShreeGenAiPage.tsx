
import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { Menu, Terminal, Zap, Shield, Cpu, Code, Check, Copy } from 'lucide-react';

const API_PLANS = [
  // ... existing plans ...
];

const CODE_SNIPPET = `
// ... existing code snippet ...
`.trim();

const ShreeGenApiPage: React.FC<{ onBack: () => void; onMenuClick: () => void }> = ({ onBack, onMenuClick }) => {
  return (
    <div className="min-h-screen bg-[#020202] text-white relative overflow-x-hidden custom-scrollbar">
      
      {/* Background Ambience */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-[50vh] bg-cyan-900/10 blur-[120px] rounded-full pointer-events-none -z-10" />
      
      {/* Header */}
      <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex items-center justify-start gap-4">
        <button 
          onClick={onMenuClick} 
          className="p-2 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all active:scale-95 group"
        >
          <Menu size={20} className="group-hover:rotate-180 transition-transform duration-500" />
        </button>
        <div className="flex items-center gap-2">
          <span className="text-sm font-black tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
            SHREE GEN API
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        
        {/* Hero */}
        <div className="text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[10px] font-black uppercase tracking-[0.2em] mb-6"
          >
            <Cpu size={12} /> REST API v2.0 Live
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6 leading-tight"
          >
            INTEGRATE THE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">HIVE MIND</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/40 max-w-2xl mx-auto text-lg"
          >
            Unlock direct programmatic access to the Shree Gen Prime model. Build intelligent apps with our low-latency, high-throughput API infrastructure.
          </motion.p>
        </div>

        {/* Integration Preview */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="max-w-4xl mx-auto bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden shadow-2xl mb-24 relative group"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500 opacity-50" />
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/[0.02]">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
            </div>
            <div className="text-[10px] font-mono text-white/30">integration_example.js</div>
          </div>
          <div className="p-6 md:p-8 overflow-x-auto relative">
             <button className="absolute top-6 right-6 p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-colors">
                <Copy size={16} />
             </button>
             <pre className="font-mono text-sm md:text-base text-cyan-100 leading-relaxed">
               {CODE_SNIPPET}
             </pre>
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
           {[
             { icon: Zap, title: "Lightning Fast", desc: "Global edge network ensures sub-50ms latency worldwide." },
             { icon: Shield, title: "Enterprise Secure", desc: "SOC2 compliant infrastructure with end-to-end encryption." },
             { icon: Code, title: "Developer First", desc: "Typed SDKs for TS, Python, and Go out of the box." }
           ].map((feat, i) => (
             <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors"
             >
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-white mb-4">
                   <feat.icon size={24} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{feat.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{feat.desc}</p>
             </motion.div>
           ))}
        </div>

        {/* Pricing */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
          {API_PLANS.map((plan, idx) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`relative p-8 rounded-[2rem] bg-[#0a0a0a] border ${plan.color} ${plan.recommend ? 'shadow-2xl shadow-cyan-900/20 scale-105 z-10' : 'hover:border-white/20'}`}
            >
              {plan.recommend && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-cyan-500 text-black text-[10px] font-black uppercase tracking-widest shadow-lg">
                  Most Popular
                </div>
              )}
              
              <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
              <p className="text-white/40 text-xs font-medium uppercase tracking-wider mb-6">{plan.requests}</p>
              
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl font-black text-white">{plan.price}</span>
                <span className="text-white/30 text-sm font-bold">{plan.period}</span>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-center gap-3 text-sm text-white/60">
                    <Check size={14} className={plan.recommend ? "text-cyan-400" : "text-white/30"} />
                    {feature}
                  </li>
                ))}
              </ul>

              <button className={`w-full py-4 rounded-xl font-black uppercase tracking-widest text-xs transition-all active:scale-95 ${plan.btnColor}`}>
                Purchase Access
              </button>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default memo(ShreeGenApiPage);
              
