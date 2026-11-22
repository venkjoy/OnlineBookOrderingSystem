import { createContext, useContext, useState, useEffect } from "react";

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  // Load from localStorage (temporary DB)
  useEffect(() => {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    } else {
      // default products (your featuredBooks)
      const defaultProducts = [
        {
          id: 1,
          title: "To Kill a Mockingbird",
          category: "Fiction",
          price: 400,
          img: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=500&fit=crop",
        },
        {
          id: 2,
          title: "Atomic Habits",
          category: "Self Improvement",
          price: 399,
          img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
        },
      ];

      setProducts(defaultProducts);
      localStorage.setItem("products", JSON.stringify(defaultProducts));
    }
  }, []);

  // Save updates to localStorage
  const saveProducts = (updated) => {
    setProducts(updated);
    localStorage.setItem("products", JSON.stringify(updated));
  };

  const addProduct = (product) => {
    const newProduct = { ...product, id: Date.now() };
    const updated = [...products, newProduct];
    saveProducts(updated);
  };

  const deleteProduct = (id) => {
    const updated = products.filter((p) => p.id !== id);
    saveProducts(updated);
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
