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

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "Name must be at least 2 characters";
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10,15}$/.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Enter a valid phone number";
    }
    
    if (!formData.country.trim()) {
      newErrors.country = "Country is required";
    }
    
    if (!formData.addressLine.trim()) {
      newErrors.addressLine = "Address is required";
    }
    
    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }
    
    if (!formData.state.trim()) {
      newErrors.state = "State is required";
    }
    
    if (!formData.postalCode.trim()) {
      newErrors.postalCode = "Postal code is required";
    } else if (!/^\d{4,10}$/.test(formData.postalCode)) {
      newErrors.postalCode = "Enter a valid postal code";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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
    setErrors({});
  }, [initialData, isOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    
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
                value={formData.fullName}
                onChange={handleChange}
                placeholder="e.g. Anton Abitharshan"
                className={`w-full bg-transparent border-b py-2 text-sm outline-none transition-colors placeholder:text-stone-200 ${
                  errors.fullName ? "border-red-400 text-red-600" : "border-stone-200 focus:border-[#5C4033]"
                }`}
              />
              {errors.fullName && <p className="text-[10px] text-red-500 mt-1">{errors.fullName}</p>}
            </div>

            {/* Phone & Country Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="group">
                <label className="text-[9px] uppercase tracking-widest text-stone-400 font-bold">Contact Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full bg-transparent border-b py-2 text-sm outline-none transition-colors ${
                    errors.phone ? "border-red-400 text-red-600" : "border-stone-200 focus:border-[#5C4033]"
                  }`}
                />
                {errors.phone && <p className="text-[10px] text-red-500 mt-1">{errors.phone}</p>}
              </div>
              <div className="group">
                <label className="text-[9px] uppercase tracking-widest text-stone-400 font-bold">Country</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className={`w-full bg-transparent border-b py-2 text-sm outline-none transition-colors ${
                    errors.country ? "border-red-400 text-red-600" : "border-stone-200 focus:border-[#5C4033]"
                  }`}
                />
                {errors.country && <p className="text-[10px] text-red-500 mt-1">{errors.country}</p>}
              </div>
            </div>

            {/* Address Line */}
            <div className="group">
              <label className="text-[9px] uppercase tracking-widest text-stone-400 font-bold">Street Address</label>
              <input
                type="text"
                name="addressLine"
                value={formData.addressLine}
                onChange={handleChange}
                className={`w-full bg-transparent border-b py-2 text-sm outline-none transition-colors ${
                  errors.addressLine ? "border-red-400 text-red-600" : "border-stone-200 focus:border-[#5C4033]"
                }`}
              />
              {errors.addressLine && <p className="text-[10px] text-red-500 mt-1">{errors.addressLine}</p>}
            </div>

            {/* City, State, Zip Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div>
                <label className="text-[9px] uppercase tracking-widest text-stone-400 font-bold">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className={`w-full bg-transparent border-b py-2 text-sm outline-none transition-colors ${
                    errors.city ? "border-red-400 text-red-600" : "border-stone-200 focus:border-[#5C4033]"
                  }`}
                />
                {errors.city && <p className="text-[10px] text-red-500 mt-1">{errors.city}</p>}
              </div>
              <div>
                <label className="text-[9px] uppercase tracking-widest text-stone-400 font-bold">Province</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className={`w-full bg-transparent border-b py-2 text-sm outline-none transition-colors ${
                    errors.state ? "border-red-400 text-red-600" : "border-stone-200 focus:border-[#5C4033]"
                  }`}
                />
                {errors.state && <p className="text-[10px] text-red-500 mt-1">{errors.state}</p>}
              </div>
              <div>
                <label className="text-[9px] uppercase tracking-widest text-stone-400 font-bold">Postal Code</label>
                <input
                  type="number"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  className={`w-full bg-transparent border-b py-2 text-sm outline-none transition-colors ${
                    errors.postalCode ? "border-red-400 text-red-600" : "border-stone-200 focus:border-[#5C4033]"
                  }`}
                />
                {errors.postalCode && <p className="text-[10px] text-red-500 mt-1">{errors.postalCode}</p>}
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