import React, { useState, useEffect } from "react";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import AOS from "aos"
import 'aos/dist/aos.css';
//images imports
import AboutMe from "../components/AboutMe.jsx";
import BrownCench from "../../src/assets/images/BrownCench.jpeg";
import bprofilepic from "../../src/assets/images/bprofilepic.jpg";
import { useRef } from "react";
import Chelsea from "../../src/assets/images/Chelsea.webp";
import LOGO from "../../src/assets/images/LOGO.png";
//Button design imported from UIVerse
import Button from "../components/ContactButton.jsx";
//New footer import
import NewFooter from "../components/NewFooter.jsx";
//components imports
import Experience from "../components/Experience.jsx";
import Projects from "../components/Projects.jsx";
import RoleSlider from "../components/RolesSlider.jsx";
import Footer from "../components/Footer.jsx";
import NewsletterCard from "../components/Contact.jsx";
//yooprofile
import GoogleProfileHeader from "../components/googleProfileheader.jsx";
//imports for design and animations
import { TweenMax, Power3 } from "gsap";
import CardStack from "../components/Slider.jsx";
import { gsap } from "gsap";
import ClientsCarousel from "../components/Carousel.jsx";
import ScrollLinkedSection from "../components/ScrollLinkedSection.jsx";
import ScrollLinkedItem from "../components/ScrollLinkedItem.jsx";

