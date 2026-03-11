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
import api from "../../service/api";
import { useCartStore } from "../../stores/cartStore";
import { useAuthStore } from "../../stores/authStore";

const ProductDetail = () => {
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
        setProduct(Array.isArray(data) ? data[0] : data);
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
      <div className="h-screen flex items-center justify-center bg-[#FCF9F6]">
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
    <div className="bg-[#FCF9F6] h-[700px] pt-15 mt-10 lg:flex lg:items-center lg:justify-center p-0 md:p-4 lg:p-8">
      {/* Main Card Container */}
      <div className="w-full max-w-6xl bg-white lg:h-[700px] lg:max-h-[660px] shadow-2xl lg:rounded-2xl overflow-hidden flex flex-col lg:flex-row relative">
        
        {/* BACK TO GALLERY BUTTON FIXED TOP-LEFT */}
        <div className="absolute top-1 left-4 z-30">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-stone-700 hover:text-amber-800  p-2 "
          >
            <ChevronLeft size={16} />
          </button>
        </div>

        {/* LEFT SIDE: Media Gallery (Fixed on Desktop) */}
        <div className="w-full lg:w-1/2 h-[50vh] lg:h-full bg-stone-100 flex flex-col">
          <div className="flex-1 relative overflow-hidden">
            <img
              src={product?.images?.[selectedImage]}
              alt={product?.name}
              className="w-full h-full object-contain bg-stone-100"
            />
          </div>

          {/* Thumbnails (Horizontal) */}
          <div className="p-4 bg-white/50 backdrop-blur-sm flex gap-3 overflow-x-auto no-scrollbar snap-x">
            {product?.images?.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`w-16 h-20 shrink-0 rounded-md overflow-hidden border-2 transition-all snap-start ${
                  selectedImage === idx
                    ? "border-amber-800"
                    : "border-transparent opacity-60"
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
        </div>

        {/* RIGHT SIDE: Content (Scrollable on Desktop) */}
        <div className="w-full lg:w-1/2 flex flex-col h-auto lg:h-full">
          {/* Scrollable Content Area */}
          <div className="flex-1  p-6 md:p-10 lg:p-12 space-y-5 no-scrollbar">
            <div className="space-y-3">
              <span className="text-amber-800 text-[10px] uppercase tracking-[0.3em] font-bold">
                {product?.categoryName}
              </span>
              <h1 className="text-3xl md:text-4xl font-serif text-[#5C4033] leading-tight">
                {product?.name}
              </h1>
              <p className="text-2xl font-serif text-stone-900">
                ${Number(product?.price).toFixed(2)}
              </p>
            </div>

            <div className="space-y-4">
              <p className=" font-light text-[15px] text-lg border-stone-100 text-[10px]  tracking-wide font-bold text-stone-400">
                {product?.description}
              </p>
            </div>
          </div>

          {/* Fixed Bottom CTA Section */}
          <div className="p-6 bg-stone-50/50 border-t border-stone-100">
            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                disabled={product?.stockQuantity === 0}
                className="flex-1 bg-[#5C4033] text-white py-4 lg:py-5 uppercase text-[10px] tracking-[0.2em] font-bold hover:bg-amber-900 transition-all flex items-center justify-center gap-3 shadow-lg"
              >
                <ShoppingBag size={18} />
                {product?.stockQuantity === 0 ? "Sold Out" : "Add to Tote"}
              </button>
              <button className="p-4 border border-stone-200 hover:bg-white transition-colors rounded-sm">
                <Heart size={20} className="text-stone-800" />
              </button>
            </div>
            <p className="text-[9px] text-center text-stone-400 mt-4 uppercase tracking-[0.2em]">
              {product?.stockQuantity > 0
                ? `Only ${product?.stockQuantity} available for dispatch`
                : "Crafting more soon"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;