const API_BASE = 'http://localhost:5001/api';  // ← Change to 5001

// Helper function for API requests
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  // Add auth token if available
  const token = localStorage.getItem('token');
  console.log('🔑 Token being sent:', token ? 'Exists' : 'Missing'); // Add this line
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log('✅ Authorization header added'); // Add this line
  }

  try {
    const response = await fetch(url, config);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }
    
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};
// Auth API
export const authAPI = {
  login: async (email, password) => {
    return apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  register: async (userData) => {
    return apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  getProfile: async () => {
    return apiRequest('/auth/profile');
  },

  updateProfile: async (profileData) => {
    return apiRequest('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  }
};

// ... rest of your api.js code

// Books API
export const booksAPI = {
  getAllBooks: async () => {
    const data = await apiRequest('/books');
    return data.data || [];
  },

  getBookById: async (id) => {
    const data = await apiRequest(`/books/${id}`);
    return data.data;
  },

  searchBooks: async (query) => {
    const data = await apiRequest(`/books/search?q=${encodeURIComponent(query)}`);
    return data.data || [];
  },

  getBooksByCategory: async (category) => {
    const data = await apiRequest(`/books/category/${category}`);
    return data.data || [];
  }
};

// Cart API
export const cartAPI = {
  getCart: async () => {
    const data = await apiRequest('/cart');
    return data.data || { items: [] };
  },

  addToCart: async (bookId, quantity = 1) => {
    return apiRequest('/cart', {
      method: 'POST',
      body: JSON.stringify({ bookId, quantity }),
    });
  },

  updateCartItem: async (bookId, quantity) => {
    return apiRequest('/cart', {
      method: 'PUT',
      body: JSON.stringify({ bookId, quantity }),
    });
  },

  removeFromCart: async (bookId) => {
    return apiRequest('/cart', {
      method: 'DELETE',
      body: JSON.stringify({ bookId }),
    });
  },

  clearCart: async () => {
    return apiRequest('/cart', {
      method: 'DELETE',
    });
  }
};
// Wishlist API
export const wishlistAPI = {
  getWishlist: async () => {
    const data = await apiRequest('/wishlist');
    return data.data || [];
  },

  addToWishlist: async (bookId) => {
    return apiRequest('/wishlist/add', {
      method: 'POST',
      body: JSON.stringify({ bookId }),
    });
  },

  removeFromWishlist: async (bookId) => {
    return apiRequest('/wishlist/remove', {
      method: 'DELETE',
      body: JSON.stringify({ bookId }),
    });
  },

  toggleWishlist: async (bookId, isInWishlist) => {
    if (isInWishlist) {
      return await wishlistAPI.removeFromWishlist(bookId);
    } else {
      return await wishlistAPI.addToWishlist(bookId);
    }
  }
};
// Orders API
export const ordersAPI = {
  createOrder: async (orderData) => {
    return apiRequest('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  },

  getOrders: async () => {
    const data = await apiRequest('/orders');
    return data.data || [];
  },

  getOrderById: async (orderId) => {
    const data = await apiRequest(`/orders/${orderId}`);
    return data.data;
  },

  cancelOrder: async (orderId) => {
    return apiRequest(`/orders/${orderId}/cancel`, {
      method: 'PUT',
    });
  },

  getOrderStatus: async (orderId) => {
    const data = await apiRequest(`/orders/${orderId}/status`);
    return data.data;
  }
};