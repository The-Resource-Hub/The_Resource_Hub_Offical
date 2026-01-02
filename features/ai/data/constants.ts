
import { Brain, Zap, Globe, Code, PenTool, Lightbulb } from 'lucide-react';
import { AIModel } from '../types';

export const MODELS: AIModel[] = [
  { id: 'fast', label: 'Fast', icon: Zap, color: 'text-yellow-400', desc: 'Fastest' },
  { id: 'thinking', label: 'Thinking', icon: Brain, color: 'text-purple-400', desc: 'Creative & Exploratory' },
  { id: 'reasoning', label: 'Reasoning', icon: Lightbulb, color: 'text-indigo-400', desc: 'Advanced Logic & Problem Solving' },
  { id: 'research', label: 'Deep Research', icon: Globe, color: 'text-cyan-400', desc: 'Web' },
];

export const PROMPT_STARTERS = [
  { icon: Code, label: "Debug Python Code", prompt: "Identify the bug in this python snippet:\n\n" },
  { icon: PenTool, label: "Write an Email", prompt: "Draft a professional email to a client about..." },
  { icon: Brain, label: "Explain Quantum Physics", prompt: "Explain quantum entanglement to a 5-year-old." },
  { icon: Globe, label: "Market Research", prompt: "Analyze the current trends in AI startups." },
];

export const DYNAMIC_PLACEHOLDERS = [
  "Ask anything...",
  "Paste a code snippet...",
  "Summarize a document...",
  "Generate an image..."
];

export const MOCK_CHAT_HISTORY: any[] = [
  {
    id: 'chat-1',
    title: 'E-commerce UI Design',
    messages: [
      { id: 'msg-1-1', sender: 'user', text: 'Give me some modern e-commerce UI design ideas.', timestamp: '10:00 AM' },
      { id: 'msg-1-2', sender: 'ai', text: 'Consider using minimalist layouts, dark themes with vibrant accents, and 3D product showcases.', timestamp: '10:01 AM' },
    ],
    lastUpdated: '10:01 AM',
  },
  {
    id: 'chat-2',
    title: 'React Performance',
    messages: [
      { id: 'msg-2-1', sender: 'user', text: 'How do I optimize React rendering?', timestamp: 'Yesterday' },
      { id: 'msg-2-2', sender: 'ai', text: 'Use React.memo, useCallback, and code-splitting with React.lazy and Suspense.', timestamp: 'Yesterday' },
    ],
    lastUpdated: 'Yesterday',
  }
];
