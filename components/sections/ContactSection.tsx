'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useScroll } from '@/components/ScrollContext';
import Image from 'next/image';
import { portfolioData } from '@/lib/portfolioData';
import emailjs from '@emailjs/browser';

const socialLinks = [
  { name: 'GitHub', icon: '💻', url: portfolioData.personal.github },
  { name: 'LinkedIn', icon: '💼', url: portfolioData.personal.linkedin },
  { name: 'Facebook', icon: '📘', url: portfolioData.personal.facebook },
  { name: 'Instagram', icon: '📸', url: portfolioData.personal.instagram },
  { name: 'TikTok', icon: '🎵', url: portfolioData.personal.tiktok },
  { name: 'Email', icon: '📧', url: `mailto:${portfolioData.personal.email}` },
];

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const { currentSection } = useScroll();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    if (!sectionRef.current) return;

    const elements = sectionRef.current.querySelectorAll('.contact-animate');

    if (currentSection === 6) {
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
    }
  }, [currentSection]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // REPLACE THESE WITH YOUR ACTUAL EMAILJS KEYS
      // Sign up at https://www.emailjs.com/
      // 1. Create a Service (e.g., Gmail) -> Get Service ID
      // 2. Create an Email Template -> Get Template ID
      // 3. Account -> API Keys -> Get Public Key

      // For now, we'll simulate a success if keys aren't set, or try to send if they are.
      const result = await emailjs.sendForm(
        'service_789y2za',
        'bxiutza',
        formRef.current,
        'gLnXTfHh1jRfvZ7cz'
      );

      console.log('Email sent successfully:', result.text);

      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });

      // Clear success message after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);

    } catch (error) {
      console.error('Failed to send email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
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
      <div className="w-full flex flex-col items-center">

        {/* Vertical Line Decoration */}
        <div className="w-px h-16 bg-gradient-to-b from-transparent to-accent-cyan/50 mb-6 flex-shrink-0"></div>

        <h2 className="text-4xl md:text-5xl font-cinzel font-bold text-center mb-4 text-white tracking-widest drop-shadow-md">
          CONTACT
        </h2>
        <div className="w-12 h-px bg-accent-cyan mx-auto mb-8"></div>

        <p className="text-center text-gray-300 text-sm mb-10 font-inter tracking-wide">
          Get in touch to discuss your next project
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
          {/* Profile Card */}
          <div className="contact-animate glass-card p-8 opacity-0 translate-y-10 border border-white/5 relative overflow-hidden group">
            {/* Subtle shine effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

            <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-2 border-accent-cyan/30 shadow-lg shadow-accent-cyan/10">
              <Image
                src="/images/image.jpg"
                alt="Takunda"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                priority
              />
            </div>

            <div className="text-center mb-6">
              <h3 className="text-2xl font-cinzel font-bold text-white mb-2 tracking-wide">
                {portfolioData.personal.name}
              </h3>
              <p className="text-sm font-inter text-accent-cyan uppercase tracking-widest">{portfolioData.personal.title}</p>
              <p className="text-xs text-gray-500 mt-2 font-inter">{portfolioData.personal.location}</p>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />

            <div className="mb-8">
              <p className="text-gray-300 text-center leading-relaxed text-sm font-light font-inter">
                {portfolioData.contact.bio}
              </p>
            </div>

            {/* Social Links */}
            <div className="grid grid-cols-2 gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  className="p-3 flex items-center justify-center space-x-3 group bg-black/40 border border-white/10 hover:border-accent-cyan/50 hover:bg-accent-cyan/10 transition-all duration-300 rounded-sm"
                >
                  <span className="text-lg transform group-hover:scale-110 transition-transform duration-300">
                    {link.icon}
                  </span>
                  <span className="text-xs font-medium font-inter text-gray-300 group-hover:text-white tracking-wide">{link.name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-animate glass-card p-8 opacity-0 translate-y-10 border border-white/5">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-xs font-bold mb-3 text-accent-cyan uppercase tracking-wider font-inter"
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
                  className="w-full bg-white/5 border border-white/10 rounded-sm px-6 py-4 text-base text-white placeholder-gray-500 focus:outline-none focus:border-accent-cyan focus:bg-white/10 transition-all duration-300 font-inter"
                  placeholder={portfolioData.contact.formPlaceholders.name}
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-bold mb-3 text-accent-cyan uppercase tracking-wider font-inter"
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
                  className="w-full bg-white/5 border border-white/10 rounded-sm px-6 py-4 text-base text-white placeholder-gray-500 focus:outline-none focus:border-accent-cyan focus:bg-white/10 transition-all duration-300 font-inter"
                  placeholder={portfolioData.contact.formPlaceholders.email}
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-xs font-bold mb-3 text-accent-cyan uppercase tracking-wider font-inter"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full bg-white/5 border border-white/10 rounded-sm px-6 py-4 text-base text-white placeholder-gray-500 focus:outline-none focus:border-accent-cyan focus:bg-white/10 transition-all duration-300 resize-none font-inter"
                  placeholder={portfolioData.contact.formPlaceholders.message}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full border font-cinzel font-bold py-5 rounded-sm transition-all duration-300 tracking-widest flex items-center justify-center group mt-4 text-lg ${isSubmitting
                  ? 'bg-gray-800 border-gray-700 text-gray-500 cursor-not-allowed'
                  : 'bg-accent-cyan/10 border-accent-cyan/30 hover:bg-accent-cyan/20 hover:border-accent-cyan/60 text-accent-cyan hover:text-white hover:shadow-[0_0_20px_rgba(6,182,212,0.3)]'
                  }`}
              >
                {isSubmitting ? (
                  <span>SENDING...</span>
                ) : (
                  <>
                    <span>SEND MESSAGE</span>
                    <svg
                      className="w-5 h-5 ml-3 transform group-hover:translate-x-1 transition-transform duration-300"
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
                  </>
                )}
              </button>

              {submitStatus === 'success' && (
                <div className="text-green-400 text-xs text-center font-inter tracking-wide animate-pulse">
                  Message sent successfully! I'll get back to you soon.
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="text-red-400 text-xs text-center font-inter tracking-wide">
                  Something went wrong. Please try again or email me directly.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>


    </div>
  );
}
