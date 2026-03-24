import React, { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Award, Truck, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import HI from "../assets/HI-01.jpg";
import HI2 from "../assets/HI-02.jpeg";
import HI3 from "../assets/HI-03.jpeg";



const HeroCarousel = () => {
  const slides = [
    {
      url: HI,
      title: "Handloom Heritage",
      subtitle: "Handwoven with love, worn with pride",
      cta: "Explore Collection",
      link: "/shop"
    },
    {
      url: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=2070&auto=format&fit=crop",
      title: "Silk & Tradition",
      subtitle: "Timeless elegance from village looms",
      cta: "Shop Silk Sarees",
      link: "/shop?category=silk"
    },
    {
      url: HI2,
      title: "Cotton Comfort",
      subtitle: "Breathable beauty for everyday grace",
      cta: "View Cotton",
      link: "/shop?category=cotton"
    },
    {
      url: HI3,
      title: "Artisan Stories",
      subtitle: "Each piece tells a weaver's tale",
      cta: "Our Story",
      link: "/about"
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = useCallback(() => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }, [currentIndex, slides.length]);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const handleCtaClick = (link) => {
    navigate(link);
  };

  return (
    <div className="relative w-full h-[60vh] md:h-[75vh] lg:h-[85vh] overflow-hidden bg-stone-900">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-out ${
            index === currentIndex
              ? "opacity-100 scale-100"
              : "opacity-0 scale-105"
          }`}
        >
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10" />

          <img
            src={slide.url}
            alt={slide.title}
            className="w-full h-full object-cover"
          />

          {/* Text Content */}
          <div className="absolute inset-0 z-20 flex flex-col justify-center px-8 md:px-16 lg:px-24 max-w-2xl">
            <div className={`transform transition-all duration-700 delay-300 ${
              index === currentIndex ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <p className="text-amber-300 text-xs md:text-sm font-medium tracking-[0.3em] uppercase mb-4">
                Handloom Excellence Since 2024
              </p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white leading-tight mb-4">
                {slide.title}
              </h2>
              <p className="text-white/80 text-lg md:text-xl font-light mb-8 max-w-lg">
                {slide.subtitle}
              </p>
              <button 
                onClick={() => handleCtaClick(slide.link)}
                className="group relative px-8 py-4 bg-amber-700 text-white overflow-hidden"
              >
                <span className="relative z-10 text-sm font-semibold tracking-widest uppercase group-hover:text-amber-900 transition-colors">
                  {slide.cta}
                </span>
                <div className="absolute inset-0 bg-amber-400 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
              </button>
            </div>
          </div>

          {/* Trust Badges */}
          <div className={`absolute bottom-20 md:bottom-24 left-8 md:left-16 z-20 flex gap-4 md:gap-8 transform transition-all duration-700 delay-500 ${
            index === currentIndex ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <div className="flex items-center gap-2 text-white/80">
              <Award size={18} className="text-amber-400" />
              <span className="text-xs tracking-wide">Silk Mark Certified</span>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-white/80">
              <Truck size={18} className="text-amber-400" />
              <span className="text-xs tracking-wide">Free Shipping</span>
            </div>
            <div className="hidden md:flex items-center gap-2 text-white/80">
              <Heart size={18} className="text-amber-400" />
              <span className="text-xs tracking-wide">Handwoven Love</span>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 -translate-y-1/2 left-4 md:left-8 z-30 p-2 md:p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all duration-300 backdrop-blur-sm border border-white/10 hover:scale-110"
      >
        <ChevronLeft size={24} strokeWidth={1.5} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 -translate-y-1/2 right-4 md:right-8 z-30 p-2 md:p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all duration-300 backdrop-blur-sm border border-white/10 hover:scale-110"
      >
        <ChevronRight size={24} strokeWidth={1.5} />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-1 transition-all duration-500 rounded-full ${
              index === currentIndex ? "w-12 bg-amber-400" : "w-3 bg-white/40 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
