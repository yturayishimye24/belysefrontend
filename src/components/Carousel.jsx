import React, { useRef, useState } from "react";
import { gsap } from "gsap";
import ScrollLinkedItem from "./ScrollLinkedItem.jsx";

const projects = [
  { id: 1, title: "Panzer Collect", tag: "Read more", img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop" },
  { id: 2, title: "BikeUp", tag: "Read more", img: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=600&auto=format&fit=crop" },
  { id: 3, title: "Basic Apparel", tag: "Read more", img: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&auto=format&fit=crop" },
  { id: 4, title: "Shaping Shoe", tag: "Work with us", img: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&auto=format&fit=crop" },
  { id: 5, title: "ARKK Project", tag: "Read more", img: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&auto=format&fit=crop" },
  { id: 6, title: "Bahne TML", tag: "Read more", img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop" },
];

function CloseButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label="Close"
      className="group absolute -left-3 -top-3 z-10 flex h-7 w-7 items-center justify-center rounded-full border border-[#087b89] bg-[#008D9F] shadow-sm active:scale-90"
    >
      <svg viewBox="0 0 8 8" className="h-2.5 w-2.5 opacity-0 transition-opacity group-hover:opacity-100">
        <path d="M1 1L7 7M7 1L1 7" stroke="white" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    </button>
  );
}

export default function ClientsCarousel() {
  const cardsRef = useRef([]);
  const [selected, setSelected] = useState(null);

  const handleEnter = (index) => {
    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      gsap.to(card, i === index
        ? { scale: 1.1, rotate: 0, zIndex: 20, duration: 0.4, ease: "power3.out" }
        : { scale: 0.95, opacity: 0.6, zIndex: 1, duration: 0.4, ease: "power3.out" });
    });
  };

  const handleLeave = () => {
    cardsRef.current.forEach((card) => {
      if (card) gsap.to(card, { scale: 1, rotate: -2, opacity: 1, zIndex: 10, duration: 0.4, ease: "power3.out" });
    });
  };

  return (
    <section className="w-full overflow-hidden pt-16">
      <div className="mx-auto mb-8 max-w-4xl text-center">
        <p className="text-sm font-semibold text-[#087b89]">Involved in community work</p>
        <h2 className="mt-1 text-4xl font-bold sm:text-5xl">Community work</h2>
      </div>

      <div className="flex items-center gap-3 overflow-x-auto px-6 py-10 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:justify-center">
        {projects.map((p, i) => (
          <ScrollLinkedItem
            key={p.id}
            ref={(el) => (cardsRef.current[i] = el)}
            onMouseEnter={() => handleEnter(i)}
            onMouseLeave={handleLeave}
            onClick={() => setSelected(p)}
            className="relative h-[340px] min-w-[200px] flex-shrink-0 -rotate-2 cursor-pointer overflow-hidden rounded-3xl shadow-xl md:min-w-[230px]"
          >
            <img src={p.img} alt={p.title} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A4857]/85 to-transparent" />
            <div className="absolute bottom-4 left-1/2 w-[88%] -translate-x-1/2 rounded-full bg-white py-2 text-center text-xs font-semibold text-[#0A4857]">
              {p.tag}
            </div>
          </ScrollLinkedItem>
        ))}
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#062f39]/75 p-4" onClick={() => setSelected(null)}>
          <div className="relative w-full max-w-md overflow-hidden rounded-3xl shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={() => setSelected(null)} />
            <img src={selected.img} alt={selected.title} className="max-h-[75vh] w-full object-cover" />
            <div className="bg-gradient-to-r from-[#0D4580] to-[#008D9F] px-4 py-3 text-center">
              <span className="text-sm font-semibold text-white">{selected.title}</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}