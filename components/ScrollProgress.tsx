'use client';

import { useScroll } from './ScrollContext';

export default function ScrollProgress() {
  const { scrollProgress, currentSection } = useScroll();

  const sections = ['Foundation', 'Portfolio', 'Services', 'Contact'];

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-20 hidden md:block">
      <div className="flex flex-col space-y-4">
        {sections.map((section, index) => (
          <div key={section} className="flex items-center space-x-3 group">
            <span
              className={`text-sm font-medium transition-all duration-300 ${
                currentSection === index
                  ? 'text-accent-gold opacity-100'
                  : 'text-gray-500 opacity-0 group-hover:opacity-100'
              }`}
            >
              {section}
            </span>
            <div
              className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                currentSection === index
                  ? 'border-accent-gold bg-accent-gold scale-125'
                  : 'border-gray-600 bg-transparent hover:border-accent-gold'
              }`}
            />
          </div>
        ))}
      </div>

      {/* Connecting line */}
      <div className="absolute right-[5px] top-0 h-full w-0.5 bg-white/10 -z-10" />
    </div>
  );
}
