import React, { useState, useEffect } from "react";
import { 
  ShoppingBag, 
  Search, 
  Filter, 
  ShieldCheck, 
  CheckSquare, 
  Tag, 
  ChevronRight, 
  MapPin, 
  MessageSquare, 
  Star, 
  Calendar, 
  Users, 
  Sliders, 
  Plus, 
  Send, 
  Heart, 
  CheckCircle2, 
  Sparkles,
  Info,
  Layers,
  ArrowRight,
  ShieldAlert,
  Clock,
  ArrowUpRight,
  User,
  ThumbsUp,
  X,
  FileCheck2,
  Trash2,
  UserCheck
} from "lucide-react";

// Types for Simulator
interface Listing {
  id: string;
  title: string;
  price: number;
  category: "apparel" | "books" | "accessories" | "services";
  categoryLabel: string;
  seller: string;
  sellerEmail: string;
  sellerRep: number;
  sellerReviewsCount: number;
  image: string;
  description: string;
  meetupPoints: string[];
  isVerified: boolean;
  tags?: string[];
}

interface EventItem {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  rsvps: number;
  hasRsvped: boolean;
  image: string;
  organizer: string;
}

interface ChatMessage {
  id: string;
  sender: "buyer" | "seller";
  text: string;
  timestamp: string;
}

// Minimal core capabilities configuration
const UniCartLogo = () => (
  <svg
    viewBox="0 0 102 100"
    className="w-20 h-20 md:w-24 md:h-24 shrink-0 select-none transform hover:scale-105 transition-all duration-300"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* LAYER 1: Deep Royal Purple 'U' shape */}
    <path
      d="M 18,16
         h 18
         v 34
         c 0,4.42 3.58,8 8,8
         c 4.42,0 8,-3.58 8,-8
         V 32
         c 0,-8.84 7.16,-16 16,-16
         c 8.84,0 16,7.16 16,16
         v 18
         c 0,18.23 -14.77,33 -33,33
         c -18.23,0 -33,-14.77 -33,-33
         V 16
         Z"
      fill="#5F2582"
    />
    
    {/* LAYER 2: Interlocking Golden Yellow 'C' shape with white masking contour */}
    <path
      d="M 84,83
         h -18
         v -34
         c 0,-4.42 -3.58,-8 -8,-8
         c -4.42,0 -8,3.58 -8,8
         V 67
         c 0,8.84 -7.16,16 -16,16
         c -8.84,0 -16,-7.16 -16,-16
         v -18
         c 0,-18.23 14.77,-33 33,-33
         c 18.23,0 33,14.77 33,33
         V 83
         Z"
      stroke="#ffffff"
      strokeWidth="4"
      strokeLinejoin="round"
      fill="#FAB114"
    />
    <path
      d="M 84,83
         h -18
         v -34
         c 0,-4.42 -3.58,-8 -8,-8
         c -4.42,0 -8,3.58 -8,8
         V 67
         c 0,8.84 -7.16,16 -16,16
         c -8.84,0 -16,-7.16 -16,-16
         v -18
         c 0,-18.23 14.77,-33 33,-33
         c 18.23,0 33,14.77 33,33
         V 83
         Z"
      fill="#FAB114"
    />

    {/* LAYER 3: 3D Weave Redraw of Left/Bottom Purple 'U' arm on top of Golden Yellow 'C' with white outline */}
    <path
      d="M 18,16
         h 18
         v 34
         c 0,4.42 3.58,8 8,8
         c 4.42,0 8,-3.58 8,-8
         V 50
         H 51
         A 33 33 0 0 1 18,50
         V 16
         Z"
      stroke="#ffffff"
      strokeWidth="4"
      strokeLinejoin="round"
      fill="none"
    />
    <path
      d="M 18,16
         h 18
         v 34
         c 0,4.42 3.58,8 8,8
         c 4.42,0 8,-3.58 8,-8
         V 50
         H 51
         A 33 33 0 0 1 18,50
         V 16
         Z"
      fill="#5F2582"
    />
  </svg>
);

const capabilities = [
  {
    id: "marketplace",
    title: "Campus Marketplace",
    description: "Browse, filter, and buy verified student listings and local service offerings.",
    badge: "Primary",
    badgeClasses: "bg-amber-50 text-amber-700 border-amber-100",
    icon: <ShoppingBag className="w-3.5 h-3.5" />,
    actionText: "Open Marketplace"
  },
  {
    id: "verify",
    title: "Verified Student Access",
    description: "Secure school-bounded coordination using verified university email domains.",
    badge: "Identity",
    badgeClasses: "bg-zinc-100 text-zinc-700 border-zinc-200",
    icon: <ShieldCheck className="w-3.5 h-3.5" />,
    actionText: "Verify Enrollment"
  },
  {
    id: "booking",
    title: "Structured Escrow Holds",
    description: "Robust hold reservation flow guarding bank receipts, meetups, and reviews.",
    badge: "Escrow",
    badgeClasses: "bg-emerald-50 text-emerald-700 border-emerald-100",
    icon: <CheckSquare className="w-3.5 h-3.5" />,
    actionText: "Advance Holds"
  },
  {
    id: "chat",
    title: "In-App Student Chat",
    description: "Contextual, listing-tied relative instant messaging to arrange transaction details.",
    badge: "Real-Time",
    badgeClasses: "bg-sky-50 text-sky-700 border-sky-100",
    icon: <MessageSquare className="w-3.5 h-3.5" />,
    actionText: "Test Student Chat"
  },
  {
    id: "meetup",
    title: "Campus Hotspots",
    description: "Safe, pre-vetted campus exchange collection hubs protecting peer trade.",
    badge: "Location",
    badgeClasses: "bg-rose-50 text-rose-700 border-rose-100",
    icon: <MapPin className="w-3.5 h-3.5" />,
    actionText: "Inspect Meetups"
  },
  {
    id: "reviews",
    title: "Reputation Scoring",
    description: "Verified historical star logs that aggregate transparent student seller feedback.",
    badge: "Trust",
    badgeClasses: "bg-amber-50 text-amber-700 border-amber-100",
    icon: <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />,
    actionText: "Audit Ratings"
  },
  {
    id: "events",
    title: "Campus Discovery",
    description: "Unified listings of campus workshops, student-led hackathons, and fairs.",
    badge: "RSVP",
    badgeClasses: "bg-purple-50 text-purple-700 border-purple-100",
    icon: <Calendar className="w-3.5 h-3.5" />,
    actionText: "Browse Events"
  },
  {
    id: "moderation",
    title: "Moderators Dashboard",
    description: "Enforcement mechanics for tracking student flag alerts and banning bad listings.",
    badge: "Standards",
    badgeClasses: "bg-red-50 text-red-700 border-red-100",
    icon: <Sliders className="w-3.5 h-3.5" />,
    actionText: "Admin Roster"
  },
  {
    id: "aitag",
    title: "AI-Assisted Listing Tags",
    description: "Planned LLM classification system utilizing tag generators based on item description text.",
    badge: "AI Powered",
    badgeClasses: "bg-violet-50 text-violet-700 border-violet-150 animate-pulse",
    icon: <Tag className="w-3.5 h-3.5" />,
    actionText: "Draft Optimizer",
    isWide: true
  }
];

