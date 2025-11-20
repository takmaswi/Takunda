
import React from 'react';
// Portfolio Data - Complete Resume Integration

import {
  Palette,
  Box,
  Briefcase,
  Layers,
  BrainCircuit
} from 'lucide-react';

export interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  color?: string;
}

export interface Project {
  title: string;
  description: string;
  tech: string[];
  color: string;
  category: string;
  link?: string;
}

export interface Skill {
  name: string;
  level?: number;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  description?: string;
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
}

export const portfolioData = {
  personal: {
    name: "Takunda Christopher Maswi",
    title: "Full-Stack Developer & IT Consultant",
    email: "takmaswi@gmail.com",
    phone: "+263783952522",
    location: "Harare, Zimbabwe",
    linkedin: "https://www.linkedin.com/in/takunda-christopher-maswi-97672045",
    github: "https://github.com/takunda-maswi",
    facebook: "#",
    instagram: "#",
    tiktok: "#",
  },

  experience: {
    years: "4",
    projectsCompleted: "20+",
  },

  introduction: {
    tagline: "Building digital experiences that blend creativity with technology.",
    mainParagraph: `I'm a full-stack developer and IT consultant passionate about crafting immersive web experiences. With 4+ years of experience in software development, AML compliance, and business consulting, I combine technical expertise with strategic thinking to deliver innovative solutions that drive business value. Specialized in 3D web experiences, AI integration, and digital transformation.`,
  },

  techStack: [
    "React",
    "Next.js",
    "Three.js",
    "TypeScript",
    "Node.js",
    "Python",
    "SQL",
    "WebGL",
    "GSAP",
    "Docker",
    "Cloud Deployment",
    "N8N",
    "AI/LLM Integration",
  ],

  services: [
    {
      icon: <Palette size={40} strokeWidth={1.5} />,
      title: "Web Design & Development",
      description:
        "Custom websites and web applications built with modern technologies and best practices. Creating responsive, performant, SEO-optimized digital experiences that engage users and drive results.",
      features: [
        "Responsive Design",
        "Performance Optimization",
        "SEO Ready",
        "Modern Stack",
      ],
      color: "from-pink-500 to-purple-500",
    },
    {
      icon: <Box size={40} strokeWidth={1.5} />,
      title: "3D & Interactive Experiences",
      description:
        "Immersive WebGL experiences that engage users and showcase products in stunning detail. Custom 3D rendering, animations, and interactive elements using Three.js and advanced graphics techniques.",
      features: [
        "Three.js",
        "GSAP Animations",
        "Custom Shaders",
        "Real-time Rendering",
      ],
      color: "from-cyan-500 to-blue-500",
    },
    {
      icon: <Briefcase size={40} strokeWidth={1.5} />,
      title: "Business Consulting & IT Solutions",
      description:
        "Strategic IT guidance and business process optimization. Specializing in AML/compliance frameworks, data protection, system integration, and technology solutions that streamline operations.",
      features: [
        "AML Compliance",
        "Data Protection Strategy",
        "Process Optimization",
        "System Architecture",
      ],
      color: "from-orange-500 to-red-500",
    },
    {
      icon: <Layers size={40} strokeWidth={1.5} />,
      title: "Full-Stack Development",
      description:
        "End-to-end application development from database design to frontend implementation. Building scalable solutions with modern frameworks, cloud deployment, and API integration.",
      features: [
        "API Development",
        "Database Design",
        "Cloud Deployment",
        "System Integration",
      ],
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: <BrainCircuit size={40} strokeWidth={1.5} />,
      title: "AI Integration & Automation",
      description:
        "Harness the power of AI and automation to transform your business. LLM integration, workflow automation with N8N, and intelligent solutions that improve efficiency and decision-making.",
      features: [
        "LLM Integration",
        "N8N Automation",
        "AI Model Implementation",
        "Custom AI Solutions",
      ],
      color: "from-green-500 to-teal-500",
    },
  ] as Service[],

  projects: [
    // --- PAGE 1: Enterprise & Business Solutions (9 Projects) ---
    {
      title: "E-Commerce Platform",
      description:
        "Full-stack online shopping solution with real-time inventory management and secure payment processing",
      tech: ["Next.js", "Stripe", "PostgreSQL"],
      color: "from-purple-500 to-pink-500",
      category: "Enterprise",
    },
    {
      title: "Financial Compliance System",
      description:
        "Enterprise-grade AML compliance and financial tracking platform for accounting firms",
      tech: ["Next.js", "React", "Node.js", "PostgreSQL"],
      color: "from-purple-600 to-indigo-600",
      category: "Enterprise",
    },
    {
      title: "Accounting Software",
      description:
        "Small business accounting solution with invoicing, reporting, and financial analytics",
      tech: ["Next.js", "React", "PostgreSQL", "Charts.js"],
      color: "from-yellow-500 to-orange-400",
      category: "Business",
    },
    {
      title: "Inventory Management",
      description:
        "Stock tracking system with order management, supplier tracking, and automated alerts",
      tech: ["Next.js", "PostgreSQL", "REST API", "Charts.js"],
      color: "from-amber-500 to-yellow-600",
      category: "Business",
    },
    {
      title: "Business Productivity Suite",
      description: "Comprehensive project management and productivity tool for enterprise teams",
      tech: ["React", "TypeScript", "Firebase"],
      color: "from-cyan-400 to-teal-500",
      category: "SaaS",
    },
    {
      title: "Task Management System",
      description:
        "Kanban-style project manager with drag-and-drop, team collaboration, and notifications",
      tech: ["React", "Redux", "Firebase", "DnD Kit"],
      color: "from-blue-500 to-indigo-500",
      category: "Productivity",
    },
    {
      title: "Headless CMS Platform",
      description:
        "Flexible content management system with custom blocks and multi-language support",
      tech: ["Next.js", "Sanity CMS", "GraphQL"],
      color: "from-indigo-500 to-purple-600",
      category: "CMS",
    },
    {
      title: "Real Estate Marketplace",
      description:
        "Property listing platform with virtual tours, map integration, and payment processing",
      tech: ["React", "Google Maps", "Stripe", "PostgreSQL"],
      color: "from-emerald-500 to-green-600",
      category: "E-Commerce",
    },
    {
      title: "Team Collaboration Platform",
      description:
        "Real-time communication and project management tool with WebSocket integration",
      tech: ["Node.js", "Socket.io", "MongoDB"],
      color: "from-green-500 to-teal-500",
      category: "Real-time",
    },

    // --- PAGE 2: AI, Data & Tech Tools (9 Projects) ---
    {
      title: "AI Analytics Dashboard",
      description: "Machine learning powered analytics platform with predictive insights and data visualization",
      tech: ["React", "Python", "TensorFlow"],
      color: "from-orange-500 to-red-500",
      category: "AI/ML",
    },
    {
      title: "AI Customer Support Bot",
      description:
        "Intelligent chatbot with natural language processing and sentiment analysis capabilities",
      tech: ["React", "Claude API", "Node.js", "WebSocket"],
      color: "from-violet-500 to-purple-600",
      category: "AI/ML",
    },
    {
      title: "Translation Application",
      description:
        "Multi-language translator with context awareness, pronunciation, and voice synthesis",
      tech: ["React", "Claude API", "TypeScript", "Web Speech"],
      color: "from-purple-600 to-fuchsia-600",
      category: "AI/ML",
    },
    {
      title: "Business Analytics Platform",
      description:
        "Real-time data analytics with interactive charts, KPI tracking, and custom reporting",
      tech: ["React", "Chart.js", "Node.js", "D3.js"],
      color: "from-blue-600 to-indigo-600",
      category: "Data Visualization",
    },
    {
      title: "Data Exploration Tool",
      description:
        "Interactive data visualization platform with advanced filtering and export features",
      tech: ["React", "Plotly", "PostgreSQL", "Redis"],
      color: "from-cyan-600 to-blue-700",
      category: "Data Visualization",
    },
    {
      title: "Social Media Analytics",
      description:
        "Multi-platform social media tracking and performance analysis tool with insights",
      tech: ["React", "D3.js", "Python", "FastAPI"],
      color: "from-pink-500 to-rose-600",
      category: "Analytics",
    },
    {
      title: "Workflow Automation Hub",
      description:
        "No-code automation platform with custom integrations and API workflow builder",
      tech: ["N8N", "Node.js", "API Integration"],
      color: "from-teal-500 to-cyan-600",
      category: "Automation",
    },
    {
      title: "Rich Text Editor",
      description:
        "Advanced markdown editor with real-time collaboration and rich formatting features",
      tech: ["React", "Draft.js", "WebSocket"],
      color: "from-orange-500 to-amber-500",
      category: "Developer Tool",
    },
    {
      title: "Document Scanner App",
      description: "OCR-powered scanning tool with text extraction, editing, and PDF export",
      tech: ["React", "Tesseract.js", "Canvas API", "PDF.js"],
      color: "from-orange-600 to-red-600",
      category: "Utility",
    },

    // --- PAGE 3: Creative, Media & Lifestyle (9 Projects) ---
    {
      title: "3D Product Configurator",
      description:
        "Interactive WebGL experience for custom product visualization with real-time rendering",
      tech: ["Three.js", "React", "GLSL"],
      color: "from-cyan-500 to-blue-500",
      category: "3D/WebGL",
    },
    {
      title: "Interactive Portfolio Site",
      description:
        "Modern portfolio showcase with 3D elements, smooth animations, and responsive design",
      tech: ["Next.js", "Three.js", "Tailwind", "GSAP"],
      color: "from-purple-500 to-pink-500",
      category: "Portfolio",
    },
    {
      title: "Video Editing Platform",
      description:
        "Browser-based video editor with timeline editing, effects, and export capabilities",
      tech: ["React", "FFmpeg.wasm", "WebWorkers", "Canvas"],
      color: "from-red-600 to-pink-600",
      category: "Media",
    },
    {
      title: "Music Streaming Service",
      description:
        "Audio streaming platform with playlists, recommendations, and playback controls",
      tech: ["React", "Node.js", "MongoDB", "Web Audio"],
      color: "from-green-600 to-teal-600",
      category: "Media",
    },
    {
      title: "Ride-Sharing Mobile App",
      description:
        "Location-based transportation platform with real-time GPS tracking and routing",
      tech: ["React Native", "Node.js", "Socket.io", "Maps API"],
      color: "from-red-500 to-rose-500",
      category: "Mobile",
    },
    {
      title: "Language Learning Platform",
      description:
        "Interactive language education app with text-to-speech and pronunciation training",
      tech: ["React", "Web Audio API", "MongoDB"],
      color: "from-green-500 to-emerald-500",
      category: "Education",
    },
    {
      title: "Health Information Portal",
      description:
        "Bilingual public health awareness platform with educational content and resources",
      tech: ["Next.js", "Tailwind CSS", "MDX"],
      color: "from-blue-500 to-cyan-500",
      category: "Health/Education",
    },
    {
      title: "Blogging Platform",
      description:
        "Full-featured blog system with markdown support, comments, and SEO optimization",
      tech: ["Next.js", "Markdown", "MongoDB", "NextAuth"],
      color: "from-slate-600 to-gray-700",
      category: "Content",
    },
    {
      title: "Weather Forecast App",
      description:
        "Real-time weather tracking with interactive maps, alerts, and location-based forecasts",
      tech: ["React", "Weather API", "Leaflet", "TypeScript"],
      color: "from-sky-400 to-blue-500",
      category: "Utility",
    },
  ] as Project[],

  skills: {
    languages: ["JavaScript", "TypeScript", "Python", "SQL", "HTML/CSS"],
    frontend: [
      "React",
      "Next.js",
      "Tailwind CSS",
      "Three.js",
      "Framer Motion",
      "GSAP",
    ],
    backend: [
      "Node.js",
      "Express",
      "REST APIs",
      "PostgreSQL",
      "MongoDB",
      "Firebase",
    ],
    tools: [
      "Git",
      "Docker",
      "N8N",
      "WebGL",
      "Canvas",
      "WebSocket",
      "Cloud Deployment",
    ],
    specialties: [
      "Full-stack Development",
      "3D Web Experiences",
      "AI/LLM Integration",
      "AML Compliance",
      "Business Consulting",
      "Automation (N8N)",
    ],
  },

  education: [
    {
      degree: "BSc Computer Information Systems",
      institution: "Near East University",
      period: "2016-2020",
    },
    {
      degree: "A Level",
      institution: "St Georges College",
      period: "2013-2014",
    },
    {
      degree: "O Level IGCSE",
      institution: "St Georges College",
      period: "2009-2012",
    },
  ] as Education[],

  workExperience: [
    {
      role: "IT Consultant",
      company: "Fairvalue Chartered Accountants",
      period: "2021-Present",
      description:
        "AML compliance systems, data protection strategy, business process optimization",
    },
    {
      role: "IT Intern",
      company: "Various Companies",
      period: "2017-2019",
      description: "Software development and IT support",
    },
  ] as Experience[],

  certifications: [
    {
      name: "ICDL (International Computer Driving License)",
      year: "2010",
    },
    {
      name: "TEFL Certificate",
      year: "2024",
    },
    {
      name: "Pursuing: CISA, IFRS Standards, CompTIA Security+",
      year: "In Progress",
    },
  ],

  contact: {
    bio: "I'm always excited to collaborate on new projects and discuss innovative ideas. Specializing in full-stack development, 3D web experiences, AI integration, and business consulting. Let's create something amazing together!",
    formPlaceholders: {
      name: "Your Name",
      email: "your@email.com",
      message: "Tell me about your project...",
    },
  },
};
