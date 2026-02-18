import React from "react";

function Button({ children, onClick, type = "button", className = "" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 rounded-md bg-black text-white hover:bg-gray-900 transition ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
