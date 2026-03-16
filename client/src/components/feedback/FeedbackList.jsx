import React from "react";
import { Star, Loader2 } from "lucide-react";

const FeedbackList = ({ 
  feedbackItems = [], // Default to empty array to prevent .length errors
  loading = false, 
  hasMore = false, 
  onLoadMore 
}) => {
  
  // Safe check for the count
  const reviewCount = feedbackItems?.length || 0;

  return (
    <div className="max-w-2xl mx-auto py-12 px-4 bg-transparent">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-10 border-b border-stone-100 pb-4">
        <h3 className="text-xl font-serif text-[#5C4033]">Client Reflections</h3>
        <span className="text-[10px] uppercase tracking-[0.2em] text-stone-400 font-bold">
          {reviewCount} {reviewCount === 1 ? 'Review' : 'Reviews'}
        </span>
      </div>

      {/* Feedback Items List */}
      <div className="space-y-12">
        {feedbackItems.length > 0 ? (
          feedbackItems.map((item, index) => (
            <div 
              key={item.id || index} 
              className="animate-in fade-in slide-in-from-bottom-4 duration-500"
            >
              {/* Star Rating & Meta Info */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={10}
                      strokeWidth={1.5}
                      className={i < item.rating ? "fill-[#5C4033] text-[#5C4033]" : "text-stone-200"}
                    />
                  ))}
                </div>
                <span className="text-[9px] uppercase tracking-widest text-stone-400 font-medium">
                  {item.createdAt 
                    ? new Date(item.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
                    : "Recent Guest"}
                </span>
              </div>

              {/* Comment Content */}
              <p className="text-stone-700 text-sm leading-relaxed italic font-light">
                "{item.comments}"
              </p>
              
              {/* Bottom Divider (Artisan dash) */}
              <div className="mt-8 w-6 h-px bg-stone-100" />
            </div>
          ))
        ) : !loading && (
          /* Empty State */
          <div className="text-center py-10">
            <p className="text-stone-400 font-serif italic text-sm">No reflections shared yet.</p>
          </div>
        )}
      </div>

      {/* Load More Interaction */}
      {hasMore && (
        <div className="mt-16 flex flex-col items-center">
          <button
            onClick={onLoadMore}
            disabled={loading}
            className="group flex flex-col items-center gap-2 transition-all disabled:opacity-50"
          >
            {loading ? (
              <Loader2 size={18} className="animate-spin text-stone-300" />
            ) : (
              <>
                <span className="text-[10px] uppercase tracking-[0.4em] text-stone-400 group-hover:text-[#5C4033] transition-colors">
                  View More
                </span>
                <div className="h-px w-12 bg-stone-200 group-hover:w-20 group-hover:bg-[#5C4033] transition-all duration-500" />
              </>
            )}
          </button>
        </div>
      )}

      {/* End of List Message */}
      {!hasMore && feedbackItems.length > 0 && (
        <div className="mt-16 text-center">
          <p className="text-[9px] uppercase tracking-[0.2em] text-stone-300 font-bold">
            All reviews synchronized
          </p>
        </div>
      )}
    </div>
  );
};

export default FeedbackList;