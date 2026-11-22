import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { toNumber, inr } from "../utils/price";
import { TrashIcon, ArrowLeft } from "../components/Icons";
import { FALLBACK_IMG } from "../components/BookCard";

const SHIPPING = 50;
const TAX = 0.18;

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart, getCartTotal, getCartItemsCount } = useCart();
  const navigate = useNavigate();

  const subtotal = getCartTotal();
  const tax = subtotal * TAX;
  const total = subtotal + SHIPPING + tax;

  const setQty = (id, q) => (q <= 0 ? removeFromCart(id) : updateQuantity(id, q));

  const checkout = () => {
    if (!localStorage.getItem("token")) return navigate("/login");
    navigate("/checkout");
  };

  if (cart.items.length === 0) {
    return (
      <div className="mx-auto max-w-md px-4 py-28 text-center">
        <p className="text-7xl">🛒</p>
        <h1 className="mt-6 font-serif text-3xl font-bold">Your cart is empty</h1>
        <p className="mt-2 text-stone-500">Looks like you haven’t added any books yet.</p>
        <Link to="/" className="mt-8 inline-block rounded-full bg-green-700 px-8 py-3.5 font-semibold text-white shadow-lg shadow-green-700/20 hover:bg-green-800">Start shopping</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h1 className="font-serif text-4xl font-bold">Shopping cart</h1>
          <p className="mt-1 text-stone-500">{getCartItemsCount()} item(s)</p>
        </div>
        <button onClick={clearCart} className="flex items-center gap-2 text-sm font-semibold text-red-600 hover:text-red-700"><TrashIcon className="h-4 w-4" /> Clear cart</button>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="space-y-4">
          {cart.items.map((item) => (
            <div key={item.id} className="flex gap-5 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-stone-200 sm:p-5">
              <img src={item.img} alt={item.title} onError={(e) => (e.currentTarget.src = FALLBACK_IMG)} className="h-32 w-24 shrink-0 rounded-xl object-cover" />
              <div className="flex flex-1 flex-col">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-green-700">{item.category}</p>
                <h3 className="font-serif text-lg font-semibold leading-snug">{item.title}</h3>
                <p className="mt-1 font-bold text-green-800">{inr(toNumber(item.price))}</p>
                <div className="mt-auto flex items-center justify-between pt-3">
                  <div className="flex items-center rounded-full border border-stone-300">
                    <button onClick={() => setQty(item.id, item.quantity - 1)} className="h-9 w-9 hover:text-green-700">−</button>
                    <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                    <button onClick={() => setQty(item.id, item.quantity + 1)} className="h-9 w-9 hover:text-green-700">+</button>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="hidden font-semibold sm:block">{inr(toNumber(item.price) * item.quantity)}</p>
                    <button onClick={() => removeFromCart(item.id)} className="text-sm font-medium text-stone-400 hover:text-red-600">Remove</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <Link to="/" className="inline-flex items-center gap-2 pt-2 text-sm font-semibold text-green-700"><ArrowLeft className="h-4 w-4" /> Continue shopping</Link>
        </div>

        <aside className="h-fit rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-200 lg:sticky lg:top-40">
          <h2 className="font-serif text-xl font-bold">Order summary</h2>
          <dl className="mt-5 space-y-3 text-sm">
            <Row k={`Subtotal (${getCartItemsCount()} items)`} v={inr(subtotal)} />
            <Row k="Shipping" v={inr(SHIPPING)} />
            <Row k="Tax (18%)" v={inr(tax)} />
          </dl>
          <div className="mt-5 flex justify-between border-t border-stone-200 pt-5 text-lg font-bold">
            <span>Total</span><span className="text-green-800">{inr(total)}</span>
          </div>
          <button onClick={checkout} className="mt-6 w-full rounded-xl bg-green-700 py-3.5 font-semibold text-white shadow-lg shadow-green-700/20 transition hover:bg-green-800">Proceed to checkout</button>
          <p className="mt-3 text-center text-xs text-stone-400">🔒 Secure checkout</p>
        </aside>
      </div>
    </div>
  );
}

const Row = ({ k, v }) => (
  <div className="flex justify-between text-stone-600"><dt>{k}</dt><dd className="font-medium text-stone-900">{v}</dd></div>
);