
import React from 'react';
import { X } from 'lucide-react';
import { MORE_FILTERS } from '../../data/constants'; // Corrected path

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FilterModal: React.FC<FilterModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-[#111] border border-white/10 rounded-2xl w-full max-w-md p-6 relative shadow-2xl">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-white/50 hover:text-white"
        >
          <X size={24} />
        </button>
        
        <h3 className="text-xl font-bold mb-6">More Filters</h3>
        
        <div className="grid grid-cols-2 gap-3">
          {MORE_FILTERS.map((filter) => (
            <button
              key={filter.value}
              className="px-4 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all text-left group"
            >
              <span className="text-sm font-medium text-white/70 group-hover:text-white">
                {filter.label}
              </span>
            </button>
          ))}
        </div>
        
        <button 
          onClick={onClose}
          className="w-full mt-8 py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default React.memo(FilterModal);