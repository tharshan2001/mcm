import React, { useState, useEffect } from "react";
import { Star, Loader2 } from "lucide-react";
import { useParams } from "react-router-dom";
import { getFeedbackByProduct } from "../../service/feedbackService";
import api from "../../service/api";

const FeedbackList = ({ refreshKey }) => {
  const { slug } = useParams();
  const [productId, setProductId] = useState(null);
  const [feedbackItems, setFeedbackItems] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const reviewCount = feedbackItems?.length || 0;
  const averageRating = reviewCount > 0 
    ? (feedbackItems.reduce((sum, item) => sum + item.rating, 0) / reviewCount).toFixed(1)
    : 0;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden mb-8">
        <div className="p-6 flex items-center justify-between border-b border-stone-100">
          <div>
            <h3 className="text-xl font-serif text-[#5C4033]">Customer Reviews</h3>
            <p className="text-sm text-stone-500 mt-1">See what our customers say</p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold text-[#5C4033]">{averageRating}</span>
              <div className="flex flex-col items-start">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star 
                      key={i} 
                      size={14} 
                      className={i <= Math.round(averageRating) ? "fill-amber-400 text-amber-400" : "text-stone-200"} 
                    />
                  ))}
                </div>
                <span className="text-xs text-stone-400">{reviewCount} reviews</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 size={32} className="animate-spin text-stone-300" />
        </div>
      ) : feedbackItems.length > 0 ? (
        <div className="space-y-4">
          {feedbackItems.map((item, index) => (
            <div 
              key={item.id} 
              className="bg-white rounded-xl p-6 shadow-sm border border-stone-100 hover:shadow-md transition-shadow"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#5C4033]/10 flex items-center justify-center">
                    <span className="text-sm font-semibold text-[#5C4033]">
                      {item.username ? item.username.charAt(0).toUpperCase() : "?"}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-stone-800">
                      {item.username || "Anonymous"}
                    </p>
                    <p className="text-xs text-stone-400">
                      {new Date(item.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </p>
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star 
                      key={i} 
                      size={14} 
                      className={i <= item.rating ? "fill-amber-400 text-amber-400" : "text-stone-200"} 
                    />
                  ))}
                </div>
              </div>
              <p className="text-stone-600 leading-relaxed">{item.comments}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-12 text-center border border-dashed border-stone-200">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-stone-50 flex items-center justify-center">
            <Star size={24} className="text-stone-200" />
          </div>
          <p className="text-stone-500 font-medium">No reviews yet</p>
          <p className="text-sm text-stone-400 mt-1">Be the first to share your experience</p>
        </div>
      )}
    </div>
  );
};

export default FeedbackList;
