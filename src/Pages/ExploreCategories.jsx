import CollectionPage from "../components/CollectionPage";
  const allCategories = {
    fiction: {
      title: "Fiction",
      description: "Novels, Stories & Literary Works",
      icon: "📖",
      books: [
        {
          id: 401,
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
          id: 402,
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
          id: 403,
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
          id: 404,
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
          id: 405,
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
          id: 406,
          title: "The Paris Library",
          category: "Historical Fiction",
          price: "₹370.00",
          img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
          rating: 5,
          reviews: 110,
          isNew: true,
          description: "Based on the true story of the librarians at the American Library in Paris.",
        }
      ]
    },
    nonfiction: {
      title: "Non-Fiction",
      description: "Real Stories, Facts & Biographies",
      icon: "🔬",
      books: [
        {
          id: 407,
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
          id: 408,
          title: "The Code Breaker",
          category: "Biography",
          price: "₹480.00",
          img: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=500&fit=crop",
          rating: 5,
          reviews: 140,
          isNew: true,
          description: "Jennifer Doudna, gene editing, and the future of the human race.",
        },
        {
          id: 409,
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
          id: 410,
          title: "Thinking, Fast and Slow",
          category: "Psychology",
          price: "₹480.00",
          img: "https://images.unsplash.com/photo-1497636577773-f1231844b336?w=400&h=500&fit=crop",
          rating: 4,
          reviews: 290,
          isNew: true,
          description: "Daniel Kahneman's groundbreaking work on human thinking.",
        }
      ]
    },
    romance: {
      title: "Romance",
      description: "Love Stories & Romantic Novels",
      icon: "💕",
      books: [
        {
          id: 411,
          title: "People We Meet on Vacation",
          category: "Romance",
          price: "₹290.00",
          img: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=500&fit=crop",
          rating: 4,
          reviews: 160,
          isNew: true,
          description: "Two best friends. Ten summer trips. One last chance to fall in love.",
        },
        {
          id: 412,
          title: "The Last Thing He Told Me",
          category: "Mystery Romance",
          price: "₹310.00",
          img: "https://images.unsplash.com/photo-1497636577773-f1231844b336?w=400&h=500&fit=crop",
          rating: 4,
          reviews: 120,
          isNew: true,
          description: "A gripping novel about a woman searching for the truth.",
        }
      ]
    },
    scifi: {
      title: "Science Fiction",
      description: "Future, Technology & Space Adventures",
      icon: "🚀",
      books: [
        {
          id: 413,
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
          id: 414,
          title: "Klara and the Sun",
          category: "Sci-Fi",
          price: "₹420.00",
          img: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=500&fit=crop",
          rating: 4,
          reviews: 130,
          isNew: true,
          description: "A touching tale of an AI friend and human relationships.",
        }
      ]
    },
    selfhelp: {
      title: "Self Help",
      description: "Personal Growth & Development",
      icon: "🧠",
      books: [
        {
          id: 415,
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
          id: 416,
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
          id: 417,
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
          id: 418,
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
          id: 419,
          title: "Do Epic Shit",
          category: "Motivation",
          price: "₹380.00",
          img: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=500&fit=crop",
          rating: 4,
          reviews: 320,
          isNew: true,
          description: "An inspiring guide by Ankur Warikoo for living a bold life.",
        }
      ]
    },
    business: {
      title: "Business",
      description: "Finance, Entrepreneurship & Leadership",
      icon: "📈",
      books: [
        {
          id: 420,
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
          id: 421,
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
          id: 422,
          title: "Start With Why",
          category: "Leadership",
          price: "₹350.00",
          img: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=500&fit=crop",
          rating: 5,
          reviews: 150,
          description: "Discover your purpose and inspire others to action.",
        },
        {
          id: 423,
          title: "Dare to Lead",
          category: "Leadership",
          price: "₹520.00",
          img: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&h=500&fit=crop",
          rating: 5,
          reviews: 190,
          description: "Brave work. Tough conversations. Whole hearts.",
        }
      ]
    },
    history: {
      title: "History",
      description: "Historical Events & Civilizations",
      icon: "🏛️",
      books: [
        {
          id: 424,
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
          id: 425,
          title: "The Rose Code",
          category: "Historical Fiction",
          price: "₹390.00",
          img: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&h=500&fit=crop",
          rating: 5,
          reviews: 170,
          isNew: true,
          description: "Three female codebreakers at Bletchley Park during WW2.",
        }
      ]
    },
    education: {
      title: "Education",
      description: "Academic Books & Learning Resources",
      icon: "🎓",
      books: [
        {
          id: 426,
          title: "Deep Work",
          category: "Productivity",
          price: "₹450.00",
          img: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=500&fit=crop",
          rating: 5,
          reviews: 210,
          description: "Rules for focused success in a distracted world.",
        },
        {
          id: 427,
          title: "Essentialism",
          category: "Productivity",
          price: "₹380.00",
          img: "https://images.unsplash.com/photo-1497636577773-f1231844b336?w=400&h=500&fit=crop",
          rating: 4,
          reviews: 220,
          description: "The disciplined pursuit of less.",
        },
        {
          id: 428,
          title: "The One Thing",
          category: "Productivity",
          price: "₹370.00",
          img: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=500&fit=crop",
          rating: 5,
          reviews: 170,
          description: "The surprisingly simple truth behind extraordinary results.",
        }
      ]
    }
  };

 export default function ExploreCategories() {
  return (
    <CollectionPage
      collections={allCategories}
      basePath="/explore-categories"
      heading="Explore All Categories"
      subheading="Find your next favourite read across every genre."
    />
  );
}