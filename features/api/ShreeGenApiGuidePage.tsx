
import React, { useState, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Book, 
  Cpu, 
  Terminal, 
  Zap, 
  Shield, 
  Code, 
  ChevronRight, 
  Layers, 
  Lock, 
  Globe, 
  FileCode, 
  Check, 
  Copy, 
  ArrowLeft,
  Server,
  Activity,
  MessageSquare,
  Box,
  Braces
} from 'lucide-react';

const ShreeGenApiGuidePage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('Node.js');

  const LANG_DETAILS: Record<string, any> = {
    'Node.js': {
      icon: Terminal,
      color: 'text-green-400',
      install: 'npm install axios',
      snippet: `const axios = require('axios');

async function askShreeGen() {
  try {
    const response = await axios.post('https://theresourcehub.in/api/v1/chat', {
      model: "shree-gen-prime",
      messages: [{ role: "user", content: "Explain Quantum Physics" }]
    }, {
      headers: { 'Authorization': 'Bearer YOUR_API_KEY' }
    });
    
    console.log("Shree Gen:", response.data.reply);
  } catch (err) {
    console.error("Connection Failed:", err.message);
  }
}`,
      notes: [
        'Uses standard Axios for robust HTTP handling',
        'Supports async/await patterns',
        'Auto-serialization of JSON payloads'
      ]
    },
    'Python': {
      icon: FileCode,
      color: 'text-blue-400',
      install: 'pip install requests',
      snippet: `import requests

def ask_shree_gen(prompt):
    url = "https://theresourcehub.in/api/v1/chat"
    headers = {"Authorization": "Bearer YOUR_API_KEY"}
    data = {
        "model": "shree-gen-prime",
        "messages": [{"role": "user", "content": prompt}]
    }

    try:
        response = requests.post(url, json=data, headers=headers)
        response.raise_for_status()
        print("Shree Gen:", response.json()['reply'])
    except Exception as e:
        print(f"Error: {e}")`,
      notes: [
        'Cleanest integration with requests library',
        'Dictionary-based payload management',
        'Standard error handling blocks'
      ]
    },
    'PHP': {
      icon: Braces,
      color: 'text-indigo-400',
      install: 'Built-in cURL support',
      snippet: `<?php
$apiKey = "YOUR_API_KEY";
$data = [
    "model" => "shree-gen-prime",
    "messages" => [["role" => "user", "content" => "Hello!"]]
];

$ch = curl_init('https://theresourcehub.in/api/v1/chat');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ' . $apiKey,
    'Content-Type: application/json'
]);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));

$response = curl_exec($ch);
$result = json_decode($response, true);
echo "Shree Gen: " . $result['reply'];
?>`,
      notes: [
        'Universal cURL compatibility',
        'No external dependencies required',
        'Native JSON encoding/decoding'
      ]
    },
    'Go': {
      icon: Box,
      color: 'text-cyan-400',
      install: 'go get github.com/go-resty/resty/v2',
      snippet: `package main

import (
    "fmt"
    "github.com/go-resty/resty/v2"
)

func main() {
    client := resty.New()
    resp, err := client.R().
        SetHeader("Authorization", "Bearer YOUR_API_KEY").
        SetBody(map[string]interface{}{
            "model": "shree-gen-prime",
            "messages": []map[string]string{
                {"role": "user", "content": "Hello!"},
            },
        }).
        Post("https://theresourcehub.in/api/v1/chat")

    if err == nil {
        fmt.Println("Response:", resp)
    }
}`,
      notes: [
        'High-performance Resty client',
        'Strongly typed data structures',
        'Concurrent request support'
      ]
    },
    'Rust': {
      icon: Cpu,
      color: 'text-orange-400',
      install: 'cargo add reqwest tokio serde_json',
      snippet: `use reqwest::Client;
use serde_json::json;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let client = Client::new();
    let res = client.post("https://theresourcehub.in/api/v1/chat")
        .header("Authorization", "Bearer YOUR_API_KEY")
        .json(&json!({
            "model": "shree-gen-prime",
            "messages": [{"role": "user", "content": "Hi!"}]
        }))
        .send()
        .await?;

    let body: serde_json::Value = res.json().await?;
    println!("Shree Gen: {}", body["reply"]);
    Ok(())
}`,
      notes: [
        'Asynchronous runtime with Tokio',
        'Memory-safe API interactions',
        'JSON macro for easy payloads'
      ]
    }
  };

  const STEPS = [
    { title: 'Auth Header', icon: Lock, val: 'Authorization: Bearer <key>' },
    { title: 'Endpoint', icon: Server, val: '/api/v1/chat' },
    { title: 'Method', icon: Activity, val: 'POST' },
    { title: 'Content', icon: Braces, val: 'application/json' }
  ];

  return (
    <div className="min-h-screen bg-[#020202] text-white selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* Dynamic Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-cyan-900/10 blur-[160px] rounded-full animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-900/10 blur-[160px] rounded-full" />
      </div>

      {/* Modern Nav */}
      <header className="sticky top-0 z-50 bg-black/40 backdrop-blur-2xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button 
              onClick={onBack}
              className="group p-2.5 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all active:scale-95"
            >
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            </button>
            <div>
              <h1 className="text-xl font-black tracking-tighter uppercase leading-none">
                Integration <span className="text-cyan-500">Manifesto</span>
              </h1>
              <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-bold mt-1">v2.0 Documentation Core</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-widest">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              API Server Live
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-16">
        
        {/* API Specifications Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          {STEPS.map((s, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors group"
            >
              <s.icon className="text-cyan-500/60 mb-4 group-hover:scale-110 transition-transform" size={24} />
              <h3 className="text-[10px] text-white/30 uppercase font-black tracking-widest mb-1">{s.title}</h3>
              <p className="text-sm font-mono font-bold text-white/80">{s.val}</p>
            </motion.div>
          ))}
        </div>

        {/* Immersive Guide Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Navigation & Notes */}
          <div className="lg:col-span-4 space-y-8">
            <div className="space-y-2">
              <h2 className="text-4xl font-black tracking-tighter mb-4">Choose your <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Interface</span></h2>
              <div className="grid grid-cols-1 gap-2">
                {Object.keys(LANG_DETAILS).map((lang) => {
                  const L = LANG_DETAILS[lang];
                  return (
                    <button
                      key={lang}
                      onClick={() => setActiveTab(lang)}
                      className={`flex items-center justify-between p-4 rounded-2xl transition-all duration-300 border ${activeTab === lang ? 'bg-cyan-500/10 border-cyan-500/30 text-white translate-x-2' : 'bg-white/5 border-transparent text-white/40 hover:bg-white/[0.08] hover:text-white'}`}
                    >
                      <div className="flex items-center gap-4">
                        <L.icon size={20} className={activeTab === lang ? 'text-cyan-400' : ''} />
                        <span className="font-bold uppercase tracking-widest text-xs">{lang}</span>
                      </div>
                      {activeTab === lang && <ChevronRight size={16} className="text-cyan-500" />}
                    </button>
                  );
                })}
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div 
                key={activeTab}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="p-8 rounded-[2.5rem] bg-gradient-to-br from-white/5 to-transparent border border-white/10"
              >
                <h3 className="text-sm font-black uppercase tracking-widest mb-6 text-cyan-400">Implementation Tips</h3>
                <ul className="space-y-6">
                  {LANG_DETAILS[activeTab].notes.map((note: string, i: number) => (
                    <li key={i} className="flex gap-4 group">
                      <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-[10px] font-black group-hover:bg-cyan-500/20 group-hover:text-cyan-400 transition-colors">
                        0{i+1}
                      </div>
                      <p className="text-sm text-white/50 leading-relaxed font-medium">{note}</p>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Code Playground */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeTab}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="relative h-full flex flex-col rounded-[3rem] bg-[#050505] border border-white/10 shadow-2xl overflow-hidden group"
              >
                {/* Visual Glow */}
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50`} />
                
                <div className="flex items-center justify-between px-8 py-6 border-b border-white/5 bg-white/[0.02]">
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-xl bg-white/5 ${LANG_DETAILS[activeTab].color}`}>
                      <Terminal size={18} />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold tracking-tight">{activeTab} Integration</h3>
                      <p className="text-[10px] text-white/20 font-mono uppercase tracking-widest">{LANG_DETAILS[activeTab].install}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(LANG_DETAILS[activeTab].snippet);
                      // Trigger visual feedback (could add toast)
                    }}
                    className="p-3 rounded-xl bg-white/5 text-white/40 hover:text-white hover:bg-white/10 transition-all group/btn"
                  >
                    <Copy size={18} className="group-hover/btn:scale-110 transition-transform" />
                  </button>
                </div>

                <div className="flex-1 p-8 overflow-y-auto custom-scrollbar bg-[#050505] font-mono text-sm leading-relaxed">
                  <pre className="text-cyan-100/90">
                    <code>{LANG_DETAILS[activeTab].snippet}</code>
                  </pre>
                </div>

                {/* Footer Meta */}
                <div className="p-8 border-t border-white/5 bg-white/[0.01] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_10px_#06b6d4]" />
                    <span className="text-[10px] text-white/30 uppercase font-black tracking-widest">Neural Stream Connected</span>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <Shield size={12} className="text-emerald-500" />
                      <span className="text-[10px] text-white/20 uppercase font-bold">Encrypted</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap size={12} className="text-yellow-500" />
                      <span className="text-[10px] text-white/20 uppercase font-bold">Low Latency</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* Global Support Callout */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-20 p-12 rounded-[3.5rem] bg-gradient-to-br from-cyan-500/10 via-transparent to-transparent border border-cyan-500/20 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
            <MessageSquare size={120} />
          </div>
          <h2 className="text-3xl font-black mb-4 tracking-tighter uppercase">Need Deep Integration Support?</h2>
          <p className="text-white/40 max-w-2xl mx-auto mb-8 font-medium">
            Our engineering core is ready to help you deploy Shree Gen across enterprise clusters. Connect with our neural architects for custom model fine-tuning.
          </p>
          <button className="px-10 py-4 rounded-2xl bg-cyan-500 text-black font-black uppercase tracking-widest text-xs hover:bg-cyan-400 transition-all active:scale-95 shadow-xl shadow-cyan-500/20">
            Connect to Architect
          </button>
        </motion.div>

      </main>
    </div>
  );
};

export default memo(ShreeGenApiGuidePage);
