import React from "react";
import { Podcast } from "../types";

export default function Hero({ podcast }: { podcast: Podcast }): JSX.Element {
  return (
    <section className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-6 mb-6">
      <div className="flex gap-6 items-center">
        <img src={podcast.coverImage} alt="cover" className="w-36 h-36 rounded-lg object-cover shadow" />
        <div>
          <h2 className="text-2xl font-bold">{podcast.title}</h2>
          <p className="text-sm text-gray-600">by {podcast.author} • {podcast.episodeCount} episodes</p>
          <p className="mt-3 text-gray-700">{podcast.description}</p>

          <div className="mt-4 flex gap-3">
            <button className="px-4 py-2 bg-primary text-white rounded-md">Play latest</button>
            <button className="px-4 py-2 border rounded-md">Subscribe</button>
          </div>
        </div>
      </div>
    </section>
  );
}
