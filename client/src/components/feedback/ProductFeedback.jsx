import React, { useState } from "react";
import { Star } from "lucide-react";
import { submitFeedback } from "../../service/feedbackService";

const ProductFeedback = ({ productId, onSubmitFeedback }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comments, setComments] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0 || !comments.trim()) return;

    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      // Call the feedback service
      const response = await submitFeedback({ productId, rating, comments });
      setSuccessMessage("Thank you for your feedback!");
      setRating(0);
      setComments("");

      if (onSubmitFeedback) {
        onSubmitFeedback(response); // pass backend response if needed
      }
    } catch (error) {
      setErrorMessage("Failed to submit feedback. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-12 px-4">
      <div className="text-center mb-8">
        <h3 className="text-xl font-serif text-[#5C4033]">Leave a Review</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Minimalist Stars */}
        <div className="flex justify-center gap-1.5">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              className="focus:outline-none transition-transform active:scale-90"
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => setRating(star)}
            >
              <Star
                size={24}
                strokeWidth={1.2}
                className={`transition-colors duration-300 ${
                  star <= (hoverRating || rating)
                    ? "fill-[#5C4033] text-[#5C4033]"
                    : "text-stone-200"
                }`}
              />
            </button>
          ))}
        </div>

        {/* Comments */}
        <div>
          <textarea
            rows="3"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            placeholder="Share your thoughts on this piece..."
            className="w-full bg-transparent border-b border-stone-200 py-2 text-sm text-stone-700 placeholder:text-stone-400 focus:border-[#5C4033] focus:outline-none focus:ring-0 transition-colors resize-none"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={rating === 0 || !comments.trim() || loading}
          className="w-full bg-[#5C4033] text-white py-4 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-stone-800 transition-colors duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>

        {/* Success / Error Messages */}
        {successMessage && (
          <p className="text-green-600 text-center mt-2">{successMessage}</p>
        )}
        {errorMessage && (
          <p className="text-red-600 text-center mt-2">{errorMessage}</p>
        )}
      </form>
    </div>
  );
};

export default ProductFeedback;