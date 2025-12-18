import React from "react";
import { Episode } from "../types";
import { formatDuration } from "../utils/formatDuration";
import { formatDate } from "../utils/formatDate";
import { usePlayer } from "../context/PlayerContext";
import { useLibrary } from "../context/LibraryContext";

export default function EpisodeItem({ episode }: { episode: Episode }) {
  const player = usePlayer();
  const lib = useLibrary();

  function play() {
    player.play(episode);
    lib.addHistory(episode.id);
  }

  return (
    <div className="flex items-center justify-between p-3 border-b">
      <div className="flex items-center gap-3">
        <img src={episode.thumbnail} alt="thumb" className="w-14 h-14 rounded-md object-cover" />
        <div>
          <div className="font-medium">{episode.title}</div>
          <div className="text-sm text-gray-500">{formatDate(episode.releaseDate)} • {formatDuration(episode.duration)}</div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button aria-label={`Play ${episode.title}`} onClick={play} className="px-3 py-2 bg-primary text-white rounded-md text-sm">Play</button>
        <button aria-label="Favorite episode" onClick={() => lib.addFavorite(episode.id)} className="px-3 py-2 border rounded-md text-sm">♡</button>
      </div>
    </div>
  );
}
