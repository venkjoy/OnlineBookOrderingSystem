import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { useWishlist } from "../context/WishlistContext";
import { useToast } from "../components/Toast";
import { Rating, FALLBACK_IMG } from "../components/BookCard";
import { HeartIcon, TruckIcon, ShieldIcon, RefreshIcon, ArrowLeft } from "../components/Icons";

// ⬅ optional: paste your existing productDetails object here (title -> {author, publisher, ...})
const productDetails = {};

const DEFAULT_DETAIL = {
  author: "Various Authors", language: "English", binding: "Paperback",
  publisher: "Multiple Publishers", genre: "—", isbn: "—", edition: "Latest", pages: "—",
};

export default function ProductDetails() {
  const { state: product } = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const toast = useToast();
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState("details");
  const [pin, setPin] = useState("");
  const [pinOk, setPinOk] = useState(false);

  if (!product) {
    return (
      <div className="py-32 text-center">
        <p className="text-5xl">📚</p>
        <h1 className="mt-4 font-serif text-3xl font-bold">We couldn’t find that book</h1>
        <p className="mt-2 text-stone-500">Open it from a listing page and it will show up here.</p>
        <Link to="/" className="mt-6 inline-block rounded-full bg-green-700 px-6 py-3 font-semibold text-white">Back to home</Link>
      </div>
    );
  }

  const d = { ...DEFAULT_DETAIL, ...(productDetails[product.title] || {}) };
  const liked = isInWishlist(product.id);
  const eta = new Date(Date.now() + 5 * 864e5).toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "short" });

  const add = () => {
    for (let i = 0; i < qty; i++)
      addToCart({ id: product.id, _id: product.id, title: product.title, price: product.price, img: product.img, category: product.category, quantity: 1 });
    toast(`${qty} × “${product.title}” added to cart`);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <button onClick={() => navigate(-1)} className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-green-700"><ArrowLeft className="h-4 w-4" /> Back</button>

      <div className="grid gap-10 lg:grid-cols-[420px_1fr]">
        <div className="lg:sticky lg:top-40 lg:self-start">
          <div className="aspect-[3/4] overflow-hidden rounded-3xl bg-stone-100 shadow-2xl ring-1 ring-stone-200">
            <img src={product.img} alt={product.title} onError={(e) => (e.currentTarget.src = FALLBACK_IMG)} className="h-full w-full object-cover" />
          </div>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-green-700">{product.category}</p>
          <h1 className="mt-2 font-serif text-4xl font-bold leading-tight">{product.title}</h1>
          <p className="mt-2 text-stone-500">by <span className="font-semibold text-stone-800">{d.author}</span></p>
          <div className="mt-3"><Rating value={product.rating} count={product.reviews} /></div>

          <p className="mt-6 text-4xl font-bold text-green-800">{product.price}</p>
          <p className="mt-1 text-sm text-stone-500">Inclusive of all taxes · Cash on delivery available</p>

          <p className="mt-6 max-w-2xl leading-relaxed text-stone-600">
            {product.description || "A compelling read that will captivate you from the first page to the last."}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <div className="flex items-center rounded-full border border-stone-300 bg-white">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="h-11 w-11 text-xl hover:text-green-700">−</button>
              <span className="w-8 text-center font-semibold">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="h-11 w-11 text-xl hover:text-green-700">+</button>
            </div>
            <button onClick={add} className="rounded-full bg-green-700 px-8 py-3 font-semibold text-white shadow-lg shadow-green-700/20 transition hover:bg-green-800">Add to cart</button>
            <button onClick={() => { add(); navigate("/cart"); }} className="rounded-full bg-stone-900 px-8 py-3 font-semibold text-white transition hover:bg-stone-800">Buy now</button>
            <button onClick={() => toggleWishlist(product)} aria-label="Wishlist" className="grid h-12 w-12 place-items-center rounded-full border border-stone-300 bg-white transition hover:border-rose-400">
              <HeartIcon className={`h-5 w-5 ${liked ? "fill-rose-500 text-rose-500" : ""}`} />
            </button>
          </div>

          <div className="mt-8 rounded-2xl bg-white p-5 ring-1 ring-stone-200">
            <p className="mb-3 flex items-center gap-2 text-sm font-semibold"><TruckIcon className="h-5 w-5 text-green-700" /> Check delivery</p>
            <div className="flex gap-2">
              <input value={pin} onChange={(e) => { setPin(e.target.value.replace(/\D/g, "").slice(0, 6)); setPinOk(false); }} placeholder="Enter 6-digit pincode" className="w-56 rounded-xl border border-stone-300 px-4 py-2.5 text-sm outline-none focus:border-green-600 focus:ring-4 focus:ring-green-600/15" />
              <button onClick={() => pin.length === 6 && setPinOk(true)} className="rounded-xl bg-green-700 px-5 text-sm font-semibold text-white hover:bg-green-800">Check</button>
            </div>
            {pinOk && <p className="mt-3 text-sm text-green-700">✓ Delivery available. Get it by <b>{eta}</b></p>}
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {[[ShieldIcon, "Genuine product"], [RefreshIcon, "7-day replacement"], [TruckIcon, "Secure packaging"]].map(([I, t]) => (
              <div key={t} className="flex items-center gap-2 rounded-xl bg-green-50 px-4 py-3 text-sm font-medium text-green-900"><I className="h-5 w-5" /> {t}</div>
            ))}
          </div>

          <div className="mt-10 border-b border-stone-200">
            {[["details", "Details"], ["highlights", "Highlights"], ["seller", "Seller"]].map(([k, l]) => (
              <button key={k} onClick={() => setTab(k)} className={`mr-8 pb-3 text-sm font-semibold transition ${tab === k ? "border-b-2 border-green-700 text-green-800" : "text-stone-500 hover:text-green-700"}`}>{l}</button>
            ))}
          </div>
          <div className="py-6">
            {tab === "details" && <Table rows={[["Book name", product.title], ["Author", d.author], ["Category", product.category]]} />}
            {tab === "highlights" && <Table rows={[["Language", d.language], ["Binding", d.binding], ["Publisher", d.publisher], ["Genre", d.genre], ["ISBN", d.isbn], ["Edition", d.edition], ["Pages", d.pages]]} />}
            {tab === "seller" && <Table rows={[["Sold by", d.seller || "BookOrder Retail"], ["Returns", "7 days"], ["Shipping", "Fast, secure packaging"]]} />}
          </div>
        </div>
      </div>
    </div>
  );
}

const Table = ({ rows }) => (
  <dl className="divide-y divide-stone-200 rounded-2xl bg-white ring-1 ring-stone-200">
    {rows.map(([k, v]) => (
      <div key={k} className="flex justify-between gap-6 px-5 py-3 text-sm">
        <dt className="font-semibold text-stone-700">{k}</dt>
        <dd className="text-right text-stone-600">{v}</dd>
      </div>
    ))}
  </dl>
);