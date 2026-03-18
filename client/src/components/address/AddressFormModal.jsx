import React, { useState, useEffect } from "react";
import { X, Loader2 } from "lucide-react";
import { useAddressStore } from "../../stores/addressStore";

const AddressFormModal = ({ isOpen, onClose, initialData = null }) => {
  const { addAddress, updateAddress, loading } = useAddressStore();
  
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    country: "",
    state: "",
    city: "",
    postalCode: "",
    addressLine: "",
    isDefault: false,
  });

  // Sync form data when initialData (editing) changes
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        fullName: "",
        phone: "",
        country: "",
        state: "",
        city: "",
        postalCode: "",
        addressLine: "",
        isDefault: false,
      });
    }
  }, [initialData, isOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (initialData?.id) {
      await updateAddress(initialData.id, formData);
    } else {
      await addAddress(formData);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-stone-900/20 backdrop-blur-sm animate-in fade-in duration-300" 
        onClick={onClose} 
      />

      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-stone-400 hover:text-[#5C4033] transition-colors"
        >
          <X size={20} strokeWidth={1.5} />
        </button>

        <form onSubmit={handleSubmit} className="p-8 sm:p-12">
          <header className="mb-10">
            <span className="text-[10px] uppercase tracking-[0.4em] text-stone-400 block mb-1">
              Registry Entry
            </span>
            <h3 className="text-2xl font-serif text-[#5C4033]">
              {initialData ? "Update Destination" : "New Address"}
            </h3>
          </header>

          <div className="space-y-8">
            {/* Full Name */}
            <div className="group">
              <label className="text-[9px] uppercase tracking-widest text-stone-400 font-bold">Full Name</label>
              <input
                type="text"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                placeholder="e.g. Anton Abitharshan"
                className="w-full bg-transparent border-b border-stone-200 py-2 text-sm focus:border-[#5C4033] outline-none transition-colors placeholder:text-stone-200"
              />
            </div>

            {/* Phone & Country Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="group">
                <label className="text-[9px] uppercase tracking-widest text-stone-400 font-bold">Contact Phone</label>
                <input
                  type="text"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-stone-200 py-2 text-sm focus:border-[#5C4033] outline-none transition-colors"
                />
              </div>
              <div className="group">
                <label className="text-[9px] uppercase tracking-widest text-stone-400 font-bold">Country</label>
                <input
                  type="text"
                  name="country"
                  required
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-stone-200 py-2 text-sm focus:border-[#5C4033] outline-none transition-colors"
                />
              </div>
            </div>

            {/* Address Line */}
            <div className="group">
              <label className="text-[9px] uppercase tracking-widest text-stone-400 font-bold">Street Address</label>
              <input
                type="text"
                name="addressLine"
                required
                value={formData.addressLine}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-stone-200 py-2 text-sm focus:border-[#5C4033] outline-none transition-colors"
              />
            </div>

            {/* City, State, Zip Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div>
                <label className="text-[9px] uppercase tracking-widest text-stone-400 font-bold">City</label>
                <input
                  type="text"
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-stone-200 py-2 text-sm focus:border-[#5C4033] outline-none transition-colors"
                />
              </div>
              <div>
                <label className="text-[9px] uppercase tracking-widest text-stone-400 font-bold">State</label>
                <input
                  type="text"
                  name="state"
                  required
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-stone-200 py-2 text-sm focus:border-[#5C4033] outline-none transition-colors"
                />
              </div>
              <div>
                <label className="text-[9px] uppercase tracking-widest text-stone-400 font-bold">Postal Code</label>
                <input
                  type="text"
                  name="postalCode"
                  required
                  value={formData.postalCode}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-stone-200 py-2 text-sm focus:border-[#5C4033] outline-none transition-colors"
                />
              </div>
            </div>

            {/* Default Checkbox */}
            <div className="flex items-center gap-3 py-2">
              <input
                type="checkbox"
                id="isDefault"
                name="isDefault"
                checked={formData.isDefault}
                onChange={handleChange}
                className="w-4 h-4 border-stone-300 rounded text-[#5C4033] focus:ring-[#5C4033] cursor-pointer"
              />
              <label htmlFor="isDefault" className="text-[11px] uppercase tracking-widest text-stone-500 cursor-pointer">
                Set as primary delivery address
              </label>
            </div>
          </div>

          <div className="mt-12 flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-[#5C4033] text-white py-5 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-stone-800 transition-all flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : initialData ? "Update Entry" : "Save Entry"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-stone-200 text-stone-400 py-5 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-stone-50 hover:text-stone-800 transition-all"
            >
              Discard
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddressFormModal;