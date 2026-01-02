

import React from 'react';
import { Star, Plus } from 'lucide-react';
// Corrected import path for Product type
import { Product } from '../types/index';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="group relative bg-[#111] border border-white/5 rounded-2xl overflow-hidden transition-all duration-500 hover:border-white/20 hover:-translate-y-1">
      <div className="aspect-square overflow-hidden relative">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <button className="absolute bottom-4 right-4 w-10 h-10 bg-white text-black rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 shadow-xl">
          <Plus size={20} />
        </button>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold">
            {product.category}
          </span>
          <div className="flex items-center gap-1 text-white/60">
            <Star size={12} fill="currentColor" className="text-yellow-500" />
            <span className="text-xs font-medium">{product.rating}</span>
          </div>
        </div>
        
        <h4 className="text-sm md:text-base font-semibold text-white/90 truncate mb-2 group-hover:text-white transition-colors">
          {product.name}
        </h4>
        
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-white">
            ${product.price}
          </span>
          <span className="text-[10px] text-white/20 uppercase tracking-tighter">
            Premium
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;