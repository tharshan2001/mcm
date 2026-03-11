import React, { useState } from "react";
import { createCategory } from "../../service/categoryService";

export default function CategoryCreate({ onCreated }) {

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    await createCategory({
      name,
      description
    });

    onCreated();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      <h2 className="text-xl font-serif text-[#5C4033]">
        Create Category
      </h2>

      <input
        type="text"
        placeholder="Category Name"
        value={name}
        onChange={(e)=>setName(e.target.value)}
        className="w-full border p-2"
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e)=>setDescription(e.target.value)}
        className="w-full border p-2"
      />

      <button
        type="submit"
        className="bg-[#5C4033] text-white px-4 py-2"
      >
        Create
      </button>

    </form>
  );
}