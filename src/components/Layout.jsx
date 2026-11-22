
import { useEffect, useRef, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import {
  SearchIcon,
  HeartIcon,
  BagIcon,
  UserIcon,
  MenuIcon,
  CloseIcon,
  ChevronIcon,
  ArrowRight,
  BookIcon,
} from "./Icons";

export const GOVT = [
  ["SSC Guides", "ssc", "Staff Selection Commission"],
  ["Banking", "banking", "IBPS, SBI, RBI"],
  ["UPSC", "upsc", "Civil Services"],
  ["Railway", "railway", "RRB, RRC"],
  ["Defence", "defense", "NDA, CDS, AFCAT"],
];

export const CATS = [
  ["Fiction", "fiction", "📖"],
  ["Non-Fiction", "nonfiction", "🔬"],
  ["Romance", "romance", "💕"],
  ["Sci-Fi", "scifi", "🚀"],
  ["Self-Help", "selfhelp", "🧠"],
  ["Business", "business", "📈"],
  ["History", "history", "🏛️"],
  ["Education", "education", "🎓"],
];

function useOutside(ref, callback) {
  useEffect(() => {
    const handleClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [ref, callback]);
}

const navLink =
  "text-sm font-medium text-stone-700 transition hover:text-green-700";

function Dropdown({ label, children, width = "w-72" }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const closeDropdown = () => setOpen(false);

  useOutside(ref, closeDropdown);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((previous) => !previous)}
        className={`${navLink} flex items-center gap-1`}
      >
        {label}
        <ChevronIcon
          className={`h-4 w-4 transition ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div
          onClick={closeDropdown}
          className={`absolute left-1/2 top-full z-50 mt-4 ${width} -translate-x-1/2 rounded-2xl bg-white p-2 shadow-2xl ring-1 ring-stone-200`}
        >
          {children}
        </div>
      )}
    </div>
  );
}

function Header() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { getCartItemsCount } = useCart();

  const [user, setUser] = useState(null);
  const [q, setQ] = useState("");
  const [mobile, setMobile] = useState(false);
  const [acct, setAcct] = useState(false);

  const acctRef = useRef(null);

  const closeAccount = () => setAcct(false);

  useOutside(acctRef, closeAccount);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const count = getCartItemsCount();

  const submit = (event) => {
    event.preventDefault();

    navigate(
      q.trim()
        ? `/best-sellers?q=${encodeURIComponent(q.trim())}`
        : "/best-sellers"
    );

    setMobile(false);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  const SearchBox = (
    <form onSubmit={submit} className="relative w-full">
      <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-400" />

      <input
        value={q}
        onChange={(event) => setQ(event.target.value)}
        placeholder="Search books, authors, categories…"
        className="w-full rounded-full border border-stone-200 bg-stone-100/70 py-2.5 pl-12 pr-4 text-sm outline-none transition focus:border-green-600 focus:bg-white focus:ring-4 focus:ring-green-600/15"
      />
    </form>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200/80 bg-white/85 backdrop-blur-lg">
      <div className="bg-green-900 py-1.5 text-center text-xs font-medium tracking-wide text-green-50">
        📚 Cash on delivery available · 7-day easy returns
      </div>

      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6">
        <button
          className="lg:hidden"
          aria-label="Menu"
          onClick={() => setMobile((previous) => !previous)}
        >
          {mobile ? (
            <CloseIcon className="h-6 w-6" />
          ) : (
            <MenuIcon className="h-6 w-6" />
          )}
        </button>

        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-green-700 text-white">
            <BookIcon className="h-5 w-5" />
          </span>

          <span className="font-serif text-2xl font-bold text-stone-900">
            Book<span className="text-green-700">Order</span>
          </span>
        </Link>

        <div className="mx-6 hidden max-w-xl flex-1 md:block">
          {SearchBox}
        </div>

        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          <Link
            to="/profile/wishlist"
            className="grid h-10 w-10 place-items-center rounded-full text-stone-700 transition hover:bg-stone-100 hover:text-green-700"
            aria-label="Wishlist"
          >
            <HeartIcon className="h-5 w-5" />
          </Link>

          <Link
            to="/cart"
            className="relative grid h-10 w-10 place-items-center rounded-full text-stone-700 transition hover:bg-stone-100 hover:text-green-700"
            aria-label="Cart"
          >
            <BagIcon className="h-5 w-5" />

            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-green-600 px-1 text-[11px] font-bold text-white ring-2 ring-white">
                {count}
              </span>
            )}
          </Link>

          <div ref={acctRef} className="relative">
            <button
              onClick={() => setAcct((previous) => !previous)}
              className="flex h-10 items-center gap-2 rounded-full px-2 transition hover:bg-stone-100"
              aria-label="Account"
            >
              {user ? (
                <span className="grid h-8 w-8 place-items-center rounded-full bg-green-700 text-sm font-bold text-white">
                  {(user.first_name || "U").charAt(0).toUpperCase()}
                </span>
              ) : (
                <UserIcon className="h-5 w-5" />
              )}

              <span className="hidden text-sm font-medium sm:block">
                {user ? user.first_name : "Sign in"}
              </span>
            </button>

            {acct && (
              <div className="absolute right-0 top-full mt-3 w-64 overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-stone-200">
                {user ? (
                  <>
                    <div className="bg-green-800 p-4 text-white">
                      <p className="font-semibold">
                        {user.first_name} {user.last_name}
                      </p>

                      <p className="truncate text-xs text-green-100">
                        {user.email}
                      </p>
                    </div>

                    <div className="p-2 text-sm">
                      {[
                        ["My profile", "/profile"],
                        ["My orders", "/profile/orders"],
                        ["Wishlist", "/profile/wishlist"],
                      ].map(([label, path]) => (
                        <Link
                          key={path}
                          to={path}
                          className="block rounded-lg px-3 py-2.5 hover:bg-green-50"
                        >
                          {label}
                        </Link>
                      ))}

                      <button
                        onClick={logout}
                        className="mt-1 block w-full rounded-lg px-3 py-2.5 text-left font-medium text-red-600 hover:bg-red-50"
                      >
                        Log out
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="space-y-2 p-4">
                    <p className="font-serif text-lg font-bold">
                      Welcome 👋
                    </p>

                    <Link
                      to="/login"
                      className="block rounded-xl bg-green-700 py-2.5 text-center text-sm font-semibold text-white hover:bg-green-800"
                    >
                      Sign in
                    </Link>

                    <Link
                      to="/signup"
                      className="block rounded-xl border border-green-700 py-2.5 text-center text-sm font-semibold text-green-700 hover:bg-green-50"
                    >
                      Create account
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <nav className="hidden border-t border-stone-200/70 lg:block">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-10 px-6 py-3">
          <Link to="/" className={navLink}>
            Home
          </Link>

          <Link to="/new-arrivals" className={navLink}>
            New Arrivals
          </Link>

          <Link to="/best-sellers" className={navLink}>
            Bestsellers
          </Link>

          <Dropdown label="Govt Exam Books">
            {GOVT.map(([label, key, description]) => (
              <Link
                key={key}
                to={`/govt-exams/${key}`}
                className="block rounded-xl px-4 py-2.5 hover:bg-green-50"
              >
                <p className="text-sm font-semibold">{label}</p>
                <p className="text-xs text-stone-500">{description}</p>
              </Link>
            ))}

            <Link
              to="/govt-exams"
              className="mt-1 flex items-center justify-center gap-1 border-t border-stone-100 py-2.5 text-sm font-semibold text-green-700"
            >
              View all exams
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Dropdown>

          <Dropdown label="Explore Categories" width="w-[26rem]">
            <div className="grid grid-cols-2">
              {CATS.map(([label, key, emoji]) => (
                <Link
                  key={key}
                  to={`/explore-categories/${key}`}
                  className="flex items-center gap-3 rounded-xl px-4 py-2.5 hover:bg-green-50"
                >
                  <span className="text-lg">{emoji}</span>
                  <span className="text-sm font-semibold">{label}</span>
                </Link>
              ))}
            </div>

            <Link
              to="/explore-categories"
              className="mt-1 flex items-center justify-center gap-1 border-t border-stone-100 py-2.5 text-sm font-semibold text-green-700"
            >
              View all categories
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Dropdown>
        </div>
      </nav>

      {mobile && (
        <div className="max-h-[75vh] space-y-5 overflow-y-auto border-t border-stone-200 bg-white p-4 lg:hidden">
          <div className="md:hidden">{SearchBox}</div>

          <div className="grid grid-cols-3 gap-2 text-center text-sm font-medium">
            {[
              ["Home", "/"],
              ["New", "/new-arrivals"],
              ["Bestsellers", "/best-sellers"],
            ].map(([label, path]) => (
              <Link
                key={path}
                to={path}
                className="rounded-xl bg-stone-100 py-2.5"
              >
                {label}
              </Link>
            ))}
          </div>

          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-stone-400">
              Categories
            </p>

            <div className="flex flex-wrap gap-2">
              {CATS.map(([label, key, emoji]) => (
                <Link
                  key={key}
                  to={`/explore-categories/${key}`}
                  className="rounded-full border border-stone-200 px-3 py-1.5 text-sm"
                >
                  {emoji} {label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-stone-400">
              Govt exams
            </p>

            <div className="flex flex-wrap gap-2">
              {GOVT.map(([label, key]) => (
                <Link
                  key={key}
                  to={`/govt-exams/${key}`}
                  className="rounded-full border border-stone-200 px-3 py-1.5 text-sm"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="mt-20 bg-stone-950 text-stone-400">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <p className="font-serif text-2xl font-bold text-white">
            Book<span className="text-green-500">Order</span>
          </p>

          <p className="mt-4 text-sm leading-relaxed">
            Your one-stop platform for ordering academic and general books
            online. We connect students, colleges and publishers to make book
            ordering simple and fast.
          </p>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
            Shop
          </h4>

          <ul className="space-y-2 text-sm">
            {[
              ["New Arrivals", "/new-arrivals"],
              ["Bestsellers", "/best-sellers"],
              ["Govt Exam Books", "/govt-exams"],
              ["All Categories", "/explore-categories"],
            ].map(([label, path]) => (
              <li key={path}>
                <Link to={path} className="transition hover:text-white">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
            Account
          </h4>

          <ul className="space-y-2 text-sm">
            {[
              ["My Profile", "/profile"],
              ["My Orders", "/profile/orders"],
              ["Wishlist", "/profile/wishlist"],
              ["Cart", "/cart"],
            ].map(([label, path]) => (
              <li key={path}>
                <Link to={path} className="transition hover:text-white">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
            Stay in the loop
          </h4>

          <p className="mb-3 text-sm">
            New releases and offers, straight to your inbox.
          </p>

          <form
            onSubmit={(event) => event.preventDefault()}
            className="flex overflow-hidden rounded-xl bg-stone-900 ring-1 ring-stone-800 focus-within:ring-green-600"
          >
            <input
              type="email"
              placeholder="you@email.com"
              className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm text-white outline-none placeholder:text-stone-600"
            />

            <button
              type="submit"
              className="bg-green-600 px-4 text-white transition hover:bg-green-500"
              aria-label="Subscribe"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-stone-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-xs sm:px-6 md:flex-row">
          <p>
            © {new Date().getFullYear()} BookOrder. All rights reserved. Powered
            by Muthu Soft Labs
          </p>

          <div className="flex gap-6">
            <a href="#" className="hover:text-white">
              Terms
            </a>
            <a href="#" className="hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white">
              Refund Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
