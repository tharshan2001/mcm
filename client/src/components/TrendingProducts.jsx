import React from 'react';
import { Heart, ShoppingCart, Star } from 'lucide-react';

const products = [
  {
    id: 1,
    name: "Pastel Banarasi Organza",
    category: "Sarees",
    price: "$280",
    tag: "Trending 2026",
    image: "https://priyaodisha.com/cdn/shop/files/download_dcc25d49-66bc-4b9d-ace3-7bf8c42b1538.jpg?v=1762500197&width=1080",
    description: "Lightweight silk with a modern matte Zari border."
  },
  {
    id: 2,
    name: "3D Jacquard Cotton Throw",
    category: "Home Decor",
    price: "$85",
    tag: "Hyper-Texture",
    image: "https://www.odikala.com/cdn/shop/files/TRI3D__dress261__all_set0_nomo_cr_dupatta_2__2025-10-13-11-42-15__1600X2400_1def020f-b13b-43b4-8035-c5c049f042dd_800x.jpg?v=1760336098",
    description: "Bio-crafted regenerative cotton in Mineral Green."
  },
  {
    id: 3,
    name: "Tussar-Linen Fusion Saree",
    category: "Sarees",
    price: "$195",
    tag: "Artisan Choice",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0DIYkBlEJjS0DkE1S2PMkTRbpugQaad0sHw&s",
    description: "Hand-spun yarns dyed with botanical terracotta pigments."
  },
  {
    id: 4,
    name: "Hand-Carved Acacia Tray",
    category: "Dining",
    price: "$45",
    tag: "Eco-Friendly",
    image: "https://itokri.com/cdn/shop/files/green-handloom-cotton-mangalagiri-3pc-unstitched-dress-material-04-771.jpg?v=1771842401&width=480",
    description: "Sustainably sourced wood with a hand-rubbed oil finish."
  }
];

const TrendingProducts = () => {
  return (
    <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-xl">
            <span className="text-amber-800 text-xs font-bold uppercase tracking-[0.2em] mb-4 block">
              The 2026 Collection
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-[#5C4033] leading-tight">
              Trending Designs: Where Tradition Meets <span className="italic">Soft Luxe</span>
            </h2>
          </div>
          <button className="text-stone-800 border-b border-stone-800 pb-1 font-medium hover:text-amber-800 hover:border-amber-800 transition-all uppercase text-xs tracking-widest">
            View All Products
          </button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {products.map((product) => (
            <div key={product.id} className="group cursor-pointer">
              {/* Image Container */}
              <div className="relative aspect-[3/4] overflow-hidden bg-stone-100 mb-4">
                <div className="absolute top-3 left-3 z-10">
                  <span className="bg-white/90 backdrop-blur-md px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-stone-800 shadow-sm">
                    {product.tag}
                  </span>
                </div>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Hover Quick Actions */}
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/40 to-transparent">
                  <button className="w-full bg-white text-stone-900 py-3 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#5C4033] hover:text-white transition-colors">
                    <ShoppingCart size={14} /> Add to Cart
                  </button>
                </div>
                <button className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white text-stone-800 transition-colors shadow-sm opacity-0 group-hover:opacity-100">
                  <Heart size={18} />
                </button>
              </div>

              {/* Product Info */}
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-stone-400 uppercase tracking-widest">{product.category}</span>

                </div>
                <h3 className="text-stone-800 font-medium group-hover:text-amber-800 transition-colors">
                  {product.name}
                </h3>
                <p className="text-xs text-stone-500 font-light leading-relaxed">
                  {product.description}
                </p>
                <p className="text-stone-900 font-semibold pt-2">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingProducts;