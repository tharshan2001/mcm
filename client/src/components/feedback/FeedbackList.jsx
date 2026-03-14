import React from "react";
import { Star, MoreHorizontal } from "lucide-react";

const FeedbackList = ({ feedbackItems, loading, hasMore, onLoadMore }) => {
  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-10 border-b border-stone-100 pb-4">
        <h3 className="text-xl font-serif text-[#5C4033]">Client Reflections</h3>
        <span className="text-[10px] uppercase tracking-[0.2em] text-stone-400 font-bold">
          {feedbackItems.length} Reviews
        </span>
      </div>

      {/* Feedback Items */}
      <div className="space-y-12">
        {feedbackItems.map((item, index) => (
          <div 
            key={item.id || index} 
            className="animate-in fade-in slide-in-from-bottom-4 duration-500"
          >
            {/* Star Rating & Meta */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={12}
                    strokeWidth={1.5}
                    className={i < item.rating ? "fill-[#5C4033] text-[#5C4033]" : "text-stone-200"}
                  />
                ))}
              </div>
              <span className="text-[9px] uppercase tracking-widest text-stone-400 font-medium">
                {new Date(item.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </span>
            </div>

            {/* Comment Body */}
            <p className="text-stone-700 text-sm leading-relaxed italic font-light">
              "{item.comments}"
            </p>
            
            {/* Optional: Simple Divider between items */}
            <div className="mt-8 w-8 h-px bg-stone-200 mx-auto opacity-50" />
          </div>
        ))}
      </div>

      {/* Load More Section */}
      {hasMore && (
        <div className="mt-16 flex justify-center">
          <button
            onClick={onLoadMore}
            disabled={loading}
            className="group flex flex-col items-center gap-2 transition-all"
          >
            <span className="text-[10px] uppercase tracking-[0.4em] text-stone-400 group-hover:text-[#5C4033] transition-colors">
              {loading ? "Discovering..." : "View More"}
            </span>
            <div className="h-px w-12 bg-stone-200 group-hover:w-20 group-hover:bg-[#5C4033] transition-all duration-500" />
          </button>
        </div>
      )}

      {!hasMore && feedbackItems.length > 0 && (
        <div className="mt-16 text-center">
          <p className="text-[9px] uppercase tracking-[0.2em] text-stone-300 font-bold">
            End of reflections
          </p>
        </div>
      )}
    </div>
  );
};

export default FeedbackList;