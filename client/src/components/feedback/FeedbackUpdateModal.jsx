import React, { useState, useEffect } from "react";
import { Star, Loader2, X } from "lucide-react";
import { updateFeedback } from "../../service/feedbackService";
import sweetAlert from "../../utils/sweetAlert";

const FeedbackUpdateModal = ({ isOpen, onClose, feedback, onSuccess }) => {
  const [rating, setRating] = useState(feedback?.rating || 0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comments, setComments] = useState(feedback?.comments || "");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (feedback) {
      setRating(feedback.rating);
      setComments(feedback.comments);
    }
  }, [feedback]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rating || !comments.trim()) return;

    setLoading(true);
    try {
      await updateFeedback(feedback.id, { rating, comments });
      sweetAlert.toast("Review updated successfully!");
      onSuccess();
      onClose();
    } catch (error) {
      sweetAlert.error(error.response?.data?.message || "Failed to update review");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-600"
        >
          <X size={20} />
        </button>

        <div className="p-6">
          <h2 className="text-xl font-serif text-stone-800 mb-2">Edit Review</h2>
          <p className="text-sm text-stone-500 mb-6">Update your product review</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-stone-600 mb-2 text-center">
                Your Rating
              </label>
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
                      size={28} 
                      className={s <= (hoverRating || rating) ? "fill-amber-400 text-amber-400" : "text-stone-200"} 
                    />
                  </button>
                ))}
              </div>
            </div>

            <textarea
              rows="4"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="Update your review..."
              className="w-full px-3 py-2 text-sm border border-stone-200 rounded-lg focus:border-[#5C4033] focus:outline-none resize-none"
            />

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2 border border-stone-200 text-stone-600 rounded-lg hover:bg-stone-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!rating || !comments.trim() || loading}
                className="flex-1 py-2 bg-[#5C4033] text-white rounded-lg hover:bg-[#4a352a] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading && <Loader2 size={16} className="animate-spin" />}
                {loading ? "Updating..." : "Update"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FeedbackUpdateModal;
