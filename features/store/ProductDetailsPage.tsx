
import React, { useState, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Share2, Heart, ShoppingCart, ShieldCheck, ChevronLeft, ChevronRight, Star, Plus } from 'lucide-react';
import { Product } from '../../types/index';

interface ProductDetailsPageProps {
  product: Product;
  onBack: () => void;
}

const ProductDetailsPage: React.FC<ProductDetailsPageProps> = ({ product, onBack }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentImgIdx, setCurrentImgIdx] = useState(0);

  // Mock multi-images
  const images = [
    product.image,
    `https://picsum.photos/seed/${product.id}1/1200/800`,
    `https://picsum.photos/seed/${product.id}2/1200/800`,
  ];

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="fixed inset-0 z-[100] bg-[#050505] text-white flex flex-col overflow-y-auto no-scrollbar"
    >
      {/* HEADER BAR */}
      <header className="fixed top-0 left-0 w-full z-[110] px-6 py-5 flex items-center justify-between backdrop-blur-xl bg-black/20 border-b border-white/5">
        <button 
          onClick={onBack}
          className="p-3 rounded-2xl bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/10 transition-all active:scale-90"
        >
          <ArrowLeft size={22} />
        </button>
        
        <div className="flex items-center gap-3">
          <button className="p-3 rounded-2xl bg-white/5 border border-white/10 text-white/80 hover:text-white transition-all active:scale-90">
            <Share2 size={20} />
          </button>
          <motion.button 
            onClick={handleToggleFavorite}
            animate={isFavorite ? { scale: [1, 1.3, 1] } : {}}
            className={`p-3 rounded-2xl border transition-all active:scale-90 ${
              isFavorite 
                ? 'bg-rose-500/10 border-rose-500/30 text-rose-500' 
                : 'bg-white/5 border-white/10 text-white/80'
            }`}
          >
            <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
          </motion.button>
        </div>
      </header>

      {/* HERO SECTION: Image Slider */}
      <section className="relative w-full aspect-[4/3] md:aspect-[21/9] bg-black mt-0">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImgIdx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            src={images[currentImgIdx]}
            className="w-full h-full object-cover"
            alt={product.name}
          />
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent pointer-events-none" />

        {/* Slider Controls */}
        <div className="absolute inset-x-6 bottom-12 flex items-center justify-between">
          <button 
            onClick={() => setCurrentImgIdx(p => (p - 1 + images.length) % images.length)}
            className="p-4 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white/60 hover:text-white transition-all"
          >
            <ChevronLeft size={24} />
          </button>
          
          <div className="flex gap-2">
            {images.map((_, i) => (
              <div key={i} className={`h-1 rounded-full transition-all duration-500 ${i === currentImgIdx ? 'w-8 bg-cyan-400' : 'w-2 bg-white/20'}`} />
            ))}
          </div>

          <button 
            onClick={() => setCurrentImgIdx(p => (p + 1) % images.length)}
            className="p-4 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white/60 hover:text-white transition-all"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </section>

      {/* CONTENT BODY */}
      <section className="px-6 md:px-12 py-12 max-w-5xl mx-auto w-full space-y-12">
        {/* Title & Metadata */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-[10px] font-black uppercase tracking-widest">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-white/40">
              <Star size={12} fill="#EAB308" className="text-yellow-500" />
              <span className="text-xs font-bold">{product.rating} (128 Reviews)</span>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase leading-[0.85] mb-8">
            {product.name}
          </h1>
          
          <p className="text-white/40 text-lg md:text-xl font-medium leading-relaxed max-w-3xl">
            A premium {product.category} resource engineered for top-tier production environments. 
            Optimized for performance and extreme visual fidelity.
          </p>
        </div>

        {/* Pricing & Call to Action */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white/5 border border-white/10 rounded-[2.5rem] p-8 md:p-12">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 mb-2">Investment Value</p>
            <div className="flex items-baseline gap-2">
              <span className="text-6xl font-black text-white tracking-tighter">${product.price}</span>
              <span className="text-white/30 text-sm font-bold">USD</span>
            </div>
          </div>
          
          <div className="flex flex-col gap-4">
            <button className="w-full py-5 bg-white text-black font-black uppercase tracking-[0.2em] text-[11px] rounded-2xl hover:bg-cyan-400 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-cyan-500/20 active:scale-95">
              <ShoppingCart size={18} /> Buy Now
            </button>
            <button className="w-full py-5 bg-white/5 border border-white/10 text-white font-black uppercase tracking-[0.2em] text-[11px] rounded-2xl hover:bg-white/10 transition-all flex items-center justify-center gap-3 active:scale-95">
              <Plus size={18} /> Add to Collection
            </button>
          </div>
        </div>

        {/* About Product Detailed */}
        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-px bg-white/10" />
            <h3 className="text-xl font-black uppercase tracking-widest text-white/60">About Product</h3>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-4">
               <h4 className="text-sm font-black text-cyan-400 uppercase tracking-widest">Specifications</h4>
               <ul className="space-y-3 text-white/40 text-sm">
                 <li className="flex justify-between border-b border-white/5 pb-2"><span>Resolution</span><span className="text-white">8K UHD</span></li>
                 <li className="flex justify-between border-b border-white/5 pb-2"><span>Format</span><span className="text-white">NEXUS v2</span></li>
                 <li className="flex justify-between border-b border-white/5 pb-2"><span>License</span><span className="text-white">Commercial</span></li>
               </ul>
            </div>
            
            <div className="md:col-span-2 space-y-6 text-white/50 text-base leading-relaxed">
              <p>
                Our Nexus series products represent the pinnacle of digital craftsmanship. Every {product.category} asset 
                undergoes a rigorous quality control process to ensure it meets industry standards for high-fidelity 
                visualization and real-time interaction.
              </p>
              <div className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 text-emerald-400">
                <ShieldCheck size={20} />
                <span className="text-xs font-bold uppercase tracking-widest">Authenticity Verified & Encrypted</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER PADDING */}
      <div className="h-20" />
    </motion.div>
  );
};

export default memo(ProductDetailsPage);
