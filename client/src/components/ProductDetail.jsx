import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ShoppingBag,
  Heart,
  ChevronLeft,
  Loader2,
  Truck,
  ShieldCheck,
  RefreshCw,
} from "lucide-react";
import api from "../service/api";
import { useCartStore } from "../stores/cartStore";
import { useAuthStore } from "../stores/authStore";

const ProductDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { addItem } = useCartStore();
  const { user, openLogin } = useAuthStore(); // 👈 auth store

  // Fetch product
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await api.get(`products/${slug}`);
        const data = response.data;
        setProduct(Array.isArray(data) ? data[0] : data);
        setSelectedImage(0);
      } catch (err) {
        console.error("Failed to fetch product:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchProduct();
  }, [slug]);

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center bg-[#FCF9F6]">
        <Loader2
          className="animate-spin text-amber-800"
          size={32}
          strokeWidth={1.5}
        />
      </div>
    );

  if (error || !product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-4 bg-[#FCF9F6]">
        <p className="font-serif italic text-stone-500">
          Masterpiece not found.
        </p>
        <button
          onClick={() => navigate("/shop")}
          className="text-xs font-bold uppercase tracking-widest border-b border-stone-800 pb-1"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  const handleAddToCart = async () => {
    // 👇 Check login
    if (!user) {
      openLogin();
      return;
    }

    await addItem(product.id, 1);
  };

  return (
    <div className="bg-[#FCF9F6] text-stone-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* Navigation */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-10 text-stone-500 hover:text-[#5C4033] transition-colors"
        >
          <ChevronLeft size={18} strokeWidth={1.5} />
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold">
            Back to Collection
          </span>
        </button>

        <div className="flex flex-col lg:flex-row gap-16">
          {/* Left: Media Gallery */}
          <div className="w-full lg:w-3/5 flex flex-col-reverse md:flex-row gap-4">
            {product.images?.length > 1 && (
              <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto no-scrollbar py-2 md:py-0">
                {product.images.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`w-20 aspect-[3/4] shrink-0 overflow-hidden border-2 transition-all ${
                      selectedImage === idx
                        ? "border-amber-800"
                        : "border-transparent opacity-50"
                    }`}
                  >
                    <img
                      src={imgUrl}
                      alt="Thumbnail"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            <div className="flex-1 aspect-[4/5] overflow-hidden bg-stone-100 rounded-sm h-[500px]">
              {product.images?.length > 0 ? (
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-stone-400 italic font-serif">
                  Image Unavailable
                </div>
              )}
            </div>
          </div>

          {/* Right: Product Details */}
          <div className="w-full lg:w-2/5 space-y-10 py-4">
            <div className="space-y-4">
              <span className="text-amber-800 text-[10px] uppercase tracking-[0.3em] font-bold">
                {product.categoryName}
              </span>

              <h1 className="text-4xl md:text-5xl font-serif text-[#5C4033] leading-tight">
                {product.name}
              </h1>

              <p className="text-2xl text-stone-900 font-medium font-serif">
                $
                {typeof product.price === "number"
                  ? product.price.toFixed(2)
                  : product.price}
              </p>
            </div>

            <p className="text-stone-600 font-light leading-relaxed italic text-lg border-l-2 border-stone-200 pl-6">
              {product.description}
            </p>

            {/* Actions */}
            <div className="space-y-4">
              <div className="flex gap-4">
                <button
                  onClick={handleAddToCart}
                  disabled={product.stockQuantity === 0 || product.archived}
                  className="flex-1 bg-[#5C4033] text-white py-5 text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-amber-900 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3 shadow-lg"
                >
                  <ShoppingBag size={16} />
                  {product.stockQuantity === 0 ? "Out of Stock" : "Add to Tote"}
                </button>

                <button className="px-6 border border-stone-200 hover:border-amber-800 hover:text-amber-800 transition-colors bg-white">
                  <Heart size={20} strokeWidth={1.5} />
                </button>
              </div>

              <p className="text-[10px] text-center text-stone-400 uppercase tracking-widest">
                {product.stockQuantity > 0
                  ? `Limited Edition: ${product.stockQuantity} Remaining`
                  : "Being Woven"}
              </p>
            </div>

            {/* Trust Footer */}
            <div className="grid grid-cols-3 gap-4 pt-10 border-t border-stone-200">
              <div className="text-center space-y-2">
                <Truck
                  size={18}
                  strokeWidth={1}
                  className="mx-auto text-amber-800"
                />
                <p className="text-[9px] uppercase tracking-tighter text-stone-500">
                  Global Shipping
                </p>
              </div>

              <div className="text-center space-y-2">
                <ShieldCheck
                  size={18}
                  strokeWidth={1}
                  className="mx-auto text-amber-800"
                />
                <p className="text-[9px] uppercase tracking-tighter text-stone-500">
                  Pure Handloom
                </p>
              </div>

              <div className="text-center space-y-2">
                <RefreshCw
                  size={18}
                  strokeWidth={1}
                  className="mx-auto text-amber-800"
                />
                <p className="text-[9px] uppercase tracking-tighter text-stone-500">
                  Easy Returns
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;