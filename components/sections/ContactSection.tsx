'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useScroll } from '@/components/ScrollContext';
import Image from 'next/image';
import { portfolioData } from '@/lib/portfolioData';

const socialLinks = [
  { name: 'GitHub', icon: '💻', url: portfolioData.personal.github },
  { name: 'LinkedIn', icon: '💼', url: portfolioData.personal.linkedin },
  { name: 'Twitter', icon: '🐦', url: portfolioData.personal.twitter },
  { name: 'Email', icon: '📧', url: `mailto:${portfolioData.personal.email}` },
];

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { currentSection } = useScroll();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  useEffect(() => {
    if (!sectionRef.current) return;

    const elements = sectionRef.current.querySelectorAll('.contact-animate');

    if (currentSection === 4) {
      gsap.to(sectionRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
      });

      gsap.to(elements, {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('Thank you for your message! I\'ll get back to you soon.');
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div
      ref={sectionRef}
      className="opacity-0 translate-y-10 w-full max-w-6xl"
    >
      <div className="w-full h-[80vh] overflow-y-auto pr-2 custom-scrollbar">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-2 text-gradient-gold">Let's Connect</h2>
        <p className="text-center text-gray-400 text-sm mb-6">Get in touch to discuss your next project</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Profile Card */}
          <div className="contact-animate glass-card p-6 opacity-0 translate-y-10">
            <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-accent-gold/30 shadow-xl shadow-accent-gold/20">
              <Image
                src="/images/image.jpg"
                alt="Takunda"
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="text-center mb-4">
              <h3 className="text-2xl font-bold text-gradient-gold mb-1">
                {portfolioData.personal.name}
              </h3>
              <p className="text-sm text-gray-400">{portfolioData.personal.title}</p>
              <p className="text-xs text-gray-500 mt-1">{portfolioData.personal.location}</p>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-accent-gold to-transparent mb-4" />

            <div className="mb-4">
              <p className="text-gray-300 text-center leading-relaxed text-sm">
                {portfolioData.contact.bio}
              </p>
            </div>

            {/* Social Links */}
            <div className="grid grid-cols-2 gap-2">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  className="glass-card glass-card-hover p-3 flex items-center justify-center space-x-2 group"
                >
                  <span className="text-xl transform group-hover:scale-110 transition-transform duration-300">
                    {link.icon}
                  </span>
                  <span className="text-xs font-medium">{link.name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-animate glass-card p-6 opacity-0 translate-y-10">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-xs font-medium mb-1.5 text-gray-300"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="input-glass w-full text-sm"
                  placeholder={portfolioData.contact.formPlaceholders.name}
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-medium mb-1.5 text-gray-300"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="input-glass w-full text-sm"
                  placeholder={portfolioData.contact.formPlaceholders.email}
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-xs font-medium mb-1.5 text-gray-300"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="input-glass w-full resize-none text-sm"
                  placeholder={portfolioData.contact.formPlaceholders.message}
                />
              </div>

              <button
                type="submit"
                className="btn-primary w-full flex items-center justify-center group text-sm py-3"
              >
                <span>Send Message</span>
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
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(200, 121, 60, 0.5);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(200, 121, 60, 0.7);
        }
      `}</style>
    </div>
  );
}
