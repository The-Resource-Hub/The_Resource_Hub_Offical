import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Cpu, 
  Sparkles, 
  Network, 
  Settings as ConfigIcon, 
  CreditCard as PaymentIcon, 
  AlertTriangle as MaintenanceIcon,
  Search,
  Key,
  Save,
  Check,
  Zap, // For Fast
  Activity,
  Calendar,
  Layers,
  Info,
  ChevronDown,
  Plus,
  ArrowRight,
  Globe, // For Deep Research
  Trash2,
  X,
  ToggleLeft,
  ToggleRight,
  Image as ImageIcon, // For Img Generation
  BarChart3,
  Brain, // For Thinking
  Lightbulb // For Reasoning
} from 'lucide-react';

// --- Types ---
type ModelType = 'Fast' | 'Thinking' | 'Reasoning' | 'Deep Research' | 'Img Generation';

interface AIModel {
  id: string;
  name: string;
  provider: string;
  icon: string;
  apiKey: string;
  status: 'online' | 'offline';
  usage: string;
  addedDate: string;
  description: string;
  enabled: boolean;
  type: ModelType; // Added type
}

interface AggregatorModel extends AIModel {
  serviceName: string; 
}

// --- Expanded Direct Models Data (Updated with 'type' field) ---
const INITIAL_DIRECT_MODELS: AIModel[] = [
  // --- GOOGLE ---
  { id: 'gemini-2-flash', name: 'Gemini 2.0 Flash', provider: 'Google', icon: 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg', apiKey: 'AIzaSy...', status: 'online', usage: '1.2M tokens', addedDate: '2024-01-15', description: 'Next-gen multimodal speed.', enabled: true, type: 'Fast' },
  { id: 'gemini-1-5-pro', name: 'Gemini 1.5 Pro', provider: 'Google', icon: 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg', apiKey: 'AIzaSy...', status: 'online', usage: '450K tokens', addedDate: '2024-03-20', description: 'Massive context reasoning.', enabled: true, type: 'Thinking' },
  { id: 'gemini-1-5-pro-002', name: 'Gemini 1.5 Pro-002', provider: 'Google', icon: 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg', apiKey: 'AIzaSy...', status: 'online', usage: '500K tokens', addedDate: '2024-09-20', description: 'Updated production pro model.', enabled: true, type: 'Thinking' },
  { id: 'gemini-1-5-flash', name: 'Gemini 1.5 Flash', provider: 'Google', icon: 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg', apiKey: 'AIzaSy...', status: 'online', usage: '2.1M tokens', addedDate: '2024-05-10', description: 'High-frequency efficiency.', enabled: true, type: 'Fast' },
  { id: 'gemini-1-5-flash-8b', name: 'Gemini 1.5 Flash-8B', provider: 'Google', icon: 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg', apiKey: 'AIzaSy...', status: 'online', usage: '800K tokens', addedDate: '2024-09-25', description: 'Ultra-lightweight speed.', enabled: true, type: 'Fast' },
  { id: 'gemini-1-0-pro', name: 'Gemini 1.0 Pro', provider: 'Google', icon: 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg', apiKey: 'AIzaSy...', status: 'online', usage: 'Legacy', addedDate: '2023-12-06', description: 'Stable legacy text model.', enabled: false, type: 'Thinking' },
  { id: 'gemini-ultra', name: 'Gemini Ultra 1.0', provider: 'Google', icon: 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg', apiKey: 'AIzaSy...', status: 'offline', usage: '50K tokens', addedDate: '2023-12-06', description: 'Legacy powerhouse.', enabled: false, type: 'Thinking' },
  { id: 'gemini-nano', name: 'Gemini Nano', provider: 'Google', icon: 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg', apiKey: 'AIzaSy...', status: 'online', usage: 'Local', addedDate: '2024-01-01', description: 'On-device efficient model.', enabled: true, type: 'Fast' },
  { id: 'imagen-3', name: 'Imagen 3', provider: 'Google', icon: 'https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg', apiKey: 'AIzaSy...', status: 'online', usage: '420 imgs', addedDate: '2024-08-15', description: 'High-fidelity image generation.', enabled: true, type: 'Img Generation' },
  
  // --- ANTHROPIC ---
  { id: 'claude-3-5-sonnet', name: 'Claude 3.5 Sonnet', provider: 'Anthropic', icon: 'https://upload.wikimedia.org/wikipedia/commons/7/78/Anthropic_logo.svg', apiKey: 'sk-ant-...', status: 'online', usage: '850K tokens', addedDate: '2024-06-20', description: 'Intelligence leader.', enabled: true, type: 'Thinking' },
  { id: 'claude-3-opus', name: 'Claude 3 Opus', provider: 'Anthropic', icon: 'https://upload.wikimedia.org/wikipedia/commons/7/78/Anthropic_logo.svg', apiKey: 'sk-ant-...', status: 'online', usage: '120K tokens', addedDate: '2024-03-05', description: 'Deep reasoning tasks.', enabled: false, type: 'Reasoning' },
  { id: 'claude-3-haiku', name: 'Claude 3 Haiku', provider: 'Anthropic', icon: 'https://upload.wikimedia.org/wikipedia/commons/7/78/Anthropic_logo.svg', apiKey: 'sk-ant-...', status: 'online', usage: '3.5M tokens', addedDate: '2024-03-05', description: 'Instant text response.', enabled: true, type: 'Fast' },

  // --- OPENAI ---
  { id: 'gpt-4o', name: 'GPT-4o', provider: 'OpenAI', icon: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg', apiKey: 'sk-...', status: 'online', usage: '2.4M tokens', addedDate: '2024-05-13', description: 'Flagship omni model.', enabled: true, type: 'Thinking' },
  { id: 'gpt-4o-mini', name: 'GPT-4o Mini', provider: 'OpenAI', icon: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg', apiKey: 'sk-...', status: 'online', usage: '5.2M tokens', addedDate: '2024-07-18', description: 'Cost-efficient daily driver.', enabled: true, type: 'Fast' },
  { id: 'gpt-4-turbo', name: 'GPT-4 Turbo', provider: 'OpenAI', icon: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg', apiKey: 'sk-...', status: 'online', usage: '1.1M tokens', addedDate: '2023-11-06', description: 'High-capacity preview.', enabled: true, type: 'Thinking' },
  { id: 'gpt-4', name: 'GPT-4', provider: 'OpenAI', icon: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg', apiKey: 'sk-...', status: 'offline', usage: '100K tokens', addedDate: '2023-03-14', description: 'Original legacy model.', enabled: false, type: 'Reasoning' },
  { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo', provider: 'OpenAI', icon: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg', apiKey: 'sk-...', status: 'online', usage: 'Legacy', addedDate: '2022-11-30', description: 'Fast, legacy standard.', enabled: true, type: 'Fast' },
  { id: 'o1-preview', name: 'OpenAI o1-Preview', provider: 'OpenAI', icon: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg', apiKey: 'sk-...', status: 'online', usage: '50K tokens', addedDate: '2024-09-12', description: 'Advanced reasoning (CoT).', enabled: true, type: 'Thinking' },
  { id: 'o1-mini', name: 'OpenAI o1-Mini', provider: 'OpenAI', icon: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg', apiKey: 'sk-...', status: 'online', usage: '150K tokens', addedDate: '2024-09-12', description: 'Fast reasoning for code.', enabled: true, type: 'Fast' },
  { id: 'dall-e-3', name: 'DALL-E 3', provider: 'OpenAI', icon: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg', apiKey: 'sk-...', status: 'online', usage: '800 imgs', addedDate: '2023-11-05', description: 'Semantic image generation.', enabled: true, type: 'Img Generation' },

  // --- OTHERS ---
  { id: 'grok-beta', name: 'Grok Beta', provider: 'xAI', icon: 'https://upload.wikimedia.org/wikipedia/commons/5/57/X_logo_2023_%28white%29.png', apiKey: 'xai-...', status: 'online', usage: '150K tokens', addedDate: '2024-08-15', description: 'Real-time knowledge.', enabled: false, type: 'Deep Research' },
];

const AGGREGATOR_SERVICES = [
  'OpenRouter', 'HuggingFace', 'Groq', 'Perplexity', 'DeepSeek', 'Mistral AI', 'Together AI', 'Fireworks AI', 'Replicate', 'Nebius', 'Fal.ai'
];

// --- Large Scale Model List (Text, Logic, Image, Roleplay) ---
const AGGREGATOR_MODELS = [
  // --- OPENAI (Via Aggregator) ---
  'openai/gpt-4o (Omni)',
  'openai/gpt-4o-mini (Fast)',
  'openai/gpt-4-turbo',
  'openai/gpt-4-32k',
  'openai/gpt-3.5-turbo',
  'openai/o1-preview (Reasoning)',
  'openai/o1-mini (Fast Reasoning)',
  'openai/chatgpt-4o-latest',

  // --- GOOGLE (Via Aggregator) ---
  'google/gemini-pro-1.5',
  'google/gemini-flash-1.5',
  'google/gemini-flash-1.5-8b',
  'google/gemini-pro-1.5-002',
  'google/gemini-flash-1.5-002',
  'google/gemini-2.0-flash-exp (Preview)',
  'google/gemma-2-27b-it',
  'google/gemma-2-9b-it',

  // --- ANTHROPIC (Via Aggregator) ---
  'anthropic/claude-3.5-sonnet',
  'anthropic/claude-3-opus',
  'anthropic/claude-3-haiku',
  'anthropic/claude-3.5-haiku',

  // --- META / LLAMA ---
  'meta-llama/llama-3.1-405b-instruct',
  'meta-llama/llama-3.1-70b-instruct',
  'meta-llama/llama-3.1-8b-instruct',
  'meta-llama/llama-3.2-90b-vision-instruct',
  'meta-llama/llama-3.2-11b-vision-instruct',
  'meta-llama/llama-3.2-3b-instruct',

  // --- DEEPSEEK / QWEN / MISTRAL ---
  'deepseek/deepseek-chat-v3',
  'deepseek/deepseek-v3.1-nex-n1',
  'deepseek/deepseek-r1 (Reasoning)',
  'qwen/qwen-2.5-72b-instruct',
  'qwen/qwen-2.5-coder-32b-instruct',
  'qwen/qwen-2.5-math-72b',
  'mistralai/mistral-large-2',
  'mistralai/mistral-nemo',
  'mistralai/pixtral-12b',
  'mistralai/mixtral-8x22b-instruct',

  // --- SPECIALIZED / ROLEPLAY / UNCENSORED ---
  'gryphe/mythomax-l2-13b',
  'sophosympatheia/midnight-miqu-70b',
  'neversleep/noromaid-20b',
  'undi95/toppy-m-7b',
  'nousresearch/hermes-3-llama-3.1-405b',
  'cognitivecomputations/dolphin-2.9-mixtral-8x22b',
  'microsoft/wizardlm-2-8x22b',
  'cohere/command-r-plus',
  'microsoft/phi-4',
  
  // --- DEEP RESEARCH & SEARCH ---
  'perplexity/sonar-pro',
  'perplexity/sonar-reasoning',
  'xai/grok-2',
  'xai/grok-beta',
  
  // --- IMAGE GENERATION (Graphics) ---
  'black-forest-labs/flux-1-dev',
  'black-forest-labs/flux-1-schnell',
  'stabilityai/stable-diffusion-xl-lightning',
  'stabilityai/stable-diffusion-3.5-large',
  'playground/playground-v2.5',
  'midjourney/v6-proxy',
  'ideogram/v2'
];

// --- Custom Toggle Switch ---
const ToggleSwitch: React.FC<{ enabled: boolean; onToggle: () => void }> = ({ enabled, onToggle }) => (
  <button 
    onClick={(e) => { e.stopPropagation(); onToggle(); }}
    className={`relative w-10 h-5 rounded-full transition-colors duration-300 flex items-center px-1 ${enabled ? 'bg-cyan-500' : 'bg-white/10'}`}
  >
    <motion.div 
      animate={{ x: enabled ? 20 : 0 }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      className="w-3 h-3 rounded-full bg-white shadow-sm"
    />
  </button>
);

// --- Custom Dropdown Component ---
const CustomDropdown: React.FC<{
  label: string;
  options: string[];
  value: string;
  onChange: (val: string) => void;
  icon: React.ReactNode;
  placeholder: string;
  glowColor?: string;
}> = ({ label, options, value, onChange, icon, placeholder, glowColor = 'cyan' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="space-y-3 relative" ref={dropdownRef}>
      <label className="text-[10px] font-black uppercase tracking-widest text-white/30 px-1">{label}</label>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={`relative w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-sm text-white cursor-pointer transition-all hover:border-white/20 flex items-center justify-between ${isOpen ? `ring-2 ring-${glowColor}-500/30 border-${glowColor}-500/50` : ''}`}
      >
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20">{icon}</div>
        <span className={value ? 'text-white' : 'text-white/20'}>{value || placeholder}</span>
        <ChevronDown size={16} className={`text-white/20 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute top-full left-0 right-0 mt-2 z-50 bg-[#121212] border border-white/10 rounded-2xl shadow-2xl overflow-hidden max-h-60 overflow-y-auto no-scrollbar"
          >
            <div className="p-2 space-y-1">
              {options.map((opt) => (
                <div 
                  key={opt}
                  onClick={() => {
                    onChange(opt);
                    setIsOpen(false);
                  }}
                  className={`px-4 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-between group ${value === opt ? 'bg-white text-black' : 'text-white/60 hover:bg-white/5 hover:text-white'}`}
                >
                  <span className="truncate">{opt}</span>
                  {value === opt && <Check size={14} className="shrink-0" />}
                  {value !== opt && <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all shrink-0" />}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Model Categories Configuration ---
const modelCategories: {
  id: ModelType;
  label: string;
  icon: React.ElementType; // LucideIcon
  color: string;
}[] = [
  { id: 'Fast', label: 'Fast', icon: Zap, color: 'text-yellow-400' },
  { id: 'Thinking', label: 'Thinking', icon: Brain, color: 'text-purple-400' },
  { id: 'Reasoning', label: 'Reasoning', icon: Lightbulb, color: 'text-indigo-400' },
  { id: 'Deep Research', label: 'Deep Research', icon: Globe, color: 'text-cyan-400' },
  { id: 'Img Generation', label: 'Image Generation', icon: ImageIcon, color: 'text-green-400' },
];

// --- New Component for Collapsible Model Category Section ---
interface ModelCategorySectionProps {
  category: typeof modelCategories[0];
  models: (AIModel | AggregatorModel)[];
  renderModelCard: (model: AIModel | AggregatorModel) => React.ReactNode;
  emptyMessage: string;
}

const ModelCategorySection: React.FC<ModelCategorySectionProps> = ({ category, models, renderModelCard, emptyMessage }) => {
  const [isOpen, setIsOpen] = useState(true); // Start open by default

  return (
    <div className="bg-[#0f0f0f] border border-white/10 rounded-[2rem] overflow-hidden shadow-xl">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 bg-white/[0.03] hover:bg-white/[0.05] transition-colors"
      >
        <div className="flex items-center gap-4">
          <category.icon size={24} className={category.color} />
          <span className="text-xl font-black text-white uppercase tracking-tighter">{category.label}</span>
          <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full border border-white/5">{models.length} Nodes</span>
        </div>
        <ChevronDown size={24} className={`text-white/40 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
              {models.length > 0 ? (
                models.map(renderModelCard)
              ) : (
                <div className="col-span-full py-10 text-center text-white/20 text-sm">
                  {emptyMessage}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};


export const SettingsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'config' | 'shreegen' | 'payment' | 'maintenance'>('shreegen');
  const [activeSubTab, setActiveSubTab] = useState<'models' | 'aggregators'>('models');
  
  // States for Direct Models
  const [directModels, setDirectModels] = useState<AIModel[]>(INITIAL_DIRECT_MODELS);
  const [modelKeys, setModelKeys] = useState<Record<string, string>>({});
  
  // States for Aggregators
  const [aggregatorModels, setAggregatorModels] = useState<AggregatorModel[]>([]);
  const [aggForm, setAggForm] = useState<{ service: string; model: string; key: string; type: ModelType | '' }>({ service: '', model: '', key: '', type: '' });
  
  // Modal State
  const [selectedDetailModel, setSelectedDetailModel] = useState<AIModel | AggregatorModel | null>(null);

  // Load/Save Persistence
  useEffect(() => {
    const savedDirect = localStorage.getItem('shree_direct_models');
    if (savedDirect) setDirectModels(JSON.parse(savedDirect));
    
    const savedAgg = localStorage.getItem('shree_aggregator_models');
    if (savedAgg) setAggregatorModels(JSON.parse(savedAgg));
  }, []);

  useEffect(() => {
    localStorage.setItem('shree_direct_models', JSON.stringify(directModels));
  }, [directModels]);

  useEffect(() => {
    localStorage.setItem('shree_aggregator_models', JSON.stringify(aggregatorModels));
  }, [aggregatorModels]);

  const handleKeyChange = (id: string, val: string) => {
    setModelKeys(prev => ({ ...prev, [id]: val }));
  };

  const toggleModelStatus = (id: string) => {
    setDirectModels(prev => prev.map(m => m.id === id ? { ...m, enabled: !m.enabled } : m));
  };

  const toggleAggregatorStatus = (id: string) => {
    setAggregatorModels(prev => prev.map(m => m.id === id ? { ...m, enabled: !m.enabled } : m));
  };

  const initializeKey = (id: string) => {
    setDirectModels(prev => prev.map(m => m.id === id ? { ...m, apiKey: modelKeys[id] } : m));
  };

  const addAggregatorModel = () => {
    if (!aggForm.service || !aggForm.model || !aggForm.key || !aggForm.type) return;
    
    const newModel: AggregatorModel = {
      id: `agg-${Date.now()}`,
      name: aggForm.model,
      provider: aggForm.service, // Use service as provider for display
      serviceName: aggForm.service,
      icon: 'https://cdn-icons-png.flaticon.com/512/2103/2103633.png', // Generic aggregator icon
      apiKey: aggForm.key,
      status: 'online',
      usage: '0 tokens',
      addedDate: new Date().toISOString().split('T')[0],
      description: `Accessed via ${aggForm.service} aggregator.`,
      enabled: true,
      type: aggForm.type, // Assign selected type
    };

    setAggregatorModels(prev => [newModel, ...prev]);
    setAggForm({ service: '', model: '', key: '', type: '' });
  };

  const removeAggModel = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setAggregatorModels(prev => prev.filter(m => m.id !== id));
  };

  // --- ANALYTICS CALCULATIONS ---
  const activeDirectCount = directModels.filter(m => m.enabled).length;
  const activeAggregatorCount = aggregatorModels.filter(m => m.enabled).length;
  const totalActiveNodes = activeDirectCount + activeAggregatorCount;

  // Simple token usage estimation parser
  const calculateTotalUsage = () => {
    let total = 0;
    const allModels = [...directModels, ...aggregatorModels];
    allModels.forEach(m => {
      if (!m.enabled) return;
      const u = m.usage.toUpperCase();
      if (u.includes('LOCAL') || u.includes('LEGACY')) return;
      
      let val = parseFloat(u); // Extracts number from "1.2M tokens"
      if (isNaN(val)) return;

      if (u.includes('M')) val *= 1000000;
      else if (u.includes('K')) val *= 1000;
      
      total += val;
    });
    
    if (total >= 1000000) return (total / 1000000).toFixed(1) + 'M';
    if (total >= 1000) return (total / 1000).toFixed(1) + 'K';
    return total.toString();
  };

  const totalTokenUsage = calculateTotalUsage();

  // --- Model Render Functions ---
  const renderDirectModelCard = useCallback((model: AIModel | AggregatorModel) => {
    // Cast to AIModel to access apiKey property safely if needed for this UI
    const m = model as AIModel;
    const hasChanged = modelKeys[m.id] !== m.apiKey;
    return (
      <div 
        key={m.id}
        onClick={() => setSelectedDetailModel(m)}
        className={`group relative bg-[#080808] border rounded-[2rem] p-8 hover:border-white/20 transition-all cursor-pointer overflow-hidden shadow-xl ${m.enabled ? 'border-white/5' : 'border-white/5 opacity-40'}`}
      >
        <div className="flex justify-between items-start mb-8">
            <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center p-3 shadow-inner group-hover:scale-110 transition-transform">
                    <img src={m.icon} alt={m.name} className="w-full h-full object-contain" />
                </div>
                <div>
                    <h4 className="font-black text-white text-lg tracking-tight uppercase leading-none mb-1">{m.name}</h4>
                    <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest">{m.provider}</p>
                </div>
            </div>
            <ToggleSwitch enabled={m.enabled} onToggle={() => toggleModelStatus(m.id)} />
        </div>
        
        <div className="space-y-4" onClick={(e) => e.stopPropagation()}>
            <label className="text-[9px] font-black uppercase tracking-[0.2em] text-white/20 px-1">Secure API Endpoint Key</label>
            <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20"><Key size={14} /></div>
                <input 
                    type="password"
                    value={modelKeys[m.id] || ''}
                    onChange={(e) => handleKeyChange(m.id, e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-xs font-mono text-white outline-none focus:border-cyan-500/50 transition-all placeholder:text-white/10"
                    placeholder="••••••••••••••••"
                />
            </div>
            
            <AnimatePresence>
                {hasChanged && (
                    <motion.button
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        onClick={() => initializeKey(m.id)}
                        className="w-full py-3 bg-white text-black font-black uppercase tracking-widest text-[10px] rounded-xl hover:bg-cyan-400 transition-colors flex items-center justify-center gap-2 mt-2"
                    >
                        <Zap size={14} fill="currentColor" /> Initialize Neural Link
                    </motion.button>
                )}
            </AnimatePresence>
        </div>

        <div className="mt-8 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full animate-pulse ${m.status === 'online' && m.enabled ? 'bg-emerald-500 shadow-[0_0_8px_#10b981]' : 'bg-red-500 shadow-[0_0_8px_#ef4444]'}`} />
                <span className="text-[9px] font-black uppercase tracking-widest text-white/20">{m.enabled ? m.status : 'disabled'}</span>
            </div>
            <span className="text-[9px] font-black uppercase tracking-widest text-white/10">v.1.0.4-LTS</span>
        </div>
      </div>
    );
  }, [modelKeys, directModels]); // Re-create only if modelKeys or directModels change

  const renderAggregatorModelCard = useCallback((model: AggregatorModel) => {
    return (
      <div 
        key={model.id}
        onClick={() => setSelectedDetailModel(model)}
        className={`group relative bg-[#080808] border rounded-[2rem] p-8 hover:border-white/20 transition-all cursor-pointer overflow-hidden shadow-xl ${model.enabled ? 'border-white/5' : 'border-white/5 opacity-40'}`}
      >
        <div className="flex justify-between items-start mb-8">
            <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center p-3 shadow-inner group-hover:scale-110 transition-transform">
                    <Network size={28} className="text-purple-400" />
                </div>
                <div>
                    <h4 className="font-black text-white text-lg tracking-tight uppercase leading-none mb-1 truncate max-w-[120px]">{model.name}</h4>
                    <p className="text-[10px] font-bold text-purple-400 uppercase tracking-widest">{model.serviceName}</p>
                </div>
            </div>
            
            <div className="flex flex-col gap-3 items-end">
                <ToggleSwitch enabled={model.enabled} onToggle={() => toggleAggregatorStatus(model.id)} />
                <button 
                    onClick={(e) => removeAggModel(e, model.id)}
                    className="p-2 rounded-full bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-sm"
                    title="Remove Aggregator"
                >
                    <Trash2 size={14} />
                </button>
            </div>
        </div>

        <div className="space-y-4" onClick={(e) => e.stopPropagation()}>
            <label className="text-[9px] font-black uppercase tracking-[0.2em] text-white/20 px-1">Gateway Auth Key</label>
            <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20"><Key size={14} /></div>
                <input 
                    type="text"
                    value={model.apiKey}
                    onChange={(e) => {
                        const newVal = e.target.value;
                        setAggregatorModels(prev => prev.map(m => m.id === model.id ? {...m, apiKey: newVal} : m));
                    }}
                    className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-xs font-mono text-white outline-none focus:border-purple-500/50 transition-all"
                />
            </div>
        </div>

        <div className="mt-8 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full animate-pulse ${model.enabled ? 'bg-emerald-500 shadow-[0_0_8px_#10b981]' : 'bg-red-500 shadow-[0_0_8px_#ef4444]'}`} />
                <span className="text-[9px] font-black uppercase tracking-widest text-white/20">{model.enabled ? 'Synced' : 'Disabled'}</span>
            </div>
            <span className="text-[9px] font-black uppercase tracking-widest text-white/10">v.0.8.2-Beta</span>
        </div>
      </div>
    );
  }, [aggregatorModels]); // Re-create only if aggregatorModels change

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="max-w-7xl mx-auto space-y-8 pb-32"
    >
      {/* --- Main Navigation Bar --- */}
      <div className="sticky top-0 z-40 bg-[#020202]/80 backdrop-blur-xl border-b border-white/5 -mx-4 px-4 py-4 mb-8">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth">
          {[
            { id: 'config', label: 'Config', icon: ConfigIcon },
            { id: 'shreegen', label: 'Shree Gen', icon: Sparkles },
            { id: 'payment', label: 'Payment Gateway', icon: PaymentIcon },
            { id: 'maintenance', label: 'Maintenance', icon: MaintenanceIcon },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-3 px-6 py-3 rounded-2xl whitespace-nowrap transition-all border font-bold uppercase tracking-widest text-[10px] ${
                activeTab === tab.id 
                  ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.1)]' 
                  : 'bg-white/5 text-white/40 border-white/5 hover:bg-white/10 hover:border-white/20'
              }`}
            >
              <tab.icon size={14} />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'shreegen' ? (
          <motion.div 
            key="shreegen-content"
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }} 
            exit={{ opacity: 0, x: -20 }}
            className="space-y-12"
          >
            {/* --- ANALYTICS GRID (2x2) --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {/* Top Left: Total Active Models */}
               <div className="bg-[#080808] border border-white/5 rounded-[2rem] p-6 flex flex-col justify-between hover:border-white/10 transition-colors group">
                  <div className="flex justify-between items-start mb-4">
                     <div className="p-3 rounded-2xl bg-white/5 text-white group-hover:bg-cyan-500/10 group-hover:text-cyan-400 transition-colors">
                        <Cpu size={24} />
                     </div>
                     <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded">Live</span>
                  </div>
                  <div>
                     <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-1">Total Active Nodes</p>
                     <h3 className="text-4xl font-black text-white tracking-tighter">{totalActiveNodes}</h3>
                  </div>
               </div>

               {/* Top Right: Total Token Usage */}
               <div className="bg-[#080808] border border-white/5 rounded-[2rem] p-6 flex flex-col justify-between hover:border-white/10 transition-colors group">
                  <div className="flex justify-between items-start mb-4">
                     <div className="p-3 rounded-2xl bg-white/5 text-white group-hover:bg-purple-500/10 group-hover:text-purple-400 transition-colors">
                        <Activity size={24} />
                     </div>
                     <BarChart3 size={16} className="text-white/20" />
                  </div>
                  <div>
                     <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-1">Global Token Consumption</p>
                     <h3 className="text-4xl font-black text-white tracking-tighter">{totalTokenUsage}</h3>
                  </div>
               </div>

               {/* Bottom Left: Active AI Models */}
               <div className="bg-[#080808] border border-white/5 rounded-[2rem] p-6 flex flex-col justify-between hover:border-white/10 transition-colors group">
                  <div className="flex justify-between items-start mb-4">
                     <div className="p-3 rounded-2xl bg-white/5 text-white group-hover:bg-amber-500/10 group-hover:text-amber-400 transition-colors">
                        <Zap size={24} />
                     </div>
                  </div>
                  <div>
                     <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-1">Direct Intelligence Units</p>
                     <h3 className="text-3xl font-black text-white tracking-tighter">{activeDirectCount} <span className="text-sm text-white/20">/ {directModels.length}</span></h3>
                  </div>
               </div>

               {/* Bottom Right: Active Aggregators */}
               <div className="bg-[#080808] border border-white/5 rounded-[2rem] p-6 flex flex-col justify-between hover:border-white/10 transition-colors group">
                  <div className="flex justify-between items-start mb-4">
                     <div className="p-3 rounded-2xl bg-white/5 text-white group-hover:bg-pink-500/10 group-hover:text-pink-400 transition-colors">
                        <Network size={24} />
                     </div>
                  </div>
                  <div>
                     <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-1">Aggregated Proxy Links</p>
                     <h3 className="text-3xl font-black text-white tracking-tighter">{activeAggregatorCount} <span className="text-sm text-white/20">/ {aggregatorModels.length}</span></h3>
                  </div>
               </div>
            </div>

            {/* Sub-Tabs Section */}
            <div className="space-y-8">
               <div className="flex items-center gap-2 border-b border-white/5 pb-4">
                  <button 
                    onClick={() => setActiveSubTab('models')}
                    className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeSubTab === 'models' ? 'text-white border-b-2 border-cyan-500' : 'text-white/30 hover:text-white'}`}
                  >
                    AI Models
                  </button>
                  <button 
                    onClick={() => setActiveSubTab('aggregators')}
                    className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeSubTab === 'aggregators' ? 'text-white border-b-2 border-purple-500' : 'text-white/30 hover:text-white'}`}
                  >
                    Aggregators
                  </button>
               </div>

               <AnimatePresence mode="wait">
                  {activeSubTab === 'models' ? (
                    <motion.div 
                      key="subtab-models"
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                      className="space-y-6"
                    >
                       {modelCategories.map(category => (
                         <ModelCategorySection
                           key={category.id}
                           category={category}
                           models={directModels.filter(m => m.type === category.id)}
                           renderModelCard={renderDirectModelCard as any}
                           emptyMessage={`No direct AI models of type "${category.label}" currently installed.`}
                         />
                       ))}
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="subtab-aggregators"
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                      className="space-y-12"
                    >
                       {/* Aggregator Hero Form */}
                       <div className="bg-[#080808] border border-white/5 rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden">
                          <div className="absolute top-0 right-0 p-10 opacity-[0.02] text-white pointer-events-none"><Network size={120} /></div>
                          
                          <div className="mb-8">
                             <h3 className="text-xl font-black text-white uppercase tracking-tight mb-2">Inject Aggregator Asset</h3>
                             <p className="text-sm text-white/30">Connect third-party text response inference endpoints (Fast, Reasoning, Deep Research).</p>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
                             <CustomDropdown 
                               label="Service Provider"
                               options={AGGREGATOR_SERVICES}
                               value={aggForm.service}
                               onChange={(val) => setAggForm({...aggForm, service: val})}
                               icon={<Globe size={16} />}
                               placeholder="Select Gateway"
                               glowColor="purple"
                             />

                             <CustomDropdown 
                               label="Model Definition"
                               options={AGGREGATOR_MODELS}
                               value={aggForm.model}
                               onChange={(val) => setAggForm({...aggForm, model: val})}
                               icon={<Search size={16} />}
                               placeholder="Choose Logic Unit"
                               glowColor="purple"
                             />

                             <CustomDropdown 
                               label="Model Type"
                               options={modelCategories.map(cat => cat.id)}
                               value={aggForm.type}
                               onChange={(val) => setAggForm({...aggForm, type: val as ModelType})}
                               icon={<Sparkles size={16} />}
                               placeholder="Categorize Model"
                               glowColor="purple"
                             />

                             <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-widest text-white/30 px-1">Bearer Auth Key</label>
                                <div className="flex gap-3">
                                   <div className="relative flex-1">
                                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20"><Key size={16} /></div>
                                      <input 
                                         type="password"
                                         value={aggForm.key}
                                         onChange={(e) => setAggForm({...aggForm, key: e.target.value})}
                                         className="w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-sm text-white outline-none focus:border-purple-500/50 transition-all"
                                         placeholder="sk-..."
                                      />
                                   </div>
                                   <button 
                                      onClick={addAggregatorModel}
                                      disabled={!aggForm.service || !aggForm.model || !aggForm.key || !aggForm.type}
                                      className="px-8 py-4 bg-white text-black font-black uppercase tracking-widest text-[10px] rounded-xl hover:bg-purple-500 transition-all disabled:opacity-20 active:scale-95 shadow-xl shadow-purple-900/10"
                                   >
                                      Initialize
                                   </button>
                                </div>
                             </div>
                          </div>
                       </div>

                       {/* Aggregator Cards List */}
                       <div className="space-y-6">
                          {modelCategories.map(category => (
                            <ModelCategorySection
                              key={category.id}
                              category={category}
                              models={aggregatorModels.filter(m => m.type === category.id)}
                              renderModelCard={renderAggregatorModelCard as any}
                              emptyMessage={`No aggregator models of type "${category.label}" currently injected.`}
                            />
                          ))}
                       </div>
                    </motion.div>
                  )}
               </AnimatePresence>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="placeholder-content"
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="flex flex-col items-center justify-center h-[500px] border border-dashed border-white/10 rounded-[3rem] bg-white/[0.01]"
          >
             <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
                <ConfigIcon size={32} className="text-white/20" />
             </div>
             <h3 className="text-xl font-bold text-white/40 mb-2 uppercase tracking-tighter">{activeTab} Interface Locked</h3>
             <p className="text-white/20 text-sm max-w-md text-center px-8">This module is currently disabled for security reasons or undergoing scheduled maintenance.</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Model Details Modal --- */}
      <AnimatePresence>
         {selectedDetailModel && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-3xl">
               <motion.div 
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  className="bg-[#0f0f0f] border border-white/10 rounded-[2.5rem] w-full max-w-2xl overflow-hidden shadow-3xl relative"
               >
                  <button 
                     onClick={() => setSelectedDetailModel(null)}
                     className="absolute top-8 right-8 p-2 rounded-xl bg-white/5 text-white/40 hover:text-white hover:bg-white/10 transition-all z-10"
                  >
                     <X size={20} />
                  </button>

                  <div className="relative p-10 pb-12 border-b border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent">
                     <div className="flex items-center gap-8">
                        <div className="w-24 h-24 rounded-3xl bg-black border border-white/10 flex items-center justify-center p-4 shadow-inner">
                           {selectedDetailModel.icon && (selectedDetailModel as AIModel).provider !== 'Third Party' ? (
                              <img src={selectedDetailModel.icon} className="w-full h-full object-contain" alt="" />
                           ) : (
                              <Network size={48} className="text-purple-400" />
                           )}
                        </div>
                        <div>
                           <div className="flex items-center gap-3 mb-2">
                              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-400">
                                 {(selectedDetailModel as AggregatorModel).serviceName || selectedDetailModel.provider}
                              </span>
                              <div className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest border ${selectedDetailModel.status === 'online' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20'}`}>
                                 {selectedDetailModel.status}
                              </div>
                           </div>
                           <h2 className="text-3xl md:text-4xl font-black text-white tracking-tighter uppercase">{selectedDetailModel.name}</h2>
                           <p className="text-white/40 text-xs mt-2 flex items-center gap-2">
                              <Calendar size={12} /> Registered on {selectedDetailModel.addedDate}
                           </p>
                           {selectedDetailModel.type && (
                             <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mt-2 flex items-center gap-2">
                                <Sparkles size={12} className="text-white/60" /> Type: {selectedDetailModel.type}
                             </p>
                           )}
                        </div>
                     </div>
                  </div>

                  <div className="p-10 space-y-10">
                     <div className="grid grid-cols-2 gap-4">
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                           <div className="flex items-center gap-2 text-white/30 text-[9px] font-black uppercase tracking-widest mb-3">
                              <Activity size={12} className="text-purple-400" /> Neural Usage Log
                           </div>
                           <p className="text-2xl font-black text-white">{selectedDetailModel.usage}</p>
                        </div>
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                           <div className="flex items-center gap-2 text-white/30 text-[9px] font-black uppercase tracking-widest mb-3">
                              <Zap size={12} className="text-cyan-400" /> Connection Status
                           </div>
                           <p className="text-lg font-black text-emerald-400 uppercase tracking-tight">System Optimal</p>
                        </div>
                     </div>

                     <div className="space-y-4">
                        <div className="flex items-center gap-3">
                           <div className="w-8 h-px bg-white/10" />
                           <h4 className="text-[10px] font-black uppercase tracking-widest text-white/30 whitespace-nowrap">Asset Intelligence Summary</h4>
                           <div className="flex-1 h-px bg-white/10" />
                        </div>
                        <p className="text-white/60 leading-relaxed text-sm md:text-base">
                           {selectedDetailModel.description} Direct neural pathway established via encrypted protocol. 
                           Hardware acceleration enabled for sub-50ms latency in typical inference tasks.
                        </p>
                     </div>

                     <div className="pt-4 flex gap-4">
                        <button className="flex-1 py-4 bg-white text-black font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-cyan-400 transition-all flex items-center justify-center gap-2">
                           <Layers size={14} /> View Extended Specs
                        </button>
                        <button className="flex-1 py-4 bg-white/5 border border-white/10 text-white/50 font-black uppercase tracking-widest text-xs rounded-2xl hover:text-white transition-all">
                           Run Diagnostic
                        </button>
                     </div>
                  </div>
               </motion.div>
            </div>
         )}
      </AnimatePresence>

    </motion.div>
  );
};