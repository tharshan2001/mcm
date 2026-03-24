import React from "react";
import HeroCarousel from "../components/HeroCarousel";
import Features from "../components/Features";
import CategoryShowcase from "../components/CategoryShowcase";
import TrendingProducts from "../components/TrendingProducts";
import BrandStory from "../components/BrandStory";
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <div>
      <div>
        <HeroCarousel />
        <CategoryShowcase />
        <TrendingProducts />
        <BrandStory />
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
