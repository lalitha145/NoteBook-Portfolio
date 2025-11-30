import React from 'react';
import { AspectRatio, WALLPAPER_STYLES } from '../types';

interface ControlsProps {
  prompt: string;
  setPrompt: (val: string) => void;
  style: string;
  setStyle: (val: string) => void;
  aspectRatio: AspectRatio;
  setAspectRatio: (val: AspectRatio) => void;
}

export const Controls: React.FC<ControlsProps> = ({
  prompt,
  setPrompt,
  style,
  setStyle,
  aspectRatio,
  setAspectRatio
}) => {
  
  const ratios = [
    { label: "Portrait", value: AspectRatio.Portrait, ratio: "9:16" },
    { label: "Landscape", value: AspectRatio.Landscape, ratio: "16:9" },
    { label: "Square", value: AspectRatio.Square, ratio: "1:1" },
  ];

  return (
    <div className="space-y-6">
      
      <div className="space-y-2">
        <label className="block font-marker text-lg text-ink">
          Vision Description
        </label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., A futuristic city in the clouds..."
          className="w-full bg-paper-dark/50 border border-gray-200 rounded p-3 font-sans text-sm text-ink focus:ring-1 focus:ring-highlight focus:border-highlight outline-none resize-none shadow-inner"
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <label className="block font-marker text-lg text-ink">Artistic Style</label>
        <div className="flex flex-wrap gap-2">
          {WALLPAPER_STYLES.slice(0, 6).map((s) => (
            <button
              key={s}
              onClick={() => setStyle(s)}
              className={`px-3 py-1 rounded-full text-xs font-sans border transition-all ${
                style === s 
                  ? 'border-ink bg-ink text-white' 
                  : 'border-gray-300 text-gray-600 hover:border-gray-500'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label className="block font-marker text-lg text-ink">Format</label>
        <div className="flex gap-4">
          {ratios.map((r) => (
            <button
              key={r.value}
              onClick={() => setAspectRatio(r.value)}
              className={`flex items-center gap-2 px-3 py-2 rounded border transition-all ${
                aspectRatio === r.value 
                  ? 'border-highlight bg-highlight/10 text-ink' 
                  : 'border-gray-200 hover:border-gray-300 text-gray-500'
              }`}
            >
              <span className="text-xs font-mono font-bold">{r.ratio}</span>
              <span className="text-xs font-sans">{r.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};