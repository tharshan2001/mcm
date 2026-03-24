import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Leaf, Users, ZapOff, ArrowRight } from 'lucide-react';
import SI01 from "../assets/SI-01.jpg";
import SI02 from "../assets/SI-02.jpg";

const BrandStory = () => {
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

  const pillars = [
    {
      icon: <ZapOff size={22} />,
      title: "Zero Electricity",
      desc: "Every thread interlaced by human rhythm"
    },
    {
      icon: <Leaf size={22} />,
      title: "Earth-First Dyes",
      desc: "Natural indigo, madder & marigold"
    },
    {
      icon: <Users size={22} />,
      title: "Fair Share",
      desc: "80% goes to the weaver's household"
    }
  ];

  return (
    <section ref={ref} className="bg-stone-50 py-20 md:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Left: Visual */}
          <div className={`relative w-full lg:w-1/2 transition-all duration-1000 ${
            visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
          }`}>
            <div className="relative z-10 w-full md:w-4/5 aspect-[4/5] overflow-hidden shadow-2xl">
              <img 
                src={SI01}
                alt="Artisan at work" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="absolute -bottom-8 -right-2 md:-right-8 z-20 w-2/5 aspect-square border-4 md:border-8 border-stone-50 overflow-hidden shadow-xl hidden md:block">
              <img 
                src={SI02} 
                alt="Close up of fabric" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right: Content */}
          <div className={`w-full lg:w-1/2 space-y-8 transition-all duration-1000 delay-300 ${
            visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
          }`}>
            <div className="space-y-5">
              <span className="text-amber-700 text-xs font-bold uppercase tracking-[0.3em]">Our Story</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#5C4033] leading-tight">
                Weaving <span className="italic">Heritage</span>, One Thread at a Time
              </h2>
              <p className="text-stone-600 font-light leading-relaxed text-base md:text-lg max-w-lg">
                Each piece represents days of meticulous craftsmanship—hours of rhythmic shuttle movements, generations of passed-down wisdom, and the unwavering dedication of master weavers.
              </p>
            </div>

            {/* Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-stone-200">
              {pillars.map((pillar, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="text-amber-700 bg-amber-50 w-10 h-10 flex items-center justify-center rounded-full">
                    {pillar.icon}
                  </div>
                  <h5 className="font-medium text-stone-800 text-sm">{pillar.title}</h5>
                  <p className="text-xs text-stone-500 font-light">
                    {pillar.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <button 
                onClick={() => navigate('/about')}
                className="group inline-flex items-center gap-3 text-[#5C4033] hover:text-amber-700 transition-colors"
              >
                <span className="text-sm font-semibold uppercase tracking-wider">Discover Our Journey</span>
                <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default BrandStory;