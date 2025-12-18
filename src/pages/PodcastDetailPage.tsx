import React from "react";
import { useParams } from "react-router-dom";
import { podcasts, episodes } from "../data/mockPodcasts";
import EpisodeItem from "../components/EpisodeItem";
import { useLibrary } from "../context/LibraryContext";

export default function PodcastDetailPage(): JSX.Element {
  const { id } = useParams();
  const podcast = podcasts.find((p) => p.id === id);
  const list = episodes.filter((e) => e.podcastId === id).sort((a, b) => b.episodeNumber - a.episodeNumber);
  const lib = useLibrary();

  if (!podcast) return <div className="py-20 text-center">Podcast not found</div>;

  const subscribed = lib.subscriptions.includes(podcast.id);

  return (
    <div>
      <div className="flex gap-6 items-center mb-6">
        <img src={podcast.coverImage} alt="cover" className="w-36 h-36 rounded-md object-cover" />
        <div>
          <h2 className="text-2xl font-bold">{podcast.title}</h2>
          <div className="text-sm text-gray-500">by {podcast.author}</div>

          <div className="mt-3 flex gap-2 items-center">
            <button className="px-4 py-2 bg-primary text-white rounded-md">Play latest</button>
            <button onClick={() => (subscribed ? lib.unsubscribe(podcast.id) : lib.subscribe(podcast.id))} className="px-4 py-2 border rounded-md">{subscribed ? "Unsubscribe" : "Subscribe"}</button>
          </div>

          <div className="mt-3 text-sm text-gray-600">{podcast.episodeCount} episodes • {podcast.subscribers.toLocaleString()} subscribers • {podcast.rating}★</div>
        </div>
      </div>

      <section className="mb-6">
        <h3 className="font-medium mb-2">About</h3>
        <p className="text-gray-700">{podcast.description}</p>
      </section>

      <section>
        <h3 className="font-medium mb-2">Episodes</h3>
        <div className="bg-white rounded-md shadow-sm divide-y">
          {list.map((ep) => (
            <EpisodeItem key={ep.id} episode={ep} />
          ))}
        </div>
      </section>
    </div>
  );
}
