'use client';

import { useScroll } from './ScrollContext';

export default function ScrollProgress() {
  const { scrollProgress, currentSection } = useScroll();

  const sections = ['Foundation', 'Portfolio', 'Services', 'Contact'];

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-20 hidden md:block">
      <div className="flex flex-row space-x-6">
        {sections.map((section, index) => (
          <div key={section} className="flex flex-col items-center space-y-2 group">
            <div
              className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                currentSection === index
                  ? 'border-accent-gold bg-accent-gold scale-125'
                  : 'border-gray-600 bg-transparent hover:border-accent-gold'
              }`}
            />
            <span
              className={`text-xs font-medium transition-all duration-300 ${
                currentSection === index
                  ? 'text-accent-gold opacity-100'
                  : 'text-gray-500 opacity-0 group-hover:opacity-100'
              }`}
            >
              {section}
            </span>
          </div>
        ))}
      </div>

      {/* Connecting line */}
      <div className="absolute bottom-[5px] left-0 w-full h-0.5 bg-white/10 -z-10" />
    </div>
  );
}
