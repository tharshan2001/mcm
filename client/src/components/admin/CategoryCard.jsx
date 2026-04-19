import React from "react";
import { Pencil } from "lucide-react";

const CategoryCard = React.forwardRef(({ category, onEdit }, ref) => {
  return (
    <tr ref={ref} className="hover:bg-[#FCF9F6] transition-colors">
      <td className="p-4 font-mono text-sm">
        {category.id}
      </td>

      <td className="p-4 font-mono text-sm">
        {category.name}
      </td>

      <td className="p-4 font-mono text-sm">
        {category.description}
      </td>

      <td className="p-4 text-right">
        <button
          onClick={onEdit}
          className="flex items-center gap-1 text-xs border border-stone-300 px-3 py-1 rounded hover:bg-stone-100"
        >
          <Pencil size={14} />
          Edit
        </button>
      </td>
    </tr>
  );
});

export default CategoryCard;