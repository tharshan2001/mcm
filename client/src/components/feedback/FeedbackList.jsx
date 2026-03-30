import React, { useState, useEffect } from "react";
import { Star, Loader2, Edit2, Trash2 } from "lucide-react";
import { useParams } from "react-router-dom";
import { getFeedbackByProduct, deleteFeedback } from "../../service/feedbackService";
import { useAuthStore } from "../../stores/authStore";
import FeedbackUpdateModal from "./FeedbackUpdateModal";
import sweetAlert from "../../utils/sweetAlert";
import api from "../../service/api";

const FeedbackList = ({ refreshKey }) => {
  const { slug } = useParams();
  const [productId, setProductId] = useState(null);
  const [feedbackItems, setFeedbackItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editModal, setEditModal] = useState({ isOpen: false, feedback: null });
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    const fetchId = async () => {
      try {
        const { data } = await api.get(`products/${slug}`);
        setProductId(Array.isArray(data) ? data[0]?.id : data?.id);
      } catch (err) { console.error(err); }
    };
    if (slug) fetchId();
  }, [slug]);

  useEffect(() => {
    if (!productId) return;
    const fetchFeedback = async () => {
      setLoading(true);
      try {
        const feedback = await getFeedbackByProduct(productId);
        setFeedbackItems(feedback);
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    fetchFeedback();
  }, [productId, refreshKey]);

  const handleDelete = async (feedback) => {
    const result = await sweetAlert.deleteConfirm("this review");
    if (!result.isConfirmed) return;
    
    try {
      await deleteFeedback(feedback.id);
      setFeedbackItems((prev) => prev.filter((f) => f.id !== feedback.id));
      sweetAlert.toast("Review deleted successfully!");
    } catch (error) {
      sweetAlert.error(error.response?.data?.message || "Failed to delete review");
    }
  };

  const handleEdit = (feedback) => {
    setEditModal({ isOpen: true, feedback });
  };

  const handleUpdateSuccess = () => {
    if (!productId) return;
    getFeedbackByProduct(productId).then(setFeedbackItems);
  };

  const reviewCount = feedbackItems?.length || 0;

  if (loading) {
    return <div className="flex justify-center py-8"><Loader2 size={20} className="animate-spin text-stone-300" /></div>;
  }

  if (reviewCount === 0) {
    return null;
  }

  return (
    <>
      <div className="space-y-3">
        {feedbackItems.map((item) => {
          const isOwner = user?.id === item.userId;
          
          return (
            <div key={item.id} className="bg-stone-50 rounded-lg p-4 group">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-full bg-[#5C4033]/10 flex items-center justify-center">
                  <span className="text-[10px] font-semibold text-[#5C4033]">
                    {item.username ? item.username.charAt(0).toUpperCase() : "?"}
                  </span>
                </div>
                <span className="text-xs font-medium text-stone-700">{item.username || "Anonymous"}</span>
                <span className="text-[10px] text-stone-400 ml-auto">
                  {new Date(item.createdAt || item.created_at).toLocaleDateString()}
                </span>
                
                {isOwner && (
                  <div className="flex items-center gap-1 ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleEdit(item)}
                      className="p-1 text-stone-400 hover:text-amber-700 transition-colors"
                      title="Edit"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(item)}
                      className="p-1 text-stone-400 hover:text-red-600 transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                )}
              </div>
              
              <div className="flex gap-0.5 mb-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} size={12} className={i <= item.rating ? "fill-amber-400 text-amber-400" : "text-stone-200"} />
                ))}
              </div>
              
              <p className="text-xs text-stone-500 leading-relaxed">{item.comments}</p>
            </div>
          );
        })}
      </div>

      <FeedbackUpdateModal
        isOpen={editModal.isOpen}
        onClose={() => setEditModal({ isOpen: false, feedback: null })}
        feedback={editModal.feedback}
        onSuccess={handleUpdateSuccess}
      />
    </>
  );
};

export default FeedbackList;
