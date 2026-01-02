
import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { Crown, Check, ArrowLeft, Zap, Box, Layers, Gem, Star, ShieldCheck } from 'lucide-react';
import { 
  planCardVariants, 
  heroTextVariants, 
  statusBadgeVariants,
  iconGlowVariants 
} from './SubscriptionAnimations';

interface Plan {
  id: string;
  name: string;
  price: string;
  period: string;
  features: string[];
  color: string;
  glowColor: string;
  icon: React.ElementType;
  popular?: boolean;
}

const PLANS: Plan[] = [
  { id: 'basic', name: 'Basic', price: '$0', period: '/mo', features: ['Public Assets Only', 'Standard Speeds', 'Community Support'], color: 'bg-blue-500', glowColor: 'shadow-blue-500/20', icon: Box },
  { id: 'starter', name: 'Starter', price: '$15', period: '/mo', features: ['10 Premium Downloads', 'No Ads', 'Email Support', 'HD Textures'], color: 'bg-cyan-500', glowColor: 'shadow-cyan-500/20', icon: Layers },
  { id: 'pro', name: 'Pro', price: '$29', period: '/mo', features: ['Unlimited Downloads', 'Commercial License', 'Priority Support', '4K Assets', 'Zero Fees'], color: 'bg-amber-500', glowColor: 'shadow-amber-500/20', icon: Crown, popular: true },
  { id: 'intermediate', name: 'Intermediate', price: '$59', period: '/mo', features: ['All Pro Features', 'Team Access (3 Seats)', 'API Access', 'Beta Features'], color: 'bg-purple-500', glowColor: 'shadow-purple-500/20', icon: Star },
  { id: 'professional', name: 'Professional', price: '$99', period: '/mo', features: ['Unlimited Everything', 'Ded. Account Manager', 'Custom Solutions', 'SSO & Security', '24/7 Phone Support'], color: 'bg-white', glowColor: 'shadow-white/20', icon: Gem }
];

interface PremiumPageProps {
  onBack: () => void;
  userPlan?: string;
}

