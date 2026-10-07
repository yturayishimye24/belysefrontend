import React, { useState, useEffect, useRef } from "react";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { gsap } from "gsap";
import { motion } from "framer-motion";
import bprofilepic from "../../src/assets/images/bprofilepic.jpg";
import Button from "../components/ContactButton.jsx";
import AboutMe from "../components/AboutMe.jsx";
import Experience from "../components/Experience.jsx";
import Projects from "../components/Projects.jsx";
import ClientsCarousel from "../components/Carousel.jsx";
import NewsletterCard from "../components/Contact.jsx";
import NewFooter from "../components/NewFooter.jsx";
import ScrollLinkedSection from "../components/ScrollLinkedSection.jsx";
import ScrollLinkedItem from "../components/ScrollLinkedItem.jsx";

const LINKS = [
  { id: "home", label: "Work" },
  { id: "about", label: "About" },
  { id: "experience", label: "Services" },
  { id: "projects", label: "Blog" },
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
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".hero-text > *", { y: 30, opacity: 0, duration: 0.9, stagger: 0.12 })
        .from(".hero-photo", { scale: 0.92, opacity: 0, duration: 0.9 }, 0.2);
    }, refs.home);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const updateScrollState = () => setHasScrolled(window.scrollY > 80);
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
      { rootMargin: "-25% 0px -60% 0px", threshold: [0, 0.15, 0.4, 0.7] }
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
    <div className="font-google-sans bg-[#FDF8F5] text-[#2D2321]">
      {/* HERO SECTION */}
      <header
        ref={refs.home}
        id="home"
        className="relative scroll-mt-20 overflow-hidden bg-[#FDF8F5] text-[#2D2321]"
      >
        {/* Soft Warm Radial Glows */}
        <div className="pointer-events-none absolute -left-20 -top-20 h-[500px] w-[500px] rounded-full bg-orange-200/40 blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-10 h-[600px] w-[600px] rounded-full bg-rose-200/50 blur-3xl" />

        {/* Navigation Bar */}
        <nav className="relative z-20 mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-12">
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); goTo("home"); }}
            className="text-2xl font-extrabold tracking-tight text-[#2D2321]"
          >
            BA<span className="text-[#FF6B4A]">.</span>
          </a>

          <motion.div
            role="group"
            aria-label="Main navigation"
            className={`relative rounded-full transition-[background-color,border-color,box-shadow] duration-300 ${
              hasScrolled
                ? "fixed left-1/2 top-4 z-50 -translate-x-1/2 border border-black/5 bg-white/80 p-1.5 shadow-lg shadow-black/5 backdrop-blur-md"
                : "bg-transparent p-0"
            }`}
          >
            <ul className="hidden items-center gap-2 lg:flex">
              {LINKS.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={(e) => { e.preventDefault(); goTo(link.id); }}
                    className={`relative block rounded-full px-5 py-2 text-sm font-medium transition-colors hover:text-[#FF6B4A] ${
                      activeSection === link.id ? "text-[#2D2321]" : "text-gray-600"
                    }`}
                    aria-current={activeSection === link.id ? "location" : undefined}
                  >
                    {hasScrolled && activeSection === link.id && (
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

            {/* Mobile Hamburger Toggle */}
            <div className="relative lg:hidden">
              <button
                type="button"
                className="flex h-10 w-10 flex-col items-center justify-center gap-1.5"
                onClick={() => setMenuOpen((open) => !open)}
                aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={menuOpen}
              >
                <span className={`h-0.5 w-6 bg-[#2D2321] transition-all ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
                <span className={`h-0.5 w-6 bg-[#2D2321] transition-all ${menuOpen ? "opacity-0" : ""}`} />
                <span className={`h-0.5 w-6 bg-[#2D2321] transition-all ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
              </button>
              <div
                id="mobile-navigation"
                inert={!menuOpen}
                className={`absolute right-0 top-full mt-3 w-56 overflow-hidden rounded-2xl border border-black/5 bg-white/95 text-[#2D2321] shadow-xl backdrop-blur-xl transition-all duration-300 ${
                  menuOpen ? "max-h-96 p-4" : "max-h-0 px-4"
                }`}
              >
                <ul className="flex flex-col gap-2 text-center">
                  {LINKS.map((link) => (
                    <li key={link.id}>
                      <a
                        href={`#${link.id}`}
                        onClick={(e) => { e.preventDefault(); goTo(link.id); }}
                        className={`block rounded-full px-4 py-2 ${
                          activeSection === link.id ? "bg-black/5 font-semibold" : "text-gray-600"
                        }`}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          <div className="hidden lg:block">
            <button
              onClick={() => goTo("contact")}
              className="rounded-full border border-black/10 bg-white px-6 py-2.5 text-sm font-medium text-[#2D2321] shadow-sm transition-all hover:border-black/20 hover:bg-gray-50"
            >
              Let's talk <span className="ml-1 inline-block">↗</span>
            </button>
          </div>
        </nav>

        {/* Hero Body */}
        <section
          id="profile"
          className="hero-text relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-6 pb-24 pt-10 lg:grid-cols-2 lg:px-12 lg:pb-32 lg:pt-16"
        >
          {/* Left Text Column */}
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-extrabold tracking-tight text-[#2D2321] sm:text-6xl xl:text-7xl">
              Hi, I’m <br />
              <span className="text-[#FF6B4A]">Belyse Abayisenga</span>.
            </h1>
            <p className="mt-4 text-lg font-semibold text-gray-800">
              STEM Enthusiast &amp; Student Leader
            </p>
            <p className="mx-auto mt-3 max-w-md text-base leading-relaxed text-gray-600 lg:mx-0">
              I help build thoughtful digital solutions, tackle complex problems, and drive impactful community initiatives.
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start">
              <button
                onClick={() => goTo("projects")}
                className="rounded-full bg-[#FF6B4A] px-7 py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#e05838] hover:shadow-lg"
              >
                View my work →
              </button>
              <a
                href="/Belyse_Resume.docx"
                download
                className="rounded-full border border-black/10 bg-white px-7 py-3.5 text-sm font-semibold text-[#2D2321] shadow-sm transition-all hover:bg-gray-50"
              >
                About me 👤
              </a>
            </div>

            {/* Social Icons */}
            <div className="mt-8 flex justify-center gap-5 text-xl text-gray-600 lg:justify-start">
              <a href="#" aria-label="Instagram" className="transition-colors hover:text-[#FF6B4A]"><FaInstagram /></a>
              <a href="#" aria-label="LinkedIn" className="transition-colors hover:text-[#FF6B4A]"><FaLinkedin /></a>
            </div>
          </div>

          {/* Right Hero Image Column with Floating Card */}
          <div className="hero-photo relative mx-auto flex justify-center">
            <div className="relative h-80 w-80 sm:h-96 sm:w-96 xl:h-[430px] xl:w-[430px]">
              {/* Soft Circle Background Glow */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-orange-200 to-rose-200 blur-xl opacity-70" />

              {/* Circular Photo Container */}
              <div className="relative h-full w-full overflow-hidden rounded-full border-4 border-white shadow-2xl">
                <img
                  src={bprofilepic}
                  alt="Belyse Abayisenga"
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Glassmorphism Floating Card overlay */}
              <div className="absolute -bottom-2 -right-4 max-w-[210px] rounded-2xl border border-white/60 bg-white/70 p-4 shadow-xl backdrop-blur-md sm:right-0">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <p className="text-xs font-semibold text-emerald-600">Available for work</p>
                </div>
                <p className="mt-2 text-xs text-gray-600 leading-snug">
                  Currently accepting new projects &amp; academic collaborations.
                </p>
                <a
                  href="/Belyse_Resume.docx"
                  download
                  className="mt-3 flex items-center justify-between rounded-xl bg-white/80 px-3 py-2 text-xs font-medium text-gray-800 shadow-sm transition-colors hover:bg-white"
                >
                  Download Resume
                  <span>↓</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </header>

      {/* SUB-SECTIONS */}
      <ScrollLinkedSection ref={refs.about} id="about" className="scroll-mt-20 px-6 py-20 lg:px-12">
        <AboutMe />
      </ScrollLinkedSection>

      <ScrollLinkedSection ref={refs.experience} id="experience" className="scroll-mt-20 bg-white px-6 py-20 lg:px-12">
        <Experience />
      </ScrollLinkedSection>

      <ScrollLinkedSection ref={refs.projects} id="projects" className="scroll-mt-20 px-6 py-20 lg:px-12">
        <p className="text-center text-sm font-semibold uppercase tracking-wider text-[#FF6B4A]">Selected Work</p>
        <h2 className="mt-1 text-center text-4xl font-bold sm:text-5xl">Projects</h2>
        <Projects />
        <ClientsCarousel />
      </ScrollLinkedSection>

      <ScrollLinkedSection ref={refs.contact} id="contact" className="scroll-mt-20 bg-white px-6 py-20 lg:px-12">
        <ScrollLinkedItem className="mx-auto w-full max-w-3xl">
          <NewsletterCard />
        </ScrollLinkedItem>
      </ScrollLinkedSection>

      <NewFooter />
    </div>
  );
}

export default Home;