"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Database, Server, Cloud, Cpu, Bot, Settings, RefreshCw, ClipboardCheck, Quote, ArrowRight, ChevronLeft, ChevronRight, ServerCog, Component, ShieldCheck, Box, Network, FolderOpen, Folder, FileCode2, FileJson, ChevronDown } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence, useAnimationFrame, useMotionValue } from "framer-motion";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { DataStreamVisual } from "@/components/DataStreamVisual";
import { AnomalyDetectionVisual } from "@/components/AnomalyDetectionVisual";

const PROJECTS = [
  { id: 1, title: "PLM Data Lake Migration", tags: ["AWS", "Snowflake", "dbt"], stat: "96% Time Saved", desc: "Migrated legacy product lifecycle management data into a unified lakehouse, drastically reducing reporting time.", visual: "slider" },
  { id: 2, title: "Global Logistics Lakehouse", tags: ["Databricks", "Delta Lake", "Kafka"], stat: "5PB+ Data", desc: "Constructed a real-time streaming architecture resolving supply chain bottlenecks globally.", visual: "stream" },
  { id: 3, title: "Fintech Fraud Detection", tags: ["Snowflake", "dbt", "Airflow"], stat: "< 50ms latency", desc: "Built an end-to-end data pipeline feeding ML models to detect anomalies in real-time.", visual: "anomaly" },
];

const TESTIMONIALS = [
  {
    quote: "We were struggling with scattered data across three different systems — our ERP, our CRM, and a legacy warehouse nobody wanted to touch. WillowVibe built us a single automated pipeline that pulls everything together overnight. Our Monday morning reports now take minutes instead of half a day.",
    name: "Rajesh Nair",
    role: "Head of Operations, Bengaluru Logistics Pvt. Ltd."
  },
  {
    quote: "The sheer speed of the streaming architecture they deployed is incredible. We are now processing millions of logistics events with sub-50ms latency. Pure engineering excellence.",
    name: "Marcus Thorne",
    role: "VP of Engineering, GlobalFreight"
  },
  {
    quote: "Working with this team feels like having an elite in-house data unit. The pipeline audit alone saved us 40% on our monthly cloud warehouse computing costs.",
    name: "David Chen",
    role: "Head of Analytics, RetailPro"
  },
];