export default function SolutionsView() {
  // Current active capability selected on the left - can drive the mobile simulator screen
  const [activeCapability, setActiveCapability] = useState<string>("marketplace");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // --- MOBILE SIMULATOR STATE ---
  const [mobileScreen, setMobileScreen] = useState<"marketplace" | "details" | "verify" | "events" | "booking" | "chat" | "admin" | "ai-tag">("marketplace");
  
  // Marketplace entries
  const [listings, setListings] = useState<Listing[]>([
    {
      id: "l1",
      title: "UiTM Blazer (Crimson, XL)",
      price: 80,
      category: "apparel",
      categoryLabel: "Apparel",
      seller: "Ahmad Danish",
      sellerEmail: "danish.ahmad@student.uitm.edu.my",
      sellerRep: 4.9,
      sellerReviewsCount: 14,
      image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=300&q=80",
      description: "Original UiTM blazer purchased last semester. Worn only during professional practice week and convocations. Condition 9.5/10. No stains or tears.",
      meetupPoints: ["UiTM Shah Alam PTAR Library (Main Entrance)", "College Melati Dataran"],
      isVerified: true,
      tags: ["UiTM", "Blazer", "Crimson", "XL", "Formal"]
    },
    {
      id: "l2",
      title: "Calculas I Textbook (MAT183)",
      price: 32,
      category: "books",
      categoryLabel: "Academic Books",
      seller: "Siti Sarah",
      sellerEmail: "sarasiti.99@student.uitm.edu.my",
      sellerRep: 4.8,
      sellerReviewsCount: 8,
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=300&q=80",
      description: "MAT183 Calculus textbook used for Computer Science freshman year. Includes hand-written summary notes on limits and integration chapters. Helpful for finals!",
      meetupPoints: ["UiTM Shah Alam PTAR Library (Main Entrance)", "Engineering Faculty Block A Lobby"],
      isVerified: true,
      tags: ["MAT183", "Calculus", "Textbook", "Notes", "Freshman"]
    },
    {
      id: "l3",
      title: "UiTM Maroon Lanyard & Holder",
      price: 8,
      category: "accessories",
      categoryLabel: "Accessories",
      seller: "Amirul Haziq",
      sellerEmail: "amirul.h@student.uitm.edu.my",
      sellerRep: 4.5,
      sellerReviewsCount: 5,
      image: "https://images.unsplash.com/photo-1622352758114-1e0e9803ccd7?auto=format&fit=crop&w=300&q=80",
      description: "Elegant lanyard with durable metal clip and transparent card holder. Maroon color with university emblem debossed. Fits standard student ID cards.",
      meetupPoints: ["College Melati Dataran", "Foyer FSK (Faculty of Health Sciences)"],
      isVerified: true,
      tags: ["Lanyard", "UiTM", "Maroon", "IDHolder"]
    },
    {
      id: "l4",
      title: "Python & React Coding Tutoring",
      price: 25,
      category: "services",
      categoryLabel: "Student Services",
      seller: "Nik Faiz (CSC645 Tutor)",
      sellerEmail: "faiz.nik@student.uitm.edu.my",
      sellerRep: 5.0,
      sellerReviewsCount: 22,
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=300&q=80",
      description: "Struggling with programming courses or React assignments? I offer standard 1-on-1 peer teaching. RM25/hr. Free session notes and quick WhatsApp check-ins included.",
      meetupPoints: ["UiTM Shah Alam PTAR Library (Main Entrance)", "Engineering Faculty Block A Lobby"],
      isVerified: true,
      tags: ["CSC645", "Python", "React", "Tutoring", "Coding"]
    }
  ]);

  const [selectedListing, setSelectedListing] = useState<Listing>(listings[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<"all" | "apparel" | "books" | "accessories" | "services">("all");
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(["l1", "l4"]);

  // Verified access simulation state
  const [verificationEmail, setVerificationEmail] = useState("");
  const [verificationStep, setVerificationStep] = useState<"not_started" | "pending" | "verified">("not_started");
  const [typedCode, setTypedCode] = useState("");

  // Campus Events simulation state
  const [events, setEvents] = useState<EventItem[]>([
    {
      id: "e1",
      title: "UiTM Career & Internship Fair 2026",
      date: "May 15, 2026",
      time: "9:00 AM - 4:30 PM",
      venue: "Dewan Agung Tuanku Canselor (DATC)",
      rsvps: 342,
      hasRsvped: false,
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=300&q=80",
      organizer: "UiTM Student Affairs Sector"
    },
    {
      id: "e2",
      title: "Web Development Bootcamp (React + Node)",
      date: "June 2, 2026",
      time: "2:00 PM - 5:30 PM",
      venue: "CS Faculty Lab 4B (FSKM)",
      rsvps: 48,
      hasRsvped: true,
      image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=300&q=80",
      organizer: "Computer Science Club UiTM"
    },
    {
      id: "e3",
      title: "UiTM Charity Food Festival",
      date: "June 10, 2026",
      time: "10:00 AM - 9:00 PM",
      venue: "Dataran Cendekia (DC)",
      rsvps: 184,
      hasRsvped: false,
      image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=300&q=80",
      organizer: "Kolej Melati Student Council"
    }
  ]);

  // AI-assisted tagging state
  const [aiTagDescription, setAiTagDescription] = useState("Selling preloved chemistry notes for CHM150, written neatly during lectures. Perfect for first year mechanical engineering students.");
  const [isGeneratingTags, setIsGeneratingTags] = useState(false);
  const [generatedTags, setGeneratedTags] = useState<string[]>(["#CHM150", "#Chemistry", "#LectureNotes", "#MechanicalEngineering", "#UiTMResources"]);

  // Structured booking walkthrough steps
  // Lifecycle: Request -> Vendor Accept -> Upload Receipt -> Confirm Invoice -> Select Meetup -> Completion -> Review Rating
  const [bookingStep, setBookingStep] = useState<1 | 2 | 3 | 4 | 5 | 6 | 7>(1);
  const [selectedMeetupPoint, setSelectedMeetupPoint] = useState("UiTM Shah Alam PTAR Library (Main Entrance)");
  const [uploadedReceipt, setUploadedReceipt] = useState<string | null>(null);
  const [finalRating, setFinalRating] = useState(5);
  const [finalReviewText, setFinalReviewText] = useState("");
  const [bookingHistory, setBookingHistory] = useState<Array<{ id: string; listingTitle: string; step: string; timestamp: string }>>([]);

  // Real-time Chat simulation state
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { id: "1", sender: "buyer", text: "Hi, is this still available? I would love to meet tomorrow.", timestamp: "10:15 AM" },
    { id: "2", sender: "seller", text: "Salam, yes still available! I have class in FSKM until 2PM though.", timestamp: "10:18 AM" },
    { id: "3", sender: "buyer", text: "Oh, that is perfect! I can meet you right outside FSKM or around DATC?", timestamp: "10:20 AM" }
  ]);

  // Admin Moderation state
  const [adminUsers, setAdminUsers] = useState([
    { email: "muhammad.farid@student.uitm.edu.my", status: "pending", name: "Farid Harun" },
    { email: "alya.shafi@student.uitm.edu.my", status: "pending", name: "Alya Shafi" },
  ]);
  const [reportedListings, setReportedListings] = useState([
    { id: "rep1", title: "Non UI-Related Ticket Sale", reason: "Scalping ticket rules", reporter: "Imran" },
  ]);

  // Synchronize left-side active capability selection with right-side simulator view
  const handleCapabilityClick = (capabilityId: string) => {
    setActiveCapability(capabilityId);
    
    // Automatically route the mobile phone simulator screen to display/demonstrate this feature!
    if (capabilityId === "marketplace") {
      setMobileScreen("marketplace");
    } else if (capabilityId === "verify") {
      setMobileScreen("verify");
    } else if (capabilityId === "booking") {
      setMobileScreen("booking");
    } else if (capabilityId === "chat") {
      setMobileScreen("chat");
    } else if (capabilityId === "meetup") {
      setMobileScreen("details"); // Focus meetup points modal or selector on details
    } else if (capabilityId === "reviews") {
      setMobileScreen("details"); // Go to selected listing page to show reviews
    } else if (capabilityId === "events") {
      setMobileScreen("events");
    } else if (capabilityId === "moderation") {
      setMobileScreen("admin");
    } else if (capabilityId === "aitag") {
      setMobileScreen("ai-tag");
    }
  };

  // Run initial sync
  useEffect(() => {
    if (mobileScreen === "marketplace" || mobileScreen === "details") {
      setActiveCapability("marketplace");
    } else if (mobileScreen === "verify") {
      setActiveCapability("verify");
    } else if (mobileScreen === "booking") {
      setActiveCapability("booking");
    } else if (mobileScreen === "chat") {
      setActiveCapability("chat");
    } else if (mobileScreen === "events") {
      setActiveCapability("events");
    } else if (mobileScreen === "admin") {
      setActiveCapability("moderation");
    } else if (mobileScreen === "ai-tag") {
      setActiveCapability("aitag");
    }
  }, [mobileScreen]);

  // AI-Assisted Tagging Generator simulation
  const handleGenerateTags = () => {
    if (!aiTagDescription.trim()) return;
    setIsGeneratingTags(true);
    setTimeout(() => {
      // Extract pseudo tags from description text
      const words = aiTagDescription.toLowerCase().split(/[\s,.]+/);
      const output: string[] = ["#UiTM"];
      if (words.some(w => w.includes("chem") || w.includes("chm"))) output.push("#CHM150", "#Chemistry");
      if (words.some(w => w.includes("note") || w.includes("summary"))) output.push("#LectureNotes");
      if (words.some(w => w.includes("eng") || w.includes("mech"))) output.push("#Engineering");
      if (words.some(w => w.includes("fresh") || w.includes("first"))) output.push("#FreshmanResource");
      if (words.some(w => w.includes("blazer") || w.includes("suit"))) output.push("#ProfessionalApparel");
      if (words.some(w => w.includes("book") || w.includes("calculus"))) output.push("#AcademicBook", "#MAT183");
      
      if (output.length === 1) {
        output.push("#CampusResource", "#StudentListing");
      }
      
      setGeneratedTags(output);
      setIsGeneratingTags(false);
      triggerToast("AI successfully generated tags based on listing description!");
    }, 1200);
  };

  // Handle email verification simulation
  const handleVerifyEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!verificationEmail.endsWith("@student.uitm.edu.my")) {
      triggerToast("Invalid format. Email MUST end with @student.uitm.edu.my");
      return;
    }
    setVerificationStep("pending");
    triggerToast("OTP verification code dispatched to your student email.");
  };

  const handleVerifyOTPSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (typedCode === "1234" || typedCode.length === 4) {
      setVerificationStep("verified");
      triggerToast("Authentication complete! Verified badge issued.");
    } else {
      triggerToast("Error: Incorrect OTP verification code code.");
    }
  };

  // Render lists helper
  const filteredListings = listings.filter(l => {
    const matchesSearch = l.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          l.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || l.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Handle bookmark toggle
  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (bookmarkedIds.includes(id)) {
      setBookmarkedIds(bookmarkedIds.filter(item => item !== id));
      triggerToast("Item removed from saved bookmarks.");
    } else {
      setBookmarkedIds([...bookmarkedIds, id]);
      triggerToast("Item bookmarked for future reference!");
    }
  };

  // Simulate buyer sending message
  const handleSendChatMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: "buyer",
      text: chatInput,
      timestamp: "10:22 AM"
    };
    setChatMessages([...chatMessages, userMsg]);
    setChatInput("");

    // Simulate seller smart response
    setTimeout(() => {
      let botResponse = "Salam, okay sure. Let's process the book/listing via the transaction booking interface on UniCart! It is much safer.";
      if (userMsg.text.toLowerCase().includes("where")) {
        botResponse = "I can do meetup at PTAR Main Entrance during lunch time. Does that work for you?";
      } else if (userMsg.text.toLowerCase().includes("price") || userMsg.text.toLowerCase().includes("cheap")) {
        botResponse = "The price is final, as it is already heavily discounted for fellow UiTM students.";
      }
      setChatMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        sender: "seller",
        text: botResponse,
        timestamp: "10:23 AM"
      }]);
    }, 1500);
  };

  return (
    <div className="w-full flex-grow flex flex-col md:flex-row overflow-hidden relative">
      {/* Toast */}
      {toastMessage && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-[#1e1b4b]/95 border border-[#c084fc]/30 text-white text-xs px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 animate-fade-in">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* LEFT CONTAINER: Solutions & Capabilities Walkthrough (Structured Bento Roster) */}
      <div className="w-full md:w-[55%] xl:w-[58%] overflow-y-auto px-5 md:px-10 lg:pl-12 py-8 text-left flex flex-col justify-start [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        
        {/* SECTION 4: Featured Product Header */}
        <div className="mb-6 animate-fade-in flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6" id="featured-product-header">
          <div className="flex-grow">
            <h1 className="text-4xl lg:text-5xl font-black text-neutral-900 leading-none tracking-tight">
              UniCart
            </h1>
            <p className="text-md font-medium text-neutral-700 tracking-tight mt-2 max-w-[550px]">
              Mobile-first student marketplace built for verified UiTM campuses.
            </p>
            <div className="h-[2px] bg-[#800020]/20 my-4 w-10"></div>
            <p className="text-xs md:text-[13px] text-neutral-500 leading-relaxed max-w-[520px] font-normal">
              UniCart resolves informal trading overhead by uniting student listing management, secure peer communication, and transaction safety. It moves transactions from scattered messaging channels into a single trustworthy campus network with custom escrow hold reservation flows, pre-vetted campus collection coordinates, and peer-verified feedback profiles.
            </p>
          </div>
          
          {/* Logo container placed precisely in the circled region */}
          <div className="shrink-0 flex items-center justify-center p-3 bg-white/70 rounded-3xl border border-neutral-200/50 shadow-[0_4px_12px_rgba(0,0,0,0.02)] self-start sm:self-center mr-0 md:mr-4 lg:mr-8 transition-all hover:shadow-[0_8px_24px_rgba(0,0,0,0.04)]">
            <UniCartLogo />
          </div>
        </div>

        {/* SECTION 6: Key Capabilities Grid */}
        <div id="key-capabilities-section" className="mt-4">

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {capabilities.map((cap) => (
              <div 
                key={cap.id}
                onClick={() => handleCapabilityClick(cap.id)}
                className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer flex flex-col justify-start group/card relative overflow-hidden ${
                  activeCapability === cap.id 
                    ? "bg-[#800020]/[0.03] border-[#800020]/40 shadow-xs ring-1 ring-[#800020]/20" 
                    : "bg-white/80 backdrop-blur-xs border-neutral-200/70 hover:border-neutral-300 hover:shadow-[0_8px_20px_-6px_rgba(0,0,0,0.03)] shadow-[0_2px_8px_rgba(0,0,0,0.015)]"
                } ${cap.isWide ? "sm:col-span-2" : ""}`}
              >
                <div className="flex gap-3.5 items-start">
                  <div className={`p-2 rounded-lg border shrink-0 transition-all duration-300 ${
                    activeCapability === cap.id
                      ? "bg-white border-[#800020]/30 text-[#800020]"
                      : "bg-[#F5F5F5] border-neutral-200 text-neutral-700 group-hover/card:bg-neutral-100 group-hover/card:text-neutral-900"
                  }`}>
                    {cap.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-[13px] font-bold text-neutral-800 leading-snug tracking-tight group-hover/card:text-neutral-900 transition-colors">
                      {cap.title}
                    </h3>
                    <p className="text-[11px] text-neutral-500 leading-relaxed mt-0.5 font-normal">
                      {cap.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* RIGHT CONTAINER: Interactive Mobile Phone Simulator Mockup */}
      <div className="group w-full md:w-[45%] xl:w-[42%] flex flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden select-text">
        
        {/* DEVICE FRAME */}
        <div className="w-[320px] h-[650px] bg-neutral-950 rounded-[54px] p-2.5 shadow-[0_25px_60px_rgba(0,0,0,0.4),0_0_30px_rgba(0,0,0,0.15),inset_0_0_4px_rgba(255,255,255,0.2)] border-[4px] border-neutral-800 flex flex-col relative shrink-0 transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_30px_70px_rgba(0,0,0,0.45)]">
          
          {/* External Left Side Buttons */}
          {/* Silent/Mute Switch */}
          <div className="absolute top-[95px] -left-[6px] w-[3px] h-[15px] bg-neutral-700 rounded-l-md border-r border-neutral-950 shadow-sm z-30" />
          {/* Volume Up */}
          <div className="absolute top-[135px] -left-[6px] w-[3px] h-[35px] bg-neutral-700 rounded-l-md border-r border-neutral-950 shadow-sm z-30" />
          {/* Volume Down */}
          <div className="absolute top-[185px] -left-[6px] w-[3px] h-[35px] bg-neutral-700 rounded-l-md border-r border-neutral-950 shadow-sm z-30" />

          {/* External Right Side Button (Power/Side Button) */}
          <div className="absolute top-[155px] -right-[6px] w-[3px] h-[55px] bg-neutral-700 rounded-r-md border-l border-neutral-950 shadow-sm z-30" />

          {/* Speaker ear slit & Selfie camera Dynamic Island */}
          <div className="absolute top-3.5 left-1/2 -translate-x-1/2 h-[4px] w-[40px] bg-neutral-900 rounded-full z-40 opacity-70" />
          
          <div className="absolute top-5 left-1/2 -translate-x-1/2 h-[22px] w-[88px] bg-black rounded-full z-40 flex items-center justify-between px-3 shadow-inner">
            {/* Camera lens highlight inside island */}
            <div className="w-[8px] h-[8px] bg-[#0c0d12] rounded-full border border-neutral-900/40 relative flex items-center justify-center shrink-0">
              <div className="w-[3px] h-[3px] bg-[#111625] rounded-full"></div>
            </div>
            {/* Ambient status light / indicator dot */}
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300 shrink-0" />
            {/* Proximity / light sensor */}
            <div className="w-[5px] h-[5px] bg-[#08080a] rounded-full shrink-0" />
          </div>

          {/* SIMULATED CLIENT AREA (MOBILE SCREEN) */}
          <div className="w-full h-full bg-[#FAFAFC] rounded-[46px] overflow-hidden flex flex-col relative text-xs text-[#0f0f14] pt-8 font-sans shadow-inner border border-neutral-200/40">
            
            {/* REALISTIC STATUS BAR */}
            <div className="absolute top-1 left-0 right-0 h-6 px-6 flex items-center justify-between text-neutral-800 font-medium text-[9px] select-none z-30 pointer-events-none">
              <span>9:41</span>
              <div className="flex items-center gap-1.5">
                {/* Signal bars */}
                <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="2" y="16" width="3" height="4" rx="0.5" />
                  <rect x="7" y="12" width="3" height="8" rx="0.5" />
                  <rect x="12" y="8" width="3" height="12" rx="0.5" />
                  <rect x="17" y="4" width="3" height="16" rx="0.5" opacity="0.3" />
                </svg>
                {/* Wifi icon */}
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12.55a11 11 0 0 1 14.08 0" />
                  <path d="M1.42 9a16 16 0 0 1 21.16 0" />
                  <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
                  <line x1="12" y1="20" x2="12.01" y2="20" strokeWidth="4" />
                </svg>
                {/* Battery icon */}
                <div className="w-[18px] h-2.5 rounded-[3px] border border-neutral-700/80 p-[1.5px] flex items-center relative">
                  <div className="h-full w-[80%] bg-neutral-800 rounded-[1px]"></div>
                  {/* Battery tip */}
                  <div className="absolute -right-[2.5px] top-1/2 -translate-y-1/2 w-[1.5px] h-1.5 bg-neutral-700 rounded-r-[1px]"></div>
                </div>
              </div>
            </div>

            {/* Glossy diagonal reflective screen glare */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none z-30 transition-transform duration-700 group-hover:scale-110" />

            {/* Realistic Home Indicator Bar at the bottom */}
            <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-24 h-[4.5px] bg-neutral-800/60 rounded-full z-30 pointer-events-none" />
            
            {/* IN-APP HEADER */}
            <div className="bg-white border-b border-neutral-100 p-3 flex items-center justify-between relative z-20 shadow-xs shrink-0">
              <div className="flex items-center gap-1.5">
                <span className="w-5 h-5 rounded bg-gradient-to-br from-[#800020] to-purple-950 flex items-center justify-center text-white font-black text-[9px]">U</span>
                <div>
                  <h4 className="font-bold text-[11px] text-neutral-800 tracking-tight flex items-center gap-1 uppercase">
                    UniCart
                    <span className="text-[7.5px] font-black text-[#800020] bg-[#800020]/5 px-1 rounded">UiTM</span>
                  </h4>
                </div>
              </div>

              {/* Verified badge status indicator top right */}
              <div className="flex items-center gap-1">
                {mobileScreen !== "admin" && (
                  <button 
                    onClick={() => setMobileScreen("verify")}
                    className={`text-[8.5px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 transition-all ${
                      verificationStep === "verified" 
                        ? "bg-emerald-50 text-emerald-600 border border-emerald-100" 
                        : "bg-indigo-50 hover:bg-indigo-100 text-indigo-600 border border-indigo-100"
                    }`}
                  >
                    <ShieldCheck className="w-2.5 h-2.5 shrink-0" />
                    <span>{verificationStep === "verified" ? "Verified student" : "Pending Verify"}</span>
                  </button>
                )}

                {/* Secret Shortcut to Admin Mode toggle */}
                <button 
                  onClick={() => setMobileScreen(mobileScreen === "admin" ? "marketplace" : "admin")}
                  className={`p-1 rounded-md transition-colors ${
                    mobileScreen === "admin" ? "bg-red-100 text-red-600" : "bg-neutral-100 hover:bg-neutral-200 text-neutral-600"
                  }`}
                  title="Toggle Admin Platform"
                >
                  <Sliders className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* SCREEN VIEWPORT CONTROLLER */}
            <div className="flex-grow overflow-y-auto relative flex flex-col bg-slate-50/50 custom-scrollbar">
              
              {/* SCREEN 1: Campus Marketplace */}
              {mobileScreen === "marketplace" && (
                <div className="p-3 flex flex-col gap-3">
                  
                  {/* Internal Search Bar */}
                  <div className="relative">
                    <input 
                      type="text"
                      placeholder="Search books, campus blazers, services..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-white border border-neutral-200 rounded-xl pl-8 pr-3 py-1.5 text-[11px] focus:outline-none focus:border-[#800020] shadow-2xs"
                    />
                    <Search className="absolute left-2.5 top-2 w-3.5 h-3.5 text-neutral-400" />
                    {searchQuery && (
                      <button 
                        onClick={() => setSearchQuery("")} 
                        className="absolute right-2 top-2 text-neutral-400 hover:text-neutral-600"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Horizontal Category Pill Filter */}
                  <div className="flex gap-1.5 overflow-x-auto pb-1 invisible-scrollbar">
                    {(["all", "apparel", "books", "accessories", "services"] as const).map(cat => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-medium whitespace-nowrap border transition-all cursor-pointer ${
                          selectedCategory === cat 
                            ? "bg-[#800020] text-white border-[#800020]" 
                            : "bg-white text-neutral-600 border-neutral-200/70 hover:bg-neutral-50"
                        }`}
                      >
                        {cat === "all" ? "All Trade" : cat.charAt(0).toUpperCase() + cat.slice(1)}
                      </button>
                    ))}
                  </div>

                  {/* Marketplace Grid Listing Display */}
                  <div className="flex flex-col gap-2.5">
                    <div className="flex items-center justify-between text-[10px] text-neutral-500 px-0.5">
                      <span>Available Listings ({filteredListings.length})</span>
                      <span className="text-[9px] font-mono text-neutral-400">Shah Alam Campus</span>
                    </div>

                    {filteredListings.length === 0 ? (
                      <div className="bg-white rounded-xl p-6 text-center border border-dashed border-neutral-200">
                        <ShoppingBag className="w-6 h-6 text-neutral-300 mx-auto mb-1" />
                        <p className="text-neutral-500 font-medium">No campus items match query.</p>
                        <button 
                          onClick={() => { setSearchQuery(""); setSelectedCategory("all"); }}
                          className="text-[10px] text-[#800020] font-bold mt-1 inline-block hover:underline"
                        >
                          Clear filters
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {filteredListings.map(item => (
                          <div 
                            key={item.id}
                            onClick={() => { setSelectedListing(item); setMobileScreen("details"); }}
                            className="bg-white rounded-xl p-2.5 border border-neutral-100 hover:border-[#800020]/20 flex gap-2.5 cursor-pointer hover:shadow-xs transition-shadow text-left"
                          >
                            <img 
                              src={item.image} 
                              alt={item.title} 
                              className="w-[65px] h-[65px] object-cover rounded-lg shrink-0 border border-neutral-100" 
                            />
                            
                            <div className="flex-grow flex flex-col justify-between min-w-0">
                              <div>
                                <div className="flex items-center justify-between gap-1">
                                  <span className="text-[8px] font-bold px-1.5 py-0.5 bg-neutral-100 text-neutral-600 rounded">
                                    {item.categoryLabel}
                                  </span>
                                  
                                  {/* Student verification badge indicator */}
                                  <span className="text-[7.5px] text-emerald-600 font-bold flex items-center gap-0.5">
                                    <ShieldCheck className="w-2.5 h-2.5 text-emerald-500" />
                                    UiTM verified
                                  </span>
                                </div>
                                <h5 className="font-bold text-[11px] text-neutral-800 line-clamp-1 mt-1">
                                  {item.title}
                                </h5>
                                <p className="text-[9.5px] text-neutral-500 line-clamp-1">
                                  Seller: {item.seller}
                                </p>
                              </div>

                              <div className="flex items-center justify-between mt-1">
                                <span className="font-black text-[#800020] text-[11px] font-mono">
                                  RM {item.price.toFixed(2)}
                                </span>

                                <div className="flex items-center gap-1.5">
                                  <button 
                                    onClick={(e) => toggleBookmark(item.id, e)}
                                    className={`p-1 rounded-md transition-all ${
                                      bookmarkedIds.includes(item.id) 
                                        ? "text-red-500 bg-red-50" 
                                        : "text-neutral-400 bg-neutral-50 hover:bg-neutral-100"
                                    }`}
                                  >
                                    <Heart className="w-3 h-3 fill-current" />
                                  </button>
                                  <span className="text-[9px] text-[#800020] font-bold hover:underline flex items-center">
                                    View <ChevronRight className="w-2.5 h-2.5" />
                                  </span>
                                </div>
                              </div>
                            </div>

                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Create Listing Simulation Banner */}
                  <div className="bg-gradient-to-br from-[#800020] to-purple-950 text-white rounded-2xl p-3 flex items-center justify-between shadow-md mt-1">
                    <div>
                      <h5 className="font-bold text-[10.5px] leading-tight flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-amber-300" />
                        AI Listing Generator
                      </h5>
                      <p className="text-[8.5px] text-purple-100 leading-tight mt-0.5">
                        Test the intelligent category & tag auto-filler logic.
                      </p>
                    </div>
                    <button 
                      onClick={() => setMobileScreen("ai-tag")}
                      className="bg-white text-neutral-900 font-black text-[9.5px] px-2.5 py-1 rounded-lg shadow hover:bg-neutral-100 whitespace-nowrap cursor-pointer"
                    >
                      Draft now
                    </button>
                  </div>

                </div>
              )}

              {/* SCREEN 2: Listing Details & Reviews Map */}
              {mobileScreen === "details" && selectedListing && (
                <div className="flex flex-col">
                  
                  {/* Top image backing with home chevron */}
                  <div className="relative h-40 w-full shrink-0">
                    <img 
                      src={selectedListing.image} 
                      alt={selectedListing.title} 
                      className="w-full h-full object-cover" 
                    />
                    <button 
                      onClick={() => setMobileScreen("marketplace")}
                      className="absolute top-2.5 left-2.5 w-7 h-7 bg-white/95 rounded-full flex items-center justify-center shadow hover:bg-white text-neutral-800 cursor-pointer"
                    >
                      <ChevronRight className="w-4 h-4 rotate-180" />
                    </button>
                    <div className="absolute bottom-2 right-2 px-2.5 py-0.5 bg-neutral-900/85 text-white font-mono rounded text-[10px] tracking-wide font-black">
                      RM {selectedListing.price.toFixed(2)}
                    </div>
                  </div>

                  {/* Detail details panel */}
                  <div className="p-3 text-left space-y-3 bg-white">
                    
                    {/* Header */}
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[8.5px] font-bold px-1.5 py-0.5 bg-purple-50 text-[#800020] rounded border border-purple-100 uppercase tracking-widest leading-none">
                          {selectedListing.categoryLabel}
                        </span>
                        
                        <div className="flex items-center text-[10px] text-amber-500 font-bold gap-0.5 bg-amber-50 px-1.5 py-0.5 rounded">
                          <Star className="w-3 h-3 fill-current" />
                          <span>{selectedListing.sellerRep} ({selectedListing.sellerReviewsCount} sales)</span>
                        </div>
                      </div>

                      <h3 className="font-extrabold text-[13px] text-neutral-800 tracking-tight leading-tight mt-1.5">
                        {selectedListing.title}
                      </h3>
                      
                      <div className="flex items-center gap-1.5 mt-1">
                        <div className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center text-slate-700 font-bold text-[8.5px]">
                          {selectedListing.seller.charAt(0)}
                        </div>
                        <div>
                          <p className="text-[9.5px] font-bold text-neutral-700 leading-none">
                            {selectedListing.seller}
                          </p>
                          <p className="text-[8px] text-neutral-400">
                            {selectedListing.sellerEmail}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Description container */}
                    <div className="bg-slate-50/70 p-2.5 rounded-xl border border-neutral-100">
                      <h4 className="font-bold text-[9px] text-neutral-500 uppercase tracking-wider mb-1">
                        Seller Description
                      </h4>
                      <p className="text-[10px] text-neutral-600 leading-relaxed font-light">
                        {selectedListing.description}
                      </p>
                      
                      {/* Tags */}
                      {selectedListing.tags && (
                        <div className="flex flex-wrap gap-1 mt-2.5">
                          {selectedListing.tags.map(t => (
                            <span key={t} className="text-[8px] font-mono font-semibold bg-neutral-100 text-neutral-600 px-1.5 py-0.5 rounded">
                              #{t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Predefined Meetup Points listing */}
                    <div className="space-y-1.5" id="detail-meetup-points">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#800020]" />
                        <h4 className="font-bold text-[9px] text-neutral-400 uppercase tracking-wider">
                          Verified Campus Hotspots
                        </h4>
                      </div>
                      <p className="text-[8.5px] text-neutral-400 leading-tight">
                        Secured collection hotspots for safe user trade:
                      </p>
                      <div className="space-y-1 mt-1">
                        {selectedListing.meetupPoints.map((point, index) => (
                          <div 
                            key={index}
                            className="bg-neutral-50 border border-neutral-100 rounded-lg p-1.5 flex items-center gap-2 "
                          >
                            <span className="w-3.5 h-3.5 rounded-full bg-[#800020]/10 text-[#800020] text-[8px] font-bold flex items-center justify-center shrink-0">
                              {index + 1}
                            </span>
                            <span className="text-[9.5px] text-neutral-700 font-medium">
                              {point}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTAs */}
                    <div className="pt-2 flex gap-2">
                      <button 
                        onClick={() => {
                          setChatMessages([
                            ...chatMessages,
                            { id: Date.now().toString(), sender: "buyer", text: `I am interested in buying "${selectedListing.title}"! Is it still available?`, timestamp: "Just now" }
                          ]);
                          setMobileScreen("chat");
                        }}
                        className="flex-1 bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 text-neutral-700 py-1.5 rounded-xl font-bold transition-all text-[11px] flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Chat Seller</span>
                      </button>
                      
                      <button 
                        onClick={() => {
                          setBookingStep(1); 
                          setMobileScreen("booking"); 
                          triggerToast("Initiating secure peer transaction booking flow.");
                        }}
                        className="flex-1 bg-gradient-to-r from-[#800020] to-purple-900 hover:from-[#800020]/90 text-white py-1.5 rounded-xl font-black transition-all text-[11px] tracking-wide flex items-center justify-center gap-1 shadow-sm cursor-pointer"
                      >
                        <CheckSquare className="w-3.5 h-3.5" />
                        <span>Book Trade</span>
                      </button>
                    </div>

                  </div>

                </div>
              )}

              {/* SCREEN 3: Verified student access log */}
              {mobileScreen === "verify" && (
                <div className="p-3 flex flex-col gap-3 text-left">
                  
                  <div className="text-center py-2 shrink-0">
                    <div className="w-12 h-12 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center mx-auto mb-1.5">
                      <ShieldCheck className="w-6 h-6 text-indigo-600 animate-pulse" />
                    </div>
                    <h4 className="font-extrabold text-[12px] text-neutral-800">
                      Faculty Gatekeeper
                    </h4>
                    <p className="text-[9px] text-neutral-500 mt-0.5">
                      Verify your enrollment to access trade directories.
                    </p>
                  </div>

                  {verificationStep === "not_started" && (
                    <form onSubmit={handleVerifyEmailSubmit} className="space-y-3 bg-white p-3 rounded-2xl border border-neutral-100 shadow-3xs">
                      <div>
                        <label className="block text-[8px] font-black uppercase text-neutral-400 tracking-wider mb-1">
                          UiTM Student Email Address
                        </label>
                        <input 
                          type="email"
                          required
                          placeholder="yourname@student.uitm.edu.my"
                          value={verificationEmail}
                          onChange={(e) => setVerificationEmail(e.target.value)}
                          className="w-full bg-neutral-50 border border-neutral-200 rounded-xl p-2 text-[10px] focus:outline-none focus:border-indigo-500 focus:bg-white"
                        />
                        <p className="text-[8px] text-neutral-400 mt-1 leading-relaxed">
                          Only verified email accounts ending in <code className="bg-neutral-100 p-0.5 rounded">@student.uitm.edu.my</code> coordinates are accepted on UniCart.
                        </p>
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-1.5 rounded-xl transition-all text-[10px] cursor-pointer"
                      >
                        Dispatch Code
                      </button>
                    </form>
                  )}

                  {verificationStep === "pending" && (
                    <form onSubmit={handleVerifyOTPSubmit} className="space-y-3 bg-white p-4 rounded-2xl border border-neutral-100 shadow-3xs text-center">
                      <div className="p-2 bg-indigo-50/50 rounded-xl mb-1 text-[9.5px] text-indigo-800 font-medium">
                        Verification code sent to <strong>{verificationEmail}</strong>
                      </div>

                      <div className="space-y-1 max-w-[170px] mx-auto">
                        <label className="block text-[8px] font-black uppercase text-neutral-400 tracking-wider">
                          Enter 4-Digit OTP Code
                        </label>
                        <input 
                          type="text"
                          maxLength={4}
                          required
                          placeholder="e.g. 1234"
                          value={typedCode}
                          onChange={(e) => setTypedCode(e.target.value)}
                          className="w-full bg-neutral-50 border border-neutral-200 rounded-xl text-center tracking-[8px] font-bold p-1.5 focus:outline-none focus:border-indigo-500 font-mono text-sm uppercase"
                        />
                        <span className="text-[8px] text-neutral-400 block pt-0.5">Tip: Type 1234 for sandbox mode</span>
                      </div>

                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setVerificationStep("not_started")}
                          className="flex-1 bg-neutral-100 hover:bg-neutral-200 text-neutral-600 font-bold py-1.5 rounded-xl text-[9px] cursor-pointer"
                        >
                          Change Email
                        </button>
                        <button
                          type="submit"
                          className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-1.5 rounded-xl text-[9px] cursor-pointer"
                        >
                          Activate Account
                        </button>
                      </div>
                    </form>
                  )}

                  {verificationStep === "verified" && (
                    <div className="bg-white p-4 rounded-2xl border border-neutral-100 shadow-3xs text-center space-y-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-neutral-800 text-[11.5px]">Student Authenticated</h4>
                        <p className="text-[9.5px] text-neutral-500 leading-relaxed mt-1">
                          Successfully verified. You now have standard participant credentials to trade, schedule hold coordinations, and message sellers.
                        </p>
                      </div>

                      <button
                        onClick={() => setMobileScreen("marketplace")}
                        className="w-full bg-neutral-900 hover:bg-neutral-800 text-white font-bold py-1.5 rounded-xl transition-all text-[10px] cursor-pointer"
                      >
                        Enter Marketplace
                      </button>
                    </div>
                  )}

                </div>
              )}

              {/* SCREEN 4: Structured booking walkthrough screen */}
              {mobileScreen === "booking" && (
                <div className="p-3 flex flex-col gap-3 text-left">
                  
                  {/* Visual Tracker Node map */}
                  <div className="bg-white p-2.5 rounded-2xl border border-neutral-100">
                    <div className="flex items-center justify-between gap-1 border-b border-neutral-100 pb-1.5">
                      <div className="flex items-center gap-1">
                        <CheckSquare className="w-3.5 h-3.5 text-[#800020]" />
                        <span className="font-extrabold text-[10.5px] text-neutral-800">
                          Active Booking Flow
                        </span>
                      </div>
                      <span className="text-[8.5px] font-bold text-neutral-400 uppercase">
                        Stage {bookingStep} of 7
                      </span>
                    </div>

                    {/* Stepper bubbles navigation layout */}
                    <div className="flex items-center justify-between px-1.5 pt-2 mb-1">
                      {([1, 2, 3, 4, 5, 6, 7] as const).map(s => (
                        <div key={s} className="flex items-center flex-1 last:flex-none">
                          <button 
                            onClick={() => setBookingStep(s)}
                            className={`w-4 h-4 rounded-full font-mono text-[8px] font-bold flex items-center justify-center transition-all ${
                              bookingStep === s 
                                ? "bg-[#800020] text-white ring-2 ring-purple-100 scale-110" 
                                : bookingStep > s 
                                  ? "bg-emerald-500 text-white" 
                                  : "bg-neutral-200 text-neutral-600"
                            }`}
                          >
                            {bookingStep > s ? "✓" : s}
                          </button>
                          {s < 7 && (
                            <div className={`h-0.5 flex-grow mx-1 rounded ${bookingStep > s ? "bg-emerald-500" : "bg-neutral-200"}`}></div>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-between text-[7px] text-neutral-400 px-0.5 mt-0.5 font-bold uppercase tracking-tight">
                      <span>Request</span>
                      <span className="text-center">Receipt</span>
                      <span className="text-center">Meetup</span>
                      <span className="text-right">Review</span>
                    </div>
                  </div>

                  {/* ACTIVE COMPONENT STAGE WRAPPERS */}
                  <div className="bg-white rounded-2xl border border-neutral-100 p-3 min-h-[220px] flex flex-col justify-between">
                    
                    {/* Stage 1: Request Booking */}
                    {bookingStep === 1 && (
                      <div className="space-y-3 flex-grow flex flex-col justify-between text-left">
                        <div>
                          <span className="text-[8px] font-black uppercase text-[#800020] bg-purple-50 px-2 py-0.5 rounded">Step 1: Initiate booking Request</span>
                          <h4 className="font-bold text-[11px] text-neutral-800 mt-2">Book item for security hold</h4>
                          <p className="text-[9.5px] text-neutral-500 leading-relaxed font-light mt-1">
                            When you click below, a locking hold is requested. The seller Ahmad Danish will receive an instant push notification inside UniCart to lock listing: 
                            <strong className="text-neutral-700 block mt-0.5">"{selectedListing.title}" (RM {selectedListing.price})</strong>
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            setBookingStep(2);
                            triggerToast("Request dispatched to seller Ahmad Danish.");
                          }}
                          className="w-full bg-[#800020] text-white font-bold py-1.5 rounded-xl text-[10px] cursor-pointer"
                        >
                          Submit Booking Request
                        </button>
                      </div>
                    )}

                    {/* Stage 2: Seller Acceptance */}
                    {bookingStep === 2 && (
                      <div className="space-y-3 flex-grow flex flex-col justify-between text-left">
                        <div>
                          <span className="text-[8px] font-black uppercase text-amber-600 bg-amber-50 px-2 py-0.5 rounded">Step 2: Seller Accept hold</span>
                          <h4 className="font-bold text-[11px] text-neutral-800 mt-2">Awaiting decision from seller</h4>
                          <p className="text-[9.5px] text-neutral-500 leading-relaxed font-light mt-1">
                            Ahmad receives the hold proposal. You can click "Vendor Accept" below to mock the vendor approving the request and generating an instant booking invoice.
                          </p>

                          <div className="bg-slate-50 p-2.5 rounded-xl border border-neutral-200/50 mt-2 flex items-center gap-2">
                            <Clock className="w-3.5 h-3.5 text-amber-500 animate-spin shrink-0" />
                            <span className="text-[9px] font-semibold text-neutral-600">Pending Seller decision...</span>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setBookingStep(1);
                              triggerToast("Hold request rejected.");
                            }}
                            className="bg-red-50 hover:bg-red-100 text-red-600 font-bold py-1.5 rounded-xl text-[10px] flex-1 cursor-pointer"
                          >
                            Reject request
                          </button>
                          <button
                            onClick={() => {
                              setBookingStep(3);
                              triggerToast("Seller approved! Awaiting invoice audit.");
                            }}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-1.5 rounded-xl text-[10px] flex-1 cursor-pointer"
                          >
                            Seller Accept Hold
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Stage 3: Payment Proof (Receipt Upload) */}
                    {bookingStep === 3 && (
                      <div className="space-y-3 flex-grow flex flex-col justify-between text-left">
                        <div>
                          <span className="text-[8px] font-black uppercase text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">Step 3: Upload Bank Receipt</span>
                          <h4 className="font-bold text-[11px] text-neutral-800 mt-1.5">Secure Bank Transfer Portal</h4>
                          <p className="text-[9px] text-neutral-500 mt-0.5">
                            Transfer amount <strong>RM {selectedListing.price.toFixed(2)}</strong> to Seller's account, then drag & drop the receipt:
                          </p>
                          
                          {uploadedReceipt ? (
                            <div className="bg-emerald-50 border border-emerald-100 text-emerald-800 rounded-xl p-2 flex items-center gap-2 mt-2">
                              <FileCheck2 className="w-4 h-4 text-emerald-500 shrink-0" />
                              <span className="text-[9px] font-bold">receipt_uitm_transfer.pdf (Uploaded)</span>
                              <button 
                                onClick={() => setUploadedReceipt(null)}
                                className="ml-auto text-neutral-400 hover:text-neutral-600 font-bold"
                              >
                                ✕
                              </button>
                            </div>
                          ) : (
                            <div 
                              onClick={() => {
                                setUploadedReceipt("receipt_uitm_transfer.pdf");
                                triggerToast("Bank transfer receipt uploaded successfully!");
                              }}
                              className="border-2 border-dashed border-neutral-200 hover:border-indigo-500 rounded-2xl p-4 text-center cursor-pointer bg-neutral-50/50 mt-2 transition-colors"
                            >
                              <span className="material-symbols-rounded text-indigo-500 text-xl mx-auto block mb-1">cloud_upload</span>
                              <span className="text-[9.5px] font-bold text-neutral-700 block">Tap to upload proof receipt</span>
                              <span className="text-[8px] text-neutral-400 mt-1 block">Supports PDF, PNG, JPG files</span>
                            </div>
                          )}
                        </div>

                        <button
                          disabled={!uploadedReceipt}
                          onClick={() => {
                            setBookingStep(4);
                            triggerToast("Receipt dispatched to Ahmad Danish.");
                          }}
                          className={`w-full font-bold py-1.5 rounded-xl text-[10px] mt-2 transition-all cursor-pointer ${
                            uploadedReceipt 
                              ? "bg-[#800020] text-white shadow" 
                              : "bg-neutral-200 text-neutral-400 cursor-not-allowed"
                          }`}
                        >
                          Send Receipt proof
                        </button>
                      </div>
                    )}

                    {/* Stage 4: Payment Confirmation */}
                    {bookingStep === 4 && (
                      <div className="space-y-3 flex-grow flex flex-col justify-between text-left">
                        <div>
                          <span className="text-[8px] font-black uppercase text-pink-600 bg-pink-50 px-2 py-0.5 rounded">Step 4: Seller verify payment receipt</span>
                          <h4 className="font-bold text-[11px] text-neutral-800 mt-2">Awaiting Transaction Audit</h4>
                          <p className="text-[9.5px] text-neutral-500 leading-relaxed font-light mt-1">
                            The seller Ahmad Danish reads the transfer statement. Tap 'Confirm Receipt' to simulate him matching the transfer in his Bank app & confirming.
                          </p>

                          <div className="p-2 border border-indigo-100 rounded-xl bg-indigo-50/50 mt-2 flex items-center gap-2">
                            <span className="material-symbols-rounded text-[15px] text-indigo-500">article</span>
                            <span className="text-[9px] text-[#4f46e5] font-black">receipt_uitm_transfer.pdf under review</span>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            setBookingStep(5);
                            triggerToast("Payment confirmed! Meetup stage activated.");
                          }}
                          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-1.5 rounded-xl text-[10px] cursor-pointer"
                        >
                          Confirm Receipt (Mock Seller Action)
                        </button>
                      </div>
                    )}

                    {/* Stage 5: Predefined Campus Meetup Coordinates */}
                    {bookingStep === 5 && (
                      <div className="space-y-3 flex-grow flex flex-col justify-between text-left">
                        <div>
                          <span className="text-[8px] font-black uppercase text-[#800020] bg-purple-50 px-2 py-0.5 rounded">Step 5: Select Predefined Campus Meetup Point</span>
                          <h4 className="font-bold text-[11px] text-neutral-800 mt-1.5">Pick safe collection coordinate</h4>
                          <p className="text-[9px] text-neutral-400">
                            Coordinate collection location in authorized, safe campus zones:
                          </p>

                          <div className="space-y-1.5 mt-2">
                            {selectedListing.meetupPoints.map((pt) => (
                              <button 
                                key={pt}
                                onClick={() => {
                                  setSelectedMeetupPoint(pt);
                                  triggerToast(`Coordination changed to: ${pt}`);
                                }}
                                className={`w-full p-2.5 rounded-xl border text-left transition-all flex items-center gap-2 cursor-pointer ${
                                  selectedMeetupPoint === pt 
                                    ? "bg-purple-50 border-[#800020] text-[#800020] shadow-sm font-semibold" 
                                    : "bg-white border-neutral-200 text-neutral-600"
                                }`}
                              >
                                <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 text-[8px] ${
                                  selectedMeetupPoint === pt 
                                    ? "bg-[#800020] border-[#800020] text-white" 
                                    : "border-neutral-300"
                                }`}>
                                  ✓
                                </span>
                                <span className="text-[10px] line-clamp-1">{pt}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            setBookingStep(6);
                            triggerToast("Meetup coordinates locked. Ready to meet!");
                          }}
                          className="w-full bg-neutral-900 text-white font-bold py-1.5 rounded-xl text-[10px] mt-2 cursor-pointer"
                        >
                          Lock Meetup Spot
                        </button>
                      </div>
                    )}

                    {/* Stage 6: Completion */}
                    {bookingStep === 6 && (
                      <div className="space-y-3 flex-grow flex flex-col justify-between text-left">
                        <div>
                          <span className="text-[8px] font-black uppercase text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">Step 6: Meetup & Delivery</span>
                          <h4 className="font-bold text-[11px] text-neutral-800 mt-2">Meet Seller at Predefined Zone</h4>
                          <p className="text-[9.5px] text-neutral-500 leading-relaxed font-light mt-1">
                            Coordinate with Ahmad via UniCart chat. Meet safely at the locked coord: 
                            <strong className="text-[#800020] block mt-0.5">"{selectedMeetupPoint}"</strong>
                            Once you physically inspect the item & finish exchange, click "Complete Trade" below.
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            setBookingStep(7);
                            triggerToast("Excellent. Trade successfully completed!");
                          }}
                          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-1.5 rounded-xl text-[10px] cursor-pointer"
                        >
                          Complete Trade (Item Received)
                        </button>
                      </div>
                    )}

                    {/* Stage 7: Review and Reputation Signals */}
                    {bookingStep === 7 && (
                      <div className="space-y-3 flex-grow flex flex-col justify-between text-left">
                        <div>
                          <span className="text-[8px] font-black uppercase text-amber-600 bg-amber-50 px-2 py-0.5 rounded">Step 7: Leave Seller Review</span>
                          <h4 className="font-bold text-[11px] text-neutral-800 mt-1.5">Enhance Campus Trust Level</h4>
                          
                          <div className="flex justify-center gap-1.5 pt-1.5">
                            {([1, 2, 3, 4, 5] as const).map(stars => (
                              <button 
                                key={stars}
                                onClick={() => setFinalRating(stars)}
                                className="text-xl transition-all cursor-pointer"
                              >
                                <Star className={`w-5 h-5 ${stars <= finalRating ? "text-amber-400 fill-amber-400" : "text-neutral-200"}`} />
                              </button>
                            ))}
                          </div>

                          <textarea 
                            rows={2}
                            placeholder="Optional: leave a review for the seller campus profile..."
                            value={finalReviewText}
                            onChange={(e) => setFinalReviewText(e.target.value)}
                            className="w-full bg-neutral-50 border border-neutral-200 rounded-xl p-2 text-[10px] mt-2.5 focus:outline-none focus:border-[#800020]"
                          />
                        </div>

                        <button
                          onClick={() => {
                            triggerToast("Trust system updated. Thank you for using UniCart!");
                            
                            // Dynamically insert review statement into selected listing review log, let's update state
                            const currentListingsCopy = [...listings];
                            const targetIdx = currentListingsCopy.findIndex(l => l.id === selectedListing.id);
                            if (targetIdx !== -1) {
                              const item = currentListingsCopy[targetIdx];
                              item.sellerReviewsCount += 1;
                              // Recalculate average reputation simulation
                              item.sellerRep = Math.round(((item.sellerRep * (item.sellerReviewsCount - 1) + finalRating) / item.sellerReviewsCount) * 10) / 10;
                              setListings(currentListingsCopy);
                            }
                            
                            setBookingStep(1);
                            setMobileScreen("marketplace");
                          }}
                          className="w-full bg-[#800020] text-white font-bold py-1.5 rounded-xl text-[10px] cursor-pointer animate-pulse"
                        >
                          Submit Trust Review
                        </button>
                      </div>
                    )}

                  </div>

                </div>
              )}

              {/* SCREEN 5: Real-time Chat simulator */}
              {mobileScreen === "chat" && (
                <div className="flex flex-col h-full bg-neutral-50">
                  
                  {/* Chat seller detail mini head */}
                  <div className="bg-white px-3 py-2 border-b border-neutral-100 flex items-center justify-between shadow-3xs shrink-0">
                    <div className="flex items-center gap-1.5 text-left">
                      <div className="w-6 h-6 rounded-full bg-[#800020] text-white text-[9.5px] font-bold flex items-center justify-center">
                        AD
                      </div>
                      <div>
                        <h4 className="font-bold text-[10.5px] text-neutral-800 leading-none">
                          Ahmad Danish
                        </h4>
                        <span className="text-[8px] text-emerald-500 font-medium tracking-tight">Active student seller</span>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => setMobileScreen("details")}
                      className="text-[9px] text-[#800020] font-bold hover:underline"
                    >
                      Listing Details
                    </button>
                  </div>

                  {/* Message Bubble Container */}
                  <div className="flex-grow overflow-y-auto p-3 space-y-2.5 flex flex-col justify-start custom-scrollbar h-[270px]">
                    {chatMessages.map(msg => (
                      <div 
                        key={msg.id}
                        className={`max-w-[75%] rounded-2xl p-2.5 text-[10.5px] text-left leading-normal relative ${
                          msg.sender === "buyer" 
                            ? "bg-[#800020] text-white rounded-tr-none self-end" 
                            : "bg-white text-neutral-800 border border-neutral-100 rounded-tl-none self-start"
                        }`}
                      >
                        <p>{msg.text}</p>
                        <span className={`text-[7px] block text-right mt-1 font-mono ${
                          msg.sender === "buyer" ? "text-purple-200" : "text-neutral-400"
                        }`}>
                          {msg.timestamp}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Bottom Text Input Box */}
                  <form onSubmit={handleSendChatMessage} className="p-2 border-t border-neutral-100 bg-white flex gap-1.5 shrink-0">
                    <input 
                      type="text"
                      placeholder="Type campus trade reply..."
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      className="flex-grow bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-1 text-[10px] focus:outline-none focus:border-[#800020]"
                    />
                    <button 
                      type="submit"
                      disabled={!chatInput.trim()}
                      className={`p-1.5 rounded-xl flex items-center justify-center cursor-pointer transition-colors shrink-0 ${
                        chatInput.trim() 
                          ? "bg-[#800020] text-white" 
                          : "bg-neutral-100 text-neutral-400 cursor-not-allowed"
                      }`}
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </form>

                  {/* Suggest replies */}
                  <div className="bg-white p-1.5 flex gap-1 overflow-x-auto invisible-scrollbar border-t border-neutral-100 shrink-0">
                    {[
                      "Is RM75 okay?",
                      "Can we meet tomorrow?",
                      "Will you accept Cash?"
                    ].map(rep => (
                      <button
                        key={rep}
                        type="button"
                        onClick={() => {
                          setChatInput(rep);
                        }}
                        className="text-[8.5px] border border-neutral-200 px-2 py-0.5 rounded-full hover:bg-neutral-50 text-neutral-600 whitespace-nowrap cursor-pointer"
                      >
                        {rep}
                      </button>
                    ))}
                  </div>

                </div>
              )}

              {/* SCREEN 6: Campus events log and attendance tracker */}
              {mobileScreen === "events" && (
                <div className="p-3 flex flex-col gap-3">
                  
                  <div className="flex items-center justify-between text-left px-0.5">
                    <div>
                      <h4 className="font-black text-[12px] text-neutral-800">Campus Events RSVP</h4>
                      <p className="text-[8.5px] text-neutral-400">Expand UniCart into active campus discovery.</p>
                    </div>
                    <span className="p-1 px-2 rounded-full bg-[#800020]/10 text-[#800020] text-[8px] font-bold">UiTM Portal</span>
                  </div>

                  <div className="space-y-3">
                    {events.map(ev => (
                      <div 
                        key={ev.id}
                        className="bg-white rounded-2xl border border-neutral-100 overflow-hidden shadow-2xs text-left"
                      >
                        <img 
                          src={ev.image} 
                          alt={ev.title} 
                          className="w-full h-24 object-cover" 
                        />
                        <div className="p-2.5 space-y-2">
                          <div>
                            <span className="text-[7px] bg-indigo-50 text-[#4f46e5] font-black uppercase px-2 py-0.5 rounded tracking-wider">
                              {ev.organizer}
                            </span>
                            <h5 className="font-extrabold text-[11px] text-neutral-800 leading-tight mt-1.5">
                              {ev.title}
                            </h5>
                          </div>

                          <div className="space-y-1 text-[9.5px] text-neutral-500 font-light leading-none">
                            <p className="flex items-center gap-1">
                              <Calendar className="w-3 h-3 text-[#800020] shrink-0" />
                              <span>{ev.date} • {ev.time}</span>
                            </p>
                            <p className="flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-indigo-500 shrink-0" />
                              <span className="line-clamp-1">{ev.venue}</span>
                            </p>
                          </div>

                          <div className="h-[1px] bg-neutral-100"></div>

                          {/* RSVP controller button */}
                          <div className="flex items-center justify-between pt-1">
                            <span className="text-[9px] font-bold text-neutral-700 flex items-center gap-1 bg-neutral-50 px-1.5 py-0.5 rounded">
                              <Users className="w-3.5 h-3.5 text-neutral-400" />
                              <span>{ev.rsvps} attending</span>
                            </span>

                            <button 
                              onClick={() => {
                                const copy = [...events];
                                const idx = copy.findIndex(e => e.id === ev.id);
                                if (idx !== -1) {
                                  const target = copy[idx];
                                  if (target.hasRsvped) {
                                    target.rsvps -= 1;
                                    target.hasRsvped = false;
                                    triggerToast("RSVP successfully withdrawn.");
                                  } else {
                                    target.rsvps += 1;
                                    target.hasRsvped = true;
                                    triggerToast("RSVP confirmed! Added to student activity log.");
                                  }
                                  setEvents(copy);
                                }
                              }}
                              className={`text-[9.5px] font-bold px-3 py-1 rounded-lg transition-all cursor-pointer ${
                                ev.hasRsvped 
                                  ? "bg-emerald-50 text-emerald-600 border border-emerald-100 font-black" 
                                  : "bg-[#800020] hover:bg-[#800020]/90 text-white"
                              }`}
                            >
                              {ev.hasRsvped ? "★ RSVP'ed!" : "RSVP now"}
                            </button>
                          </div>
                        </div>

                      </div>
                    ))}
                  </div>

                </div>
              )}

              {/* SCREEN 7: Admin Moderation system sandbox */}
              {mobileScreen === "admin" && (
                <div className="p-3 flex flex-col gap-3 text-left">
                  
                  <div className="bg-[#1e1b4b] text-[#c084fc] p-3 rounded-2xl flex items-center justify-between border border-[#c084fc]/20 leading-none">
                    <div>
                      <h4 className="font-black text-[11px] text-white">Administration Cabin</h4>
                      <p className="text-[8px] text-purple-200 mt-1">Pending Moderation &amp; Verification Roster</p>
                    </div>
                    <Sliders className="w-4 h-4 text-amber-400" />
                  </div>

                  {/* Section A: Pending account verification requests */}
                  <div className="space-y-1.5">
                    <h5 className="font-black text-[9px] text-neutral-500 uppercase tracking-widest pl-0.5">
                      Pending Student Verifications ({adminUsers.length})
                    </h5>
                    
                    {adminUsers.length === 0 ? (
                      <p className="text-[9px] text-neutral-400 pt-1 text-center bg-white border border-neutral-100 rounded-xl p-3">
                        All student enrollment credentials approved!
                      </p>
                    ) : (
                      <div className="space-y-1.5">
                        {adminUsers.map(usr => (
                          <div 
                            key={usr.email}
                            className="bg-white border border-neutral-100 rounded-xl p-2.5 flex items-center justify-between"
                          >
                            <div>
                              <p className="font-bold text-[10px] text-neutral-800">{usr.name}</p>
                              <p className="font-mono text-[8px] text-[#4f46e5] leading-none mt-0.5">{usr.email}</p>
                            </div>

                            <button 
                              onClick={() => {
                                setAdminUsers(adminUsers.filter(u => u.email !== usr.email));
                                triggerToast(`Verified student account approved: ${usr.name}`);
                              }}
                              className="bg-emerald-600 hover:bg-emerald-700 text-white font-black text-[8px] px-2 py-1 rounded-md shrink-0 flex items-center gap-0.5 cursor-pointer"
                            >
                              <UserCheck className="w-2.5 h-2.5" />
                              <span>Verify</span>
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Section B: Flagged listings audit logs */}
                  <div className="space-y-1.5">
                    <h5 className="font-black text-[9px] text-neutral-500 uppercase tracking-widest pl-0.5">
                      Flagged listing reports ({reportedListings.length})
                    </h5>
                    
                    {reportedListings.length === 0 ? (
                      <p className="text-[9px] text-neutral-400 pt-1 text-center bg-white border border-neutral-100 rounded-xl p-3">
                        Marketplace database clean. Zero active warning flags.
                      </p>
                    ) : (
                      <div className="space-y-1.5">
                        {reportedListings.map(rep => (
                          <div 
                            key={rep.id}
                            className="bg-white border border-neutral-150 p-2.5 rounded-xl space-y-2 text-left"
                          >
                            <div className="flex items-center justify-between gap-1 leading-none">
                              <span className="font-bold text-[10px] text-neutral-800 truncate">{rep.title}</span>
                              <span className="text-[7.5px] font-black text-red-600 bg-red-50 border border-red-100 px-1.5 py-0.5 rounded uppercase font-mono">Reported</span>
                            </div>
                            
                            <p className="text-[8.5px] text-neutral-500 font-light leading-tight">
                              Reporter <strong>{rep.reporter}</strong> flagged: <span className="text-red-700">"{rep.reason}"</span>
                            </p>

                            <div className="flex gap-1.5 border-t border-neutral-100 pt-2">
                              <button 
                                onClick={() => {
                                  setReportedListings(reportedListings.filter(r => r.id !== rep.id));
                                  triggerToast("Resolved warning. Listing cleared.");
                                }}
                                className="flex-1 bg-neutral-100 hover:bg-neutral-200 text-neutral-600 font-bold py-1 rounded text-[8px] cursor-pointer text-center"
                              >
                                Dismiss Report
                              </button>
                              <button 
                                onClick={() => {
                                  setReportedListings(reportedListings.filter(r => r.id !== rep.id));
                                  triggerToast("Listing banned & deleted from active client index.");
                                }}
                                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-1 rounded text-[8px] flex items-center justify-center gap-0.5 cursor-pointer"
                              >
                                <Trash2 className="w-2.5 h-2.5" />
                                <span>Takedown Item</span>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Return tab link */}
                  <button 
                    onClick={() => setMobileScreen("marketplace")}
                    className="w-full bg-neutral-900 text-white text-[9.5px] font-bold py-1.5 rounded-xl text-center cursor-pointer mt-1"
                  >
                    Return to Marketplace View
                  </button>

                </div>
              )}

              {/* SCREEN 8: AI-Assisted Tagging generator */}
              {mobileScreen === "ai-tag" && (
                <div className="p-3 flex flex-col gap-3 text-left">
                  
                  <div className="bg-gradient-to-r from-violet-600 to-indigo-700 text-white p-3 rounded-2xl border border-violet-500/20 shadow-xs">
                    <h4 className="font-extrabold text-[11px] flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      AI tagging prototype
                    </h4>
                    <p className="text-[8.5px] text-purple-100 mt-1 font-light leading-snug">
                      Write some mock description text below, then click "Generate" to trigger the intelligent LLM tagging algorithm simulation.
                    </p>
                  </div>

                  <div className="bg-white p-3 rounded-2xl border border-neutral-100 space-y-3 shadow-3xs">
                    <div>
                      <label className="block text-[8px] font-black uppercase text-neutral-400 tracking-wider mb-1">
                        Draft Listing Description
                      </label>
                      <textarea 
                        rows={3}
                        value={aiTagDescription}
                        onChange={(e) => setAiTagDescription(e.target.value)}
                        className="w-full bg-slate-50 border border-neutral-200 rounded-xl p-2.5 text-[10.5px] focus:outline-none focus:border-violet-500 leading-normal"
                        placeholder="Write details e.g. Selling a chemistry textbook CHM150..."
                      />
                    </div>

                    <button 
                      type="button"
                      onClick={handleGenerateTags}
                      disabled={isGeneratingTags || !aiTagDescription.trim()}
                      className={`w-full font-bold py-1.5 rounded-xl text-[10px] flex items-center justify-center gap-1 cursor-pointer transition-all ${
                        isGeneratingTags 
                          ? "bg-violet-100 text-violet-400 cursor-wait" 
                          : "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow"
                      }`}
                    >
                      {isGeneratingTags ? (
                        <>
                          <Clock className="w-3.5 h-3.5 animate-spin" />
                          <span>Generating tags from description...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                          <span>Execute Tag suggestion generator</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Tags result */}
                  <div className="bg-white p-3 rounded-2xl border border-neutral-100 space-y-1.5">
                    <h5 className="font-black text-[8px] text-neutral-400 uppercase tracking-wider">
                      Generated Index Tags ({generatedTags.length})
                    </h5>
                    
                    <div className="flex flex-wrap gap-1.5">
                      {generatedTags.map((t, idx) => (
                        <span 
                          key={idx}
                          className="text-[9.5px] font-mono font-bold bg-violet-50 hover:bg-violet-100 border border-violet-100 text-violet-700 px-2 py-0.5 rounded-lg flex items-center gap-1 transition-all"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button 
                    onClick={() => {
                      // Simulating saving the draft to the marketplace listings!
                      const newListingId = "l_new_" + Date.now();
                      const customMockListing: Listing = {
                        id: newListingId,
                        title: "Custom Generated Listing Item",
                        price: 15,
                        category: "books",
                        categoryLabel: "Academic Resource",
                        seller: "Me (Verified Student)",
                        sellerEmail: "me.myself@student.uitm.edu.my",
                        sellerRep: 5.0,
                        sellerReviewsCount: 0,
                        image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=300&q=80",
                        description: aiTagDescription,
                        meetupPoints: ["UiTM Shah Alam PTAR Library (Main Entrance)"],
                        isVerified: true,
                        tags: generatedTags.map(t => t.replace("#", ""))
                      };
                      
                      setListings([customMockListing, ...listings]);
                      setSelectedListing(customMockListing);
                      setMobileScreen("details");
                      triggerToast("Listing saved! Viewing draft detailing page.");
                    }}
                    className="w-full bg-[#800020] text-white text-[10px] font-black py-1.5 rounded-xl text-center cursor-pointer"
                  >
                    Deploy Item Draft to active index
                  </button>

                </div>
              )}

            </div>

            {/* IN-APP FOOTER NAVIGATION PANEL */}
            <div className="bg-white border-t border-neutral-100 px-1 py-1.5 flex items-center justify-around shrink-0 relative z-15 shadow-2xs">
              
              <button 
                onClick={() => setMobileScreen("marketplace")}
                className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-all ${
                  mobileScreen === "marketplace" || mobileScreen === "details"
                    ? "text-[#800020] font-bold" 
                    : "text-neutral-400 hover:text-neutral-600"
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span className="text-[7.5px] tracking-tight uppercase">Market</span>
              </button>

              <button 
                onClick={() => {
                  setBookingStep(1);
                  setMobileScreen("booking");
                }}
                className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-all ${
                  mobileScreen === "booking" 
                    ? "text-[#800020] font-bold" 
                    : "text-neutral-400 hover:text-neutral-600"
                }`}
              >
                <CheckSquare className="w-4 h-4" />
                <span className="text-[7.5px] tracking-tight uppercase">Booking</span>
              </button>

              <button 
                onClick={() => setMobileScreen("chat")}
                className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-all ${
                  mobileScreen === "chat" 
                    ? "text-[#800020] font-bold" 
                    : "text-neutral-400 hover:text-neutral-600"
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span className="text-[7.5px] tracking-tight uppercase">Chat</span>
              </button>

              <button 
                onClick={() => setMobileScreen("events")}
                className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-all ${
                  mobileScreen === "events" 
                    ? "text-[#800020] font-bold" 
                    : "text-neutral-400 hover:text-neutral-600"
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span className="text-[7.5px] tracking-tight uppercase">Events</span>
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
