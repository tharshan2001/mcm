import React, { useState, useEffect, useCallback } from "react";
import { Tag, Check, Percent, ChevronLeft, ChevronRight, Gift } from "lucide-react";
import { fetchPublicCoupons } from "../../service/couponService";

const CouponCarousel = () => {
  const [coupons, setCoupons] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [copiedCode, setCopiedCode] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const fetchActiveCoupons = async () => {
      try {
        const data = await fetchPublicCoupons();
        const active = data.filter((c) => c.active);
        setCoupons(active || []);
      } catch (error) {
        console.error("Failed to fetch coupons:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchActiveCoupons();
  }, []);

  const goToSlide = useCallback((newIndex) => {
    if (isAnimating || newIndex === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(newIndex);
    setTimeout(() => setIsAnimating(false), 500);
  }, [currentIndex, isAnimating]);

  const nextSlide = useCallback(() => {
    const newIndex = (currentIndex + 1) % coupons.length;
    goToSlide(newIndex);
  }, [currentIndex, coupons.length, goToSlide]);

  const prevSlide = useCallback(() => {
    const newIndex = (currentIndex - 1 + coupons.length) % coupons.length;
    goToSlide(newIndex);
  }, [currentIndex, coupons.length, goToSlide]);

  useEffect(() => {
    if (coupons.length > 1) {
      const interval = setInterval(nextSlide, 3000);
      return () => clearInterval(interval);
    }
  }, [coupons.length, nextSlide]);

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  if (loading || coupons.length === 0) {
    return null;
  }

  const currentCoupon = coupons[currentIndex];

  return (
    <div className="flex justify-center">
      <div className="bg-gradient-to-r from-[#5C4033]/60 to-[#5C4033]/70 rounded-xl mx-2 sm:mx-4 w-full max-w-xl">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2.5 sm:py-3">
          {/* Top Row - Label */}
          <div className="flex items-center justify-center gap-2 mb-2">
            <Gift size={12} className="text-amber-300" />
            <span className="text-[10px] uppercase tracking-widest text-amber-200/80">
              Collect Your Coupons
            </span>
          </div>

          {/* Main Row */}
          <div className="flex items-center justify-between gap-2">
            {/* Navigation Arrow - Left */}
            {coupons.length > 1 && (
              <button
                onClick={prevSlide}
                className="p-1 text-amber-200/60 hover:text-white transition-colors hidden sm:flex"
              >
                <ChevronLeft size={16} />
              </button>
            )}

            {/* Coupon Content */}
            <div className="flex items-center gap-2 sm:gap-3 flex-1 justify-center overflow-hidden">
              {/* Coupon Slide Animation */}
              <div className="relative w-full max-w-xs">
                <div 
                  key={currentIndex}
                  className="flex items-center justify-center gap-2 animate-[slideIn_500ms_ease-out_forwards]"
                >
                  {/* Discount Badge */}
                  <div className="flex items-center gap-1 bg-amber-500 px-2 py-1 rounded-md">
                    <Percent size={12} className="text-white" />
                    <span className="text-white font-bold text-xs">
                      {currentCoupon.discountType === "PERCENTAGE"
                        ? `${currentCoupon.discountValue}% OFF`
                        : `LKR ${currentCoupon.discountValue} OFF`}
                    </span>
                  </div>

                  {/* Divider */}
                  <div className="hidden sm:block w-px h-5 bg-amber-200/30" />

                  {/* Coupon Code - Clickable */}
                  <button
                    onClick={() => copyToClipboard(currentCoupon.code)}
                    className="group flex items-center gap-1.5 bg-white/10 hover:bg-white/20 border border-amber-200/20 px-2.5 py-1 rounded-md transition-all"
                  >
                    {copiedCode === currentCoupon.code ? (
                      <>
                        <Check size={12} className="text-green-300" />
                        <span className="text-xs font-semibold text-green-300 font-mono">
                          Copied!
                        </span>
                      </>
                    ) : (
                      <>
                        <Tag size={11} className="text-amber-300" />
                        <code className="text-xs font-semibold text-white font-mono">
                          {currentCoupon.code}
                        </code>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Navigation Arrow - Right */}
            {coupons.length > 1 && (
              <button
                onClick={nextSlide}
                className="p-1 text-amber-200/60 hover:text-white transition-colors hidden sm:flex"
              >
                <ChevronRight size={16} />
              </button>
            )}
          </div>

          {/* Mobile Dots & Expiry */}
          <div className="flex items-center justify-center gap-4 mt-1.5">
            {coupons.length > 1 && (
              <div className="flex sm:hidden gap-1.5">
                {coupons.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => goToSlide(idx)}
                    className={`w-1.5 h-1.5 rounded-full transition-all ${
                      idx === currentIndex
                        ? "bg-amber-400 w-4"
                        : "bg-amber-200/40"
                    }`}
                  />
                ))}
              </div>
            )}
            <p className="text-[10px] text-amber-200/60">
              Min. order LKR {currentCoupon.minOrderAmount} •{" "}
              {new Date(currentCoupon.expiryDate).toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CouponCarousel;