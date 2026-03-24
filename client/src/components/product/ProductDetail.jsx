import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ShoppingBag,
  Heart,
  ChevronLeft,
  Loader2,
} from "lucide-react";
import api from "../../service/api";
import { useCartStore } from "../../stores/cartStore";
import { useAuthStore } from "../../stores/authStore";

const ProductDetail = ({ onProductLoaded }) => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { addItem } = useCartStore();
  const { user, openLogin } = useAuthStore();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await api.get(`products/${slug}`);
        const data = response.data;
        const productData = Array.isArray(data) ? data[0] : data;
        setProduct(productData);
        if (onProductLoaded) {
          onProductLoaded(productData);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (slug) fetchProduct();
  }, [slug]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FCF9F6]">
        <Loader2 className="animate-spin text-amber-800" size={32} />
      </div>
    );

  const handleAddToCart = async () => {
    if (!user) {
      openLogin();
      return;
    }
    await addItem(product.id, 1);
  };

  return (
    <div className="min-h-screen bg-[#FCF9F6] p-3 md:p-4">
      {/* Main Card Container */}
      <div className="w-full bg-white shadow-lg md:shadow-xl md:max-w-6xl md:mx-auto md:rounded-2xl overflow-hidden flex flex-col md:flex-row relative">
        
        {/* Back Button - Stylish */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 z-30 flex items-center justify-center w-9 h-9 text-[#5C4033] hover:text-[#8B5A3C] hover:scale-110 transition-all"
        >
          <ChevronLeft size={24} strokeWidth={2.5} />
        </button>

        {/* LEFT SIDE: Media Gallery */}
        <div className="w-full md:w-1/2 h-[45vh] md:h-[80vh] lg:h-[70vh] bg-stone-100 flex flex-col rounded-t-2xl md:rounded-none overflow-hidden relative">
          {/* Main Image */}
          <div className="flex-1 relative overflow-hidden p-4">
            <img
              src={product?.images?.[selectedImage]}
              alt={product?.name}
              className="w-full h-full object-contain rounded-2xl"
            />
          </div>

          {/* Thumbnails */}
          {product?.images?.length > 1 && (
            <div className="p-3 bg-white flex gap-2 overflow-x-auto md:overflow-x-hidden no-scrollbar-mobile">
              {product?.images?.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-14 h-16 shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === idx
                      ? "border-amber-800"
                      : "border-transparent opacity-50 hover:opacity-80"
                  }`}
                >
                  <img
                    src={img}
                    className="w-full h-full object-cover"
                    alt="thumb"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT SIDE: Content */}
        <div className="w-full md:w-1/2 flex flex-col">
          {/* Scrollable Content */}
          <div className="flex-1 p-5 md:p-8 space-y-4 overflow-y-auto">
            {/* Category */}
            <span className="inline-block text-amber-700 text-xs uppercase tracking-wider font-semibold">
              {product?.categoryName}
            </span>
            
            {/* Name */}
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-serif text-[#5C4033] leading-tight">
              {product?.name}
            </h1>
            
            {/* Price */}
            <p className="text-xl md:text-2xl font-semibold text-stone-800">
              LKR {Number(product?.price).toFixed(2)}
            </p>

            {/* Description */}
            <div className="pt-2">
              <p className="text-sm md:text-base text-stone-600 leading-relaxed">
                {product?.description}
              </p>
            </div>

            {/* Stock Info */}
            <div className="pt-2">
              {product?.stockQuantity > 0 ? (
                <p className="text-xs text-green-600 font-medium">
                  ✓ In Stock ({product?.stockQuantity} available)
                </p>
              ) : (
                <p className="text-xs text-red-500 font-medium">
                  ✗ Out of Stock
                </p>
              )}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="p-5 md:p-6 bg-stone-50 border-t border-stone-100">
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                disabled={product?.stockQuantity === 0}
                className="flex-1 bg-[#5C4033] text-white py-3 md:py-4 px-4 text-xs md:text-sm uppercase tracking-wide font-semibold hover:bg-[#4A332A] transition-all flex items-center justify-center gap-2 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingBag size={18} />
                {product?.stockQuantity === 0 ? "Sold Out" : "Add to Cart"}
              </button>
              <button className="p-3 md:p-4 border border-stone-200 hover:bg-white hover:border-amber-200 transition-colors rounded-lg">
                <Heart size={20} className="text-stone-600" />
              </button>
            </div>
            
            <p className="text-[10px] text-center text-stone-400 mt-3">
              {product?.stockQuantity > 0 && product?.stockQuantity <= 5
                ? `Only ${product?.stockQuantity} left in stock`
                : "Free shipping on orders above LKR 5000"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;