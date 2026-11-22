import { Link } from "react-router-dom";
import BookRow from "../components/BookRow";
import { CATS } from "../components/Layout";
import { ArrowRight, TruckIcon, ShieldIcon, RefreshIcon, BookIcon } from "../components/Icons";

  // Book data
  const featuredBooks = [
    {
      id: 1,
      title: "To Kill a Mockingbird",
      category: "Fiction",
      price: "₹400.00",
      img: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=500&fit=crop",
      rating: 5,
      reviews: 85,
      isNew: true,
      description: "A powerful story of justice and moral growth in the Deep South.",
    },
    {
      id: 2,
      title: "Atomic Habits",
      category: "Self Improvement",
      price: "₹399.00",
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
      rating: 5,
      reviews: 220,
      isNew: true,
      description: "A proven system to build good habits and break bad ones by James Clear.",
    },
    {
      id: 3,
      title: "Rich Dad Poor Dad",
      category: "Finance",
      price: "₹499.00",
      img: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=500&fit=crop",
      rating: 5,
      reviews: 310,
      isNew: false,
      description: "Robert Kiyosaki's financial guide on creating wealth and financial independence.",
    },
    {
      id: 4,
      title: "Ikigai",
      category: "Motivation",
      price: "₹299.00",
      img: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=500&fit=crop",
      rating: 5,
      reviews: 190,
      isNew: false,
      description: "The Japanese secret to a long and happy life, beautifully written and inspiring.",
    },
    {
      id: 5,
      title: "The Psychology of Money",
      category: "Finance",
      price: "₹350.00",
      img: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&h=500&fit=crop",
      rating: 5,
      reviews: 180,
      isNew: true,
      description: "Timeless lessons on wealth, greed, and happiness.",
    },
    {
      id: 6,
      title: "Think Like a Monk",
      category: "Self Help",
      price: "₹420.00",
      img: "https://images.unsplash.com/photo-1497636577773-f1231844b336?w=400&h=500&fit=crop",
      rating: 5,
      reviews: 250,
      isNew: true,
      description: "Jay Shetty's practical wisdom for a peaceful, meaningful life.",
    },
  ];

  const newSellers = [
    {
      id: 13,
      title: "The Midnight Library",
      category: "Fiction",
      price: "₹360.00",
      img: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=500&fit=crop",
      rating: 5,
      reviews: 150,
      isNew: true,
      description: "A novel about regret, hope and second chances.",
    },
    {
      id: 14,
      title: "Project Hail Mary",
      category: "Sci-Fi",
      price: "₹520.00",
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
      rating: 5,
      reviews: 210,
      isNew: true,
      description: "A lone astronaut must save the earth from disaster.",
    },
    {
      id: 15,
      title: "The Four Winds",
      category: "Historical Fiction",
      price: "₹380.00",
      img: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=500&fit=crop",
      rating: 4,
      reviews: 180,
      isNew: true,
      description: "A story of love, heroism and hope during the Great Depression.",
    },
    {
      id: 16,
      title: "Klara and the Sun",
      category: "Sci-Fi",
      price: "₹420.00",
      img: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=500&fit=crop",
      rating: 4,
      reviews: 130,
      isNew: true,
      description: "A touching tale of an AI friend and human relationships.",
    },
  ];

  const relatedProducts = [
    {
      id: 25,
      title: "Deep Work",
      category: "Productivity",
      price: "₹450.00",
      img: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=500&fit=crop",
      rating: 5,
      reviews: 210,
    },
    {
      id: 26,
      title: "Can't Hurt Me",
      category: "Motivation",
      price: "₹499.00",
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
      rating: 5,
      reviews: 400,
    },
    {
      id: 27,
      title: "Start With Why",
      category: "Leadership",
      price: "₹350.00",
      img: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=500&fit=crop",
      rating: 5,
      reviews: 150,
    },
    {
      id: 28,
      title: "The Subtle Art of Not Giving a F*ck",
      category: "Self Help",
      price: "₹450.00",
      img: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=500&fit=crop",
      rating: 5,
      reviews: 480,
    }
  ];

 const PERKS = [
  [TruckIcon, "Fast delivery", "Straight to your doorstep"],
  [ShieldIcon, "Secure payments", "Cards, UPI & cash on delivery"],
  [RefreshIcon, "Easy returns", "7-day replacement policy"],
  [BookIcon, "Genuine books", "Directly from publishers"],
];

