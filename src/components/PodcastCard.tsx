import React from "react";
import { Podcast } from "../types";
import { Link } from "react-router-dom";

interface Props {
  podcast: Podcast;
}

function Inner({ podcast }: Props) {
  return (
    <article className="bg-white rounded-lg shadow-sm hover:shadow-md transition p-4 flex gap-4 items-center">
      <img src={podcast.coverImage} alt={`${podcast.title} cover`} className="w-20 h-20 rounded-md object-cover" />
      <div className="flex-1">
        <Link to={`/podcast/${podcast.id}`} className="font-semibold text-gray-800">{podcast.title}</Link>
        <div className="text-sm text-gray-500">{podcast.author}</div>
        <div className="mt-2 text-xs text-gray-500">{podcast.episodeCount} episodes • {podcast.subscribers.toLocaleString()} subscribers • {podcast.rating}★</div>
      </div>
    </article>
  );
}

export default React.memo(Inner) as typeof Inner;
