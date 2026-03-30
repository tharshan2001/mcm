import React, { useState, useEffect } from "react";
import { X, Loader2 } from "lucide-react";
import { getCustomerById, updateCustomer } from "../../service/userService";
import sweetAlert from "../../utils/sweetAlert";

export default function CustomerUpdateModal({ isOpen, onClose, customerId, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (isOpen && customerId) {
      fetchCustomer();
    }
  }, [isOpen, customerId]);

  const fetchCustomer = async () => {
    setFetching(true);
    try {
      const customer = await getCustomerById(customerId);
      setFormData({
        fullName: customer.fullName || "",
        email: customer.email || "",
        phone: customer.phone || "",
      });
    } catch (error) {
      sweetAlert.error("Failed to load customer details");
      onClose();
    } finally {
      setFetching(false);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateCustomer(customerId, formData);
      sweetAlert.toast("Customer updated successfully!");
      onSuccess();
      onClose();
    } catch (error) {
      sweetAlert.error(error.response?.data?.message || "Failed to update customer");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-600"
        >
          <X size={20} />
        </button>

        <div className="p-6">
          <h2 className="text-xl font-serif text-stone-800 mb-6">Edit Customer</h2>

          {fetching ? (
            <div className="flex justify-center py-8">
              <Loader2 className="animate-spin text-amber-700" size={32} />
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-stone-600 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:outline-none focus:border-[#5C4033]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-600 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:outline-none focus:border-[#5C4033]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-600 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:outline-none focus:border-[#5C4033]"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-2 border border-stone-200 text-stone-600 rounded-lg hover:bg-stone-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-4 py-2 bg-[#5C4033] text-white rounded-lg hover:bg-[#4a352a] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading && <Loader2 size={16} className="animate-spin" />}
                  Save Changes
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
