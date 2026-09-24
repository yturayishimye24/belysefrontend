import React, { useState } from "react";
// Images imports
import BrownCench from "../../src/assets/images/BrownCench.jpeg";
import Cench from "../../src/assets/images/Cench.jpeg";
import BlueCench from "../../src/assets/images/BlueCench.png";
// Library imports
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft } from "lucide-react";
import ScrollLinkedItem from "./ScrollLinkedItem.jsx";

// 1. Unified structure using 'quote' across all members
const TEAM_MEMBERS = [
  {
    id: 1,
    name: "John Doe",
    role: "Consultant, Clinic Operations",
    quote: "I am in charge of consultation at clinic. I take care of all patients who visit our practice. I decide whether they need further treatment. As a result, I play a crucial role in ensuring that each patient receives the best possible care.",
    image: BrownCench,
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "Head Nurse",
    quote: "As the head nurse, I oversee the nursing staff and ensure that patient care is delivered efficiently and compassionately. I coordinate with doctors and other healthcare professionals to create a supportive environment for both patients and staff.",
    image: BlueCench,
  },
  {
    id: 3,
    name: "Marcus Vance",
    role: "Chief Nursing Officer",
    quote: "Our operational strategy focuses heavily on optimizing clinic communication channels. By coordinating seamlessly between care staff and management, we elevate patient outcomes significantly.",
    image: Cench,
  }
];

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 150 : -150,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: "easeInOut" },
  },
  exit: (direction) => ({
    x: direction < 0 ? 150 : -150,
    opacity: 0,
    transition: { duration: 0.3, ease: "easeInOut" },
  }),
};

function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // 2. FIXED: Moved inside the component function so it can read currentIndex state
  const currentMember = TEAM_MEMBERS[currentIndex];

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % TEAM_MEMBERS.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + TEAM_MEMBERS.length) % TEAM_MEMBERS.length,
    );
  };

  return (
    // Fixed: Stripped padding on mobile so it can bleed edge-to-edge
    <div className="w-full md:max-w-5xl md:mx-auto md:px-6 md:py-20">
      
      {/* Fixed: Made wrapper absolute/fixed-friendly on mobile, kept relative spacing on desktop */}
      <div className="relative w-full h-[100dvh] md:h-auto md:max-w-5xl md:mx-auto md:px-16 md:py-12 select-none">
        
        {/* Main Container Wrapper */}
        {/* Fixed: Added w-full h-full rounded-none on mobile, restored rounded/min-h on md */}
        <div className="w-full h-full bg-[#f8f9fa] rounded-none md:rounded-[32px] border-0 md:border border-gray-100 shadow-none md:shadow-sm flex items-center overflow-hidden relative">
          <AnimatePresence mode="wait" custom={direction}>
            <ScrollLinkedItem
              key={currentMember.id} // Re-renders and fires slide animation when ID changes
              className="w-full h-full flex items-center"
            >
              {/* Fixed: Added h-full justify-center and safe overflow for long quotes on short screens */}
              <motion.div
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full h-full p-6 pt-16 pb-20 md:p-16 flex flex-col md:flex-row items-center gap-6 md:gap-16 justify-center overflow-y-auto"
              >
                {/* Left Column: Avatar Layout */}
                <div className="flex-shrink-0 w-[140px] h-[140px] sm:w-[180px] sm:h-[180px] md:w-[260px] md:h-[260px]">
                  <div className="w-full h-full rounded-full overflow-hidden border border-gray-200/60 shadow-inner">
                    <img
                      src={currentMember.image}
                      alt={currentMember.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Right Column: Dynamic Typography Grid */}
                <div className="flex-shrink-0 md:flex-1 text-center md:text-left flex flex-col justify-center max-w-md md:max-w-none">
                  <span className="text-4xl md:text-6xl font-serif text-gray-300 block mb-1 md:mb-2 leading-none md:-ml-2">
                    “
                  </span>

                  <p className="text-base md:text-xl font-light text-gray-700 leading-relaxed -mt-2 md:-mt-4 mb-4 md:mb-6">
                    {currentMember.quote}
                  </p>

                  <div className="border-t border-gray-200/60 pt-3 md:pt-4 inline-block">
                    <p className="text-sm md:text-base font-semibold text-gray-900">
                      {currentMember.name}
                    </p>
                    <p className="text-xs md:text-sm text-gray-500 mt-0.5 font-medium tracking-wide">
                      {currentMember.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            </ScrollLinkedItem>
          </AnimatePresence>
        </div>

        {/* Absolutely Positioned Navigation Buttons */}
        {/* Left Chevron Button */}
        {/* Fixed: Adjusted positioning to overlay elegantly at the bottom/edges on small screens */}
        <button
          onClick={handlePrev}
          className="absolute left-4 bottom-4 md:bottom-auto md:top-1/2 md:-translate-y-1/2 bg-white border border-gray-200 hover:border-gray-400 text-gray-600 p-2.5 md:p-3 rounded-full shadow-sm transition-all hover:shadow-md active:scale-95 z-20"
          aria-label="Previous Team Member"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Right Chevron Button */}
        <button
          onClick={handleNext}
          className="absolute right-4 bottom-4 md:bottom-auto md:top-1/2 md:-translate-y-1/2 bg-white border border-gray-200 hover:border-gray-400 text-gray-600 p-2.5 md:p-3 rounded-full shadow-sm transition-all hover:shadow-md active:scale-95 z-20"
          aria-label="Next Team Member"
         >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}

export default Projects;
