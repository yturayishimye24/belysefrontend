import React, { useState } from "react";
import BrownCench from "../../src/assets/images/BrownCench.jpeg";
import Cench from "../../src/assets/images/Cench.jpeg";
import BlueCench from "../../src/assets/images/BlueCench.png";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft } from "lucide-react";
import ScrollLinkedItem from "./ScrollLinkedItem.jsx";

// Placeholder content: replace with your own projects.
const TEAM_MEMBERS = [
  { id: 1, name: "John Doe", role: "Consultant, Clinic Operations", image: BrownCench,
    quote: "I am in charge of consultation at clinic. I take care of all patients who visit our practice. I decide whether they need further treatment. As a result, I play a crucial role in ensuring that each patient receives the best possible care." },
  { id: 2, name: "Jane Smith", role: "Head Nurse", image: BlueCench,
    quote: "As the head nurse, I oversee the nursing staff and ensure that patient care is delivered efficiently and compassionately. I coordinate with doctors and other healthcare professionals to create a supportive environment for both patients and staff." },
  { id: 3, name: "Marcus Vance", role: "Chief Nursing Officer", image: Cench,
    quote: "Our operational strategy focuses heavily on optimizing clinic communication channels. By coordinating seamlessly between care staff and management, we elevate patient outcomes significantly." },
];

const slideVariants = {
  enter: (d) => ({ x: d > 0 ? 150 : -150, opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { duration: 0.4, ease: "easeInOut" } },
  exit: (d) => ({ x: d < 0 ? 150 : -150, opacity: 0, transition: { duration: 0.3, ease: "easeInOut" } }),
};

const arrow =
  "absolute top-1/2 z-20 -translate-y-1/2 rounded-full bg-[#0A4857] p-3 text-white shadow-md transition-transform hover:bg-[#008D9F] active:scale-95";

function Projects() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const member = TEAM_MEMBERS[index];
  const n = TEAM_MEMBERS.length;

  const go = (step) => {
    setDirection(step);
    setIndex((i) => (i + step + n) % n);
  };

  return (
    <div className="mx-auto max-w-5xl py-12">
      <div className="relative select-none px-14 md:px-16">
        <div className="relative flex min-h-[560px] items-center overflow-hidden rounded-[32px] bg-[#eff8fa] md:min-h-[400px]">
          <AnimatePresence mode="wait" custom={direction}>
            <ScrollLinkedItem key={member.id} className="w-full">
              <motion.div
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="flex w-full flex-col items-center gap-8 p-8 md:flex-row md:gap-14 md:p-14"
              >
                <div className="h-44 w-44 flex-shrink-0 overflow-hidden rounded-full border-8 border-white shadow-lg md:h-64 md:w-64">
                  <img src={member.image} alt={member.name} className="h-full w-full object-cover" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <p className="text-lg leading-relaxed text-gray-700 md:text-xl">“{member.quote}”</p>
                  <div className="mt-6 inline-block border-t-2 border-[#008D9F] pt-3">
                    <p className="font-semibold">{member.name}</p>
                    <p className="text-sm text-[#087b89]">{member.role}</p>
                  </div>
                </div>
              </motion.div>
            </ScrollLinkedItem>
          </AnimatePresence>
        </div>

        <button onClick={() => go(-1)} className={`${arrow} left-0`} aria-label="Previous project"><ChevronLeft size={20} /></button>
        <button onClick={() => go(1)} className={`${arrow} right-0`} aria-label="Next project"><ChevronRight size={20} /></button>
      </div>
    </div>
  );
}

export default Projects;