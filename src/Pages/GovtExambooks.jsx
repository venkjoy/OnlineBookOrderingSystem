import CollectionPage from "../components/CollectionPage";

  const govtExamBooks = {
    ssc: {
      title: "SSC Exam Books",
      description: "Staff Selection Commission exam preparation materials",
      icon: "📚",
      books: [
        {
          id: 301,
          title: "SSC CGL Tier I & II Guide",
          category: "SSC",
          price: "₹650.00",
          img: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=500&fit=crop",
          rating: 5,
          reviews: 320,
          isNew: true,
          description: "Complete guide for SSC CGL examination with solved papers."
        },
        {
          id: 302,
          title: "SSC CHSL Practice Workbook",
          category: "SSC",
          price: "₹480.00",
          img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
          rating: 4,
          reviews: 180,
          isNew: false,
          description: "Practice workbook for SSC CHSL with previous year questions."
        },
        {
          id: 303,
          title: "Quantitative Aptitude for SSC",
          category: "SSC",
          price: "₹550.00",
          img: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=500&fit=crop",
          rating: 5,
          reviews: 250,
          isNew: true,
          description: "Comprehensive quantitative aptitude guide for SSC exams."
        },
        {
          id: 304,
          title: "General Awareness for SSC",
          category: "SSC",
          price: "₹420.00",
          img: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=500&fit=crop",
          rating: 4,
          reviews: 190,
          isNew: false,
          description: "Current affairs and general knowledge for SSC exams."
        },
        {
          id: 305,
          title: "SSC English Language Guide",
          category: "SSC",
          price: "₹380.00",
          img: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&h=500&fit=crop",
          rating: 5,
          reviews: 210,
          isNew: true,
          description: "Complete English language preparation for SSC."
        },
        {
          id: 306,
          title: "SSC Reasoning Ability",
          category: "SSC",
          price: "₹450.00",
          img: "https://images.unsplash.com/photo-1497636577773-f1231844b336?w=400&h=500&fit=crop",
          rating: 4,
          reviews: 170,
          isNew: false,
          description: "Logical reasoning and analytical ability for SSC."
        }
      ]
    },
    banking: {
      title: "Banking Exam Books",
      description: "Banking and financial sector exam guides",
      icon: "🏦",
      books: [
        {
          id: 307,
          title: "IBPS PO Complete Guide",
          category: "Banking",
          price: "₹720.00",
          img: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=500&fit=crop",
          rating: 5,
          reviews: 280,
          isNew: true,
          description: "Complete preparation guide for IBPS PO examination."
        },
        {
          id: 308,
          title: "SBI Clerk Practice Set",
          category: "Banking",
          price: "₹520.00",
          img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
          rating: 4,
          reviews: 150,
          isNew: false,
          description: "Practice sets and mock tests for SBI Clerk exam."
        },
        {
          id: 309,
          title: "Banking Awareness 2024",
          category: "Banking",
          price: "₹380.00",
          img: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=500&fit=crop",
          rating: 5,
          reviews: 220,
          isNew: true,
          description: "Updated banking awareness and financial knowledge."
        },
        {
          id: 310,
          title: "RBI Grade B Officer Guide",
          category: "Banking",
          price: "₹850.00",
          img: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=500&fit=crop",
          rating: 5,
          reviews: 190,
          isNew: true,
          description: "Comprehensive guide for RBI Grade B officer exam."
        },
        {
          id: 311,
          title: "Banking Quantitative Aptitude",
          category: "Banking",
          price: "₹480.00",
          img: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&h=500&fit=crop",
          rating: 4,
          reviews: 200,
          isNew: false,
          description: "Quantitative aptitude specifically for banking exams."
        },
        {
          id: 312,
          title: "Computer Awareness for Banking",
          category: "Banking",
          price: "₹350.00",
          img: "https://images.unsplash.com/photo-1497636577773-f1231844b336?w=400&h=500&fit=crop",
          rating: 4,
          reviews: 160,
          isNew: true,
          description: "Computer knowledge and awareness for banking exams."
        }
      ]
    },
    upsc: {
      title: "UPSC Civil Services",
      description: "Union Public Service Commission civil services preparation",
      icon: "🎯",
      books: [
        {
          id: 313,
          title: "UPSC Civil Services Prelims",
          category: "UPSC",
          price: "₹950.00",
          img: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=500&fit=crop",
          rating: 5,
          reviews: 350,
          isNew: true,
          description: "Complete guide for UPSC Civil Services Preliminary exam."
        },
        {
          id: 314,
          title: "Indian Polity for UPSC",
          category: "UPSC",
          price: "₹680.00",
          img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
          rating: 5,
          reviews: 420,
          isNew: false,
          description: "Comprehensive Indian Polity and Constitution guide."
        },
        {
          id: 315,
          title: "History of Modern India",
          category: "UPSC",
          price: "₹720.00",
          img: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=500&fit=crop",
          rating: 5,
          reviews: 380,
          isNew: true,
          description: "Modern Indian history from 1857 to present."
        },
        {
          id: 316,
          title: "Geography of India",
          category: "UPSC",
          price: "₹650.00",
          img: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=500&fit=crop",
          rating: 4,
          reviews: 290,
          isNew: false,
          description: "Physical, economic and human geography of India."
        },
        {
          id: 317,
          title: "UPSC Mains General Studies",
          category: "UPSC",
          price: "₹880.00",
          img: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&h=500&fit=crop",
          rating: 5,
          reviews: 310,
          isNew: true,
          description: "General Studies papers for UPSC Mains examination."
        },
        {
          id: 318,
          title: "Current Affairs Yearbook 2024",
          category: "UPSC",
          price: "₹550.00",
          img: "https://images.unsplash.com/photo-1497636577773-f1231844b336?w=400&h=500&fit=crop",
          rating: 5,
          reviews: 270,
          isNew: true,
          description: "Comprehensive current affairs for UPSC preparation."
        }
      ]
    },
    railway: {
      title: "Railway Exam Books",
      description: "Railway Recruitment Board exam materials",
      icon: "📊",
      books: [
        {
          id: 319,
          title: "RRB NTPC Guide",
          category: "Railway",
          price: "₹580.00",
          img: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=500&fit=crop",
          rating: 4,
          reviews: 180,
          isNew: true,
          description: "Complete guide for RRB NTPC examination."
        },
        {
          id: 320,
          title: "Railway Group D Practice Book",
          category: "Railway",
          price: "₹420.00",
          img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
          rating: 4,
          reviews: 140,
          isNew: false,
          description: "Practice book for Railway Group D recruitment."
        },
        {
          id: 321,
          title: "RRB JE Electrical Engineering",
          category: "Railway",
          price: "₹680.00",
          img: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=500&fit=crop",
          rating: 5,
          reviews: 120,
          isNew: true,
          description: "Electrical engineering guide for RRB JE exam."
        },
        {
          id: 322,
          title: "Railway Aptitude Test",
          category: "Railway",
          price: "₹380.00",
          img: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=500&fit=crop",
          rating: 4,
          reviews: 95,
          isNew: false,
          description: "Aptitude test preparation for railway exams."
        },
        {
          id: 323,
          title: "RRB ALP Technician Guide",
          category: "Railway",
          price: "₹520.00",
          img: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&h=500&fit=crop",
          rating: 4,
          reviews: 110,
          isNew: true,
          description: "Guide for RRB ALP and Technician positions."
        },
        {
          id: 324,
          title: "Railway General Science",
          category: "Railway",
          price: "₹350.00",
          img: "https://images.unsplash.com/photo-1497636577773-f1231844b336?w=400&h=500&fit=crop",
          rating: 4,
          reviews: 130,
          isNew: false,
          description: "General science for railway competitive exams."
        }
      ]
    },
    defense: {
      title: "Defense Exam Books",
      description: "Defense services and military exam preparation",
      icon: "⚖️",
      books: [
        {
          id: 325,
          title: "NDA/NA Complete Guide",
          category: "Defense",
          price: "₹780.00",
          img: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=500&fit=crop",
          rating: 5,
          reviews: 210,
          isNew: true,
          description: "Complete guide for NDA and NA entrance examination."
        },
        {
          id: 326,
          title: "CDS Mathematics",
          category: "Defense",
          price: "₹620.00",
          img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
          rating: 5,
          reviews: 180,
          isNew: false,
          description: "Mathematics preparation for CDS examination."
        },
        {
          id: 327,
          title: "AFCAT Flying Branch",
          category: "Defense",
          price: "₹680.00",
          img: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=500&fit=crop",
          rating: 4,
          reviews: 150,
          isNew: true,
          description: "Guide for AFCAT flying branch examination."
        },
        {
          id: 328,
          title: "SSB Interview Guide",
          category: "Defense",
          price: "₹450.00",
          img: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=500&fit=crop",
          rating: 5,
          reviews: 190,
          isNew: false,
          description: "Complete guide for SSB interview process."
        },
        {
          id: 329,
          title: "Defense General Knowledge",
          category: "Defense",
          price: "₹380.00",
          img: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&h=500&fit=crop",
          rating: 4,
          reviews: 160,
          isNew: true,
          description: "General knowledge specific to defense exams."
        },
        {
          id: 330,
          title: "Military History of India",
          category: "Defense",
          price: "₹520.00",
          img: "https://images.unsplash.com/photo-1497636577773-f1231844b336?w=400&h=500&fit=crop",
          rating: 4,
          reviews: 140,
          isNew: false,
          description: "Indian military history for defense examinations."
        }
      ]
    }
  };

 export default function GovtExamBooks() {
  return (
    <CollectionPage
      collections={govtExamBooks}
      basePath="/govt-exams"
      heading="Government Exam Preparation"
      subheading="Top-rated books for every major competitive exam."
    />
  );
}