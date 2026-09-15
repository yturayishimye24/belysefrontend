import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function GoogleProfileHeader() {
  const containerRef = useRef(null);
  const leftIconsRef = useRef([]);
  const rightIconsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.5, yoyo: true });

      // Animate left floating icons towards the center avatar
      tl.to(
        leftIconsRef.current,
        {
          x: 120,
          scale: 0.2,
          opacity: 0,
          duration: 1.2,
          stagger: 0.1,
          ease: 'power3.inOut',
        },
        0
      );

      // Animate right floating icons towards the center avatar
      tl.to(
        rightIconsRef.current,
        {
          x: -120,
          scale: 0.2,
          opacity: 0,
          duration: 1.2,
          stagger: 0.1,
          ease: 'power3.inOut',
        },
        0
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full flex flex-col items-center justify-center py-16 bg-slate-50"
    >
      {/* Animation Canvas */}
      <div className="relative flex items-center justify-center h-32 w-full max-w-lg mb-4">
        {/* Left Floating Icons */}
        <div className="absolute left-8 flex items-center gap-6">
          <div
            ref={(el) => (leftIconsRef.current[0] = el)}
            className="w-12 h-12 rounded-2xl bg-blue-500 flex items-center justify-center shadow-md text-white font-bold"
          >
            &#9881;
          </div>
          <div
            ref={(el) => (leftIconsRef.current[1] = el)}
            className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center shadow-md text-white font-bold"
          >
            &#128737;
          </div>
        </div>

        {/* Center Main Avatar */}
        <div className="relative z-10 w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop"
            alt="Profile Avatar"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Floating Icons */}
        <div className="absolute right-8 flex items-center gap-6">
          <div
            ref={(el) => (rightIconsRef.current[0] = el)}
            className="w-12 h-12 rounded-2xl bg-red-500 flex items-center justify-center shadow-md text-white font-bold"
          >
            &#9993;
          </div>
          <div
            ref={(el) => (rightIconsRef.current[1] = el)}
            className="w-12 h-12 rounded-full bg-yellow-500 flex items-center justify-center shadow-md text-white font-bold"
          >
            &#9733;
          </div>
        </div>
      </div>

      {/* User Info Details */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-800">Yves Turayishimye</h2>
        <p className="text-sm text-slate-500 mt-1">yturayishimye@gmail.com</p>
      </div>
    </div>
  );
}