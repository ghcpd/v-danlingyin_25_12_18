import React from "react";
import { Category } from "../types";
import CategoryPill from "./CategoryPill";

export default function FilterPanel({ selected, onSelect }: { selected?: Category; onSelect: (c?: Category) => void }) {
  const cats = Object.values(Category);
  return (
    <div className="flex gap-2 flex-wrap">
      <CategoryPill onClick={() => onSelect(undefined)} active={!selected}>All</CategoryPill>
      {cats.map((c) => (
        <CategoryPill key={c} onClick={() => onSelect(c)} active={c === selected}>{c}</CategoryPill>
      ))}
    </div>
  );
}
