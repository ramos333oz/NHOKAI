/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import SolutionsView from "./components/SolutionsView";

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
  imageUrl: string;   // High-quality photographic background for atmospheric accordion behavior
}

export default function App() {
  const [activeView, setActiveView] = useState<'404' | 'team' | 'solutions'>('solutions');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [activeId, setActiveId] = useState<string>("moussa");

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
      showToast("Loading NHOKAI solutions team roster...");
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
       imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
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
       imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80"
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
       imageUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80"
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
       imageUrl: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80"
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
       imageUrl: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=800&q=80"
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
       imageUrl: "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=800&q=80"
    }
  ];

  const filteredTeam = filterCategory === "all" 
    ? teamMembers 
    : teamMembers.filter(m => m.category === filterCategory);

  return (
    <div className="w-full h-screen flex flex-col justify-between overflow-hidden select-none relative font-sans text-[#1a1a1a]">
      
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
            className="flex items-center gap-[9px] group transition-transform duration-200 hover:scale-[1.02]"
            id="navbar-logo"
          >
            <img 
              src="https://pub-f170a2592d2c4a1485466404c36807be.r2.dev/Tests/logoipsum-415.svg" 
              alt="nexto logo" 
              className="h-[28px] select-none pointer-events-none"
              style={{ filter: "brightness(0)" }}
            />
            <span className="text-[20px] font-bold tracking-[-0.3px] text-[#111111]">
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
              Solutions <span className="text-[9px] text-[#1a1a1a]/50">▾</span>
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
              className="flex items-center gap-[9px] text-white rounded-[40px] pt-[5px] pb-[5px] pr-[16px] pl-[5px] transition-all duration-200 cursor-pointer text-[13px] font-medium hover:-translate-y-[1px] hover:shadow-[0_6px_20px_rgba(0,0,0,0.25)] hover:brightness-110 active:scale-95"
            >
              <div className="w-[24px] h-[24px] rounded-full bg-white flex items-center justify-center text-black shadow-sm shrink-0">
                <svg className="w-[12px] h-[12px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </div>
              <span className="tracking-tight pr-[2px]">Let's Connect</span>
            </button>
          </div>

          {/* Mobile Hamburger menu */}
          <button 
            id="mobile-menu-burger"
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 z-50 relative focus:outline-none cursor-pointer" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <div className="w-[24px] h-[16px] flex flex-col justify-between">
              <span className={`block w-[24px] h-[2px] bg-[#111111] transition-all duration-300 rounded-full ${isMobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
              <span className={`block w-[24px] h-[2px] bg-[#111111] transition-all duration-200 rounded-full ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
              <span className={`block w-[24px] h-[2px] bg-[#111111] transition-all duration-300 rounded-full ${isMobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
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
        /* Team Members Directory View */
        <main className="flex-grow flex flex-col w-full z-20 overflow-hidden relative max-w-[1240px] mx-auto px-4 md:px-8 pt-4 pb-6">
          
          {/* Header Bar within Team Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-6 shrink-0 text-left">
            <div>
              <h2 className="text-[24px] md:text-[28px] font-bold tracking-tight text-[#111111]">
                Say Hello To Our Team
              </h2>
            </div>
          </div>

          {/* Cards dynamic horizontal accordion Layout / vertical on small displays for responsiveness */}
          <div className="flex-1 overflow-y-auto md:overflow-hidden pr-1 md:pr-2 flex flex-col md:flex-row gap-4 h-full md:h-[450px] lg:h-[500px] w-full py-1">
            {teamMembers.map((member) => {
              const isActive = activeId === member.id;
              
              return (
                <div
                  key={member.id}
                  onMouseEnter={() => setActiveId(member.id)}
                  onClick={() => {
                    setActiveId(member.id);
                    showToast(`Active Profile: ${member.name}`);
                  }}
                  className={`group relative rounded-[28px] md:rounded-[32px] overflow-hidden transition-all duration-[700ms] ease-[cubic-bezier(0.25,0.8,0.25,1)] cursor-pointer shadow-[0_12px_32px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.18)] ${
                    isActive 
                      ? "flex-[3.5] sm:flex-[4.5] md:flex-[5] h-[340px] md:h-full opacity-100 ring-2 ring-white/10" 
                      : "flex-[1] h-[72px] md:h-full opacity-65 hover:opacity-100"
                  }`}
                >
                  {/* Atmospheric scenic background image representation */}
                  <img 
                    src={member.imageUrl} 
                    referrerPolicy="no-referrer"
                    alt={member.name} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                  />

                  {/* Dark Vignette Overlaying background image to increase technical readability */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/15 transition-opacity duration-500 z-10 ${
                    isActive ? "opacity-100" : "opacity-85"
                  }`} />

                  {/* Shifting Glass Overlay element representing active state shimmer */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.03] to-white/[0.12] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-15" />

                  {/* Expanded detail elements at top (category & role detailed items) */}
                  <div className={`absolute top-5 left-5 right-5 z-20 text-left transition-all duration-500 leading-none ${
                    isActive ? "opacity-100 translate-y-0 scale-100 delay-150" : "opacity-0 -translate-y-4 scale-95 pointer-events-none"
                  }`}>
                    {/* Category Label badge */}
                    <span className="inline-block text-[8px] font-black tracking-widest text-[#FAB114] uppercase border border-[#FAB114]/40 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full mb-3">
                      {member.category}
                    </span>

                    {/* Member comprehensive detailed text and skills */}
                    <div className="mt-1 max-w-[280px]">
                      <p className="text-[11px] md:text-[12px] text-white/90 font-medium leading-[1.65] drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]">
                        {member.description}
                      </p>
                      
                      {/* Detailed quote block */}
                      <p className="text-[10px] md:text-[11px] italic text-neutral-300 font-light mt-2 border-l border-white/20 pl-2 leading-relaxed">
                        "{member.quote}"
                      </p>

                      {/* Expertise skills tags list */}
                      <div className="flex flex-wrap gap-1 mt-3.5">
                        {member.skills?.map((skill) => (
                          <span 
                            key={skill} 
                            className="text-[8.5px] font-bold bg-white/10 hover:bg-[#FAB114]/20 hover:text-[#FAB114] text-white/90 px-2 py-0.5 rounded-full border border-white/5 transition-all duration-200"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      {/* Student official email coordinate line */}
                      <div className="flex items-center gap-1.5 pt-3 mt-3.5 border-t border-white/15">
                        <span className="material-symbols-rounded text-[#FAB114] text-[13px]">alternate_email</span>
                        <span className="text-[9px] text-neutral-300 font-mono tracking-tight select-all truncate">
                          {member.id}@student.uitm.edu.my
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* BOTTOM OVERLAY DESIGN MAPPED TO EXACT PICTURE MATCHES */}
                  {isActive ? (
                    /* ACTIVE DESIGN: Left bottom circle circular button next to title + subtitle */
                    <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between z-20 animate-fade-in duration-500">
                      <div className="flex items-center gap-3">
                        {/* circular button badge with black fill or icon shadow like the picture */}
                        <div className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-white flex items-center justify-center text-neutral-950 shadow-[0_4px_15px_rgba(0,0,0,0.25)] shrink-0 transition-transform duration-300 group-hover:scale-105">
                          <span className="material-symbols-rounded text-[20px] font-bold">
                            {member.icon}
                          </span>
                        </div>

                        {/* Text information */}
                        <div className="flex flex-col text-left">
                          <h3 className="text-[18px] md:text-[20px] font-black tracking-wide text-white leading-none uppercase drop-shadow-md">
                            {member.name}
                          </h3>
                          <span className="text-[8.5px] md:text-[9px] font-bold uppercase tracking-widest text-[#FAB114] mt-1 pr-1 leading-none drop-shadow-sm">
                            {member.role}
                          </span>
                        </div>
                      </div>

                      {/* NHOKAI static code or branding at bottom-right */}
                      <span className="hidden lg:inline-block text-[8px] font-mono tracking-widest text-white/40 uppercase">
                        NHOKAI STACK
                      </span>
                    </div>
                  ) : (
                    /* INACTIVE DESIGN: Thin column, centered white action badge at bottom matching image */
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 transition-all duration-300 group-hover:scale-110 flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-white/95 backdrop-blur-md flex items-center justify-center text-neutral-900 shadow-md transition-all duration-300">
                        <span className="material-symbols-rounded text-[18px] text-neutral-800">
                          {member.icon}
                        </span>
                      </div>
                      {/* Vertical indicator text for slim cards on tablet/desktop */}
                      <span className="hidden md:inline-block uppercase tracking-wider text-[8px] font-bold text-white/50 group-hover:text-white/80 mt-2 transition-colors">
                        {member.verticalText}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>



        </main>
      ) : (
        <SolutionsView />
      )}

    </div>
  );
}

