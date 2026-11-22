import { useRef } from "react";
import { Link } from "react-router-dom";
import BookCard from "./BookCard";
import { ArrowLeft, ArrowRight } from "./Icons";

export default function BookRow({ title, subtitle, books, to, linkLabel = "View all" }) {
  const ref = useRef(null);
  const scroll = (dir) =>
    ref.current?.scrollBy({ left: dir * ref.current.clientWidth * 0.8, behavior: "smooth" });

  if (!books?.length) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-stone-900 sm:text-3xl">{title}</h2>
          {subtitle && <p className="mt-1 text-sm text-stone-500">{subtitle}</p>}
          <div className="mt-3 h-1 w-12 rounded-full bg-green-600" />
        </div>
        <div className="flex items-center gap-2">
          {to && (
            <Link to={to} className="mr-2 hidden items-center gap-1 text-sm font-semibold text-green-700 hover:text-green-800 sm:flex">
              {linkLabel} <ArrowRight className="h-4 w-4" />
            </Link>
          )}
          <button aria-label="Scroll left" onClick={() => scroll(-1)} className="grid h-10 w-10 place-items-center rounded-full border border-stone-300 bg-white transition hover:border-green-600 hover:text-green-700">
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button aria-label="Scroll right" onClick={() => scroll(1)} className="grid h-10 w-10 place-items-center rounded-full border border-stone-300 bg-white transition hover:border-green-600 hover:text-green-700">
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div ref={ref} className="no-scrollbar -mx-4 flex snap-x gap-5 overflow-x-auto px-4 pb-4 sm:mx-0 sm:px-0">
        {books.map((b) => (
          <div key={b.id} className="w-44 shrink-0 snap-start sm:w-52">
            <BookCard book={b} />
          </div>
        ))}
      </div>
    </section>
  );
}