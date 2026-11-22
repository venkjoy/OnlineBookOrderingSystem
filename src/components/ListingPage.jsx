import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import BookCard from "./BookCard";
import { SearchIcon } from "./Icons";
import { toNumber } from "../utils/price";

export default function ListingPage({ eyebrow, title, subtitle, books }) {
  const [params, setParams] = useSearchParams();
  const q = params.get("q") || "";
  const [cat, setCat] = useState("All");
  const [sort, setSort] = useState("featured");

  const categories = useMemo(() => ["All", ...new Set(books.map((b) => b.category))], [books]);

  const list = useMemo(() => {
    let out = books.filter(
      (b) =>
        (cat === "All" || b.category === cat) &&
        (b.title + " " + b.category).toLowerCase().includes(q.toLowerCase())
    );
    if (sort === "low") out = [...out].sort((a, b) => toNumber(a.price) - toNumber(b.price));
    if (sort === "high") out = [...out].sort((a, b) => toNumber(b.price) - toNumber(a.price));
    if (sort === "rating") out = [...out].sort((a, b) => (b.rating || 0) - (a.rating || 0));
    return out;
  }, [books, cat, sort, q]);

  return (
    <>
      <section className="bg-gradient-to-br from-green-950 via-green-900 to-green-800 py-14 text-center text-white">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-green-300">{eyebrow}</p>
        <h1 className="mt-3 font-serif text-4xl font-bold sm:text-5xl">{title}</h1>
        <p className="mx-auto mt-3 max-w-xl px-4 text-green-100/80">{subtitle}</p>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition ${
                  cat === c ? "border-green-700 bg-green-700 text-white" : "border-stone-300 bg-white text-stone-700 hover:border-green-600"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="flex gap-3">
            <div className="relative flex-1 lg:w-64">
              <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
              <input
                value={q}
                onChange={(e) => setParams(e.target.value ? { q: e.target.value } : {}, { replace: true })}
                placeholder="Filter this list…"
                className="w-full rounded-xl border border-stone-300 bg-white py-2.5 pl-10 pr-3 text-sm outline-none focus:border-green-600 focus:ring-4 focus:ring-green-600/15"
              />
            </div>
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="rounded-xl border border-stone-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-green-600">
              <option value="featured">Featured</option>
              <option value="low">Price: low to high</option>
              <option value="high">Price: high to low</option>
              <option value="rating">Top rated</option>
            </select>
          </div>
        </div>

        <p className="mb-6 text-sm text-stone-500">{list.length} book{list.length !== 1 && "s"}{q && <> for “{q}”</>}</p>

        {list.length ? (
          <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {list.map((b) => <BookCard key={b.id} book={b} />)}
          </div>
        ) : (
          <div className="py-24 text-center">
            <p className="text-5xl">🔍</p>
            <p className="mt-4 font-serif text-2xl font-bold">No books found</p>
            <p className="mt-1 text-stone-500">Try a different keyword or category.</p>
          </div>
        )}
      </div>
    </>
  );
}