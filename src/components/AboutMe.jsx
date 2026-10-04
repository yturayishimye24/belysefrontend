import React from "react";
import { FaInstagram, FaLinkedin } from "react-icons/fa";

// Replace these placeholders with your real details.
const INFO = [
  ["My name", "Belyse Abayisenga"],
  ["Status", "High school student"],
  ["Location", "Kigali, Rwanda"],
  ["Email", "you@example.com"],
  ["Phone", "+250 000 000 000"],
  ["Open to", "Internships & programs"],
];

const STRENGTHS = [
  ["STEM", "90%"],
  ["Leadership", "85%"],
  ["Teamwork", "95%"],
  ["Problem solving", "88%"],
];

const AboutMe = () => (
  <div className="font-google-sans mx-auto max-w-6xl">
    <div className="grid items-start gap-10 md:grid-cols-2">
      <div>
        <h2 className="text-4xl font-bold sm:text-5xl">About me</h2>
        <p className="mt-2 text-gray-500">I like solving problems and leading projects.</p>
        <div className="mt-6 flex items-center gap-4">
          <a
            href="/Belyse_Resume.docx"
            download
            className="rounded-full bg-gradient-to-r from-[#0D4580] to-[#008D9F] px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-transform hover:-translate-y-0.5"
          >
            Download resume
          </a>
          <a href="#" aria-label="Instagram" className="text-2xl text-[#087b89]"><FaInstagram /></a>
          <a href="#" aria-label="LinkedIn" className="text-2xl text-[#0D4580]"><FaLinkedin /></a>
        </div>
      </div>

      <p className="leading-relaxed text-gray-700">
        I’m Belyse Abayisenga, a driven student and problem-solver with a strong passion for STEM,
        innovation, and leadership. Whether collaborating on complex projects, exploring new
        technologies, or leading team initiatives, I’m committed to continuous learning and making
        a meaningful impact through critical thinking and teamwork.
      </p>
    </div>

    <div className="mt-12 grid items-start gap-8 md:grid-cols-2">
      <div className="grid gap-3">
        {INFO.map(([label, value]) => (
          <details key={label} className="group rounded-2xl border border-[#0D4580]/15 bg-[#eff8fa] px-5 py-4 shadow-sm transition-colors open:border-[#008D9F]/50 open:bg-white sm:px-7 sm:py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold text-[#0A4857] sm:text-xl">
              <span>{label}</span>
              <span className="text-2xl font-normal text-[#008D9F] transition-transform group-open:rotate-45" aria-hidden="true">+</span>
            </summary>
            <p className="pt-4 text-2xl font-semibold leading-snug text-[#15333b] sm:text-3xl">{value}</p>
          </details>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {STRENGTHS.map(([label, value]) => {
          const progress = Number.parseInt(value, 10);
          return (
          <div
            key={label}
            className="flex flex-col justify-center rounded-2xl border border-[#0D4580]/15 bg-white p-5 shadow-sm sm:p-6"
          >
            <div className="flex items-baseline justify-between gap-2">
              <span className="text-base font-semibold text-[#15333b]">{label}</span>
              <span className="text-2xl font-bold text-[#0D4580]">{value}</span>
            </div>
            <div
              className="mt-4 h-2.5 overflow-hidden rounded-full bg-[#dcecef]"
              role="progressbar"
              aria-label={`${label} level`}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={progress}
            >
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#0D4580] to-[#008D9F] transition-[width] duration-700"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          );
        })}
      </div>
    </div>
  </div>
);

export default AboutMe;