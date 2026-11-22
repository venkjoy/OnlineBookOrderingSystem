import { Link, useParams } from "react-router-dom";
import BookRow from "./BookRow";
import { ArrowLeft } from "./Icons";

export default function CollectionPage({ collections, basePath, heading, subheading }) {
  const { category } = useParams();
  const active = category ? collections[category] : null;

  if (category && !active) {
    return (
      <div className="py-32 text-center">
        <p className="font-serif text-3xl font-bold">Category not found</p>
        <Link to={basePath} className="mt-4 inline-block font-semibold text-green-700">← Back</Link>
      </div>
    );
  }

  const entries = active ? [[category, active]] : Object.entries(collections);

  return (
    <>
      <section className="bg-gradient-to-br from-green-950 via-green-900 to-green-800 py-14 text-center text-white">
        <h1 className="font-serif text-4xl font-bold sm:text-5xl">{active ? active.title : heading}</h1>
        <p className="mx-auto mt-3 max-w-2xl px-4 text-green-100/80">{active ? active.description : subheading}</p>
      </section>

      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6">
        {active ? (
          <Link to={basePath} className="inline-flex items-center gap-2 text-sm font-semibold text-green-700 hover:text-green-800">
            <ArrowLeft className="h-4 w-4" /> All categories
          </Link>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {Object.entries(collections).map(([key, c]) => (
              <Link key={key} to={`${basePath}/${key}`} className="group rounded-2xl bg-white p-6 text-center shadow-sm ring-1 ring-stone-200 transition hover:-translate-y-1 hover:shadow-xl hover:ring-green-600">
                <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-green-50 text-2xl transition group-hover:bg-green-100">{c.icon}</span>
                <h3 className="mt-4 font-serif text-lg font-bold">{c.title}</h3>
                <p className="mt-1 text-xs text-stone-500">{c.description}</p>
                <p className="mt-3 text-sm font-semibold text-green-700">{c.books.length} books →</p>
              </Link>
            ))}
          </div>
        )}
      </div>

      {entries.map(([key, c]) => (
        <BookRow key={key} title={c.title} subtitle={c.description} books={c.books} to={active ? undefined : `${basePath}/${key}`} />
      ))}
    </>
  );
}