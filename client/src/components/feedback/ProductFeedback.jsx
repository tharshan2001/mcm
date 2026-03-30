import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Star, Loader2 } from "lucide-react";
import { submitFeedback } from "../../service/feedbackService";
import { useAuthStore } from "../../stores/authStore";
import api from "../../service/api";

const ProductFeedback = ({ onFeedbackSubmitted }) => {
  const { slug } = useParams();
  const user = useAuthStore((state) => state.user);
  const openLogin = useAuthStore((state) => state.openLogin);
  
  const [productId, setProductId] = useState(null);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comments, setComments] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchId = async () => {
      const { data } = await api.get(`products/${slug}`);
      setProductId(Array.isArray(data) ? data[0]?.id : data?.id);
    };
    if (slug) fetchId();
  }, [slug]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      openLogin();
      return;
    }
    if (!rating || !comments.trim() || !productId) return;

    setLoading(true);
    try {
      await submitFeedback({ productId, rating, comments });
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
      setRating(0);
      setComments("");
      if (onFeedbackSubmitted) onFeedbackSubmitted();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-md mx-auto">
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Star size={20} className="text-green-600 fill-green-600" />
          </div>
          <h4 className="text-sm font-medium text-green-800 mb-1">Thank you for your review!</h4>
          <p className="text-xs text-green-600">Your feedback helps other customers make better choices</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="text-center">
          <p className="text-sm text-stone-500">Rate this product</p>
        </div>
        
        <div className="flex justify-center gap-1">
          {[1, 2, 3, 4, 5].map((s) => (
            <button
              key={s}
              type="button"
              onMouseEnter={() => setHoverRating(s)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => setRating(s)}
              className="p-1"
            >
              <Star 
                size={24} 
                className={s <= (hoverRating || rating) ? "fill-amber-400 text-amber-400" : "text-stone-200"} 
              />
            </button>
          ))}
        </div>

        <textarea
          rows="3"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          placeholder="Write a short review..."
          className="w-full px-3 py-2 text-sm border border-stone-200 rounded-lg focus:border-[#5C4033] focus:outline-none"
        />

        <button
          type="submit"
          disabled={!rating || !comments.trim() || loading || !productId}
          className="w-full bg-[#5C4033] text-white py-2 text-sm rounded-lg hover:bg-[#4A332A] disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {!user ? "Sign in to Submit" : loading ? <Loader2 size={16} className="animate-spin mx-auto" /> : "Submit Review"}
        </button>
        
        {!user && (
          <p className="text-[10px] text-center text-stone-400">
            Sign in to submit your review
          </p>
        )}
      </form>
    </div>
  );
};

export default ProductFeedback;