import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const categories = [
  {
    id: 1,
    name: "Silk Sarees",
    description: "Katan, Tussar & Pure Silk",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop",
    slug: "silk"
  },
  {
    id: 2,
    name: "Cotton",
    description: "Handloom Cotton & Mul",
    image: "https://images.unsplash.com/photo-1595039838779-f3780873afdd?q=80&w=800&auto=format&fit=crop",
    slug: "cotton"
  },
  {
    id: 3,
    name: "Linen",
    description: "Pure Linen & Blends",
    image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?q=80&w=800&auto=format&fit=crop",
    slug: "linen"
  },
  {
    id: 4,
    name: "Home Linens",
    description: "Curtains, Cushions & More",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800&auto=format&fit=crop",
    slug: "home"
  }
];

const CategoryShowcase = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleCategoryClick = (slug) => {
    navigate(`/shop?category=${slug}`);
  };

  return (
    <section ref={ref} className="bg-[#FAF7F2] py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <span className="text-amber-700 text-xs font-bold uppercase tracking-[0.25em] mb-4 block">
            Curated Collections
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#5C4033] mb-4">
            Shop by <span className="italic">Category</span>
          </h2>
          <p className="text-stone-500 max-w-xl mx-auto font-light">
            Discover our handpicked selection of authentic handloom textiles
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category, idx) => (
            <div 
              key={category.id}
              className={`group relative overflow-hidden cursor-pointer transition-all duration-700 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${idx * 100}ms` }}
              onClick={() => handleCategoryClick(category.slug)}
            >
              {/* Image */}
              <div className="aspect-[3/4] md:aspect-[4/5] overflow-hidden">
                <img 
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              </div>

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6">
                <h3 className="text-white text-lg md:text-xl font-serif mb-1 group-hover:text-amber-300 transition-colors">
                  {category.name}
                </h3>
                <p className="text-white/70 text-xs md:text-sm font-light">
                  {category.description}
                </p>
                <div className="mt-3 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  <span className="text-amber-300 text-xs uppercase tracking-widest border-b border-amber-300 pb-1">
                    Explore
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase;
