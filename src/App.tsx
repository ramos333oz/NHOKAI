/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import SolutionsView from "./components/SolutionsView";
import nhokaiLogo from "../Logo/nhokai_4-removebg-preview.png";
import omarbImg from "../team-pictures/omarb.png";
import azmilImg from "../team-pictures/azmil-removebg-preview.png";
import khaiImg from "../team-pictures/khai-image-removebg-preview.png";
import ikramImg from "../team-pictures/ikram-removebg-preview.png";
import naufalImg from "../team-pictures/nopal-removebg-preview.png";
import haziqImg from "../team-pictures/haziq-removebg-preview.png";
import nhokaiVideo from "../Nhokai Video.mp4";
import nhokaiVideo2 from "../Nhokai Video 2.mp4";
import nhokaiVideo3 from "../Nhokai Video 3.mp4";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  category: "engineering" | "business" | "cybersecurity";
  description: string;
  verticalText: string;
  themeColor: string; // Tailwind bg-class for right pane gradient
  textColor: string;  // Core text highlight color
  bgGradient: string; // Gradient background details
  icon: string;       // Material Symbols icon name for their placeholder illustration
  skills?: string[];
  quote?: string;
  imageUrl: string;   // High-quality transparent character representation
  bgColor: string;    // Deep rich dynamic background color for scenes
  education?: string;
  currentJobs?: string;
  matrixId?: string;
  department?: string;
  github?: string;
  metrics?: { label: string; value: number }[];
}

