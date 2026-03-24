import React, { useEffect, useRef, useState } from 'react';
import { Truck, RotateCcw, ShieldCheck, Award } from 'lucide-react';

const features = [
  {
    icon: <Truck size={24} strokeWidth={1.5} />,
    title: "Free Shipping",
    desc: "Island-wide on orders over LKR 10,000"
  },
  {
    icon: <RotateCcw size={24} strokeWidth={1.5} />,
    title: "Easy Returns",
    desc: "30-day hassle-free returns"
  },
  {
    icon: <ShieldCheck size={24} strokeWidth={1.5} />,
    title: "Secure Payment",
    desc: "100% secure checkout"
  },
  {
    icon: <Award size={24} strokeWidth={1.5} />,
    title: "Handloom Certified",
    desc: "Authentic artisan crafted"
  }
];

const Features = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="bg-stone-100 py-12 border-y border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, idx) => (
            <div 
              key={idx} 
              className={`flex items-center gap-4 transition-all duration-500 ${
                visible ? 'opacity-100 translate-x-0' : idx % 2 === 0 ? 'opacity-0 -translate-x-4' : 'opacity-0 translate-x-4'
              }`}
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              <div className="w-12 h-12 flex items-center justify-center bg-[#5C4033] text-amber-400 shrink-0">
                {feature.icon}
              </div>
              <div>
                <h3 className="text-stone-900 font-semibold text-sm uppercase tracking-wide">
                  {feature.title}
                </h3>
                <p className="text-stone-500 text-xs">
                  {feature.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
