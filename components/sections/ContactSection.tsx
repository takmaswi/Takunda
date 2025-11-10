'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useScroll } from '@/components/ScrollContext';
import Image from 'next/image';

const socialLinks = [
  { name: 'GitHub', icon: '💻', url: '#' },
  { name: 'LinkedIn', icon: '💼', url: '#' },
  { name: 'Twitter', icon: '🐦', url: '#' },
  { name: 'Email', icon: '📧', url: 'mailto:contact@takunda.com' },
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

    if (currentSection === 3) {
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
      className="opacity-0 translate-y-10"
    >
      <div className="max-w-5xl">
        <h2 className="section-title mb-12">Let's Connect</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Profile Card */}
          <div className="contact-animate glass-card p-8 opacity-0 translate-y-10">
            <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden border-4 border-accent-gold/30 shadow-xl shadow-accent-gold/20">
              <Image
                src="/images/image.jpg"
                alt="Takunda"
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="text-center mb-6">
              <h3 className="text-3xl font-bold text-gradient-gold mb-2">
                TAKUNDA
              </h3>
              <p className="text-gray-400">Full-Stack Developer & Designer</p>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-accent-gold to-transparent mb-6" />

            <div className="space-y-4 mb-8">
              <p className="text-gray-300 text-center leading-relaxed">
                I'm always excited to collaborate on new projects and discuss
                innovative ideas. Let's create something amazing together!
              </p>
            </div>

            {/* Social Links */}
            <div className="grid grid-cols-2 gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  className="glass-card glass-card-hover p-4 flex items-center justify-center space-x-2 group"
                >
                  <span className="text-2xl transform group-hover:scale-110 transition-transform duration-300">
                    {link.icon}
                  </span>
                  <span className="text-sm font-medium">{link.name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-animate glass-card p-8 opacity-0 translate-y-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2 text-gray-300"
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
                  className="input-glass w-full"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2 text-gray-300"
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
                  className="input-glass w-full"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2 text-gray-300"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="input-glass w-full resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button
                type="submit"
                className="btn-primary w-full flex items-center justify-center group"
              >
                <span>Send Message</span>
                <svg
                  className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
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
    </div>
  );
}
