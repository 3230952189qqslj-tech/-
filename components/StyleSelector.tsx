
import React from 'react';
import { PORTRAIT_STYLES } from '../constants.tsx';

interface StyleSelectorProps {
  selectedStyleId: string;
  onSelect: (id: string) => void;
}

const StyleSelector: React.FC<StyleSelectorProps> = ({ selectedStyleId, onSelect }) => {
  return (
    <div className="flex overflow-x-auto pb-4 gap-4 no-scrollbar -mx-1 px-1">
      {PORTRAIT_STYLES.map((style) => (
        <button
          key={style.id}
          onClick={() => onSelect(style.id)}
          className={`flex-shrink-0 w-32 group transition-all duration-300 ${
            selectedStyleId === style.id ? 'scale-105' : 'opacity-80'
          }`}
        >
          <div className={`relative rounded-2xl overflow-hidden aspect-[3/4] mb-2 border-4 transition-all duration-300 ${
            selectedStyleId === style.id ? 'border-indigo-600 shadow-xl' : 'border-transparent shadow-sm hover:border-indigo-200'
          }`}>
            <img src={style.previewUrl} alt={style.name} className="w-full h-full object-cover" />
            <div className={`absolute inset-0 flex items-center justify-center bg-indigo-600/20 transition-opacity ${
              selectedStyleId === style.id ? 'opacity-100' : 'opacity-0'
            }`}>
               <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white drop-shadow-md" viewBox="0 0 20 20" fill="currentColor">
                 <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
               </svg>
            </div>
          </div>
          <span className={`block text-center text-sm font-semibold ${
            selectedStyleId === style.id ? 'text-indigo-600' : 'text-gray-600'
          }`}>{style.name}</span>
        </button>
      ))}
    </div>
  );
};

export default StyleSelector;
