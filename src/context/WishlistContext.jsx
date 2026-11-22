import React, { createContext, useState, useContext, useEffect, useCallback } from "react";

const WishlistContext = createContext();

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load wishlist from localStorage
  useEffect(() => {
    console.log("📥 Loading wishlist from localStorage...");
    const saved = localStorage.getItem("wishlist");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        console.log("📚 Loaded wishlist:", parsed);
        setWishlist(Array.isArray(parsed) ? parsed : []);
      } catch (error) {
        console.error("❌ Error loading wishlist:", error);
        setWishlist([]);
      }
    }
    setLoading(false);
  }, []);

  // Save to localStorage when wishlist changes
  useEffect(() => {
    console.log("💾 Saving wishlist to localStorage. Current items:", wishlist.length);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // Add item - FIXED: Use functional update to ensure we get latest state
  const addToWishlist = useCallback(async (book) => {
    console.log("➕ Adding to wishlist:", book.title, book.id);
    try {
      setWishlist(prevWishlist => {
        // Check if book already exists in the CURRENT state
        const exists = prevWishlist.some((item) => item.id === book.id);
        if (exists) {
          console.log("⚠️ Book already in wishlist, skipping add");
          return prevWishlist; // Return unchanged array
        }

        const updated = [...prevWishlist, book];
        console.log("✅ Wishlist after add - Previous:", prevWishlist.length, "Updated:", updated.length);
        return updated;
      });
      return true;
    } catch (err) {
      console.error("❌ Add wishlist failed", err);
      return false;
    }
  }, []);

  // Remove item - FIXED: Use functional update
  const removeFromWishlist = useCallback(async (bookId) => {
    console.log("🗑️ Removing from wishlist, book ID:", bookId);
    try {
      setWishlist(prevWishlist => {
        const updated = prevWishlist.filter((item) => item.id !== bookId);
        console.log("✅ Wishlist after remove - Previous:", prevWishlist.length, "Updated:", updated.length);
        return updated;
      });
      return true;
    } catch (err) {
      console.error("❌ Remove wishlist failed", err);
      return false;
    }
  }, []);

  // Toggle wishlist - FIXED: Use functional updates
  const toggleWishlist = useCallback(async (book) => {
    console.log("🔄 Toggling wishlist for:", book.title, book.id);
    
    setWishlist(prevWishlist => {
      const exists = prevWishlist.some((item) => item.id === book.id);
      
      if (exists) {
        // Remove book
        const updated = prevWishlist.filter((item) => item.id !== book.id);
        console.log("➖ Removed from wishlist. Count:", updated.length);
        return updated;
      } else {
        // Add book
        const updated = [...prevWishlist, book];
        console.log("➕ Added to wishlist. Count:", updated.length);
        return updated;
      }
    });
    
    return true;
  }, []);

  const isInWishlist = useCallback((bookId) => {
    const exists = wishlist.some((item) => item.id === bookId);
    console.log(`🔍 Checking if book ${bookId} in wishlist:`, exists, "Total items:", wishlist.length);
    return exists;
  }, [wishlist]);

  const getWishlistItems = () => wishlist;
  const getWishlistCount = () => wishlist.length;
  const clearWishlist = () => setWishlist([]);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        loading,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isInWishlist,
        getWishlistItems,
        getWishlistCount,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};