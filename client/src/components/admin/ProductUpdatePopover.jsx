import React, { useState, useEffect } from "react";
import { updateProduct } from "../../service/product";
import api from "../../service/api";
import { Upload, X, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

export default function ProductUpdatePopover({ productData, onClose, onUpdated }) {

  const [visible, setVisible] = useState(true);

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

    if (productData) {
      setProduct({
        name: productData.name || "",
        description: productData.description || "",
        price: productData.price || "",
        stockQuantity: productData.stockQuantity || "",
        categoryId: productData.categoryId || ""
      });

      if (productData.images) {
        setPreviews(
          productData.images.map((img) => ({
            url: img.url,
            existing: true
          }))
        );
      }
    }
  }, [productData]);

  const fetchCategories = async () => {
    try {
      const res = await api.get("/categories");
      setCategories(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    setFiles((prev) => [...prev, ...selectedFiles]);

    const newPreviews = selectedFiles.map((file) => ({
      url: URL.createObjectURL(file),
      name: file.name
    }));

    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  const removeImage = (index) => {
    const preview = previews[index];

    if (!preview.existing) {
      URL.revokeObjectURL(preview.url);
      setFiles(files.filter((_, i) => i !== index));
    }

    setPreviews(previews.filter((_, i) => i !== index));
  };

  // Fade-out close
  const handleClose = () => {
    setVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      await updateProduct(productData.id, product, files);

      setSuccess(true);

      if (onUpdated) onUpdated();

      setTimeout(() => {
        handleClose();
      }, 700);

    } catch (err) {
      setError(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle =
    "w-full bg-white border border-stone-200 p-2 outline-none focus:border-[#5C4033] text-sm";

  const labelStyle =
    "block text-[9px] uppercase tracking-widest text-stone-400 mb-1 font-bold";

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="bg-white w-[900px] max-h-[90vh] overflow-y-auto shadow-xl border border-stone-200 p-8 relative">

        {/* Close */}
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 text-stone-400 hover:text-black"
        >
          <X size={18} />
        </button>

        <h2 className="text-xl font-serif text-[#5C4033] mb-6">
          Update Product
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 text-xs flex items-center gap-2 border-l-2 border-red-500">
            <AlertCircle size={12} /> {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-green-50 text-green-700 text-xs flex items-center gap-2 border-l-2 border-green-500">
            <CheckCircle2 size={12} /> Product updated
          </div>
        )}

        <div className="grid grid-cols-2 gap-6">

          {/* LEFT */}
          <div className="space-y-4">

            <div>
              <label className={labelStyle}>Name</label>
              <input
                name="name"
                value={product.name}
                onChange={handleChange}
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
                <option value="">Select</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelStyle}>Price</label>
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
                rows={3}
                value={product.description}
                onChange={handleChange}
                className={`${inputStyle} resize-none`}
              />
            </div>

          </div>

          {/* RIGHT */}
          <div>

            <label className={labelStyle}>Images</label>

            <div className="relative border-2 border-dashed border-stone-200 p-5 text-center bg-stone-50">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />

              <Upload className="mx-auto text-stone-300 mb-1" size={20}/>
              <p className="text-[9px] text-stone-500 uppercase">
                Upload images
              </p>
            </div>

            <div className="grid grid-cols-4 gap-2 mt-4">
              {previews.map((preview, index) => (
                <div key={index} className="relative h-16 bg-stone-100">
                  <img
                    src={preview.url}
                    alt=""
                    className="w-full h-full object-cover"
                  />

                  <button
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-white p-0.5 text-red-500"
                  >
                    <X size={10}/>
                  </button>
                </div>
              ))}
            </div>

          </div>

        </div>

        <div className="mt-6 flex justify-end pt-4 border-t border-stone-100">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-[#5C4033] text-white px-8 py-3 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 size={12} className="animate-spin"/>
                Updating
              </>
            ) : (
              "Update Product"
            )}
          </button>
        </div>

      </div>
    </div>
  );
}