import React from "react";
import b2profile from "../assets/images/b2profile.png"
const AboutMe = () => {
  return (
    <section className="bg-white min-h-screen flex flex-col items-center justify-center px-4 font-poppins">
      <div className="max-w-4xl w-full mx-auto">
        
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 inline-block relative pb-2">
            About Me
           
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-1.5 bg-[#1B4B79] rounded-full"></span>
          </h2>
        </div>

        <div className="grid grid-cols-1 items-center gap-5 sm:gap-8 md:grid-cols-2">
         
          <div className="w-full h-full min-h-[380px] max-h-[460px] rounded-2xl overflow-hidden shadow-sm">
            <img
              src={b2profile}
              alt="Profile"
              className="h-full w-full object-cover object-center"
            />
          </div>

          {/* Right Column - Color Blocks & Bio */}
          <div className="flex flex-col justify-between space-y-6">
            {/* Accent Color Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#F39C51] h-32 md:h-36 rounded-xl shadow-sm"></div>
              <div className="bg-[#0B4855] h-32 md:h-36 rounded-xl shadow-sm"></div>
            </div>

            {/* Bio Paragraph */}
            <p className="text-gray-700 text-sm md:text-base leading-relaxed font-normal pt-2">
              I’m Belyse Abayisenga, a driven student and problem-solver with a strong 
              passion for STEM, innovation, and leadership. Whether collaborating on 
              complex projects, exploring new technologies, or leading team initiatives, 
              I’m committed to continuous learning and making a meaningful impact 
              through critical thinking and teamwork.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;