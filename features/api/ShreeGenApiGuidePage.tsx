
import React, { useState, memo } from 'react';
import { motion } from 'framer-motion';
import { Book, Cpu, Terminal, Zap, Shield, Code, ChevronRight, Layers, Lock, Globe, Zap as ZapIcon, Terminal as TerminalIcon, FileCode, Check, Copy, ArrowLeft } from 'lucide-react';

const ShreeGenApiGuidePage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [activeStep, setActiveStep] = useState(0);

  const STEPS = [
    { title: 'Authentication', icon: Lock, desc: 'Generate your production-grade API keys in the dashboard.' },
    { title: 'Base URL', icon: Globe, desc: 'All requests are routed through https://theresourcehub.in/api/v1' },
    { title: 'Parameters', icon: Layers, desc: 'Define your model, temperature, and message history.' },
    { title: 'Response', icon: Terminal, desc: 'Handle JSON responses with confidence scores and tokens.' }
  ];

  const GUIDES = [
    {
      lang: 'Node.js',
      icon: TerminalIcon,
      steps: [
        'npm install @resource-hub/sdk',
        'Initialize client with sk_live_...',
        'Await client.chat.completions.create()',
        'Handle stream or atomic response'
      ]
    },
    {
      lang: 'Python',
      icon: FileCode,
      steps: [
        'pip install resource-hub-sdk',
        'import shreegen from "resource_hub"',
        'response = shreegen.Chat.create(...)',
        'print(response.choices[0].message)'
      ]
    },
    {
      lang: 'PHP',
      icon: Code,
      steps: [
        'composer require resource-hub/php-sdk',
        '$client = new ShreeGenClient("sk_live_...")',
        '$res = $client->chat->create([...])',
        'echo $res->getContent();'
      ]
    },
    {
      lang: 'C# (Unity)',
      icon: Cpu,
      steps: [
        'Install ShreeGen Unity Package',
        'shreeGen.Init("sk_live_...")',
        'yield return shreeGen.Ask("Prompt")',
        'Update UI with response.Text'
      ]
    },
    {
      lang: 'Java',
      icon: ZapIcon,
      steps: [
        'implementation "in.theresourcehub:sdk:1.0"',
        'ShreeGen client = new ShreeGen("sk_live_...")',
        'Response r = client.chat("Hello")',
        'System.out.println(r.getText());'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#020202] text-white pb-20">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex items-center gap-4">
        <button onClick={onBack} className="p-2 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-white transition-all">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-black tracking-tighter uppercase">Developer <span className="text-cyan-500">Guides</span></h1>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Core Integration Steps */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-20">
          {STEPS.map((s, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-3xl bg-[#0a0a0a] border border-white/5"
            >
              <s.icon className="text-cyan-500 mb-4" size={24} />
              <h3 className="font-bold mb-2">{s.title}</h3>
              <p className="text-xs text-white/40 leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Detailed Lang Guides */}
        <h2 className="text-3xl font-black mb-8 tracking-tighter">Implementation Guides</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {GUIDES.map((g, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-[2.5rem] bg-gradient-to-br from-[#0a0a0a] to-transparent border border-white/10 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                <g.icon size={80} />
              </div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-500">
                  <g.icon size={20} />
                </div>
                <h3 className="text-lg font-black uppercase tracking-wider">{g.lang}</h3>
              </div>
              <ul className="space-y-4">
                {g.steps.map((step, si) => (
                  <li key={si} className="flex gap-3 text-sm text-white/50">
                    <span className="text-cyan-500 font-mono">0{si+1}</span>
                    {step}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default memo(ShreeGenApiGuidePage);
