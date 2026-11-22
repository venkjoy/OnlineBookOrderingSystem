import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeSection, setActiveSection] = useState("profile");

  useEffect(() => {
    const userData = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (!token || !userData) {
      navigate('/login');
      return;
    }

    const userObj = JSON.parse(userData);
    setUser(userObj);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar - Gray */}
      <div className="w-64 bg-gray-800 shadow-lg">
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white">BOOKORDER</h2>
        </div>
        
        <nav className="p-4">
          <ul className="space-y-2">
            {[
              { id: "profile", icon: "👤", label: "Profile" },
              { id: "orders", icon: "📦", label: "Orders" },
              { id: "wishlist", icon: "❤️", label: "Wishlist" },
              { id: "terms", icon: "📄", label: "Terms & Conditions" },
              { id: "contact", icon: "📞", label: "Contact" }
            ].map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    activeSection === item.id 
                      ? "bg-green-600 text-white shadow-lg" 
                      : "text-gray-300 hover:bg-gray-700 hover:text-green-400"
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>

          {/* Logout Button */}
          <div className="mt-8 pt-4 border-t border-gray-700">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-red-400 hover:bg-gray-700 hover:text-red-300"
            >
              <span className="text-lg">🚪</span>
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="flex items-center justify-between px-6 py-4">
            <h1 className="text-2xl font-bold text-gray-800 capitalize">
              {activeSection.replace(/([A-Z])/g, ' $1').trim()}
            </h1>
            <div className="flex items-center gap-4">
              <button className="p-2 rounded-full hover:bg-gray-100">
                <span className="text-xl">🔔</span>
              </button>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-semibold">
                  {user.first_name ? user.first_name.charAt(0).toUpperCase() : "U"}
                </div>
                <span className="text-gray-700">{user.first_name} {user.last_name}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <div className="flex-1 p-6 overflow-auto">
          {/* Profile Section */}
          {activeSection === "profile" && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center gap-6 mb-8">
                <div className="relative">
                  <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white text-3xl font-bold border-4 border-white shadow-lg">
                    {user.first_name ? user.first_name.charAt(0).toUpperCase() : "U"}
                  </div>
                  <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-800">
                    Welcome, {user.first_name} {user.last_name}!
                  </h1>
                  <p className="text-gray-600 mt-1">{user.email}</p>
                  <p className="text-gray-500 text-sm mt-2">
                    Member since {new Date().toLocaleDateString()}
                  </p>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-800 mb-6">Profile Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    {user.first_name || "Not provided"}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    {user.last_name || "Not provided"}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    {user.email}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    {user.phone || "Not provided"}
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors inline-flex items-center gap-2">
                  Edit Profile
                  <span>→</span>
                </button>
              </div>
            </div>
          )}

          {/* Orders Section */}
          {activeSection === "orders" && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">My Orders</h2>
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">📦</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No orders yet</h3>
                <p className="text-gray-500 mb-6">Your order history will appear here</p>
                <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors inline-flex items-center gap-2">
                  Start Shopping
                  <span>→</span>
                </button>
              </div>
            </div>
          )}

          {/* Wishlist Section */}
          {activeSection === "wishlist" && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">My Wishlist</h2>
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">❤️</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Your wishlist is empty</h3>
                <p className="text-gray-500 mb-6">Save your favorite books to see them here</p>
                <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors inline-flex items-center gap-2">
                  Browse Books
                  <span>→</span>
                </button>
              </div>
            </div>
          )}

          {/* Terms & Conditions Section */}
          {activeSection === "terms" && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Terms & Conditions</h2>
              <div className="prose max-w-none">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">1. Account Terms</h3>
                    <p className="text-gray-600">
                      You are responsible for maintaining the security of your account and password. 
                      BookOrder cannot and will not be liable for any loss or damage from your failure 
                      to comply with this security obligation.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">2. Order Acceptance</h3>
                    <p className="text-gray-600">
                      Your receipt of an electronic or other form of order confirmation does not signify 
                      our acceptance of your order, nor does it constitute confirmation of our offer to sell.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">3. Product Information</h3>
                    <p className="text-gray-600">
                      BookOrder attempts to be as accurate as possible. However, BookOrder does not warrant 
                      that product descriptions or other content is accurate, complete, reliable, current, or error-free.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">4. Pricing Information</h3>
                    <p className="text-gray-600">
                      While BookOrder strives to provide accurate product and pricing information, 
                      pricing or typographical errors may occur.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">5. Shipping & Delivery</h3>
                    <p className="text-gray-600">
                      Shipping times are estimates and not guaranteed. BookOrder is not responsible for 
                      any delays in shipping caused by weather, carrier issues, or other unforeseen circumstances.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Contact Section */}
          {activeSection === "contact" && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact Us</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Get in Touch</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">📧</span>
                      <div>
                        <p className="font-medium">Email</p>
                        <p className="text-gray-600">support@bookorder.com</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">📞</span>
                      <div>
                        <p className="font-medium">Phone</p>
                        <p className="text-gray-600">+1 (555) 123-4567</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">📍</span>
                      <div>
                        <p className="font-medium">Address</p>
                        <p className="text-gray-600">123 Book Street, Reading City, RC 12345</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🕒</span>
                      <div>
                        <p className="font-medium">Business Hours</p>
                        <p className="text-gray-600">Mon-Fri: 9AM-6PM</p>
                        <p className="text-gray-600">Sat: 10AM-4PM</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Send us a Message</h3>
                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                      <input 
                        type="text" 
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" 
                        placeholder="Enter your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Your Email</label>
                      <input 
                        type="email" 
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" 
                        placeholder="Enter your email"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                      <input 
                        type="text" 
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" 
                        placeholder="Enter subject"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                      <textarea 
                        rows="4" 
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Enter your message"
                      ></textarea>
                    </div>
                    <button 
                      type="submit" 
                      className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors inline-flex items-center gap-2"
                    >
                      Send Message
                      <span>→</span>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;