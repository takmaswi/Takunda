'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useScroll } from '@/components/ScrollContext';

const services = [
  {
    icon: '🎨',
    title: 'Web Design & Development',
    description:
      'Custom websites and web applications built with modern technologies and best practices.',
    features: ['Responsive Design', 'Performance Optimization', 'SEO Ready'],
  },
  {
    icon: '🚀',
    title: '3D & Interactive Experiences',
    description:
      'Immersive WebGL experiences that engage users and showcase products in stunning detail.',
    features: ['Three.js', 'GSAP Animations', 'Custom Shaders'],
  },
  {
    icon: '⚡',
    title: 'Full-Stack Solutions',
    description:
      'End-to-end development from database design to deployment and maintenance.',
    features: ['API Development', 'Database Design', 'Cloud Deployment'],
  },
  {
    icon: '🎯',
    title: 'Consulting & Strategy',
    description:
      'Technical guidance and architectural decisions to help your project succeed.',
    features: ['Code Review', 'Architecture Planning', 'Performance Audits'],
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { currentSection } = useScroll();

  useEffect(() => {
    if (!sectionRef.current) return;

    const cards = sectionRef.current.querySelectorAll('.service-card');

    if (currentSection === 2) {
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
        <h2 className="section-title mb-12">Services</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card glass-card glass-card-hover p-8 opacity-0 translate-y-10 group"
            >
              <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>

              <h3 className="text-2xl font-bold mb-3 group-hover:text-gradient-gold transition-all duration-300">
                {service.title}
              </h3>

              <p className="text-gray-400 mb-6 leading-relaxed">
                {service.description}
              </p>

              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li
                    key={featureIndex}
                    className="flex items-center text-sm text-gray-300"
                  >
                    <svg
                      className="w-4 h-4 mr-2 text-accent-gold"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
