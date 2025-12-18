import React from "react";
import { usePlayer } from "../context/PlayerContext";
import { formatDuration } from "../utils/formatDuration";

export default function GlobalAudioPlayer(): JSX.Element {
  const { current, playing, toggle, currentTime, seek, volume, setVolume } = usePlayer();
  const total = (current as any)?.duration ?? 0;
  const pct = total ? Math.min(100, Math.round((currentTime / total) * 100)) : 0;

  return (
    <div className="fixed left-0 right-0 bottom-0 bg-white border-t shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center gap-4">
        <div className="flex items-center gap-3 w-80">
          <img src={current?.thumbnail ?? current?.coverImage ?? "https://picsum.photos/seed/player/80/80"} alt="now" className="w-14 h-14 rounded-md object-cover" />
          <div className="truncate">
            <div className="font-medium truncate">{current?.title ?? "Not playing"}</div>
            <div className="text-xs text-gray-500 truncate">{current ? `${current.podcastId}` : "—"}</div>
          </div>
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-4 justify-center">
            <button aria-label="Previous" className="p-2">⏮</button>
            <button aria-label={playing ? "Pause" : "Play"} onClick={toggle} className="p-2 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center">{playing ? "❚❚" : "▶"}</button>
            <button aria-label="Next" className="p-2">⏭</button>

            <div className="w-3/5">
              <div className="h-2 bg-gray-200 rounded-full w-full cursor-pointer" onClick={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                const rect = el.getBoundingClientRect();
                const x = (e as React.MouseEvent).clientX - rect.left;
                const t = (x / rect.width) * (total || 1);
                seek(t);
              }}>
                <div className="h-2 bg-primary rounded-full" style={{ width: `${pct}%` }} />
              </div>
              <div className="text-xs text-gray-500 mt-1 text-center">{formatDuration(Math.floor(currentTime))} / {formatDuration(total)}</div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <input aria-label="Volume" type="range" min={0} max={1} step={0.01} value={volume} onChange={(e) => setVolume(Number(e.target.value))} />
        </div>
      </div>
    </div>
  );
}
