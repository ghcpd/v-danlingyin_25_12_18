import React from 'react';

interface VolumeControlProps {
  volume: number;
  onChange: (value: number) => void;
}

export const VolumeControl: React.FC<VolumeControlProps> = ({ volume, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(parseFloat(e.target.value));
  };

  return (
    <input
      type="range"
      min={0}
      max={1}
      step={0.01}
      value={volume}
      aria-label="Volume"
      onChange={handleChange}
      className="w-24"
    />
  );
};
