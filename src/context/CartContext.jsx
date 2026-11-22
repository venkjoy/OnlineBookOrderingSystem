import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { cartAPI } from '../services/api';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CART_ITEMS':
      return {
        ...state,
        items: action.payload,
        loading: false
      };

    case 'ADD_TO_CART':
      const existingItem = state.items.find(item => 
        item.id === action.payload.id || item._id === action.payload.id
      );
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            (item.id === action.payload.id || item._id === action.payload.id)
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }]
      };

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(item => 
          (item.id !== action.payload && item._id !== action.payload)
        )
      };

    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          (item.id === action.payload.id || item._id === action.payload.id)
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };

    case 'CLEAR_CART':
      return {
        ...state,
        items: []
      };

    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      };

    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false
      };

    default:
      return state;
  }
};

const initialState = {
  items: [],
  loading: false,
  error: null
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from backend when component mounts
  useEffect(() => {
    loadCartFromAPI();
  }, []);

  const loadCartFromAPI = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await cartAPI.getCart();
      
      // Transform backend cart items to match frontend structure
      const transformedItems = response.items.map(item => ({
        id: item.book?._id || item.bookId,
        _id: item.book?._id,
        title: item.book?.title,
        price: `₹${item.book?.price}`,
        img: item.book?.imageUrl || "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=500&fit=crop",
        category: item.book?.category,
        quantity: item.quantity
      }));

      dispatch({ type: 'SET_CART_ITEMS', payload: transformedItems });
    } catch (error) {
      console.error('Failed to load cart from API:', error);
      // If unauthorized, keep local cart (for guest users)
      if (!error.message.includes('Unauthorized')) {
        dispatch({ type: 'SET_ERROR', payload: error.message });
      }
    }
  };

  const addToCart = async (product) => {
    // Optimistic UI update
    const productId = product._id || product.id;
    
    dispatch({ 
      type: 'ADD_TO_CART', 
      payload: { ...product, id: productId }
    });

    // Sync with backend
    try {
      await cartAPI.addToCart(productId, 1);
    } catch (error) {
      console.error('Failed to add item to cart in backend:', error);
      // Revert on error - reload cart from API
      loadCartFromAPI();
    }
  };

  const removeFromCart = async (productId) => {
    // Optimistic UI update
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });

    // Sync with backend
    try {
      await cartAPI.removeFromCart(productId);
    } catch (error) {
      console.error('Failed to remove item from cart in backend:', error);
      // Revert on error
      loadCartFromAPI();
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    // Optimistic UI update
    dispatch({ 
      type: 'UPDATE_QUANTITY', 
      payload: { id: productId, quantity } 
    });

    // Sync with backend
    try {
      await cartAPI.updateCartItem(productId, quantity);
    } catch (error) {
      console.error('Failed to update quantity in backend:', error);
      // Revert on error
      loadCartFromAPI();
    }
  };

  const clearCart = async () => {
    // Optimistic UI update
    dispatch({ type: 'CLEAR_CART' });

    // Sync with backend
    try {
      await cartAPI.clearCart();
    } catch (error) {
      console.error('Failed to clear cart in backend:', error);
      // Revert on error
      loadCartFromAPI();
    }
  };

  const syncCartWithBackend = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // Clear existing cart in backend
      await cartAPI.clearCart();
      
      // Add all current items to backend
      for (const item of state.items) {
        const productId = item._id || item.id;
        await cartAPI.addToCart(productId, item.quantity);
      }
      
      // Reload to ensure sync
      await loadCartFromAPI();
    } catch (error) {
      console.error('Failed to sync cart with backend:', error);
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  };

  const getCartTotal = () => {
    return state.items.reduce((total, item) => {
      const price = parseFloat(item.price?.replace('₹', '')?.replace(',', '') || item.price || 0);
      return total + (price * item.quantity);
    }, 0);
  };

  const getCartItemsCount = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  };

  const getCartItem = (productId) => {
    return state.items.find(item => 
      item.id === productId || item._id === productId
    );
  };

  const value = {
    cart: state,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemsCount,
    getCartItem,
    loadCartFromAPI,
    syncCartWithBackend,
    loading: state.loading,
    error: state.error
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};