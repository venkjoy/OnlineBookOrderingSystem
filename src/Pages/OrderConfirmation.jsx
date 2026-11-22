import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ordersAPI } from "../services/api";

// Import header assets
import userImg from "../assets/user (3).png";
import cartImg from "../assets/cart.png";
import wishlistImg from "../assets/wishlist.png";

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  
  // Header state
  const [searchTerm, setSearchTerm] = useState("");
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const userRef = React.useRef(null);

  // Get user data from localStorage
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      navigate('/login');
    }
  }, []);

  // Fetch order details
   useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        // Try to fetch from API first
        try {
          const response = await ordersAPI.getOrderById(orderId);
          if (response) {
            setOrder(response);
            setLoading(false);
            return;
          }
        } catch (apiError) {
          console.log("API fetch failed, trying localStorage:", apiError);
        }

        // Fallback: Check localStorage
        const orders = JSON.parse(localStorage.getItem('userOrders') || '[]');
        const foundOrder = orders.find(o => o._id === orderId);
        
        if (foundOrder) {
          setOrder(foundOrder);
        } else {
          // Check last order (for immediate redirect after checkout)
          const lastOrder = JSON.parse(localStorage.getItem('lastOrder') || 'null');
          if (lastOrder && lastOrder._id === orderId) {
            setOrder(lastOrder);
          } else {
            console.error("Order not found");
          }
        }
      } catch (error) {
        console.error("Failed to fetch order details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Format time
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get payment method display text
  const getPaymentMethodText = (method) => {
    switch (method) {
      case 'cod': return 'Cash on Delivery';
      case 'card': return 'Credit/Debit Card';
      case 'upi': return 'UPI';
      default: return method;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Not Found</h2>
          <p className="text-gray-600 mb-6">The order you're looking for doesn't exist.</p>
          <Link 
            to="/profile/orders"
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
          >
            View My Orders
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="w-full shadow bg-white relative z-50">
        <div className="flex items-center justify-between px-8 py-4">
          <h1
            className="text-2xl font-bold text-green-600 cursor-pointer hover:text-green-700 transition-colors duration-200"
            onClick={() => navigate("/home")}
          >
            BookOrder
          </h1>

          {/* Search Bar */}
          <div className="flex-1 px-8">
            <div className="relative max-w-md mx-auto">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search books, authors, categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:ring-opacity-50 transition-all duration-300 bg-gray-50 focus:bg-white shadow-sm focus:shadow-md"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <svg className="w-5 h-5 text-gray-400 hover:text-gray-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Icons Section */}
          <div className="flex items-center gap-8 text-gray-700 text-sm">
            {/* Wishlist */}
            <Link to="/profile/wishlist" className="flex flex-col items-center hover:text-green-600 transition-colors duration-200 group">
              <img src={wishlistImg} alt="wishlist" className="w-6 h-6 mb-1 group-hover:scale-110 transition-transform duration-200" />
              Wishlist
            </Link>

            {/* Cart */}
            <Link to="/cart" className="flex flex-col items-center hover:text-green-600 transition-colors duration-200 group">
              <img src={cartImg} alt="cart" className="w-6 h-6 mb-1 group-hover:scale-110 transition-transform duration-200" />
              Cart
            </Link>

            {/* Account */}
            <div className="relative" ref={userRef}>
              <div
                className="flex flex-col items-center hover:text-green-600 cursor-pointer"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              >
                {user ? (
                  <div className="relative">
                    <img
                      src={userImg}
                      alt="User Profile"
                      className="w-8 h-8 rounded-full mb-1"
                    />
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-xl border-2 border-white"></div>
                  </div>
                ) : (
                  <img
                    src={userImg}
                    alt="User"
                    className="w-8 h-8 rounded-full mb-1"
                  />
                )}
                <span>Account</span>
              </div>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 z-[60] overflow-hidden">
                  {user ? (
                    <>
                      <div className="bg-gradient-to-r from-green-600 to-green-500 p-4 text-white">
                        <div className="flex items-center gap-3">
                          <img
                            src={userImg}
                            alt="User Profile"
                            className="w-12 h-12"
                          />
                          <div>
                            <h3 className="font-bold text-lg">{user.first_name} {user.last_name}</h3>
                            <p className="text-green-100 text-sm">{user.email}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-3">
                        <Link 
                          to="/profile" 
                          className="flex items-center gap-3 px-4 py-3 hover:bg-green-50 rounded-lg transition-all duration-200 group/item"
                          onClick={() => setUserDropdownOpen(false)}
                        >
                          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center group-hover/item:bg-green-200 transition-colors">
                            <span className="text-green-600">👤</span>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800">My Profile</p>
                            <p className="text-gray-500 text-xs">View and edit profile</p>
                          </div>
                        </Link>
                        
                        <Link to="/profile/orders"
                          className="flex items-center gap-3 px-4 py-3 hover:bg-green-50 rounded-lg transition-all duration-200 group/item"
                          onClick={() => setUserDropdownOpen(false)}
                        >
                          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center group-hover/item:bg-green-200 transition-colors">
                            <span className="text-green-600">📦</span>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800">My Orders</p>
                            <p className="text-gray-500 text-xs">Order history</p>
                          </div>
                        </Link>
                        
                        <Link to="/profile/wishlist"
                          className="flex items-center gap-3 px-4 py-3 hover:bg-green-50 rounded-lg transition-all duration-200 group/item"
                          onClick={() => setUserDropdownOpen(false)}
                        >
                          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center group-hover/item:bg-green-200 transition-colors">
                            <span className="text-green-600">💚</span>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800">Wishlist</p>
                            <p className="text-gray-500 text-xs">Saved items</p>
                          </div>
                        </Link>
                      </div>
                      
                      <div className="border-t border-gray-200 p-3 bg-gray-50">
                        <button
                          onClick={handleLogout}
                          className="flex items-center justify-center gap-2 text-red-600 hover:text-red-700 font-semibold text-sm transition-colors w-full py-2 hover:bg-red-50 rounded-lg"
                        >
                          <span>🔐 Logout</span>
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="bg-gradient-to-r from-green-600 to-green-500 p-4 text-white">
                        <h3 className="font-bold text-lg">Welcome!</h3>
                        <p className="text-green-100 text-sm">Sign in to your account</p>
                      </div>
                      <div className="p-3">
                        <Link 
                          to="/login" 
                          className="flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold mb-2"
                          onClick={() => setUserDropdownOpen(false)}
                        >
                          Sign In
                        </Link>
                        <Link 
                          to="/register" 
                          className="flex items-center justify-center gap-2 border-2 border-green-600 text-green-600 px-4 py-3 rounded-lg hover:bg-green-50 transition-colors font-semibold"
                          onClick={() => setUserDropdownOpen(false)}
                        >
                          Create Account
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex justify-center gap-8 py-3 font-medium text-gray-700 bg-gray-200 relative z-50">
          <Link to="/home" className="hover:text-green-600 transition-colors duration-200">Home</Link>
          <Link to="/profile/orders" className="hover:text-green-600 transition-colors duration-200">My Orders</Link>
          <Link to="/profile" className="hover:text-green-600 transition-colors duration-200">My Account</Link>
          <Link to="/home" className="hover:text-green-600 transition-colors duration-200">Continue Shopping</Link>
        </nav>
      </header>

      {/* Order Confirmation Content */}
      <div className="flex-1 max-w-4xl mx-auto px-6 py-8">
        {/* Success Message */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-8 mb-8 text-center">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Order Confirmed!</h1>
          <p className="text-gray-600 mb-4">Thank you for your purchase. Your order has been received and is being processed.</p>
          
          <div className="inline-block bg-white rounded-lg px-6 py-3 shadow-sm">
            <p className="text-sm text-gray-500">Order ID</p>
            <p className="text-lg font-bold text-gray-800">{orderId}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Order Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Order Items */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Order Items</h2>
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center p-4 border border-gray-200 rounded-lg">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-20 object-cover rounded-md mr-4"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{item.title}</h3>
                      <div className="flex justify-between items-center mt-2">
                        <div>
                          <p className="text-gray-600 text-sm">Quantity: {item.quantity}</p>
                          <p className="text-green-600 font-bold">₹{(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                        <p className="text-gray-500 text-sm">₹{item.price.toFixed(2)} each</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping & Payment Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Shipping Address */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Shipping Address</h2>
                <div className="space-y-2 text-gray-600">
                  <p className="font-semibold">{order.shippingDetails.firstName} {order.shippingDetails.lastName}</p>
                  <p>{order.shippingDetails.address}</p>
                  <p>{order.shippingDetails.city}, {order.shippingDetails.state} - {order.shippingDetails.pincode}</p>
                  <p>{order.shippingDetails.country}</p>
                  <p className="pt-2">📞 {order.shippingDetails.phone}</p>
                  <p>✉️ {order.shippingDetails.email}</p>
                </div>
              </div>

              {/* Payment & Delivery */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Payment & Delivery</h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-500 text-sm">Payment Method</p>
                    <p className="font-semibold">{getPaymentMethodText(order.paymentMethod)}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Order Date</p>
                    <p className="font-semibold">{formatDate(order.orderDate)}</p>
                    <p className="text-gray-500 text-sm">{formatTime(order.orderDate)}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Estimated Delivery</p>
                    <p className="font-semibold">{formatDate(order.estimatedDelivery)}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Order Status</p>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span className="font-semibold text-green-600">Confirmed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({order.items.length} items)</span>
                  <span>₹{order.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>₹{order.shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (18%)</span>
                  <span>₹{order.tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total Amount</span>
                    <span>₹{order.totalAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Order Actions */}
              <div className="space-y-3">
                <Link
                  to="/profile/orders"
                  className="block text-center bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
                >
                  View All Orders
                </Link>
                
                <button
                  onClick={() => window.print()}
                  className="w-full text-center border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
                >
                  📄 Print Invoice
                </button>
                
                <Link
                  to="/home"
                  className="block text-center text-gray-600 hover:text-gray-800 transition-colors font-medium text-sm py-2 hover:bg-gray-50 rounded-lg"
                >
                  ← Continue Shopping
                </Link>
              </div>

              {/* Help Section */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="font-semibold text-gray-800 mb-3">Need Help?</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>📞 Call us: +91 9876543210</p>
                  <p>✉️ Email: support@bookorder.com</p>
                  <p>🕒 Support hours: 9 AM - 6 PM (Mon-Sat)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black py-12 border-t border-gray-700 mt-auto">
        <div className="max-w-6xl mx-auto px-6 flex flex-wrap justify-between gap-8">
          
          <div className="flex-1 min-w-[250px]">
            <h4 className="text-white font-semibold mb-4 text-lg">About us</h4>
            <p className="text-gray-400 mb-3 leading-relaxed">
              BookOrder — your one-stop platform for ordering academic and general books online.
            </p>
            <p className="text-gray-400 leading-relaxed">
              We connect students, colleges, and publishers directly to make book ordering simple and fast.
            </p>
          </div>

          <div className="flex-1 min-w-[200px]">
            <h4 className="text-white font-semibold mb-4 text-lg">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/profile/orders" className="hover:text-white transition-colors">My Orders</Link></li>
              <li><Link to="/profile" className="hover:text-white transition-colors">My Account</Link></li>
              <li><Link to="/profile/wishlist" className="hover:text-white transition-colors">Wishlist</Link></li>
              <li><Link to="/cart" className="hover:text-white transition-colors">Shopping Cart</Link></li>
            </ul>
          </div>

          <div className="flex-1 min-w-[250px]">
            <h4 className="text-white font-semibold mb-4 text-lg">Customer Support</h4>
            <div className="space-y-2 text-gray-400">
              <p>📞 +91 9876543210</p>
              <p>✉️ support@bookorder.com</p>
              <p>🕒 9 AM - 6 PM (Mon-Sat)</p>
            </div>
          </div>

        </div>
        
        <div className="max-w-6xl mx-auto px-6 mt-12 pt-6 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400 text-sm">
            <div>
              Copyright © 2025 all rights reserved. Powered by muthu soft labs
            </div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Refund Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default OrderConfirmation;