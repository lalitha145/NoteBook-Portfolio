import React from 'react';
import { GeneratedImage } from '../types';

interface GalleryProps {
  images: GeneratedImage[];
  onSelect: (image: GeneratedImage) => void;
  selectedId?: string;
}

export const Gallery: React.FC<GalleryProps> = ({ images, onSelect, selectedId }) => {
  if (images.length === 0) return null;

  return (
    <div className="mt-8 pt-4 border-t border-gray-200">
      <h3 className="font-marker text-lg text-gray-500 mb-3">Previous Generations</h3>
      
      <div className="grid grid-cols-3 gap-3">
        {images.map((img) => (
          <div 
            key={img.id}
            onClick={() => onSelect(img)}
            className={`cursor-pointer group relative aspect-square bg-gray-100 rounded overflow-hidden border transition-all ${
              selectedId === img.id ? 'border-highlight ring-2 ring-highlight/20' : 'border-gray-200 hover:border-gray-400'
            }`}
          >
            <img 
              src={img.url} 
              alt={img.prompt} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
          </div>
        ))}
      </div>
    </div>
  );
};