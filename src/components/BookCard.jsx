import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { useWishlist } from "../context/WishlistContext";
import { useToast } from "./Toast";
import { HeartIcon, BagIcon, StarIcon } from "./Icons";

export const FALLBACK_IMG = "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=500&fit=crop";

export function Rating({ value = 5, count }) {
  return (
    <div className="flex items-center gap-1 text-amber-500">
      {[1, 2, 3, 4, 5].map((i) => (
        <StarIcon key={i} filled={i <= Math.round(value)} className="h-3.5 w-3.5" />
      ))}
      {count !== undefined && <span className="ml-1 text-xs text-stone-500">({count})</span>}
    </div>
  );
}

export default function BookCard({ book }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { wishlist, toggleWishlist, isInWishlist } = useWishlist();
  const toast = useToast();
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    setLiked(!!isInWishlist(book.id));
  }, [wishlist, book.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const badge = book.isBestseller ? "Bestseller" : book.isNew ? "New" : null;

  const handleAdd = (e) => {
    e.stopPropagation();
    addToCart({
      id: book.id,
      _id: book.id,
      title: book.title,
      price: book.price,
      img: book.img,
      category: book.category,
      quantity: 1,
    });
    toast(`“${book.title}” added to cart`);
  };

  const handleLike = async (e) => {
    e.stopPropagation();
    const ok = await toggleWishlist(book);
    if (ok) {
      setLiked((v) => !v);
      toast(liked ? "Removed from wishlist" : "Saved to wishlist");
    }
  };

  return (
    <article
      onClick={() => navigate(`/product/${book.id}`, { state: book })}
      className="group flex cursor-pointer flex-col"
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-stone-100 shadow-sm ring-1 ring-stone-200/70 transition duration-300 group-hover:-translate-y-1 group-hover:shadow-xl">
        <img
          src={book.img}
          alt={book.title}
          loading="lazy"
          onError={(e) => (e.currentTarget.src = FALLBACK_IMG)}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        {badge && (
          <span className="absolute left-3 top-3 rounded-full bg-green-700 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-white shadow">
            {badge}
          </span>
        )}
        <button
          aria-label="Toggle wishlist"
          onClick={handleLike}
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 shadow backdrop-blur transition hover:scale-110"
        >
          <HeartIcon className={`h-5 w-5 ${liked ? "fill-rose-500 text-rose-500" : "text-stone-600"}`} />
        </button>
        <button
          onClick={handleAdd}
          className="absolute inset-x-3 bottom-3 flex items-center justify-center gap-2 rounded-xl bg-white/95 py-2.5 text-sm font-semibold text-green-800 shadow-lg backdrop-blur transition duration-300 hover:bg-green-700 hover:text-white md:translate-y-3 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100"
        >
          <BagIcon className="h-4 w-4" /> Add to cart
        </button>
      </div>

      <div className="mt-3 space-y-1 px-1">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-green-700">{book.category}</p>
        <h3 className="line-clamp-2 min-h-[2.5rem] font-serif text-base font-semibold leading-snug text-stone-900">
          {book.title}
        </h3>
        <div className="flex items-center justify-between pt-1">
          <span className="text-base font-bold text-stone-900">{book.price}</span>
          <Rating value={book.rating} />
        </div>
      </div>
    </article>
  );
}