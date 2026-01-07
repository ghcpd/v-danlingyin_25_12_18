import { Volume2, VolumeX } from 'lucide-react';

interface VolumeControlProps {
  volume: number;
  onVolumeChange: (volume: number) => void;
}

const VolumeControl = ({ volume, onVolumeChange }: VolumeControlProps) => {
  const handleVolumeClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    onVolumeChange(percentage);
  };

  return (
    <div className="flex items-center space-x-2">
      <button 
        onClick={() => onVolumeChange(volume > 0 ? 0 : 1)}
        className="p-1 hover:bg-gray-100 rounded"
        aria-label={volume > 0 ? 'Mute' : 'Unmute'}
      >
        {volume > 0 ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
      </button>
      <div 
        className="w-20 h-1 bg-gray-200 rounded cursor-pointer"
        onClick={handleVolumeClick}
      >
        <div 
          className="h-full bg-primary-500 rounded"
          style={{ width: `${volume * 100}%` }}
        />
      </div>
    </div>
  );
};

export default VolumeControl;