import React, { useState, memo, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Crown, // Added for premium
  Gift, // Added for coupons
  Zap, // Added for traffic boost
  Sparkles, // Added for exclusive icon pack
  ArrowLeft, // For back button
  Wallet, // For Wallet button
  Check, // For purchased items
  Star, // For featured reward
  ShieldCheck, // For more rewards
  Key, // For more rewards
} from 'lucide-react';

// --- TYPES ---
interface RewardItem {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: React.ElementType;
}

// --- MOCK DATA ---
const QUANTUM_REWARDS: RewardItem[] = [
  { id: 'premium_access_30d', name: 'Premium Access (30 Days)', description: 'Unlock all premium features for one month.', price: 150, icon: Crown }, // This will be featured
  { id: 'coupon_25_off', name: '25% Off Store Coupon', description: 'Get 25% discount on your next store purchase.', price: 80, icon: Gift },
  { id: 'traffic_boost_5k', name: 'Traffic Boost (5K Clicks)', description: 'Boost your next shortlink with 5,000 organic clicks.', price: 200, icon: Zap },
  { id: 'exclusive_icon_pack', name: 'Exclusive Icon Pack', description: 'Access a collection of premium icons for your projects.', price: 50, icon: Sparkles }, 
  { id: 'advanced_analytics', name: 'Advanced Analytics', description: 'Gain deeper insights into your shortlink performance.', price: 100, icon: Star },
  { id: 'custom_domain_slot', name: 'Custom Domain Slot', description: 'Add one custom domain for your shortlinks.', price: 250, icon: Key },
  { id: 'priority_support', name: 'Priority Support', description: 'Get faster response times from our support team.', price: 70, icon: ShieldCheck },
  { id: 'branding_removal', name: 'Branding Removal', description: 'Remove "Resource Hub" branding from your shortlinks.', price: 120, icon: Zap },
  { id: 'ai_assistant_access', name: 'AI Assistant Access', description: 'Gain limited access to our AI content generation tools.', price: 180, icon: Sparkles },
  { id: 'extended_storage', name: 'Extended Storage (100GB)', description: 'Increase your shortlink asset storage by 100GB.', price: 90, icon: Gift },
  { id: 'early_beta_access', name: 'Early Beta Features', description: 'Get exclusive early access to upcoming features.', price: 300, icon: Crown },
];

interface ShortlinkStorePageProps {
  balance: number;
  updateBalance: (newBalance: number) => void;
  onBack: () => void; // To go back to ShortlinkPage
  onWalletClick: () => void; // To go to WalletPage
}

