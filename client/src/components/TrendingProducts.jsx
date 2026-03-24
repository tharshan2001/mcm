import React, { useEffect, useRef, useState } from 'react';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { fetchTrendingProducts } from '../service/product';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../stores/cartStore';

const TrendingProducts = () => {
  const [visible, setVisible] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const ref = useRef(null);
  const navigate = useNavigate();
  const { addItem } = useCartStore();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchTrendingProducts(4);
        setProducts(data || []);
      } catch (error) {
        console.error('Failed to fetch trending products:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleProductClick = (slug) => {
    navigate(`/product/${slug}`);
  };

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    addItem(product, 1);
  };

  return (
    <section ref={ref} className="bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className={`flex flex-col md:flex-row justify-between items-end mb-12 gap-6 transition-all duration-700 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="max-w-xl">
            <span className="text-amber-700 text-xs font-bold uppercase tracking-[0.25em] mb-4 block">
              Handpicked For You
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#5C4033] leading-tight">
              Trending <span className="italic">Favorites</span>
            </h2>
          </div>
          <button 
            onClick={() => navigate('/shop')}
            className="group flex items-center gap-2 text-stone-600 hover:text-[#5C4033] transition-colors text-sm font-medium uppercase tracking-wider"
          >
            View All Products
            <span className="transform group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[3/4] bg-stone-200 mb-4 rounded-lg" />
                <div className="h-3 bg-stone-200 mb-2 rounded w-1/3" />
                <div className="h-4 bg-stone-200 mb-2 rounded w-3/4" />
                <div className="h-3 bg-stone-200 mb-2 rounded w-full" />
                <div className="h-4 bg-stone-200 rounded w-1/4" />
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12 text-stone-500">
            No trending products available
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {products.map((product, idx) => (
              <div 
                key={product.id} 
                className={`group cursor-pointer transition-all duration-700 ${
                  visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${idx * 100}ms` }}
                onClick={() => handleProductClick(product.slug)}
              >
                {/* Image Container */}
                <div className="relative aspect-[3/4] overflow-hidden bg-stone-100 mb-4">
                  {product.isNew && (
                    <div className="absolute top-3 left-3 z-10">
                      <span className="bg-white/90 backdrop-blur-md px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-stone-800 shadow-sm">
                        New Arrival
                      </span>
                    </div>
                  )}
                  <img
                    src={product.images?.[0]?.url || product.imageUrl || 'https://via.placeholder.com/400x500'}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Hover Quick Actions */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/40 to-transparent">
                    <button 
                      onClick={(e) => handleAddToCart(e, product)}
                      className="w-full bg-white text-stone-900 py-3 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#5C4033] hover:text-white transition-colors"
                    >
                      <ShoppingCart size={14} /> Add to Cart
                    </button>
                  </div>
                  <button 
                    onClick={(e) => e.stopPropagation()}
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white text-stone-800 transition-colors shadow-sm opacity-0 group-hover:opacity-100"
                  >
                    <Heart size={18} />
                  </button>
                </div>

                {/* Product Info */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-stone-400 uppercase tracking-widest">
                      {product.category?.name || product.categoryName || 'Handloom'}
                    </span>
                  </div>
                  <h3 className="text-stone-800 font-medium group-hover:text-amber-800 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs text-stone-500 font-light leading-relaxed line-clamp-2">
                    {product.description}
                  </p>
                  <p className="text-stone-900 font-semibold pt-2">
                    LKR {product.price?.toLocaleString() || product.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TrendingProducts;