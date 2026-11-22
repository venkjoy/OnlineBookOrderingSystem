import React, { useState, useEffect, useRef } from "react";
import "./index.css";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "./context/CartContext.jsx";

// Import hero images
import hero1 from "./assets/hero-books.jpg";
import hero2 from "./assets/image2.jpg";
import hero3 from "./assets/image3.jpg";
import hero4 from "./assets/image4.jpg";
import hero5 from "./assets/image5.jpg";
import userImg from "./assets/user (3).png";
import wishlistImg from "./assets/wishlist.png";
import OrderImg from "./assets/Order.png";
import CartIcon from "./assets/Cart.png";


function App() {
  const navigate = useNavigate();
  const { addToCart, getCartItemsCount } = useCart();
  const heroImages = [hero1, hero2, hero3, hero4, hero5];
  const heroQuotes = [
    {
      title: "Discover Your Next Favorite Book",
      desc: "Explore thousands of books across all genres. From bestsellers to hidden gems, we have something for every reader.",
    },
    {
      title: "Ace Govt Exams with the Right Books",
      desc: "Find SSC, UPSC, Banking guides, and more. Get exam-ready with top-rated books.",
    },
    {
      title: "Latest Bestsellers Just For You",
      desc: "Stay updated with trending books loved by readers worldwide.",
    },
    {
      title: "Academic Success Starts Here",
      desc: "From CBSE to University Guides, we've got you covered for all your studies.",
    },
    {
      title: "Fiction, Sci-Fi, Romance & More",
      desc: "Dive into captivating stories and expand your imagination with our wide range.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [govtDropdownOpen, setGovtDropdownOpen] = useState(false);
  const [academicDropdownOpen, setAcademicDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const govtRef = useRef(null);
  const academicRef = useRef(null);
  const userRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (govtRef.current && !govtRef.current.contains(event.target))
        setGovtDropdownOpen(false);
      if (academicRef.current && !academicRef.current.contains(event.target))
        setAcademicDropdownOpen(false);
      if (userRef.current && !userRef.current.contains(event.target))
        setUserDropdownOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleWishlist = (bookId) => {
    setWishlist(prev => 
      prev.includes(bookId) 
        ? prev.filter(id => id !== bookId)
        : [...prev, bookId]
    );
  };

  // ✅ Fixed Book Images using reliable sources
  const featuredBooks = [
    {
      id: 1,
      title: "To Kill a Mockingbird",
      category: "Fiction",
      price: "₹400.00",
      img: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=500&fit=crop",
      rating: 5,
      reviews: 85,
      isNew: true,
      description: "A powerful story of justice and moral growth in the Deep South.",
    },
    {
      id: 2,
      title: "Atomic Habits",
      category: "Self Improvement",
      price: "₹399.00",
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
      rating: 5,
      reviews: 220,
      isNew: true,
      description: "A proven system to build good habits and break bad ones by James Clear.",
    },
    {
      id: 3,
      title: "Rich Dad Poor Dad",
      category: "Finance",
      price: "₹499.00",
      img: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=500&fit=crop",
      rating: 5,
      reviews: 310,
      isNew: false,
      description: "Robert Kiyosaki's financial guide on creating wealth and financial independence.",
    },
    {
      id: 4,
      title: "Ikigai",
      category: "Motivation",
      price: "₹299.00",
      img: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=500&fit=crop",
      rating: 5,
      reviews: 190,
      isNew: false,
      description: "The Japanese secret to a long and happy life, beautifully written and inspiring.",
    },
    {
      id: 5,
      title: "The Psychology of Money",
      category: "Finance",
      price: "₹350.00",
      img: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&h=500&fit=crop",
      rating: 5,
      reviews: 180,
      isNew: true,
      description: "Timeless lessons on wealth, greed, and happiness.",
    },
    {
      id: 6,
      title: "Think Like a Monk",
      category: "Self Help",
      price: "₹420.00",
      img: "https://images.unsplash.com/photo-1497636577773-f1231844b336?w=400&h=500&fit=crop",
      rating: 5,
      reviews: 250,
      isNew: true,
      description: "Jay Shetty's practical wisdom for a peaceful, meaningful life.",
    },
    {
      id: 7,
      title: "The Alchemist",
      category: "Fiction",
      price: "₹299.00",
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
      rating: 5,
      reviews: 500,
      isNew: false,
      description: "A philosophical story about following your dreams by Paulo Coelho.",
    },
    {
      id: 8,
      title: "Do Epic Shit",
      category: "Motivation",
      price: "₹380.00",
      img: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=500&fit=crop",
      rating: 4,
      reviews: 320,
      isNew: true,
      description: "An inspiring guide by Ankur Warikoo for living a bold life.",
    },
    {
      id: 9,
      title: "The 5 AM Club",
      category: "Self Help",
      price: "₹450.00",
      img: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=500&fit=crop",
      rating: 4,
      reviews: 280,
      isNew: false,
      description: "Own your morning, elevate your life with Robin Sharma's wisdom.",
    },
    {
      id: 10,
      title: "Sapiens",
      category: "History",
      price: "₹550.00",
      img: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=500&fit=crop",
      rating: 5,
      reviews: 420,
      isNew: true,
      description: "A brief history of humankind by Yuval Noah Harari.",
    },
    {
      id: 11,
      title: "The Power of Now",
      category: "Spirituality",
      price: "₹320.00",
      img: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&h=500&fit=crop",
      rating: 5,
      reviews: 380,
      isNew: false,
      description: "A guide to spiritual enlightenment by Eckhart Tolle.",
    },
    {
      id: 12,
      title: "Thinking, Fast and Slow",
      category: "Psychology",
      price: "₹480.00",
      img: "https://images.unsplash.com/photo-1497636577773-f1231844b336?w=400&h=500&fit=crop",
      rating: 4,
      reviews: 290,
      isNew: true,
      description: "Daniel Kahneman's groundbreaking work on human thinking.",
    }
  ];

  const newSellers = [
    {
      id: 13,
      title: "The Midnight Library",
      category: "Fiction",
      price: "₹360.00",
      img: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=500&fit=crop",
      rating: 5,
      reviews: 150,
      isNew: true,
      description: "A novel about regret, hope and second chances.",
    },
    {
      id: 14,
      title: "Project Hail Mary",
      category: "Sci-Fi",
      price: "₹520.00",
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
      rating: 5,
      reviews: 210,
      isNew: true,
      description: "A lone astronaut must save the earth from disaster.",
    },
    {
      id: 15,
      title: "The Four Winds",
      category: "Historical Fiction",
      price: "₹380.00",
      img: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=500&fit=crop",
      rating: 4,
      reviews: 180,
      isNew: true,
      description: "A story of love, heroism and hope during the Great Depression.",
    },
    {
      id: 16,
      title: "Klara and the Sun",
      category: "Sci-Fi",
      price: "₹420.00",
      img: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=500&fit=crop",
      rating: 4,
      reviews: 130,
      isNew: true,
      description: "A touching tale of an AI friend and human relationships.",
    },
    {
      id: 17,
      title: "The Sanatorium",
      category: "Thriller",
      price: "₹340.00",
      img: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&h=500&fit=crop",
      rating: 4,
      reviews: 95,
      isNew: true,
      description: "A chilling thriller set in a remote hotel in the Alps.",
    },
    {
      id: 18,
      title: "The Last Thing He Told Me",
      category: "Mystery",
      price: "₹310.00",
      img: "https://images.unsplash.com/photo-1497636577773-f1231844b336?w=400&h=500&fit=crop",
      rating: 4,
      reviews: 120,
      isNew: true,
      description: "A gripping novel about a woman searching for the truth.",
    }
  ];

  const relatedProducts = [
    {
      id: 25,
      title: "Deep Work",
      category: "Productivity",
      price: "₹450.00",
      img: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=500&fit=crop",
      rating: 5,
      reviews: 210,
    },
    {
      id: 26,
      title: "Can't Hurt Me",
      category: "Motivation",
      price: "₹499.00",
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
      rating: 5,
      reviews: 400,
    },
    {
      id: 27,
      title: "Start With Why",
      category: "Leadership",
      price: "₹350.00",
      img: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=500&fit=crop",
      rating: 5,
      reviews: 150,
    },
    {
      id: 28,
      title: "The Subtle Art of Not Giving a F*ck",
      category: "Self Help",
      price: "₹450.00",
      img: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=500&fit=crop",
      rating: 5,
      reviews: 480,
    }
  ];

  const filteredBooks = featuredBooks.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="w-full shadow bg-white relative z-50">
        <div className="flex items-center justify-between px-8 py-4">
          <h1
            className="text-2xl font-bold text-green-600 cursor-pointer hover:text-green-700 transition-colors duration-200"
            onClick={() => navigate("/")}
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

          {/* Enhanced Icons Section - With Cart Count */}
          <div className="flex items-center gap-8 text-gray-700 text-sm">
            {/* Wishlist - No Number */}
            <button className="flex flex-col items-center hover:text-green-600 transition-colors duration-200 group">
              <img src={wishlistImg} alt="wishlist" className="w-6 h-6 mb-1 group-hover:scale-110 transition-transform duration-200" />
              Wishlist
            </button>

            {/* Cart - With Count - IMPROVED */}
<Link
  to="/cart"
  className="flex flex-col items-center hover:text-green-600 transition-colors duration-200 group relative"
>
  {/* Cart Icon with Badge */}
  <div className="relative mb-1">
    <img
      src={CartIcon} // import this image at the top
      alt="Cart"
      className="w-7 h-7 group-hover:scale-110 transition-transform duration-200"
    />
    {getCartItemsCount() > 0 && (
      <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold rounded-full w-[20px] h-[20px] flex items-center justify-center border-2 border-white shadow-md leading-none">
        {getCartItemsCount()}
      </span>
    )}
  </div>
  <span>Cart</span>
</Link>

            {/* Your order */}
            <button className="flex flex-col items-center hover:text-green-600 transition-colors duration-200 group">
              <img src={OrderImg} alt="order" className="w-6 h-6 mb-1 group-hover:scale-110 transition-transform duration-200" />
              Order
            </button>

            {/* Account */}
            <div className="relative" ref={userRef}>
              <Link
                to="/login"
                className="flex flex-col items-center hover:text-green-600"
              >
                <img
                  src={userImg}
                  alt="User"
                  className="w-6 h-6 rounded-full mb-1"
                />
                Account
              </Link> 

              {/* User Dropdown */}
              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                  <div className="p-3 border-b border-gray-100">
                    <p className="text-gray-700 font-semibold text-sm">Hello, Reader!</p>
                  </div>
                  <div className="p-2">
                    <Link to="/login" className="block px-3 py-2 text-sm text-gray-700 hover:bg-green-50 rounded-md transition-colors duration-200">
                      Sign In
                    </Link>
                    <Link to="/register" className="block px-3 py-2 text-sm text-gray-700 hover:bg-green-50 rounded-md transition-colors duration-200">
                      Create Account
                    </Link>
                    <div className="border-t border-gray-100 mt-2 pt-2">
                      <Link to="/orders" className="block px-3 py-2 text-sm text-gray-700 hover:bg-green-50 rounded-md transition-colors duration-200">
                        My Orders
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Enhanced Navigation Menu */}
        <nav className="flex justify-center gap-8 py-3 font-medium text-gray-700 bg-gray-200 relative z-50">
          <Link to="/" className="hover:text-green-600 transition-colors duration-200">Home</Link>
          <Link to="/new-arrivals" className="hover:text-green-600 transition-colors duration-200">New Arrivals</Link>
          <Link to="/best-sellers" className="hover:text-green-600 transition-colors duration-200">Bestsellers</Link>

          {/* Govt Exams Dropdown - GREEN COLOR SCHEME */}
          <div className="relative" ref={govtRef}>
            <button 
              onClick={() => setGovtDropdownOpen(!govtDropdownOpen)}
              className="hover:text-green-600 transition-colors duration-200 flex items-center gap-1 group"
            >
              Govt Exams
              <span className={`transform transition-transform duration-300 ${govtDropdownOpen ? 'rotate-180' : ''}`}>
                ⏷
              </span>
            </button>
            {govtDropdownOpen && (
              <div className="absolute left-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden">
                <div className="bg-gradient-to-r from-green-600 to-green-500 p-4 text-white">
                  <h3 className="font-bold text-lg">Government Exams</h3>
                  <p className="text-green-100 text-sm mt-1">Prepare with the best books</p>
                </div>
                <div className="p-3">
                  <Link to="/govt-exams/upsc" className="flex items-center gap-3 px-4 py-3 hover:bg-green-50 rounded-lg transition-all duration-200 group/item">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center group-hover/item:bg-green-200 transition-colors">
                      <span className="text-green-600">📚</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">UPSC</p>
                      <p className="text-gray-500 text-xs">Civil Services</p>
                    </div>
                  </Link>
                  <Link to="/govt-exams/ssc" className="flex items-center gap-3 px-4 py-3 hover:bg-green-50 rounded-lg transition-all duration-200 group/item">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center group-hover/item:bg-green-200 transition-colors">
                      <span className="text-green-600">📝</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">SSC</p>
                      <p className="text-gray-500 text-xs">Staff Selection</p>
                    </div>
                  </Link>
                  <Link to="/govt-exams/banking" className="flex items-center gap-3 px-4 py-3 hover:bg-green-50 rounded-lg transition-all duration-200 group/item">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center group-hover/item:bg-green-200 transition-colors">
                      <span className="text-green-600">🏦</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Banking</p>
                      <p className="text-gray-500 text-xs">IBPS, SBI, RBI</p>
                    </div>
                  </Link>
                  <Link to="/govt-exams/defense" className="flex items-center gap-3 px-4 py-3 hover:bg-green-50 rounded-lg transition-all duration-200 group/item">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center group-hover/item:bg-green-200 transition-colors">
                      <span className="text-green-600">🎖️</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Defense</p>
                      <p className="text-gray-500 text-xs">NDA, CDS, AFCAT</p>
                    </div>
                  </Link>
                </div>
                <div className="border-t border-gray-200 p-3 bg-gray-50">
                  <Link to="/govt-exams" className="flex items-center justify-center gap-2 text-green-600 hover:text-green-700 font-semibold text-sm transition-colors">
                    <span>View All Exams</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Enhanced Categories Dropdown - GREEN COLOR SCHEME */}
          <div className="relative" ref={academicRef}>
            <button 
              onClick={() => setAcademicDropdownOpen(!academicDropdownOpen)}
              className="hover:text-green-600 transition-colors duration-200 flex items-center gap-1 group"
            >
              Explore Categories
              <span className={`transform transition-transform duration-300 ${academicDropdownOpen ? 'rotate-180' : ''}`}>
                ⏷
              </span>
            </button>
            {academicDropdownOpen && (
              <div className="absolute left-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden">
                <div className="bg-gradient-to-r from-green-600 to-green-500 p-4 text-white">
                  <h3 className="font-bold text-lg">Browse Categories</h3>
                  <p className="text-green-100 text-sm mt-1">Discover books by genre & interest</p>
                </div>
                <div className="grid grid-cols-2 gap-2 p-3">
                  <Link to="/explore-categories/fiction" className="flex items-center gap-3 px-4 py-3 hover:bg-green-50 rounded-lg transition-all duration-200 group/item">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center group-hover/item:bg-green-200 transition-colors">
                      <span className="text-green-600">📖</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Fiction</p>
                      <p className="text-gray-500 text-xs">Novels, Stories</p>
                    </div>
                  </Link>
                  <Link to="/explore-categories/nonfiction" className="flex items-center gap-3 px-4 py-3 hover:bg-green-50 rounded-lg transition-all duration-200 group/item">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center group-hover/item:bg-green-200 transition-colors">
                      <span className="text-green-600">🔬</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Non-Fiction</p>
                      <p className="text-gray-500 text-xs">Real Stories, Facts</p>
                    </div>
                  </Link>
                  <Link to="/explore-categories/romance" className="flex items-center gap-3 px-4 py-3 hover:bg-green-50 rounded-lg transition-all duration-200 group/item">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center group-hover/item:bg-green-200 transition-colors">
                      <span className="text-green-600">💕</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Romance</p>
                      <p className="text-gray-500 text-xs">Love Stories</p>
                    </div>
                  </Link>
                  <Link to="/explore-categories/scifi" className="flex items-center gap-3 px-4 py-3 hover:bg-green-50 rounded-lg transition-all duration-200 group/item">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center group-hover/item:bg-green-200 transition-colors">
                      <span className="text-green-600">🚀</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Sci-Fi</p>
                      <p className="text-gray-500 text-xs">Future, Technology</p>
                    </div>
                  </Link>
                  <Link to="/explore-categories/selfhelp" className="flex items-center gap-3 px-4 py-3 hover:bg-green-50 rounded-lg transition-all duration-200 group/item">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center group-hover/item:bg-green-200 transition-colors">
                      <span className="text-green-600">🧠</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Self-Help</p>
                      <p className="text-gray-500 text-xs">Personal Growth</p>
                    </div>
                  </Link>
                  <Link to="/explore-categories/business" className="flex items-center gap-3 px-4 py-3 hover:bg-green-50 rounded-lg transition-all duration-200 group/item">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center group-hover/item:bg-green-200 transition-colors">
                      <span className="text-green-600">📈</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Business</p>
                      <p className="text-gray-500 text-xs">Finance, Entrepreneurship</p>
                    </div>
                  </Link>
                </div>
                <div className="border-t border-gray-200 p-3 bg-gray-50">
                  <Link to="/explore-categories" className="flex items-center justify-center gap-2 text-green-600 hover:text-green-700 font-semibold text-sm transition-colors">
                    <span>View All Categories</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            )}
          </div>
          <a href="#" className="hover:text-green-600 transition-colors duration-200">Contact</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative w-full h-[550px] overflow-hidden">
        {heroImages.map((img, index) => (
          <img
            key={index}
            src={img}
            alt="Books Hero"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            } brightness-75`}
          />
        ))}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white bg-black/30 px-6">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
            {heroQuotes[currentIndex].title}
          </h2>
          <p className="text-lg md:text-xl mb-6 max-w-3xl">
            {heroQuotes[currentIndex].desc}
          </p>
        </div>
      </section>

      {/* Best Sellers with Horizontal Scroll */}
      <HorizontalScrollSection title="Best Sellers" books={filteredBooks} navigate={navigate} wishlist={wishlist} toggleWishlist={toggleWishlist} />

      {/* New Sellers with Horizontal Scroll */}
      <HorizontalScrollSection title="New Arrivals" books={newSellers} navigate={navigate} wishlist={wishlist} toggleWishlist={toggleWishlist} />

      {/* Related Products with Horizontal Scroll */}
      <HorizontalScrollSection title="Related Products" books={relatedProducts} navigate={navigate} wishlist={wishlist} toggleWishlist={toggleWishlist} />

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
}

// Horizontal Scroll Row Component with GREEN Color Scheme
const HorizontalScrollSection = ({ title, books, navigate, wishlist, toggleWishlist }) => {
  const { addToCart } = useCart();

  return (
    <section className="px-6 md:px-8 py-12">
      {title && (
        <div className="flex items-center gap-4 mb-6 ml-6">
          <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-lg">
            {title === "Best Sellers" && (
              <span className="text-white text-lg">🔥</span>
            )}
            {title === "New Arrivals" && (
              <span className="text-white text-lg">🆕</span>
            )}
            {title === "Related Products" && (
              <span className="text-white text-lg">📚</span>
            )}
          </div>
          <div>
            <h5 className="text-2xl font-bold text-gray-800">{title}</h5>
            <div className="w-16 h-1 bg-gradient-to-r from-green-500 to-green-600 mt-1 rounded-full"></div>
          </div>
        </div>
      )}
      
      {/* Scroll Container with visible scrollbar */}
      <div
        className="flex gap-6 overflow-x-auto pb-6 scrollbar-custom"
        style={{ 
          scrollbarWidth: 'thin',
          scrollbarColor: '#cbd5e0 #f7fafc'
        }}
      >
        {books.map((book, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-64 transform transition-all duration-500 hover:scale-105 first:ml-6 last:mr-6"
          >
            <BookCard
              book={book}
              onAddToCart={() => {
                addToCart({
                  id: book.id,
                  title: book.title,
                  price: book.price,
                  img: book.img,
                  category: book.category,
                  quantity: 1
                });
                alert(`${book.title} added to cart!`);
              }}
              onToggleWishlist={() => toggleWishlist(book.id)}
              isInWishlist={wishlist.includes(book.id)}
              onClick={() => navigate(`/product/${i}`, { state: book })}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

// Updated BookCard with GREEN Color Scheme
const BookCard = ({ book, onClick, onAddToCart, onToggleWishlist, isInWishlist }) => {
  const handleAddToCart = (e) => {
    e.stopPropagation(); // Prevent navigation to product page
    onAddToCart();
  };

  const handleWishlist = (e) => {
    e.stopPropagation(); // Prevent navigation to product page
    onToggleWishlist();
  };

  return (
    <div
      onClick={onClick}
      className="relative bg-white rounded-2xl shadow-lg p-4 hover:shadow-2xl transition-all duration-500 border border-gray-100 group cursor-pointer overflow-hidden"
    >
      {/* Enhanced Hover Overlay - GREEN */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50/0 via-green-100/0 to-emerald-200/0 group-hover:from-green-50/40 group-hover:via-green-100/20 group-hover:to-emerald-200/10 transition-all duration-500 rounded-2xl"></div>
      
      {/* Shine Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      
      {/* Wishlist Button */}
      <button
        onClick={handleWishlist}
        className={`absolute top-3 right-3 z-20 p-2 rounded-full transition-all duration-300 ${
          isInWishlist 
            ? 'bg-green-500 text-white shadow-lg transform scale-110' 
            : 'bg-white/80 text-gray-600 hover:bg-white hover:text-green-500 hover:scale-110'
        }`}
      >
        {isInWishlist ? '❤️' : '🤍'}
      </button>
      
      {book.isNew && (
        <span className="absolute top-3 left-3 bg-gradient-to-r from-green-500 to-green-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg z-10 transform group-hover:scale-110 transition-transform duration-300">
          🆕 New
        </span>
      )}
      
      <div className="relative z-10">
        <img
          src={book.img}
          alt={book.title}
          className="rounded-lg mb-3 w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110 group-hover:rotate-1 shadow-md"
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=500&fit=crop";
          }}
        />
        
        <div className="space-y-2">
          <p className="text-gray-400 text-sm group-hover:text-green-600 transition-colors duration-300">
            {book.category}
          </p>
          
          <h3 className="font-semibold text-gray-900 text-base truncate group-hover:text-green-700 transition-colors duration-300">
            {book.title}
          </h3>
          
          <div className="flex items-center text-yellow-500 text-sm my-1">
            {"⭐".repeat(book.rating || 5)}
            <span className="text-gray-500 text-xs ml-1 group-hover:text-gray-600 transition-colors duration-300">
              ({book.reviews || 0})
            </span>
          </div>
          
          <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-100 group-hover:border-green-200 transition-colors duration-300">
            <p className="text-green-600 font-bold text-lg group-hover:text-green-700 transition-colors duration-300">
              {book.price}
            </p>
            <button 
              onClick={handleAddToCart}
              className="flex items-center gap-2 bg-green-100 text-green-700 px-3 py-2 rounded-lg hover:bg-green-200 group-hover:bg-green-300 group-hover:scale-105 transition-all duration-300 text-sm font-semibold shadow-sm group-hover:shadow-md"
            >
              <span className="group-hover:scale-110 transition-transform duration-300">🛒</span>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;