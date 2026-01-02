

import React, { memo } from 'react';
import { Wifi } from 'lucide-react';

const ThreeDCard: React.FC = () => {
  return (
    <div className="w-full h-full flex items-center justify-center p-2 group perspective-1000">
      {/* 
         CSS-Only Premium Card 
         Uses standard Tailwind classes for high performance 
      */}
      <div className="relative w-full max-w-[420px] aspect-[1.58/1] rounded-3xl overflow-hidden transition-all duration-500 transform hover:scale-[1.02] hover:rotate-1 shadow-2xl shadow-cyan-900/20 border border-white/10 bg-[#0a0a0a]">
        
        {/* --- BACKGROUND LAYERS --- */}
        
        {/* 1. Base Gradient (Dark Metal) */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#151515] to-[#050505]" />
        
        {/* 2. Color Glows (Cyan Left, Purple Right) */}
        <div className="absolute top-[-50%] left-[-20%] w-[80%] h-[150%] bg-cyan-500/10 blur-[80px] rotate-12 pointer-events-none" />
        <div className="absolute bottom-[-30%] right-[-10%] w-[70%] h-[120%] bg-purple-600/15 blur-[80px] -rotate-12 pointer-events-none" />
        
        {/* 3. Glass Sheen Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/40 pointer-events-none" />
        
        {/* 4. Noise Texture (Optional Subtle Grain) */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat mix-blend-overlay" />

        {/* --- CONTENT --- */}
        <div className="relative z-10 h-full flex flex-col justify-between p-6 md:p-8">
          
          {/* TOP ROW: Chip & Contactless */}
          <div className="flex justify-between items-start">
             {/* Realistic Gold Chip */}
            <div className="w-12 h-9 rounded bg-gradient-to-br from-yellow-200 via-yellow-500 to-yellow-700 border border-yellow-400/50 shadow-sm relative overflow-hidden">
               <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
               <div className="absolute top-1/2 left-0 w-full h-[1px] bg-black/20" />
               <div className="absolute top-0 left-1/2 h-full w-[1px] bg-black/20" />
               <div className="absolute inset-2 border border-black/10 rounded-sm" />
            </div>
            
            {/* Contactless Icon */}
            <Wifi size={28} className="text-white/80 rotate-90 drop-shadow-md" strokeWidth={2} />
          </div>

          {/* MIDDLE: Card Number */}
          <div className="mt-4">
            <div className="flex justify-between text-xl md:text-2xl font-mono text-white tracking-[0.15em] drop-shadow-lg font-medium">
              <span>4921</span>
              <span>8820</span>
              <span>1029</span>
              <span>3391</span>
            </div>
          </div>

          {/* BOTTOM ROW: Details & Logo */}
          <div className="flex justify-between items-end">
            <div className="flex gap-8">
              <div>
                <p className="text-[8px] text-white/40 uppercase tracking-widest font-bold mb-1">Card Holder</p>
                <p className="text-sm font-bold text-white tracking-wider shadow-black drop-shadow-md">ALEX DESIGNER</p>
              </div>
              <div>
                <p className="text-[8px] text-white/40 uppercase tracking-widest font-bold mb-1">Expires</p>
                <p className="text-sm font-bold text-white tracking-wider shadow-black drop-shadow-md">12/28</p>
              </div>
            </div>
            
            <div className="text-right">
              <h3 className="text-xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-purple-300 drop-shadow-sm">
                VAULT
              </h3>
            </div>
          </div>
        </div>

        {/* --- SHIMMER ANIMATION --- */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out pointer-events-none" />
      </div>
    </div>
  );
};

export default memo(ThreeDCard);