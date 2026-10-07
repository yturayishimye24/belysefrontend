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

  // Safely trigger entry animation without breaking image opacity
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
    const updateScrollState = () => setHasScrolled(window.scrollY > 40);
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
      <header ref={refs.home} id="home" className="relative scroll-mt-20 overflow-hidden bg-[#FDF8F5]">
        {/* Soft Ambient Background Glows */}
        <div className="pointer-events-none absolute -left-20 -top-20 h-[500px] w-[500px] rounded-full bg-orange-200/40 blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-10 h-[600px] w-[600px] rounded-full bg-rose-200/40 blur-3xl" />

        {/* STICKY NAVIGATION BAR */}
        <div className="sticky top-0 z-50 w-full transition-all duration-300">
          <nav
            className={`mx-auto flex max-w-7xl items-center justify-between px-6 py-4 transition-all lg:px-12 ${
              hasScrolled
                ? "mt-2 rounded-full border border-black/5 bg-white/80 shadow-md backdrop-blur-md"
                : "bg-transparent"
            }`}
          >
            <a
              href="#home"
              onClick={(e) => { e.preventDefault(); goTo("home"); }}
              className="text-2xl font-extrabold tracking-tight text-[#2D2321]"
            >
              BA<span className="text-[#FF6B4A]">.</span>
            </a>

            <div role="group" aria-label="Main navigation">
              <ul className="hidden items-center gap-1 lg:flex">
                {LINKS.map((link) => (
                  <li key={link.id}>
                    <a
                      href={`#${link.id}`}
                      onClick={(e) => { e.preventDefault(); goTo(link.id); }}
                      className={`relative block rounded-full px-5 py-2 text-sm font-medium transition-colors hover:text-[#FF6B4A] ${
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

              {/* Mobile Hamburger Toggle */}
              <div className="relative lg:hidden">
                <button
                  type="button"
                  className="flex h-10 w-10 flex-col items-center justify-center gap-1.5"
                  onClick={() => setMenuOpen((open) => !open)}
                  aria-label="Toggle navigation"
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
            </div>

            <div className="hidden lg:block">
              <button
                onClick={() => goTo("contact")}
                className="rounded-full border border-black/10 bg-white px-6 py-2.5 text-sm font-medium text-[#2D2321] shadow-sm transition-all hover:bg-gray-50"
              >
                Let's talk <span className="ml-1 inline-block">↗</span>
              </button>
            </div>
          </nav>
        </div>

        {/* HERO CONTENT */}
        <section
          id="profile"
          className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-6 pb-32 pt-12 lg:grid-cols-2 lg:px-12 lg:pb-40"
        >
          {/* Left Text Column */}
          <div className="text-center lg:text-left">
            <h1 className="hero-text-item text-5xl font-extrabold tracking-tight text-[#2D2321] sm:text-6xl xl:text-7xl">
              Hi, I’m <br />
              <span className="text-[#FF6B4A]">Belyse Abayisenga</span>.
            </h1>
            <p className="hero-text-item mt-4 text-lg font-semibold text-gray-800">
              STEM Enthusiast &amp; Student Leader
            </p>
            <p className="hero-text-item mx-auto mt-3 max-w-md text-base leading-relaxed text-gray-600 lg:mx-0">
              I help build thoughtful digital solutions, tackle complex problems, and drive impactful community initiatives.
            </p>

            <div className="hero-text-item mt-8 flex flex-wrap justify-center gap-4 lg:justify-start">
              <button
                onClick={() => goTo("projects")}
                className="rounded-full bg-[#FF6B4A] px-7 py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#e05838]"
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

            <div className="hero-text-item mt-8 flex justify-center gap-5 text-xl text-gray-600 lg:justify-start">
              <a href="#" aria-label="Instagram" className="transition-colors hover:text-[#FF6B4A]"><FaInstagram /></a>
              <a href="#" aria-label="LinkedIn" className="transition-colors hover:text-[#FF6B4A]"><FaLinkedin /></a>
            </div>
          </div>

          {/* Right Image Container (Intersecting curved background line) */}
          <div className="hero-photo-wrapper relative mx-auto flex justify-center">
            <div className="relative h-80 w-80 sm:h-96 sm:w-96 xl:h-[420px] xl:w-[420px]">
              {/* Circular Background Accent Curve */}
              <div className="absolute -inset-4 rounded-full border-2 border-dashed border-[#FF6B4A]/30 animate-spin-slow" />

              {/* Main Circular Profile Image */}
              <div className="relative h-full w-full overflow-hidden rounded-full border-8 border-white bg-white shadow-2xl">
                <img
                  src={bprofilepic}
                  alt="Belyse Abayisenga"
                  className="h-full w-full object-cover"
                  loading="eager"
                />
              </div>

              {/* Floating glassmorphism status pill */}
              <div className="absolute -bottom-4 right-2 z-20 rounded-2xl border border-white/80 bg-white/80 p-4 shadow-xl backdrop-blur-md sm:right-4">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <p className="text-xs font-semibold text-emerald-700">Available for projects</p>
                </div>
                <p className="mt-1 text-xs text-gray-500">Based in Kigali, Rwanda</p>
              </div>
            </div>
          </div>
        </section>

        {/* Curved Intersection Edge at the bottom of Hero */}
        <div className="absolute bottom-0 left-0 right-0 h-16 w-full overflow-hidden leading-none z-0">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block h-full w-full fill-[#F3EFEA]">
            <path d="M0,0 C150,90 350,-40 500,40 C650,120 900,10 1200,40 L1200,120 L0,120 Z" />
          </svg>
        </div>
      </header>

      {/* ABOUT SECTION */}
      <ScrollLinkedSection ref={refs.about} id="about" className="scroll-mt-20 bg-[#F3EFEA] px-6 py-20 lg:px-12">
        <AboutMe />
      </ScrollLinkedSection>

      <ScrollLinkedSection ref={refs.experience} id="experience" className="scroll-mt-20 bg-white px-6 py-20 lg:px-12">
        <Experience />
      </ScrollLinkedSection>

      <ScrollLinkedSection ref={refs.projects} id="projects" className="scroll-mt-20 bg-[#F3EFEA] px-6 py-20 lg:px-12">
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