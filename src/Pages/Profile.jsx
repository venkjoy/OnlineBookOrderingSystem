
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI } from "../services/api";
import { useWishlist } from "../context/WishlistContext";

const states = [
  "Andaman & Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh",
  "Assam", "Bihar", "Chandigarh", "Chhattisgarh",
  "Dadra & Nagar Haveli and Daman & Diu", "Delhi", "Goa", "Gujarat",
  "Haryana", "Himachal Pradesh", "Jammu & Kashmir", "Jharkhand",
  "Karnataka", "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh",
  "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland",
  "Odisha", "Puducherry", "Punjab", "Rajasthan", "Sikkim",
  "Tamil Nadu", "Telangana", "Tripura", "Uttarakhand",
  "Uttar Pradesh", "West Bengal"
];

const citiesByState = {
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tirunelveli"],
  "Karnataka": ["Bengaluru", "Mysuru", "Mangalore", "Hubli", "Belgaum"],
  "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad"],
  "Delhi": ["New Delhi", "Dwarka", "Rohini", "Saket"],
  "West Bengal": ["Kolkata", "Howrah", "Durgapur", "Siliguri"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Varanasi", "Agra", "Noida"],
  "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur"]
};

const defaultCities = ["Select state first"];

const sections = [
  { id: "profile", icon: "👤", label: "Profile" },
  { id: "orders", icon: "📦", label: "Orders" },
  { id: "wishlist", icon: "💚", label: "Wishlist" },
  { id: "terms", icon: "📄", label: "Terms & Conditions" },
  { id: "contact", icon: "📞", label: "Contact" }
];

const inputClass =
  "w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-500/20";

const labelClass =
  "mb-2 block text-sm font-semibold text-gray-700";

function SectionHeading({ title, description }) {
  return (
    <div className="mb-7 border-b border-gray-200 pb-5">
      <h2 className="text-xl font-bold text-gray-800 sm:text-2xl">
        {title}
      </h2>
      {description && (
        <p className="mt-2 text-sm text-gray-500">{description}</p>
      )}
    </div>
  );
}

function EmptyState({ icon, title, description, buttonText, onClick }) {
  return (
    <div className="flex min-h-[320px] flex-col items-center justify-center px-4 py-12 text-center">
      <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 text-3xl">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-gray-800">{title}</h3>
      <p className="mt-2 max-w-sm text-sm leading-6 text-gray-500">
        {description}
      </p>
      {buttonText && (
        <button
          onClick={onClick}
          className="mt-6 rounded-lg bg-green-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
        >
          {buttonText}
        </button>
      )}
    </div>
  );
}

