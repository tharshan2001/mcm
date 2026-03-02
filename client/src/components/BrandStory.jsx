import React from 'react';
import { Leaf, Users, ShieldCheck, ZapOff } from 'lucide-react';

const BrandStory = () => {
  const pillars = [
    {
      icon: <ZapOff size={24} />,
      title: "Zero Electricity",
      desc: "Every thread is interlaced by human rhythm, not a power grid."
    },
    {
      icon: <Leaf size={24} />,
      title: "Earth-First Dyes",
      desc: "We use indigo, madder root, and marigold—not synthetic chemicals."
    },
    {
      icon: <Users size={24} />,
      title: "Fair Share",
      desc: "80% of every sale goes directly back to the weaver's household."
    }
  ];

  return (
    <section className="bg-[#FCF9F6] py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left: Visual Storytelling */}
          <div className="relative w-full lg:w-1/2">
            <div className="relative z-10 w-4/5 aspect-[4/5] overflow-hidden rounded-sm shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1621939514649-280e2ee25f60?q=80&w=2070&auto=format&fit=crop" 
                alt="Artisan at work" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            {/* Overlapping secondary image */}
            <div className="absolute -bottom-10 -right-4 z-20 w-1/2 aspect-square border-8 border-[#FCF9F6] overflow-hidden rounded-sm shadow-xl hidden md:block">
              <img 
                src="https://images.unsplash.com/photo-1528459105426-b923161e5981?q=80&w=2060&auto=format&fit=crop" 
                alt="Close up of fabric" 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative Element */}
            <div className="absolute top-1/2 -left-8 -translate-y-1/2 w-32 h-32 border-2 border-amber-200 rounded-full opacity-50 -z-0" />
          </div>

          {/* Right: Content */}
          <div className="w-full lg:w-1/2 space-y-8">
            <div className="space-y-4">
              <h4 className="text-amber-800 text-xs font-bold uppercase tracking-[0.3em]">Our Soul</h4>
              <h2 className="text-4xl md:text-5xl font-serif text-[#5C4033] leading-tight">
                A Thread That Connects <span className="italic">Past to Future</span>.
              </h2>
              <p className="text-stone-600 font-light leading-relaxed text-lg">
                At Loom & Craft, we believe a saree isn't just six yards of fabric—it's 14 days of a weaver's life, a rhythmic dance of the shuttle, and a century of passed-down wisdom. In a world of fast fashion, we choose the slow road.
              </p>
            </div>

            {/* Pillars Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-stone-200">
              {pillars.map((pillar, idx) => (
                <div key={idx} className="space-y-3">
                  <div className="text-amber-800 bg-amber-50 w-fit p-3 rounded-full">
                    {pillar.icon}
                  </div>
                  <h5 className="font-serif text-[#5C4033] text-lg">{pillar.title}</h5>
                  <p className="text-xs text-stone-500 font-light leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-6">
              <button className="bg-[#5C4033] text-white px-10 py-4 text-xs font-bold uppercase tracking-widest hover:bg-amber-900 transition-all shadow-lg hover:shadow-amber-200/50">
                Meet the Weavers
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default BrandStory;