import React, { useMemo, useState } from "react";
import Hero from "../components/Hero";
import PodcastCard from "../components/PodcastCard";
import PodcastList from "../components/PodcastList";
import FilterPanel from "../components/FilterPanel";
import { podcasts } from "../data/mockPodcasts";
import { Category } from "../types";

export default function HomePage(): JSX.Element {
  const [selected, setSelected] = useState<Category | undefined>(undefined);

  const trending = useMemo(() => podcasts.slice(0, 6), []);
  const recently = useMemo(() => podcasts.slice(6, 12), []);
  const categories = Object.values(Category).slice(0, 6);

  const featured = podcasts[0];

  const filtered = selected ? podcasts.filter((p) => p.category.includes(selected)) : podcasts;

  return (
    <div>
      <Hero podcast={featured} />

      <section className="mb-6">
        <h3 className="font-semibold mb-3">Trending Now</h3>
        <PodcastList>
          {trending.map((p) => (
            <PodcastCard key={p.id} podcast={p} />
          ))}
        </PodcastList>
      </section>

      <section className="mb-6">
        <h3 className="font-semibold mb-3">Categories</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {categories.map((c) => (
            <button key={c} onClick={() => setSelected((s) => (s === c ? undefined : c))} className={`px-3 py-1 rounded-full ${selected === c ? "bg-primary text-white" : "bg-gray-100 text-gray-700"}`}>{c}</button>
          ))}
        </div>

        <div>
          <h4 className="font-medium mb-2">Recently Added</h4>
          <div className="space-y-2">
            {recently.map((p) => (
              <PodcastCard key={p.id} podcast={p} />
            ))}
          </div>
        </div>
      </section>

      <section>
        <h3 className="font-semibold mb-3">All podcasts {selected ? `(filtered: ${selected})` : ""}</h3>
        <FilterPanel selected={selected} onSelect={setSelected} />

        <div className="mt-4">
          <PodcastList>
            {filtered.map((p) => (
              <PodcastCard key={p.id} podcast={p} />
            ))}
          </PodcastList>
        </div>
      </section>
    </div>
  );
}
