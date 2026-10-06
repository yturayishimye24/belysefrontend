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
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
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

  // One orchestrated load moment: hero text rises in, photo settles.
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
      { rootMargin: "-25% 0px -60% 0px", threshold: [0, 0.15, 0.4, 0.7] },
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
    <div className="font-google-sans bg-white text-[#15333b]">
      {/* HERO */}
      <header
        ref={refs.home}
        id="home"
        className="relative scroll-mt-20 overflow-hidden bg-gradient-to-br from-[#0D4580] via-[#0A4857] to-[#008D9F] text-white"
      >
        <nav className="relative z-20 mx-auto flex max-w-7xl items-center justify-between px-5 py-6 lg:px-10">
          <a href="#home" onClick={(e) => { e.preventDefault(); goTo("home"); }} className="text-3xl font-bold tracking-tight lg:text-4xl">
            Belyse<span className="text-cyan-200">.</span>
          </a>
          <motion.div
            role="group"
            aria-label="Main navigation"
            className={`relative rounded-full border p-1 text-white transition-[background-color,border-color,box-shadow] duration-300 ${hasScrolled ? "fixed left-1/2 top-4 z-50 -translate-x-1/2 border-white/15 bg-[#0A4857]/90 shadow-xl shadow-[#062f39]/20 backdrop-blur-xl" : "border-transparent bg-transparent shadow-none"}`}
          >
            <ul className="hidden items-center gap-1 lg:flex">
              {LINKS.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={(e) => { e.preventDefault(); goTo(link.id); }}
                    className={`relative block rounded-full px-4 py-2 text-sm font-medium transition-colors hover:bg-white/10 hover:text-cyan-100 ${activeSection === link.id ? "text-white" : "text-white/75"}`}
                    aria-current={activeSection === link.id ? "location" : undefined}
                  >
                    {hasScrolled && activeSection === link.id && (
                      <motion.span
                        layoutId="active-nav-pill"
                        className="absolute inset-0 rounded-full bg-white/15 ring-1 ring-white/20"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="relative lg:hidden">
              <button
                type="button"
                className="flex h-10 w-10 flex-col items-center justify-center gap-1.5"
                onClick={() => setMenuOpen((open) => !open)}
                aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={menuOpen}
                aria-controls="mobile-navigation"
              >
                <span className={`h-0.5 w-6 bg-white transition-all ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
                <span className={`h-0.5 w-6 bg-white transition-all ${menuOpen ? "opacity-0" : ""}`} />
                <span className={`h-0.5 w-6 bg-white transition-all ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
              </button>
              <div
                id="mobile-navigation"
                inert={!menuOpen}
                className={`absolute right-0 top-full mt-3 w-56 overflow-hidden rounded-2xl border border-white/20 bg-[#0A4857]/95 text-white shadow-xl backdrop-blur-xl transition-all duration-300 ${menuOpen ? "max-h-96 p-4" : "max-h-0 px-4"}`}
              >
                <ul className="flex flex-col gap-2 text-center">
                  {LINKS.map((link) => (
                    <li key={link.id}>
                      <a
                        href={`#${link.id}`}
                        onClick={(e) => { e.preventDefault(); goTo(link.id); }}
                        className={`block rounded-full px-4 py-2 ${activeSection === link.id ? "bg-white/15 text-white" : "text-white/80"}`}
                        aria-current={activeSection === link.id ? "location" : undefined}
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
            <Button onClick={() => goTo("contact")} />
          </div>
        </nav>

        <section
          id="profile"
          className="hero-text relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-5 pb-28 pt-8 lg:grid-cols-2 lg:px-10 lg:pb-36 lg:pt-16"
        >
          <div className="text-center lg:text-left">
            <p className="text-3xl font-light tracking-wide sm:text-4xl">Hello, I'm</p>
            <h1 className="mt-2 text-5xl font-bold leading-tight sm:text-6xl xl:text-7xl">Belyse Abayisenga</h1>
            <p className="mx-auto mt-5 max-w-md text-base text-cyan-50 lg:mx-0">
              Student, problem-solver and team leader with a passion for STEM and innovation.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start">
              <button
                onClick={() => goTo("contact")}
                className="rounded-full bg-black px-8 py-3 text-sm text-white font-semibold transition-transform hover:-translate-y-0.5"
              >
                Contact me
              </button>
              <a
                href="/Belyse_Resume.docx"
                download
                className="rounded-full border-2 border-white/80 px-8 py-3 text-sm font-semibold transition-colors hover:bg-white hover:text-[#0A4857]"
              >
                Download resume
              </a>
            </div>

            <div className="mt-8 flex justify-center gap-5 text-2xl lg:justify-start">
              <a href="#" aria-label="Instagram" className="transition-colors hover:text-cyan-200"><FaInstagram /></a>
              <a href="#" aria-label="LinkedIn" className="transition-colors hover:text-cyan-200"><FaLinkedin /></a>
            </div>
          </div>

          <div className="hero-photo relative mx-auto h-72 w-72 sm:h-96 sm:w-96 xl:h-[460px] xl:w-[460px]">
            <span className="absolute -left-4 top-6 h-14 w-14 rounded-full border-[6px] border-yellow-400" aria-hidden="true" />
            <span className="absolute right-2 top-0 h-6 w-6 rounded-full border-2 border-white" aria-hidden="true" />
              <div className="h-full w-full overflow-hidden rounded-3xl border-8 border-white/20 bg-white shadow-2xl">
                <img src={bprofilepic} alt="Belyse Abayisenga" width="330" height="330" fetchPriority="high" decoding="async" className="h-full w-full object-contain" />
            </div>
            <div className="absolute -bottom-4 left-0 rounded-2xl bg-white px-5 py-3 text-[#1a1033] shadow-xl">
              <p className="text-3xl font-bold leading-none">STEM</p>
              <p className="mt-1 text-xs text-gray-500">Student &amp; leader</p>
            </div>
          </div>
        </section>

        {/* Curved white edge into the next section */}
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="absolute bottom-0 left-0 h-16 w-full lg:h-24" aria-hidden="true">
          <path d="M0,120 L0,70 Q720,-40 1440,70 L1440,120 Z" fill="#ffffff" />
        </svg>
      </header>

      <ScrollLinkedSection ref={refs.about} id="about" className="scroll-mt-20 px-5 py-20 lg:px-10">
        <AboutMe />
      </ScrollLinkedSection>

      <ScrollLinkedSection ref={refs.experience} id="experience" className="scroll-mt-20 bg-[#eff8fa] px-5 py-20 lg:px-10">
        <Experience />
      </ScrollLinkedSection>

      <ScrollLinkedSection ref={refs.projects} id="projects" className="scroll-mt-20 px-5 py-20 lg:px-10">
        <p className="text-center text-sm font-semibold text-[#087b89]">Browse my recent</p>
        <h2 className="mt-1 text-center text-4xl font-bold sm:text-5xl">Projects</h2>
        <Projects />
        <ClientsCarousel />
      </ScrollLinkedSection>

      <ScrollLinkedSection ref={refs.contact} id="contact" className="scroll-mt-20 bg-[#eff8fa] px-5 py-20 lg:px-10">
        <ScrollLinkedItem className="mx-auto w-full max-w-3xl">
          <NewsletterCard />
        </ScrollLinkedItem>
      </ScrollLinkedSection>

      <NewFooter />
    </div>
  );
}

export default Home;