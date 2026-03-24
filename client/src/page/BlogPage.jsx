import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Calendar, Clock, Search } from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    title: "The Art of Handloom: A Journey Through Time",
    excerpt: "Discover the ancient weaving traditions that have been passed down through generations of master artisans in India.",
    category: "Heritage",
    date: "March 15, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?q=80&w=800&auto=format&fit=crop",
    featured: true
  },
  {
    id: 2,
    title: "Understanding Silk: Types, Origins & Care Tips",
    excerpt: "A comprehensive guide to different silk varieties - from Katan to Tussar, and how to maintain their natural lustre.",
    category: "Guide",
    date: "March 10, 2026",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "The Weaver's Story: Preserving Traditions",
    excerpt: "Meet the skilled artisans whose hands bring each piece to life, keeping centuries-old techniques alive.",
    category: "Stories",
    date: "March 5, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1595039838779-f3780873afdd?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Sustainable Fashion: Why Handloom Matters",
    excerpt: "How choosing handwoven fabrics supports ethical fashion and empowers rural artisan communities.",
    category: "Sustainability",
    date: "February 28, 2026",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 5,
    title: "Styling Your Silk Saree: Modern Interpretations",
    excerpt: "Traditional drape, contemporary twist - explore modern ways to style your handloom sarees.",
    category: "Style",
    date: "February 20, 2026",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 6,
    title: "Natural Dyes: The Colors of Nature",
    excerpt: "Explore the ancient art of botanical dyeing - from indigo blues to madder reds.",
    category: "Craft",
    date: "February 15, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?q=80&w=800&auto=format&fit=crop"
  }
];

const categories = ["All", "Heritage", "Guide", "Stories", "Sustainability", "Style", "Craft"];

const BlogPage = () => {
  const [visible, setVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const ref = useRef(null);

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

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = filteredPosts.find(post => post.featured) || filteredPosts[0];
  const regularPosts = filteredPosts.filter(post => post.id !== featuredPost?.id);

  return (
    <div ref={ref} className="bg-[#FCF9F6] min-h-screen">
      {/* Hero */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-[#5C4033] opacity-90" />
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        
        <div className={`relative z-10 max-w-4xl mx-auto px-4 text-center transition-all duration-700 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <span className="text-amber-300 text-xs font-bold uppercase tracking-[0.3em] mb-4 block">The Journal</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-6">
            Stories of <span className="italic text-amber-200">Handloom</span> & Heritage
          </h1>
          <p className="text-white/70 text-lg font-light max-w-2xl mx-auto">
            Discover the art, craft, and stories behind every handwoven piece
          </p>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="max-w-7xl mx-auto px-4 -mt-8 relative z-20">
        <div className="bg-white rounded-xl shadow-xl p-4 md:p-6">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            {/* Categories */}
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-medium uppercase tracking-wider transition-all ${
                    activeCategory === cat
                      ? "bg-[#5C4033] text-white"
                      : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            
            {/* Search */}
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-lg text-sm focus:outline-none focus:border-[#5C4033] transition-colors"
              />
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="max-w-7xl mx-auto px-4 py-12 md:py-16">
          <div className={`transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <span className="text-amber-700 text-xs font-bold uppercase tracking-[0.2em] mb-4 block">Featured</span>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="aspect-[4/3] overflow-hidden rounded-xl shadow-lg">
                <img 
                  src={featuredPost.image} 
                  alt={featuredPost.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-xs text-stone-500">
                  <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full font-medium">{featuredPost.category}</span>
                  <span className="flex items-center gap-1"><Calendar size={12} /> {featuredPost.date}</span>
                  <span className="flex items-center gap-1"><Clock size={12} /> {featuredPost.readTime}</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-serif text-[#5C4033] leading-tight">
                  {featuredPost.title}
                </h2>
                <p className="text-stone-600 font-light leading-relaxed">
                  {featuredPost.excerpt}
                </p>
                <button className="group inline-flex items-center gap-2 text-[#5C4033] hover:text-amber-700 font-medium transition-colors">
                  Read Article <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Regular Posts Grid */}
      <section className="max-w-7xl mx-auto px-4 pb-16 md:pb-24">
        <h3 className="text-xl font-serif text-[#5C4033] mb-8">Latest Articles</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularPosts.map((post, idx) => (
            <article 
              key={post.id}
              className={`bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${idx * 100 + 200}ms` }}
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-3 text-xs text-stone-500">
                  <span className="px-2 py-1 bg-stone-100 text-stone-600 rounded font-medium">{post.category}</span>
                  <span>{post.date}</span>
                </div>
                <h4 className="text-lg font-serif text-stone-800 group-hover:text-[#5C4033] transition-colors line-clamp-2">
                  {post.title}
                </h4>
                <p className="text-sm text-stone-500 font-light line-clamp-2">
                  {post.excerpt}
                </p>
                <button className="text-xs font-medium uppercase tracking-wider text-amber-700 hover:text-amber-900 transition-colors">
                  Read More →
                </button>
              </div>
            </article>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-stone-500">No articles found matching your criteria.</p>
            <button 
              onClick={() => {setActiveCategory("All"); setSearchQuery("");}}
              className="mt-4 text-amber-700 hover:text-amber-900 font-medium"
            >
              Clear filters
            </button>
          </div>
        )}
      </section>

      {/* Newsletter CTA */}
      <section className="bg-[#5C4033] py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h3 className="text-2xl md:text-3xl font-serif text-white mb-4">
            Stay Connected
          </h3>
          <p className="text-white/70 mb-8 font-light">
            Subscribe to receive stories of artisans, weaving techniques, and exclusive collection previews.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Your email address"
              className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/40"
            />
            <button className="px-6 py-3 bg-amber-600 text-white font-medium rounded-lg hover:bg-amber-500 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
