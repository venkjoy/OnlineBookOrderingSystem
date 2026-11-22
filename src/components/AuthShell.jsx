import hero from "../assets/hero-books.jpg";

export const inputCls =
  "w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-green-600 focus:ring-4 focus:ring-green-600/15 disabled:opacity-60";

export default function AuthShell({ title, subtitle, children, footer }) {
  return (
    <div className="mx-auto flex max-w-5xl px-4 py-12 sm:px-6">
      <div className="grid w-full overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-stone-200 md:grid-cols-2">
        <div className="relative hidden md:block">
          <img src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-green-950/90 via-green-900/50 to-green-900/30" />
          <div className="relative flex h-full flex-col justify-end p-10 text-white">
            <p className="font-serif text-3xl font-bold leading-snug">“A room without books is like a body without a soul.”</p>
            <p className="mt-3 text-sm text-green-100/80">Join BookOrder and start your reading journey.</p>
          </div>
        </div>
        <div className="p-8 sm:p-12">
          <h1 className="font-serif text-3xl font-bold">{title}</h1>
          <p className="mt-1 text-stone-500">{subtitle}</p>
          <div className="mt-8">{children}</div>
          <p className="mt-8 text-center text-sm text-stone-500">{footer}</p>
        </div>
      </div>
    </div>
  );
}