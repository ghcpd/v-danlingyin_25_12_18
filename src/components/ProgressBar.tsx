import React from 'react';
import { ProgressBarProps } from '../types/index';
import { formatCurrentTime } from '../utils/formatDuration';

export const ProgressBar: React.FC<ProgressBarProps> = ({ currentTime, duration, onSeek }) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const newTime = percent * duration;
    onSeek?.(newTime);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight') {
      onSeek?.(Math.min(currentTime + 5, duration));
    } else if (e.key === 'ArrowLeft') {
      onSeek?.(Math.max(currentTime - 5, 0));
    }
  };

  const percent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="w-full space-y-2">
      <div
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        role="slider"
        aria-label="Seek"
        aria-valuenow={Math.floor(currentTime)}
        aria-valuemin={0}
        aria-valuemax={Math.floor(duration)}
        tabIndex={0}
        className="group h-1 bg-gray-300 rounded-full cursor-pointer overflow-hidden hover:h-2 transition-all"
      >
        <div
          className="h-full bg-primary-600 rounded-full transition-all group-hover:bg-primary-500"
          style={{ width: `${percent}%` }}
        />
      </div>
      <div className="flex justify-between text-xs text-gray-600">
        <span>{formatCurrentTime(currentTime)}</span>
        <span>{formatCurrentTime(duration)}</span>
      </div>
    </div>
  );
};
