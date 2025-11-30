import React from 'react';
import { GeneratedImage, AspectRatio } from '../types';
import { Button } from './Button';

interface ImagePreviewProps {
  image: GeneratedImage;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({ image }) => {
  
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = image.url;
    link.download = `Sketch-${image.id}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getAspectRatioClass = (ratio: AspectRatio) => {
    switch(ratio) {
      case AspectRatio.Portrait: return 'aspect-[9/16] max-h-[300px]';
      case AspectRatio.Landscape: return 'aspect-video w-full';
      case AspectRatio.Square: return 'aspect-square w-full max-h-[300px]';
      default: return 'aspect-square w-full';
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 w-full bg-white p-4 shadow-sm border border-gray-100 rounded my-6 relative">
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-4 bg-yellow-200/50 -rotate-1"></div>

      <div className={`relative ${getAspectRatioClass(image.aspectRatio)} bg-gray-50 rounded overflow-hidden shadow-inner`}>
        <img 
            src={image.url} 
            alt={image.prompt}
            className="w-full h-full object-contain"
        />
      </div>
      
      <div className="flex justify-between items-center w-full pt-2">
         <div className="text-left">
             <p className="font-sans text-xs font-bold text-ink truncate max-w-[150px]">{image.prompt}</p>
             <p className="font-sans text-xs text-gray-400">{image.style}</p>
         </div>
         <Button onClick={handleDownload} variant="secondary" className="text-xs px-3 py-1">
           Save
         </Button>
      </div>
    </div>
  );
};