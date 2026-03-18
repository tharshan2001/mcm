import React, { useEffect } from "react";
import { X, CheckCircle2 } from "lucide-react";
import { useAddressStore } from "../../stores/addressStore";

const AddressSelectModal = ({ isOpen, onClose, selectedId, onSelect }) => {
  const { addresses, fetchAddresses } = useAddressStore();

  useEffect(() => {
    if (isOpen) fetchAddresses();
  }, [isOpen, fetchAddresses]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-stone-900/30 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white w-full max-w-md shadow-2xl border border-stone-200 p-6 animate-in fade-in zoom-in-95 duration-300">
        
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-700"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="mb-6 text-center">
          <h3 className="text-xl font-serif text-[#5C4033]">
            Select Address
          </h3>
          <p className="text-[10px] uppercase tracking-[0.3em] text-stone-400 mt-1">
            Delivery Destination
          </p>
        </div>

        {/* Address List */}
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {addresses.map((addr) => (
            <div
              key={addr.id}
              onClick={() => onSelect(addr)}
              className={`p-4 border cursor-pointer transition-all ${
                selectedId === addr.id
                  ? "border-[#5C4033] bg-stone-50"
                  : "border-stone-200 hover:border-stone-300"
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-stone-700">
                    {addr.fullName}
                  </p>
                  <p className="text-xs text-stone-400 mt-1">
                    {addr.addressLine}, {addr.city}
                  </p>
                </div>

                {selectedId === addr.id && (
                  <CheckCircle2 size={16} className="text-[#5C4033]" />
                )}
              </div>

              {addr.isDefault && (
                <span className="text-[9px] uppercase text-stone-400 mt-2 block">
                  Default
                </span>
              )}
            </div>
          ))}
        </div>

        {addresses.length === 0 && (
          <p className="text-center text-sm text-stone-400 py-10">
            No saved addresses.
          </p>
        )}
      </div>
    </div>
  );
};

export default AddressSelectModal;