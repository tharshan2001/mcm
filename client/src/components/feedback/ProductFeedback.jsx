import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Star, Check } from "lucide-react";
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
    <div className="max-w-lg mx-auto px-4 bg-amber-50">
      <div className="text-center mb-10">
        <h3 className="text-xl font-serif text-[#5C4033] mb-2">Leave Your Mark</h3>
        <div className="w-10 h-px bg-stone-300 mx-auto" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-10">
        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <button
                key={s}
                type="button"
                onMouseEnter={() => setHoverRating(s)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(s)}
                className="transition-transform active:scale-90"
              >
                <Star size={24} strokeWidth={1} className={`transition-colors duration-300 ${s <= (hoverRating || rating) ? "fill-[#5C4033] text-[#5C4033]" : "text-stone-200"}`} />
              </button>
            ))}
          </div>
        </div>

        <textarea
          rows="3"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          placeholder="Describe your experience with this handloom..."
          className="w-full bg-transparent border-b border-stone-200 py-3 text-sm text-stone-700 placeholder:text-stone-300 focus:border-[#5C4033] focus:outline-none transition-colors resize-none"
        />

        <button
          type="submit"
          disabled={!rating || !comments.trim() || loading || !productId}
          className="w-full bg-[#5C4033] text-white py-5 text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-stone-800 transition-all flex items-center justify-center gap-2 disabled:opacity-30"
        >
          {loading ? "Transmitting..." : submitted ? <><Check size={14} /> Received</> : "Submit Reflection"}
        </button>
      </form>
    </div>
  );
};

export default ProductFeedback;