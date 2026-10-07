import React, { useState } from "react";
import { FaInstagram, FaLinkedin } from "react-icons/fa";

const FAQS = [
  { label: "My name", value: "Belyse Abayisenga" },
  { label: "Status", value: "High school student & STEM Enthusiast" },
  { label: "Location", value: "Kigali, Rwanda" },
  { label: "Email", value: "you@example.com" },
  { label: "Open to", value: "Internships, projects & collaborations" },
];

const STRENGTHS = [
  { label: "STEM Projects", value: "90%", date: "Ongoing" },
  { label: "Leadership", value: "85%", date: "Active" },
  { label: "Teamwork", value: "95%", date: "Core Skill" },
  { label: "Problem Solving", value: "88%", date: "Core Skill" },
];

const AboutMe = () => {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <div className="font-google-sans mx-auto max-w-6xl">
      {/* 1. Section Header */}
      <div className="grid items-start gap-8 lg:gap-10 md:grid-cols-2">
        <div>
          <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#FF6B4A]">Get to know me</span>
          <h2 className="mt-1 text-3xl sm:text-5xl font-extrabold text-[#2D2321]">About Me</h2>
          <p className="mt-2 text-sm sm:text-base text-gray-600">I like solving complex problems and leading impactful projects.</p>

          <div className="mt-5 flex flex-wrap items-center gap-3 sm:gap-4">
            <a
              href="/Belyse_Resume.docx"
              download
              className="rounded-full bg-[#FF6B4A] px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-white shadow-md transition-all hover:bg-[#e05838]"
            >
              Download Resume
            </a>
            <div className="flex items-center gap-3">
              <a href="#" aria-label="Instagram" className="text-xl sm:text-2xl text-gray-700 hover:text-[#FF6B4A]"><FaInstagram /></a>
              <a href="#" aria-label="LinkedIn" className="text-xl sm:text-2xl text-gray-700 hover:text-[#FF6B4A]"><FaLinkedin /></a>
            </div>
          </div>
        </div>

        <p className="leading-relaxed text-gray-700 text-sm sm:text-base lg:text-lg">
          I’m Belyse Abayisenga, a driven student and problem-solver with a strong passion for STEM,
          innovation, and leadership. Whether collaborating on complex projects, exploring new
          technologies, or leading team initiatives, I’m committed to continuous learning and making
          a meaningful impact through critical thinking and teamwork.
        </p>
      </div>

      {/* 2. FAQ Accordion + Progress Cards */}
      <div className="mt-12 sm:mt-16 grid items-start gap-8 lg:gap-12 lg:grid-cols-2">
        {/* FAQ Accordion Details */}
        <div className="space-y-3 sm:space-y-4">
          <h3 className="text-xl sm:text-2xl font-bold text-[#2D2321] mb-4">Frequently Asked Details</h3>
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div key={faq.label} className="border-b border-gray-300/80 pb-3 sm:pb-4">
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="flex w-full items-center justify-between text-left text-base sm:text-xl font-bold text-[#1a5fb4] transition-colors hover:text-blue-700"
                >
                  <span>{faq.label}?</span>
                  <span className="ml-2 text-xl sm:text-2xl font-light text-blue-600">
                    {isOpen ? "✕" : "+"}
                  </span>
                </button>
                {isOpen && (
                  <p className="mt-2 text-xs sm:text-base text-gray-700 transition-all leading-relaxed">
                    {faq.value}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Progress Cards */}
        <div className="grid grid-cols-2 gap-4 sm:gap-5">
          <h3 className="text-xl sm:text-2xl font-bold text-[#2D2321] mb-1">Core Competencies</h3>
          {STRENGTHS.map((item) => {
            const pct = Number.parseInt(item.value, 10);
            return (
              <div
                key={item.label}
                className="rounded-2xl sm:rounded-3xl bg-[#1C1C1E] p-4 sm:p-6 text-white shadow-xl border border-white/10"
              >
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400">⚙</span>
                    <span className="font-semibold">{item.label}</span>
                  </div>
                  <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] sm:text-xs text-gray-300">
                    {item.date}
                  </span>
                </div>

                <div className="mt-2 sm:mt-3 text-2xl sm:text-4xl font-extrabold tracking-tight">
                  {item.value}
                </div>

                
                <div className="mt-3 sm:mt-4 relative h-5 sm:h-6 w-full overflow-hidden rounded-full bg-orange p-0.5 sm:p-1">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-300 shadow-[0_0_12px_#34d399] transition-all duration-1000"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AboutMe;