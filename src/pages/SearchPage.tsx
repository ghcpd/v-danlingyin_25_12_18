import React, { useMemo, useState } from "react";
import SearchBar from "../components/SearchBar";
import FilterPanel from "../components/FilterPanel";
import PodcastList from "../components/PodcastList";
import PodcastCard from "../components/PodcastCard";
import { podcasts } from "../data/mockPodcasts";
import useDebounce from "../hooks/useDebounce";
import { Category } from "../types";
import EmptyState from "../components/EmptyState";

export default function SearchPage(): JSX.Element {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category | undefined>(undefined);
  const q = useDebounce(query, 250);

  const results = useMemo(() => {
    const base = podcasts.filter((p) => (category ? p.category.includes(category) : true));
    if (!q) return base;
    return base.filter((p) => p.title.toLowerCase().includes(q.toLowerCase()) || p.author.toLowerCase().includes(q.toLowerCase()));
  }, [q, category]);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Search</h2>
      <div className="mb-4">
        <SearchBar value={query} onChange={setQuery} />
      </div>

      <div className="mb-4">
        <FilterPanel selected={category} onSelect={setCategory} />
      </div>

      <div>
        {results.length === 0 ? <EmptyState title="No results" description="Try a different query or category." /> : (
          <PodcastList>
            {results.map((p) => <PodcastCard key={p.id} podcast={p} />)}
          </PodcastList>
        )}
      </div>
    </div>
  );
}
