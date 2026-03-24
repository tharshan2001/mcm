// client/src/components/About.jsx
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Globe, Award, Leaf, ArrowRight, Sparkles } from 'lucide-react';
import SI01 from "../assets/SI-01.jpg";
import SI02 from "../assets/SI-02.jpg";
import SI03 from "../assets/HI-03.jpeg";

const stats = [
  { value: "50+", label: "Master Weavers" },
  { value: "10K+", label: "Happy Customers" },
  { value: "80%", label: "Profit to Artisans" },
  { value: "100%", label: "Handwoven" }
];

const values = [
  {
    icon: <Globe size={28} strokeWidth={1.5} />,
    title: "Radical Transparency",
    desc: "Every piece comes with a digital certificate tracing it back to the specific cluster and weaver."
  },
  {
    icon: <Heart size={28} strokeWidth={1.5} />,
    title: "Community First",
    desc: "We reinvest in weaving clusters, providing healthcare and education for artisan families."
  },
  {
    icon: <Leaf size={28} strokeWidth={1.5} />,
    title: "Honest Materials",
    desc: "Only GOTS-certified organic cotton, AHIMSA silk, and natural botanical dyes."
  }
];

const process = [
  { step: "01", title: "Botanical Dyeing", desc: "Raw yarns are dipped in vats of indigo, madder, or turmeric for days." },
  { step: "02", title: "Hand Spun", desc: "The yarn is spun onto bobbins using traditional wooden charkhas." },
  { step: "03", title: "The Loom", desc: "Master weavers set the warp. This can take up to 4 days before a single inch is woven." },
  { step: "04", title: "Final Finish", desc: "The fabric is washed in the sun and checked for the artisan's signature weave pattern." }
];

