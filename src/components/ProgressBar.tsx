interface ProgressBarProps {
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
}

const ProgressBar = ({ currentTime, duration, onSeek }: ProgressBarProps) => {
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    const newTime = percentage * duration;
    onSeek(newTime);
  };

  return (
    <div 
      className="flex-1 h-1 bg-gray-200 rounded cursor-pointer"
      onClick={handleClick}
    >
      <div 
        className="h-full bg-primary-500 rounded"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ProgressBar;