const ShortlinkStorePage: React.FC<ShortlinkStorePageProps> = ({ balance, updateBalance, onBack, onWalletClick }) => {
  const [purchasedRewards, setPurchasedRewards] = useState<string[]>([]);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const totalRewardsUnlocked = useMemo(() => purchasedRewards.length, [purchasedRewards]);

  const featuredReward = QUANTUM_REWARDS.find(r => r.id === 'premium_access_30d');
  const otherRewards = QUANTUM_REWARDS.filter(r => r.id !== 'premium_access_30d');

  const handlePurchaseReward = useCallback((reward: RewardItem) => {
    if (balance >= reward.price) {
      updateBalance(balance - reward.price);
      setPurchasedRewards(prev => [...prev, reward.id]);
      setNotification({ message: `Successfully purchased ${reward.name}!`, type: 'success' });
    } else {
      setNotification({ message: `Insufficient balance to purchase ${reward.name}.`, type: 'error' });
    }
    setTimeout(() => setNotification(null), 3000);
  }, [balance, updateBalance]);

  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="w-full max-w-5xl mx-auto pb-20 relative px-4">
      {/* Background ambience */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-indigo-900/10 blur-[120px] rounded-full -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-cyan-900/10 blur-[120px] rounded-full -z-10 pointer-events-none" />

      {/* Sticky Header with Back Button and Balance */}
      <div className="sticky top-0 z-50 w-full backdrop-blur-md bg-black/40 border-b border-white/10 px-4 py-4 flex items-center justify-between -mx-4 md:-mx-8 md:px-8">
        <button 
          onClick={onBack} 
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-bold">Back</span>
        </button>
        <div className="flex flex-col items-center">
          <h1 className="text-xl md:text-2xl font-black text-white tracking-tighter">
            QUANTUM <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">REWARDS</span>
          </h1>
        </div>
        <button onClick={onWalletClick} className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full group">
          <Wallet size={16} className="text-white/60 group-hover:text-cyan-400 transition-colors" />
          <span className="text-sm font-bold text-white">${balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
        </button>
      </div>

      {/* Page Description */}
      <motion.div variants={item} className="text-center mb-12 pt-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-[10px] font-black uppercase tracking-[0.2em] mb-6 backdrop-blur-md">
           <Crown size={12} /> Elite Unlocks
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-4">
          EMPOWER YOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400">SHORTLINKS</span>
        </h2>
        <p className="text-white/40 max-w-xl mx-auto text-lg">Spend your shortlink earnings on powerful upgrades and exclusive access.</p>
      </motion.div>

      {/* Notifications */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className={`fixed top-28 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 rounded-full shadow-lg font-bold text-sm
              ${notification.type === 'success' ? 'bg-green-600 text-white' : ''}
              ${notification.type === 'error' ? 'bg-red-600 text-white' : ''}
              ${notification.type === 'info' ? 'bg-blue-600 text-white' : ''}
            `}
          >
            {notification.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Featured Reward Section */}
      {featuredReward && (
        <motion.div variants={item} className="mb-16">
          <div className="flex items-center justify-center mb-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2"><Star className="text-yellow-400" /> Featured Unlock</h3>
          </div>
          <motion.div 
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5, type: "spring", stiffness: 100, damping: 10 }}
            className="relative bg-[#111] border border-white/10 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-center gap-8 overflow-hidden group shadow-2xl shadow-purple-900/20"
          >
            {/* Background glowing particles/aura */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-cyan-500/10 blur-3xl opacity-50 group-hover:opacity-70 transition-opacity duration-500" />
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative w-24 h-24 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-4 md:mb-0 flex-shrink-0 group-hover:scale-110 transition-transform duration-500">
              <div className="absolute inset-0 rounded-full bg-purple-400/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <featuredReward.icon size={48} />
            </div>
            <div className="text-center md:text-left flex-1 relative z-10">
              <h4 className="font-bold text-white text-3xl mb-2">{featuredReward.name}</h4>
              <p className="text-base text-white/50 mb-4 max-w-md mx-auto md:mx-0">{featuredReward.description}</p>
              <p className="text-5xl font-black text-pink-400 mb-6">${featuredReward.price}</p>
              {/* Fix: Correctly evaluate disabled state and conditional class names for featured reward button */}
              {(() => {
                const isFeaturedRewardPurchased = purchasedRewards.includes(featuredReward.id);
                const canAffordFeaturedReward = balance >= featuredReward.price;
                return (
                  <button 
                    onClick={() => handlePurchaseReward(featuredReward)}
                    disabled={isFeaturedRewardPurchased || !canAffordFeaturedReward}
                    className={`px-8 py-4 rounded-xl font-bold uppercase tracking-wider text-lg transition-all
                      ${isFeaturedRewardPurchased ? 'bg-emerald-600 text-white cursor-not-allowed flex items-center justify-center gap-2' : ''}
                      ${!isFeaturedRewardPurchased && canAffordFeaturedReward ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 shadow-lg shadow-purple-500/30' : ''}
                      ${!isFeaturedRewardPurchased && !canAffordFeaturedReward ? 'bg-white/10 text-white/40 cursor-not-allowed' : ''}
                    `}
                  >
                    {isFeaturedRewardPurchased ? (
                      <>
                        <Check size={20} /> Purchased
                      </>
                    ) : (
                      canAffordFeaturedReward ? 'Unlock Premium Now' : 'Insufficient Funds'
                    )}
                  </button>
                );
              })()}
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Quantum Rewards Hub Grid */}
      <motion.div variants={item} className="mb-20 relative">
        {/* Subtle animated background for the grid area */}
        <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-500/20 via-transparent to-transparent blur-2xl animate-pulse duration-5000 alternate-reverse infinite -z-10 pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat mix-blend-overlay pointer-events-none -z-10" />

        <div className="flex items-center justify-between mb-6 relative z-10">
           <h3 className="text-xl font-bold text-white flex items-center gap-2"><Crown className="text-purple-400" /> Quantum Rewards Hub</h3>
           <span className="text-xs font-bold text-white/30 uppercase tracking-widest">
             {totalRewardsUnlocked} / {QUANTUM_REWARDS.length} Unlocked
           </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
           {otherRewards.map((reward, index) => { // Render other rewards
             const Icon = reward.icon;
             const isPurchased = purchasedRewards.includes(reward.id);
             const canAfford = balance >= reward.price;

             return (
               <motion.div 
                 key={reward.id} 
                 initial={{ opacity: 0, y: 30 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.4, delay: index * 0.08 + 0.5, type: "spring", stiffness: 100, damping: 10 }} // Staggered animation
                 whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                 className="group relative bg-[#111] border border-white/5 rounded-2xl p-6 flex flex-col items-center text-center hover:border-white/20 transition-all duration-300 overflow-hidden shadow-lg shadow-black/10"
               >
                  {/* Glowing border on hover */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 bg-gradient-to-br from-indigo-500/10 via-transparent to-cyan-500/10 blur-xl transition-opacity duration-300 pointer-events-none" />

                  <div className="w-16 h-16 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4 group-hover:scale-110 transition-transform duration-300 relative z-10">
                     {/* Inner glow effect for icons */}
                     <div className="absolute inset-0 rounded-full bg-indigo-400/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                     <Icon size={32} />
                  </div>
                  <h4 className="font-bold text-white text-lg mb-2 relative z-10">{reward.name}</h4>
                  <p className="text-xs text-white/40 mb-4 h-10 overflow-hidden relative z-10">{reward.description}</p>
                  <p className="text-3xl font-black text-cyan-400 mb-6 relative z-10">${reward.price}</p>
                  {/* Fix: Correctly evaluate disabled state and conditional class names for other reward buttons */}
                  <button 
                    onClick={() => handlePurchaseReward(reward)}
                    disabled={isPurchased || !canAfford}
                    className={`w-full py-3 rounded-xl font-bold uppercase tracking-wider transition-all relative z-10
                      ${isPurchased ? 'bg-emerald-600 text-white cursor-not-allowed flex items-center justify-center gap-2' : ''}
                      ${!isPurchased && canAfford ? 'bg-white text-black hover:bg-indigo-400 hover:text-white shadow-lg' : ''}
                      ${!isPurchased && !canAfford ? 'bg-white/10 text-white/40 cursor-not-allowed' : ''}
                    `}
                  >
                    {isPurchased ? (
                      <>
                        <Check size={18} /> Purchased
                      </>
                    ) : (
                      canAfford ? 'Unlock Now' : 'Insufficient Funds'
                    )}
                  </button>
               </motion.div>
             );
           })}
        </div>
      </motion.div>

    </motion.div>
  );
};

export default memo(ShortlinkStorePage);