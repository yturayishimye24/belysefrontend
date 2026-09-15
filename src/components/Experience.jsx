import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import ScrollLinkedItem from "./ScrollLinkedItem.jsx";

const OPPORTUNITIES = [
  {
    id: 1,
    title: "Scholarships",
    description: "We offer a range of scholarships designed to assist exceptional school students pursuing a technical or computer secondary education path in modern technology.",
    buttonText: "Read More",
    accentColor: "bg-blue-600",
    bgColor: "bg-blue-50/60"
  },
  {
    id: 2,
    title: "Internships",
    description: "Our #GoogleInterns and residents help build products that create opportunities for everyone. Bring your insight, imagination, and a healthy disregard for the impossible.",
    buttonText: "Read More",
    accentColor: "bg-red-500",
    bgColor: "bg-red-50/60"
  },
  {
    id: 3,
    title: "Apprenticeships",
    description: "Apprentices join different teams to gain practical skills while at Google, and study towards an externally-recognized premium professional qualification.",
    buttonText: "Read More",
    accentColor: "bg-yellow-500",
    bgColor: "bg-yellow-50/60"
  },
  {
    id: 4,
    title: "Programs",
    description: "Dive in to find programs that match your interests. Immerse yourself in software development and technical project work to prepare you for future placement options.",
    buttonText: "Read More",
    accentColor: "bg-green-600",
    bgColor: "bg-green-50/60"
  }
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

function Experience() {
  const pathRef = useRef(null);

  // The only piece of state the lightbox needs: which card (by id) is open.
  const [expandedId, setExpandedId] = useState(null);
  const expandedItem = OPPORTUNITIES.find((item) => item.id === expandedId);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    const pathLength = path.getTotalLength();
    gsap.set(path, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength,
    });
    gsap.to(path, {
      strokeDashoffset: 0,
      duration: 1.4,
      ease: "power2.inOut",
      delay: 0.2,
    });
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-20">
      {/* Title Header Section */}
      <div className="text-center mb-16">
        <h4 className="text-lg font-semibold text-gray-600 uppercase tracking-wider">My Journey</h4>
        <h2 className="text-4xl md:text-5xl font-sans text-gray-900 tracking-tight font-normal">
          <span className="relative inline-block">My high school experiences</span>
        </h2>
      </div>

      {/* Accordion Layout Wrapper */}
      <div className="flex flex-col lg:flex-row items-stretch gap-4 w-full min-h-[420px] group">
        {OPPORTUNITIES.map((item) => (
          <ScrollLinkedItem
            key={item.id}
            className={`relative flex flex-col justify-between overflow-hidden rounded-[24px] border border-gray-100 p-6 md:p-8 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]
              w-full h-auto
              lg:w-1/4 lg:flex-1
              hover:lg:flex-[2.2] hover:shadow-xl hover:shadow-gray-100/70
              group-hover:opacity-85 hover:!opacity-100
              ${item.bgColor}`}
          >
            {/* Top Accent Color Bar */}
            <div className={`absolute top-0 left-0 right-0 h-2 w-full ${item.accentColor}`} />

            <div className="flex flex-col items-center text-center lg:text-left lg:items-start w-full">
              <h3 className="text-2xl md:text-3xl font-sans text-gray-800 tracking-tight mb-4 mt-2">
                {item.title}
              </h3>

              <p className="text-sm md:text-base text-gray-600 font-light leading-relaxed transition-all duration-500 max-w-md
                opacity-100 max-h-[500px]
                lg:opacity-0 lg:max-h-0 lg:overflow-hidden
                [div:hover_&]:lg:opacity-100 [div:hover_&]:lg:max-h-[300px] [div:hover_&]:lg:mt-2"
              >
                {item.description}
              </p>
            </div>

            <div className="mt-8 flex justify-center lg:justify-start w-full">
              <button
                className="inline-flex items-center justify-center border border-gray-300 hover:border-gray-400 bg-white text-blue-600 font-medium px-6 py-2 rounded-full text-sm shadow-sm transition-all duration-200 active:scale-95"
                onClick={() => setExpandedId(item.id)}
              >
                {item.buttonText}
              </button>
            </div>
          </ScrollLinkedItem>
        ))}
      </div>

      {/* Lightbox: only exists in the DOM while expandedItem is truthy */}
      {expandedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={() => setExpandedId(null)}
        >
          <div
            className={`relative w-full max-w-lg rounded-[24px] border border-gray-100 p-8 md:p-10 shadow-2xl ${expandedItem.bgColor}`}
            onClick={(e) => e.stopPropagation()}
          >
            <CloseButton onClick={() => setExpandedId(null)} />
            <div className={`absolute top-0 left-0 right-0 h-2 w-full rounded-t-[24px] ${expandedItem.accentColor}`} />

            <h3 className="text-3xl font-sans text-gray-800 tracking-tight mb-4 mt-2">
              {expandedItem.title}
            </h3>
            <p className="text-base text-gray-600 font-light leading-relaxed">
              {expandedItem.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Experience;