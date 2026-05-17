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

const CAPABILITY_TREE = [
  {
    folder: "enterprise-platforms",
    files: [
      { id: "plm-architecture.ts", icon: <ServerCog className="w-5 h-5 lg:w-6 lg:h-6 text-blue-400" />, title: "PLM Architecture", desc: "Full-lifecycle tenant deployment for 3DEXPERIENCE and Teamcenter." },
      { id: "bom-variant-mgmt.tsx", icon: <Component className="w-5 h-5 lg:w-6 lg:h-6 text-emerald-400" />, title: "BOM & Variant Mgmt", desc: "Multi-Level BOM Engineering and complex product variant configurations." },
      { id: "change-control.yml", icon: <ClipboardCheck className="w-5 h-5 lg:w-6 lg:h-6 text-purple-400" />, title: "Change Control Board", desc: "Structuring operational paths for Issues, CRs, and ECOs." },
      { id: "cad-product-dev.rs", icon: <Box className="w-5 h-5 lg:w-6 lg:h-6 text-cyan-400" />, title: "CAD & Product Dev", desc: "High-precision 3D parametric modeling and APQP/PPAP packages." },
    ]
  },
  {
    folder: "core-data-engineering",
    files: [
      { id: "data-pipelines.py", icon: <Network className="w-5 h-5 lg:w-6 lg:h-6 text-cyan-400" />, title: "Data Pipeline Dev", desc: "Scalable ETL/ELT pipelines with guaranteed SLAs and minimal downtime." },
      { id: "cloud-engineering.tf", icon: <Cloud className="w-5 h-5 lg:w-6 lg:h-6 text-blue-400" />, title: "Cloud Engineering", desc: "High-performance foundations on AWS, Azure, or GCP." },
      { id: "data-migration.sh", icon: <RefreshCw className="w-5 h-5 lg:w-6 lg:h-6 text-emerald-400" />, title: "Data Migration", desc: "Transition from legacy to cloud-native architectures with zero data loss." },
    ]
  },
  {
    folder: "data-trust-analytics",
    files: [
      { id: "data-quality.json", icon: <ShieldCheck className="w-5 h-5 lg:w-6 lg:h-6 text-rose-400" />, title: "Data Quality & Trust", desc: "Automated testing and anomaly detection for reliable data." },
    ]
  }
];

const TESTIMONIALS = [
  { quote: "They didn't just build a pipeline; they completely rescued our data architecture. We went from daily crashes to a fully automated lakehouse that hasn't dropped a single row.", name: "Sarah Jenkins", role: "CTO, Finova Tech" },
  { quote: "The sheer speed of the streaming architecture they deployed is incredible. We are now processing millions of logistics events with sub-50ms latency. Pure engineering excellence.", name: "Marcus Thorne", role: "VP of Engineering, GlobalFreight" },
  { quote: "Working with this team feels like having an elite in-house data unit. The pipeline audit alone saved us 40% on our monthly cloud warehouse computing costs.", name: "David Chen", role: "Head of Analytics, RetailPro" },
];

