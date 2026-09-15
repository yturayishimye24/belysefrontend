import React from 'react';
import ScrollLinkedItem from './ScrollLinkedItem.jsx';

export default function NewFooter() {
  return (
    <footer className="w-full bg-white pt-16 pb-8 overflow-hidden">
      {/* Top Section: Oversized Typography */}
      <ScrollLinkedItem className="max-w-7xl mx-auto px-6 flex justify-center items-center">
        <h1 className="text-[12vw] font-bold text-slate-900 tracking-tight leading-none select-none flex items-baseline">
          Bely
          <span className="-translate-y-[0.35em] text-[0.75em] inline-block font-bold">
            s
          </span>
          e
        </h1>
      </ScrollLinkedItem>

      {/* Bottom Navigation Section */}
      <ScrollLinkedItem className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6 text-sm font-medium text-slate-600">
        {/* Brand / Logo */}
        <div className="text-xl font-bold text-slate-900 tracking-tight">
          Belyse
        </div>

        {/* Footer Links */}
        <nav className="flex items-center space-x-6 md:space-x-8">
          <a href="#about" className="hover:text-slate-900 transition-colors">
            About
          </a>
          <a href="#projects" className="hover:text-slate-900 transition-colors">
            Projects
          </a>
          <a href="#privacy" className="hover:text-slate-900 transition-colors">
            Privacy
          </a>
          <a href="#terms" className="hover:text-slate-900 transition-colors">
            Terms
          </a>
        </nav>
      </ScrollLinkedItem>
    </footer>
  );
}