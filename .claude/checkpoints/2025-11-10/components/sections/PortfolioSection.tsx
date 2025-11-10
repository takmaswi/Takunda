'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useScroll } from '@/components/ScrollContext';

const projects = [
  {
    title: 'E-Commerce Platform',
    description: 'Full-stack solution with real-time inventory and payment processing',
    tech: ['Next.js', 'Stripe', 'PostgreSQL'],
    color: 'from-purple-500 to-pink-500',
  },
  {
    title: '3D Product Configurator',
    description: 'Interactive WebGL experience for custom product visualization',
    tech: ['Three.js', 'React', 'GLSL'],
    color: 'from-cyan-500 to-blue-500',
  },
  {
    title: 'AI-Powered Dashboard',
    description: 'Analytics platform with machine learning insights',
    tech: ['React', 'Python', 'TensorFlow'],
    color: 'from-orange-500 to-red-500',
  },
  {
    title: 'Real-Time Collaboration Tool',
    description: 'WebSocket-based app for team communication and project management',
    tech: ['Node.js', 'Socket.io', 'MongoDB'],
    color: 'from-green-500 to-teal-500',
  },
];

export default function PortfolioSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { currentSection } = useScroll();

  useEffect(() => {
    if (!sectionRef.current) return;

    const cards = sectionRef.current.querySelectorAll('.project-card');

    if (currentSection === 1) {
      gsap.to(sectionRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
      });

      gsap.to(cards, {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power3.out',
      });
    } else {
      gsap.to(sectionRef.current, {
        opacity: 0,
        y: 50,
        duration: 0.5,
        ease: 'power2.in',
      });
    }
  }, [currentSection]);

  return (
    <div
      ref={sectionRef}
      className="opacity-0 translate-y-10"
    >
      <div className="max-w-4xl">
        <h2 className="section-title mb-12">Portfolio</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-card glass-card glass-card-hover p-6 opacity-0 translate-y-10 group"
            >
              <div className={`h-2 w-16 rounded-full bg-gradient-to-r ${project.color} mb-4`} />

              <h3 className="text-2xl font-bold mb-3 group-hover:text-accent-gold transition-colors duration-300">
                {project.title}
              </h3>

              <p className="text-gray-400 mb-4 leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex items-center text-accent-gold hover:text-accent-cyan transition-colors duration-300 cursor-pointer group">
                <span className="text-sm font-semibold animated-underline">
                  View Project
                </span>
                <svg
                  className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