function Home() {
  const aboutRef = useRef(null);
  const experienceRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);
  const profileRef = useRef(null);
  let textRef = useRef(null);
  const containerRef = useRef(null);
  const mytextRef = useRef(null);
  const pathRef = useRef(null);
  
  useEffect(() =>{
    AOS.init({
      duration: 2000,
      once: true,
    })
  })

  useEffect(() => {

    const ctx = gsap.context(() => {
      gsap.from(mytextRef.current, {
        y: 30,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: 'power3.out',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    // 1. Measure the exact length of the path
    const pathLength = path.getTotalLength();

    // 2. Hide the line completely on mount
    gsap.set(path, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength,
    });

    // 3. Play the drawing animation immediately
    gsap.to(path, {
      strokeDashoffset: 0,
      duration: 1.4,
      ease: 'power2.inOut',
      delay: 0.2, // Short pause so the user sees it start drawing
    });
  }, []);

  useEffect(() => {
    TweenMax.to(
      profileRef.current,
      .9,
      {
        opacity: 1,
        y: -60,
        ease: Power3.easeOut
      }
    )
  }, []);
  useEffect(() => {
    TweenMax.from(
      textRef.current,
      .9,
      {
        opacity: 1,
        ease: Power3.easeOut,
        delay: .3,
        x: -30,
      }
    )
  })

  const handleMoveToAbout = () => {
    if (aboutRef.current) {
      aboutRef.current.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        block: "start",
      });
    }
  };

  const handleMoveToExperience = () => {
    if (experienceRef.current) {
      experienceRef.current.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        block: "start",
      });
    }
  };

  const handleMoveToProjects = () => {
    if (projectsRef.current) {
      projectsRef.current.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        block: "start",
      });
    }
  };

  const handleMoveToContact = () => {
    if (contactRef.current) {
      contactRef.current.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        block: "start",
      });
    }
  };

  const [menuOpen, setMenuOpen] = useState(false);
  const [loading,setLoading] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((isOpen) => !isOpen);
  };

  const causeLoading = () =>{
    try{
      setLoading(true);
    }catch(error){
      console.log("Error laoding");
    }finally{
      setLoading(false);
    }
  }
 
  return (
    
    <div ref={containerRef}
       className="font-poppins"
       id="home"
       >
      
      <nav className="hidden items-center justify-between px-8 py-6 lg:flex xl:px-16">
        <div className="cursor-default text-2xl font-medium xl:text-3xl"><a href="#home">Belyse A.</a></div>

        <div >
          <ul className="flex gap-6 text-lg xl:gap-8 xl:text-2xl">
            <li>
              <a
                onClick={(event) => { event.preventDefault(); handleMoveToAbout(); }}
                href="#about"
                className="hover:text-gray-500 transition-all duration-300"
              >
                About
              </a>
            </li>
            <li>
              <a
                onClick={(event) => { event.preventDefault(); handleMoveToExperience(); }}
                href="#experience"
                className="hover:text-gray-500 transition-all duration-300"
              >
                Experience
              </a>
            </li>
            <li>

              <a
                onClick={(event) => { event.preventDefault(); handleMoveToProjects(); }}
                href="#projects"
                className="hover:text-gray-500 transition-all duration-300"
              >
                Projects
              </a>
            </li>
          </ul>
        </div>

        <div>
          {/* <button className="group flex items-center gap-2 border border-black rounded-full px-6 py-3 hover:bg-black hover:text-white transition-all duration-300">
            <a href="#contact" onClick={handleMoveToContact}>
              Get in touch
            </a>

            <svg
              width="15"
              height="10"
              viewBox="0 0 13 10"
              className="group-hover:translate-x-1 transition-all duration-300"
            >
              <path
                d="M1,5 L11,5"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              ></path>

              <polyline
                points="8 1 12 5 8 9"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              ></polyline>
            </svg>
          </button> */}
          <Button onClick={handleMoveToContact} />
        </div>
      </nav>

      <nav className="relative flex items-center justify-between px-4 py-5 sm:px-8 lg:hidden">
        <a href="#home" className="text-2xl font-bold sm:text-3xl">Belyse A.</a>

        <div>
          <button
            type="button"
            className="flex flex-col gap-1 cursor-pointer"
            onClick={toggleMenu}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            <span
              aria-hidden="true"
              className={`w-8 h-0.5 bg-black transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""
                }`}
            ></span>

            <span
              aria-hidden="true"
              className={`w-8 h-0.5 bg-black transition-all duration-300 ${menuOpen ? "opacity-0" : ""
                }`}
            ></span>

            <span
              aria-hidden="true"
              className={`w-8 h-0.5 bg-black transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
            ></span>
          </button>

          <div
            id="mobile-navigation"
            aria-hidden={!menuOpen}
            inert={!menuOpen}
            className={`absolute right-4 top-full z-50 w-56 max-w-[calc(100vw-2rem)] rounded-lg bg-white shadow-lg overflow-hidden transition-all duration-300 ${menuOpen ? "max-h-96 py-4 px-6" : "max-h-0 py-0 px-6"
              }`}
          >
            <ul className="flex flex-col gap-4 text-center text-lg">
              <li>
                <a
                  href="#about"
                  onClick={(event) => {
                    event.preventDefault();
                    setMenuOpen(false);
                    handleMoveToAbout();
                  }}
                >
                  About
                </a>
              </li>

              <li>
                <a
                  href="#experience"
                  onClick={(event) => {
                    event.preventDefault();
                    setMenuOpen(false);
                    handleMoveToExperience();
                  }}
                >
                  Experience
                </a>
              </li>

              <li>
                <a
                  href="#projects"
                  onClick={(event) => {
                    event.preventDefault();
                    setMenuOpen(false);
                    handleMoveToProjects();
                  }}
                >
                  Projects
                </a>
              </li>

              <li>
                <a href="#contact" onClick={(event) => { event.preventDefault(); setMenuOpen(false); handleMoveToContact(); }}>
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <section
        id="profile"
        className="flex min-h-[calc(100svh-5rem)] flex-col items-center justify-center gap-8 px-4 py-12 sm:gap-12 sm:px-[5%] sm:py-16 xl:min-h-screen xl:flex-row xl:gap-20"
      >
        <div>
          <img
            
            ref={profileRef}
            src={bprofilepic}
            alt="Profile"
            className="h-52 w-52 rounded-full object-cover sm:h-64 sm:w-64 xl:h-[400px] xl:w-[400px]"
          />

        </div>

        <div className="w-full max-w-2xl px-2 text-center">
          <p className="text-lg" data-aos="zoom-out-left">Hello, I'm</p>

          <h1 ref={textRef} className="mt-2 text-4xl font-bold opacity-0 sm:text-6xl"><span className="relative inline-block px-2" data-aos="zoom-in-up">Belyse A.</span>
            <svg
              className="absolute -top-2 -left-2 w-[115%] h-[140%] pointer-events-none overflow-visible"
              viewBox="0 0 200 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                ref={pathRef}
                d="M 10 30 C 10 10, 190 5, 190 30 C 190 55, 15 50, 10 30"
                stroke="#EAB308"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </h1>

          <p className="mt-4 text-xl text-gray-600 sm:text-3xl">a Student</p>

          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <a href="/Belyse_Resume.docx" download>
              <button className="border border-black rounded-full px-8 py-4 hover:bg-black hover:text-white transition-all duration-300" data-aos="fade-up-left" onClick={()=>causeLoading()}>
               {loading?"Downloading...":"Download Resume"}
              </button>
            </a>

            <button className="rounded-full bg-black px-5 py-3 text-sm text-white transition-all duration-300 hover:bg-gray-800 sm:px-8 sm:py-4 sm:text-base" data-aos="fade-up-left" onClick={handleMoveToContact}>
              Contact Info
            </button>
          </div>

          <div className="mt-8 flex justify-center gap-6">
            <FaInstagram size={40} color="purple" className="cursor-pointer hover:text-purple-500 sm:h-[50px] sm:w-[50px]" data-aos="fade-right" />
            <FaLinkedin size={40} color="blue" className="cursor-pointer hover:text-blue-500 sm:h-[50px] sm:w-[50px]" data-aos="fade-left"/>
          </div>
        </div>
      </section>

      {/* About Section */}
      <ScrollLinkedSection
        ref={aboutRef}
        id="about"
        className="min-h-screen px-[5%] py-20 animate-[appearRight_1s_linear]"
      >
       
        

        <div className="flex xl:flex-row flex-col gap-20 items-center justify-center mt-20">
          <div className="max-w-3xl">
            <div className="">
            <AboutMe/>
            </div>
          </div>
        </div>
      </ScrollLinkedSection>

      {/* Experience Section */}
      <ScrollLinkedSection
        ref={experienceRef}
        id="experience"
        className="min-h-screen px-[5%] py-20 animate-[appearLeft_1s_linear]"
      >
        <Experience />
      </ScrollLinkedSection>


      <ScrollLinkedSection
        ref={projectsRef}
        id="projects"
        className="min-h-screen px-[5%]  animate-[appearRight_1s_linear]"
      >
        <p className="text-lg font-semibold text-gray-600 uppercase tracking-wider text-center">Browse My Recent</p>

        <h1 className="text-center text-5xl font-bold mt-2">Projects</h1>

        <Projects />
      </ScrollLinkedSection>
      <ScrollLinkedSection>
        <ClientsCarousel />
      </ScrollLinkedSection>

      <ScrollLinkedSection
        ref={contactRef}
        id="contact"
        className="min-h-screen px-[5%] flex flex-col justify-center items-center mb-20"
      >
        <p className="text-lg font-semibold text-gray-600 uppercase tracking-wider text-center">Get in Touch</p>

        <h1 className="text-5xl font-bold mt-2 mb-20">Contact Me</h1>


        <ScrollLinkedItem className="mt-12 w-full">
          <NewsletterCard />
        </ScrollLinkedItem>

      </ScrollLinkedSection>


      {/* //Footer */}
      <NewFooter />


    </div>
  );
}

export default Home;
