import React, { useState, useEffect } from "react";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import AOS from "aos"
import 'aos/dist/aos.css';
//images imports
import BrownCench from "../../src/assets/images/BrownCench.jpeg";
import cench from "../../src/assets/images/Cench.jpeg";
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
      aboutRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleMoveToExperience = () => {
    if (experienceRef.current) {
      experienceRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleMoveToProjects = () => {
    if (projectsRef.current) {
      projectsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleMoveToContact = () => {
    if (contactRef.current) {
      contactRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
 
  return (
    
    <div ref={containerRef}

       id="home"
       >
      
      <nav className="hidden xl:flex justify-between items-center px-16 py-6">
        <div className="text-3xl font-medium cursor-default"><a onClick={()=>document.getElementById("home").scrollIntoView({behavior:"smooth"})}>Belyse A.</a></div>

        <div >
          <ul className="flex gap-8 text-2xl">
            <li>
              <a
                onClick={handleMoveToAbout}
                href="#about"
                className="hover:text-gray-500 transition-all duration-300"
              >
                About
              </a>
            </li>
            <li>
              <a
                onClick={handleMoveToExperience}
                href="#experience"
                className="hover:text-gray-500 transition-all duration-300"
              >
                Experience
              </a>
            </li>
            <li>

              <a
                onClick={handleMoveToProjects}
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

      <nav className="flex xl:hidden justify-between items-center px-8 py-6 relative">
        <div className="text-2xl font-medium"><h1 className="text-4xl font-bold">Belyse A.</h1></div>

        <div>
          <div
            className="flex flex-col gap-1 cursor-pointer"
            onClick={toggleMenu}
          >
            <span
              className={`w-8 h-0.5 bg-black transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""
                }`}
            ></span>

            <span
              className={`w-8 h-0.5 bg-black transition-all duration-300 ${menuOpen ? "opacity-0" : ""
                }`}
            ></span>

            <span
              className={`w-8 h-0.5 bg-black transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
            ></span>
          </div>

          <div
            className={`absolute right-8 top-20 bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-300 ${menuOpen ? "max-h-96 py-4 px-8" : "max-h-0 py-0 px-8"
              }`}
          >
            <ul className="flex flex-col gap-4 text-center text-lg">
              <li>
                <a
                  href="#about"
                  onClick={() => {
                    toggleMenu();
                    handleMoveToAbout();
                  }}
                >
                  About
                </a>
              </li>

              <li>
                <a
                  href="#experience"
                  onClick={() => {
                    toggleMenu();
                    handleMoveToExperience();
                  }}
                >
                  Experience
                </a>
              </li>

              <li>
                <a
                  href="#projects"
                  onClick={() => {
                    toggleMenu();
                    handleMoveToProjects();
                  }}
                >
                  Projects
                </a>
              </li>

              <li>
                <a href="#contact" onClick={() => { toggleMenu(); handleMoveToContact() }}>
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <section
        id="profile"
        className="min-h-screen flex xl:flex-row flex-col justify-center items-center gap-20 px-[5%]"
      >
        <div>
          <img
            
            ref={profileRef}
            src={cench}
            alt="Profile"
            className="w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] md:w-[275px] md:h-[275px] xl:w-[400px] xl:h-[400px] object-cover rounded-full md:z-[-1]"
          />

        </div>

        <div className="text-center">
          <p className="text-lg" data-aos="zoom-out-left">Hello, I'm</p>

          <h1 ref={textRef} className="text-6xl font-bold mt-2 opacity-0"><span className="relative inline-block px-2" data-aos="zoom-in-up">Belyse A.</span>
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

          <p className="text-3xl mt-4 text-gray-600">a Student</p>

          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <a href="/ThisWillBeUpdatedIfBessySharesMeHerCV.pdf" download>
              <button className="border border-black rounded-full px-8 py-4 hover:bg-black hover:text-white transition-all duration-300" data-aos="fade-up-left">
                Download CV
              </button>
            </a>

            <button className="bg-black text-white rounded-full px-8 py-4 hover:bg-gray-800 transition-all duration-300" data-aos="fade-up-left">
              Contact Info
            </button>
          </div>

          <div className="flex justify-center gap-6 mt-8">
            <FaInstagram size={50} color="purple" className="hover:text-purple-500 cursor-pointer" data-aos="fade-right" />
            <FaLinkedin size={50} color="blue" className="hover:text-blue-500 cursor-pointer" data-aos="fade-left"/>
          </div>
        </div>
      </section>

      {/* About Section */}
      <ScrollLinkedSection
        ref={aboutRef}
        id="about"
        className="min-h-screen px-[5%] py-20 animate-[appearRight_1s_linear]"
      >
        <p className="text-lg font-semibold text-gray-600 uppercase tracking-wider text-center"><span className="relative inline-block px-2">Get To Know More
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
          </svg></span></p>

        <h1 className="text-center text-4xl md:text-5xl font-sans text-gray-900 tracking-tight font-normal">
          About Me
        </h1>

        <div className="flex xl:flex-row flex-col gap-20 items-center justify-center mt-20">
          <div className="max-w-3xl">
            <div className="">
            <CardStack/>
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