const About = () => {
  const [visibleSections, setVisibleSections] = useState({});
  const heroRef = useRef(null);
  const philosophyRef = useRef(null);
  const statsRef = useRef(null);
  const valuesRef = useRef(null);
  const processRef = useRef(null);
  const ctaRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({
              ...prev,
              [entry.target.dataset.section]: true,
            }));
          }
        });
      },
      { threshold: 0.15 }
    );

    const refs = [heroRef, philosophyRef, statsRef, valuesRef, processRef, ctaRef];
    refs.forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-[#FCF9F6] min-h-screen">
      {/* Hero Section */}
      <section 
        ref={heroRef} 
        data-section="hero"
        className="relative h-[70vh] flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <img 
            src={SI01}
            className="w-full h-full object-cover"
            alt="Handloom weaving"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-900/60 via-stone-900/40 to-stone-900/70" />
        </div>
        
        <div className={`relative z-10 text-center px-4 max-w-3xl transition-all duration-1000 ${
          visibleSections.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <span className="text-amber-300 text-xs font-bold uppercase tracking-[0.4em] mb-6 block">Our Heritage</span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white leading-tight mb-6">
            Slow Craft for a <br /> <span className="italic text-amber-200">Fast World</span>
          </h1>
          <p className="text-white/80 text-lg font-light max-w-xl mx-auto">
            Preserving the ancient art of handloom weaving, one thread at a time
          </p>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-white/50 rounded-full" />
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section 
        ref={philosophyRef} 
        data-section="philosophy"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className={`space-y-8 transition-all duration-1000 ${
            visibleSections.philosophy ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
          }`}>
            <div>
              <span className="text-amber-700 text-xs font-bold uppercase tracking-[0.3em] mb-4 block">Our Philosophy</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#5C4033] leading-tight">
                We don't just sell fabric. <br /> We preserve a <span className="italic">heartbeat</span>.
              </h2>
            </div>
            <div className="space-y-6">
              <p className="text-stone-600 font-light leading-relaxed text-lg">
                Founded in 2024, Loom & Craft was born out of a simple observation: the rhythmic clack of the handloom was fading. We realized that when a weaver leaves their craft for a factory job, we don't just lose a product—we lose a thousand years of geometry, math, and poetry.
              </p>
              <p className="text-stone-600 font-light leading-relaxed">
                Our mission is to bridge the gap between rural master weavers and the global conscious consumer. By removing middlemen and ensuring 80% of profits reach the artisan, we make slow fashion a sustainable livelihood.
              </p>
            </div>
          </div>
          
          <div className={`relative transition-all duration-1000 delay-300 ${
            visibleSections.philosophy ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
          }`}>
            <div className="aspect-[4/5] overflow-hidden shadow-2xl">
              <img 
                src={SI02} 
                alt="Artisan hands" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 md:-bottom-8 md:-left-8 bg-white p-6 md:p-8 shadow-xl max-w-xs border-l-4 border-amber-700">
              <Sparkles className="text-amber-600 mb-3" size={24} />
              <p className="text-sm italic font-serif text-stone-700 leading-relaxed">
                "A machine can copy a pattern, but only a human hand can imbue it with a soul."
              </p>
              <p className="text-xs font-bold uppercase tracking-widest mt-4 text-amber-700">— Master Weaver</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section 
        ref={statsRef} 
        data-section="stats"
        className="bg-[#5C4033] py-16 md:py-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, idx) => (
              <div 
                key={idx}
                className={`text-center transition-all duration-700 ${
                  visibleSections.stats ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div className="text-3xl md:text-5xl font-serif text-amber-300 mb-2">{stat.value}</div>
                <div className="text-white/70 text-sm uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section 
        ref={valuesRef} 
        data-section="values"
        className="bg-stone-900 text-white py-24 md:py-32"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-700 ${
            visibleSections.values ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <span className="text-amber-400 text-xs font-bold uppercase tracking-[0.3em] mb-4 block">What We Stand For</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif">Our <span className="italic text-amber-200">Core Values</span></h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {values.map((value, idx) => (
              <div 
                key={idx}
                className={`text-center p-8 rounded-2xl bg-stone-800/50 hover:bg-stone-800 transition-all duration-500 group ${
                  visibleSections.values ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${idx * 150 + 200}ms` }}
              >
                <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full bg-amber-600/20 text-amber-400 group-hover:bg-amber-600 group-hover:text-white transition-all duration-300">
                  {value.icon}
                </div>
                <h3 className="text-xl font-serif mb-4">{value.title}</h3>
                <p className="text-stone-400 text-sm font-light leading-relaxed">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section 
        ref={processRef} 
        data-section="process"
        className="max-w-4xl mx-auto px-4 py-24 md:py-32"
      >
        <div className={`text-center mb-16 transition-all duration-700 ${
          visibleSections.process ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <span className="text-amber-700 text-xs font-bold uppercase tracking-[0.3em] mb-4 block">The Craft</span>
          <h2 className="text-3xl md:text-4xl font-serif text-[#5C4033]">
            The Lifecycle of a <span className="italic">Weave</span>
          </h2>
        </div>
        
        <div className="space-y-0">
          {process.map((item, index) => (
            <div 
              key={index}
              className={`flex gap-6 md:gap-10 items-start py-8 border-b border-stone-200 transition-all duration-700 ${
                visibleSections.process ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
              }`}
              style={{ transitionDelay: `${index * 150 + 200}ms` }}
            >
              <div className="flex-shrink-0 w-16 md:w-20">
                <span className="text-3xl md:text-4xl font-serif text-amber-300">{item.step}</span>
              </div>
              <div className="pt-2">
                <h4 className="text-lg md:text-xl font-serif text-stone-800 mb-2">{item.title}</h4>
                <p className="text-stone-500 font-light text-sm md:text-base">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section 
        ref={ctaRef} 
        data-section="cta"
        className="relative py-24 md:py-32 overflow-hidden"
      >
        <div className="absolute inset-0">
          <img 
            src={SI03}
            className="w-full h-full object-cover"
            alt="Handloom texture"
          />
          <div className="absolute inset-0 bg-stone-900/80" />
        </div>
        
        <div className={`relative z-10 max-w-3xl mx-auto text-center px-4 transition-all duration-1000 ${
          visibleSections.cta ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-white mb-6">
            Own a Piece of <span className="italic text-amber-200">History</span>
          </h2>
          <p className="text-white/70 text-lg font-light mb-10 max-w-xl mx-auto">
            Every purchase supports master weavers and keeps ancient traditions alive for generations to come.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigate('/shop')}
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-amber-700 text-white text-sm font-semibold uppercase tracking-wider hover:bg-amber-600 transition-all"
            >
              Explore Collection
              <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => navigate('/contact')}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-white/30 text-white text-sm font-semibold uppercase tracking-wider hover:bg-white/10 transition-all"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;