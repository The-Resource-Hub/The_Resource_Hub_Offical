
import React, { useState, memo, useMemo, useEffect } from 'react';
import SearchBar from '../../components/ui/SearchBar.tsx';
import ProductGrid from '../../components/product/ProductGrid.tsx';
import { SlidersHorizontal, Zap } from 'lucide-react';
import { PRODUCTS, MAIN_FILTERS } from '../../data/constants.ts';
import FilterModal from '../../components/ui/FilterModal.tsx';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Product } from '../../types/index.ts';

interface StorePageProps {
  onMenuClick: () => void;
  onAdminTrigger?: () => void;
  onViewProduct?: (product: Product) => void;
}

const StorePage: React.FC<StorePageProps> = memo(({ onAdminTrigger, onViewProduct }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 100]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    // Faster fake load to get user into content quicker
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const filteredProducts = useMemo(() => {
    return activeFilter === 'all' 
      ? PRODUCTS 
      : PRODUCTS.filter(p => p.category.toLowerCase() === activeFilter.toLowerCase());
  }, [activeFilter]);

  return (
    <div className="pb-20 will-change-scroll">
      {/* OPTIMIZED GRAPHIC HERO */}
      <section className="relative h-[65vh] flex flex-col items-center justify-center overflow-hidden mb-12">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[#020202]" />
          {/* Performance Optimized Background: Using CSS gradient instead of multiple div blur layers */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.1)_0%,rgba(0,0,0,0)_70%)]" />
          <div className="absolute top-[10%] right-[10%] w-[30vw] h-[30vw] bg-purple-600/5 blur-[120px] rounded-full" />
          <div className="absolute inset-0 opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat pointer-events-none" />
        </motion.div>

        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-[9px] font-black uppercase tracking-[0.3em] mb-8 backdrop-blur-md"
          >
            <Zap size={12} className="animate-pulse" /> Digital Resource Nexus
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-6 leading-[0.9] select-none"
          >
            NEXT <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-purple-500">GENESIS</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-white/40 text-sm md:text-base max-w-lg mx-auto mb-10"
          >
            A high-performance storefront for premium digital assets. 
            Curated by <span className="text-white/60 font-bold">Preet Bopche</span>.
          </motion.p>

          <div className="w-full max-w-lg mx-auto">
            <SearchBar onSecretCode={onAdminTrigger} />
          </div>
        </div>
      </section>

      {/* STICKY FILTER BAR */}
      <div className="sticky top-20 z-30 bg-[#020202]/80 backdrop-blur-xl py-4 mb-10 border-b border-white/5 -mx-4 px-4">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar max-w-7xl mx-auto">
          {MAIN_FILTERS.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              className={`whitespace-nowrap px-5 py-2.5 rounded-xl border transition-all text-[10px] font-black uppercase tracking-widest ${
                activeFilter === filter.value 
                  ? 'bg-white text-black border-white' 
                  : 'bg-white/5 text-white/40 border-white/5 hover:border-white/20'
              }`}
            >
              {filter.label}
            </button>
          ))}
          <div className="h-6 w-px bg-white/10 mx-2" />
          <button 
            onClick={() => setIsFilterModalOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/5 bg-white/5 text-white/40 hover:text-white transition-all text-[10px] font-black uppercase tracking-widest"
          >
            <SlidersHorizontal size={12} />
            Filters
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <ProductGrid 
          products={filteredProducts} 
          onViewDetails={onViewProduct}
          isLoading={isLoading}
        />
      </div>

      {isFilterModalOpen && (
        <FilterModal 
          isOpen={isFilterModalOpen} 
          onClose={() => setIsFilterModalOpen(false)} 
        />
      )}
    </div>
  );
});

export default StorePage;
