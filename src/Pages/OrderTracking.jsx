import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ordersAPI } from "../services/api";

// Header assets
import userImg from "../assets/user (3).png";
import cartImg from "../assets/cart.png";
import wishlistImg from "../assets/wishlist.png";

const OrderTracking = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const userRef = useRef(null);
  const pollingRef = useRef(null);
  const [refreshCounter, setRefreshCounter] = useState(0);
  const [lastUpdateTime, setLastUpdateTime] = useState(null);

  // Get user data
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  // Function to fetch order details
  const fetchOrderDetails = async () => {
    try {
      let orderData;
      try {
        const response = await ordersAPI.getOrderById(orderId);
        orderData = response;
      } catch (apiError) {
        // Fallback to localStorage
        const orders = JSON.parse(localStorage.getItem('userOrders') || '[]');
        orderData = orders.find(o => o._id === orderId);
        
        if (!orderData) {
          const lastOrder = JSON.parse(localStorage.getItem('lastOrder') || 'null');
          if (lastOrder && lastOrder._id === orderId) {
            orderData = lastOrder;
          }
        }
      }
      
      if (orderData) {
        setOrder(prevOrder => {
          // Check if status actually changed to avoid unnecessary re-renders
          if (prevOrder && prevOrder.status === orderData.status) {
            return prevOrder;
          }
          setLastUpdateTime(new Date().toLocaleTimeString());
          return orderData;
        });
      } else {
        console.error("Order not found:", orderId);
      }
    } catch (error) {
      console.error("Failed to fetch order details:", error);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch and polling setup
  useEffect(() => {
    fetchOrderDetails();
    
    // Start polling every 3 seconds only if order is not delivered
    pollingRef.current = setInterval(() => {
      if (order && order.status === 'delivered') {
        clearInterval(pollingRef.current);
        return;
      }
      setRefreshCounter(prev => prev + 1);
    }, 3000); // 3 seconds
    
    // Cleanup interval on component unmount
    return () => {
      if (pollingRef.current) {
        clearInterval(pollingRef.current);
      }
    };
  }, [orderId]); // Only re-run when orderId changes

  // Fetch order details when refreshCounter changes
  useEffect(() => {
    if (refreshCounter > 0) {
      fetchOrderDetails();
    }
  }, [refreshCounter]);

  // Simulate status progression for demo (remove in production)
  useEffect(() => {
    // This is for demo purposes only - simulating status changes
    // Remove this in production or when you have real backend updates
    const simulateStatusProgression = () => {
      if (!order || order.status === 'delivered') return;
      
      const statuses = ['placed', 'processing', 'shipped', 'out_for_delivery', 'delivered'];
      const currentIndex = statuses.indexOf(order.status);
      
      if (currentIndex < statuses.length - 1) {
        // Simulate moving to next status every 15 seconds for demo
        const progressInterval = setInterval(() => {
          if (order && order.status !== 'delivered') {
            const nextStatus = statuses[currentIndex + 1];
            
            // Update local storage for demo
            const orders = JSON.parse(localStorage.getItem('userOrders') || '[]');
            const updatedOrders = orders.map(o => {
              if (o._id === orderId) {
                return { ...o, status: nextStatus };
              }
              return o;
            });
            localStorage.setItem('userOrders', JSON.stringify(updatedOrders));
            
            // Update lastOrder if it's the same
            const lastOrder = JSON.parse(localStorage.getItem('lastOrder') || 'null');
            if (lastOrder && lastOrder._id === orderId) {
              localStorage.setItem('lastOrder', JSON.stringify({
                ...lastOrder,
                status: nextStatus
              }));
            }
            
            // Trigger refetch
            setRefreshCounter(prev => prev + 1);
          }
        }, 15000); // 15 seconds for demo - change as needed
        
        return () => clearInterval(progressInterval);
      }
    };
    
    const cleanup = simulateStatusProgression();
    return cleanup;
  }, [order, orderId]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getPaymentMethodText = (method) => {
    switch (method) {
      case 'cod': return 'Cash on Delivery';
      case 'card': return 'Credit/Debit Card';
      case 'upi': return 'UPI';
      default: return method;
    }
  };

  // Tracking steps
  const trackingSteps = [
    { 
      label: 'Order Placed', 
      status: 'placed',
      description: 'Your order has been received',
      icon: '📋',
      time: 'Order placed time'
    },
    { 
      label: 'Processing', 
      status: 'processing',
      description: 'Preparing your order',
      icon: '⚙️',
      time: 'Processing started'
    },
    { 
      label: 'Shipped', 
      status: 'shipped',
      description: 'Order is on the way',
      icon: '🚚',
      time: 'Shipped from warehouse'
    },
    { 
      label: 'Out for Delivery', 
      status: 'out_for_delivery',
      description: 'Courier is delivering',
      icon: '📦',
      time: 'Out for delivery'
    },
    { 
      label: 'Delivered', 
      status: 'delivered',
      description: 'Order delivered successfully',
      icon: '✅',
      time: 'Delivered to your address'
    }
  ];

  // Determine current status
  const getCurrentStatusIndex = (status) => {
    switch (status) {
      case 'confirmed':
      case 'placed':
        return 0;
      case 'processing':
        return 1;
      case 'shipped':
        return 2;
      case 'out_for_delivery':
        return 3;
      case 'delivered':
        return 4;
      default:
        return 0;
    }
  };

  const currentStatusIndex = order ? getCurrentStatusIndex(order.status) : 0;

  if (loading) {
    return (
      <div className="max-h-screen bg-gray-50 flex items-center justify-center">
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
            to="/profile"
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
          >
            Back to Profile
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Auto-refresh indicator */}
      {order.status !== 'delivered' && (
        <div className="bg-blue-50 border-b border-blue-200 py-2 px-4">
          <div className="max-w-6xl mx-auto flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
           
            </div>
            {lastUpdateTime && (
              <span className="text-white 600 text-xs">
                Last updated: {lastUpdateTime}
              </span>
            )}
          </div>
        </div>
      )}

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
                        
                        <Link to="/profile"
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

        {/* Navigation */}
        <nav className="flex justify-center gap-8 py-3 font-medium text-gray-700 bg-gray-200 relative z-50">
          <Link to="/home" className="hover:text-green-600 transition-colors duration-200">Home</Link>
          <Link to="/profile" className="hover:text-green-600 transition-colors duration-200">My Orders</Link>
          <Link to={`/order-tracking/${orderId}`} className="hover:text-green-600 transition-colors duration-200 font-semibold text-green-600">Track Order</Link>
        </nav>
      </header>

      {/* Main Content */}
      <div className="flex-1 max-w-6xl mx-auto px-6 py-8">
        {/* Order Header */}
        <div className="bg-gradient-to-r from-green-600 to-gray-700 text-white rounded-2xl p-8 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">Track Your Order</h1>
              <p className="text-green-100">Order ID: <span className="font-mono font-bold">{orderId}</span></p>
              <p className="text-green-100">Placed on: {formatDate(order.orderDate)}</p>
              {order.status === 'delivered' ? (
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span className="text-green-100">✓ Tracking completed</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-2 h-2 bg-yellow-300 rounded-full animate-pulse"></div>
                  <span className="text-green-100">Live tracking active</span>
                </div>
              )}
            </div>
            <div className="mt-4 md:mt-0 bg-gray bg-opacity-0 p-4 rounded-3xl">
              <p className="text-3xl font-semibold">Total Amount</p>
              <p className="text-2xl font-bold">₹{order.totalAmount?.toFixed(2) || '0.00'}</p>
              <p className="text-sm opacity-90">{order.items?.length || 0} items</p>
              <p className="text-xs mt-2 opacity-80">
                Status: <span className="font-bold capitalize">{order.status?.replace('_', ' ')}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Tracking */}
          <div className="lg:col-span-2">
            {/* Tracking Visualization */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Order Status</h2>
                {order.status !== 'delivered' && (
                  <button
                    onClick={() => setRefreshCounter(prev => prev + 1)}
                    className="text-sm bg-green-50 text-green-700 px-3 py-1 rounded-lg hover:bg-green-100 transition-colors flex items-center gap-1"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Refresh Now
                  </button>
                )}
              </div>
              
              <div className="relative">
                {/* Progress Line */}
                <div className="absolute top-8 left-0 right-0 h-2 bg-gray-200 rounded-1xl"></div>
                <div 
                  className="absolute top-8 left-0 h-2 bg-red-500 rounded-full transition-all duration-1000"
                  style={{ width: `${(currentStatusIndex / (trackingSteps.length - 1)) * 100}%` }}
                ></div>
                
                {/* Steps */}
                <div className="flex justify-between relative">
                  {trackingSteps.map((step, index) => (
                    <div key={step.status} className="flex flex-col items-center" style={{ width: `${100 / trackingSteps.length}%` }}>
                      <div className={`
                        w-14 h-14 rounded-2xl shrink-0 flex items-center justify-center z-10 mb-3 shadow
                        ${index <= currentStatusIndex ? 'bg-green-500 text-white shadow-lg' : 'bg-gray-200 text-gray-500'}
                        transition-all duration-300
                      `}>
                        
                        <span className="text-2xl">{step.icon}</span>
                      </div>
                      
                      <div className="text-center">
                        <p className="font-semibold text-gray-800">{step.label}</p>
                        <p className="text-sm text-gray-500 mt-1">{step.description}</p>
                        {index <= currentStatusIndex && (
                          <p className="text-xs text-green-600 font-medium mt-1">✓ Completed</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Current Status */}
              <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 text-xl">📊</span>
                  </div>
                  <div>
                    <p className="font-semibold text-blue-800">Current Status: {trackingSteps[currentStatusIndex]?.label}</p>
                    <p className="text-blue-600 text-sm">{trackingSteps[currentStatusIndex]?.description}</p>
                    {order.status !== 'delivered' && (
                      <p className="text-blue-500 text-xs mt-1">
                        Auto-refreshing in real-time • Next check: {new Date(Date.now() + 3000).toLocaleTimeString([], { minute: '2-digit', second: '2-digit' })}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Order Details */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Order Details</h2>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-500 text-sm">Payment Method</p>
                    <p className="font-semibold">{getPaymentMethodText(order.paymentMethod)}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Estimated Delivery</p>
                    <p className="font-semibold">{formatDate(order.estimatedDelivery)}</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-gray-500 text-sm">Shipping Address</p>
                  <p className="font-semibold">{order.shippingDetails?.firstName} {order.shippingDetails?.lastName}</p>
                  <p className="text-gray-600">{order.shippingDetails?.address}</p>
                  <p className="text-gray-600">{order.shippingDetails?.city}, {order.shippingDetails?.state} - {order.shippingDetails?.pincode}</p>
                  <p className="text-gray-600">📞 {order.shippingDetails?.phone}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Order Items */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Order Items</h2>
              
              <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                {order.items?.map((item, index) => (
                  <div key={index} className="flex items-center p-3 border border-gray-200 rounded-lg">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-20 object-cover rounded-md mr-3"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-800 text-sm">{item.title}</h3>
                      <div className="flex justify-between items-center mt-2">
                        <p className="text-gray-500 text-xs">Qty: {item.quantity}</p>
                        <p className="text-green-600 font-bold">₹{(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Summary */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="space-y-2">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>₹{order.subtotal?.toFixed(2) || '0.00'}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>₹{order.shipping?.toFixed(2) || '0.00'}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax</span>
                    <span>₹{order.tax?.toFixed(2) || '0.00'}</span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>₹{order.totalAmount?.toFixed(2) || '0.00'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-6 space-y-3">
                <Link
                  to="/profile"
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
              </div>

              {/* Support */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="font-semibold text-gray-800 mb-3">Need Help?</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>📞 Call: +91 9876543210</p>
                  <p>📧 Email: support@bookorder.com</p>
                  <p>🕒 9 AM - 6 PM (Mon-Sat)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      {/* Footer */}
      <footer className="bg-black py-12 border-t border-gray-700 mt-auto">
        <div className="max-w-6xl mx-auto px-6 flex flex-wrap justify-between gap-8">
          
          {/* About Us Section */}
          <div className="flex-1 min-w-[250px]">
            <h4 className="text-white font-semibold mb-4 text-lg">About us</h4>
            <p className="text-gray-400 mb-3 leading-relaxed">
              BookVerse — your one-stop platform for ordering academic and general books online.
            </p>
            <p className="text-gray-400 leading-relaxed">
              We connect students, colleges, and publishers directly to make book ordering simple and fast.
            </p>
            <div className="mt-4">
              <a href="#" className="text-white hover:text-gray-300 font-medium inline-flex items-center gap-1 transition-colors">
                read more →
              </a>
            </div>
          </div>

          {/* Categories Section */}
          <div className="flex-1 min-w-[200px]">
            <h4 className="text-white font-semibold mb-4 text-lg">Categories</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="hover:text-white cursor-pointer transition-colors">Fiction</li>
              <li className="hover:text-white cursor-pointer transition-colors">Non-Fiction</li>
              <li className="hover:text-white cursor-pointer transition-colors">Education</li>
              <li className="hover:text-white cursor-pointer transition-colors">Examination</li>
            </ul>
          </div>

          {/* Subscribe Section */}
          <div className="flex-1 min-w-[250px]">
            <h4 className="text-white font-semibold mb-4 text-lg">Subscribe us</h4>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter email address"
                className="flex-1 px-4 py-2 border border-gray-300 bg-[#D9D9D9] text-black rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder-gray-600"
              />
              <button className="bg-[#D9D9D9] text-black px-4 py-2 rounded-r-lg hover:bg-gray-300 transition-colors border border-gray-300 border-l-0 font-bold">
                →
              </button>
            </div>
          </div>

        </div>
        
        {/* Copyright Section */}
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

export default OrderTracking;