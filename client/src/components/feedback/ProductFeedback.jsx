import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Star, Loader2 } from "lucide-react";
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
          {loading ? <Loader2 size={16} className="animate-spin mx-auto" /> : submitted ? "Thank you!" : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default ProductFeedback;