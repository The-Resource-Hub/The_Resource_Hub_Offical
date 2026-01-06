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

const ProductGrid: React.FC<ProductGridProps> = ({ products, onViewDetails, isLoading = false }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <ProductSkeleton key={`skeleton-${index}`} />
        ))}
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