// ── Floating Chat Widget ──
const FloatingChatWidget = () => (
  <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 bg-neutral-900/90 backdrop-blur-md border border-cyan-500/50 shadow-[0_0_15px_rgba(34,211,238,0.3)] rounded-full cursor-pointer hover:scale-105 transition-transform overflow-hidden">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
    <Bot className="w-6 h-6 text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)] relative z-10" />
    <span className="text-cyan-400 font-bold font-mono text-sm tracking-widest uppercase relative z-10">Ask Us</span>
    <motion.div className="absolute inset-0 border-t border-cyan-400/80 rounded-full z-20 pointer-events-none"
      animate={{ y: [0, "100%", 0] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} />
  </div>
);

// ── Testimonials swipe carousel ──
function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0);
  const total = TESTIMONIALS.length;
  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((c) => (c + 1) % total), 5000);
    return () => clearInterval(timer);
  }, [total]);

  return (
    <div className="w-full">
      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div key={current}
            initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.35 }}
            className="relative p-4 rounded-xl bg-neutral-900 border border-neutral-700">
            <Quote className="absolute top-3 right-3 w-6 h-6 text-cyan-400/10 rotate-180" />
            <div className="flex gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-3 h-3 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-gray-300 text-sm leading-relaxed italic mb-3">&ldquo;{TESTIMONIALS[current].quote}&rdquo;</p>
            <div className="border-t border-neutral-700 pt-3">
              <h4 className="text-white font-bold text-sm">{TESTIMONIALS[current].name}</h4>
              <p className="text-cyan-400 text-xs font-mono mt-0.5">{TESTIMONIALS[current].role}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="flex items-center justify-center gap-4 mt-3">
        <button onClick={prev} className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-primary transition-all" aria-label="Previous">
          <ChevronLeft className="w-4 h-4" />
        </button>
        <div className="flex items-center gap-2">
          {TESTIMONIALS.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all duration-300 ${i === current ? "w-6 bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" : "w-2 bg-white/30 hover:bg-white/50"}`}
              aria-label={`Testimonial ${i + 1}`} />
          ))}
        </div>
        <button onClick={next} className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-primary transition-all" aria-label="Next">
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
function CoreCapabilitiesIDE() {
  const PILLARS = [
    {
      id: "plm",
      illustration: "/team.svg",
      title: "Enterprise PLM & CAD",
      description: "Full-lifecycle PLM architecture, BOM management, change control governance, and production-ready CAD for complex engineering environments.",
      tags: ["3DEXPERIENCE", "Teamcenter", "CATIA V5", "SolidWorks"],
      accent: "border-blue-500/20",
      glow: "group-hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]",
      tagColor: "border-blue-900/50 bg-blue-950/30 text-blue-300",
      iconBg: "bg-blue-950/30",
    },
    {
      id: "de",
      illustration: "/server.svg",
      title: "Data Engineering & Integration",
      description: "Resilient cloud lakehouses, automated ETL/ELT pipelines, zero-downtime migrations, and scalable cloud infrastructure on AWS, Azure, and GCP.",
      tags: ["Snowflake", "Databricks", "Kafka", "dbt", "Airflow"],
      accent: "border-cyan-500/20",
      glow: "group-hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]",
      tagColor: "border-cyan-900/50 bg-cyan-950/30 text-cyan-300",
      iconBg: "bg-cyan-950/30",
    },
    {
      id: "dta",
      illustration: "/analytics.svg",
      title: "Data Trust & Analytics",
      description: "Data quality automation, governance frameworks, real-time observability, AI infrastructure, and business intelligence dashboards your team will actually trust.",
      tags: ["Data Quality", "Observability", "AI Infra", "Power BI"],
      accent: "border-purple-500/20",
      glow: "group-hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]",
      tagColor: "border-purple-900/50 bg-purple-950/30 text-purple-300",
      iconBg: "bg-purple-950/30",
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PILLARS.map((pillar, idx) => (
          <motion.div
            key={pillar.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.15 }}
            className={`group relative flex flex-col rounded-2xl bg-neutral-900 border ${pillar.accent} ${pillar.glow} transition-all duration-500 overflow-hidden hover:-translate-y-2`}
          >
            {/* Illustration area */}
            <div className={`w-full flex items-center justify-center p-8 ${pillar.iconBg} border-b border-white/5`}>
              <img
                src={pillar.illustration}
                alt={pillar.title}
                className="w-40 h-40 object-contain drop-shadow-[0_0_15px_rgba(34,211,238,0.1)] group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Content area */}
            <div className="flex flex-col flex-grow p-6">
              <h3 className="text-lg font-bold text-white mb-3 leading-tight">
                {pillar.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-5 flex-grow">
                {pillar.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-5">
                {pillar.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`text-[10px] font-mono px-2 py-1 rounded border ${pillar.tagColor}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <Link
                href="/services"
                className={`inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-lg border ${pillar.tagColor} hover:opacity-80 transition-opacity mt-auto`}
              >
                Explore service <ArrowRight size={12} />
              </Link>
            </div>

            {/* Bottom glow line */}
            <div className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-current to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-500 ${pillar.labelColor}`} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const displayProjects = Array(30).fill(PROJECTS).flat();

  const getCardWidth = useCallback(() => {
    if (!sliderRef.current) return 0;
    const firstCard = sliderRef.current.firstElementChild as HTMLElement;
    if (!firstCard) return 0;
    return firstCard.offsetWidth + (window.innerWidth < 768 ? 0 : 16);
  }, []);

  const scrollToIndex = useCallback((targetDotIndex: number) => {
    if (sliderRef.current) {
      const cardWidth = getCardWidth();
      const currentRawIndex = Math.round(sliderRef.current.scrollLeft / cardWidth);
      const currentMod = currentRawIndex % PROJECTS.length;
      let steps = targetDotIndex - currentMod;
      if (steps < 0) steps += PROJECTS.length;
      if (steps === 0) return;
      sliderRef.current.scrollTo({ left: (currentRawIndex + steps) * cardWidth, behavior: "smooth" });
      setActiveIndex(targetDotIndex);
    }
  }, [getCardWidth]);

  const handleScroll = () => {
    if (sliderRef.current) {
      const cardWidth = getCardWidth();
      setActiveIndex(Math.round(sliderRef.current.scrollLeft / cardWidth) % PROJECTS.length);
    }
  };

  useEffect(() => {
    if (isPaused || isDragging) return;
    const interval = setInterval(() => {
      sliderRef.current?.scrollBy({ left: getCardWidth(), behavior: "smooth" });
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused, isDragging, getCardWidth]);

  const startDragging = (e: React.MouseEvent) => { setIsDragging(true); setStartX(e.pageX - (sliderRef.current?.offsetLeft || 0)); setScrollLeft(sliderRef.current?.scrollLeft || 0); };
  const stopInteracting = () => { setIsDragging(false); setIsPaused(false); };
  const move = (e: React.MouseEvent) => { if (!isDragging || !sliderRef.current) return; e.preventDefault(); sliderRef.current.scrollLeft = scrollLeft - (e.pageX - (sliderRef.current.offsetLeft || 0) - startX) * 2; };

  return (
    <div className="flex flex-col items-center min-h-screen bg-neutral-950 text-white overflow-x-hidden selection:bg-cyan-400/30">

      {/* 1. HERO */}
      <section className="relative w-full max-w-7xl mx-auto px-4 pt-8 pb-2 md:pt-24 md:pb-8 text-left">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[120px] -z-10 animate-pulse" />

        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-12 w-full">
          <div className="flex flex-col items-center md:items-start text-center md:text-left w-full md:w-1/2">
            <div className="w-full max-w-xl mx-auto md:mx-0 relative mb-6 md:mb-8 pt-2 md:pt-8">
              <div className="absolute left-0 right-0 top-1/2 h-px bg-white/10 -translate-y-1/2 z-0 mt-3">
                <motion.div className="h-full bg-cyan-400" animate={{ x: ["-100%", "200%"] }} transition={{ repeat: Infinity, duration: 3, ease: "linear" }} style={{ width: "30%" }} />
              </div>
              <div className="flex items-center justify-between w-full relative z-10">
                {["INGESTION", "TRANSFORMATION", "INTELLIGENCE"].map((step) => (
                  <div key={step} className="flex flex-col items-center gap-2 md:gap-4 bg-neutral-950 px-1 md:px-2 py-2 md:py-4 rounded-full">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-cyan-400 flex items-center justify-center bg-black">
                      <Server className="text-cyan-400 w-4 h-4 md:w-5 md:h-5" />
                    </div>
                    <span className="text-[9px] md:text-xs font-mono text-cyan-400 tracking-wider">{step}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
              className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-4 md:mb-6 tracking-tight">
              Trusted data. Smarter products. Faster decisions.
            </motion.h1>
            
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
              className="text-sm md:text-lg text-gray-300 mb-6 md:mb-8 leading-relaxed font-light">
              Your product data, your pipeline data, and your analytics data all live in different silos — and that's costing you. WillowVibe connects the dots. We engineer the systems that make your product lifecycle, data pipelines, and business intelligence work as one.
            </motion.p>
            
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }}>
              <Link href="/contact" className="inline-flex items-center gap-2 px-5 py-2.5 md:px-6 md:py-3 bg-cyan-400 text-black font-bold rounded-lg hover:scale-105 transition-all shadow-[0_0_20px_rgba(34,211,238,0.3)] text-sm">
                Start a Project <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="w-full md:w-1/2 flex items-center justify-center"
          >
            <img
              src="/hero-data-new.svg"
              alt="Data engineering illustration"
              className="w-full max-w-xs md:max-w-md lg:max-w-lg drop-shadow-[0_0_30px_rgba(34,211,238,0.15)]"
            />
          </motion.div>
        </div>
      </section>

      {/* 2. TRUST TICKER */}
      <section className="w-full border-y border-white/5 bg-white/[0.02] py-2 md:py-3 overflow-hidden">
        <div className="w-full relative flex overflow-hidden">
          <motion.div className="flex gap-6 md:gap-24 whitespace-nowrap px-4 md:px-12"
            animate={{ x: [0, -2000] }} transition={{ repeat: Infinity, ease: "linear", duration: 40 }}>
            {["AWS", "SNOWFLAKE", "DATABRICKS", "KAFKA", "DBT", "AIRFLOW", "TEAMCENTER", "WINDCHILL", "BOM MANAGEMENT", "VARIANT CONFIGURATION", "CHANGE CONTROL", "ENOVIA", "AWS", "SNOWFLAKE", "DATABRICKS", "KAFKA", "DBT", "AIRFLOW", "TEAMCENTER", "WINDCHILL", "BOM MANAGEMENT", "VARIANT CONFIGURATION", "CHANGE CONTROL", "ENOVIA"].map((tech, i) => (
              <span key={i} className="text-[10px] md:text-base font-mono font-bold text-gray-600 tracking-widest uppercase">{tech}</span>
            ))}
          </motion.div>
        </div>
      </section>


      {/* 4. CORE CAPABILITIES */}
      <section className="w-full py-8 md:py-20 border-b border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-4 text-center mb-6 md:mb-12">
          <h2 className="text-xl md:text-3xl font-bold mb-3 font-mono">CORE_CAPABILITIES</h2>
          <div className="h-0.5 w-16 bg-cyan-400 mx-auto" />
        </div>
        <CoreCapabilitiesIDE />
      </section>

      {/* 5. FEATURED PROJECTS */}
      <section className="w-full max-w-7xl mx-auto px-4 py-8 md:py-20 border-b border-white/5">
        <div className="mb-6 md:mb-10 text-center md:text-left">
          <h2 className="text-xl md:text-3xl font-bold mb-3 font-mono">FEATURED_PROJECTS</h2>
          <div className="h-0.5 w-16 bg-cyan-400 mx-auto md:mx-0" />
        </div>
        <div className="relative">
          <div ref={sliderRef} onScroll={handleScroll} onMouseDown={startDragging} onMouseUp={() => setIsDragging(false)}
            onMouseLeave={stopInteracting} onMouseMove={move} onMouseEnter={() => setIsPaused(true)}
            className={`flex overflow-x-auto gap-4 snap-x snap-mandatory py-2 md:px-[10%] ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
            {displayProjects.map((project, idx) => (
              <div key={`${project.id}-${idx}`} className="w-[calc(100vw-2rem)] md:w-auto md:min-w-[80%] flex-none snap-start md:snap-center shrink-0 pointer-events-none md:pointer-events-auto">
                <ProjectCard {...project} />
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center gap-3 mt-6">
          {PROJECTS.map((_, index) => (
            <button key={index} onClick={() => scrollToIndex(index)}
              className={`h-2 transition-all duration-300 rounded-full ${activeIndex === index ? "w-8 bg-cyan-400" : "w-2 bg-white/30"}`}
              aria-label={`Go to project ${index + 1}`} />
          ))}
        </div>
      </section>

      {/* 6. TESTIMONIALS — carousel on mobile, grid on desktop */}
      <section className="w-full max-w-7xl mx-auto px-4 py-8 pb-12 md:py-20 md:pb-28">
        <div className="text-center mb-6 md:mb-12">
          <h2 className="text-xl md:text-3xl font-bold mb-3 font-mono">CLIENT_ENDORSEMENTS</h2>
          <div className="h-0.5 w-16 bg-cyan-400 mx-auto" />
        </div>
        <div className="md:hidden"><TestimonialsCarousel /></div>
        <div className="md:hidden mt-5 flex items-center gap-3 p-4 rounded-2xl border border-dashed border-white/10 bg-white/[0.02]">
          <img
            src="/marilyn.svg"
            alt="More endorsements coming"
            className="w-12 h-12 object-contain opacity-60"
          />
          <div>
            <p className="text-white font-semibold text-xs mb-0.5">More endorsements on the way</p>
            <p className="text-gray-500 text-[10px] leading-relaxed">Real stories from our clients — coming soon.</p>
          </div>
        </div>
        <div className="hidden md:grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative p-6 rounded-xl bg-neutral-900 border border-neutral-700 hover:border-cyan-400/30 transition-colors flex flex-col">
              <Quote className="absolute top-4 right-4 w-8 h-8 text-cyan-400/10 rotate-180" />
              <div className="flex gap-1 mb-3">{[...Array(5)].map((_, i) => (<svg key={i} className="w-3 h-3 text-cyan-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>))}</div>
              <p className="text-gray-300 text-sm leading-relaxed italic mb-4 flex-grow">&ldquo;{testimonial.quote}&rdquo;</p>
              <div className="border-t border-neutral-700 pt-3">
                <h4 className="text-white font-bold text-sm">{testimonial.name}</h4>
                <p className="text-cyan-400 text-xs font-mono mt-0.5">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* More coming */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-8 flex items-center gap-4 p-5 rounded-2xl border border-dashed border-white/10 bg-white/[0.02]"
        >
          <img
            src="/marilyn.svg"
            alt="More endorsements coming"
            className="w-16 h-16 object-contain opacity-60"
          />
          <div>
            <p className="text-white font-semibold text-sm mb-0.5">More endorsements on the way</p>
            <p className="text-gray-500 text-xs leading-relaxed">
              We are collecting feedback from our clients. Real stories, real results — coming soon.
            </p>
          </div>
        </motion.div>
      </section>

      <FloatingChatWidget />
    </div>
  );
}

function ProjectCard({ title, tags, stat, desc, visual }: { title: string; tags: string[]; stat: string; desc: string; visual: string }) {
  return (
    <div className="group relative p-4 md:p-6 h-full flex flex-col bg-neutral-800 border border-neutral-600 rounded-xl hover:border-cyan-400 transition-all duration-500 select-none">
      <h3 className="text-lg md:text-2xl font-bold mb-2 md:mb-3 text-white group-hover:text-cyan-400 transition-colors">{title}</h3>
      <p className="text-sm md:text-base text-gray-300 mb-4 flex-grow leading-relaxed">{desc}</p>
      <div className="mb-4">
        {visual === "slider" && <BeforeAfterSlider />}
        {visual === "stream" && <DataStreamVisual />}
        {visual === "anomaly" && <AnomalyDetectionVisual />}
      </div>
      <div className="pt-4 border-t border-neutral-600 flex flex-wrap gap-2 items-center justify-between">
        <div className="flex flex-wrap gap-2">{tags.map((tag) => (<span key={tag} className="text-xs font-mono px-2 py-1 rounded bg-black/60 border border-neutral-500 text-cyan-400">{tag}</span>))}</div>
        <div className="font-mono text-xs text-cyan-300 font-bold bg-black/40 px-3 py-1 rounded border border-neutral-600">METRIC: {stat}</div>
      </div>
    </div>
  );
}