const PremiumPage: React.FC<PremiumPageProps> = ({ onBack, userPlan = 'basic' }) => {
  return (
    <div className="h-screen w-full bg-[#030303] text-white relative overflow-y-auto overflow-x-hidden custom-scrollbar">
      {/* Dynamic Background Elements */}
      <div className="fixed top-0 left-0 w-full h-[80vh] bg-gradient-to-b from-[#080808] via-[#030303] to-[#030303] pointer-events-none -z-10" />
      <div className="fixed top-[-20%] right-[-10%] w-[50%] h-[50%] bg-white/5 blur-[150px] rounded-full pointer-events-none -z-10" />
      <div className="fixed bottom-0 left-[-10%] w-[40%] h-[40%] bg-purple-900/10 blur-[150px] rounded-full pointer-events-none -z-10" />

      {/* Navigation Header */}
      <div className="sticky top-0 left-0 w-full px-6 py-4 flex items-center z-50 bg-black/80 backdrop-blur-md border-b border-white/5">
         <button onClick={onBack} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all group">
           <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
           <span className="text-xs font-black uppercase tracking-widest">Store Terminal</span>
         </button>
         <div className="ml-auto flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]"></span>
            <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Verified Secure</span>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-16 pb-40">
        {/* Hero Section */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={heroTextVariants}
          className="text-center mb-24"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/60 text-[10px] font-black uppercase tracking-[0.3em] mb-8 backdrop-blur-sm">
            <Zap size={12} className="text-yellow-400" fill="currentColor" /> Premium Hub Initialization
          </div>
          <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-8 leading-[0.9]">
            UNLOCK <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400">NEXT-LEVEL</span> <br />
            ASSETS
          </h1>
          <p className="text-white/30 max-w-xl mx-auto text-lg font-medium tracking-tight">
            High-fidelity resources, commercial rights, and priority cloud processing for elite developers and designers.
          </p>
        </motion.div>

        {/* Subscription Status Card */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={statusBadgeVariants}
          className="max-w-md mx-auto mb-20 p-6 rounded-[2rem] bg-[#0a0a0a] border border-white/5 flex items-center justify-between shadow-2xl relative overflow-hidden group"
        >
           <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
           <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-white/5 text-cyan-400">
                <ShieldCheck size={24} />
              </div>
              <div>
                 <p className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-0.5">Current Subscription</p>
                 <h4 className="text-lg font-black text-white uppercase tracking-tighter">{userPlan} ACCESS</h4>
              </div>
           </div>
           <motion.div 
             animate="pulse"
             variants={statusBadgeVariants}
             className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-widest"
           >
              Active
           </motion.div>
        </motion.div>

        {/* Plans Grid with Viewport Scroll Animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 items-stretch">
          {PLANS.map((plan, index) => {
            const isCurrentPlan = plan.id === userPlan;
            const Icon = plan.icon;

            return (
              <motion.div 
                key={plan.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={planCardVariants}
                transition={{ delay: index * 0.1 }}
                className={`relative flex flex-col rounded-[2.5rem] overflow-hidden transition-all duration-500 h-full
                  ${isCurrentPlan 
                    ? 'bg-[#111] border-2 border-white/10 z-20 scale-105 shadow-[0_40px_80px_rgba(0,0,0,0.5)]' 
                    : 'bg-[#080808] border border-white/5 hover:border-white/20 opacity-90 hover:opacity-100'
                  }
                  ${isCurrentPlan ? plan.glowColor : ''}
                `}
              >
                 {/* Current Plan Indicator Overlay */}
                 {isCurrentPlan && (
                   <div className="absolute top-0 inset-x-0 bg-white/5 text-center py-2 border-b border-white/5 z-30">
                     <p className="text-[9px] font-black uppercase tracking-widest text-white/60 flex items-center justify-center gap-2">
                       <span className={`w-1.5 h-1.5 rounded-full ${plan.color} animate-pulse`}></span>
                       Sync Active
                     </p>
                   </div>
                 )}
                 
                 {/* Popular Badge */}
                 {plan.popular && !isCurrentPlan && (
                    <div className="absolute top-6 right-6 px-3 py-1 bg-amber-500/10 text-amber-500 border border-amber-500/20 text-[9px] font-black uppercase tracking-widest rounded-full backdrop-blur-md">
                      Recommended
                    </div>
                 )}

                 {/* Graphic Header */}
                 <div className="w-full h-36 relative flex items-center justify-center overflow-hidden">
                    <motion.div 
                      variants={iconGlowVariants}
                      animate="animate"
                      className={`absolute inset-0 ${plan.color} blur-[50px]`} 
                    />
                    
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="relative z-10 p-5 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl"
                    >
                      <Icon size={36} className="text-white" />
                    </motion.div>
                 </div>

                 {/* Plan Details */}
                 <div className="p-8 pt-0 flex-1 flex flex-col relative z-20">
                    <h3 className={`text-2xl font-black mb-1 tracking-tight flex items-center gap-2 ${isCurrentPlan ? 'text-white' : 'text-white/60'}`}>
                      {plan.name}
                    </h3>
                    
                    <div className="flex items-end gap-1 mb-8">
                       <span className="text-4xl font-black text-white tracking-tighter">{plan.price}</span>
                       <span className="text-[10px] font-black text-white/20 mb-2 uppercase tracking-widest">{plan.period}</span>
                    </div>

                    <div className="w-full h-px bg-white/5 mb-8" />

                    <div className="space-y-4 flex-1">
                       {plan.features.map((feat, i) => (
                         <div key={i} className="flex items-start gap-4 group/item">
                            <div className={`mt-0.5 p-0.5 rounded-full transition-colors ${isCurrentPlan ? 'bg-white text-black' : 'bg-white/10 text-white/30 group-hover/item:text-white'}`}>
                              <Check size={10} strokeWidth={4} />
                            </div>
                            <span className="text-[11px] font-bold text-white/50 group-hover/item:text-white/80 transition-colors uppercase tracking-tight leading-tight">
                              {feat}
                            </span>
                         </div>
                       ))}
                    </div>

                    <button className={`w-full mt-10 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all shadow-xl active:scale-95 ${
                      isCurrentPlan 
                        ? 'bg-white text-black hover:bg-red-500 hover:text-white' 
                        : 'bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10'
                    }`}>
                      {isCurrentPlan ? 'Manage Sub' : (plan.price === '$0' ? 'Free Tier' : 'Authorize')}
                    </button>
                 </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Professional Notice */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.4em] mb-4">Secure Billing Powered by Nexus Pay</p>
          <div className="flex justify-center gap-6 opacity-20">
             <Box size={20} />
             <Zap size={20} />
             <ShieldCheck size={20} />
             <Layers size={20} />
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default memo(PremiumPage);
