import React, { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import HI from "../assets/HI-01.jpg";
import HI2 from "../assets/HI-02.jpeg";
import HI3 from "../assets/HI-03.jpeg";



const HeroCarousel = () => {
  const slides = [
    {
      url: HI,
      title: "Exclusive Local Craft",
      subtitle: "Featured Artisan Piece",
    },
    {
      url: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=2070&auto=format&fit=crop",
      title: "Hand-Woven Elegance",
      subtitle: "The Summer Silk Collection",
    },
    {
      url: HI2,
      title: "Sustainable Craft",
      subtitle: "Organic Cotton Home Linens",
    },
    {
      url: HI3,
      title: "Artisan Traditions",
      subtitle: "Directly from Village Looms",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

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

  // Auto-play logic
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <div className="relative w-full h-[500px] md:h-[650px] group overflow-hidden bg-stone-100">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === currentIndex
              ? "opacity-100 scale-105"
              : "opacity-0 scale-100"
          } transition-transform duration-[2000ms]`}
        >
          {/* Overlay for readability */}
          <div className="absolute inset-0 bg-black/30 z-10" />

          <img
            src={slide.url}
            alt={slide.title}
            className="w-full h-full object-cover"
          />

          {/* Text Content */}
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white px-4 text-center">
            <h2 className="text-4xl md:text-6xl font-serif font-light mb-4 tracking-tight">
              {slide.title}
            </h2>
            <p className="text-lg md:text-xl font-light tracking-widest uppercase mb-8">
              {slide.subtitle}
            </p>
            <button className="px-8 py-3 bg-white text-stone-900 hover:bg-[#5C4033] hover:text-white transition-all duration-300 font-medium tracking-wider">
              SHOP COLLECTION
            </button>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="hidden group-hover:block absolute top-1/2 -translate-y-1/2 left-5 z-30 p-2 bg-white/20 hover:bg-white text-white hover:text-stone-900 rounded-full transition-all duration-300 backdrop-blur-sm"
      >
        <ChevronLeft size={32} strokeWidth={1.5} />
      </button>
      <button
        onClick={nextSlide}
        className="hidden group-hover:block absolute top-1/2 -translate-y-1/2 right-5 z-30 p-2 bg-white/20 hover:bg-white text-white hover:text-stone-900 rounded-full transition-all duration-300 backdrop-blur-sm"
      >
        <ChevronRight size={32} strokeWidth={1.5} />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-1 transition-all duration-300 rounded-full ${
              index === currentIndex ? "w-8 bg-white" : "w-3 bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
