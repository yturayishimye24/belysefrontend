import React, { useState, useEffect, useRef } from "react";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { gsap } from "gsap";
import { motion } from "framer-motion";
import bprofilepic from "../../src/assets/images/bprofilepic.jpg";
import AboutMe from "../components/AboutMe.jsx";
import Experience from "../components/Experience.jsx";
import Projects from "../components/Projects.jsx";
import ClientsCarousel from "../components/Carousel.jsx";
import NewsletterCard from "../components/Contact.jsx";
import NewFooter from "../components/NewFooter.jsx";
import ScrollLinkedSection from "../components/ScrollLinkedSection.jsx";
import ScrollLinkedItem from "../components/ScrollLinkedItem.jsx";

const LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Services" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

function Home() {
  const refs = {
    home: useRef(null),
    about: useRef(null),
    experience: useRef(null),
    projects: useRef(null),
    contact: useRef(null),
  };
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-text-item", {
        y: 25,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      });
      gsap.from(".hero-photo-wrapper", {
        scale: 0.95,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        delay: 0.2,
      });
    }, refs.home);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const updateScrollState = () => setHasScrolled(window.scrollY > 60);
    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => second.intersectionRatio - first.intersectionRatio);
        if (visibleSections[0]) setActiveSection(visibleSections[0].target.id);
      },
      { rootMargin: "-20% 0px -50% 0px", threshold: [0, 0.15, 0.4] }
    );

    Object.values(refs).forEach((sectionRef) => {
      if (sectionRef.current) observer.observe(sectionRef.current);
    });
    return () => observer.disconnect();
  }, []);

  const goTo = (id) => {
    setMenuOpen(false);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    refs[id].current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };

  return (
    <div className="font-google-sans bg-[#FDF8F5] text-[#2D2321] min-h-screen overflow-x-hidden">
      {/* FLOATING & STICKY NAVBAR */}
      <div className="pointer-events-none fixed top-0 left-0 right-0 z-[100] flex justify-center p-3 sm:p-4">
        <nav
          className={`pointer-events-auto flex w-full max-w-7xl items-center justify-between transition-all duration-300 rounded-full px-4 sm:px-6 py-2.5 sm:py-3 ${
            hasScrolled
              ? "bg-white/85 border border-black/10 shadow-lg backdrop-blur-md max-w-4xl"
              : "bg-transparent border border-transparent"
          }`}
        >
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); goTo("home"); }}
            className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#2D2321]"
          >
            BA<span className="text-[#FF6B4A]">.</span>
          </a>

          {/* Desktop Nav Items */}
          <ul className="hidden lg:flex items-center gap-1 sm:gap-2">
            {LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={(e) => { e.preventDefault(); goTo(link.id); }}
                  className={`relative block rounded-full px-4 py-1.5 text-xs sm:text-sm font-medium transition-colors hover:text-[#FF6B4A] ${
                    activeSection === link.id ? "text-[#2D2321] font-semibold" : "text-gray-600"
                  }`}
                >
                  {activeSection === link.id && (
                    <motion.span
                      layoutId="active-nav-pill"
                      className="absolute inset-0 rounded-full bg-black/5"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop Action Button */}
          <div className="hidden lg:block">
            <button
              onClick={() => goTo("contact")}
              className="rounded-full border border-black/10 bg-white px-5 py-1.5 text-xs sm:text-sm font-medium text-[#2D2321] shadow-sm transition-all hover:bg-gray-50"
            >
              Let's talk ↗
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="relative lg:hidden">
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/80 border border-black/10 shadow-sm"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label="Toggle menu"
            >
              <div className="flex flex-col gap-1">
                <span className={`h-0.5 w-5 bg-[#2D2321] transition-all ${menuOpen ? "translate-y-1.5 rotate-45" : ""}`} />
                <span className={`h-0.5 w-5 bg-[#2D2321] transition-all ${menuOpen ? "opacity-0" : ""}`} />
                <span className={`h-0.5 w-5 bg-[#2D2321] transition-all ${menuOpen ? "-translate-y-1.5 -rotate-45" : ""}`} />
              </div>
            </button>

            {/* Mobile Dropdown Menu */}
            {menuOpen && (
              <div className="absolute right-0 top-12 w-52 overflow-hidden rounded-2xl border border-black/10 bg-white/95 p-3 text-[#2D2321] shadow-xl backdrop-blur-xl">
                <ul className="flex flex-col gap-1 text-center">
                  {LINKS.map((link) => (
                    <li key={link.id}>
                      <a
                        href={`#${link.id}`}
                        onClick={(e) => { e.preventDefault(); goTo(link.id); }}
                        className={`block rounded-xl px-3 py-2 text-sm ${
                          activeSection === link.id ? "bg-black/5 font-semibold text-[#FF6B4A]" : "text-gray-700"
                        }`}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </nav>
      </div>

      {/* HERO SECTION */}
      <header ref={refs.home} id="home" className="relative overflow-hidden bg-[#FDF8F5] pt-24 sm:pt-32 pb-16 lg:pb-32">
        <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 sm:h-[450px] sm:w-[450px] rounded-full bg-orange-200/40 blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-10 h-80 w-80 sm:h-[500px] sm:w-[500px] rounded-full bg-rose-200/40 blur-3xl" />

        <section className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:px-12">
          {/* Left Text */}
          <div className="text-center lg:text-left">
            <h1 className="hero-text-item text-4xl font-extrabold tracking-tight text-[#2D2321] sm:text-6xl xl:text-7xl">
              Hi, I’m <br />
              <span className="text-[#FF6B4A]">Belyse Abayisenga</span>.
            </h1>
            <p className="hero-text-item mt-3 text-base sm:text-lg font-semibold text-gray-800">
              STEM Enthusiast &amp; Student Leader
            </p>
            <p className="hero-text-item mx-auto mt-2 sm:mt-3 max-w-md text-sm sm:text-base leading-relaxed text-gray-600 lg:mx-0">
              I help build thoughtful digital solutions, tackle complex problems, and drive impactful community initiatives.
            </p>

            <div className="hero-text-item mt-6 sm:mt-8 flex flex-wrap justify-center gap-3 sm:gap-4 lg:justify-start">
              <button
                onClick={() => goTo("projects")}
                className="rounded-full bg-[#FF6B4A] px-6 sm:px-7 py-3 text-xs sm:text-sm font-semibold text-white shadow-md transition-all hover:bg-[#e05838]"
              >
                View my work →
              </button>
              <a
                href="/Belyse_Resume.docx"
                download
                className="rounded-full border border-black/10 bg-white px-6 sm:px-7 py-3 text-xs sm:text-sm font-semibold text-[#2D2321] shadow-sm transition-all hover:bg-gray-50"
              >
                About me 👤
              </a>
            </div>

            <div className="hero-text-item mt-6 flex justify-center gap-5 text-xl text-gray-600 lg:justify-start">
              <a href="#" aria-label="Instagram" className="transition-colors hover:text-[#FF6B4A]"><FaInstagram /></a>
              <a href="#" aria-label="LinkedIn" className="transition-colors hover:text-[#FF6B4A]"><FaLinkedin /></a>
            </div>
          </div>

          {/* Right Intersecting Image */}
          <div className="hero-photo-wrapper relative mx-auto flex justify-center w-full max-w-xs sm:max-w-md lg:max-w-none">
            <div className="relative h-64 w-64 sm:h-80 sm:w-80 lg:h-[380px] lg:w-[380px]">
              <div className="absolute -inset-3 sm:-inset-4 rounded-full border-2 border-dashed border-[#FF6B4A]/30" />

              <div className="relative h-full w-full overflow-hidden rounded-full border-4 sm:border-8 border-white bg-white shadow-2xl">
                <img
                  src={bprofilepic}
                  alt="Belyse Abayisenga"
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Status Badge Overlay */}
              <div className="absolute -bottom-2 -right-1 sm:right-2 z-20 rounded-xl sm:rounded-2xl border border-white/80 bg-white/90 p-2.5 sm:p-4 shadow-xl backdrop-blur-md">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <p className="text-[10px] sm:text-xs font-semibold text-emerald-700">Available for projects</p>
                </div>
                <p className="mt-0.5 text-[10px] sm:text-xs text-gray-500">Based in Kigali, Rwanda</p>
              </div>
            </div>
          </div>
        </section>

        {/* Curved Boundary SVG */}
        <div className="absolute bottom-0 left-0 right-0 h-10 sm:h-16 w-full overflow-hidden leading-none z-0">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block h-full w-full fill-[#F3EFEA]">
            <path d="M0,0 C150,90 350,-40 500,40 C650,120 900,10 1200,40 L1200,120 L0,120 Z" />
          </svg>
        </div>
      </header>

      {/* PAGE SECTIONS */}
      <ScrollLinkedSection ref={refs.about} id="about" className="scroll-mt-16 bg-[#F3EFEA] px-5 sm:px-8 py-12 sm:py-20 lg:px-12">
        <AboutMe />
      </ScrollLinkedSection>

      <ScrollLinkedSection ref={refs.experience} id="experience" className="scroll-mt-16 bg-white px-5 sm:px-8 py-12 sm:py-20 lg:px-12">
        <Experience />
      </ScrollLinkedSection>

      <ScrollLinkedSection ref={refs.projects} id="projects" className="scroll-mt-16 bg-[#F3EFEA] px-5 sm:px-8 py-12 sm:py-20 lg:px-12">
        <p className="text-center text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#FF6B4A]">Selected Work</p>
        <h2 className="mt-1 text-center text-3xl sm:text-5xl font-bold">Projects</h2>
        <Projects />
        <ClientsCarousel />
      </ScrollLinkedSection>

      <ScrollLinkedSection ref={refs.contact} id="contact" className="scroll-mt-16 bg-white px-5 sm:px-8 py-12 sm:py-20 lg:px-12">
        <ScrollLinkedItem className="mx-auto w-full max-w-3xl">
          <NewsletterCard />
        </ScrollLinkedItem>
      </ScrollLinkedSection>

      <NewFooter />
    </div>
  );
}

export default Home;