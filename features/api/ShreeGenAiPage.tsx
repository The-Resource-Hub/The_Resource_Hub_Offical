import React, { memo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, Terminal, Zap, Shield, Cpu, Code, Check, Copy, BookOpen, Key, RefreshCw } from 'lucide-react';
import { userService } from '../../services/userService';

interface ApiPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  requests: string;
  features: string[];
  color: string;
  btnColor: string;
  recommend: boolean;
}

const API_PLANS: ApiPlan[] = [
  {
    id: 'starter',
    name: 'Hacker',
    price: '$29',
    period: '/mo',
    requests: '100K Requests',
    features: ['Standard Latency', 'Shared Neural Core', 'Community Support', '1 API Key'],
    color: 'border-white/10',
    btnColor: 'bg-white/5 hover:bg-white/10',
    recommend: false
  },
  {
    id: 'pro',
    name: 'Neural',
    price: '$99',
    period: '/mo',
    requests: '1M Requests',
    features: ['Low Latency (45ms)', 'Priority Queue', 'Email Support', '5 API Keys', 'Fine-tuning Available'],
    color: 'border-cyan-500/50',
    btnColor: 'bg-cyan-500 hover:bg-cyan-400 text-black',
    recommend: true
  },
  {
    id: 'enterprise',
    name: 'God Mode',
    price: '$499',
    period: '/mo',
    requests: 'Unlimited',
    features: ['Dedicated GPU Cluster', 'Zero Latency Routing', '24/7 Engineer Access', 'Unlimited Keys', 'Custom Models'],
    color: 'border-purple-500/50',
    btnColor: 'bg-purple-600 hover:bg-purple-500 text-white',
    recommend: false
  }
];

const SNIPPETS: Record<string, string> = {
  'JavaScript': `const response = await fetch('https://theresourcehub.in/api/v1/chat', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    model: 'shree-gen-prime',
    messages: [{ role: 'user', content: 'Hello!' }]
  })
});
const data = await response.json();
console.log(data.reply);`,
  'Python': `import requests

url = "https://theresourcehub.in/api/v1/chat"
headers = {"Authorization": "Bearer YOUR_API_KEY"}
payload = {
    "model": "shree-gen-prime",
    "messages": [{"role": "user", "content": "Hello!"}]
}

response = requests.post(url, json=payload, headers=headers)
print(response.json()['reply'])`,
  'PHP': `$ch = curl_init('https://theresourcehub.in/api/v1/chat');
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Authorization: Bearer YOUR_API_KEY']);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
  'model' => 'shree-gen-prime',
  'messages' => [['role' => 'user', 'content' => 'Hello!']]
]));
$res = curl_exec($ch);
echo json_decode($res)->reply;`,
  'Go': `payload := map[string]interface{}{
  "model": "shree-gen-prime",
  "messages": []interface{}{
    map[string]string{"role": "user", "content": "Hello!"},
  },
}
jsonData, _ := json.Marshal(payload)
req, _ := http.NewRequest("POST", "https://theresourcehub.in/api/v1/chat", bytes.NewBuffer(jsonData))
req.Header.Set("Authorization", "Bearer YOUR_API_KEY")`,
  'Rust': `let client = reqwest::Client::new();
let res = client.post("https://theresourcehub.in/api/v1/chat")
    .header("Authorization", "Bearer YOUR_API_KEY")
    .json(&json!({
        "model": "shree-gen-prime",
        "messages": [{"role": "user", "content": "Hello!"}]
    }))
    .send()
    .await?;`
};

const ShreeGenApiPage: React.FC<{ onBack: () => void; onMenuClick: () => void; onGuideClick: () => void }> = ({ onBack, onMenuClick, onGuideClick }) => {
  const [activeLang, setActiveLang] = useState('JavaScript');
  const [apiKey, setApiKey] = useState('sk_live_••••••••••••••••');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerateKey = async () => {
    setIsGenerating(true);
    try {
      const newKey = await userService.generateApiKey('MOCK_USER_ID', 'Production Key');
      setApiKey(newKey);
    } catch (e) {
      console.error(e);
      setApiKey("sk_live_" + Math.random().toString(36).substring(7));
    }
    setIsGenerating(false);
  };

  const handleCopyCode = () => {
    const code = SNIPPETS[activeLang].replace('YOUR_API_KEY', apiKey);
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#020202] text-white relative overflow-x-hidden custom-scrollbar">
      
      {/* Background Ambience */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-[50vh] bg-cyan-900/10 blur-[120px] rounded-full pointer-events-none -z-10" />
      
      {/* Header */}
      <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
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
        <button 
          onClick={onGuideClick}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/20 transition-all"
        >
          <BookOpen size={16} />
          <span className="text-xs font-bold uppercase tracking-widest hidden md:block">Guide</span>
        </button>
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

        {/* API Key Management */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto mb-20 p-8 rounded-[2rem] bg-[#0a0a0a] border border-white/10 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Key size={80} />
          </div>
          <h2 className="text-xl font-black mb-4 uppercase tracking-tighter">Your API Key</h2>
          <div className="flex items-center gap-3 bg-black border border-white/5 rounded-2xl p-4 mb-6">
            <code className="flex-1 font-mono text-cyan-400 text-sm truncate">{apiKey}</code>
            <button 
              onClick={handleGenerateKey}
              disabled={isGenerating}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-colors disabled:opacity-50"
            >
              <RefreshCw size={16} className={isGenerating ? "animate-spin" : ""} />
            </button>
          </div>
          <p className="text-[10px] text-white/30 uppercase font-bold tracking-widest">
            Keep this key secret. Integration code below will auto-update with this key.
          </p>
        </motion.div>

        {/* Integration Preview */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="max-w-4xl mx-auto bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden shadow-2xl mb-24 relative group"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500 opacity-50" />
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/[0.02]">
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 md:pb-0">
              {Object.keys(SNIPPETS).map((lang) => (
                <button 
                  key={lang}
                  onClick={() => setActiveLang(lang)}
                  className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap ${activeLang === lang ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20' : 'text-white/30 hover:text-white hover:bg-white/5'}`}
                >
                  {lang}
                </button>
              ))}
            </div>
            <div className="text-[10px] font-mono text-white/30 lowercase hidden md:block">{activeLang.toLowerCase()}_example</div>
          </div>
          <div className="p-6 md:p-8 overflow-x-auto relative min-h-[300px]">
             <button 
                onClick={handleCopyCode}
                className="absolute top-6 right-6 p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-colors"
             >
                {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
             </button>
             <pre className="font-mono text-sm md:text-base text-cyan-100 leading-relaxed">
               {SNIPPETS[activeLang].replace('YOUR_API_KEY', apiKey)}
             </pre>
          </div>
        </motion.div>

        {/* Features Grid ... remains the same ... */}
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
              className={`relative p-8 rounded-[2rem] bg-[#0a0a0a] border \${plan.color} \${plan.recommend ? 'shadow-2xl shadow-cyan-900/20 scale-105 z-10' : 'hover:border-white/20'}`}
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

              <button className={`w-full py-4 rounded-xl font-black uppercase tracking-widest text-xs transition-all active:scale-95 \${plan.btnColor}`}>
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
