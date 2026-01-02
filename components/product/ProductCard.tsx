
import React, { useState, memo } from 'react';
import { Star, Plus, ShieldCheck, Check } from 'lucide-react';
import { Product } from '../../types/index.ts';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface ProductCardProps {
  product: Product;
  onViewDetails?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetails }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  
  // High-Performance 3D Tilt Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Faster springs for snappier feel
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <motion.div 
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onViewDetails?.(product)}
      className="group relative flex flex-col h-full bg-[#111] border border-white/5 rounded-[2rem] overflow-hidden transition-all duration-300 hover:border-cyan-500/30 cursor-pointer shadow-xl will-change-transform"
    >
      <div style={{ transform: "translateZ(30px)" }} className="relative z-10 flex flex-col h-full">
        <div className="aspect-square w-full overflow-hidden relative bg-[#0a0a0a]">
          {!isLoaded && (
            <div className="absolute inset-0 z-20 bg-white/5 animate-pulse" />
          )}
          <img 
            src={product.image} 
            alt={product.name}
            loading="lazy"
            onLoad={() => setIsLoaded(true)}
            className={`w-full h-full object-cover transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-40" />
          
          <div className="absolute top-4 left-4">
            <div className="px-2 py-0.5 rounded bg-black/60 backdrop-blur-md border border-white/5 flex items-center gap-1">
              <ShieldCheck size={10} className="text-cyan-400" />
              <span className="text-[7px] font-black text-white/60 uppercase tracking-tighter">Verified</span>
            </div>
          </div>

          <button 
            onClick={handleAddToCart}
            className={`absolute bottom-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl z-30 ${
              addedToCart ? 'bg-emerald-500 text-white' : 'bg-white text-black'
            } opacity-0 group-hover:opacity-100`}
          >
            {addedToCart ? <Check size={16} /> : <Plus size={20} />}
          </button>
        </div>

        <div className="p-5 flex flex-col flex-grow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[8px] uppercase tracking-[0.2em] text-cyan-400 font-black">{product.category}</span>
            <div className="flex items-center gap-1 text-white/40">
              <Star size={10} fill="#EAB308" className="text-yellow-500" />
              <span className="text-[9px] font-black">{product.rating}</span>
            </div>
          </div>
          <h4 className="text-sm font-bold text-white mb-4 line-clamp-1">{product.name}</h4>
          <div className="mt-auto flex items-end justify-between">
            <div className="flex flex-col">
              <span className="text-[7px] text-white/20 uppercase font-black tracking-widest">Price</span>
              <span className="text-lg font-black text-white tracking-tighter">${product.price}</span>
            </div>
            <span className="text-[7px] text-white/10 uppercase tracking-widest font-black pb-0.5">NEXUS</span>
          </div>
        </div>
      </div>

      {/* Interactive Sheen Layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </motion.div>
  );
};

export default memo(ProductCard);
