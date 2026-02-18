import React from "react";

// Forwarding ref is required for react-hook-form
const Input = React.forwardRef(({ label, error, ...props }, ref) => {
  return (
    <div className="flex flex-col w-full">
      {label && <label className="text-white mb-1">{label}</label>}
      <input
        {...props}
        ref={ref} // Important for react-hook-form
        className={`border-b border-white px-0 py-2 bg-black text-white focus:outline-none ${props.className}`}
      />
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
});

export default Input;
