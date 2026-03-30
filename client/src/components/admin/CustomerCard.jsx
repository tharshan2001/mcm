import React from "react";
import { User, Mail, MapPin, Phone, Edit2, Trash2 } from "lucide-react";

const CustomerCard = React.forwardRef(({ customer, onEdit, onDelete }, ref) => {
  const defaultAddress = customer.addresses?.find(a => a.isDefault) || customer.addresses?.[0];

  return (
    <tr ref={ref} className="hover:bg-[#FCF9F6] transition-colors">
      <td className="p-4 font-mono text-sm text-stone-500">{customer.id}</td>
      <td className="p-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#5C4033]/10 flex items-center justify-center">
            <span className="text-xs font-semibold text-[#5C4033]">
              {customer.fullName?.charAt(0).toUpperCase() || "?"}
            </span>
          </div>
          <span className="font-medium text-stone-800">{customer.fullName}</span>
        </div>
      </td>
      <td className="p-4">
        <div className="flex items-center gap-2 text-stone-500">
          <Mail size={14} />
          <span className="text-sm">{customer.email}</span>
        </div>
      </td>
      <td className="p-4">
        {defaultAddress ? (
          <div className="flex items-start gap-2 text-stone-500">
            <MapPin size={14} className="mt-0.5 shrink-0" />
            <div className="text-sm">
              <p className="text-stone-700">{defaultAddress.addressLine}</p>
              <p className="text-xs text-stone-400">
                {defaultAddress.city}, {defaultAddress.state} {defaultAddress.postalCode}
              </p>
              {defaultAddress.phone && (
                <p className="flex items-center gap-1 text-xs text-stone-400 mt-1">
                  <Phone size={10} />
                  {defaultAddress.phone}
                </p>
              )}
            </div>
          </div>
        ) : (
          <span className="text-sm text-stone-300">No address</span>
        )}
      </td>
      <td className="p-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit(customer)}
            className="p-2 text-stone-400 hover:text-amber-700 hover:bg-amber-50 rounded-lg transition-colors"
            title="Edit"
          >
            <Edit2 size={16} />
          </button>
          <button
            onClick={() => onDelete(customer)}
            className="p-2 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
});

export default CustomerCard;
