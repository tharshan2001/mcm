import React, { useState } from "react";
import { updateCategory } from "../../service/categoryService";

export default function CategoryUpdatePopover({ categoryData, onClose, onUpdated }) {

  const [name, setName] = useState(categoryData.name);
  const [description, setDescription] = useState(categoryData.description);

  const handleUpdate = async (e) => {

    e.preventDefault();

    await updateCategory(categoryData.id, {
      name,
      description
    });

    onUpdated();
    onClose();
  };

  return (

    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">

      <div className="bg-white p-6 w-[400px] rounded">

        <h2 className="text-xl mb-4">
          Update Category
        </h2>

        <form onSubmit={handleUpdate} className="space-y-4">

          <input
            value={name}
            onChange={(e)=>setName(e.target.value)}
            className="w-full border p-2"
          />

          <textarea
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
            className="w-full border p-2"
          />

          <div className="flex justify-end gap-2">

            <button
              type="button"
              onClick={onClose}
              className="border px-3 py-1"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-[#5C4033] text-white px-4 py-1"
            >
              Update
            </button>

          </div>

        </form>

      </div>

    </div>

  );
}