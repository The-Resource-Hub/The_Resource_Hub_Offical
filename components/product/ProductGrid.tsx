import React from 'react';
import { Product } from '../../types/index';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  onViewDetails?: (product: Product) => void;
  isLoading?: boolean;
}

const ProductSkeleton = () => (
  <div className="flex flex-col h-full bg-[#111] border border-white/5 rounded-[1.5rem] md:rounded-[2rem] overflow-hidden relative">
    {/* Image Skeleton */}
    <div className="aspect-square w-full bg-white/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
    </div>
    
    {/* Content Skeleton */}
    <div className="p-4 md:p-6 flex flex-col flex-grow gap-4">
      <div className="flex justify-between">
        <div className="h-3 w-1/3 bg-white/10 rounded animate-pulse" />
        <div className="h-3 w-10 bg-white/10 rounded animate-pulse" />
      </div>
      
      <div className="h-5 w-3/4 bg-white/10 rounded animate-pulse" />
      
      <div className="mt-auto flex justify-between items-center">
        <div className="flex flex-col gap-1">
          <div className="h-2 w-8 bg-white/5 rounded animate-pulse" />
          <div className="h-6 w-16 bg-white/10 rounded animate-pulse" />
        </div>
        <div className="h-3 w-10 bg-white/5 rounded animate-pulse" />
      </div>
    </div>
  </div>
);

import { Package } from 'lucide-react';
// ... existing imports

const ProductGrid: React.FC<ProductGridProps> = ({ products, onViewDetails, isLoading = false }) => {
  if (isLoading) {
    // ... skeleton code
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 px-4 bg-white/[0.01] border border-dashed border-white/10 rounded-[2.5rem] text-center">
        <Package size={64} className="text-white/10 mb-6" />
        <h3 className="text-2xl font-black text-white/50 uppercase tracking-tighter mb-2">No product available in this time</h3>
        <p className="text-sm text-white/30 max-w-xs uppercase font-bold tracking-widest">Our digital vault is currently empty. Check back later for new arrivals.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {products.map((product) => (
        <ProductCard 
          key={product.id} 
          product={product} 
          onViewDetails={onViewDetails} 
        />
      ))}
    </div>
  );
};

export default React.memo(ProductGrid);