export default function Homepage() {
  const covers = featuredBooks.slice(0, 3);
  const pos = [
    "left-0 top-16 -rotate-6 w-48 z-10",
    "left-1/2 -translate-x-1/2 top-0 w-56 z-20",
    "right-0 top-20 rotate-6 w-48 z-10",
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-950 via-green-900 to-green-800 text-white">
        <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-green-500/20 blur-3xl" />
        <div className="absolute -bottom-20 right-0 h-96 w-96 rounded-full bg-amber-400/10 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-green-200 ring-1 ring-white/20">
              ✨ New season · fresh arrivals
            </span>
            <h1 className="mt-6 font-serif text-4xl font-bold leading-[1.1] sm:text-6xl">
              Find the book that starts your <span className="text-amber-300">next chapter.</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg text-green-100/80">
              Bestsellers, academic guides and government-exam prep, all in one place and delivered to your door.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/best-sellers" className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-semibold text-green-900 shadow-lg transition hover:-translate-y-0.5 hover:bg-amber-50">
                Shop bestsellers <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/new-arrivals" className="rounded-full border border-white/30 px-7 py-3.5 font-semibold transition hover:bg-white/10">
                New arrivals
              </Link>
            </div>
          </div>

          <div className="relative mx-auto hidden h-[440px] w-full max-w-md lg:block">
            {covers.map((b, i) => (
              <Link key={b.id} to={`/product/${b.id}`} state={b} className={`absolute aspect-[3/4] overflow-hidden rounded-2xl shadow-2xl ring-4 ring-white/10 transition duration-500 hover:z-30 hover:scale-105 ${pos[i]}`}>
                <img src={b.img} alt={b.title} className="h-full w-full object-cover" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Perks */}
      <section className="border-b border-stone-200 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-8 sm:px-6 lg:grid-cols-4">
          {PERKS.map(([Icon, t, d]) => (
            <div key={t} className="flex items-center gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-green-50 text-green-700"><Icon className="h-5 w-5" /></span>
              <div>
                <p className="text-sm font-semibold">{t}</p>
                <p className="text-xs text-stone-500">{d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Category chips */}
      <section className="mx-auto max-w-7xl px-4 pt-14 sm:px-6">
        <h2 className="font-serif text-2xl font-bold sm:text-3xl">Browse by category</h2>
        <div className="mt-3 h-1 w-12 rounded-full bg-green-600" />
        <div className="no-scrollbar mt-6 flex gap-3 overflow-x-auto pb-2">
          {CATS.map(([l, k, e]) => (
            <Link key={k} to={`/explore-categories/${k}`} className="flex shrink-0 items-center gap-2 rounded-full border border-stone-200 bg-white px-5 py-3 text-sm font-semibold shadow-sm transition hover:-translate-y-0.5 hover:border-green-600 hover:text-green-700">
              <span className="text-lg">{e}</span> {l}
            </Link>
          ))}
        </div>
      </section>

      <BookRow title="Best Sellers" subtitle="What everyone is reading right now" books={featuredBooks} to="/best-sellers" />
      <BookRow title="New Arrivals" subtitle="Fresh on our shelves" books={newSellers} to="/new-arrivals" />

      {/* Govt exam banner */}
      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-stone-900 px-8 py-12 text-white sm:px-14">
          <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-green-500/20 blur-3xl" />
          <div className="relative max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-300">Exam season</p>
            <h2 className="mt-3 font-serif text-3xl font-bold sm:text-4xl">Ace SSC, UPSC, Banking & more</h2>
            <p className="mt-3 text-stone-300">Curated guides, practice sets and previous-year papers for every major government exam.</p>
            <Link to="/govt-exams" className="mt-6 inline-flex items-center gap-2 rounded-full bg-green-600 px-6 py-3 font-semibold transition hover:bg-green-500">
              Explore exam books <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <BookRow title="You may also like" books={relatedProducts} />
    </>
  );
}