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
  }, [productId, refreshKey]); // Re-runs when refreshKey changes

  const reviewCount = feedbackItems?.length || 0;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 border-b border-stone-200 pb-6 gap-4">
        <div>
          <h3 className="text-2xl font-serif text-[#5C4033]">Client Reflections</h3>
          <p className="text-[10px] uppercase tracking-[0.3em] text-stone-400 font-bold mt-1">Verified Experiences</p>
        </div>
        <span className="text-[10px] uppercase tracking-[0.2em] text-stone-500 font-bold">
          {reviewCount} {reviewCount === 1 ? "Archive" : "Archives"}
        </span>
      </div>

      <div className="space-y-16">
        {feedbackItems.length > 0 ? (
          feedbackItems.map((item) => (
            <div key={item.id} className="group animate-in fade-in slide-in-from-bottom-2 duration-700">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                {/* Username as a Brand Signature */}
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#5C4033]">
                  {item.username}
                </span>
                
                <div className="flex items-center gap-4">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={10} className={i < item.rating ? "fill-[#5C4033] text-[#5C4033]" : "text-stone-200"} />
                    ))}
                  </div>
                  <span className="text-[9px] text-stone-400 uppercase tracking-widest">
                    {new Date(item.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </span>
                </div>
              </div>

              <p className="text-stone-600 text-sm sm:text-base leading-relaxed font-light italic pl-4 border-l border-stone-100">
                "{item.comments}"
              </p>
            </div>
          ))
        ) : !loading && (
          <p className="text-center text-stone-400 font-serif italic py-10">The ledger is currently empty.</p>
        )}
      </div>
    </div>
  );
};

export default FeedbackList;