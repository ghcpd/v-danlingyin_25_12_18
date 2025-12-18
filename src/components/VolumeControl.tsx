import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { VolumeControlProps } from '../types/index';

export const VolumeControl: React.FC<VolumeControlProps> = ({ volume, onVolumeChange }) => {
  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => onVolumeChange?.(volume === 0 ? 0.5 : 0)}
        className="p-2 hover:bg-gray-200 rounded-lg transition"
        aria-label={volume === 0 ? 'Unmute' : 'Mute'}
      >
        {volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>
      <input
        type="range"
        min="0"
        max="100"
        value={volume * 100}
        onChange={(e) => onVolumeChange?.(parseFloat(e.target.value) / 100)}
        className="w-20 h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer"
        aria-label="Volume"
        style={{
          background: `linear-gradient(to right, #0ea5e9 0%, #0ea5e9 ${volume * 100}%, #d1d5db ${volume * 100}%, #d1d5db 100%)`,
        }}
      />
    </div>
  );
};
