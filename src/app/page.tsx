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

const CAPABILITY_TREE_ADVANCED = [
  {
    folder: "enterprise-platforms",
    files: [
      { 
        id: "plm-architecture.ts", 
        shortFileName: "plm-architecture.ts",
        icon: <ServerCog size={14} className="text-blue-400" />, 
        fullTitle: "Enterprise PLM Platform Architecture & Administration", 
        fullDescription: "Full-lifecycle tenant deployment, administration, configuration, and People & Organization setup for both 3DEXPERIENCE (SaaS/On-Prem) and Teamcenter environments. We ensure your core engineering platforms are perfectly tuned for global scale and security." 
      },
      { 
        id: "bom-variant-mgmt.tsx", 
        shortFileName: "bom-variant-mgmt.tsx",
        icon: <Component size={14} className="text-emerald-400" />, 
        fullTitle: "Advanced Configuration, BOM & Variant Management", 
        fullDescription: "Creating, managing, and strictly validating Engineering Bills of Materials (EBOM) to match rigorous corporate Product Development Processes. We configure complex product rules, variant effectivities, and model definitions for high-customization portfolios." 
      },
      { 
        id: "change-control.yml", 
        shortFileName: "change-control.yml",
        icon: <ClipboardCheck size={14} className="text-purple-400" />, 
        fullTitle: "Change Control Board (CCB) Governance & Workflows", 
        fullDescription: "Structuring operational paths for Issues, Change Requests (CR), Engineering Change Orders (ECO), and Engineering Change Notices (ECN). Designing and mapping corporate approval lifecycles across multinational internal teams." 
      },
      { 
        id: "cad-product-dev.rs", 
        shortFileName: "cad-product-dev.rs",
        icon: <Box size={14} className="text-cyan-400" />, 
        fullTitle: "Production-Ready CAD & New Product Development (NPD)", 
        fullDescription: "Delivering native, production-compliant component designs and deep structural assembly sets inside CATIA V5 and SolidWorks. Drafting and setting up core APQP and PPAP packages including Control Plans, Process Flows, and FMEA." 
      },
    ]
  },
  {
    folder: "core-data-engineering",
    files: [
      { 
        id: "data-pipelines.py", 
        shortFileName: "data-pipelines.py",
        icon: <Network size={14} className="text-cyan-400" />, 
        fullTitle: "Data Pipeline Development & Orchestration", 
        fullDescription: "Design and implement robust, scalable ETL/ELT pipelines with guaranteed SLAs and minimal downtime. We process massive volumes of disparate raw data, transforming it into pristine, analysis-ready assets feeding your entire data ecosystem." 
      },
      { 
        id: "cloud-engineering.tf", 
        shortFileName: "cloud-engineering.tf",
        icon: <Cloud size={14} className="text-blue-400" />, 
        fullTitle: "Cloud Infrastructure Architecture", 
        fullDescription: "Architect high-performance foundations on AWS, Azure, or GCP. We deploy auto-scaling, resilient computing environments utilizing Infrastructure as Code (IaC) to minimize ongoing operational costs while maximizing query execution speeds." 
      },
      { 
        id: "data-migration.sh", 
        shortFileName: "data-migration.sh",
        icon: <RefreshCw size={14} className="text-emerald-400" />, 
        fullTitle: "Zero-Downtime Data Migration", 
        fullDescription: "Transition from legacy on-premise systems to modern cloud-native architectures with absolute zero data loss. We utilize automated validation scripts and parallel run methodologies to ensure complete confidence during critical switchovers." 
      },
    ]
  },
  {
    folder: "data-trust-analytics",
    files: [
      { 
        id: "data-quality.json", 
        shortFileName: "data-quality.json",
        icon: <ShieldCheck size={14} className="text-rose-400" />, 
        fullTitle: "Data Quality, Observability & Trust", 
        fullDescription: "Deploy automated testing frameworks and AI-driven anomaly detection to ensure 100% data reliability before it ever reaches production environments. Comprehensive monitoring across your ecosystem with proactive alerts and circuit breakers." 
      },
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
  const [activeFolderId, setActiveFolderId] = useState(CAPABILITY_TREE_ADVANCED[0].folder);
  const [activeFileId, setActiveFileId] = useState(CAPABILITY_TREE_ADVANCED[0].files[0].id);
  const [userHasInteracted, setUserHasInteracted] = useState(false);
  
  const activeFolderObj = CAPABILITY_TREE_ADVANCED.find(f => f.folder === activeFolderId) || CAPABILITY_TREE_ADVANCED[0];
  const activeFileObj = activeFolderObj.files.find(f => f.id === activeFileId) || activeFolderObj.files[0];

  useEffect(() => {
    if (userHasInteracted) return;
    
    const interval = setInterval(() => {
      setActiveFileId(currentFileId => {
        const currentFolder = CAPABILITY_TREE_ADVANCED.find(f => f.folder === activeFolderId) || CAPABILITY_TREE_ADVANCED[0];
        const currentIndex = currentFolder.files.findIndex(f => f.id === currentFileId);
        const nextIndex = (currentIndex + 1) % currentFolder.files.length;
        return currentFolder.files[nextIndex].id;
      });
    }, 4500);

    return () => clearInterval(interval);
  }, [activeFolderId, userHasInteracted]);

  const handleInteraction = () => {
    if (!userHasInteracted) setUserHasInteracted(true);
  };

  const handleFolderClick = (folderId: string) => {
    handleInteraction();
    setActiveFolderId(folderId);
    const newFolderObj = CAPABILITY_TREE_ADVANCED.find(f => f.folder === folderId);
    if (newFolderObj) {
      setActiveFileId(newFolderObj.files[0].id);
    }
  };

  const handleFileClick = (folderId: string, fileId: string) => {
    handleInteraction();
    setActiveFolderId(folderId);
    setActiveFileId(fileId);
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

      <div className="flex flex-col lg:grid lg:grid-cols-12 flex-grow h-auto lg:h-[550px]">
        {/* Left Side: File Explorer */}
        <div className="lg:col-span-4 bg-[#0d1117] border-r border-neutral-800 flex flex-col font-mono text-sm overflow-y-auto max-h-[300px] lg:max-h-none">
          <div className="px-4 py-3 text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-neutral-800 select-none">
            Explorer
          </div>
          <div className="py-2">
            {CAPABILITY_TREE_ADVANCED.map((cat) => {
              const isFolderActive = activeFolderId === cat.folder;
              return (
                <div key={cat.folder} className="select-none">
                  <div 
                    className={`flex items-center gap-1.5 px-3 py-1.5 cursor-pointer text-gray-300 transition-colors ${isFolderActive ? "bg-white/5" : "hover:bg-white/5"}`}
                    onClick={() => handleFolderClick(cat.folder)}
                  >
                    {isFolderActive ? <ChevronDown size={14} className="text-gray-400" /> : <ChevronRight size={14} className="text-gray-400" />}
                    {isFolderActive ? <FolderOpen size={14} className="text-cyan-500" /> : <Folder size={14} className="text-cyan-500" />}
                    <span className={`truncate ${isFolderActive ? "text-white font-bold" : "text-gray-300"}`}>{cat.folder}</span>
                  </div>
                  
                  {isFolderActive && (
                    <div className="flex flex-col mt-0.5 mb-1.5 ml-4 pl-3 border-l border-white/10 relative">
                      {cat.files.map((file) => {
                        const isSelected = activeFileId === file.id;
                        return (
                          <div 
                            key={file.id}
                            onClick={() => handleFileClick(cat.folder, file.id)}
                            className={`flex items-center gap-2 pl-2 pr-3 py-1.5 cursor-pointer relative transition-colors ${
                              isSelected 
                                ? "bg-cyan-900/30 text-cyan-400" 
                                : "text-gray-400 hover:bg-white/5 hover:text-gray-200"
                            }`}
                          >
                            <div className="absolute left-[-13px] top-1/2 w-3 border-t border-white/10" />
                            {file.icon}
                            <span className="truncate text-[13px]">{file.shortFileName}</span>
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
        <div className="lg:col-span-8 bg-[#0a0d12] flex flex-col relative overflow-hidden font-mono">
            {/* Editor Tabs */}
            <div className="flex bg-[#0d1117] border-b border-neutral-800 overflow-x-auto custom-scrollbar select-none pt-2 px-2 gap-1">
                {activeFolderObj.files.map((file) => {
                    const isTabActive = activeFileId === file.id;
                    return (
                        <div 
                            key={file.id}
                            onClick={() => handleFileClick(activeFolderId, file.id)}
                            className={`flex items-center gap-2 px-4 py-2 cursor-pointer min-w-max rounded-t-lg border-t-2 border-l border-r transition-colors ${
                                isTabActive 
                                    ? "bg-[#0a0d12] border-t-cyan-400 border-l-neutral-800 border-r-neutral-800 text-cyan-400" 
                                    : "bg-[#161b22] border-transparent text-gray-500 hover:bg-[#1c2128]"
                            }`}
                        >
                            {file.icon}
                            <span className="text-[13px]">{file.shortFileName}</span>
                        </div>
                    );
                })}
            </div>

            <div className="flex-grow flex relative">
                {/* Line Numbers */}
                <div className="w-12 bg-[#0d1117] border-r border-neutral-800 flex flex-col items-end py-4 pr-3 text-xs text-neutral-600 select-none opacity-60">
                    {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].map(n => <span key={n} className="leading-7 lg:leading-8">{n}</span>)}
                </div>

                {/* Editor Content */}
                <div className="flex-grow p-4 lg:p-6 relative overflow-y-auto custom-scrollbar">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeFileId}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.15 }}
                            className="relative z-10 flex flex-col h-full"
                        >
                            <div className="text-gray-500 text-xs lg:text-sm mb-4 lg:mb-6 leading-7 lg:leading-8 whitespace-nowrap overflow-hidden text-ellipsis">
                                <span className="text-purple-400 italic">// ==========================================</span><br/>
                                <span className="text-purple-400 italic">// === </span><span className="text-white font-bold">{activeFileObj.fullTitle}</span><span className="text-purple-400 italic"> ===</span><br/>
                                <span className="text-purple-400 italic">// ==========================================</span>
                            </div>

                            {activeFileId.endsWith('.json') ? (
                                <div className="text-gray-300 text-xs lg:text-sm leading-7 lg:leading-8 whitespace-pre-wrap">
                                    <span className="text-amber-300">{"{"}</span><br/>
                                    <span className="ml-4 text-blue-400">"module"</span>: <span className="text-emerald-400">"{activeFileObj.shortFileName}"</span>,<br/>
                                    <span className="ml-4 text-blue-400">"config"</span>: <span className="text-amber-300">{"{"}</span><br/>
                                    <span className="ml-8 text-blue-400">"description"</span>: <span className="text-emerald-400">"{activeFileObj.fullDescription}"</span>,<br/>
                                    <span className="ml-8 text-blue-400">"status"</span>: <span className="text-emerald-400">"active"</span>,<br/>
                                    <span className="ml-8 text-blue-400">"deploymentTarget"</span>: <span className="text-emerald-400">"production"</span><br/>
                                    <span className="ml-4 text-amber-300">{"}"}</span><br/>
                                    <span className="text-amber-300">{"}"}</span>
                                </div>
                            ) : (
                                <div className="text-gray-300 text-xs lg:text-sm leading-7 lg:leading-8 whitespace-pre-wrap">
                                    <span className="text-pink-500">export</span> <span className="text-purple-400">const</span> <span className="text-blue-400">initializeModule</span> = <span className="text-amber-300">()</span> <span className="text-pink-500">=&gt;</span> <span className="text-amber-300">{"{"}</span><br/>
                                    <span className="ml-4 text-gray-500 italic">/**</span><br/>
                                    <span className="ml-4 text-gray-500 italic block pr-4"> * {activeFileObj.fullDescription}</span><br/>
                                    <span className="ml-4 text-gray-500 italic"> */</span><br/>
                                    <br/>
                                    <span className="ml-4 text-cyan-400">System</span>.<span className="text-emerald-400">deploy</span>(<span className="text-amber-300">"{activeFileObj.shortFileName}"</span>);<br/>
                                    <span className="text-amber-300">{"}"}</span>;
                                </div>
                            )}

                            <div className="mt-8 flex font-sans">
                                <Link href="/services" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#21262d] hover:bg-[#30363d] text-cyan-400 border border-neutral-600 rounded-md text-xs lg:text-sm font-semibold transition-all w-max shadow-sm">
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
