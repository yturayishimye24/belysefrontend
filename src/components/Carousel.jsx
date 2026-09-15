import React, { useRef, useState } from 'react';
import { gsap } from 'gsap';
import ScrollLinkedItem from './ScrollLinkedItem.jsx';

const projects = [
  { id: 1, title: 'Panzer Collect', tag: 'Read More', img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop', color: "#4285F4" },
  { id: 2, title: 'BikeUp', tag: 'Read More', img: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=600&auto=format&fit=crop', color: "#0F9D58" },
  { id: 3, title: 'Basic Apparel', tag: 'Read More', img: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&auto=format&fit=crop', color: "#F4B400" },
  { id: 4, title: 'Shaping Shoe', tag: 'Work with us', img: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&auto=format&fit=crop', color: "#EA4335" },
  { id: 5, title: 'ARKK Project', tag: 'Read More', img: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&auto=format&fit=crop', color: "#34A853" },
  { id: 6, title: 'Bahne TML', tag: 'Read More', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop', color: "#4285F4" },
];

// macOS-style close button: red dot, X fades in only on hover.
function CloseButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label="Close"
      className="group absolute -top-3 -left-3 z-10 flex h-7 w-7 items-center justify-center rounded-full border border-[#e0443e] bg-[#ff5f56] shadow-sm transition-transform active:scale-90"
    >
      <svg viewBox="0 0 8 8" className="h-2.5 w-2.5 opacity-0 transition-opacity duration-150 group-hover:opacity-100">
        <path d="M1 1L7 7M7 1L1 7" stroke="#4d0000" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    </button>
  );
}

export default function ClientsCarousel() {
  const cardsRef = useRef([]);

  // The only piece of state the lightbox needs: which project (or none) is open.
  const [selectedProject, setSelectedProject] = useState(null);

  const handleMouseEnter = (index) => {
    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      if (i === index) {
        gsap.to(card, {
          scaleY: 1.15,
          scaleX: 1.1,
          rotate: 0,
          zIndex: 20,
          duration: 0.4,
          ease: 'power3.out',
        });
      } else {
        gsap.to(card, {
          scaleY: 0.95,
          scaleX: 0.95,
          opacity: 0.6,
          zIndex: 1,
          duration: 0.4,
          ease: 'power3.out',
        });
      }
    });
  };

  const handleMouseLeave = () => {
    cardsRef.current.forEach((card) => {
      if (!card) return;
      gsap.to(card, {
        scaleY: 1,
        scaleX: 1,
        rotate: -2,
        opacity: 1,
        zIndex: 10,
        duration: 0.4,
        ease: 'power3.out',
      });
    });
  };

  return (
    <section className="w-full py-20 overflow-hidden font-poppins">
      {/* Header Section */}
      <div className="max-w-4xl mx-auto text-center px-4 mb-12">
        <h4 className="text-lg font-semibold text-gray-600 uppercase tracking-wider text-center">Involved in community work</h4>
        <h1 className=" text-[3rem] leading-[3.25rem] tracking-[-0.125rem] font-bold">Community Work</h1>
      </div>

      {/* Horizontal Cards Reel */}
      <div className="flex justify-center items-center gap-3 px-8 py-10 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {projects.map((project, index) => (
          <ScrollLinkedItem
            key={project.id}
            ref={(el) => (cardsRef.current[index] = el)}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            onClick={() => setSelectedProject(project)}
            className="relative min-w-[200px] md:min-w-[240px] h-[360px] rounded-2xl overflow-hidden shadow-xl cursor-pointer transform -rotate-2 transition-shadow hover:shadow-2xl flex-shrink-0"
          >
            <img
              src={project.img}
              alt={project.title}
              className="w-full h-full object-cover opacity-90"
            />

            <div
              className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[90%] backdrop-blur-md text-white py-2 px-4 rounded-full text-center flex flex-col items-center"
              style={{ backgroundColor: project.color }}
            >
              <span className="text-xs font-semibold tracking-wide">{project.tag}</span>
            </div>
          </ScrollLinkedItem>
        ))}
      </div>

      {/* Lightbox: only exists in the DOM while selectedProject is truthy */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative w-full max-w-md rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <CloseButton onClick={() => setSelectedProject(null)} />

            <img
              src={selectedProject.img}
              alt={selectedProject.title}
              className="w-full max-h-[75vh] object-cover"
            />

            <div className="py-3 px-4 text-center" style={{ backgroundColor: selectedProject.color }}>
              <span className="text-sm font-semibold tracking-wide text-white">{selectedProject.title}</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}