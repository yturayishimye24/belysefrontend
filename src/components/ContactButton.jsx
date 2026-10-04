import React from "react";

// Outlined pill that fills with white on hover. Pass onClick from the parent.
export default function Button({ onClick, children = "Get in touch", dark = false }) {
  const base = "rounded-full border-2 px-6 py-2 text-sm font-semibold transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-400";
  const tone = dark
    ? "border-[#008D9F] text-[#0A4857] hover:bg-[#008D9F] hover:text-white"
    : "border-white text-white hover:bg-white hover:text-[#0A4857]";
  return (
    <button type="button" onClick={onClick} className={`${base} ${tone}`}>
      {children}
    </button>
  );
}