const Profile = () => {
  const navigate = useNavigate();

  // All hooks are called at the top level.
  const {
    wishlist = [],
    removeFromWishlist,
    loading: wishlistLoading = false
  } = useWishlist();

  const [activeSection, setActiveSection] = useState("profile");

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    gender: "",
    date_of_birth: "",
    address: "",
    state: "",
    city: "",
    pincode: ""
  });

  const [cityOptions, setCityOptions] = useState(defaultCities);
  const [saveLoading, setSaveLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [orders, setOrders] = useState([]);

  // Load saved user details.
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userRaw = localStorage.getItem("user");

    if (!token || !userRaw) {
      navigate("/login");
      return;
    }

    try {
      const userObj = JSON.parse(userRaw);

      setFormData((previous) => ({
        ...previous,
        first_name: userObj.first_name || "",
        last_name: userObj.last_name || "",
        email: userObj.email || "",
        phone: userObj.phone || "",
        gender: userObj.gender || "",
        date_of_birth: userObj.date_of_birth || "",
        address: userObj.address || "",
        state: userObj.state || "",
        city: userObj.city || "",
        pincode: userObj.pincode || ""
      }));

      const cities = citiesByState[userObj.state] || [];
      setCityOptions(
        cities.length ? cities : userObj.state ? ["Other"] : defaultCities
      );
    } catch (error) {
      console.error("Error loading user details:", error);
    }

    try {
      const savedOrders = JSON.parse(
        localStorage.getItem("userOrders") || "[]"
      );
      setOrders(Array.isArray(savedOrders) ? savedOrders : []);
    } catch {
      setOrders([]);
    }
  }, [navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "state") {
      const cities = citiesByState[value] || [];

      setCityOptions(
        value ? (cities.length ? cities : ["Other"]) : defaultCities
      );

      setFormData((previous) => ({
        ...previous,
        state: value,
        city: ""
      }));

      return;
    }

    setFormData((previous) => ({
      ...previous,
      [name]: value
    }));
  };

  const validate = () => {
    if (!formData.first_name.trim()) return "First name is required.";
    if (!formData.last_name.trim()) return "Last name is required.";
    if (!formData.email.trim()) return "Email is required.";
    if (!formData.phone.trim()) return "Phone number is required.";
    if (!formData.state.trim()) return "Please select a state.";
    if (!formData.city.trim()) return "Please select a city.";
    return null;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    const error = validate();

    if (error) {
      setMessage("❌ " + error);
      return;
    }

    setSaveLoading(true);

    try {
      const resp = await authAPI.updateProfile(formData);

      if (resp.success || resp?.data?.success) {
        const updatedUser =
          resp?.data?.data?.user ||
          resp?.data?.user ||
          formData;

        localStorage.setItem("user", JSON.stringify(updatedUser));

        setFormData((previous) => ({
          ...previous,
          ...updatedUser
        }));

        setMessage("✅ Profile saved successfully.");
      } else {
        setMessage(
          "❌ " + (resp?.message || "Failed to save profile.")
        );
      }
    } catch (error) {
      console.error("Profile save error:", error);
      setMessage(
        "❌ Error saving profile: " +
        (error?.message || "Please try again.")
      );
    } finally {
      setSaveLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const goShopping = () => navigate("/home");

  const renderProfile = () => (
    <div className="rounded-xl bg-white p-5 shadow-lg sm:p-8">
      <SectionHeading
        title="Personal Information"
        description="Manage your personal details and account information."
      />

      <div className="mb-8 flex flex-col gap-5 rounded-xl bg-gray-50 p-5 sm:flex-row sm:items-center">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-4 border-white bg-green-600 text-3xl font-bold text-white shadow">
          {formData.first_name
            ? formData.first_name.charAt(0).toUpperCase()
            : "U"}
        </div>

        <div className="min-w-0">
          <h3 className="text-xl font-bold text-gray-800">
            Welcome, {formData.first_name} {formData.last_name}!
          </h3>
          <p className="mt-1 break-all text-sm text-gray-500">
            {formData.email}
          </p>
          <span className="mt-3 inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
            Active Member
          </span>
        </div>
      </div>

      {message && (
        <div
          className={`mb-6 rounded-lg p-4 text-sm font-medium ${
            message.includes("✅")
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-2">
          <div>
            <label className={labelClass}>First Name *</label>
            <input
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className={inputClass}
              placeholder="Enter first name"
              required
            />
          </div>

          <div>
            <label className={labelClass}>Last Name *</label>
            <input
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className={inputClass}
              placeholder="Enter last name"
              required
            />
          </div>

          <div>
            <label className={labelClass}>Email Address *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={inputClass}
              placeholder="Enter email address"
              required
            />
          </div>

          <div>
            <label className={labelClass}>Phone Number *</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={inputClass}
              placeholder="Enter phone number"
              required
            />
          </div>

          <div>
            <label className={labelClass}>Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className={labelClass}>Date of Birth</label>
            <input
              type="date"
              name="date_of_birth"
              value={formData.date_of_birth}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div className="md:col-span-2">
            <label className={labelClass}>Full Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows={3}
              className={inputClass}
              placeholder="Enter your full address"
            />
          </div>

          <div>
            <label className={labelClass}>State *</label>
            <select
              name="state"
              value={formData.state}
              onChange={handleChange}
              className={inputClass}
              required
            >
              <option value="">Select State</option>
              {states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass}>City *</label>
            <select
              name="city"
              value={formData.city}
              onChange={handleChange}
              className={inputClass}
              required
              disabled={!formData.state}
            >
              <option value="">
                {formData.state ? "Select City" : "Select State First"}
              </option>
              {cityOptions
                .filter((city) => city !== "Select state first")
                .map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label className={labelClass}>Pincode</label>
            <input
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              className={inputClass}
              placeholder="Enter pincode"
            />
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3 border-t border-gray-200 pt-6">
          <button
            type="submit"
            disabled={saveLoading}
            className="rounded-lg bg-green-600 px-7 py-3 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saveLoading ? "Saving..." : "Save Changes"}
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="rounded-lg bg-gray-700 px-7 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
          >
            Logout
          </button>
        </div>
      </form>
    </div>
  );

  const renderOrders = () => (
    <div className="rounded-xl bg-white p-5 shadow-lg sm:p-8">
      <SectionHeading
        title="My Orders"
        description="View and track your recent book purchases."
      />

      {orders.length === 0 ? (
        <EmptyState
          icon="📦"
          title="No orders yet"
          description="Your order history will appear here once you place an order."
          buttonText="Start Shopping"
          onClick={goShopping}
        />
      ) : (
        <div className="space-y-5">
          {orders.map((order) => (
            <div
              key={order._id}
              className="rounded-xl border border-gray-200 p-5 transition hover:shadow-md sm:p-6"
            >
              <div className="flex flex-col justify-between gap-4 border-b border-gray-100 pb-5 sm:flex-row sm:items-center">
                <div>
                  <h3 className="font-bold text-gray-800">
                    Order #{order._id}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Placed on:{" "}
                    {order.orderDate
                      ? new Date(order.orderDate).toLocaleDateString()
                      : "Date unavailable"}
                  </p>
                </div>

                <div className="sm:text-right">
                  <p className="text-xl font-bold text-green-600">
                    ₹{Number(order.totalAmount || 0).toFixed(2)}
                  </p>
                  <span className="mt-1 inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold capitalize text-green-700">
                    {order.status || "Processing"}
                  </span>
                </div>
              </div>

              <div className="py-5">
                <h4 className="mb-4 text-sm font-bold text-gray-700">
                  Order Items
                </h4>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {(order.items || []).slice(0, 4).map((item, index) => (
                    <div
                      key={index}
                      className="flex min-w-0 gap-3 rounded-lg bg-gray-50 p-3"
                    >
                      <img
                        src={item.image}
                        alt={item.title || "Book"}
                        className="h-16 w-12 shrink-0 rounded object-cover"
                      />

                      <div className="min-w-0">
                        <p className="line-clamp-2 text-sm font-semibold text-gray-800">
                          {item.title}
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                          Quantity: {item.quantity}
                        </p>
                        <p className="mt-1 text-sm font-bold text-green-600">
                          ₹
                          {(
                            Number(item.price || 0) *
                            Number(item.quantity || 1)
                          ).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {order.items?.length > 4 && (
                  <p className="mt-3 text-sm text-gray-500">
                    +{order.items.length - 4} more items
                  </p>
                )}
              </div>

              <div className="flex flex-wrap gap-3 border-t border-gray-100 pt-5">
                <button
                  onClick={() => navigate(`/order-tracking/${order._id}`)}
                  className="rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700"
                >
                  Track Order
                </button>

                <button
                  onClick={() => navigate(`/order-confirmation/${order._id}`)}
                  className="rounded-lg bg-gray-100 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-200"
                >
                  View Details
                </button>

                <button
                  onClick={() => window.print()}
                  className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                >
                  Print Invoice
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderWishlist = () => (
    <div className="rounded-xl bg-white p-5 shadow-lg sm:p-8">
      <SectionHeading
        title="My Wishlist"
        description="Your saved books are collected here."
      />

      {wishlistLoading ? (
        <div className="flex min-h-[300px] flex-col items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-green-600" />
          <p className="mt-4 text-sm text-gray-500">Loading wishlist...</p>
        </div>
      ) : wishlist.length === 0 ? (
        <EmptyState
          icon="💚"
          title="Your wishlist is empty"
          description="Save your favourite books and they will appear here."
          buttonText="Browse Books"
          onClick={goShopping}
        />
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {wishlist.map((book) => (
            <div
              key={book.id}
              className="overflow-hidden rounded-xl border border-gray-200 bg-white transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative flex h-48 items-center justify-center bg-gray-50 p-4">
                <img
                  src={book.img}
                  alt={book.title || "Book"}
                  className="h-full max-w-full object-contain"
                />

                <button
                  onClick={() => removeFromWishlist(book.id)}
                  className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white text-red-500 shadow transition hover:bg-red-500 hover:text-white"
                  aria-label="Remove from wishlist"
                  title="Remove from wishlist"
                >
                  ✕
                </button>
              </div>

              <div className="p-5">
                <h3 className="line-clamp-2 min-h-12 font-bold text-gray-800">
                  {book.title}
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  {book.author || "Author unavailable"}
                </p>

                <div className="mt-4 flex items-center justify-between gap-2">
                  <span className="text-lg font-bold text-green-600">
                    {book.price}
                  </span>

                  {book.category && (
                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                      {book.category}
                    </span>
                  )}
                </div>

                <div className="mt-3 text-sm text-yellow-500">
                  {"⭐".repeat(Math.min(Number(book.rating) || 5, 5))}
                  <span className="ml-2 text-xs text-gray-400">
                    ({book.reviews || 0} reviews)
                  </span>
                </div>

                <button
                  onClick={() =>
                    navigate(`/product/${book.id}`, { state: book })
                  }
                  className="mt-5 w-full rounded-lg bg-gray-100 px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-green-600 hover:text-white"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderTerms = () => (
    <div className="rounded-xl bg-white p-5 shadow-lg sm:p-8">
      <SectionHeading
        title="Terms & Conditions"
        description="Please review the terms for using BookOrder."
      />

      <div className="space-y-6">
        {[
          [
            "1. Account Terms",
            "You are responsible for maintaining the security of your account and password. BookOrder cannot and will not be liable for any loss or damage from your failure to comply with this security obligation."
          ],
          [
            "2. Order Acceptance",
            "Your receipt of an electronic or other form of order confirmation does not signify our acceptance of your order, nor does it constitute confirmation of our offer to sell."
          ],
          [
            "3. Product Information",
            "BookOrder attempts to be as accurate as possible. However, BookOrder does not warrant that product descriptions or other content is accurate, complete, reliable, current, or error-free."
          ],
          [
            "4. Pricing Information",
            "While BookOrder strives to provide accurate product and pricing information, pricing or typographical errors may occur."
          ],
          [
            "5. Shipping & Delivery",
            "Shipping times are estimates and not guaranteed. BookOrder is not responsible for delays in shipping caused by weather, carrier issues, or other unforeseen circumstances."
          ]
        ].map(([heading, description]) => (
          <div key={heading} className="rounded-lg bg-gray-50 p-5">
            <h3 className="font-bold text-gray-800">{heading}</h3>
            <p className="mt-2 text-sm leading-7 text-gray-600">
              {description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderContact = () => (
    <div className="rounded-xl bg-white p-5 shadow-lg sm:p-8">
      <SectionHeading
        title="Contact Us"
        description="Have a question? Get in touch with our team."
      />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="space-y-5">
          <h3 className="text-lg font-bold text-gray-800">
            Get in Touch
          </h3>

          {[
            ["📧", "Email", "support@bookorder.com"],
            ["📞", "Phone", "+1 (555) 123-4567"],
            ["📍", "Address", "123 Book Street, Reading City, RC 12345"],
            ["🕒", "Business Hours", "Mon-Fri: 9AM-6PM | Sat: 10AM-4PM"]
          ].map(([icon, title, value]) => (
            <div
              key={title}
              className="flex items-start gap-4 rounded-lg bg-gray-50 p-4"
            >
              <span className="text-2xl">{icon}</span>
              <div className="min-w-0">
                <h4 className="text-sm font-bold text-gray-800">{title}</h4>
                <p className="mt-1 break-words text-sm text-gray-600">
                  {value}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div>
          <h3 className="mb-5 text-lg font-bold text-gray-800">
            Send us a Message
          </h3>

          <form
            onSubmit={(event) => event.preventDefault()}
            className="space-y-4"
          >
            <div>
              <label className={labelClass}>Your Name</label>
              <input
                type="text"
                className={inputClass}
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className={labelClass}>Your Email</label>
              <input
                type="email"
                className={inputClass}
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className={labelClass}>Subject</label>
              <input
                type="text"
                className={inputClass}
                placeholder="Enter subject"
              />
            </div>

            <div>
              <label className={labelClass}>Message</label>
              <textarea
                rows={4}
                className={inputClass}
                placeholder="Write your message..."
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-green-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-700 sm:w-auto"
            >
              Send Message →
            </button>
          </form>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen w-full flex-col bg-gray-50 lg:flex-row">

      {/* Sidebar */}
      <aside className="w-full shrink-0 bg-gray-800 text-white shadow-lg lg:min-h-screen lg:w-64">
        <div className="border-b border-gray-700 px-6 py-6">
          <h2 className="text-xl font-bold tracking-wide">
            BOOK<span className="text-green-400">ORDER</span>
          </h2>
          <p className="mt-1 text-xs text-gray-400">
            Your account dashboard
          </p>
        </div>

        <nav className="p-3">
          <p className="mb-3 px-3 text-xs font-bold uppercase tracking-wider text-gray-400">
            Account Menu
          </p>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-1">
            {sections.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`flex min-w-0 items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium transition ${
                  activeSection === item.id
                    ? "bg-green-600 text-white shadow"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="truncate">{item.label}</span>
              </button>
            ))}
          </div>

          <div className="mt-6 border-t border-gray-700 pt-5">
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold text-red-400 transition hover:bg-gray-700 hover:text-red-300"
            >
              <span className="text-lg">🚪</span>
              Logout
            </button>
          </div>
        </nav>
      </aside>

      {/* Main Dashboard */}
      <main className="min-w-0 flex-1">
        {/* Header */}
        <header className="sticky top-0 z-20 border-b border-gray-200 bg-white shadow-sm">
          <div className="flex flex-col justify-between gap-3 px-5 py-4 sm:flex-row sm:items-center sm:px-8">
            <div>
              <h1 className="text-xl font-bold capitalize text-gray-800 sm:text-2xl">
                {sections.find((item) => item.id === activeSection)?.label}
              </h1>
              <p className="mt-1 text-xs text-gray-500">
                BookOrder / Account /{" "}
                {sections.find((item) => item.id === activeSection)?.label}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600 font-bold text-white">
                {formData.first_name
                  ? formData.first_name.charAt(0).toUpperCase()
                  : "U"}
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-gray-800">
                  {formData.first_name} {formData.last_name}
                </p>
                <p className="text-xs text-gray-500">My Account</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="mx-auto w-full max-w-7xl p-4 sm:p-6 lg:p-8">
          {activeSection === "profile" && renderProfile()}
          {activeSection === "orders" && renderOrders()}
          {activeSection === "wishlist" && renderWishlist()}
          {activeSection === "terms" && renderTerms()}
          {activeSection === "contact" && renderContact()}
        </div>
      </main>
    </div>
  );
};

export default Profile;
