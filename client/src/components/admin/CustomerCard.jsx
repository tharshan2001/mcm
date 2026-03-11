import React from "react";

const CustomerCard = React.forwardRef(({ customer }, ref) => {
  return (
    <tr ref={ref} className="hover:bg-[#FCF9F6] transition-colors">
      <td className="p-4 font-mono text-sm">{customer.id}</td>
      <td className="p-4 font-mono text-sm">{customer.fullName}</td>
      <td className="p-4 font-mono text-sm">{customer.email}</td>
      <td className="p-4 font-mono text-sm">{customer.phoneNumber || "-"}</td>
    </tr>
  );
});

export default CustomerCard;