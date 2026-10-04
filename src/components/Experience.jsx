import React, { useState } from "react";
import ScrollLinkedItem from "./ScrollLinkedItem.jsx";

const OPPORTUNITIES = [
  { id: 1, title: "Scholarships", buttonText: "Read more", description: "We offer a range of scholarships designed to assist exceptional school students pursuing a technical or computer secondary education path in modern technology." },
  { id: 2, title: "Internships", buttonText: "Read more", description: "Our #GoogleInterns and residents help build products that create opportunities for everyone. Bring your insight, imagination, and a healthy disregard for the impossible." },
  { id: 3, title: "Apprenticeships", buttonText: "Read more", description: "Apprentices join different teams to gain practical skills while at Google, and study towards an externally-recognized premium professional qualification." },
  { id: 4, title: "Programs", buttonText: "Read more", description: "Dive in to find programs that match your interests. Immerse yourself in software development and technical project work to prepare you for future placement options." },
];

// macOS-style close button: red dot, X fades in on hover.
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

function Experience() {
  const [expandedId, setExpandedId] = useState(null);
  const expanded = OPPORTUNITIES.find((o) => o.id === expandedId);

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-14 text-center">
        <p className="text-sm font-semibold text-[#087b89]">My journey</p>
        <h2 className="mt-1 text-4xl font-bold sm:text-5xl">My high school experiences</h2>
      </div>

      <div className="group flex min-h-[380px] flex-col items-stretch gap-4 lg:flex-row">
        {OPPORTUNITIES.map((item) => (
          <ScrollLinkedItem
            key={item.id}
            className="relative flex w-full flex-col justify-between overflow-hidden rounded-3xl border-2 border-transparent bg-white p-7 shadow-sm transition-all duration-500 hover:border-[#008D9F] hover:shadow-xl lg:flex-1 hover:lg:flex-[2.2] group-hover:opacity-80 hover:!opacity-100"
          >
            <div>
              <div className="mb-5 h-1.5 w-14 rounded-full bg-gradient-to-r from-[#0D4580] to-[#008D9F]" />
              <h3 className="text-2xl font-semibold">{item.title}</h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-gray-600 transition-all duration-500 lg:max-h-0 lg:overflow-hidden lg:opacity-0 [div:hover_&]:lg:mt-4 [div:hover_&]:lg:max-h-72 [div:hover_&]:lg:opacity-100">
                {item.description}
              </p>
            </div>
            <button
              className="mt-8 self-start rounded-full border-2 border-[#008D9F] px-6 py-2 text-sm font-semibold text-[#0A4857] transition-colors hover:bg-[#008D9F] hover:text-white"
              onClick={() => setExpandedId(item.id)}
            >
              {item.buttonText}
            </button>
          </ScrollLinkedItem>
        ))}
      </div>

      {expanded && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#062f39]/75 p-4" onClick={() => setExpandedId(null)}>
          <div className="relative w-full max-w-lg rounded-3xl bg-white p-8 shadow-2xl md:p-10" onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={() => setExpandedId(null)} />
            <div className="mb-5 h-1.5 w-14 rounded-full bg-gradient-to-r from-[#0D4580] to-[#008D9F]" />
            <h3 className="mb-3 text-3xl font-semibold">{expanded.title}</h3>
            <p className="leading-relaxed text-gray-600">{expanded.description}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Experience;