// ── Compact robot animation — thin on mobile, full on desktop ──
const DataRefineryAnimation = () => (
  <div className="relative w-full h-[100px] md:h-[320px] bg-neutral-900/80 rounded-xl border border-white/10 flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
    <div className="absolute left-3 md:left-6 flex flex-col gap-2 md:gap-6">
      {[12, -45, 30].map((rotation, i) => (
        <motion.div key={i} className="w-4 h-4 md:w-7 md:h-7 bg-red-500/80 rounded-sm border border-red-400"
          initial={{ x: -30, opacity: 0, rotate: rotation }}
          animate={{ x: 60, opacity: [0, 1, 0], rotate: rotation + 90 }}
          transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4, ease: "easeInOut" }} />
      ))}
    </div>
    <div className="relative z-10 flex flex-col items-center justify-center p-2 md:p-5 bg-black border-2 border-cyan-500 rounded-lg md:rounded-xl shadow-[0_0_20px_rgba(34,211,238,0.2)]">
      <Bot size={26} className="text-cyan-400 mb-1 md:mb-3 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
      <div className="flex gap-1 md:gap-2">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }}><Settings size={11} className="text-gray-400 md:w-5 md:h-5" /></motion.div>
        <motion.div animate={{ rotate: -360 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }}><Settings size={11} className="text-cyan-400 md:w-5 md:h-5" /></motion.div>
      </div>
      <motion.div className="absolute inset-0 border-t-2 border-cyan-400 rounded-lg md:rounded-xl"
        animate={{ y: [0, "80%", 0] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} />
    </div>
    <div className="absolute right-3 md:right-6 flex flex-col gap-2 md:gap-4">
      {[0, 1, 2].map((i) => (
        <motion.div key={i} className="w-6 h-2 md:w-10 md:h-3 bg-cyan-400 rounded-sm shadow-[0_0_10px_rgba(34,211,238,0.6)]"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 20, opacity: [0, 1, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3 + 1, ease: "easeOut" }} />
      ))}
    </div>
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
  const [expandedFolders, setExpandedFolders] = useState<string[]>(["enterprise-platforms", "core-data-engineering", "data-trust-analytics"]);
  const [selectedCapability, setSelectedCapability] = useState(CAPABILITY_TREE[0].files[0]);

  const toggleFolder = (folder: string) => {
    setExpandedFolders(prev => 
      prev.includes(folder) ? prev.filter(f => f !== folder) : [...prev, folder]
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col rounded-xl overflow-hidden bg-[#0d1117] border border-neutral-700 shadow-[0_0_30px_rgba(0,0,0,0.8)]">
      {/* IDE Header */}
      <div className="w-full bg-[#161b22] px-4 py-2.5 flex items-center border-b border-neutral-700">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29]" />
        </div>
        <div className="mx-auto text-xs font-mono text-gray-500 font-medium tracking-wide">willowvibe-workspace — Core_Capabilities</div>
      </div>

      <div className="flex flex-col lg:grid lg:grid-cols-12 flex-grow h-auto lg:h-[450px]">
        {/* Left Side: File Explorer */}
        <div className="lg:col-span-4 bg-[#0d1117] border-r border-neutral-800 flex flex-col font-mono text-sm overflow-y-auto max-h-[300px] lg:max-h-none">
          <div className="px-4 py-3 text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-neutral-800 select-none">
            Explorer
          </div>
          <div className="py-2">
            {CAPABILITY_TREE.map((cat) => {
              const isExpanded = expandedFolders.includes(cat.folder);
              return (
                <div key={cat.folder} className="select-none">
                  <div 
                    className="flex items-center gap-1.5 px-3 py-1.5 hover:bg-white/5 cursor-pointer text-gray-300 transition-colors"
                    onClick={() => toggleFolder(cat.folder)}
                  >
                    {isExpanded ? <ChevronDown size={14} className="text-gray-400" /> : <ChevronRight size={14} className="text-gray-400" />}
                    {isExpanded ? <FolderOpen size={14} className="text-cyan-500" /> : <Folder size={14} className="text-cyan-500" />}
                    <span className="truncate">{cat.folder}</span>
                  </div>
                  
                  {isExpanded && (
                    <div className="flex flex-col mt-0.5 mb-1.5">
                      {cat.files.map((file) => {
                        const isSelected = selectedCapability.id === file.id;
                        return (
                          <div 
                            key={file.id}
                            onClick={() => setSelectedCapability(file)}
                            className={`flex items-center gap-2 pl-9 pr-3 py-1.5 cursor-pointer border-l-2 transition-colors ${
                              isSelected 
                                ? "bg-cyan-900/30 text-cyan-400 border-cyan-400" 
                                : "text-gray-400 border-transparent hover:bg-white/5 hover:text-gray-200"
                            }`}
                          >
                            {file.id.endsWith('.json') || file.id.endsWith('.yml') ? (
                               <FileJson size={14} className={isSelected ? "text-cyan-400" : "text-emerald-400"} />
                            ) : (
                               <FileCode2 size={14} className={isSelected ? "text-cyan-400" : "text-blue-400"} />
                            )}
                            <span className="truncate text-[13px]">{file.id}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Editor Window */}
        <div className="lg:col-span-8 bg-[#0a0d12] flex flex-col relative overflow-hidden">
            {/* Editor Tabs */}
            <div className="flex bg-[#0d1117] border-b border-neutral-800 overflow-x-auto custom-scrollbar select-none">
               <div className="flex items-center gap-2 px-4 py-2.5 bg-[#0a0d12] border-t-2 border-t-cyan-400 border-r border-r-neutral-800 min-w-max">
                  {selectedCapability.id.endsWith('.json') || selectedCapability.id.endsWith('.yml') ? (
                     <FileJson size={14} className="text-cyan-400" />
                  ) : (
                     <FileCode2 size={14} className="text-cyan-400" />
                  )}
                  <span className="text-cyan-400 font-mono text-sm">{selectedCapability.id}</span>
               </div>
            </div>

            <div className="flex-grow flex relative">
                {/* Line Numbers */}
                <div className="hidden lg:flex w-12 bg-[#0d1117] border-r border-neutral-800 flex-col items-end py-4 pr-2 font-mono text-xs text-neutral-600 select-none opacity-60">
                    {[1,2,3,4,5,6,7,8,9,10,11,12].map(n => <span key={n} className="leading-8">{n}</span>)}
                </div>

                {/* Editor Content */}
                <div className="flex-grow p-4 lg:p-8 relative overflow-y-auto">
                   <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-transparent pointer-events-none" />
                   <AnimatePresence mode="wait">
                       <motion.div
                          key={selectedCapability.id}
                          initial={{ opacity: 0, x: -5 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 5 }}
                          transition={{ duration: 0.15 }}
                          className="relative z-10 flex flex-col h-full font-mono"
                       >
                           <div className="flex items-start gap-4 lg:gap-6 mb-4 lg:mb-6">
                               <div className="p-3 rounded-xl bg-[#0d1117] border border-neutral-700 shadow-lg shrink-0 mt-1 lg:mt-0">
                                   {selectedCapability.icon}
                               </div>
                               <div>
                                   <div className="text-gray-500 text-[11px] lg:text-xs mb-1">export const <span className="text-emerald-400">capability</span> = {"{"}</div>
                                   <div className="text-base lg:text-xl font-bold text-white mb-2 ml-4 lg:ml-6 leading-tight">
                                       <span className="text-blue-400">title:</span> <span className="text-amber-300 font-sans">"{selectedCapability.title}"</span>,
                                   </div>
                               </div>
                           </div>

                           <div className="ml-4 lg:ml-8 flex-grow">
                               <div className="text-gray-500 text-[11px] lg:text-xs mb-1">/**</div>
                               <div className="text-gray-500 text-[11px] lg:text-xs mb-1 leading-relaxed max-w-xl flex">
                                   <span className="mr-2">*</span> 
                                   <p className="text-gray-300 text-xs lg:text-sm font-sans">{selectedCapability.desc}</p>
                               </div>
                               <div className="text-gray-500 text-[11px] lg:text-xs mb-4">*/</div>
                           </div>
                           
                           <div className="text-gray-500 text-[11px] lg:text-xs mt-auto">{"};"}</div>

                           <div className="mt-6 lg:mt-8 flex font-sans">
                               <Link href="/services" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#21262d] hover:bg-[#30363d] text-gray-200 border border-neutral-600 rounded-md text-xs lg:text-sm font-semibold transition-all w-max shadow-sm">
                                   Explore Module <ArrowRight size={14} />
                               </Link>
                           </div>
                       </motion.div>
                   </AnimatePresence>
                </div>
            </div>
        </div>
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
      <section className="relative w-full max-w-7xl mx-auto px-4 pt-8 pb-6 md:pt-24 md:pb-16 text-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[120px] -z-10 animate-pulse" />
        <div className="w-full max-w-2xl mx-auto relative mb-6 md:mb-12 pt-2 md:pt-8">
          <div className="absolute left-0 right-0 top-1/2 h-px bg-white/10 -translate-y-1/2 z-0 mt-3">
            <motion.div className="h-full bg-cyan-400" animate={{ x: ["-100%", "200%"] }} transition={{ repeat: Infinity, duration: 3, ease: "linear" }} style={{ width: "30%" }} />
          </div>
          <div className="flex items-center justify-between w-full relative z-10">
            {["INGESTION", "TRANSFORMATION", "INTELLIGENCE"].map((step) => (
              <div key={step} className="flex flex-col items-center gap-2 md:gap-4 bg-neutral-950 px-1 md:px-2 py-2 md:py-4 rounded-full">
                <div className="w-10 h-10 md:w-16 md:h-16 rounded-full border-2 border-cyan-400 flex items-center justify-center bg-black">
                  <Server className="text-cyan-400 w-4 h-4 md:w-6 md:h-6" />
                </div>
                <span className="text-[9px] md:text-xs font-mono text-cyan-400 tracking-wider">{step}</span>
              </div>
            ))}
          </div>
        </div>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
          className="text-3xl md:text-7xl font-extrabold mb-4 md:mb-6 tracking-tight">
          Architecting the <span className="text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]">Data Ecosystem</span> of Tomorrow.
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-2xl mx-auto text-sm md:text-xl text-gray-300 mb-6 md:mb-10 leading-relaxed font-light">
          Raw data is only valuable if you can trust it and access it instantly. We act as your dedicated engineering team — eliminating silos, automating pipelines, and building resilient cloud lakehouses.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }}>
          <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-cyan-400 text-black font-bold rounded-lg hover:scale-105 transition-all shadow-[0_0_20px_rgba(34,211,238,0.3)] text-sm md:text-base">
            Start a Project <ArrowRight size={16} />
          </Link>
        </motion.div>
      </section>

      {/* 2. TRUST TICKER */}
      <section className="w-full border-y border-white/5 bg-white/[0.02] py-4 md:py-6 overflow-hidden">
        <div className="w-full relative flex overflow-hidden">
          <motion.div className="flex gap-6 md:gap-24 whitespace-nowrap px-4 md:px-12"
            animate={{ x: [0, -800] }} transition={{ repeat: Infinity, ease: "linear", duration: 18 }}>
            {["AWS", "SNOWFLAKE", "DATABRICKS", "KAFKA", "DBT", "AIRFLOW", "AWS", "SNOWFLAKE", "DATABRICKS", "KAFKA", "DBT", "AIRFLOW"].map((tech, i) => (
              <span key={i} className="text-xs md:text-2xl font-mono font-bold text-gray-600 tracking-widest uppercase">{tech}</span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3. THE PROCESS — BOTH paragraphs visible on mobile, animation below */}
      <section className="w-full bg-white/[0.02] border-b border-white/5 py-8 md:py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="md:grid md:grid-cols-2 md:gap-16 md:items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-400/10 text-cyan-400 text-xs md:text-sm font-mono mb-3 md:mb-4">
                <Cpu size={14} /> THE PROCESS
              </div>
              <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-5">We turn the chaos of raw data into clarity.</h2>
              {/* Both paragraphs visible on ALL screen sizes */}
              <p className="text-sm md:text-lg text-gray-400 mb-3 leading-relaxed">
                Think of your raw data like a disorganized warehouse. It&apos;s all there, but you can&apos;t use it.
              </p>
              <p className="text-sm md:text-lg text-gray-400 leading-relaxed">
                Our pipelines act as the ultimate automated sorting machine — ingesting the mess, applying rigorous cleaning rules, and delivering perfectly structured, analysis-ready data to your team.
              </p>
            </div>
            {/* Desktop: full animation alongside text */}
            <div className="hidden md:block"><DataRefineryAnimation /></div>
          </div>
          {/* Mobile: compact thin animation strip below text */}
          <div className="md:hidden mt-5">
            <DataRefineryAnimation />
          </div>
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
      </section>

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
