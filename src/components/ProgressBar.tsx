import React, { useRef } from 'react';

interface ProgressBarProps {
  value: number; // 0-100
  onSeek?: (percent: number) => void;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ value, onSeek }) => {
  const barRef = useRef<HTMLDivElement>(null);

  const handleClick = (e: React.MouseEvent) => {
    if (!onSeek || !barRef.current) return;
    const rect = barRef.current.getBoundingClientRect();
    const percent = ((e.clientX - rect.left) / rect.width) * 100;
    onSeek(Math.max(0, Math.min(100, percent)));
  };

  return (
    <div
      ref={barRef}
      className="w-full h-2 bg-gray-200 rounded cursor-pointer relative"
      onClick={handleClick}
      role="slider"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(value)}
    >
      <div
        className="h-2 bg-primary rounded absolute left-0 top-0"
        style={{ width: `${value}%` }}
      />
    </div>
  );
};