export default function App() {
  const [activeView, setActiveView] = useState<'404' | 'team' | 'solutions'>('404');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [showActiveCore, setShowActiveCore] = useState<boolean>(true);
  
  // Custom states for 3D character carousel
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isAutoSwiping, setIsAutoSwiping] = useState<boolean>(true);

  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Update activeView state on scroll
  React.useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const heroEl = document.getElementById("hero-section");
      const teamEl = document.getElementById("team-section");
      const solutionsEl = document.getElementById("solutions-section");

      if (!heroEl || !teamEl || !solutionsEl) return;

      const containerPos = container.getBoundingClientRect();
      const heroPos = heroEl.getBoundingClientRect();
      const teamPos = teamEl.getBoundingClientRect();
      const solutionsPos = solutionsEl.getBoundingClientRect();

      // Overlap calculation
      const heroVisible = Math.max(0, Math.min(heroPos.bottom, containerPos.bottom) - Math.max(heroPos.top, containerPos.top));
      const teamVisible = Math.max(0, Math.min(teamPos.bottom, containerPos.bottom) - Math.max(teamPos.top, containerPos.top));
      const solutionsVisible = Math.max(0, Math.min(solutionsPos.bottom, containerPos.bottom) - Math.max(solutionsPos.top, containerPos.top));

      const maxVisible = Math.max(heroVisible, teamVisible, solutionsVisible);

      if (maxVisible === heroVisible && heroVisible > 50) {
        setActiveView("404");
      } else if (maxVisible === teamVisible && teamVisible > 50) {
        setActiveView("team");
      } else if (maxVisible === solutionsVisible && solutionsVisible > 50) {
        setActiveView("solutions");
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((prev) => (prev === message ? null : prev));
    }, 2800);
  };

  const handleLinkClick = (e: React.MouseEvent, section: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    
    let targetId = "";
    if (section === "Our Team") {
      targetId = "team-section";
      showToast("Scrolling to NHOKAI solutions interactive team roster...");
    } else if (section === "Home") {
      targetId = "hero-section";
      showToast("Scrolling to Hero page.");
    } else if (section === "Solutions") {
      targetId = "solutions-section";
      showToast("Scrolling to NHOKAI Solutions: UniCart Showcase...");
    } else {
      showToast(`Connecting: ${section}...`);
      return;
    }

    const container = scrollContainerRef.current;
    const element = document.getElementById(targetId);
    if (container && element) {
      container.scrollTo({
        top: element.offsetTop,
        behavior: 'smooth'
      });
    }
  };

  const teamMembers: TeamMember[] = [
    {
       id: "moussa",
       name: "Moussa",
       role: "Project Manager / Fullstack Engineer",
       category: "engineering",
       description: "Leads product coordination while contributing across frontend, backend, and system implementation.",
       verticalText: "LEAD PM",
       themeColor: "from-amber-700 to-amber-950",
       textColor: "text-amber-700",
       bgGradient: "rgba(180, 83, 9, 0.1)",
       icon: "rocket_launch",
       skills: ["Agile PM", "React", "Node.js", "Express", "System Design"],
       quote: "Delivers scalable, modular full-stack solutions on tight schedules.",
       imageUrl: omarbImg,
       bgColor: "#FAF7EC",
       education: "B.Sc. (Hons) Software Engineering",
       currentJobs: "Lead PM & Tech Lead at NHOKAI Solutions",
       matrixId: "2023458912",
       department: "College of Computing, Informatics & Mathematics",
       github: "github.com/moussa-nhokai",
       metrics: [
         { label: "System Design", value: 94 },
         { label: "Agile PM", value: 96 },
         { label: "React Core", value: 91 }
       ]
    },
    {
       id: "khairul",
       name: "Khairul",
       role: "Fullstack Engineer",
       category: "engineering",
       description: "Builds and connects application features across the backend, frontend, and product experience.",
       verticalText: "FULLSTACK",
       themeColor: "from-pink-600 to-pink-950",
       textColor: "text-pink-600",
       bgGradient: "rgba(219, 39, 119, 0.1)",
       icon: "code_blocks",
       skills: ["Fullstack DB", "REST APIs", "Tailwind CSS", "Database Design"],
       quote: "Uncompromised focus on clean API structures and dynamic layouts.",
       imageUrl: khaiImg,
       bgColor: "#FAF0FF",
       education: "B.Sc. (Hons) Computer Science",
       currentJobs: "Fullstack Architect at NHOKAI Solutions",
       matrixId: "2023192847",
       department: "College of Computing, Informatics & Mathematics",
       github: "github.com/khairul-nhokai",
       metrics: [
         { label: "Database Design", value: 95 },
         { label: "RESTful APIs", value: 93 },
         { label: "Tailwind CSS", value: 94 }
       ]
    },
    {
       id: "ikram",
       name: "Ikram",
       role: "Cybersecurity Engineer / QA Tester",
       category: "cybersecurity",
       description: "Reviews security concerns, validates system behavior, and supports quality assurance across the product.",
       verticalText: "SECURITY",
       themeColor: "from-emerald-700 to-emerald-950",
       textColor: "text-emerald-700",
       bgGradient: "rgba(4, 120, 87, 0.1)",
       icon: "admin_panel_settings",
       skills: ["PenTesting", "QA Automation", "OWASP Standards", "Audit Sanity"],
       quote: "Safeguards modern applications against severe web vulnerabilities.",
       imageUrl: ikramImg,
       bgColor: "#EDFDF2",
       education: "B.Sc. (Hons) Computer Science (Information Security)",
       currentJobs: "SecOps Engineer & QA Lead at NHOKAI Solutions",
       matrixId: "2022938472",
       department: "College of Computing, Informatics & Mathematics",
       github: "github.com/ikram-nhokai",
       metrics: [
         { label: "OWASP Rigor", value: 96 },
         { label: "PenTesting", value: 94 },
         { label: "QA & Audit", value: 95 }
       ]
    },
    {
       id: "naufal",
       name: "Naufal",
       role: "CI/CD Engineer",
       category: "engineering",
       description: "Supports deployment workflows, automation, build reliability, and delivery infrastructure.",
       verticalText: "CI / CD",
       themeColor: "from-orange-600 to-orange-950",
       textColor: "text-orange-600",
       bgGradient: "rgba(234, 88, 12, 0.1)",
       icon: "account_tree",
       skills: ["CI/CD Pipelines", "Docker Core", "Cloud Registry", "Bash Automation"],
       quote: "Automates complex integration processes to ensure reliable releases.",
       imageUrl: naufalImg,
       bgColor: "#FFF5F0",
       education: "B.Sc. (Hons) Computer Networks",
       currentJobs: "DevOps & Cloud Infrastructure Engineer at NHOKAI Solutions",
       matrixId: "2023812745",
       department: "College of Computing, Informatics & Mathematics",
       github: "github.com/naufal-nhokai",
       metrics: [
         { label: "Pipeline Automation", value: 95 },
         { label: "Docker Core", value: 92 },
         { label: "Release Speed", value: 94 }
       ]
    },
    {
       id: "haziq",
       name: "Haziq",
       role: "Business Analyst",
       category: "business",
       description: "Helps define product requirements, user needs, workflows, and business-facing documentation.",
       verticalText: "ANALYST",
       themeColor: "from-sky-700 to-sky-950",
       textColor: "text-sky-700",
       bgGradient: "rgba(3, 105, 161, 0.1)",
       icon: "analytics",
       skills: ["SaaS Analysis", "UX Blueprinting", "User Stories", "Project Scope"],
       quote: "Translates complex business flows into elegant functional layouts.",
       imageUrl: haziqImg,
       bgColor: "#F0F8FF",
       education: "B.Sc. (Hons) Business Information Systems",
       currentJobs: "Product & Market Analyst at NHOKAI Solutions",
       matrixId: "2023748291",
       department: "College of Computing, Informatics & Mathematics",
       github: "github.com/haziq-nhokai",
       metrics: [
         { label: "SaaS Analysis", value: 93 },
         { label: "Requirements", value: 95 },
         { label: "UX Blueprinting", value: 91 }
       ]
    },
    {
       id: "azmil",
       name: "Azmil",
       role: "Business Analyst",
       category: "business",
       description: "Supports requirement analysis, product planning, process clarity, and stakeholder-facing content.",
       verticalText: "STRATEGY",
       themeColor: "from-violet-700 to-violet-950",
       textColor: "text-violet-700",
       bgGradient: "rgba(109, 40, 217, 0.1)",
       icon: "query_stats",
       skills: ["Market Dynamics", "FinTech Models", "Risk Analysis", "ROI Estimation"],
       quote: "Aligns software design choices directly with high-impact market needs.",
       imageUrl: azmilImg,
       bgColor: "#F5F3FF",
       education: "B.Sc. (Hons) Business Administration & Technology",
       currentJobs: "Strategy Consultant at NHOKAI Solutions",
       matrixId: "2022847291",
       department: "Faculty of Business & Management",
       github: "github.com/azmil-nhokai",
       metrics: [
         { label: "Market Dynamics", value: 94 },
         { label: "ROI Analytics", value: 92 },
         { label: "Risk Mitigation", value: 93 }
       ]
    }
  ];

  const navigate = (direction: 'next' | 'prev', manual: boolean = false) => {
    if (isAnimating) return;
    if (manual) {
      setIsAutoSwiping(false);
    }
    setIsAnimating(true);
    const N = teamMembers.length;
    if (direction === 'next') {
      setActiveIndex((prev) => (prev + 1) % N);
    } else {
      setActiveIndex((prev) => (prev + N - 1) % N);
    }
    setTimeout(() => {
      setIsAnimating(false);
    }, 650);
  };

  // Reset auto-swiping to true whenever user scrolls to the 'team' section
  React.useEffect(() => {
    if (activeView === 'team') {
      setIsAutoSwiping(true);
    }
  }, [activeView]);

  // Handle automatic swiping of team member cards when active
  React.useEffect(() => {
    if (activeView !== 'team' || !isAutoSwiping) return;

    const interval = setInterval(() => {
      navigate('next', false);
    }, 4500);

    return () => clearInterval(interval);
  }, [activeView, isAutoSwiping, isAnimating]);

  const centerIndex = activeIndex;
  const leftIndex = (activeIndex + teamMembers.length - 1) % teamMembers.length;
  const rightIndex = (activeIndex + 1) % teamMembers.length;
  const farLeftIndex = (activeIndex + teamMembers.length - 2) % teamMembers.length;
  const farRightIndex = (activeIndex + 2) % teamMembers.length;

  const getStyleForIndex = (index: number) => {
    let role: 'center' | 'left' | 'right' | 'farLeft' | 'farRight' | 'hidden' = 'hidden';
    if (index === centerIndex) role = 'center';
    else if (index === leftIndex) role = 'left';
    else if (index === rightIndex) role = 'right';
    else if (index === farLeftIndex) role = 'farLeft';
    else if (index === farRightIndex) role = 'farRight';

    const duration = '650ms';
    const easing = 'cubic-bezier(0.4, 0, 0.2, 1)';

    switch (role) {
      case 'center':
        return {
          left: '50%',
          height: isMobile ? '52%' : '74%',
          bottom: isMobile ? '230px' : '0px',
          transform: `translateX(-50%) scale(${isMobile ? 1.1 : 1.22})`,
          filter: 'blur(0px)',
          opacity: 1,
          zIndex: 20,
          transition: `transform ${duration} ${easing}, filter ${duration} ${easing}, opacity ${duration} ${easing}, left ${duration} ${easing}, height ${duration} ${easing}, bottom ${duration} ${easing}`,
          willChange: 'transform, filter, opacity',
        };
      case 'left':
        return {
          left: isMobile ? '22%' : '28%',
          height: isMobile ? '35%' : '48%',
          bottom: isMobile ? '18%' : '0px',
          transform: `translateX(-50%) scale(1.0)`,
          filter: 'blur(1px) brightness(0.75)',
          opacity: isMobile ? 0 : 0.85,
          zIndex: 15,
          transition: `transform ${duration} ${easing}, filter ${duration} ${easing}, opacity ${duration} ${easing}, left ${duration} ${easing}, height ${duration} ${easing}, bottom ${duration} ${easing}`,
          willChange: 'transform, filter, opacity',
        };
      case 'right':
        return {
          left: isMobile ? '78%' : '72%',
          height: isMobile ? '35%' : '48%',
          bottom: isMobile ? '18%' : '0px',
          transform: `translateX(-50%) scale(1.0)`,
          filter: 'blur(1px) brightness(0.75)',
          opacity: isMobile ? 0 : 0.85,
          zIndex: 15,
          transition: `transform ${duration} ${easing}, filter ${duration} ${easing}, opacity ${duration} ${easing}, left ${duration} ${easing}, height ${duration} ${easing}, bottom ${duration} ${easing}`,
          willChange: 'transform, filter, opacity',
        };
      case 'farLeft':
        return {
          left: isMobile ? '5%' : '14%',
          height: isMobile ? '24%' : '34%',
          bottom: isMobile ? '18%' : '0px',
          transform: `translateX(-50%) scale(0.78)`,
          filter: 'blur(3px) brightness(0.45)',
          opacity: isMobile ? 0 : 0.55,
          zIndex: 10,
          transition: `transform ${duration} ${easing}, filter ${duration} ${easing}, opacity ${duration} ${easing}, left ${duration} ${easing}, height ${duration} ${easing}, bottom ${duration} ${easing}`,
          willChange: 'transform, filter, opacity',
        };
      case 'farRight':
        return {
          left: isMobile ? '95%' : '86%',
          height: isMobile ? '24%' : '34%',
          bottom: isMobile ? '18%' : '0px',
          transform: `translateX(-50%) scale(0.78)`,
          filter: 'blur(3px) brightness(0.45)',
          opacity: isMobile ? 0 : 0.55,
          zIndex: 10,
          transition: `transform ${duration} ${easing}, filter ${duration} ${easing}, opacity ${duration} ${easing}, left ${duration} ${easing}, height ${duration} ${easing}, bottom ${duration} ${easing}`,
          willChange: 'transform, filter, opacity',
        };
      case 'hidden':
      default:
        return {
          left: '50%',
          height: isMobile ? '20%' : '28%',
          bottom: isMobile ? '18%' : '0px',
          transform: `translateX(-50%) scale(0.55)`,
          filter: 'blur(8px) brightness(0.3)',
          opacity: 0,
          zIndex: 5,
          transition: `transform ${duration} ${easing}, filter ${duration} ${easing}, opacity ${duration} ${easing}, left ${duration} ${easing}, height ${duration} ${easing}, bottom ${duration} ${easing}`,
          willChange: 'transform, filter, opacity',
        };
    }
  };

  return (
    <div 
      style={{
        backgroundColor: activeView === "team" ? teamMembers[activeIndex].bgColor : "var(--bg-page)",
        transition: "background-color 650ms cubic-bezier(0.4, 0, 0.2, 1)"
      }}
      className="w-full h-screen flex flex-col justify-between overflow-hidden select-none relative font-sans text-[#1a1a1a]"
    >
      
      {/* Toast Notification */}
      <div 
        className={`fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-[#111111] text-white text-xs md:text-sm px-6 py-3 rounded-full shadow-2xl transition-all duration-300 flex items-center gap-2 pointer-events-none ${
          toastMessage ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0"
        }`}
      >
        <span className="material-symbols-rounded text-green-400 text-sm md:text-base">check_circle</span>
        <span>{toastMessage}</span>
      </div>

      {/* Header / Navbar (Sticky, floating, unified pill design) */}
      <header 
        style={{
          transition: "transform 350ms ease-in-out, opacity 350ms ease-in-out"
        }}
        className="fixed top-0 left-0 right-0 z-40 w-full flex justify-center pointer-events-none"
      >
        <div 
          className="w-full md:w-[85%] lg:w-[75%] max-w-[820px] bg-[#F5F5F5]/90 backdrop-blur-md h-[56px] border-b md:border-l md:border-r border-neutral-300 rounded-b-none md:rounded-b-[24px] px-5 shadow-[0_4px_12px_rgba(0,0,0,0.02)] flex items-center justify-between pointer-events-auto transition-all duration-300"
        >
          
          {/* Left: Logo */}
          <a 
            href="#" 
            onClick={(e) => handleLinkClick(e, "Home")} 
            className="flex items-center gap-[8px] group transition-all duration-200 hover:scale-[1.01]"
            id="navbar-logo"
          >
            <img 
              src={nhokaiLogo} 
              alt="NHOKAI logo" 
              className="h-[28px] w-auto select-none pointer-events-none object-contain"
            />
            <span className="text-[15px] font-extrabold tracking-tight text-[#111111]">
              NHOKAI
            </span>
          </a>

          {/* Center: Desktop Nav links */}
          <nav className="hidden md:flex items-center gap-[28px]" id="desktop-nav">
            <a 
              href="#" 
              onClick={(e) => handleLinkClick(e, "Home")} 
              className={`text-[12.5px] transition-all duration-200 ${
                activeView === "404" ? "font-semibold text-[#111111]" : "font-normal text-[#1a1a1a]/65 hover:text-[#111111]"
              }`}
            >
              Home
            </a>
            <a 
              href="#" 
              onClick={(e) => handleLinkClick(e, "Our Team")} 
              className={`text-[12.5px] transition-all duration-200 ${
                activeView === "team" ? "font-semibold text-[#111111]" : "font-normal text-[#1a1a1a]/65 hover:text-[#111111]"
              }`}
            >
              Our Team
            </a>
            <a 
              href="#" 
              onClick={(e) => handleLinkClick(e, "Solutions")} 
              className={`text-[12.5px] transition-all duration-200 flex items-center gap-1 ${
                activeView === "solutions" ? "font-semibold text-[#111111]" : "font-normal text-[#1a1a1a]/65 hover:text-[#111111]"
              }`}
            >
              Solutions
            </a>
          </nav>

          {/* Right: Desktop CTA Button */}
          <div className="hidden md:block">
            <button 
              id="cta-connect-desktop"
              style={{ 
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)' 
              }}
              onClick={(e) => showToast("Connecting: contact workflow initiated...")}
              className="bg-neutral-900 border border-neutral-800 hover:bg-black text-white text-[11.5px] font-medium px-4 py-1.5 rounded-full shadow-sm transition-all cursor-pointer hover:-translate-y-[1px] active:scale-95"
            >
              Let's Connect
            </button>
          </div>

          <button 
            id="mobile-menu-burger"
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 z-50 relative focus:outline-none cursor-pointer" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <div className="w-[24px] h-[16px] flex flex-col justify-between">
              <span className={`block w-[24px] h-[2px] transition-all duration-300 rounded-full ${isMobileMenuOpen ? 'rotate-45 translate-y-[7px] bg-[#111111]' : 'bg-[#111111]'}`} />
              <span className={`block w-[24px] h-[2px] transition-all duration-200 rounded-full ${isMobileMenuOpen ? 'opacity-0 bg-[#111111]' : 'opacity-100 bg-[#111111]'}`} />
              <span className={`block w-[24px] h-[2px] transition-all duration-300 rounded-full ${isMobileMenuOpen ? '-rotate-45 -translate-y-[7px] bg-[#111111]' : 'bg-[#111111]'}`} />
            </div>
          </button>

        </div>
      </header>

      {/* Mobile Drawer/Navigation Overlay */}
      <div 
        className={`fixed inset-0 bg-[#F5F5F5]/98 backdrop-blur-md z-40 transition-transform duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] flex flex-col px-10 pt-[110px] md:hidden ${
          isMobileMenuOpen ? 'translate-x-[0%]' : 'translate-x-[100%]'
        }`}
        id="mobile-navigation-overlay"
      >
        <nav className="flex flex-col text-left max-w-[400px] mx-auto w-full">
          <a 
            href="#" 
            onClick={(e) => handleLinkClick(e, "Home")} 
            className="text-[30px] sm:text-[38px] font-extrabold tracking-[-1.5px] text-[#111111] py-[20px] border-b border-[rgba(0,0,0,0.08)] hover:text-black/70 active:text-black/50"
          >
            Home
          </a>
          <a 
            href="#" 
            onClick={(e) => handleLinkClick(e, "Our Team")} 
            className="text-[30px] sm:text-[38px] font-extrabold tracking-[-1.5px] text-[#111111] py-[20px] border-b border-[rgba(0,0,0,0.08)] hover:text-black/70 active:text-black/50"
          >
            Our Team
          </a>
          <a 
            href="#" 
            onClick={(e) => handleLinkClick(e, "Solutions")} 
            className="text-[30px] sm:text-[38px] font-extrabold tracking-[-1.5px] text-[#111111] py-[20px] border-b border-[rgba(0,0,0,0.08)] flex items-center justify-between hover:text-black/70 active:text-black/50"
          >
            <span>Solutions</span>
            <span className="text-[26px] text-[#888888]">▾</span>
          </a>
          
          <div className="pt-[30px]">
            <button 
              id="cta-connect-mobile"
              style={{ 
                backgroundImage: 'linear-gradient(180deg, #2c2c2c 0%, #111111 100%)', 
                boxShadow: '0 4px 15px rgba(0,0,0,0.15)' 
              }}
              onClick={(e) => showToast("Integrating contact workflows...")}
              className="flex items-center gap-[12px] text-white rounded-[40px] pt-[7px] pb-[7px] pr-[20px] pl-[7px] transition-all duration-200 cursor-pointer text-[15px] font-medium hover:scale-[1.02] active:scale-95"
            >
              <div className="w-[32px] h-[32px] rounded-full bg-white flex items-center justify-center text-black shrink-0">
                <svg className="w-[14px] h-[14px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </div>
              <span className="tracking-tight pr-[4px]">Let's Connect</span>
            </button>
          </div>
        </nav>
      </div>

      {/* Main Multi-Section Smooth Scroll Element */}
      <div 
        ref={scrollContainerRef}
        className="flex-grow w-full h-full overflow-y-auto scroll-smooth flex flex-col relative z-20"
      >
        
        {/* UNIFIED MASSIVE CORE WEB FRAME AND CONTAINER */}
        <div className="w-full bg-[#F5F5F5] pt-3 px-3 sm:pt-5 sm:px-5 md:pt-6 md:px-6 lg:pt-8 lg:px-8 pb-3 sm:pb-5 md:pb-6 lg:pb-8 shrink-0 flex flex-col">
          
          {/* Main Visual Frame Rounder-Container */}
          <div className="relative w-full max-w-7xl mx-auto rounded-[28px] sm:rounded-[36px] md:rounded-[48px] overflow-hidden border border-neutral-300 bg-white shadow-[0_24px_64px_-16px_rgba(0,0,0,0.08),_0_0_1px_rgba(0,0,0,0.12)] flex flex-col transition-all duration-300">
            
            {/* SECTION 1: HERO */}
            <section 
              id="hero-section" 
              className="relative w-full h-[calc(100vh-24px)] sm:h-[calc(100vh-40px)] md:h-[calc(100vh-56px)] flex flex-col justify-between overflow-hidden"
            >
            
            {/* Background Video cover (clipping matches parent curves) */}
            <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
              <video
                className="w-full h-full object-cover select-none pointer-events-none"
                src={nhokaiVideo}
                autoPlay
                loop
                muted
                playsInline
              />
              {/* Wash overlay to soften the video elements and make text highly readable */}
              <div className="absolute inset-0 bg-[#F5F5F5]/65 backdrop-blur-[2px]" />

              {/* Progressive backdrop blur mask relative inside the frame */}
              <div 
                className="absolute bottom-0 left-0 right-0 h-[25vh] bg-[#F5F5F5]/25 backdrop-blur-[8px] z-10" 
                style={{ 
                  maskImage: 'linear-gradient(to top, black, transparent)', 
                  WebkitMaskImage: 'linear-gradient(to top, black, transparent)' 
                }} 
              />

              {/* Blends smoothly with white base of card */}
              <div className="absolute bottom-0 left-0 right-0 h-[35vh] bg-gradient-to-t from-white via-white/85 via-white/35 to-transparent z-20" />
            </div>

            {/* Texts Wrapper (Centered with maximum width restriction, taking flex space) */}
            <div className="relative my-auto flex flex-col items-center select-none z-10 pt-[16vh] sm:pt-[14vh] md:pt-[12vh] pb-[6vh] max-w-[960px] w-full px-6 mx-auto text-center">
              
              <p className="text-[13px] md:text-[14px] text-neutral-600 font-semibold tracking-wider uppercase mb-3">
                Software Solutions Team
              </p>

              {/* Title box with decorations */}
              <div className="relative inline-block mb-[14px] px-1" id="hero-title-container">
                
                {/* Cloud decoration */}
                <span 
                  className="absolute cloud-anim material-symbols-rounded select-none pointer-events-none md:text-[42px] text-[30.5px] md:-top-[22px] md:-left-[28px] -top-[16px] -left-[18px]"
                  style={{ 
                    backgroundImage: 'linear-gradient(to bottom, #F7B2FB 50%, #786EF1 80%, #5588FB 100%)', 
                    WebkitBackgroundClip: 'text', 
                    WebkitTextFillColor: 'transparent', 
                    filter: 'drop-shadow(1.5px 0 0 white) drop-shadow(-1.5px 0 0 white) drop-shadow(0 1.5px 0 white) drop-shadow(0 -1.5px 0 white) drop-shadow(0 3px 6px rgba(0,0,0,0.08))' 
                  }}
                >
                  cloud
                </span>

                {/* Heart decoration */}
                <span 
                  className="absolute heart-anim material-symbols-rounded select-none pointer-events-none md:text-[32px] text-[22px] md:-bottom-[15px] md:right-[20px] -bottom-[10px] right-[10px]"
                  style={{ 
                    backgroundImage: 'linear-gradient(to bottom, #F7B2FB 50%, #786EF1 80%, #5588FB 100%)', 
                    WebkitBackgroundClip: 'text', 
                    WebkitTextFillColor: 'transparent', 
                    filter: 'drop-shadow(1.5px 0 0 white) drop-shadow(-1.5px 0 0 white) drop-shadow(0 1.5px 0 white) drop-shadow(0 -1.5px 0 white) drop-shadow(0 3px 6px rgba(0,0,0,0.08))' 
                  }}
                >
                  favorite
                </span>

                {/* Title text */}
                <h1 className="font-extrabold tracking-[-1.5px] leading-[1.08] text-neutral-950 select-none text-[34px] sm:text-[44px] md:text-[56px] max-w-4xl mx-auto">
                  Building digital systems from real-world problems.
                </h1>

              </div>

              {/* Subtext */}
              <p className="text-[13.5px] md:text-[14.5px] text-neutral-700 leading-[1.75] max-w-[520px] mt-[12px] md:mt-[16px] mb-[24px] tracking-normal font-normal mx-auto">
                NHOKAI Solutions designs and develops practical software products with full-stack engineering, security awareness, delivery automation, and product-focused analysis.
              </p>

            </div>

          </section>

          {/* SECTION 2: OUR TEAM */}
          <section 
            id="team-section" 
            className="relative w-full min-h-screen shrink-0 flex flex-col items-center justify-center overflow-hidden py-16 md:py-24 px-4 md:px-8 bg-transparent"
          >
            {/* Background Video cover for Our Team section */}
            <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
              <video
                className="w-full h-full object-cover select-none pointer-events-none"
                src={nhokaiVideo2}
                autoPlay
                loop
                muted
                playsInline
              />
              {/* Soft overlay matching brand aesthetic for readability */}
              <div className="absolute inset-0 bg-white/75 backdrop-blur-[3px]" />

              {/* Top feathering blend layer */}
              <div className="absolute top-0 left-0 right-0 h-[25vh] bg-gradient-to-b from-white via-white/85 via-white/35 to-transparent z-10" />

              {/* Bottom feathering blend layer */}
              <div className="absolute bottom-0 left-0 right-0 h-[25vh] bg-gradient-to-t from-white via-white/85 via-white/35 to-transparent z-10" />
            </div>

            {/* Section Header with Big Centered Text */}
            <div className="relative z-10 w-full max-w-5xl px-6 text-center select-none mb-6 md:mb-10 pointer-events-none">
              <h2 className="text-[34px] sm:text-[46px] md:text-[58px] lg:text-[72px] font-black text-neutral-950 tracking-tight leading-none uppercase font-sans">
                Meet Your Team
              </h2>
            </div>

            {/* Bounded Square Stage Container for All Cards */}
            <div 
              style={{
                backgroundColor: teamMembers[activeIndex].bgColor,
                transition: "background-color 650ms cubic-bezier(0.4, 0, 0.2, 1)"
              }}
              className="relative z-10 w-full max-w-[1100px] h-[550px] md:h-[630px] rounded-[32px] md:rounded-[48px] border border-neutral-300 md:border-neutral-300/80 shadow-[0_36px_72px_-18px_rgba(0,0,0,0.08),_0_0_1px_rgba(0,0,0,0.15),_inset_0_1px_3px_rgba(255,255,255,1)] overflow-hidden flex flex-col md:flex-row items-center justify-between"
            >
             {/* Giant Ghost Text Backdrop Layer behind characters with high-fidelity smooth transition */}
             <div 
               className="absolute left-1/2 md:left-[calc((100%-410px)/2+410px)] -translate-x-1/2 pointer-events-none select-none w-full flex items-center justify-center animate-none"
               style={{
                 top: '25%',
                 zIndex: 2,
               }}
             >
               <AnimatePresence mode="popLayout" initial={false}>
                 <motion.div
                   key={teamMembers[activeIndex].name}
                   initial={{ opacity: 0, y: 40, filter: "blur(12px)", scale: 0.96 }}
                   animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
                   exit={{ opacity: 0, y: -40, filter: "blur(12px)", scale: 0.96 }}
                   transition={{ 
                     duration: 0.75, 
                     ease: [0.16, 1, 0.3, 1] 
                   }}
                   className="pointer-events-none select-none text-neutral-950/[0.04] font-bold leading-none tracking-[-0.02em] whitespace-nowrap text-center uppercase"
                   style={{
                     fontFamily: '"Anton", sans-serif',
                     fontSize: 'clamp(70px, 18vw, 210px)',
                   }}
                 >
                   {teamMembers[activeIndex].name}
                 </motion.div>
               </AnimatePresence>
             </div>

             {/* Active Centered Character Details Glass HUD Card */}
             <AnimatePresence mode="popLayout" initial={false}>
               <motion.div 
                 key={teamMembers[activeIndex].id}
                 initial={{ opacity: 0, x: -40, filter: "blur(12px)", scale: 0.96 }}
                 animate={{ opacity: 1, x: 0, filter: "blur(0px)", scale: 0.98 }}
                 exit={{ opacity: 0, x: 40, filter: "blur(12px)", scale: 0.96 }}
                 whileHover={{ scale: 1.0 }}
                 transition={{ 
                   duration: 0.75, 
                   ease: [0.16, 1, 0.3, 1] 
                 }}
                 style={{ zIndex: 30 }}
                 className="absolute bottom-[72px] left-6 right-6 h-[220px] md:bottom-8 md:top-8 md:left-8 md:right-auto md:w-[360px] md:h-[calc(100%-64px)] flex flex-col justify-between text-left bg-white/95 backdrop-blur-xl border border-neutral-200/80 rounded-3xl p-5 md:p-6 text-neutral-900 shadow-2xl pointer-events-auto overflow-y-auto scrollbar-none transform-gpu"
               >
                 {/* Top info set */}
                 <div className="flex flex-col justify-start">
                   {/* Member Identity display */}
                   <h3 className="text-[20px] md:text-[24px] font-black tracking-tight leading-none uppercase text-neutral-900 drop-shadow-sm">
                      {teamMembers[activeIndex].name}
                   </h3>
                   <p className="text-[11px] md:text-[12px] font-bold text-[#E09000] mt-1 leading-tight tracking-wide bg-transparent">
                     {teamMembers[activeIndex].role}
                   </p>

                   {/* Divider line style */}
                   <div className="w-full h-px bg-neutral-200/80 my-2" />

                   {/* Core description details */}
                   <p className="text-[10.5px] md:text-[11.5px] text-neutral-600 font-normal leading-[1.4] mb-3">
                     {teamMembers[activeIndex].description}
                   </p>

                   {/* Academic Credentials Section */}
                   {teamMembers[activeIndex].education && (
                     <div className="flex items-center gap-3 bg-neutral-50/80 p-2.5 rounded-xl border border-neutral-200/50 mb-2 hover:bg-neutral-100/80 transition-colors">
                       {/* High-Fidelity University Logo Placeholder */}
                       <div className="w-10 h-10 rounded-lg bg-neutral-100 border border-neutral-200 flex flex-col items-center justify-center shrink-0 shadow-inner overflow-hidden relative select-none">
                         <div className="absolute inset-0 bg-gradient-to-tr from-[#FAB114]/10 to-transparent opacity-50" />
                         <span className="material-symbols-rounded text-[#E09000] text-[18px] relative z-10 leading-none">school</span>
                         <span className="text-[6.5px] font-mono font-bold text-neutral-500 uppercase tracking-tighter scale-[0.85] mt-0.5 relative z-10 leading-none">UiTM</span>
                       </div>
                       <div className="min-w-0 flex-1">
                         <span className="block text-[8px] font-semibold text-neutral-400 uppercase tracking-wider leading-none mb-0.5">Education</span>
                         <span className="font-semibold text-neutral-800 text-[10px] md:text-[10.5px] leading-tight block truncate md:whitespace-normal">
                           {teamMembers[activeIndex].education}
                         </span>
                       </div>
                     </div>
                   )}

                   {/* Current Job section */}
                   {teamMembers[activeIndex].currentJobs && (
                     <div className="flex items-center gap-3 bg-neutral-50/80 p-2.5 rounded-xl border border-neutral-200/50 mb-3 hover:bg-neutral-100/80 transition-colors">
                       {/* High-Fidelity Company Logo Placeholder */}
                       <div className="w-10 h-10 rounded-lg bg-neutral-100 border border-neutral-200 flex flex-col items-center justify-center shrink-0 shadow-inner overflow-hidden relative select-none">
                         <div className="absolute inset-0 bg-gradient-to-tr from-[#FAB114]/10 to-transparent opacity-50" />
                         <span className="material-symbols-rounded text-[#E09000] text-[18px] relative z-10 leading-none">domain</span>
                         <span className="text-[6.5px] font-mono font-bold text-neutral-500 uppercase tracking-tighter scale-[0.85] mt-0.5 relative z-10 leading-none">NHOKAI</span>
                       </div>
                       <div className="min-w-0 flex-1">
                         <span className="block text-[8px] font-semibold text-neutral-400 uppercase tracking-wider leading-none mb-0.5">Current Position</span>
                         <span className="font-semibold text-neutral-800 text-[10px] md:text-[10.5px] leading-tight block truncate md:whitespace-normal">
                           {teamMembers[activeIndex].currentJobs}
                         </span>
                       </div>
                     </div>
                   )}

                   {/* Quote block style */}
                   <p className="text-[10px] md:text-[11px] italic text-neutral-600 font-light border-l-2 border-[#FAB114] pl-2 leading-relaxed">
                     "{teamMembers[activeIndex].quote}"
                   </p>
                 </div>

                 {/* Bottom info set */}
                 <div className="mt-4">
                   {/* Modern skill pills list */}
                   <div className="flex flex-wrap gap-1">
                     {teamMembers[activeIndex].skills?.map((skill) => (
                       <span 
                         key={skill} 
                         className="text-[8px] font-semibold bg-neutral-100 hover:bg-[#FAB114]/15 hover:text-[#B37800] text-neutral-700 px-2 py-0.5 rounded-full border border-neutral-200/60 transition-colors shadow-inner"
                       >
                         {skill}
                       </span>
                     ))}
                   </div>

                   {/* Student coordinate contact marker */}
                   <div className="flex items-center gap-1.5 pt-2 mt-2 border-t border-neutral-200/60 text-[9px] font-mono text-neutral-400 select-all">
                     <span className="material-symbols-rounded text-[#E09000] text-[12px]">alternate_email</span>
                     <span className="truncate">{teamMembers[activeIndex].id}@student.uitm.edu.my</span>
                   </div>
                 </div>
               </motion.div>
             </AnimatePresence>

            {/* 3D Character Stage Layer */}
            <div className="absolute inset-0 md:left-[410px] md:right-0 pointer-events-none select-none overflow-hidden z-10">
              {teamMembers.map((member, idx) => {
                const style = getStyleForIndex(idx);
                const isCenter = idx === centerIndex;
                const isLeft = idx === leftIndex;
                const isRight = idx === rightIndex;
                const isFarLeft = idx === farLeftIndex;
                const isFarRight = idx === farRightIndex;
                
                return (
                  <div 
                    key={member.id}
                    style={{
                      ...style,
                      pointerEvents: 'auto', // permit clicking on characters directly to navigate
                    }}
                    onClick={() => {
                      if (isLeft) navigate('prev', true);
                      else if (isRight) navigate('next', true);
                      else if (isFarLeft) {
                        if (isAnimating) return;
                        setIsAutoSwiping(false);
                        setIsAnimating(true);
                        setActiveIndex(farLeftIndex);
                        setTimeout(() => setIsAnimating(false), 650);
                      }
                      else if (isFarRight) {
                        if (isAnimating) return;
                        setIsAutoSwiping(false);
                        setIsAnimating(true);
                        setActiveIndex(farRightIndex);
                        setTimeout(() => setIsAnimating(false), 650);
                      }
                    }}
                    className={`absolute aspect-[0.6/1] origin-bottom select-none transition-all duration-[650ms] ${
                      isCenter ? 'cursor-default' : 'cursor-pointer'
                    }`}
                  >
                    <img 
                      src={member.imageUrl} 
                      referrerPolicy="no-referrer"
                      alt={member.name}
                      style={{
                        objectFit: 'contain',
                        objectPosition: 'bottom center',
                      }}
                      className="w-full h-full pointer-events-none select-none drop-shadow-[0_20px_35px_rgba(0,0,0,0.55)]"
                    />
                  </div>
                );
              })}
            </div>

            {/* Futuristic Cybernetic Arrow Nav Controls */}
            <div className="absolute z-30 flex items-center gap-4 justify-between md:justify-start w-[calc(100%-48px)] left-6 bottom-4 md:left-auto md:right-8 md:bottom-8 md:w-auto p-1 bg-white/[0.08] backdrop-blur-md rounded-full border border-white/[0.05] md:bg-transparent md:border-none md:p-0">
              {/* Prev button */}
              <button 
                onClick={() => navigate('prev', true)}
                className="w-10 h-10 rounded-full border border-white/10 bg-black/45 hover:bg-[#FAB114]/20 hover:border-[#FAB114] backdrop-blur-xl flex items-center justify-center text-white transition-all cursor-pointer group shadow-2xl active:scale-95"
                title="Rotate Previous"
              >
                <svg className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              
              {/* Custom high-end progress ticker indicator */}
              <div className="flex flex-col items-center">
                <span className="text-[11px] font-black font-mono text-[#FAB114] tracking-widest leading-none">
                  0{activeIndex + 1}
                </span>
                <span className="text-[7.5px] font-mono text-neutral-900/50 tracking-widest uppercase mt-0.5">
                  OF 0{teamMembers.length}
                </span>
              </div>

              {/* Next button */}
              <button 
                onClick={() => navigate('next', true)}
                className="w-10 h-10 rounded-full border border-white/10 bg-black/45 hover:bg-[#FAB114]/20 hover:border-[#FAB114] backdrop-blur-xl flex items-center justify-center text-white transition-all cursor-pointer group shadow-2xl active:scale-95"
                title="Rotate Next"
              >
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </div>

        </section>

        {/* SECTION 3: SOLUTIONS */}
        <section 
          id="solutions-section" 
          className="relative w-full min-h-screen shrink-0 pt-24 pb-12 bg-transparent overflow-hidden"
        >
          {/* Background Video cover for Solutions section */}
          <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
            <video
              className="w-full h-full object-cover select-none pointer-events-none"
              src={nhokaiVideo3}
              autoPlay
              loop
              muted
              playsInline
            />
            {/* Soft overlay matching brand aesthetic for readability */}
            <div className="absolute inset-0 bg-white/75 backdrop-blur-[3px]" />

            {/* Top feathering blend layer */}
            <div className="absolute top-0 left-0 right-0 h-[25vh] bg-gradient-to-b from-white via-white/85 via-white/35 to-transparent z-10" />

            {/* Bottom feathering blend layer */}
            <div className="absolute bottom-0 left-0 right-0 h-[25vh] bg-gradient-to-t from-white via-white/85 via-white/35 to-transparent z-10" />
          </div>

          <div className="relative z-10">
            <SolutionsView />
          </div>
        </section>

          </div>
        </div>

      </div>

    </div>
  );
}

