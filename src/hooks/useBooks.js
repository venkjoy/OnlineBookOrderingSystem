import { useState, useEffect } from 'react';
import { booksAPI } from '../services/api';

export const useBooks = (category = null) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, [category]);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      setError(null);
      
      let booksData;
      if (category) {
        booksData = await booksAPI.getBooksByCategory(category);
      } else {
        booksData = await booksAPI.getAllBooks();
      }
      
      // Transform data to match your frontend structure
      const transformedBooks = booksData.map(book => ({
        id: book._id,
        title: book.title,
        category: book.category,
        price: `₹${book.price}`,
        img: book.imageUrl || "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=500&fit=crop",
        rating: book.rating || 4,
        reviews: book.reviews || Math.floor(Math.random() * 100) + 50,
        description: book.description,
        author: book.author,
        isNew: book.isNew || false
      }));
      
      setBooks(transformedBooks);
    } catch (err) {
      setError(err.message);
      console.error('Failed to fetch books:', err);
    } finally {
      setLoading(false);
    }
  };

  const searchBooks = async (query) => {
    try {
      setLoading(true);
      const results = await booksAPI.searchBooks(query);
      const transformedBooks = results.map(book => ({
        id: book._id,
        title: book.title,
        category: book.category,
        price: `₹${book.price}`,
        img: book.imageUrl || "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=500&fit=crop",
        rating: book.rating || 4,
        reviews: book.reviews || Math.floor(Math.random() * 100) + 50,
        description: book.description
      }));
      setBooks(transformedBooks);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { 
    books, 
    loading, 
    error, 
    refetch: fetchBooks,
    searchBooks 
  };
};