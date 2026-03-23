import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Star, Check, Loader2 } from "lucide-react";
import { submitFeedback } from "../../service/feedbackService";
import api from "../../service/api";

const ProductFeedback = ({ onFeedbackSubmitted }) => {
  const { slug } = useParams();
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
    if (!rating || !comments.trim() || !productId) return;

    setLoading(true);
    try {
      await submitFeedback({ productId, rating, comments });
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
      setRating(0);
      setComments("");
      if (onFeedbackSubmitted) onFeedbackSubmitted();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
        <div className="bg-gradient-to-r from-[#5C4033] to-[#8B7355] px-8 py-6">
          <h3 className="text-xl font-serif text-white">Share Your Experience</h3>
          <p className="text-white/70 text-sm mt-1">Help others understand the quality of this product</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="space-y-3">
            <label className="text-xs font-medium uppercase tracking-wider text-stone-500">Rating</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((s) => (
                <button
                  key={s}
                  type="button"
                  onMouseEnter={() => setHoverRating(s)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(s)}
                  className="p-1 transition-transform hover:scale-110"
                >
                  <Star 
                    size={32} 
                    strokeWidth={1.5} 
                    className={`transition-all duration-300 ${s <= (hoverRating || rating) ? "fill-amber-400 text-amber-400" : "text-stone-200"}`} 
                  />
                </button>
              ))}
            </div>
            {rating > 0 && (
              <p className="text-sm text-stone-500">
                {rating === 1 && "Poor"}
                {rating === 2 && "Fair"}
                {rating === 3 && "Good"}
                {rating === 4 && "Very Good"}
                {rating === 5 && "Excellent"}
              </p>
            )}
          </div>

          <div className="space-y-3">
            <label className="text-xs font-medium uppercase tracking-wider text-stone-500">Your Review</label>
            <textarea
              rows="4"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="Tell us about your experience with this product..."
              className="w-full px-4 py-3 rounded-xl border border-stone-200 text-stone-700 placeholder:text-stone-400 focus:border-[#5C4033] focus:ring-2 focus:ring-[#5C4033]/10 focus:outline-none transition-all resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={!rating || !comments.trim() || loading || !productId}
            className="w-full bg-[#5C4033] text-white py-4 px-6 rounded-xl text-sm font-semibold uppercase tracking-wider hover:bg-[#4A332A] transition-all flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader2 size={18} className="animate-spin" />
            ) : submitted ? (
              <>
                <Check size={18} className="text-green-400" />
                <span className="text-green-400">Thank You!</span>
              </>
            ) : (
              "Submit Review"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductFeedback;
