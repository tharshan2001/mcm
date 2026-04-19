import React, { useEffect, useState } from "react";
import { Plus, Loader2 } from "lucide-react";
import { useAddressStore } from "../../stores/addressStore";
import AddressFormModal from "./AddressFormModal";
import sweetAlert from "../../utils/sweetAlert";

const AddressSettings = () => {
  const { 
    addresses = [], 
    loading, 
    fetchAddresses, 
    deleteAddress, 
    setDefaultAddress 
  } = useAddressStore();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  useEffect(() => {
    fetchAddresses();
  }, [fetchAddresses]);

  const handleDelete = async (id) => {
    const result = await sweetAlert.deleteConfirm("this address");
    if (!result.isConfirmed) return;
    await deleteAddress(id);
    sweetAlert.toast("Address removed!");
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      {/* Header: Zero borders, pure typography */}
      <div className="flex justify-between items-end mb-16">
        <div>
          <h2 className="text-2xl font-serif text-[#5C4033]">Shipping Directory</h2>
          <p className="text-[10px] uppercase tracking-[0.3em] text-stone-400 mt-2">Saved Locations</p>
        </div>
        
        <button 
          onClick={() => { setEditingAddress(null); setIsFormOpen(true); }}
          className="group flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold text-stone-800"
        >
          <Plus size={14} className="group-hover:rotate-90 transition-transform duration-300" />
          <span>Add New</span>
        </button>
      </div>

      {loading && !addresses.length ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-stone-200" size={24} />
        </div>
      ) : (
        <div className="divide-y divide-stone-100 overflow-y-auto max-h-[300px] p-10 pt-3">
          {addresses.map((address) => (
            <div 
              key={address.id} 
              className="py-10 first:pt-0 group animate-in fade-in duration-700"
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">
                
                {/* Information Block */}
                <div className="space-y-3">
                  <div className="flex items-center gap-4">
                    <h3 className="font-serif text-lg text-[#5C4033] font-medium">
                      {address.fullName}
                    </h3>
                    {address.isDefault && (
                      <span className="text-[9px] italic text-stone-400 tracking-widest border-l border-stone-200 pl-3">
                        Primary
                      </span>
                    )}
                  </div>

                  <div className="text-[13px] leading-relaxed text-stone-500 font-light max-w-sm">
                    <p>{address.addressLine}</p>
                    <p>{address.city}, {address.state} {address.postalCode}</p>
                    <p className="uppercase tracking-tighter text-[11px] mt-1 text-stone-400">
                      {address.country} &bull; {address.phone}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-6 items-center md:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {!address.isDefault && (
                    <button 
                      onClick={() => setDefaultAddress(address.id)}
                      className="text-[10px] uppercase tracking-widest font-bold text-[#5C4033] hover:underline underline-offset-8"
                    >
                      Set Default
                    </button>
                  )}
                  <button 
                    onClick={() => { setEditingAddress(address); setIsFormOpen(true); }}
                    className="text-[10px] uppercase tracking-widest font-bold text-stone-400 hover:text-stone-800"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(address.id)}
                    className="text-[10px] uppercase tracking-widest font-bold text-stone-300 hover:text-red-400"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && addresses.length === 0 && (
        <p className="text-center py-20 text-stone-300 font-serif italic text-sm">
          No addresses registered.
        </p>
      )}

      {/* ✅ REPLACED MODAL WITH YOUR FORM */}
      <AddressFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        initialData={editingAddress}
      />
    </div>
  );
};

export default AddressSettings;