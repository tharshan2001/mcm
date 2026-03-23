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

  if (loading) {
    return <div className="flex justify-center py-8"><Loader2 size={20} className="animate-spin text-stone-300" /></div>;
  }

  if (reviewCount === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      {feedbackItems.map((item) => (
        <div key={item.id} className="bg-stone-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-full bg-[#5C4033]/10 flex items-center justify-center">
              <span className="text-[10px] font-semibold text-[#5C4033]">
                {item.username ? item.username.charAt(0).toUpperCase() : "?"}
              </span>
            </div>
            <span className="text-xs font-medium text-stone-700">{item.username || "Anonymous"}</span>
            <div className="flex gap-0.5 ml-auto">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} size={10} className={i <= item.rating ? "fill-amber-400 text-amber-400" : "text-stone-200"} />
              ))}
            </div>
          </div>
          <p className="text-xs text-stone-500">{item.comments}</p>
        </div>
      ))}
    </div>
  );
};

export default FeedbackList;