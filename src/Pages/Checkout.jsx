import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { authAPI, ordersAPI } from "../services/api";
import { toNumber, inr } from "../utils/price";

const Field = ({ label, className = "", ...p }) => (
  <label className={`block ${className}`}>
    <span className="mb-1.5 block text-sm font-medium text-stone-700">{label}</span>
    <input {...p} className="w-full rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-green-600 focus:ring-4 focus:ring-green-600/15" />
  </label>
);

const METHODS = [
  ["cod", "Cash on delivery", "Pay when your order arrives"],
  ["card", "Credit / debit card", "Visa, Mastercard, RuPay"],
  ["upi", "UPI", "GPay, PhonePe, Paytm, BHIM"],
];

export default function Checkout() {
  const { cart, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [ship, setShip] = useState({ firstName: "", lastName: "", email: "", phone: "", address: "", city: "", state: "", pincode: "", country: "India" });
  const [method, setMethod] = useState("cod");
  const [card, setCard] = useState({ cardNumber: "", expiryMonth: "", expiryYear: "", cvv: "", cardHolderName: "" });
  const [upi, setUpi] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const subtotal = getCartTotal();
  const shipping = 50;
  const tax = subtotal * 0.18;
  const total = subtotal + shipping + tax;

  useEffect(() => {
  const raw = localStorage.getItem("user");
  if (!raw || !localStorage.getItem("token")) {
    navigate("/login");
    return;
  }

  const u = JSON.parse(raw);
  setShip((p) => ({ ...p, firstName: u.first_name || "", lastName: u.last_name || "", email: u.email || "" }));

  const loadProfile = async () => {
    try {
      const profile = await authAPI.getProfile();
      const a = profile.data?.shippingAddress;
      if (a) setShip((p) => ({ ...p, ...a }));
    } catch (e) {
      console.error("Failed to fetch profile", e);
    }
  };
  loadProfile();
}, []); // eslint-disable-line

  const onShip = (e) => setShip((p) => ({ ...p, [e.target.name]: e.target.value }));
  const onCard = (e) => {
    let { name, value } = e.target;
    if (name === "cardNumber") value = value.replace(/\D/g, "").slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 ");
    if (name === "expiryMonth" || name === "expiryYear") value = value.replace(/\D/g, "").slice(0, 2);
    if (name === "cvv") value = value.replace(/\D/g, "").slice(0, 3);
    setCard((p) => ({ ...p, [name]: value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    const missing = ["firstName", "lastName", "email", "phone", "address", "city", "state", "pincode"].filter((f) => !ship[f]);
    if (missing.length) return setError(`Please fill in: ${missing.join(", ")}`);
    if (method === "card" && Object.values(card).some((v) => !v)) return setError("Please fill all card details");
    if (method === "upi" && !upi.includes("@")) return setError("Please enter a valid UPI ID (e.g. name@upi)");

    setBusy(true);
    try {
      const orderData = {
        items: cart.items.map((i) => ({ bookId: i._id || i.id, title: i.title, price: toNumber(i.price), quantity: i.quantity, image: i.img })),
        shippingDetails: ship,
        paymentMethod: method,
        paymentDetails: method === "card" ? { lastFour: card.cardNumber.slice(-4), cardType: "Credit/Debit Card" } : method === "upi" ? { upiId: upi } : null,
        subtotal, shipping, tax, totalAmount: total,
      };

      try { await authAPI.updateProfile({ shippingAddress: ship }); } catch (err) { console.warn("Could not save address", err); }

      let orderId;
      try {
        const res = await ordersAPI.createOrder(orderData);
        orderId = res.data._id;
      } catch (apiErr) {
        console.warn("API order failed, saving locally", apiErr);
        orderId = `ORD${Date.now()}`;
        const order = { _id: orderId, ...orderData, status: "confirmed", orderDate: new Date().toISOString(), estimatedDelivery: new Date(Date.now() + 7 * 864e5).toISOString() };
        const all = JSON.parse(localStorage.getItem("userOrders") || "[]");
        localStorage.setItem("userOrders", JSON.stringify([...all, order]));
        localStorage.setItem("lastOrder", JSON.stringify(order));
      }
      clearCart();
      navigate(`/order-confirmation/${orderId}`);
    } catch (err) {
      setError(err.message || "Failed to place order. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  if (cart.items.length === 0) {
    return (
      <div className="py-28 text-center">
        <p className="text-6xl">🛒</p>
        <h1 className="mt-4 font-serif text-3xl font-bold">Nothing to check out</h1>
        <Link to="/" className="mt-6 inline-block rounded-full bg-green-700 px-8 py-3 font-semibold text-white">Continue shopping</Link>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h1 className="font-serif text-4xl font-bold">Checkout</h1>
      <p className="mt-1 text-stone-500">Add your shipping details and choose how to pay.</p>

      {error && <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="space-y-6">
          <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-200">
            <h2 className="mb-5 font-serif text-xl font-bold">1 · Shipping details</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="First name *" name="firstName" value={ship.firstName} onChange={onShip} />
              <Field label="Last name *" name="lastName" value={ship.lastName} onChange={onShip} />
              <Field label="Email *" type="email" name="email" value={ship.email} onChange={onShip} />
              <Field label="Phone *" type="tel" name="phone" value={ship.phone} onChange={onShip} placeholder="+91 98765 43210" />
              <label className="block sm:col-span-2">
                <span className="mb-1.5 block text-sm font-medium text-stone-700">Address *</span>
                <textarea name="address" rows="3" value={ship.address} onChange={onShip} placeholder="House no., street, area" className="w-full rounded-xl border border-stone-300 px-4 py-2.5 text-sm outline-none focus:border-green-600 focus:ring-4 focus:ring-green-600/15" />
              </label>
              <Field label="City *" name="city" value={ship.city} onChange={onShip} />
              <Field label="State *" name="state" value={ship.state} onChange={onShip} />
              <Field label="Pincode *" name="pincode" value={ship.pincode} onChange={onShip} />
            </div>
          </section>

          <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-200">
            <h2 className="mb-5 font-serif text-xl font-bold">2 · Payment method</h2>
            <div className="space-y-3">
              {METHODS.map(([id, t, d]) => (
                <label key={id} className={`flex cursor-pointer items-center gap-4 rounded-xl border-2 p-4 transition ${method === id ? "border-green-600 bg-green-50" : "border-stone-200 hover:border-green-300"}`}>
                  <input type="radio" name="payment" checked={method === id} onChange={() => setMethod(id)} className="h-4 w-4 accent-green-700" />
                  <div><p className="font-semibold">{t}</p><p className="text-sm text-stone-500">{d}</p></div>
                </label>
              ))}
            </div>

            {method === "card" && (
              <div className="mt-5 grid gap-4 rounded-xl bg-stone-50 p-5 sm:grid-cols-2">
                <Field className="sm:col-span-2" label="Card number" name="cardNumber" value={card.cardNumber} onChange={onCard} placeholder="XXXX XXXX XXXX XXXX" inputMode="numeric" />
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Month" name="expiryMonth" value={card.expiryMonth} onChange={onCard} placeholder="MM" />
                  <Field label="Year" name="expiryYear" value={card.expiryYear} onChange={onCard} placeholder="YY" />
                </div>
                <Field label="CVV" type="password" name="cvv" value={card.cvv} onChange={onCard} placeholder="•••" />
                <Field className="sm:col-span-2" label="Name on card" name="cardHolderName" value={card.cardHolderName} onChange={onCard} />
              </div>
            )}
            {method === "upi" && (
              <div className="mt-5 rounded-xl bg-stone-50 p-5">
                <Field label="UPI ID" value={upi} onChange={(e) => setUpi(e.target.value)} placeholder="username@upi" />
              </div>
            )}
          </section>
        </div>

        <aside className="h-fit rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-200 lg:sticky lg:top-40">
          <h2 className="font-serif text-xl font-bold">Order summary</h2>
          <div className="mt-4 max-h-64 space-y-3 overflow-y-auto pr-1">
            {cart.items.map((i) => (
              <div key={i.id} className="flex gap-3">
                <img src={i.img} alt="" className="h-16 w-12 rounded-md object-cover" />
                <div className="flex-1 text-sm"><p className="line-clamp-1 font-medium">{i.title}</p><p className="text-stone-500">Qty {i.quantity}</p></div>
                <p className="text-sm font-semibold">{inr(toNumber(i.price) * i.quantity)}</p>
              </div>
            ))}
          </div>
          <dl className="mt-5 space-y-2 border-t border-stone-200 pt-5 text-sm text-stone-600">
            <div className="flex justify-between"><dt>Subtotal</dt><dd>{inr(subtotal)}</dd></div>
            <div className="flex justify-between"><dt>Shipping</dt><dd>{inr(shipping)}</dd></div>
            <div className="flex justify-between"><dt>Tax (18%)</dt><dd>{inr(tax)}</dd></div>
            <div className="flex justify-between border-t border-stone-200 pt-3 text-lg font-bold text-stone-900"><dt>Total</dt><dd className="text-green-800">{inr(total)}</dd></div>
          </dl>
          <button disabled={busy} className="mt-6 w-full rounded-xl bg-green-700 py-3.5 font-semibold text-white shadow-lg shadow-green-700/20 transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60">
            {busy ? "Processing…" : method === "cod" ? `Place order · ${inr(total)}` : `Pay ${inr(total)}`}
          </button>
          <Link to="/cart" className="mt-3 block text-center text-sm font-medium text-stone-500 hover:text-stone-800">← Back to cart</Link>
        </aside>
      </div>
    </form>
  );
}