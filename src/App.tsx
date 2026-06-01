/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import SolutionsView from "./components/SolutionsView";
import nhokaiLogo from "../Logo/nhokai_4-removebg-preview.png";

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
}

export default function App() {
  const [activeView, setActiveView] = useState<'404' | 'team' | 'solutions'>('solutions');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [showActiveCore, setShowActiveCore] = useState<boolean>(true);
  
  // Custom states for 3D character carousel
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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
    
    if (section === "Our Team") {
      setActiveView("team");
      showToast("Loading NHOKAI solutions interactive team roster...");
    } else if (section === "Home") {
      setActiveView("404");
      showToast("Returned to Hero page.");
    } else if (section === "Solutions") {
      setActiveView("solutions");
      showToast("Loading NHOKAI Solutions: UniCart Showcase...");
    } else {
      showToast(`NHOKAI Solution: Navigating to ${section}...`);
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
       imageUrl: "https://assets.codepen.io/3685267/res-react-dash-user-card-man-1.png",
       bgColor: "#FAF7EC"
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
       imageUrl: "https://assets.codepen.io/3685267/res-react-dash-user-card-man-2.png",
       bgColor: "#FAF0FF"
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
       imageUrl: "https://assets.codepen.io/3685267/res-react-dash-user-card-woman-1.png",
       bgColor: "#EDFDF2"
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
       imageUrl: "https://assets.codepen.io/3685267/res-react-dash-user-card-woman-2.png",
       bgColor: "#FFF5F0"
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
       imageUrl: "https://assets.codepen.io/3685267/res-react-dash-user-card-man-1.png",
       bgColor: "#F0F8FF"
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
       imageUrl: "https://assets.codepen.io/3685267/res-react-dash-user-card-man-2.png",
       bgColor: "#F5F3FF"
    }
  ];

  const navigate = (direction: 'next' | 'prev') => {
    if (isAnimating) return;
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

  const centerIndex = activeIndex;
  const leftIndex = (activeIndex + teamMembers.length - 1) % teamMembers.length;
  const rightIndex = (activeIndex + 1) % teamMembers.length;
  const backIndex = (activeIndex + 2) % teamMembers.length;

  const getStyleForIndex = (index: number) => {
    let role: 'center' | 'left' | 'right' | 'back' = 'back';
    if (index === centerIndex) role = 'center';
    else if (index === leftIndex) role = 'left';
    else if (index === rightIndex) role = 'right';

    const duration = '650ms';
    const easing = 'cubic-bezier(0.4, 0, 0.2, 1)';

    switch (role) {
      case 'center':
        return {
          left: '50%',
          height: isMobile ? '60%' : '92%',
          bottom: isMobile ? '22%' : '0px',
          transform: `translateX(-50%) scale(${isMobile ? 1.25 : 1.68})`,
          filter: 'blur(0px)',
          opacity: 1,
          zIndex: 20,
          transition: `transform ${duration} ${easing}, filter ${duration} ${easing}, opacity ${duration} ${easing}, left ${duration} ${easing}, height ${duration} ${easing}, bottom ${duration} ${easing}`,
          willChange: 'transform, filter, opacity',
        };
      case 'left':
        return {
          left: isMobile ? '20%' : '30%',
          height: isMobile ? '16%' : '28%',
          bottom: isMobile ? '32%' : '12%',
          transform: `translateX(-50%) scale(1)`,
          filter: 'blur(2px)',
          opacity: 0.85,
          zIndex: 10,
          transition: `transform ${duration} ${easing}, filter ${duration} ${easing}, opacity ${duration} ${easing}, left ${duration} ${easing}, height ${duration} ${easing}, bottom ${duration} ${easing}`,
          willChange: 'transform, filter, opacity',
        };
      case 'right':
        return {
          left: isMobile ? '80%' : '70%',
          height: isMobile ? '16%' : '28%',
          bottom: isMobile ? '32%' : '12%',
          transform: `translateX(-50%) scale(1)`,
          filter: 'blur(2px)',
          opacity: 0.85,
          zIndex: 10,
          transition: `transform ${duration} ${easing}, filter ${duration} ${easing}, opacity ${duration} ${easing}, left ${duration} ${easing}, height ${duration} ${easing}, bottom ${duration} ${easing}`,
          willChange: 'transform, filter, opacity',
        };
      case 'back':
      default:
        return {
          left: '50%',
          height: isMobile ? '13%' : '22%',
          bottom: isMobile ? '32%' : '12%',
          transform: `translateX(-50%) scale(0.6)`,
          filter: 'blur(10px)',
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
      
      {/* Background Video for Hero Page */}
      {activeView === "404" && (
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none transition-opacity duration-700 ease-in-out">
          <video
            className="w-full h-full object-cover select-none pointer-events-none"
            src="https://v1.pinimg.com/videos/mc/720p/f3/1a/e8/f31ae878ac52c3fe0527b475bff88216.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
          {/* Subtle warm aesthetic white overlay with light blur to elevate legibility & match design specs */}
          <div className="absolute inset-0 bg-[#F5F5F5]/65 backdrop-blur-[2px]" />
        </div>
      )}
      
      {/* Toast Notification */}
      <div 
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-[#111111] text-white text-xs md:text-sm px-6 py-3 rounded-full shadow-2xl transition-all duration-300 flex items-center gap-2 pointer-events-none ${
          toastMessage ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0"
        }`}
      >
        <span className="material-symbols-rounded text-green-400 text-sm md:text-base">check_circle</span>
        <span>{toastMessage}</span>
      </div>

      {/* Header / Navbar */}
      <header className="w-full max-w-[1100px] mx-auto z-30 pt-3 md:pt-4">
        <div className="w-full px-5 md:px-10 py-4 flex items-center justify-between nav-dashed-border">
          
          {/* Left: Logo */}
          <a 
            href="#" 
            onClick={(e) => handleLinkClick(e, "Home")} 
            className="flex items-center gap-[10px] group transition-transform duration-200 hover:scale-[1.02]"
            id="navbar-logo"
          >
            <img 
              src={nhokaiLogo} 
              alt="NHOKAI logo" 
              className="h-[36px] w-auto select-none pointer-events-none transition-all duration-300 object-contain"
            />
            <span className="text-[20px] font-bold tracking-[-0.3px] transition-colors duration-300 text-[#111111]">
              NHOKAI
            </span>
          </a>

          {/* Center: Desktop Nav links */}
          <nav className="hidden md:flex items-center gap-[36px]" id="desktop-nav">
            <a 
              href="#" 
              onClick={(e) => handleLinkClick(e, "Our Team")} 
              className={`text-[14px] transition-all duration-200 ${
                activeView === "team" ? "font-semibold text-[#111111]" : "font-light text-[#1a1a1a]/65 hover:text-[#1a1a1a]"
              }`}
            >
              Our Team
            </a>
            <a 
              href="#" 
              onClick={(e) => handleLinkClick(e, "Solutions")} 
              className={`text-[14px] transition-all duration-200 flex items-center gap-1 ${
                activeView === "solutions" ? "font-semibold text-[#111111] hover:text-[#111111]" : "font-light text-[#1a1a1a]/65 hover:text-[#1a1a1a]"
              }`}
            >
              Solutions <span className="text-[9px] transition-colors duration-300 text-[#1a1a1a]/50">▾</span>
            </a>
          </nav>

          {/* Right: Desktop CTA Button */}
          <div className="hidden md:block">
            <button 
              id="cta-connect-desktop"
              style={{ 
                backgroundImage: 'linear-gradient(180deg, #2c2c2c 0%, #111111 100%)', 
                boxShadow: '0 4px 15px rgba(0,0,0,0.15)' 
              }}
              onClick={(e) => handleLinkClick(e, "Let's Connect")}
              className="flex items-center gap-[9px] rounded-[40px] pt-[5px] pb-[5px] pr-[16px] pl-[5px] transition-all duration-200 cursor-pointer text-[13px] font-medium hover:-translate-y-[1px] hover:shadow-[0_6px_20px_rgba(0,0,0,0.25)] hover:brightness-110 active:scale-95 text-white"
            >
              <div className="w-[24px] h-[24px] rounded-full flex items-center justify-center shadow-sm shrink-0 bg-white text-black">
                <svg className="w-[12px] h-[12px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </div>
              <span className="tracking-tight pr-[2px]">Let's Connect</span>
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
              onClick={(e) => handleLinkClick(e, "Let's Connect")}
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

      {/* Dynamic Content Switching */}
      {activeView === "404" ? (
        /* Main Content Area (Original 404 Hero) */
        <main className="flex-grow flex flex-col items-center justify-center text-center px-5 py-[2vh] md:py-[4vh] max-w-[700px] mx-auto w-full z-20">
          
          {/* Texts Wrapper (Centered) */}
          <div className="my-auto flex flex-col items-center select-none">
            
            {/* Lost text */}
            <p className="text-[14px] md:text-[15px] text-[#888888] font-normal tracking-wide mb-[12px]">
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
              <h1 className="font-medium tracking-[-1.5px] leading-[1.08] text-[#0f0f0f] select-none text-[34px] sm:text-[42px] md:text-[52px]">
                Building digital systems from real-world problems.
              </h1>

            </div>

            {/* Subtext */}
            <p className="text-[13.5px] md:text-[14px] text-[#888888] leading-[1.7] max-w-[470px] mt-[12px] md:mt-[14px] mb-[28px] tracking-normal font-light">
              NHOKAI Solution designs and develops practical software products with full-stack engineering, security awareness, delivery automation, and product-focused analysis.
            </p>

          </div>



        </main>
      ) : activeView === "team" ? (
        /* Team Members Directory View: Interactive 3D Character Stage */
        <main className="flex-grow relative w-full h-[80vh] md:h-[84vh] overflow-hidden flex flex-col md:flex-row items-center justify-center">
          
          {/* Giant Ghost Text Backdrop Layer behind characters */}
          <div 
            className="absolute left-1/2 -translate-x-1/2 pointer-events-none select-none text-neutral-950/[0.05] font-bold leading-none tracking-[-0.02em] whitespace-nowrap text-center opacity-100 uppercase transition-all duration-[650ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
            style={{
              top: '18%',
              fontFamily: '"Anton", sans-serif',
              fontSize: 'clamp(90px, 28vw, 380px)',
              zIndex: 2,
            }}
          >
            {teamMembers[activeIndex].name}
          </div>

          {/* Active Centered Character Details Glass HUD Card */}
          <div 
            key={teamMembers[activeIndex].id}
            style={{ zIndex: 30 }}
            className="absolute bottom-6 left-6 right-6 md:right-auto md:left-12 flex flex-col justify-between text-left w-[calc(100%-48px)] md:w-[400px] h-[280px] md:h-[290px] bg-neutral-900/80 backdrop-blur-xl border border-neutral-900/10 rounded-3xl p-4 md:p-5 text-white shadow-2xl animate-fade-in duration-500 scale-[0.98] hover:scale-100 transition-transform duration-300 pointer-events-auto"
          >
            {/* Top info set */}
            <div>
              {/* Member Identity display */}
              <h3 className="text-[26px] md:text-[32px] font-black tracking-tight leading-none uppercase text-white drop-shadow-md">
                {teamMembers[activeIndex].name}
              </h3>
              <p className="text-[12px] md:text-[13px] font-bold text-[#FAB114]/90 mt-1 leading-tight tracking-wide drop-shadow">
                {teamMembers[activeIndex].role}
              </p>

              {/* Divider line style */}
              <div className="w-full h-px bg-white/10 my-2.5" />

              {/* Core description details */}
              <p className="text-[11.5px] md:text-[12.5px] text-white/85 font-normal leading-[1.5]">
                {teamMembers[activeIndex].description}
              </p>

              {/* Quote block style */}
              <p className="text-[11px] italic text-neutral-300 font-light mt-2 border-l-2 border-[#FAB114] pl-2 leading-relaxed">
                "{teamMembers[activeIndex].quote}"
              </p>
            </div>

            {/* Bottom info set */}
            <div>
              {/* Modern skill pills list */}
              <div className="flex flex-wrap gap-1 mt-2.5">
                {teamMembers[activeIndex].skills?.map((skill) => (
                  <span 
                    key={skill} 
                    className="text-[9px] font-semibold bg-white/10 hover:bg-[#FAB114]/15 hover:text-[#FAB114] text-white px-2 py-0.5 rounded-full border border-white/5 transition-colors shadow-inner"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Student coordinate contact marker */}
              <div className="flex items-center gap-1.5 pt-2.5 mt-2.5 border-t border-white/10 text-[10px] font-mono text-neutral-400 select-all">
                <span className="material-symbols-rounded text-[#FAB114] text-[14px]">alternate_email</span>
                <span className="truncate">{teamMembers[activeIndex].id}@student.uitm.edu.my</span>
              </div>
            </div>
          </div>

          {/* 3D Character Stage Layer */}
          <div className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden z-10">
            {teamMembers.map((member, idx) => {
              const style = getStyleForIndex(idx);
              const isCenter = idx === centerIndex;
              const isLeft = idx === leftIndex;
              const isRight = idx === rightIndex;
              
              return (
                <div 
                  key={member.id}
                  style={{
                    ...style,
                    pointerEvents: 'auto', // permit clicking on characters directly to navigate
                  }}
                  onClick={() => {
                    if (isLeft) navigate('prev');
                    if (isRight) navigate('next');
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
                    className="w-full h-full pointer-events-none select-none drop-shadow-[0_25px_40px_rgba(0,0,0,0.65)]"
                  />
                  
                  {/* Subtle lighting vignette overlay per image to make them render depth beautifully */}
                  {!isCenter && (
                    <div className="absolute inset-0 bg-black/20 rounded-b-2xl mix-blend-multiply pointer-events-none transition-opacity duration-[650ms]" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Futuristic Cybernetic Arrow Nav Controls */}
          <div className="absolute right-6 md:right-12 bottom-6 z-30 flex items-center gap-4">
            {/* Prev button */}
            <button 
              onClick={() => navigate('prev')}
              className="w-12 h-12 rounded-full border border-white/10 bg-black/45 hover:bg-[#FAB114]/20 hover:border-[#FAB114] backdrop-blur-xl flex items-center justify-center text-white transition-all cursor-pointer group shadow-2xl active:scale-95"
              title="Rotate Previous"
            >
              <svg className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            
            {/* Custom high-end progress ticker indicator */}
            <div className="flex flex-col items-center">
              <span className="text-[12px] font-black font-mono text-[#FAB114] tracking-widest leading-none">
                0{activeIndex + 1}
              </span>
              <span className="text-[8px] font-mono text-neutral-900/50 tracking-widest uppercase mt-0.5">
                OF 0{teamMembers.length}
              </span>
            </div>

            {/* Next button */}
            <button 
              onClick={() => navigate('next')}
              className="w-12 h-12 rounded-full border border-white/10 bg-black/45 hover:bg-[#FAB114]/20 hover:border-[#FAB114] backdrop-blur-xl flex items-center justify-center text-white transition-all cursor-pointer group shadow-2xl active:scale-95"
              title="Rotate Next"
            >
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>

        </main>
      ) : (
        <SolutionsView />
      )}

    </div>
  );
}

