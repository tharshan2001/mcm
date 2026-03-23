import React, { useState, useEffect } from "react";
import { createProduct } from "../../service/product";
import api from "../../service/api";
import { Upload, X, PackagePlus, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

export default function ProductCreate() {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    stockQuantity: "",
    categoryId: ""
  });

  const [categories, setCategories] = useState([]);
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await api.get("/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const newFiles = [...files, ...selectedFiles];
    setFiles(newFiles);

    const newPreviews = selectedFiles.map((file) => ({
      url: URL.createObjectURL(file),
      name: file.name
    }));

    setPreviews([...previews, ...newPreviews]);
  };

  const removeImage = (index) => {
    URL.revokeObjectURL(previews[index].url);
    setFiles(files.filter((_, i) => i !== index));
    setPreviews(previews.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await createProduct(product, files);
      setSuccess(true);

      previews.forEach((preview) => URL.revokeObjectURL(preview.url));

      setProduct({
        name: "",
        description: "",
        price: "",
        stockQuantity: "",
        categoryId: ""
      });

      setFiles([]);
      setPreviews([]);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle =
    "w-full bg-white border border-stone-200 p-2 outline-none focus:border-[#5C4033] transition-colors text-sm font-light";

  const labelStyle =
    "block text-[9px] uppercase tracking-widest text-stone-400 mb-1 font-bold";

  return (
    <div className="max-h-[80vh] overflow-y-auto bg-stone-50 py-6 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-6 text-center lg:text-left">
          <h1 className="text-2xl font-serif text-stone-800 flex items-center justify-center lg:justify-start gap-2">
            <PackagePlus strokeWidth={1} size={22}/> New Product
          </h1>
          <p className="text-stone-500 text-sm mt-1">
            Add a new product to the collection
          </p>
        </div>

        <div className="bg-white border border-stone-100 shadow-sm p-6 md:p-8">

          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 text-xs flex items-center gap-2 border-l-2 border-red-500">
              <AlertCircle size={12} /> {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-green-50 text-green-700 text-xs flex items-center gap-2 border-l-2 border-green-500">
              <CheckCircle2 size={12} /> Product successfully curated into the archive.
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Form */}
            <div className="space-y-4">

              <div>
                <label className={labelStyle}>Product Name</label>
                <input
                  type="text"
                  name="name"
                  value={product.name}
                  onChange={handleChange}
                  placeholder="Hand-spun Khadi Scarf"
                  className={inputStyle}
                />
              </div>

              <div>
                <label className={labelStyle}>Category</label>
                <select
                  name="categoryId"
                  value={product.categoryId}
                  onChange={handleChange}
                  className={inputStyle}
                >
                  <option value="">Select category</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelStyle}>Price ($)</label>
                  <input
                    type="number"
                    name="price"
                    value={product.price}
                    onChange={handleChange}
                    className={inputStyle}
                  />
                </div>

                <div>
                  <label className={labelStyle}>Stock</label>
                  <input
                    type="number"
                    name="stockQuantity"
                    value={product.stockQuantity}
                    onChange={handleChange}
                    className={inputStyle}
                  />
                </div>
              </div>

              <div>
                <label className={labelStyle}>Description</label>
                <textarea
                  name="description"
                  value={product.description}
                  onChange={handleChange}
                  rows={3}
                  className={`${inputStyle} resize-none`}
                  placeholder="Tell the story of this piece..."
                />
              </div>

            </div>

            {/* Images */}
            <div>
              <label className={labelStyle}>Visual Archive</label>

              <div className="relative border-2 border-dashed border-stone-200 bg-stone-50 p-5 text-center hover:bg-stone-100 transition-colors">

                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />

                <Upload className="mx-auto text-stone-300 mb-1 pointer-events-none" size={20}/>
                <p className="text-[9px] text-stone-500 uppercase font-medium pointer-events-none">
                  Click or drag images
                </p>
              </div>

              {/* Small previews */}
              <div className="grid grid-cols-4 gap-2 mt-4">
                {previews.map((preview, index) => (
                  <div
                    key={index}
                    className="relative h-16 bg-stone-100 group border border-stone-100"
                  >
                    <img
                      src={preview.url}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />

                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-white p-0.5 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={10} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Submit */}
          <div className="mt-6 flex justify-end pt-4 border-t border-stone-50">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-[#5C4033] text-white px-8 py-3 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#3E2B22] transition-all disabled:opacity-50 flex items-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 size={12} className="animate-spin" />
                  Archiving...
                </>
              ) : (
                "Publish"
              )}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}